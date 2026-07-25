/* ============================================================
   JUEGO — estado y reglas. El objeto global J contiene TODA la
   partida. Es agnóstico de la campaña: los nombres, los textos
   y el contenido salen de LEX / TXT / SISTEMAS / ARMAS / ...
   ============================================================ */

const J = {

/* --------------------------- ESTADO --------------------------- */
nuevaPartida(){
  const ini = CAMP.inicio;

  this.modo         = 'transito';   // transito | combate | evento | fin
  this.pausa        = false;
  this.tiempo       = 0;
  this.cascoMax     = ini.casco;  this.casco = ini.casco;
  this.oxigeno      = 100;
  this.combustible  = ini.combustible;
  this.chatarra     = ini.moneda;
  this.misiles      = ini.municion;
  this.saltosGratis = 0;
  this.sector       = 0;
  this.salto        = 0;
  this.objetivo     = 'casco';
  this.enemigo      = null;
  this.cargaSalto   = 0;
  this.escudoCapas  = 0;
  this.escudoCarga  = 0;
  this.seleccion    = null;
  this.proyectiles  = [];   // en vuelo: al expirar resuelven su impacto
  this.pendientes   = [];   // disparos de una salva esperando su turno de salir
  this.registro     = [];
  this.nodoResuelto = true;
  this.stock        = null;
  this.acoso        = 0;    // saltos dados en la región con el perseguidor detrás
  this.tiendasVisitadas = 0;
  this.consejoDado  = false;
  this.absorbidos   = 0;
  this.desdeGuardado = 0;

  this.sistemas = {};
  for(const k in SISTEMAS) this.sistemas[k] = { nivel:SISTEMAS[k].base, energia:0, daño:0, ion:0, repar:0 };
  this.sistemas.reactor.nivel = ini.reactor;
  this.sistemas.armas.nivel   = ini.armas;

  this.arsenal = ini.arsenal.map(c=>({ clave:c, activa:true, carga:0 }));

  this.tripulacion = [];
  ini.tripulacion.forEach(([rol,nombre])=>this.reclutar(rol,nombre||null));

  for(const k in ini.reparto) this.asignar(k, ini.reparto[k]);
  this.tripulacion.forEach((t,i)=>{ t.estacion = ROLES[t.rol].afin; });

  TXT.logInicio.forEach((l,i)=>this.reg(l, i===0?'bien':'info'));
  this.generarNodos();
},

/* --------------------------- ENERGÍA --------------------------- */
capacidad(k){
  const s = this.sistemas[k];
  return Math.max(0, s.nivel - s.daño - (s.ion>0 ? Math.ceil(s.nivel/2) : 0));
},
energiaProducida(){ return 4 + this.capacidad('reactor'); },
energiaUsada(){
  let t=0; for(const k in this.sistemas) if(k!=='reactor') t += this.sistemas[k].energia;
  return t;
},
energiaLibre(){ return this.energiaProducida() - this.energiaUsada(); },

asignar(k, delta){
  if(k==='reactor') return false;
  const s = this.sistemas[k];
  if(delta>0){
    if(this.energiaLibre() < delta) return false;
    if(s.energia + delta > this.capacidad(k)) return false;
    s.energia += delta;
  }else{
    if(s.energia + delta < 0) return false;
    s.energia += delta;
  }
  this.reajustar();
  return true;
},

/* Recorta asignaciones imposibles (tras avería o interferencia). */
reajustar(){
  for(const k in this.sistemas){
    const s = this.sistemas[k];
    if(k==='reactor'){ s.energia=0; continue; }
    s.energia = Math.min(s.energia, this.capacidad(k));
  }
  let exceso = this.energiaUsada() - this.energiaProducida();
  for(const k of ['sensores','soporte','motores','armas','escudos']){
    while(exceso>0 && this.sistemas[k].energia>0){ this.sistemas[k].energia--; exceso--; }
  }
  this.gestionarArmas();
  this.escudoCapas = Math.min(this.escudoCapas, this.capasMax());
},

/* Reparte la energía de armamento entre las armas. Las que no caben se
   apagan; las que vuelven a caber se reencienden solas, salvo que el
   jugador las apagara a mano. */
gestionarArmas(){
  let disp = this.sistemas.armas.energia;
  for(const a of this.arsenal){
    const d = ARMAS[a.clave];
    if(!a.activa) continue;
    if(disp >= d.coste) disp -= d.coste;
    else { a.activa=false; a.carga=0; IU.sucio('armas'); }
  }
  for(const a of this.arsenal){
    const d = ARMAS[a.clave];
    if(!a.activa && !a.apagadaManual && disp >= d.coste){ a.activa=true; disp -= d.coste; IU.sucio('armas'); }
  }
  return disp;
},

capasMax(){ return Math.floor(this.sistemas.escudos.energia/2); },

/* El puesto de observación necesita energía para leer algo. */
nivelSensores(){ return this.sistemas.sensores.energia>0 ? this.capacidad('sensores') : 0; },

/* --------------------------- GENTE --------------------------- */
reclutar(rolForzado, nombreForzado){
  if(this.tripulacion.length >= 6){ this.reg(TXT.sinLitera,'avi'); return null; }
  const claves = Object.keys(ROLES);
  const rol = rolForzado || claves[Math.floor(Math.random()*claves.length)];
  const usados = this.tripulacion.map(t=>t.nombre);
  let nombre = nombreForzado;
  if(!nombre){ do{ nombre = NOMBRES[Math.floor(Math.random()*NOMBRES.length)]; }while(usados.includes(nombre)); }
  const per = {}; for(const k in SISTEMAS) per[k] = 5 + Math.random()*10;
  per[ROLES[rol].afin] = 35 + Math.random()*25;
  const t = { id:Math.random().toString(36).slice(2,7), nombre, rol,
              salud:100, moral:70, estacion:null, pericia:per, reparando:0 };
  this.tripulacion.push(t);
  if(nombreForzado===undefined) this.reg(TXT.logAlta(nombre, ROLES[rol].nombre),'bien');
  IU.sucio('tripulacion');
  return t;
},

destinar(tripulante, estacion){
  if(!tripulante) return;
  if(estacion) this.tripulacion.forEach(t=>{ if(t!==tripulante && t.estacion===estacion) t.estacion=null; });
  tripulante.estacion = (tripulante.estacion===estacion) ? null : estacion;
  IU.sucio('tripulacion');
},

enEstacion(k){ return this.tripulacion.find(t=>t.estacion===k && t.salud>0); },

bono(k){
  const t = this.enEstacion(k);
  if(!t) return 0;
  const eficacia = (t.salud/100) * (0.55 + 0.45*(t.moral/100));
  return (0.12 + (t.pericia[k]/100)*0.45) * eficacia;
},

subirPericia(k, n){
  const t = this.enEstacion(k);
  if(t) t.pericia[k] = Math.min(100, t.pericia[k] + n);
},

/* --------------------------- DAÑOS --------------------------- */
dañarCasco(n){
  this.casco = Math.max(0, this.casco - n);
  IU.aviso('-'+n+' '+LEX.casco, 'var(--peligro)');
  IU.sacudir(); SFX.impacto();
  if(this.casco<=0) this.fin(false, TXT.finCasco);
},
repararCasco(n){ this.casco = Math.min(this.cascoMax, this.casco + n); },

dañarSistema(k, n){
  const s = this.sistemas[k];
  s.daño = Math.min(s.nivel, s.daño + n);
  this.reajustar();
  this.reg(TXT.logAveria(SISTEMAS[k].nombre),'mal');
},
dañarSistemaAzar(n){
  const cands = Object.keys(this.sistemas).filter(k=>this.sistemas[k].daño < this.sistemas[k].nivel);
  if(!cands.length) return;
  this.dañarSistema(cands[Math.floor(Math.random()*cands.length)], n);
},
ionizar(k, seg){ this.sistemas[k].ion = Math.max(this.sistemas[k].ion, seg); this.reajustar(); },

herirAzar(n){
  const vivos = this.tripulacion.filter(t=>t.salud>0);
  if(!vivos.length) return;
  const t = vivos[Math.floor(Math.random()*vivos.length)];
  t.salud = Math.max(1, t.salud - n);
  this.reg(TXT.logHerido(t.nombre),'mal');
  IU.sucio('tripulacion');
},
herirTodos(n){ this.tripulacion.forEach(t=>t.salud=Math.max(1,t.salud-n)); IU.sucio('tripulacion'); },
curarTodos(n){ this.tripulacion.forEach(t=>t.salud=Math.min(100,t.salud+n)); IU.sucio('tripulacion'); },
moralTodos(n){ this.tripulacion.forEach(t=>t.moral=Math.max(0,Math.min(100,t.moral+n))); IU.sucio('tripulacion'); },

recurso(k, n){
  if(k==='chatarra')    this.chatarra    = Math.max(0, this.chatarra + n);
  if(k==='combustible') this.combustible = Math.max(0, this.combustible + n);
  if(k==='misiles')     this.misiles     = Math.max(0, this.misiles + n);
},

darArmaAzar(){
  const claves = Object.keys(ARMAS);
  const c = claves[Math.floor(Math.random()*claves.length)];
  if(this.arsenal.length>=4){ this.chatarra += ARMAS[c].precio; this.reg(TXT.arsenalLleno,'avi'); return; }
  this.arsenal.push({ clave:c, activa:false, carga:0 });
  this.reg(TXT.logArma(ARMAS[c].nombre),'bien');
  IU.sucio('armas');
},

/* --------------------------- REGISTRO --------------------------- */
reg(txt, clase='info'){
  this.registro.push({txt, clase});
  if(this.registro.length>120) this.registro.shift();
  IU.sucio('registro');
},

/* --------------------------- COMBATE --------------------------- */
combate(def){
  const sec = this.sector+1;
  let base = def;
  if(!base){
    const pool = ENEMIGOS.filter(e=>sec>=e.min && sec<=e.max);
    base = pool[Math.floor(Math.random()*pool.length)] || ENEMIGOS[0];
  }
  const esc = base.jefe ? 0 : this.sector;
  this.enemigo = {
    nombre: base.nombre, color: base.color, jefe: !!base.jefe,
    cascoMax: base.casco + esc*2, casco: base.casco + esc*2,
    escudoMax: Math.min(4, base.escudos + (this.sector>=3?1:0)),
    escudo:    Math.min(4, base.escudos + (this.sector>=3?1:0)),
    escudoCarga: 0, ion: 0,
    esquiva: base.esquiva + esc*2,
    sub: { armas:{daño:0,max:3}, motores:{daño:0,max:3} },
    armas: base.armas.map(a=>Object.assign({}, a, {carga: Math.random()*a.carga*0.4, cargaMax:a.carga})),
    recompensa: {
      chatarra: 14 + this.sector*7 + Math.floor(Math.random()*12),
      combustible: Math.random()<0.62 ? (Math.random()<0.25 ? 2 : 1) : 0,
      misiles: Math.random()<0.4 ? 1+Math.floor(Math.random()*2) : 0
    }
  };
  this.modo = 'combate';
  this.cargaSalto = 0;
  this.absorbidos = 0;
  this.proyectiles.length = 0; this.pendientes.length = 0;
  this.reg(TXT.logContacto(this.enemigo.nombre),'mal');
  SFX.alarma();
  IU.sucio('todo');
},

evasion(){
  if(this.sistemas.motores.energia<=0) return 0;
  return Math.min(65, this.sistemas.motores.energia*5 + this.bono('motores')*40);
},

disparar(idx){
  const a = this.arsenal[idx]; if(!a) return;
  const d = ARMAS[a.clave];
  if(!a.activa || a.carga < d.carga){ SFX.error(); return; }
  if(!this.enemigo){ IU.aviso(LEX.avisos.sinObjetivo,'var(--acento)'); SFX.error(); return; }
  if(d.municion && this.misiles < d.municion){ IU.aviso(LEX.avisos.sinMunicion,'var(--acento)'); SFX.error(); return; }
  if(d.municion) this.misiles -= d.municion;
  a.carga = 0;
  this.subirPericia('armas', 1.2);

  d.municion ? SFX.misil() : (d.ion ? SFX.ion() : SFX.laser());
  this.programar('jugador', d);
},

/* Encola los disparos de una salva. Nada de setTimeout: el vuelo y el
   impacto los lleva el tick, así que la pausa los congela de verdad y
   nunca resuelven contra un enemigo que ya no es el mismo. */
programar(origen, arma){
  const tipo = arma.ion ? 'ion' : ((arma.municion || arma.perfora) ? 'misil' : 'laser');
  for(let i=0;i<arma.disparos;i++){
    this.pendientes.push({ origen, arma, tipo, ref:this.enemigo, espera:i*0.18 });
  }
},

impactoEnEnemigo(d){
  const E = this.enemigo; if(!E) return;
  const esq = Math.max(0, E.esquiva - E.sub.motores.daño*8);
  if(Math.random()*100 < esq){ IU.aviso('FALLO','#888'); return; }

  if(d.ion){ E.ion = 6; E.escudo = 0; IU.aviso(LEX.ion,'var(--frio)'); SFX.ion(); return; }

  if(E.escudo>0 && !d.perfora){
    E.escudo--; SFX.escudo(); IU.aviso(LEX.defensa,'var(--frio)');
    // Si salva tras salva se la come el escudo, el jugador no tiene forma de
    // saber que su armamento no da para tanto. Se lo decimos una vez.
    if(++this.absorbidos>=4 && !this.consejoDado){
      this.consejoDado = true;
      IU.aviso(LEX.avisos.sinPenetrar,'var(--peligro)');
      this.reg(TXT.consejoEscudo,'avi');
    }
    return;
  }

  this.absorbidos = 0;
  SFX.impacto();
  E.casco = Math.max(0, E.casco - d.dmg);
  IU.aviso('-'+d.dmg,'var(--acento)');
  if(this.objetivo!=='casco'){
    const s = E.sub[this.objetivo];
    s.daño = Math.min(s.max, s.daño + 1 + (d.sub||0));
  }
  if(E.casco<=0) this.victoriaCombate();
},

victoriaCombate(){
  const E = this.enemigo; if(!E) return;
  const r = E.recompensa;
  this.recurso('chatarra',r.chatarra);
  this.recurso('combustible',r.combustible);
  this.recurso('misiles',r.misiles);
  const partes = [r.chatarra+' '+LEX.monedaNom];
  if(r.combustible) partes.push('+'+r.combustible+' '+LEX.combustibleNom);
  if(r.misiles)     partes.push('+'+r.misiles+' '+LEX.municionNom);
  this.reg(TXT.logBotin(E.nombre, partes.join(', ')),'bien');
  this.moralTodos(8);
  const eraJefe = E.jefe;
  this.enemigo = null;
  this.modo = 'transito';
  this.proyectiles.length = 0; this.pendientes.length = 0;
  SFX.victoria();
  IU.sucio('todo');
  if(eraJefe) this.fin(true, TXT.finVictoria);
  else        this.nodoResuelto = true;
},

enemigoDispara(arma){
  if(!this.enemigo) return;
  this.programar('enemigo', arma);
},

impactoEnJugador(arma){
  if(this.modo!=='combate') return;
  if(Math.random()*100 < this.evasion()){ IU.aviso('ESQUIVADO','var(--fosforo)'); this.subirPericia('motores',1.5); return; }
  if(this.escudoCapas>0 && !arma.perfora){
    this.escudoCapas--; this.escudoCarga = 0;
    SFX.escudo(); IU.aviso(LEX.defensa,'var(--frio)');
    this.subirPericia('escudos',1);
    return;
  }
  this.dañarCasco(arma.dmg);
  if(Math.random()<0.45){
    const cands = Object.keys(this.sistemas).filter(k=>this.sistemas[k].daño<this.sistemas[k].nivel);
    if(cands.length) this.dañarSistema(cands[Math.floor(Math.random()*cands.length)],1);
  }
  if(Math.random()<0.22) this.herirAzar(12+Math.floor(Math.random()*15));
},

huir(){
  if(this.cargaSalto<100){ SFX.error(); return; }
  this.reg(TXT.logHuida,'avi');
  this.enemigo = null; this.modo='transito';
  this.proyectiles.length=0; this.pendientes.length=0;
  this.cargaSalto = 0; this.nodoResuelto = true;
  this.moralTodos(-4);
  SFX.salto();
  IU.sucio('todo');
},

/* --------------------------- VIAJE --------------------------- */
generarNodos(){
  const N = LEX.nodos;
  const nodo = (tipo, peso)=>({ tipo, icono:N[tipo][0], etiqueta:N[tipo][1], desc:N[tipo][2], peso });
  const sig = this.sector<SECTORES.length-1 ? SECTORES[this.sector+1].nombre : null;
  const salida = ()=>({ tipo:'salida', icono:N.salida[0], etiqueta:N.salida[1], desc:N.salida[2](sig) });

  if(this.salto >= SECTORES[this.sector].saltos){ this.nodos = [salida()]; return; }

  const tipos = [ nodo('combate',32), nodo('evento',34), nodo('tienda',16),
                  nodo('vacio',10),   nodo('peligro',8) ];
  const elegir = ()=>{
    const total = tipos.reduce((a,b)=>a+b.peso,0);
    let r = Math.random()*total;
    for(const t of tipos){ r-=t.peso; if(r<=0) return t; }
    return tipos[0];
  };

  const n = 2 + (Math.random()<0.5?1:0);
  this.nodos = [];
  for(let i=0;i<n;i++){
    let c, intentos=0;
    do{ c = elegir(); intentos++; }while(this.nodos.some(x=>x.tipo===c.tipo) && intentos<8);
    this.nodos.push(Object.assign({},c));
  }
  // salir de la región siempre es una opción: es la única forma de dejarlos atrás
  if(this.salto>=2) this.nodos.push(salida());

  const vis = this.nivelSensores();
  this.nodos.forEach(nd=>{ nd.oculto = (vis<1 && nd.tipo!=='salida'); });
},

saltar(nodo){
  if(!this.nodoResuelto){ IU.aviso(LEX.avisos.sinResolver,'var(--acento)'); return; }
  if(this.saltosGratis>0) this.saltosGratis--;
  else if(this.combustible<=0){ IU.aviso(LEX.avisos.sinCombustible,'var(--peligro)'); SFX.error(); return; }
  else this.combustible--;

  SFX.salto();
  IU.animarSalto();

  if(nodo.tipo==='salida'){
    if(this.sector === SECTORES.length-1){
      this.salto++;
      this.reg(TXT.logJefe,'mal');
      this.combate(JEFE);
      this.nodoResuelto = false;
      IU.sucio('todo'); return;
    }
    this.sector++; this.salto = 1; this.acoso = 0;
    this.reg(TXT.logRegion(this.sector+1, SECTORES[this.sector].nombre),'avi');
    this.reg(TXT.logEscape,'bien');
    this.recurso('chatarra',15); this.recurso('combustible',2);
    this.nodoResuelto = true;
    this.generarNodos(); IU.sucio('todo'); this.guardar(); return;
  }

  this.salto++;
  this.acoso++;
  this.nodoResuelto = false;

  // ¿te han dado alcance?
  if(this.margen() < 0){
    this.reg(TXT.logInterceptado,'mal');
    this.combate(PERSEGUIDOR);
    this.generarNodos(); IU.sucio('todo'); this.guardar(); return;
  }
  if(this.margen() <= 1) this.reg(TXT.logAcoso(this.margen()),'avi');

  switch(nodo.tipo){
    case 'combate': this.combate(); break;
    case 'tienda':  this.reg(TXT.logTienda,'bien'); this.abrirTienda(); this.nodoResuelto=true; break;
    case 'vacio':
      this.reg(TXT.logVacio,'info');
      this.curarTodos(12); this.moralTodos(4); this.recurso('chatarra',5);
      if(Math.random()<0.4){ this.recurso('combustible',1); this.reg(TXT.logVacioExtra,'bien'); }
      this.nodoResuelto=true; break;
    case 'peligro':
      if(Math.random()<0.5){ this.dañarCasco(2+Math.floor(Math.random()*3)); this.reg(TXT.logPeligroMal,'mal'); }
      else { this.recurso('chatarra',22+Math.floor(Math.random()*15)); this.reg(TXT.logPeligroBien,'bien'); }
      this.nodoResuelto=true; break;
    default:
      this.lanzarEvento(); break;
  }
  this.generarNodos();
  IU.sucio('todo');
  this.guardar();
},

lanzarEvento(){
  const ev = EVENTOS[Math.floor(Math.random()*EVENTOS.length)];
  this.modo = 'evento';
  IU.modalEvento(ev);
},

resolverEvento(opcion){
  const txt = opcion.efecto(this);
  if(this.modo==='evento') this.modo = this.enemigo ? 'combate' : 'transito';
  this.nodoResuelto = !this.enemigo;
  IU.sucio('todo');
  return txt;
},

cumpleReq(req){
  if(!req) return true;
  if(req.sensores && this.nivelSensores() < req.sensores) return false;
  if(req.rol && !this.tripulacion.some(t=>t.rol===req.rol && t.salud>0)) return false;
  if(req.chatarra && this.chatarra < req.chatarra) return false;
  if(req.combustible && this.combustible < req.combustible) return false;
  return true;
},
textoReq(req){
  if(!req) return '';
  if(req.sensores)    return 'REQUIERE '+SISTEMAS.sensores.nombre.toUpperCase()+' NIVEL '+req.sensores;
  if(req.rol)         return 'REQUIERE '+ROLES[req.rol].nombre.toUpperCase()+' A BORDO';
  if(req.chatarra)    return 'CUESTA '+req.chatarra+' DE '+LEX.monedaNom.toUpperCase();
  if(req.combustible) return 'CUESTA '+req.combustible+' DE '+LEX.combustibleNom.toUpperCase();
  return '';
},

/* --------------------------- MEJORAS Y TIENDA --------------------------- */
precioMejora(k){
  return Math.round(SISTEMAS[k].precio * (0.6 + this.sistemas[k].nivel*0.45));
},
mejorar(k){
  const s = this.sistemas[k];
  if(s.nivel >= SISTEMAS[k].max){ SFX.error(); return false; }
  const p = this.precioMejora(k);
  if(this.chatarra < p){ SFX.error(); return false; }
  this.chatarra -= p; s.nivel++;
  this.reg(TXT.logMejora(SISTEMAS[k].nombre, s.nivel),'bien');
  SFX.pip(); this.reajustar(); IU.sucio('todo');
  return true;
},

abrirTienda(){ IU.modalTienda(); },

/* --------------------------- PERSEGUIDOR ---------------------------
   Cada región tiene menos margen de saltos que nodos, así que no puedes
   verlos todos: o renuncias a botín o te alcanzan. La salida está siempre
   disponible a partir del segundo salto, y cambiar de región los pierde. */
umbral(){ return Math.max(3, SECTORES[this.sector].saltos - 2); },
margen(){ return this.umbral() - this.acoso; },

/* --------------------------- GUARDADO --------------------------- */
claveGuardado(){ return 'partida:' + CAMP.id; },

guardar(){
  if(this.modo==='fin') return;
  const d = {
    v:1, camp:CAMP.id,
    // si se guarda con un evento abierto, al volver se retoma en tránsito:
    // el modal no sobrevive y dejaríamos la partida congelada
    modo: this.modo==='evento' ? (this.enemigo?'combate':'transito') : this.modo,
    nodoResuelto: this.modo==='evento' ? true : this.nodoResuelto,
    tiempo:this.tiempo, casco:this.casco, cascoMax:this.cascoMax, oxigeno:this.oxigeno,
    combustible:this.combustible, chatarra:this.chatarra, misiles:this.misiles,
    saltosGratis:this.saltosGratis, sector:this.sector, salto:this.salto, acoso:this.acoso,
    objetivo:this.objetivo, cargaSalto:this.cargaSalto,
    escudoCapas:this.escudoCapas, escudoCarga:this.escudoCarga,
    sistemas:this.sistemas, arsenal:this.arsenal, tripulacion:this.tripulacion,
    registro:this.registro.slice(-40), nodos:this.nodos, enemigo:this.enemigo,
    stock:this.stock, stockParada:this.stockParada,
    tiendasVisitadas:this.tiendasVisitadas, consejoDado:this.consejoDado
  };
  try{ localStorage.setItem(this.claveGuardado(), JSON.stringify(d)); }catch(e){}
},

cargar(){
  let d = null;
  try{ d = JSON.parse(localStorage.getItem(this.claveGuardado()) || 'null'); }catch(e){}
  if(!d || d.v!==1 || d.camp!==CAMP.id) return false;
  // si la campaña ha cambiado de sistemas o de armas, el guardado ya no vale
  if(!d.sistemas || Object.keys(SISTEMAS).some(k=>!d.sistemas[k])) return false;
  if(!Array.isArray(d.arsenal) || d.arsenal.some(a=>!ARMAS[a.clave])) return false;
  if(!Array.isArray(d.tripulacion) || d.tripulacion.some(t=>!ROLES[t.rol])) return false;
  if(!(d.sector>=0 && d.sector<SECTORES.length)) return false;

  Object.assign(this, d);
  delete this.v; delete this.camp;
  this.proyectiles = []; this.pendientes = []; this.seleccion = null;
  this.absorbidos = 0; this.desdeGuardado = 0;
  if(typeof this.acoso !== 'number') this.acoso = 0;   // guardado de una versión anterior
  if(!this.nodos || !this.nodos.length) this.generarNodos();
  this.reajustar();
  this.reg(TXT.logReanudar,'avi');
  return true;
},

borrarGuardado(){ try{ localStorage.removeItem(this.claveGuardado()); }catch(e){} },

/* --------------------------- FIN --------------------------- */
fin(victoria, info){
  this.modo = 'fin';
  this.enemigo = null;
  this.proyectiles.length = 0; this.pendientes.length = 0;
  this.borrarGuardado();          // muerte definitiva: no hay a dónde volver
  victoria ? SFX.victoria() : SFX.derrota();
  IU.modalFin(victoria, info);
},

/* --------------------------- TICK --------------------------- */
tick(dt){
  if(this.modo==='fin' || this.modo==='evento' || this.pausa) return;
  this.tiempo += dt;

  this.desdeGuardado += dt;
  if(this.desdeGuardado > 5){ this.desdeGuardado = 0; this.guardar(); }

  for(const k in this.sistemas){
    const s = this.sistemas[k];
    if(s.ion>0){ s.ion = Math.max(0, s.ion-dt); if(s.ion===0) this.reajustar(); }
  }

  // soporte vital / agua
  const sop = this.sistemas.soporte.energia;
  if(sop>0) this.oxigeno = Math.min(100, this.oxigeno + dt*(6+sop*7)*(1+this.bono('soporte')));
  else      this.oxigeno = Math.max(0,   this.oxigeno - dt*3.2);
  if(this.oxigeno<30){
    const f = (30-this.oxigeno)*0.06*dt;
    this.tripulacion.forEach(t=>{ if(t.salud>0) t.salud = Math.max(0, t.salud - f); });
    if(Math.floor(this.tiempo)%5===0) IU.sucio('tripulacion');
  }

  // defensas propias
  const cm = this.capasMax();
  if(this.escudoCapas < cm){
    this.escudoCarga += dt * (0.34 + this.bono('escudos')*0.5);
    if(this.escudoCarga>=1){ this.escudoCarga=0; this.escudoCapas++; SFX.pip(); }
  }else this.escudoCarga = 0;

  // gente: oficio, reparaciones, moral y bajas
  for(const t of this.tripulacion){
    if(t.salud<=0) continue;
    if(t.estacion){
      t.pericia[t.estacion] = Math.min(100, t.pericia[t.estacion] + dt*(this.modo==='combate'?0.9:0.32));
      const s = this.sistemas[t.estacion];
      if(s.daño>0){
        t.reparando += dt*(0.22 + this.bono(t.estacion)*0.6);
        if(t.reparando>=1){
          t.reparando=0; s.daño--;
          this.reg(TXT.logRepara(t.nombre, SISTEMAS[t.estacion].nombre),'bien');
          this.reajustar(); IU.sucio('sistemas');
        }
      }
    }
    if(this.oxigeno>85 && t.salud<100) t.salud = Math.min(100, t.salud + dt*0.7*(1+this.bono('soporte')));
    t.moral = Math.max(0, Math.min(100, t.moral + dt*(this.casco/this.cascoMax > 0.6 ? 0.25 : -0.15)));
  }
  const muertos = this.tripulacion.filter(t=>t.salud<=0);
  if(muertos.length){
    muertos.forEach(m=>this.reg(TXT.logMuerto(m.nombre),'mal'));
    this.tripulacion = this.tripulacion.filter(t=>t.salud>0);
    IU.sucio('tripulacion');
    if(!this.tripulacion.length){ this.fin(false, TXT.finGente); return; }
  }

  // armas propias
  this.gestionarArmas();
  const velArmas = 1 + this.bono('armas')*0.9;
  for(const a of this.arsenal){
    const d = ARMAS[a.clave];
    if(a.activa && a.carga < d.carga) a.carga = Math.min(d.carga, a.carga + dt*velArmas);
  }

  // carga de la fuga (salto SLR / acelerón)
  const mot = this.sistemas.motores.energia;
  if(this.modo==='combate' && mot>0){
    this.cargaSalto = Math.min(100, this.cargaSalto + dt*(3.2 + mot*2.4)*(1+this.bono('motores')*0.5));
  }

  // salvas encoladas: cada disparo sale con su retardo
  this.pendientes = this.pendientes.filter(s=>{
    s.espera -= dt;
    if(s.espera > 0) return true;
    if(this.enemigo === s.ref)
      this.proyectiles.push({ origen:s.origen, tipo:s.tipo, arma:s.arma, ref:s.ref, t:0, dur:0.5 });
    return false;                       // el objetivo cambió: el disparo se pierde
  });

  // proyectiles en vuelo: al llegar, resuelven
  const impactos = [];
  this.proyectiles = this.proyectiles.filter(p=>{
    p.t += dt;
    if(p.t < p.dur) return true;
    impactos.push(p); return false;
  });
  for(const p of impactos){
    if(this.enemigo !== p.ref) continue;              // ya no está: no hay a quién pegar
    if(p.origen==='jugador') this.impactoEnEnemigo(p.arma);
    else if(this.modo==='combate') this.impactoEnJugador(p.arma);
  }

  // enemigo
  if(this.modo==='combate' && this.enemigo){
    const E = this.enemigo;
    if(E.ion>0){ E.ion = Math.max(0, E.ion-dt); E.escudo = 0; E.escudoCarga = 0; }
    else if(E.escudo < E.escudoMax){
      E.escudoCarga += dt*0.38;
      if(E.escudoCarga>=1){ E.escudoCarga=0; E.escudo++; }
    }
    const penal = 1 - E.sub.armas.daño*0.28;
    for(const w of E.armas){
      w.carga += dt*Math.max(0.15, penal);
      if(w.carga >= w.cargaMax){ w.carga = 0; this.enemigoDispara(w); }
    }
  }
}

};

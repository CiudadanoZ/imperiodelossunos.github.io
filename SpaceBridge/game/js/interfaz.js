/* ============================================================
   INTERFAZ — construye el panel y lo refresca cada fotograma.
   Todo el texto visible sale de LEX / TXT de la campaña activa.
   ============================================================ */

const $ = s => document.querySelector(s);

const IU = {

flags:{},
firmaArmas:'', firmaTrip:'', firmaLog:-1,

sucio(qué){ this.flags[qué]=true; },

/* --------------------------- ARRANQUE --------------------------- */
iniciar(){
  this.el = {
    casco:$('#lec-casco'), oxigeno:$('#lec-oxigeno'), combustible:$('#lec-combustible'),
    misiles:$('#lec-misiles'), chatarra:$('#lec-chatarra'), sector:$('#lec-sector'),
    acoso:$('#lec-acoso'),
    libre:$('#energia-libre'), rejilla:$('#rejilla-energia'), sistemas:$('#lista-sistemas'),
    armas:$('#lista-armas'), ordenes:$('#lista-ordenes'), trip:$('#lista-tripulacion'),
    tripCuenta:$('#tripulacion-cuenta'), registro:$('#registro'), avisos:$('#avisos'),
    hud:$('#hud-enemigo'), eNombre:$('#enemigo-nombre'), eCasco:$('#enemigo-casco'),
    eCascoTxt:$('#enemigo-casco-txt'), eEscudos:$('#enemigo-escudos'),
    eSub:$('#enemigo-subsistemas'), eArma:$('#enemigo-arma'),
    objetivo:$('#objetivo-panel'), rotulo:$('#rotulo-estado'),
    modal:$('#modal'), mTitulo:$('#modal-titulo'), mCuerpo:$('#modal-cuerpo'), mOpciones:$('#modal-opciones')
  };

  this.rotularPanel();
  this.construirSistemas();
  this.construirOrdenes();

  document.querySelectorAll('.btn-obj').forEach(b=>{
    b.onclick = ()=>{ J.objetivo = b.dataset.objetivo; SFX.clic(); };
  });

  $('#btn-menu').onclick  = ()=>{ location.href = 'index.html'; };
  $('#btn-ayuda').onclick = ()=>this.modalAyuda();
  $('#btn-sonido').onclick = (e)=>{
    SFX.activo = !SFX.activo;
    e.currentTarget.classList.toggle('apagado', !SFX.activo);
    e.currentTarget.textContent = SFX.activo ? '♪' : '✕';
  };

  this.el.modal.onclick = (e)=>{ if(e.target===this.el.modal && !this.bloqueado) this.cerrarModal(); };
},

/* Vuelca el vocabulario de la campaña sobre las etiquetas fijas. */
rotularPanel(){
  const t = (sel,txt)=>{ const e=$(sel); if(e) e.textContent = txt; };
  t('#marca-nom', LEX.marca);         t('#marca-sub', LEX.marcaSub);
  t('#lbl-casco', LEX.casco);         t('#lbl-vital', LEX.vital);
  t('#lbl-combustible', LEX.combustible); t('#lbl-municion', LEX.municion);
  t('#lbl-moneda', LEX.moneda);       t('#lbl-region', LEX.region);
  t('#lbl-perseguidor', LEX.perseguidor);
  t('#h-tripulacion', LEX.tripulacion); t('#h-registro', LEX.registro);
  t('#h-energia', LEX.panelEnergia);  t('#h-armas', LEX.panelArmas);
  t('#h-ordenes', LEX.panelOrdenes);
  t('[data-objetivo="casco"]',   LEX.objCasco);
  t('[data-objetivo="armas"]',   LEX.objArmas);
  t('[data-objetivo="motores"]', LEX.objMotores);
},

modalVisible(){ return !this.el.modal.classList.contains('oculto'); },

/* --------------------------- CONSTRUCCIÓN --------------------------- */
construirSistemas(){
  const c = this.el.sistemas;
  c.innerHTML = '';
  this.filas = {};
  for(const k in SISTEMAS){
    const d = SISTEMAS[k];
    const fila = document.createElement('div');
    fila.className = 'sistema';
    fila.title = d.desc;
    fila.innerHTML =
      `<div class="s-icono">${d.icono}</div>
       <div class="s-nombre">${d.nombre}<b class="s-niv"></b></div>
       <div class="s-tripulante"></div>
       <div class="s-pips"></div>
       <div class="s-btns"></div>`;
    const btns = fila.querySelector('.s-btns');
    if(k!=='reactor'){
      const menos = document.createElement('button'); menos.textContent='−';
      const mas   = document.createElement('button'); mas.textContent='+';
      menos.onmousedown = e=>{ e.stopPropagation(); J.asignar(k,-1)&&SFX.clic(); };
      mas.onmousedown   = e=>{ e.stopPropagation(); J.asignar(k, 1)?SFX.clic():SFX.error(); };
      btns.append(menos, mas);
      this.filas[k] = { fila, menos, mas };
    }else{
      this.filas[k] = { fila };
    }
    fila.onmousedown = ()=>{
      if(J.seleccion){ J.destinar(J.seleccion, k); J.seleccion=null; SFX.pip(); }
    };
    c.appendChild(fila);
  }
},

construirOrdenes(){
  const O = LEX.ordenes;
  const defs = [
    { id:'saltar',  txt:O.saltar[0],  sub:O.saltar[1],  clase:'destacada', fn:()=>this.modalMapa() },
    { id:'huir',    txt:O.huir[0],    sub:O.huir[1],    fn:()=>J.huir() },
    { id:'mejoras', txt:O.mejoras[0], sub:O.mejoras[1], fn:()=>this.modalMejoras() },
    { id:'puestos', txt:O.puestos[0], sub:O.puestos[1], fn:()=>this.ordenPuestos() },
    { id:'escudos', txt:O.escudos[0], sub:O.escudos[1], fn:()=>this.ordenEscudos() },
    { id:'reparar', txt:O.reparar[0], sub:O.reparar[1], fn:()=>this.ordenReparar() },
    { id:'pausa',   txt:O.pausa[0],   sub:O.pausa[1],   fn:()=>{ J.pausa=!J.pausa; SFX.clic(); } }
  ];
  const c = this.el.ordenes; c.innerHTML=''; this.ordenes={};
  for(const d of defs){
    const b = document.createElement('button');
    b.className = 'orden' + (d.clase?' '+d.clase:'');
    b.title = d.sub;
    b.innerHTML = `<span class="etq">${d.txt}</span><span class="est"></span><div class="progreso" style="width:0"></div>`;
    b.onmousedown = ()=>{ if(!b.disabled) d.fn(); };
    c.appendChild(b);
    this.ordenes[d.id] = b;
  }
},

construirArmas(){
  const c = this.el.armas; c.innerHTML=''; this.armasEl = [];
  J.arsenal.forEach((a,i)=>{
    const d = ARMAS[a.clave];
    const el = document.createElement('div');
    el.className='arma';
    el.title = d.desc + `  ·  ${d.coste} de energía`;
    el.innerHTML =
      `<div class="a-fila"><span>${i+1}. ${d.nombre}</span><span class="a-estado"></span></div>
       <div class="a-datos">${d.dmg} dmg ×${d.disparos} · ⚡${d.coste}${d.perfora?' · perfora':''}${d.municion?' · ✷'+d.municion:''}${d.ion?' · '+LEX.ion.toLowerCase():''}</div>
       <div class="a-carga"><span style="width:0"></span></div>`;
    el.onmousedown = (e)=>{
      const dd = ARMAS[a.clave];
      if(e.shiftKey || !a.activa){
        if(a.activa){ a.activa=false; a.carga=0; a.apagadaManual=true; SFX.clic(); }
        else{
          const usada = J.arsenal.filter(x=>x.activa).reduce((s,x)=>s+ARMAS[x.clave].coste,0);
          if(usada + dd.coste <= J.sistemas.armas.energia){ a.activa=true; a.apagadaManual=false; SFX.pip(); }
          else { this.aviso(LEX.avisos.faltaEnergia,'var(--acento)'); SFX.error(); }
        }
        this.sucio('armas'); return;
      }
      J.disparar(i);
    };
    c.appendChild(el);
    this.armasEl.push({el, estado:el.querySelector('.a-estado'), barra:el.querySelector('.a-carga span')});
  });
  if(!J.arsenal.length) c.innerHTML = '<div class="a-datos" style="padding:8px">Sin armamento instalado.</div>';
},

construirTripulacion(){
  const c = this.el.trip; c.innerHTML=''; this.tripEl = [];
  for(const t of J.tripulacion){
    const el = document.createElement('div');
    el.className = 'tripulante';
    el.innerHTML =
      `<div class="t-fila"><span class="t-nombre">${t.nombre}</span><span class="t-estacion"></span></div>
       <div class="t-fila"><span class="t-rol">${ROLES[t.rol].nombre}</span><span class="t-pericia"></span></div>
       <div class="t-salud"><span></span></div>`;
    el.onmousedown = ()=>{ J.seleccion = (J.seleccion===t) ? null : t; SFX.clic(); };
    c.appendChild(el);
    this.tripEl.push({ t, el,
      estacion: el.querySelector('.t-estacion'),
      pericia:  el.querySelector('.t-pericia'),
      salud:    el.querySelector('.t-salud span') });
  }
  if(!J.tripulacion.length) c.innerHTML='<div class="t-rol">Nadie en pie.</div>';
},

/* --------------------------- REFRESCO --------------------------- */
actualizar(){
  const e = this.el;

  e.casco.textContent = `${Math.ceil(J.casco)}/${J.cascoMax}`;
  e.casco.parentNode.classList.toggle('alarma', J.casco/J.cascoMax < 0.34);
  e.oxigeno.textContent = Math.round(J.oxigeno)+'%';
  e.oxigeno.parentNode.classList.toggle('alarma', J.oxigeno < 40);
  e.combustible.textContent = J.combustible + (J.saltosGratis?` (+${J.saltosGratis})`:'');
  e.combustible.parentNode.classList.toggle('alarma', J.combustible<=1);
  e.misiles.textContent = J.misiles;
  e.chatarra.textContent = J.chatarra;
  e.sector.textContent = `${J.sector+1}-${Math.max(1,J.salto)} · ${SECTORES[J.sector].nombre}`;
  const m = J.margen();
  e.acoso.textContent = m<=0 ? LEX.avisos.acosoEncima
                             : `${m} ${LEX.etapaNom}${m===1?'':'s'}`;
  e.acoso.parentNode.classList.toggle('alarma', m<=1);

  // energía
  const prod = J.energiaProducida(), usada = J.energiaUsada();
  e.libre.textContent = `LIBRE ${prod-usada}/${prod}`;
  if(e.rejilla.childElementCount !== prod){
    e.rejilla.innerHTML='';
    for(let i=0;i<prod;i++){ const d=document.createElement('div'); d.className='celda-energia'; e.rejilla.appendChild(d); }
  }
  [...e.rejilla.children].forEach((c,i)=>{ c.className = 'celda-energia ' + (i < prod-usada ? 'llena' : 'usada'); });

  // sistemas
  for(const k in SISTEMAS){
    const s = J.sistemas[k], f = this.filas[k], cap = J.capacidad(k);
    f.fila.querySelector('.s-niv').textContent = ` N${s.nivel}`;
    const trip = J.enEstacion(k);
    const cel = f.fila.querySelector('.s-tripulante');
    cel.textContent = trip ? '☺' : '';
    cel.title = trip ? trip.nombre : '';
    f.fila.style.outline = (J.seleccion ? '1px dashed var(--acento)' : 'none');

    const pips = f.fila.querySelector('.s-pips');
    if(pips.childElementCount !== s.nivel){
      pips.innerHTML=''; for(let i=0;i<s.nivel;i++){ const d=document.createElement('div'); d.className='pip'; pips.appendChild(d); }
    }
    const activo = (k==='reactor') ? cap : s.energia;
    [...pips.children].forEach((p,i)=>{
      let cl='pip';
      if(i >= s.nivel - s.daño) cl+=' dañado';
      else if(i < activo) cl += (s.ion>0 ? ' ion' : ' on');
      p.className = cl;
    });
    if(f.mas){
      f.mas.disabled   = (s.energia>=cap) || (prod-usada<=0);
      f.menos.disabled = (s.energia<=0);
    }
  }

  // armas
  const firmaA = J.arsenal.map(a=>a.clave).join('|');
  if(firmaA !== this.firmaArmas || this.flags.armas){ this.firmaArmas=firmaA; this.flags.armas=false; this.construirArmas(); }
  J.arsenal.forEach((a,i)=>{
    const d = ARMAS[a.clave], r = this.armasEl[i]; if(!r) return;
    const lista = a.activa && a.carga>=d.carga;
    r.el.classList.toggle('apagada', !a.activa);
    r.el.classList.toggle('lista', lista);
    r.barra.style.width = Math.round(100*a.carga/d.carga)+'%';
    r.estado.textContent = !a.activa ? 'APAGADA' : (lista ? '▶ LISTA' : 'CARGANDO');
    if(d.municion && J.misiles<d.municion) r.estado.textContent = LEX.avisos.sinMunicion;
  });

  // gente
  const firmaT = J.tripulacion.map(t=>t.id).join('|');
  if(firmaT !== this.firmaTrip){ this.firmaTrip=firmaT; this.construirTripulacion(); }
  e.tripCuenta.textContent = `${J.tripulacion.length}/6`;
  for(const r of this.tripEl){
    const t = r.t;
    r.el.classList.toggle('seleccionado', J.seleccion===t);
    r.el.classList.toggle('herido', t.salud<45);
    r.estacion.textContent = t.estacion ? SISTEMAS[t.estacion].nombre.toUpperCase() : 'SIN DESTINO';
    r.pericia.textContent = t.estacion ? 'pericia '+Math.round(t.pericia[t.estacion]) : 'moral '+Math.round(t.moral);
    r.salud.style.width = t.salud+'%';
    r.salud.style.background = t.salud<40 ? 'var(--peligro)' : 'var(--fosforo)';
  }

  // registro
  if(this.firmaLog !== J.registro.length){
    this.firmaLog = J.registro.length;
    e.registro.innerHTML = J.registro.slice(-40).map(l=>`<div class="linea ${l.clase}">${l.txt}</div>`).join('');
    e.registro.scrollTop = e.registro.scrollHeight;
  }

  // enemigo
  const E = J.enemigo, sens = J.nivelSensores();
  e.hud.classList.toggle('oculto', !E);
  e.objetivo.classList.toggle('oculto', !E);
  if(E){
    e.eNombre.textContent = E.nombre;
    if(sens>=1){
      e.eCasco.style.width = Math.round(100*E.casco/E.cascoMax)+'%';
      e.eCascoTxt.textContent = `${E.casco}/${E.cascoMax}`;
      e.eEscudos.innerHTML = Array.from({length:E.escudoMax},(_,i)=>
        `<div class="capa ${i<E.escudo?'on':''}"></div>`).join('') || `<span style="font-size:9px">sin ${LEX.defensaNom}</span>`;
    }else{
      e.eCasco.style.width='100%'; e.eCascoTxt.textContent='???';
      e.eEscudos.innerHTML = `<span style="font-size:9px">${LEX.avisos.sinLectura}</span>`;
    }
    if(sens>=2){
      e.eSub.innerHTML = [['armas',LEX.objArmas],['motores',LEX.objMotores]].map(([k,nom])=>{
        const s=E.sub[k], roto = s.daño>=s.max;
        return `<span class="${roto?'roto':''}">${nom} ${'▮'.repeat(s.max-s.daño)}${'▯'.repeat(s.daño)}</span>`;
      }).join('');
      const w = E.armas.reduce((a,b)=> (b.carga/b.cargaMax > a.carga/a.cargaMax ? b : a));
      e.eArma.innerHTML = `${w.nombre}<div class="barra"><span style="width:${Math.round(100*w.carga/w.cargaMax)}%"></span></div>`;
    }else{
      e.eSub.innerHTML = `<span style="font-size:9px">${LEX.avisos.subSinLectura}</span>`;
      e.eArma.textContent = '';
    }
    document.querySelectorAll('.btn-obj').forEach(b=>{
      const req = b.dataset.objetivo!=='casco';
      b.disabled = req && sens<2;
      if(b.disabled && J.objetivo===b.dataset.objetivo) J.objetivo='casco';
      b.classList.toggle('activo', J.objetivo===b.dataset.objetivo);
    });
  }

  // órdenes
  const o = this.ordenes;
  o.saltar.disabled  = (J.modo==='combate') || !J.nodoResuelto || J.modo==='fin';
  o.huir.disabled    = (J.modo!=='combate') || J.cargaSalto<100;
  o.huir.querySelector('.progreso').style.width = (J.modo==='combate'? J.cargaSalto : 0)+'%';
  o.huir.querySelector('.est').textContent = J.modo==='combate'
      ? (J.cargaSalto>=100 ? LEX.motor+' LISTO' : `${LEX.motor} ${Math.floor(J.cargaSalto)}%`)
      : '';
  o.saltar.querySelector('.est').textContent = (J.combustible>0||J.saltosGratis>0) ? '⛽1' : '⛽0';
  o.mejoras.querySelector('.est').textContent = '⛭'+J.chatarra;
  o.mejoras.disabled = J.modo==='fin';
  o.pausa.classList.toggle('destacada', J.pausa);
  o.pausa.querySelector('.etq').textContent = J.pausa ? LEX.ordenes.reanudar : LEX.ordenes.pausa[0];

  // rótulo del ventanal
  const S = LEX.estados;
  e.rotulo.textContent = J.pausa ? S.pausa
    : J.modo==='combate' ? S.combate
    : J.nodoResuelto ? S.listo : S.normal;
  e.rotulo.style.color = J.modo==='combate' ? 'var(--peligro)' : 'var(--fosforo-mate)';

  this.flags = {};
},

/* --------------------------- ÓRDENES RÁPIDAS --------------------------- */
ordenPuestos(){
  SFX.pip();
  const libres = Object.keys(SISTEMAS);
  const ocupadas = new Set();
  for(const t of J.tripulacion){
    const pref = ROLES[t.rol].afin;
    const dest = !ocupadas.has(pref) ? pref : libres.find(k=>!ocupadas.has(k));
    if(dest){ t.estacion = dest; ocupadas.add(dest); }
  }
  J.reg(TXT.logPuestos,'avi');
  this.firmaTrip='';
},
ordenEscudos(){
  SFX.pip();
  for(const k in J.sistemas) if(k!=='reactor') J.sistemas[k].energia=0;
  for(const k of ['escudos','motores','soporte','armas','sensores']){
    while(J.energiaLibre()>0 && J.sistemas[k].energia < J.capacidad(k)) J.sistemas[k].energia++;
  }
  J.reajustar();
  J.reg(TXT.logDefensa,'avi');
},
ordenReparar(){
  SFX.pip();
  const dañados = Object.keys(J.sistemas).filter(k=>J.sistemas[k].daño>0)
                    .sort((a,b)=>J.sistemas[b].daño-J.sistemas[a].daño);
  if(!dañados.length){ this.aviso(LEX.avisos.sinAverias,'var(--fosforo)'); return; }
  J.tripulacion.forEach((t,i)=>{ if(dañados[i]) t.estacion = dañados[i]; });
  J.reg(TXT.logReparar,'avi');
  this.firmaTrip='';
},

/* --------------------------- EFECTOS --------------------------- */
aviso(txt, color='var(--fosforo)'){
  const d = document.createElement('div');
  d.className='aviso'; d.textContent=txt; d.style.color=color;
  this.el.avisos.appendChild(d);
  setTimeout(()=>d.remove(), 1700);
},
sacudir(){
  this.flash = 1;
  document.body.classList.add('parpadeo');
  setTimeout(()=>document.body.classList.remove('parpadeo'), 360);
},
animarSalto(){ this.saltoFx = 1.0; },

/* --------------------------- MODALES --------------------------- */
modal(titulo, cuerpo, opciones, bloqueado=false){
  this.bloqueado = bloqueado;
  this.el.mTitulo.textContent = titulo;
  this.el.mCuerpo.innerHTML = cuerpo;
  this.el.mOpciones.innerHTML = '';
  for(const op of opciones){
    const b = document.createElement('button');
    b.className = 'opcion' + (op.clase?' '+op.clase:'');
    b.innerHTML = op.texto + (op.req?`<span class="req">${op.req}</span>`:'');
    b.disabled = !!op.deshabilitado;
    b.onclick = ()=>{ SFX.clic(); op.fn(); };
    this.el.mOpciones.appendChild(b);
  }
  this.el.modal.classList.remove('oculto');
},
cerrarModal(){ this.el.modal.classList.add('oculto'); this.bloqueado=false; },

modalEvento(ev){
  const ops = ev.opciones.map(op=>({
    texto: op.texto,
    req: J.textoReq(op.req),
    deshabilitado: !J.cumpleReq(op.req),
    fn: ()=>{
      const txt = J.resolverEvento(op);
      if(txt===null) return;                       // la opción abrió otra ventana
      this.modal(ev.titulo, `<em>${op.texto}</em>\n\n${txt}`,
        [{ texto:'Continuar', fn:()=>this.cerrarModal() }], true);
    }
  }));
  this.modal(ev.titulo, ev.texto, ops, true);
},

modalMapa(){
  const D = TXT.deriva;
  if(J.combustible<=0 && J.saltosGratis<=0){
    this.modal(D.titulo, D.texto, [
      { texto:D.baliza, req:D.balizaReq, fn:()=>{
          this.cerrarModal();
          if(Math.random()<0.55){ J.recurso('combustible',2); J.reg(D.balizaBien,'bien'); }
          else { J.dañarCasco(2); J.reg(D.balizaMal,'mal'); J.combate(); }
        }},
      { texto:D.refinar, req:D.refinarReq, deshabilitado: J.chatarra<30, fn:()=>{
          this.cerrarModal();
          J.recurso('chatarra',-30); J.recurso('combustible',2); J.moralTodos(-5);
          J.reg(D.refinarLog,'avi');
        }}
    ], true);
    return;
  }
  const m = J.margen();
  const color = m<=1 ? 'var(--peligro)' : 'var(--acento)';
  const cab = `<span style="color:var(--fosforo-mate)">${
      TXT.mapaCabecera(J.sector+1, Math.min(J.salto+1, SECTORES[J.sector].saltos), SECTORES[J.sector].saltos)}</span>`
    + `\n<span style="color:${color}">⚑ ${TXT.mapaAcoso(m)}</span>`;
  const O = LEX.nodos.oculto;
  const nodos = J.nodos.map(n=>`
    <button class="nodo">
      <span class="n-icono">${n.oculto?O[0]:n.icono}</span>
      <span class="n-tipo">${n.oculto?O[1]:n.etiqueta}</span>
      <span class="n-desc">${n.oculto?O[2]:n.desc}</span>
    </button>`).join('');
  this.modal(LEX.tituloMapa, cab + `<div class="mapa-nodos" style="margin-top:12px">${nodos}</div>`,
    [{ texto:'Cancelar', fn:()=>this.cerrarModal() }]);
  this.el.mCuerpo.querySelectorAll('.nodo').forEach((b,i)=>{
    b.onclick = ()=>{ SFX.clic(); this.cerrarModal(); J.saltar(J.nodos[i]); };
  });
},

modalMejoras(){
  const filas = Object.keys(SISTEMAS).map(k=>{
    const s=J.sistemas[k], d=SISTEMAS[k], tope=s.nivel>=d.max, p=J.precioMejora(k);
    return `<button class="articulo" data-k="${k}" ${tope||J.chatarra<p?'disabled':''}>
      <span class="art-nombre">${d.icono} ${d.nombre} — N${s.nivel}/${d.max}</span>
      <span class="art-desc">${d.desc}</span>
      <span class="art-precio">${tope?'AL MÁXIMO':p+' '+LEX.monedaNom}</span></button>`;
  }).join('');
  this.modal(LEX.tituloMejoras,
    `${LEX.moneda} disponible: <em>${J.chatarra}</em>\n<div class="sub-titulo">SISTEMAS</div><div class="rejilla-tienda">${filas}</div>`,
    [{ texto:'Cerrar', fn:()=>this.cerrarModal() }]);
  this.el.mCuerpo.querySelectorAll('.articulo').forEach(b=>{
    b.onclick = ()=>{ if(J.mejorar(b.dataset.k)) this.modalMejoras(); };
  });
},

modalTienda(){
  const T = LEX.tienda, M = LEX.monedaNom;
  // El stock es de ESTA parada: la clave lleva región y tramo, porque el
  // número de tramo se reinicia al cambiar de región.
  const parada = J.sector+':'+J.salto;
  if(!J.stock || J.stockParada!==parada){
    J.stockParada = parada;
    const claves = Object.keys(ARMAS).sort(()=>Math.random()-0.5).slice(0,3);
    // En la PRIMERA tienda de la partida garantizamos un arma capaz de abrirse
    // paso entre defensas. Con el armamento de salida, un enemigo de 2 capas es
    // literalmente invulnerable, y eso no se puede dejar al azar del stock.
    if(!J.tiendasVisitadas){
      const abrelatas = Object.keys(ARMAS).find(k=>ARMAS[k].ion)
                     || Object.keys(ARMAS).find(k=>ARMAS[k].disparos>=3)
                     || Object.keys(ARMAS).sort((a,b)=>ARMAS[a].precio-ARMAS[b].precio)[0];
      if(abrelatas && !claves.includes(abrelatas)) claves[0] = abrelatas;
    }
    J.tiendasVisitadas = (J.tiendasVisitadas||0) + 1;
    J.stock = { armas:claves.map(c=>({clave:c, vendido:false})), tripulante:Math.random()<0.6 };
  }
  const art = (nom,desc,precio,id,dis)=>
    `<button class="articulo" data-id="${id}" ${dis?'disabled':''}>
      <span class="art-nombre">${nom}</span><span class="art-desc">${desc}</span>
      <span class="art-precio">${precio}</span></button>`;
  const costeFull = (J.cascoMax-Math.ceil(J.casco))*4;

  let html = `${LEX.moneda}: <em>${J.chatarra}</em>   ·   ${LEX.casco}: <em>${Math.ceil(J.casco)}/${J.cascoMax}</em>\n`;
  html += `<div class="sub-titulo">${T.seccionSuministros}</div><div class="rejilla-tienda">`;
  html += art(T.repara[0], T.repara[1], '18 '+M, 'rep', J.chatarra<18||J.casco>=J.cascoMax);
  html += art(T.reparaFull[0], T.reparaFull[1], costeFull+' '+M, 'repfull', J.casco>=J.cascoMax || J.chatarra<costeFull);
  html += art(T.combustible[0], T.combustible[1], '24 '+M, 'fuel', J.chatarra<24);
  html += art(T.municion[0], T.municion[1], '26 '+M, 'ammo', J.chatarra<26);
  html += `</div>`;

  html += `<div class="sub-titulo">${T.seccionArmas}</div><div class="rejilla-tienda">`;
  J.stock.armas.forEach((s,i)=>{
    const d = ARMAS[s.clave];
    html += art(d.nombre, d.desc + ` (${d.dmg} dmg ×${d.disparos}, ⚡${d.coste})`,
      s.vendido?'VENDIDO':d.precio+' '+M, 'arma'+i,
      s.vendido || J.chatarra<d.precio || J.arsenal.length>=4);
  });
  html += `</div>`;

  if(J.stock.tripulante){
    html += `<div class="sub-titulo">${T.seccionGente}</div><div class="rejilla-tienda">`;
    html += art(T.recluta[0], T.recluta[1], '40 '+M, 'trip', J.chatarra<40 || J.tripulacion.length>=6);
    html += `</div>`;
  }

  this.modal(LEX.tituloTienda, html, [{ texto:LEX.salirTienda, fn:()=>this.cerrarModal() }]);
  this.el.mCuerpo.querySelectorAll('.articulo').forEach(b=>{
    b.onclick = ()=>{
      const id = b.dataset.id; SFX.pip();
      if(id==='rep')     { J.chatarra-=18; J.repararCasco(5); }
      if(id==='repfull') { J.chatarra-=costeFull; J.casco=J.cascoMax; }
      if(id==='fuel')    { J.chatarra-=24; J.recurso('combustible',2); }
      if(id==='ammo')    { J.chatarra-=26; J.recurso('misiles',3); }
      if(id==='trip')    { J.chatarra-=40; J.reclutar(); J.stock.tripulante=false; }
      if(id.startsWith('arma')){
        const s = J.stock.armas[+id.slice(4)], d=ARMAS[s.clave];
        J.chatarra -= d.precio; s.vendido=true;
        J.arsenal.push({clave:s.clave, activa:false, carga:0});
        J.reg(TXT.logCompra(d.nombre),'bien'); this.sucio('armas');
      }
      this.modalTienda();
    };
  });
},

modalAyuda(){
  const filas = MANUAL.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('');
  this.modal(LEX.tituloManual, `<table class="manual">${filas}</table>`,
    [{ texto:'Entendido', fn:()=>this.cerrarModal() }]);
},

modalFin(victoria, info){
  this.modal(info.titulo,
    info.texto + `\n\n<em>${TXT.finPie(J.sector+1, J.salto, J.chatarra)}</em>`,
    [
      { texto:TXT.reiniciar, fn:()=>{
          this.cerrarModal(); J.nuevaPartida();
          this.firmaTrip=''; this.firmaArmas=''; this.firmaLog=-1; } },
      { texto:'Volver al menú', fn:()=>{ location.href='index.html'; } }
    ], true);
}

};

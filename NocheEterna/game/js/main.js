// ============================================================
//  MAIN — arranque, bucle de dibujo y flujo de la partida.
// ============================================================

const Juego = {
  cap: '1',   // capítulo en curso: '1', '2A' (ganaste el Acto 1) o '2B' (lo perdiste)

  titulo() {
    Ojo.detener();
    Motor.tecla = null;
    UI.limpiar();
    HUD.mostrar(false);
    Motor.escena = 'titulo';
    const t = UI.pos(UI.crear('div', 'titulo'), 0, 0, 320, 180);
    t.innerHTML = `
      <div class="t-logo">
        <p class="t-anio">NUEVA BERLÍN · 2040</p>
        <h1>LA NOCHE<br>ETERNA</h1>
        <p class="t-lema">«¿Recuerdas Madrid?»</p>
      </div>
      <div class="t-menu"></div>
      <p class="t-pie">${this.hayActo2() ? 'Capítulo 1 · Siete días &nbsp;·&nbsp; Capítulo 2 · Quien controla la luz' : 'Capítulo 1 · Siete días'}</p>`;
    const menu = t.querySelector('.t-menu');
    const guardada = this.leer();
    if (guardada) UI.boton(`Continuar · ${this.etiqueta(guardada)}`, 'rojo grande', () => this.continuar(guardada), menu);
    UI.boton('Nueva partida', guardada ? 'grande' : 'rojo grande', () => this.nuevaPartida(), menu);
    if (this.hayActo2()) UI.boton('Capítulo 2 ▸', '', () => this.menuActo2(), menu);
  },

  // Orden del capítulo 1. El capítulo 2 está en historia/acto2/ (window.ACTO2).
  CAPITULO: [
    { tipo: 'dia', datos: DIA1 },
    { tipo: 'noche', datos: NOCHE1 },
    { tipo: 'dia', datos: DIA2 },
    { tipo: 'noche', datos: NOCHE2 },
    { tipo: 'dia', datos: DIA3 },
    { tipo: 'noche', datos: NOCHE3 },
    { tipo: 'dia', datos: DIA4 },
    { tipo: 'noche', datos: NOCHE4 },
    { tipo: 'dia', datos: DIA5 },
    { tipo: 'noche', datos: NOCHE5 },
    { tipo: 'dia', datos: DIA6 },
    { tipo: 'noche', datos: NOCHE6 },
    { tipo: 'asalto', datos: ASALTO }
  ],

  hayActo2() { return !!window.ACTO2; },
  lista(cap = this.cap) {
    if (cap === '2A') return window.ACTO2 ? ACTO2.A : [];
    if (cap === '2B') return window.ACTO2 ? ACTO2.B : [];
    return this.CAPITULO;
  },
  etiqueta(g) {
    const paso = this.lista(g.cap || '1')[g.paso];
    const nombre = paso.tipo === 'noche' ? `Noche ${paso.datos.numero}` : paso.tipo === 'cinematica' ? 'Prólogo' : `Día ${paso.datos.numero}`;
    return (g.cap && g.cap !== '1' ? 'Cap. 2 · ' : '') + nombre;
  },

  CLAVE: 'la-noche-eterna-partida',
  CLAVE_FIN1: 'la-noche-eterna-fin-capitulo-1',

  guardar(paso) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify({ cap: this.cap, paso, estado: Estado }));
    } catch (e) { /* sin almacenamiento: se juega sin guardar */ }
  },

  leer() {
    try {
      const g = JSON.parse(localStorage.getItem(this.CLAVE));
      return g && this.lista(g.cap || '1')[g.paso] ? g : null;
    } catch (e) { return null; }
  },

  borrar() {
    try { localStorage.removeItem(this.CLAVE); } catch (e) { /* nada */ }
  },

  arrancarAudio() {
    Sonido.iniciar();
    Sonido.lluvia(true);
  },

  nuevaPartida() {
    this.arrancarAudio();
    Estado.reiniciar();
    this.cap = '1';
    // La cinemática de apertura no es un paso del capítulo, para no mover los números de las partidas guardadas
    Secuencia.reproducir(CINEMATICAS.intro, () => this.jugar(0));
  },

  continuar(g) {
    this.arrancarAudio();
    Estado.reiniciar();
    Object.assign(Estado, g.estado);
    this.cap = g.cap || '1';
    // partidas guardadas con versiones anteriores: añadir operativos nuevos
    for (const o of OPERATIVOS_INICIALES) {
      if (!Estado.operativos.some(x => x.id === o.id)) Estado.operativos.push({ ...o, habilidades: { ...o.habilidades } });
    }
    Estado.brandtDetras = false;
    this.jugar(g.paso);
  },

  // Se guarda al empezar cada paso (día, noche, cinemática).
  jugar(i) {
    UI.limpiar();
    const paso = this.lista()[i];
    if (!paso) {
      this.borrar();
      return this.cap === '1' ? Motor.finPrototipo() : this.finProvisionalActo2();
    }
    this.guardar(i);
    const sig = () => this.jugar(i + 1);
    if (paso.tipo === 'dia') Dia.iniciar(paso.datos, sig);
    else if (paso.tipo === 'comite') Comite.iniciar(paso.datos, sig);
    else if (paso.tipo === 'noche') Noche.iniciar(paso.datos, sig);
    else if (paso.tipo === 'cinematica') Secuencia.reproducir(paso.datos, sig);
    else Asalto.iniciar(paso.datos, () => {});   // el asalto muestra su propio final
  },

  // ---------- el paso al capítulo 2 ----------
  finCapitulo1() {
    try { localStorage.setItem(this.CLAVE_FIN1, JSON.stringify(Estado)); } catch (e) { /* nada */ }
    this.borrar();
  },

  leerFinCapitulo1() {
    try { return JSON.parse(localStorage.getItem(this.CLAVE_FIN1)); } catch (e) { return null; }
  },

  menuActo2() {
    UI.limpiar();
    const fin1 = this.leerFinCapitulo1();
    const p = UI.pos(UI.crear('div', 'panel final'), 50, 34, 220);
    p.innerHTML = `<h2>CAPÍTULO 2</h2>
      <p class="sub">El Acto 2 continúa desde el final del Capítulo 1. Puedes usar tu partida o contar en un momento qué pasó.</p>`;
    if (fin1) UI.boton('Continuar con mi final del Capítulo 1', 'rojo', () => { this.arrancarAudio(); Estado.reiniciar(); Object.assign(Estado, fin1); this.empezarActo2(); }, p);
    UI.boton('Contar qué pasó (resumen rápido)', fin1 ? '' : 'rojo', () => {
      this.arrancarAudio();
      Estado.reiniciar();
      UI.limpiar();
      Motor.escena = 'negro';
      Motor.dialogo(ACTO2.resumen, () => this.empezarActo2());
    }, p);
    UI.boton('Volver', '', () => this.titulo(), p);
  },

  // Prepara el estado del Acto 2 a partir del final del Acto 1 y elige el prólogo.
  empezarActo2() {
    const ganada = !!Estado.banderas.vossDetenido;
    this.cap = ganada ? '2A' : '2B';
    Object.assign(Estado, {
      capitulo: 2, dia: 1, fase: 'dia', hora: 8, logros: 0, ojo: 'desviado', brandtDetras: false,
      sospecha: ganada ? 0 : 20, creditos: 20, intel: 2, suministros: 3,
      medidor: ganada ? 'comite' : 'sospecha',
      ira: Estado.banderas.precioAlto ? 45 : 30, principios: 70,
      etiquetaNoche: ganada ? 'APAGÓN' : 'COLONIA ESTE-1'
    });
    aplicar({ bandera: ['acto2', ganada ? 'ramaCiudad' : 'ramaColonia'] });
    // Resumen de quién está dónde al empezar el Acto 2 (así los guiones no repiten condiciones largas)
    const b = Estado.banderas, poner = (nombre, v) => { if (v) aplicar({ bandera: nombre }); };
    poner('juliaEnMadrid', ganada && b.juliaTraslado);
    poner('chispaVivo', (b.tomasSalvado && !b.capturado_tomas) || b.tomasRescatado);
    poner('ruthViva', !b.fuera_ruth || b.ruthRescatada);
    poner('brandtAliado', b.recluta_brandt && !b.capturado_brandt);
    poner('hansLibre', b.hansRescatado && !b.capturado_hans);
    poner('relojeroPreso', b.relojeroBajaArma || !ganada);
    poner('relojeroMuerto', b.relojeroCaido);
    this.jugar(0);
  },

  // Mientras el Acto 2 se escribe: pantalla al terminar lo que hay
  // Fin del Capítulo 2: se guarda el estado (y el final) para un posible Capítulo 3
  CLAVE_FIN2: 'la-noche-eterna-fin-capitulo-2',
  finCapitulo2(final) {
    Estado.banderas['final2_' + final.id] = true;
    try { localStorage.setItem(this.CLAVE_FIN2, JSON.stringify(Estado)); } catch (e) { /* nada */ }
    this.borrar();
  },

  finProvisionalActo2() {
    const f = ACTO2.finProvisional;
    const p = Motor.pantallaFinal(f.titulo, f.subtitulo, f.lineas.filter(l => cumple(l.si)).map(l => l.texto));
    UI.crear('p', 'nota-proto', 'Capítulo 2 en desarrollo · Continuará', p);
  }
};

(function arrancar() {
  const juego = document.getElementById('juego');
  const canvas = document.getElementById('escena');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  UI.capa = document.getElementById('capa');
  HUD.el = document.getElementById('hud');

  function ajustar() {
    const w = Math.min(window.innerWidth, window.innerHeight * 16 / 9);
    juego.style.width = w + 'px';
    juego.style.height = (w * 9 / 16) + 'px';
    juego.style.setProperty('--u', (w / 320) + 'px');
  }
  window.addEventListener('resize', ajustar);
  ajustar();

  window.addEventListener('keydown', ev => {
    if (Motor.tecla) {
      if (ev.key === ' ') ev.preventDefault();
      Motor.tecla(ev.key);
    }
  });

  const mute = document.getElementById('mute');
  mute.addEventListener('click', () => {
    mute.textContent = Sonido.alternar() ? '♪' : '×';
  });

  // Lienzo auxiliar para las cinemáticas: la escena se dibuja aquí y la cámara recorta y amplía
  const lienzoCamara = document.createElement('canvas');
  lienzoCamara.width = 320; lienzoCamara.height = 180;
  const ctxCamara = lienzoCamara.getContext('2d');

  function bucle(ms) {
    const t = ms / 1000;
    const dibujar = Pixel.escenas[Motor.escena] || Pixel.escenas.negro;
    const cam = Secuencia.camara(ms);
    if (cam) {
      ctxCamara.clearRect(0, 0, 320, 180);
      dibujar(ctxCamara, t, Estado);
      const sw = 320 / cam.z, sh = 180 / cam.z;
      const sx = Math.max(0, Math.min(320 - sw, cam.x - sw / 2)), sy = Math.max(0, Math.min(180 - sh, cam.y - sh / 2));
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, 320, 180);
      ctx.drawImage(lienzoCamara, sx, sy, sw, sh, 0, 0, 320, 180);
    } else dibujar(ctx, t, Estado);
    requestAnimationFrame(bucle);
  }

  Estado.reiniciar();
  Juego.titulo();
  requestAnimationFrame(bucle);
})();

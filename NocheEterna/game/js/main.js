// ============================================================
//  MAIN — arranque, bucle de dibujo y flujo de la partida.
// ============================================================

const Juego = {
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
      <p class="t-pie">Prototipo · Día 1 y Noche 1</p>`;
    const menu = t.querySelector('.t-menu');
    const guardada = this.leer();
    if (guardada) {
      const paso = this.CAPITULO[guardada.paso];
      UI.boton(`Continuar · ${paso.tipo === 'noche' ? 'Noche' : 'Día'} ${paso.datos.numero}`, 'rojo grande', () => this.continuar(guardada), menu);
    }
    UI.boton('Nueva partida', guardada ? 'grande' : 'rojo grande', () => this.nuevaPartida(), menu);
    t.querySelector('.t-pie').textContent = 'Capítulo 1 · Siete días';
  },

  // Orden del capítulo. Para añadir el Día 3: { tipo: 'dia', datos: DIA3 }, { tipo: 'noche', datos: NOCHE3 }
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

  CLAVE: 'la-noche-eterna-partida',

  guardar(paso) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify({ paso, estado: Estado }));
    } catch (e) { /* sin almacenamiento: se juega sin guardar */ }
  },

  leer() {
    try {
      const g = JSON.parse(localStorage.getItem(this.CLAVE));
      return g && this.CAPITULO[g.paso] ? g : null;
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
    this.jugar(0);
  },

  continuar(g) {
    this.arrancarAudio();
    Estado.reiniciar();
    Object.assign(Estado, g.estado);
    // partidas guardadas con versiones anteriores: añadir operativos nuevos
    for (const o of OPERATIVOS_INICIALES) {
      if (!Estado.operativos.some(x => x.id === o.id)) Estado.operativos.push({ ...o, habilidades: { ...o.habilidades } });
    }
    Estado.brandtDetras = false;
    this.jugar(g.paso);
  },

  // Se guarda al empezar cada día y cada noche.
  jugar(i) {
    UI.limpiar();
    const paso = this.CAPITULO[i];
    if (!paso) {
      this.borrar();
      return Motor.finPrototipo();
    }
    this.guardar(i);
    const sig = () => this.jugar(i + 1);
    if (paso.tipo === 'dia') Dia.iniciar(paso.datos, sig);
    else if (paso.tipo === 'noche') Noche.iniciar(paso.datos, sig);
    else Asalto.iniciar(paso.datos, () => {});   // el asalto muestra su propio final
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

  function bucle(ms) {
    const t = ms / 1000;
    const dibujar = Pixel.escenas[Motor.escena] || Pixel.escenas.negro;
    dibujar(ctx, t, Estado);
    requestAnimationFrame(bucle);
  }

  Estado.reiniciar();
  Juego.titulo();
  requestAnimationFrame(bucle);
})();

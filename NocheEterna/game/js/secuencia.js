// ============================================================
//  SECUENCIA — cinemáticas con texto dentro del juego.
//  Una secuencia es una lista de planos. Cada plano:
//    escena:  fondo de js/pixel.js (titulo, calle, aguja, oficina, sotano, anden, ...)
//    camara:  { de: {x, y, z}, a: {x, y, z} }  movimiento durante el plano (x, y en píxeles de 320×180; z = zoom)
//    titulo:  rótulo grande opcional (p. ej. «2031 · LA NOCHE LARGA»)
//    texto:   narración que se escribe sola
//    dur:     segundos que dura el plano después de escribirse el texto
//    si:      (opcional) el plano solo aparece si se cumple la condición, como en los diálogos
//  Clic, Espacio o Enter: completar el texto / pasar al siguiente plano. Esc o «Saltar»: saltar la secuencia.
//  Uso: Secuencia.reproducir(CINEMATICAS.intro, () => { ...lo siguiente... })
//  En el capítulo: { tipo: 'cinematica', datos: CINEMATICAS.algo }
// ============================================================

const Secuencia = {
  activa: false,

  reproducir(datos, alTerminar) {
    const planos = (datos.planos || []).filter(p => cumple(p.si));
    if (!planos.length) return alTerminar && alTerminar();
    Object.assign(this, { planos, fin: alTerminar, i: -1, activa: true, escrito: 0, t0: 0, reloj: null });
    Ojo.detener();
    UI.limpiar();
    HUD.mostrar(false);
    const c = UI.pos(UI.crear('div', 'secuencia'), 0, 0, 320, 180);
    c.innerHTML = `
      <div class="sc-banda arriba"></div><div class="sc-banda abajo"></div>
      <div class="sc-titulo"></div>
      <div class="sc-texto"></div>
      <div class="sc-velo"></div>`;
    this.capa = c;
    this.elTitulo = c.querySelector('.sc-titulo');
    this.elTexto = c.querySelector('.sc-texto');
    this.velo = c.querySelector('.sc-velo');
    UI.boton('Saltar ▸▸', 'sc-saltar', ev => { ev.stopPropagation(); this.terminar(); }, c);
    c.addEventListener('click', () => this.avanzar());
    Motor.tecla = k => {
      if (k === 'Escape') this.terminar();
      else if (k === ' ' || k === 'Enter') this.avanzar();
    };
    this.siguiente();
  },

  // posición de la cámara ahora mismo (la usa el bucle de dibujo de main.js)
  camara(ms) {
    if (!this.activa || !this.plano || !this.plano.camara) return null;
    const { de, a = de } = this.plano.camara;
    const total = this.duracion(this.plano) * 1000;
    const p = Math.min(1, Math.max(0, (ms - this.t0) / total));
    const s = p * p * (3 - 2 * p);
    return { x: de.x + (a.x - de.x) * s, y: de.y + (a.y - de.y) * s, z: de.z + (a.z - de.z) * s };
  },

  duracion(p) { return (p.texto ? p.texto.length * 0.045 : 0) + (p.dur != null ? p.dur : 2.5); },

  siguiente() {
    clearInterval(this.reloj); clearTimeout(this.auto);
    this.i++;
    const p = this.planos[this.i];
    if (!p) return this.terminar();
    // fundido a negro entre planos
    this.velo.classList.add('activo');
    setTimeout(() => {
      if (!this.activa) return;
      this.plano = p;
      this.t0 = performance.now();
      Motor.escena = p.escena || 'negro';
      this.elTitulo.textContent = p.titulo || '';
      this.elTitulo.classList.toggle('visible', !!p.titulo);
      this.elTexto.textContent = '';
      this.escrito = 0;
      this.velo.classList.remove('activo');
      const texto = p.texto || '';
      this.reloj = setInterval(() => {
        this.escrito++;
        this.elTexto.textContent = texto.slice(0, this.escrito);
        if (this.escrito >= texto.length) clearInterval(this.reloj);
      }, 45);
      this.auto = setTimeout(() => this.siguiente(), this.duracion(p) * 1000 + 400);
    }, this.i === 0 ? 50 : 450);
  },

  avanzar() {
    if (!this.plano) return;
    const texto = this.plano.texto || '';
    if (this.escrito < texto.length) {
      clearInterval(this.reloj);
      this.escrito = texto.length;
      this.elTexto.textContent = texto;
    } else this.siguiente();
  },

  terminar() {
    if (!this.activa) return;
    this.activa = false;
    clearInterval(this.reloj); clearTimeout(this.auto);
    this.plano = null;
    Motor.tecla = null;
    this.capa.classList.add('fuera');
    setTimeout(() => {
      UI.limpiar();
      this.fin && this.fin();
    }, 500);
  }
};

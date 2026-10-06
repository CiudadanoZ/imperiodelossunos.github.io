// ============================================================
//  MOTOR — estado de la partida, interfaz, diálogos y flujo.
// ============================================================

const Estado = {
  reiniciar() {
    Object.assign(this, {
      dia: 1, hora: 8, fase: 'dia',
      sospecha: 0, creditos: 0, intel: 0, suministros: 1, red: 3,
      vinculo_mara: 0, vinculo_tomas: 0, vinculo_ruth: 0,
      logros: 0,
      banderas: {}, ojo: 'desviado',
      operativos: OPERATIVOS_INICIALES.map(o => ({ ...o, habilidades: { ...o.habilidades } }))
    });
  }
};

// ---------- condiciones y efectos ----------
function cumple(cond) {
  if (!cond) return true;
  if (Array.isArray(cond)) return cond.every(cumple);
  const m = cond.match(/^(\w+)\s*(>=|<=|>|<|==)\s*(-?\d+)$/);
  if (m) {
    const v = Number(Estado[m[1]] || 0), n = Number(m[3]);
    return { '>=': v >= n, '<=': v <= n, '>': v > n, '<': v < n, '==': v === n }[m[2]];
  }
  if (cond[0] === '!') return !Estado.banderas[cond.slice(1)];
  return !!Estado.banderas[cond];
}

function aplicar(ef) {
  if (!ef) return;
  for (const [k, v] of Object.entries(ef)) {
    if (k === 'bandera') [].concat(v).forEach(b => { Estado.banderas[b] = true; });
    else if (typeof Estado[k] === 'number') Estado[k] = Math.max(0, Estado[k] + v);
  }
  Estado.sospecha = Math.min(100, Estado.sospecha);
  HUD.actualizar();
}

const NOMBRES_RECURSO = { suministros: 'suministros', intel: 'información', creditos: 'cr', red: 'red', sospecha: 'sospecha' };
function describirEfecto(ef, signo = '+') {
  if (!ef) return '';
  return Object.entries(ef)
    .filter(([k]) => k !== 'bandera')
    .map(([k, v]) => `${v < 0 ? '−' + -v : signo + v} ${NOMBRES_RECURSO[k] || k}`)
    .join(' · ');
}

// ---------- interfaz ----------
const UI = {
  capa: null, velo: null,
  limpiar() { this.capa.innerHTML = ''; },
  crear(tag, cls, html, padre) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    (padre || this.capa).appendChild(e);
    return e;
  },
  pos(e, x, y, w, h) {
    const u = v => `calc(var(--u) * ${v})`;
    e.style.left = u(x); e.style.top = u(y);
    if (w != null) e.style.width = u(w);
    if (h != null) e.style.height = u(h);
    return e;
  },
  boton(texto, cls, alPulsar, padre) {
    const b = this.crear('button', 'btn ' + (cls || ''), texto, padre);
    b.addEventListener('click', ev => { ev.stopPropagation(); Sonido.clic(); alPulsar(ev); });
    return b;
  },
  aviso(texto, tipo = '') {
    let pila = document.getElementById('avisos');
    if (!pila) {
      pila = document.createElement('div');
      pila.id = 'avisos';
      document.getElementById('juego').appendChild(pila);
    }
    const t = this.crear('div', 'aviso ' + tipo, texto, pila);
    const dura = tipo.includes('grande') ? 6000 : 2200;
    setTimeout(() => t.classList.add('fuera'), dura);
    setTimeout(() => t.remove(), dura + 600);
  },
  retrato(idOParams, padre, cls = 'retrato') {
    let canvas;
    if (typeof idOParams === 'string') {
      const p = PERSONAJES[idOParams];
      canvas = Pixel.retrato(p ? p.retrato : {});
    } else canvas = Pixel.retrato(idOParams);
    canvas.className = cls;
    if (padre) padre.appendChild(canvas);
    return canvas;
  }
};

const HUD = {
  el: null,
  mostrar(v) { this.el.classList.toggle('oculto', !v); this.actualizar(); },
  actualizar() {
    if (!this.el || !Estado.banderas) return;
    const hh = String(Math.floor(Estado.hora)).padStart(2, '0');
    const mm = String(Math.floor((Estado.hora % 1) * 60)).padStart(2, '0');
    const ojo = Estado.fase === 'noche'
      ? '<span class="luna">☾ TOQUE DE QUEDA</span>'
      : Estado.brandtDetras
        ? `<span class="ojo ojo-mirando">● ${(PERSONAJES[Estado.vigilante] || PERSONAJES.brandt).nombre.toUpperCase()} DETRÁS DE TI</span>`
      : Ojo.t
        ? `<span class="ojo ojo-${Estado.ojo}">● OJO: ${{ mirando: 'VIGILANDO', aviso: 'GIRANDO', desviado: 'DESVIADO' }[Estado.ojo]}</span>`
        : '<span></span>';
    const s = Estado.sospecha;
    const nivel = s >= 70 ? 'alta' : s >= 40 ? 'media' : 'baja';
    this.el.innerHTML = `
      <span class="h-dia">${Estado.fase === 'dia' ? 'DÍA' : 'NOCHE'} ${Estado.dia} · ${hh}:${mm}</span>
      ${ojo}
      <span class="h-sos">SOSPECHA <span class="barra"><span class="relleno ${nivel}" style="width:${s}%"></span></span> ${s}%</span>
      <span class="h-rec">cr ${Estado.creditos} · INFO ${Estado.intel} · SUMIN ${Estado.suministros} · RED ${Estado.red}</span>`;
  }
};

// ---------- motor ----------
const Motor = {
  escena: 'titulo',
  tecla: null,

  // Ejecuta un guion de diálogo { inicio, nodos } y llama a alTerminar al acabar.
  dialogo(guion, alTerminar) {
    const caja = UI.pos(UI.crear('div', 'dialogo'), 6, 118, 308, 58);
    const marco = UI.crear('div', 'd-retrato', null, caja);
    const cuerpo = UI.crear('div', 'd-cuerpo', null, caja);
    const nombre = UI.crear('div', 'd-nombre', null, cuerpo);
    const texto = UI.crear('div', 'd-texto', null, cuerpo);
    const sigue = UI.crear('div', 'd-sigue', '▼', caja);
    const opciones = UI.crear('div', 'opciones');

    let escribiendo = null, completo = '', nodoActual = null;

    const terminar = () => {
      clearInterval(escribiendo);
      caja.remove(); opciones.remove();
      this.tecla = null;
      alTerminar && alTerminar();
    };

    const mostrarOpciones = () => {
      const lista = (nodoActual.opciones || []).filter(o => cumple(o.si));
      opciones.innerHTML = '';
      lista.forEach((o, i) => {
        UI.boton(`<span class="num">${i + 1}</span> ${o.texto}`, 'opcion', () => elegir(o), opciones);
      });
    };

    const elegir = (o) => {
      aplicar(o.efecto);
      opciones.innerHTML = '';
      paso(o.ir);
    };

    const finEscritura = () => {
      clearInterval(escribiendo); escribiendo = null;
      texto.textContent = completo;
      if (nodoActual.opciones) { sigue.style.visibility = 'hidden'; mostrarOpciones(); }
      else sigue.style.visibility = 'visible';
    };

    const avanzar = () => {
      if (escribiendo) return finEscritura();
      if (nodoActual.opciones) return;
      if (nodoActual.siguiente) paso(nodoActual.siguiente);
      else terminar();
    };

    const paso = (id) => {
      let n = guion.nodos[id];
      for (let k = 0; n && k < 200; k++) {
        if (n.si && !cumple(n.si)) { id = n.siguiente; n = guion.nodos[id]; continue; }
        if (n.rama) {
          const r = n.rama.find(x => cumple(x.si));
          aplicar(n.efecto);
          id = r ? r.ir : n.siguiente; n = guion.nodos[id];
          continue;
        }
        break;
      }
      if (!n) return terminar();
      nodoActual = n;
      if (n.escena) this.escena = n.escena;
      aplicar(n.efecto);

      const p = n.quien ? PERSONAJES[n.quien] : null;
      marco.innerHTML = '';
      caja.classList.toggle('narrador', !p);
      caja.classList.toggle('pensamiento', !!n.pensamiento);
      if (p) {
        UI.retrato(n.quien, marco);
        nombre.textContent = n.pensamiento ? `${p.nombre} (piensa)` : p.nombre;
        nombre.style.color = p.color;
      } else nombre.textContent = '';

      completo = n.texto;
      texto.textContent = '';
      sigue.style.visibility = 'hidden';
      let i = 0;
      clearInterval(escribiendo);
      escribiendo = setInterval(() => {
        i += 2;
        texto.textContent = completo.slice(0, i);
        if (i % 4 === 0) Sonido.tecla();
        if (i >= completo.length) finEscritura();
      }, 28);
    };

    caja.addEventListener('click', avanzar);
    this.tecla = (k) => {
      if (k === ' ' || k === 'Enter') avanzar();
      const num = parseInt(k, 10);
      if (num && nodoActual && nodoActual.opciones && !escribiendo) {
        const lista = nodoActual.opciones.filter(o => cumple(o.si));
        if (lista[num - 1]) elegir(lista[num - 1]);
      }
    };
    paso(guion.inicio);
  },

  transicion(titulo, subtitulo, cb) {
    const v = UI.crear('div', 'transicion', `<h1>${titulo}</h1><p>${subtitulo || ''}</p>`, document.getElementById('juego'));
    let hecho = false;
    const salir = () => {
      if (hecho) return; hecho = true;
      v.classList.add('fuera');
      setTimeout(() => v.remove(), 600);
      cb && cb();
    };
    v.addEventListener('click', salir);
    setTimeout(salir, 2800);
  },

  // Devuelve true si la partida ha terminado por sospecha.
  // Primera vez que se llega al 100%: una última advertencia (baja a 85%). La segunda, detención.
  comprobarSospecha() {
    if (Estado.sospecha < 100) return false;
    if (!Estado.banderas.ultimaAdvertencia) {
      Estado.banderas.ultimaAdvertencia = true;
      Estado.sospecha = 85;
      HUD.actualizar();
      Sonido.alerta();
      UI.aviso('ÚLTIMA ADVERTENCIA · La Dirección de Seguridad ha abierto un expediente a tu nombre. La próxima vez, vendrán a por ti.', 'malo grande');
      return false;
    }
    Ojo.detener();
    UI.limpiar();
    Sonido.alerta();
    this.dialogo(FINALES.detenido, () => this.pantallaFinal('DETENIDO', 'La Orden te observaba porque la Orden te cuida.', []));
    return true;
  },

  pantallaFinal(titulo, subtitulo, lineas) {
    UI.limpiar(); HUD.mostrar(false);
    this.escena = 'titulo';
    const p = UI.pos(UI.crear('div', 'panel final'), 40, 20, 240);
    p.innerHTML = `<h2>${titulo}</h2><p class="sub">${subtitulo}</p>`;
    const ul = UI.crear('ul', 'resumen', null, p);
    lineas.forEach(l => UI.crear('li', null, l, ul));
    UI.crear('p', 'stats',
      `Sospecha ${Estado.sospecha}% · cr ${Estado.creditos} · Información ${Estado.intel} · Suministros ${Estado.suministros} · Red ${Estado.red}`, p);
    UI.boton('Volver al título', 'rojo', () => Juego.titulo(), p);
  },

  finPrototipo() {
    const f = FINALES.prototipo;
    const lineas = f.lineas.filter(l => cumple(l.si)).map(l => l.texto);
    this.pantallaFinal(f.titulo, f.subtitulo, lineas);
    UI.crear('p', 'nota-proto', 'Fin del prototipo · Continuará en el Día 6', UI.capa.querySelector('.final'));
  }
};

// ---------- el Ojo (cámara de vigilancia de la oficina) ----------
const Ojo = {
  t: null, cb: null,
  AVISO_MINIMO: 1500,     // más largo que memorizar o falsificar
  ritmo: null,
  // ritmo: { desviado: [min, max], aviso: ms, mirando: [min, max] } en milisegundos
  iniciar(cb, ritmo) {
    this.cb = cb;
    this.ritmo = Object.assign({ desviado: [3000, 6500], aviso: 1100, mirando: [2500, 5000] }, ritmo || {});
    this.poner('desviado'); this.programar(); HUD.actualizar();
  },
  poner(s) { Estado.ojo = s; this.cb && this.cb(s); HUD.actualizar(); },
  // Brandt detrás de Elías: vigilancia constante mientras dure
  forzar(v, quien = 'brandt') {
    if (v && this.forzado && Estado.vigilante !== quien) { Estado.vigilante = quien; HUD.actualizar(); return; }
    if (v === !!this.forzado) return;
    this.forzado = v;
    Estado.brandtDetras = v;
    Estado.vigilante = quien;
    clearTimeout(this.t);
    if (v) { this.t = this.t || 1; this.poner('mirando'); }
    else { this.poner('desviado'); this.programar(); }
  },
  programar() {
    if (this.forzado) return;
    const s = Estado.ojo;
    const R = this.ritmo;
    const entre = ([a, b]) => a + Math.random() * (b - a);
    let sig, dur;
    if (s === 'desviado') { sig = 'aviso'; dur = entre(R.desviado); }
    else if (s === 'aviso') { sig = 'mirando'; dur = Math.max(R.aviso, this.AVISO_MINIMO); }
    else { sig = 'desviado'; dur = entre(R.mirando); }
    this.t = setTimeout(() => {
      this.poner(sig);
      if (sig === 'aviso') Sonido.aviso();
      this.programar();
    }, dur);
  },
  detener() {
    clearTimeout(this.t); this.t = null; this.cb = null;
    this.forzado = false; Estado.brandtDetras = false; Estado.ojo = 'desviado';
  }
};

// ============================================================
//  ASALTO — el Día 7. Una secuencia de fases: diálogo y, a veces, una prueba.
//  En cada prueba el jugador ve qué suma cada cosa que consiguió durante la semana.
//  Al final se elige uno de los finales (el primero cuya condición se cumpla).
// ============================================================

const Asalto = {
  iniciar(datos, alTerminar) {
    Object.assign(this, { d: datos, fin: alTerminar });
    Estado.dia = datos.numero;
    Estado.fase = 'noche';
    Estado.hora = 6;
    HUD.mostrar(true);
    Motor.escena = 'titulo';
    Motor.transicion(datos.titulo, datos.fecha, () => this.fase(0));
  },

  fase(i) {
    const f = this.d.fases[i];
    if (!f) return this.final();
    if (f.si && !cumple(f.si)) return this.fase(i + 1);
    if (f.hora != null) {
      Estado.hora = f.hora;
      Estado.fase = f.hora < 18 ? 'dia' : 'noche';
      HUD.actualizar();
    }
    const sig = () => this.fase(i + 1);
    const tras = () => (f.prueba ? this.prueba(f, sig) : sig());
    UI.limpiar();
    if (f.guion) Motor.dialogo(f.guion, tras);
    else tras();
  },

  probabilidad(pr) {
    const factores = (pr.bonus || []).filter(b => cumple(b.si));
    const total = pr.base + factores.reduce((t, b) => t + b.mas, 0);
    return { prob: Math.max(5, Math.min(95, total)), factores };
  },

  prueba(f, sig) {
    const pr = f.prueba;
    const { prob, factores } = this.probabilidad(pr);
    UI.limpiar();
    const p = UI.pos(UI.crear('div', 'panel resultado asalto'), 40, 16, 240);
    p.innerHTML = `
      <h2>${pr.titulo}</h2>
      <p class="a-desc">${pr.desc}</p>
      <ul class="factores">
        <li><span>Base</span><b>${pr.base}%</b></li>
        ${factores.map(b => `<li class="${b.mas < 0 ? 'malo' : 'bueno'}"><span>${b.texto}</span><b>${b.mas > 0 ? '+' : ''}${b.mas}%</b></li>`).join('')}
      </ul>
      <div class="r-tirada">Probabilidad: ${prob}%<div class="dado">--</div></div>
      <div class="r-texto"></div>
      <div class="r-pie"></div>`;
    const dado = p.querySelector('.dado');
    const tirada = 1 + Math.floor(Math.random() * 100);
    let n = 0;
    const giro = setInterval(() => {
      dado.textContent = 1 + Math.floor(Math.random() * 100);
      Sonido.tirada();
      if (++n > 22) {
        clearInterval(giro);
        dado.textContent = tirada;
        const exito = tirada <= prob;
        const res = exito ? pr.exito : pr.fracaso;
        (exito ? Sonido.exito : Sonido.fracaso)();
        p.classList.add(exito ? 'exito' : 'fracaso');
        aplicar(res.efecto);
        aplicar({ bandera: `${f.id}${exito ? 'Exito' : 'Fracaso'}` });
        p.querySelector('.r-texto').innerHTML = `<p class="${exito ? 'bueno' : 'malo'}">${exito ? 'ÉXITO' : 'FRACASO'}</p><p>${res.texto}</p>`;
        UI.boton('Continuar ▸', 'rojo', () => {
          UI.limpiar();
          if (res.guion) Motor.dialogo(res.guion, sig);
          else sig();
        }, p.querySelector('.r-pie'));
      }
    }, 70);
  },

  final() {
    const fin = this.d.finales.find(x => cumple(x.si)) || this.d.finales[this.d.finales.length - 1];
    UI.limpiar();
    Motor.dialogo(fin.guion, () => {
      Juego.borrar();
      const lineas = (this.d.destinos || []).filter(l => cumple(l.si)).map(l => l.texto);
      Motor.pantallaFinal(fin.titulo, fin.subtitulo, lineas);
      UI.crear('p', 'nota-proto', 'Fin del Capítulo 1 · Gracias por jugar', UI.capa.querySelector('.final'));
      this.fin && this.fin();
    });
  }
};

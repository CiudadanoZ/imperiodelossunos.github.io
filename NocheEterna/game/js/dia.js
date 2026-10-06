// ============================================================
//  DÍA — el Ministerio de Registro.
// ============================================================

// Memorizar y falsificar duran menos que el aviso amarillo del Ojo (Ojo.AVISO_MINIMO):
// si empiezas con el Ojo gris, nunca te pillan. Si empiezas en amarillo, es probable.
const DURACION_MEMORIZAR = 1200;
const DURACION_FALSIFICAR = 1300;

const Dia = {
  iniciar(datos, alTerminar) {
    Object.assign(this, {
      d: datos, fin: alTerminar, i: 0,
      exps: datos.expedientes.filter(e => cumple(e.si)),
      errores: 0, correctos: 0, salario: 0,
      ocupado: false, memorizados: new Set()
    });
    Estado.dia = datos.numero;
    Estado.fase = 'dia';
    Estado.hora = datos.horaInicio - 2;
    this.escena = 'apartamento';
    Motor.escena = 'apartamento';
    HUD.mostrar(true);
    Motor.transicion(`DÍA ${datos.numero}`, datos.fecha, () => {
      Motor.dialogo(datos.intro, () => this.mesa());
    });
  },

  mesa() {
    Estado.hora = this.d.horaInicio;
    Motor.escena = 'oficina';
    UI.limpiar();
    HUD.actualizar();

    const dir = this.d.directivas;
    const panel = UI.pos(UI.crear('div', 'directivas'), 4, 80, 144, 96);
    panel.innerHTML = `
      <h3>${dir.titulo}</h3>
      <ol>${dir.textos.map(t => `<li>${t}</li>`).join('')}</ol>
      <div class="gris"><b>LISTA GRIS:</b> ${dir.listaGris.join(' · ')}</div>`;

    this.papel = UI.pos(UI.crear('div', 'papel'), 152, 14, 164, 162);
    Ojo.iniciar(s => {
      if (this.papel) {
        this.papel.classList.toggle('vigilado', s === 'mirando');
        this.papel.classList.toggle('avisado', s === 'aviso');
      }
    }, ((this.d.ojoSi || []).find(x => cumple(x.si)) || {}).ojo || this.d.ojo);
    Motor.tecla = (k) => {
      const t = k.toLowerCase();
      if (t === 'a') this.decidir('aprobar');
      if (t === 'r') this.decidir('rechazar');
      if (t === 'm') this.memorizar();
      if (t === 'f') this.falsificar();
    };
    this.mostrar();
  },

  expediente() { return this.exps[this.i]; },

  mostrar() {
    const e = this.expediente();
    if (!e) return this.terminar();
    const pensamiento = ((e.comentarioSi || []).find(c => cumple(c.si)) || {}).texto || e.comentario || '';
    const tipoCls = { 'RACIÓN': 'racion', 'VIAJE': 'viaje', 'REUBICACIÓN': 'reubicacion' }[e.tipo] || '';
    this.papel.innerHTML = `
      <div class="p-cab">MINISTERIO DE REGISTRO · NUEVA BERLÍN
        <span class="p-num">Nº ${e.numero}</span></div>
      <div class="p-tipo ${tipoCls}">SOLICITUD DE ${e.tipo}</div>
      <div class="p-ficha">
        <div class="p-foto"></div>
        <dl>
          <dt>NOMBRE</dt><dd>${e.nombre}</dd>
          <dt>EDAD</dt><dd>${e.edad}</dd>
          <dt>DISTRITO</dt><dd>${e.distrito}</dd>
          <dt>ÍNDICE PUREZA</dt><dd class="indice">${e.indice}</dd>
          <dt>SELLO VÁLIDO</dt><dd>${e.sello}</dd>
        </dl>
      </div>
      <div class="p-motivo">${e.motivo}</div>
      ${e.nota ? `<div class="p-nota">${e.nota}</div>` : ''}
      <div class="p-pensar">${pensamiento}</div>
      <div class="p-botones"></div>
      <div class="p-contador">${this.i + 1} / ${this.exps.length}</div>`;

    const params = e.retratoDe
      ? { ...PERSONAJES[e.retratoDe].retrato }
      : { ...e.retrato };
    params.fondo = '#9a9384';
    const foto = e.retrato || e.retratoDe ? Pixel.retrato(params) : Pixel.retratoDesde(e.nombre);
    foto.className = 'foto-doc';
    this.papel.querySelector('.p-foto').appendChild(foto);

    const bot = this.papel.querySelector('.p-botones');
    UI.boton('<u>A</u>PROBAR', 'verde', () => this.decidir('aprobar'), bot);
    UI.boton('<u>R</u>ECHAZAR', 'rojo', () => this.decidir('rechazar'), bot);
    this.btnMemo = UI.boton('<u>M</u>EMORIZAR<span class="progreso"></span>', 'memo', () => this.memorizar(), bot);
    if (e.falsificar) this.btnFals = UI.boton('<u>F</u>ALSIFICAR<span class="progreso"></span>', 'memo falsif', () => this.falsificar(), bot);

    // vigilado: true (Brandt) o el id del personaje que se sienta detrás
    const vigilante = typeof e.vigilado === 'string' ? e.vigilado : 'brandt';
    if (e.vigilado && (!Estado.brandtDetras || Estado.vigilante !== vigilante)) {
      UI.aviso(`${PERSONAJES[vigilante].nombre} acerca una silla y se sienta detrás de ti.`, 'malo');
    }
    Ojo.forzar(!!e.vigilado, vigilante);

    this.papel.classList.remove('entra');
    void this.papel.offsetWidth;
    this.papel.classList.add('entra');
  },

  // Lo que la Orden espera que hagas con este expediente.
  veredicto(e) {
    const dir = this.d.directivas, reg = dir.reglas;
    if (e.tipo === 'REUBICACIÓN' && reg.reubicacionAprobar)
      return { v: 'aprobar', motivo: 'Las reubicaciones se aprueban siempre.' };
    if (dir.listaGris.includes(e.nombre))
      return { v: 'rechazar', motivo: 'Ciudadano en la Lista Gris.' };
    if ((reg.distritosCerrados || []).includes(e.distrito))
      return { v: 'rechazar', motivo: `${e.distrito} en cuarentena.` };
    if (fechaNum(e.sello) < fechaNum(reg.fecha))
      return { v: 'rechazar', motivo: 'Sello de distrito caducado.' };
    if (e.tipo === 'VIAJE' && reg.viajesSuspendidos)
      return { v: 'rechazar', motivo: 'Viajes suspendidos hasta el Día del Sol.' };
    if (e.tipo === 'VIAJE' && e.indice < reg.indiceMinViaje)
      return { v: 'rechazar', motivo: `Índice inferior a ${reg.indiceMinViaje} para viajar.` };
    if (e.tipo === 'RACIÓN' && e.indice < (reg.indiceMinRacion || 0))
      return { v: 'rechazar', motivo: `Índice inferior a ${reg.indiceMinRacion} para raciones.` };
    return { v: 'aprobar', motivo: 'Expediente conforme rechazado sin causa.' };
  },

  decidir(accion) {
    if (this.ocupado) return;
    const e = this.expediente();
    if (!e) return;
    this.ocupado = true;
    const v = this.veredicto(e);

    const sello = UI.crear('div', `sello ${accion}`, accion === 'aprobar' ? 'APROBADO' : 'RECHAZADO', this.papel);
    Sonido.sello();

    if (accion === v.v) {
      this.correctos++; this.salario += 5;
      aplicar({ creditos: 5 });
    } else {
      this.errores++;
      const pena = Estado.ojo === 'mirando' ? 10 : 5;
      aplicar({ sospecha: pena });
      UI.aviso(`INFRACCIÓN REGISTRADA · ${v.motivo} · +${pena}% sospecha`, 'malo');
    }
    aplicar(accion === 'aprobar' ? e.alAprobar : e.alRechazar);

    const paso = (this.d.horaFin - this.d.horaInicio) / this.exps.length;
    Estado.hora = Math.min(this.d.horaFin, Estado.hora + paso);
    HUD.actualizar();

    setTimeout(() => {
      if (Motor.comprobarSospecha()) return;
      this.papel.classList.add('sale');
      setTimeout(() => {
        this.papel.classList.remove('sale');
        this.i++;
        this.ocupado = false;
        this.mostrar();
      }, 350);
    }, 900);
  },

  memorizar() {
    if (this.ocupado || this.memorizados.has(this.i)) return;
    const e = this.expediente();
    if (!e) return;
    this.ocupado = true;
    this.btnMemo.classList.add('activo');
    let visto = Estado.ojo === 'mirando';
    const vigila = setInterval(() => { if (Estado.ojo === 'mirando') visto = true; }, 60);

    setTimeout(() => {
      clearInterval(vigila);
      this.btnMemo.classList.remove('activo');
      this.btnMemo.disabled = true;
      this.memorizados.add(this.i);
      if (e.id) Estado.banderas['memo_' + e.id] = true;
      this.ocupado = false;
      if (visto) {
        aplicar({ sospecha: 15 });
        Sonido.alerta();
        UI.aviso('¡EL OJO TE HA VISTO MEMORIZAR! +15% sospecha', 'malo');
      } else {
        // memorizar con el Ojo gris es seguro
      }
      if (e.intel) {
        aplicar({ intel: e.intel });
        UI.aviso(`Memorizado · +${e.intel} información`, 'bueno');
      } else {
        UI.aviso('Nada útil. Solo una cara más que recordar.');
      }
      Motor.comprobarSospecha();
    }, DURACION_MEMORIZAR);
  },

  // Alterar una orden: tarda más que memorizar y, si el Ojo mira, se nota mucho más.
  // La orden sale aprobada, pero con el cambio dentro.
  falsificar() {
    const e = this.expediente();
    if (this.ocupado || !e || !e.falsificar) return;
    this.ocupado = true;
    this.btnFals.classList.add('activo');
    let visto = Estado.ojo === 'mirando';
    const vigila = setInterval(() => { if (Estado.ojo === 'mirando') visto = true; }, 60);
    setTimeout(() => {
      clearInterval(vigila);
      this.btnFals.classList.remove('activo');
      aplicar({ sospecha: visto ? 20 : 2 });
      if (visto) {
        Sonido.alerta();
        UI.aviso('¡HAN VISTO CÓMO ALTERABAS UNA ORDEN! +20% sospecha', 'malo');
      }
      aplicar(e.falsificar.efecto);
      UI.aviso(e.falsificar.aviso || 'Orden alterada.', 'bueno');
      this.ocupado = false;
      if (!Motor.comprobarSospecha()) this.decidir('aprobar');
    }, DURACION_FALSIFICAR);
  },

  terminar() {
    Ojo.detener();
    Motor.tecla = null;
    HUD.actualizar();
    const inf = this.d.informe;
    const com = inf.comentarios.find(c => this.errores <= c.maxErrores) || inf.comentarios[inf.comentarios.length - 1];
    const extras = inf.extras.filter(x => cumple(x.si)).map(x => `<p>${x.texto}</p>`).join('');

    UI.limpiar();
    const p = UI.pos(UI.crear('div', 'panel informe'), 40, 18, 240);
    p.innerHTML = `
      <h2>INFORME DE JORNADA · SECCIÓN 14</h2>
      <table>
        <tr><td>Expedientes procesados</td><td>${this.exps.length}</td></tr>
        <tr><td>Conformes a directiva</td><td>${this.correctos}</td></tr>
        <tr><td>Infracciones registradas</td><td class="${this.errores ? 'malo' : ''}">${this.errores}</td></tr>
        <tr><td>Salario</td><td>+${this.salario} cr</td></tr>
        <tr><td>Nivel de sospecha</td><td>${Estado.sospecha}%</td></tr>
      </table>
      <div class="jefe"><div class="jefe-ret"></div><div><b>Supervisor Brandt:</b><p>${com.texto}</p>${extras}</div></div>`;
    UI.retrato('brandt', p.querySelector('.jefe-ret'));
    UI.boton('Salir del Ministerio ▸', 'rojo', () => {
      UI.limpiar();
      Motor.dialogo(this.d.salida, () => this.fin && this.fin());
    }, p);
  }
};

function fechaNum(f) {
  const [d, m, a] = f.split('.').map(Number);
  return a * 10000 + m * 100 + d;
}

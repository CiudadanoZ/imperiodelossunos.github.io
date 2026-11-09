// ============================================================
//  COMITÉ — la «mesa libre» del Acto 2: aquí no hay directivas que cumplir,
//  hay sellos que eligen el jugador y dos medidores que se mueven con cada decisión.
//
//  Por defecto es el Comité de la Madrid libre:
//    sellos PERDONAR (P) · JUICIO (J) · USAR (U), y la tentación: CONSULTAR ODÍN (O).
//    Medidores (HUD): IRA de la ciudad y PRINCIPIOS.
//  Un día puede cambiarlo todo con datos.mesa (ver historia/acto2/ostra-dia6.js):
//    { medidor, iraInicial, cabecera, tipoPapel, etiquetaNombre, etiquetaEdad, etiquetaCargo, etiquetaAcusacion, ayuda,
//      sellos: [{ id, tecla, boton, cls, rotulo, efecto }],
//      consulta: { tecla, boton, rotulo, coste, aviso, bandera },
//      estallido: { texto, bandera }, acta, firma }
//
//  Datos del día: { numero, fecha, horaInicio, horaFin, escenaCasa, escenaMesa, intro, normas: { titulo, textos },
//    expedientes: [...], informe: { firma, comentarios: [{ si, texto }], extras: [{ si, texto }] }, salida, mesa }
//  Expediente: { id, nombre, edad, cargo, acusacion, pruebas, defensa, clamor, julia: { si, texto }, odin, comentario,
//    comentarioSi, retrato | retratoDe, si, <idSello>: { efecto, texto } }
//  Crea las banderas <idExpediente>_<idSello> y odin_<idExpediente> (o la bandera de la consulta).
// ============================================================

const MESA_COMITE = {
  medidor: 'comite',
  cabecera: 'COMITÉ DE LA CIUDAD LIBRE · MADRID',
  tipoPapel: 'EXPEDIENTE DE COLABORACIÓN',
  etiquetaCargo: 'CARGO',
  etiquetaAcusacion: 'Acusación',
  sellos: [
    { id: 'perdonar', tecla: 'p', boton: '<u>P</u>ERDONAR', cls: 'verde', rotulo: 'PERDONADO', efecto: { ira: 8, principios: 2 } },
    { id: 'juzgar', tecla: 'j', boton: '<u>J</u>UICIO', cls: 'rojo', rotulo: 'A JUICIO', efecto: { ira: -6 } },
    { id: 'usar', tecla: 'u', boton: '<u>U</u>SAR', cls: 'memo', rotulo: 'RECLUTADO', efecto: { ira: 3, principios: -6 } }
  ],
  consulta: {
    tecla: 'o', boton: 'C<u>O</u>NSULTAR ODÍN', rotulo: 'ODÍN', coste: { principios: -5 }, bandera: 'odinConsultado',
    aviso: 'Has encendido ODÍN para vigilar a alguien · −5% principios'
  },
  estallido: {
    bandera: 'linchamiento',
    texto: 'LA MULTITUD ASALTA LA CÁRCEL DEL DISTRITO 1 · Esta noche habrá colgados en la Puerta del Sol. El Comité no ha sabido pararlo.'
  },
  acta: 'ACTA DE LA SESIÓN · COMITÉ DE LA CIUDAD LIBRE',
  salir: 'Salir del Comité ▸'
};

const Comite = {
  iniciar(datos, alTerminar) {
    const mesa = Object.assign({}, MESA_COMITE, datos.mesa || {});
    Object.assign(this, {
      d: datos, mesa, fin: alTerminar, i: 0,
      exps: datos.expedientes.filter(e => cumple(e.si)),
      cuenta: Object.fromEntries(mesa.sellos.map(s => [s.id, 0]).concat([['consulta', 0]])),
      ocupado: false
    });
    Estado.dia = datos.numero;
    Estado.fase = 'dia';
    Estado.medidor = mesa.medidor;
    if (mesa.iraInicial != null) Estado.ira = mesa.iraInicial;   // p. ej. la tensión de un refugio nuevo
    Estado.hora = datos.horaInicio - 2;
    Motor.escena = datos.escenaCasa || 'madridOscura';
    HUD.mostrar(true);
    Motor.transicion(`DÍA ${datos.numero}`, datos.fecha, () => {
      Motor.dialogo(datos.intro, () => this.mesaDia());
    });
  },

  mesaDia() {
    Estado.hora = this.d.horaInicio;
    Motor.escena = this.d.escenaMesa || 'comite';
    UI.limpiar();
    HUD.actualizar();
    const n = this.d.normas, m = this.mesa;
    const ayuda = m.ayuda || m.sellos.map(s => `<b>${s.tecla.toUpperCase()}</b> ${s.rotulo.toLowerCase()}`).join(' · ') +
      (m.consulta ? ` · <b>${m.consulta.tecla.toUpperCase()}</b> ${m.consulta.rotulo.toLowerCase()}` : '');
    const panel = UI.pos(UI.crear('div', 'directivas comite'), 4, 80, 144, 96);
    panel.innerHTML = `
      <h3>${n.titulo}</h3>
      <ol>${n.textos.map(t => `<li>${t}</li>`).join('')}</ol>
      <div class="gris">${ayuda}</div>`;
    this.papel = UI.pos(UI.crear('div', 'papel comite'), 152, 14, 164, 162);
    Motor.tecla = (k) => {
      const t = k.toLowerCase();
      const s = m.sellos.find(x => x.tecla === t);
      if (s) this.decidir(s.id);
      if (m.consulta && t === m.consulta.tecla) this.consultar();
    };
    this.mostrar();
  },

  expediente() { return this.exps[this.i]; },

  mostrar() {
    const e = this.expediente();
    if (!e) return this.terminar();
    const m = this.mesa;
    const julia = e.julia && cumple(e.julia.si) ? e.julia.texto : '';
    this.papel.innerHTML = `
      <div class="p-cab">${m.cabecera}
        <span class="p-num">Exp. ${this.i + 1}</span></div>
      <div class="p-tipo colaborador">${m.tipoPapel}</div>
      <div class="p-ficha">
        <div class="p-foto"></div>
        <dl>
          <dt>${m.etiquetaNombre || 'NOMBRE'}</dt><dd>${e.nombre}</dd>
          <dt>${m.etiquetaEdad || 'EDAD'}</dt><dd>${e.edad}</dd>
          <dt>${m.etiquetaCargo}</dt><dd>${e.cargo}</dd>
        </dl>
      </div>
      <div class="p-motivo"><b>${m.etiquetaAcusacion}:</b> ${e.acusacion}</div>
      ${e.pruebas ? `<div class="p-nota">${e.pruebas}</div>` : ''}
      ${e.defensa ? `<div class="p-defensa">«${e.defensa}»</div>` : ''}
      ${e.clamor ? `<div class="p-clamor">${e.clamor}</div>` : ''}
      ${julia ? `<div class="p-julia"><b>Julia Aranda:</b> «${julia}»</div>` : ''}
      <div class="p-odin"></div>
      <div class="p-pensar">${((e.comentarioSi || []).find(c => cumple(c.si)) || {}).texto || e.comentario || ''}</div>
      <div class="p-botones"></div>`;

    const params = e.retratoDe ? { ...PERSONAJES[e.retratoDe].retrato } : { ...e.retrato };
    params.fondo = '#9a9384';
    const foto = e.retrato || e.retratoDe ? Pixel.retrato(params) : Pixel.retratoDesde(e.nombre);
    foto.className = 'foto-doc';
    this.papel.querySelector('.p-foto').appendChild(foto);

    const bot = this.papel.querySelector('.p-botones');
    for (const s of m.sellos) UI.boton(s.boton, s.cls, () => this.decidir(s.id), bot);
    this.btnOdin = e.odin && m.consulta ? UI.boton(m.consulta.boton, 'memo falsif', () => this.consultar(), bot) : null;

    this.papel.classList.remove('entra');
    void this.papel.offsetWidth;
    this.papel.classList.add('entra');
  },

  // La consulta (ODÍN en Madrid): revela lo que no dice el expediente, pero cuesta principios.
  consultar() {
    const e = this.expediente(), c = this.mesa.consulta;
    if (this.ocupado || !e || !e.odin || !c || e._consultado) return;
    e._consultado = true;
    this.cuenta.consulta++;
    aplicar(c.coste);
    aplicar({ bandera: [c.bandera, 'odin_' + e.id].filter(Boolean) });
    Sonido.sello();
    this.papel.querySelector('.p-odin').innerHTML = `<b>${c.rotulo}:</b> ${e.odin}`;
    if (this.btnOdin) this.btnOdin.disabled = true;
    UI.aviso(c.aviso, 'malo');
  },

  decidir(accion) {
    if (this.ocupado) return;
    const e = this.expediente();
    const s = this.mesa.sellos.find(x => x.id === accion);
    if (!e || !s) return;
    this.ocupado = true;
    UI.crear('div', `sello ${accion}`, s.rotulo, this.papel);
    Sonido.sello();
    this.cuenta[accion]++;
    const propio = e[accion] || {};
    aplicar(propio.efecto || s.efecto);
    aplicar({ bandera: `${e.id}_${accion}` });
    if (propio.texto) UI.aviso(propio.texto, s.cls === 'verde' ? 'bueno' : s.cls === 'rojo' ? '' : 'malo');
    this.comprobarIra();

    const paso = (this.d.horaFin - this.d.horaInicio) / this.exps.length;
    Estado.hora = Math.min(this.d.horaFin, Estado.hora + paso);
    HUD.actualizar();
    setTimeout(() => {
      this.papel.classList.add('sale');
      setTimeout(() => {
        this.papel.classList.remove('sale');
        this.i++;
        this.ocupado = false;
        this.mostrar();
      }, 350);
    }, 900);
  },

  // Si el medidor de Ira (o de tensión) llega al 100%, estalla. Pasa una vez por mesa.
  comprobarIra() {
    const est = this.mesa.estallido;
    if (!est || Estado.ira < 100 || Estado.banderas[est.bandera]) return;
    Estado.banderas[est.bandera] = true;
    Estado.ira = 75;
    aplicar({ principios: -10 });
    Sonido.alerta();
    UI.aviso(est.texto, 'malo grande');
  },

  terminar() {
    Motor.tecla = null;
    HUD.actualizar();
    const inf = this.d.informe, m = this.mesa;
    const com = (inf.comentarios || []).find(c => cumple(c.si)) || { texto: '' };
    const extras = (inf.extras || []).filter(x => cumple(x.si)).map(x => `<p>${x.texto}</p>`).join('');
    const nombreIra = (MEDIDORES_IRA[Estado.medidor] || MEDIDORES_IRA.comite).largo;
    UI.limpiar();
    const p = UI.pos(UI.crear('div', 'panel informe'), 40, 18, 240);
    p.innerHTML = `
      <h2>${m.acta}</h2>
      <table>
        <tr><td>Expedientes vistos</td><td>${this.exps.length}</td></tr>
        <tr><td>${m.sellos.map(s => s.rotulo.toLowerCase()).join(' · ')}</td><td>${m.sellos.map(s => this.cuenta[s.id]).join(' · ')}</td></tr>
        ${m.consulta ? `<tr><td>${m.consulta.rotulo}</td><td class="${this.cuenta.consulta ? 'malo' : ''}">${this.cuenta.consulta}</td></tr>` : ''}
        <tr><td>${nombreIra}</td><td class="${Estado.ira >= 70 ? 'malo' : ''}">${Estado.ira}%</td></tr>
        <tr><td>Principios</td><td class="${Estado.principios < 40 ? 'malo' : ''}">${Estado.principios}%</td></tr>
      </table>
      <div class="jefe"><div class="jefe-ret"></div><div><b>${PERSONAJES[inf.firma || 'mara'].nombre}:</b><p>${com.texto}</p>${extras}</div></div>`;
    UI.retrato(inf.firma || 'mara', p.querySelector('.jefe-ret'));
    UI.boton(m.salir, 'rojo', () => {
      UI.limpiar();
      Motor.dialogo(this.d.salida, () => this.fin && this.fin());
    }, p);
  }
};

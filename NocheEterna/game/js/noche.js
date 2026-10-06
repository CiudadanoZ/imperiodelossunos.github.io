// ============================================================
//  NOCHE — la célula de los Insomnes.
// ============================================================

const HABILIDADES = { sigilo: 'SIGILO', fuerza: 'FUERZA', labia: 'LABIA', tecnica: 'TÉCNICA' };

const DESCANSO_NOCTURNO = 12;
const PRECIO_COARTADA = 10;

const Noche = {
  iniciar(datos, alTerminar) {
    Object.assign(this, { d: datos, fin: alTerminar, asig: {}, sel: null, coartadaHecha: false });
    Estado.fase = 'noche';
    Estado.hora = 0;
    HUD.mostrar(true);
    Motor.escena = 'calle';
    Motor.transicion(`NOCHE ${datos.numero}`, 'Toque de queda', () => {
      Motor.dialogo(datos.llegada, () => this.aspirantes());
    });
  },

  // Un operativo no puede salir si está de baja esta noche (herido, escondido...)
  deBaja(o) { return !!Estado.banderas[`baja_${o.id}_${this.d.numero}`]; },

  misiones() { return this.d.misiones.filter(m => cumple(m.si)); },
  operativos() {
    return Estado.operativos.filter(o => cumple(o.si) && !Estado.banderas['capturado_' + o.id] && !Estado.banderas['fuera_' + o.id]);
  },
  refugio() { return Estado.banderas.refugioAnden ? 'anden' : 'sotano'; },
  // Éxito sin operativo: base + bonificaciones por lo conseguido antes ({ si, mas })
  baseDe(m) { return m.base + (m.bonus || []).filter(b => cumple(b.si)).reduce((t, b) => t + b.mas, 0); },
  op(id) { return Estado.operativos.find(o => o.id === id); },

  probabilidad(m, op) {
    const nivel = (op && op.habilidades[m.habilidad]) || 0;
    return Math.max(5, Math.min(95, this.baseDe(m) + nivel * 15));
  },

  // Coste total de las misiones con alguien asignado
  costeTotal(asig = this.asig) {
    const t = {};
    for (const mid of Object.keys(asig)) {
      const m = this.d.misiones.find(x => x.id === mid);
      for (const [k, v] of Object.entries(m.coste || {})) t[k] = (t[k] || 0) + v;
    }
    return t;
  },

  asequible(asig) {
    const t = this.costeTotal(asig);
    return Object.entries(t).every(([k, v]) => (Estado[k] || 0) >= v);
  },

  // ---------- aspirantes ----------
  aspirantes() {
    const lista = (this.d.aspirantes || []).filter(a => cumple(a.si));
    if (!lista.length) return this.tablero();
    Motor.escena = this.refugio();
    UI.limpiar();
    this.decision = {};
    this.revelado = {};
    lista.forEach(a => { a._pistas = []; a._comparado = false; a._investigado = false; });
    const p = UI.pos(UI.crear('div', 'panel aspirantes'), 6, 14, 308, 162);
    p.innerHTML = `
      <h2>ASPIRANTES · NOCHE ${this.d.numero}</h2>
      <p class="ayuda">Quieren unirse a los Insomnes. Alguno puede ser de la Guardia Negra.
        Compara con lo que memorizaste o pide a Ruth que investigue (1 información).</p>
      <div class="a-lista"></div>
      <div class="t-pie"><span></span></div>`;
    this.pAsp = p.querySelector('.a-lista');
    this.btnSeguir = UI.boton('Pasar a las operaciones ▸', 'rojo', () => this.tablero(), p.querySelector('.t-pie'));
    this.listaAsp = lista;
    this.pintarAspirantes();
  },

  pintarAspirantes() {
    this.pAsp.innerHTML = '';
    for (const a of this.listaAsp) {
      const dec = this.decision[a.id];
      const card = UI.crear('div', 'aspirante' + (dec ? ' decidido' : ''), null, this.pAsp);
      UI.retrato(a.id, card, 'mini');
      const cuerpo = UI.crear('div', 'a-cuerpo', null, card);
      const habs = Object.entries(a.habilidades).map(([k, v]) => `${HABILIDADES[k]} ${'■'.repeat(v)}`).join(' ');
      cuerpo.innerHTML = `
        <div class="a-nom"><b>${a.nombre}</b> <i>${a.papel}</i> <small>${habs}</small></div>
        <div class="a-dice">«${a.dice}»</div>`;
      if (a._pistas) for (const [cls, t] of a._pistas) UI.crear('div', 'a-pista ' + cls, t, cuerpo);

      const bot = UI.crear('div', 'a-bot', null, cuerpo);
      if (dec) {
        UI.crear('span', 'a-dec', {
          aceptado: 'Aceptado', rechazado: 'Rechazado', expulsado: 'Expulsado', usado: 'Aceptado · le daremos información falsa'
        }[dec], bot);
        continue;
      }
      const revelado = this.revelado[a.id];
      if (a.memo && Estado.banderas['memo_' + a.memo] && !a._comparado) {
        UI.boton('Comparar con su expediente', '', () => this.investigar(a, 'memo'), bot);
      }
      if (!a._investigado) UI.boton('Que Ruth investigue (−1 info)', '', () => this.investigar(a, 'ruth'), bot);
      if (revelado) {
        UI.boton('Aceptarlo y engañarlo', 'verde', () => this.decidir(a, 'usado'), bot);
        UI.boton('Expulsarlo', 'rojo', () => this.decidir(a, 'expulsado'), bot);
      } else {
        UI.boton('Aceptar', 'verde', () => this.decidir(a, 'aceptado'), bot);
        UI.boton('Rechazar', 'rojo', () => this.decidir(a, 'rechazado'), bot);
      }
    }
  },

  investigar(a, modo) {
    a._pistas = a._pistas || [];
    if (modo === 'memo') {
      a._comparado = true;
      a._pistas.push([a.traidor ? 'malo' : 'bueno', 'Tu memoria: ' + a.comparacion]);
    } else {
      if (Estado.intel < 1) return UI.aviso('No tienes información para que Ruth investigue.', 'malo');
      aplicar({ intel: -1 });
      a._investigado = true;
      a._pistas.push([a.traidor ? 'malo' : 'bueno', a.informe]);
    }
    if (a.traidor) this.revelado[a.id] = true;
    this.pintarAspirantes();
  },

  decidir(a, dec) {
    this.decision[a.id] = dec;
    if (dec === 'aceptado' || dec === 'usado') {
      Estado.operativos.push({
        id: a.id, nombre: a.nombre.split(' ')[0], papel: a.papel,
        habilidades: { ...a.habilidades }, traidor: !!a.traidor, recluta: true
      });
      aplicar({ red: 1, bandera: ['recluta_' + a.id, 'algunRecluta'] });
      if (a.traidor) {
        const t = dec === 'usado' ? 'traidorUsado' : 'traidorDentro';
        aplicar({ bandera: [t, `${t}_${a.id}`] });
      }
      aplicar(a.alAceptar);
    } else {
      if (a.traidor && dec === 'expulsado') aplicar({ bandera: ['traidorExpulsado', 'traidorExpulsado_' + a.id] });
      if (a.traidor && dec === 'rechazado') aplicar({ bandera: ['traidorRechazado', 'traidorRechazado_' + a.id] });
      aplicar(a.alRechazar);
    }
    this.pintarAspirantes();
  },

  // Al acabar la noche, la sospecha se enfría un poco: la Orden tiene muchos ojos y poca memoria.
  despedir() {
    UI.limpiar();
    Motor.dialogo(this.d.despedida, () => {
      const antes = Estado.sospecha;
      aplicar({ sospecha: -DESCANSO_NOCTURNO });
      if (antes > Estado.sospecha) UI.aviso(`La noche enfría las sospechas: −${antes - Estado.sospecha}%`, 'bueno');
      this.fin && this.fin();
    });
  },

  // Ruth (o quien sea) fabrica una coartada: créditos a cambio de sospecha. Una vez por noche.
  coartada() {
    if (this.coartadaHecha) return UI.aviso('Ya tienes coartada para esta noche.', 'malo');
    if (Estado.creditos < PRECIO_COARTADA) return UI.aviso('No tienes créditos suficientes.', 'malo');
    this.coartadaHecha = true;
    aplicar({ creditos: -PRECIO_COARTADA, sospecha: -8 });
    UI.aviso('Tres vecinos jurarán que anoche estabas en casa con fiebre. −8% sospecha', 'bueno');
    this.btnCoartada.disabled = true;
  },

  tablero() {
    Motor.escena = this.refugio();
    UI.limpiar();
    const p = UI.pos(UI.crear('div', 'panel tablero'), 6, 14, 308, 162);
    p.innerHTML = `
      <h2>OPERACIONES · NOCHE ${this.d.numero}</h2>
      <p class="ayuda">1. Elige una operación. 2. Elige quién va. Cada operativo solo puede ir a una. Con los créditos del sueldo puedes comprar suministros o una coartada.</p>
      <div class="t-cols"><div class="t-misiones"></div><div class="t-ops"></div></div>
      <div class="t-pie"></div>`;
    this.pMis = p.querySelector('.t-misiones');
    this.pOps = p.querySelector('.t-ops');
    const pie = p.querySelector('.t-pie');
    this.btnMercado = UI.boton('Mercado negro: 10 cr → 1 suministro', '', () => this.mercado(), pie);
    this.btnCoartada = UI.boton(`Coartada: ${PRECIO_COARTADA} cr → −8% sospecha`, '', () => this.coartada(), pie);
    this.btnCoartada.disabled = this.coartadaHecha;
    this.btnGo = UI.boton('Ejecutar operaciones ▸', 'rojo', () => this.ejecutar(), pie);
    this.pintar();
  },

  mercado() {
    if (Estado.creditos < 10) return UI.aviso('No tienes créditos suficientes.', 'malo');
    aplicar({ creditos: -10, suministros: 1 });
    UI.aviso('Ruth vuelve con un paquete envuelto en periódico. +1 suministro', 'bueno');
    this.pintar();
  },

  pintar() {
    this.pMis.innerHTML = '';
    for (const m of this.misiones()) {
      const opId = this.asig[m.id];
      const op = opId && this.op(opId);
      const card = UI.crear('div', 'mision' + (this.sel === m.id ? ' sel' : '') + (op ? ' asignada' : ''), null, this.pMis);
      const coste = describirEfecto(m.coste, '−') || 'sin coste';
      const recompensa = describirEfecto(m.recompensa) || '—';
      card.innerHTML = `
        <div class="m-tit">${m.titulo}</div>
        <div class="m-desc">${m.desc}</div>
        <div class="m-datos">
          <span class="hab">${HABILIDADES[m.habilidad]}</span>
          <span>Coste: ${coste}</span>
          <span>Botín: ${recompensa}</span>
        </div>
        <div class="m-asig">${op
          ? `<b>${op.nombre}</b> · éxito ${this.probabilidad(m, op)}%${op.costeSospecha ? ` · +${op.costeSospecha}% sospecha` : ''}`
          : `Sin asignar${m.solo ? ` · solo ${this.op(m.solo).nombre}` : ''} · éxito base ${this.baseDe(m)}%`}</div>`;
      if (op) UI.retrato(op.id, card.querySelector('.m-asig'), 'mini');
      card.addEventListener('click', () => { Sonido.clic(); this.sel = this.sel === m.id ? null : m.id; this.pintar(); });
    }

    this.pOps.innerHTML = '<div class="o-tit">OPERATIVOS</div>';
    for (const o of this.operativos()) {
      const enMision = Object.keys(this.asig).find(k => this.asig[k] === o.id);
      const herido = this.deBaja(o);
      const el = UI.crear('div', 'operativo' + (enMision ? ' ocupado' : '') + (herido ? ' herido' : ''), null, this.pOps);
      UI.retrato(o.id, el, 'mini');
      const habs = Object.entries(o.habilidades).map(([k, v]) => `${HABILIDADES[k]} ${'■'.repeat(v)}`).join(' ');
      UI.crear('div', 'o-info', `<b>${o.nombre}</b> <i>${o.papel}</i><br><small>${habs}</small>${
        o.costeSospecha ? `<br><small class="malo">Salir: +${o.costeSospecha}% sospecha</small>` : ''}`, el);
      el.addEventListener('click', () => this.asignar(o));
    }
  },

  asignar(o) {
    Sonido.clic();
    if (this.deBaja(o)) return UI.aviso(`${o.nombre} no puede salir esta noche.`, 'malo');
    if (!this.sel) return UI.aviso('Primero elige una operación.');
    const mSel = this.d.misiones.find(m => m.id === this.sel);
    if (mSel.solo && mSel.solo !== o.id) return UI.aviso(`Esta operación es cosa de ${this.op(mSel.solo).nombre}.`, 'malo');
    const nuevo = { ...this.asig };
    // si ya estaba en otra misión, sale de ella
    for (const k of Object.keys(nuevo)) if (nuevo[k] === o.id) delete nuevo[k];
    if (this.asig[this.sel] === o.id) delete nuevo[this.sel];
    else nuevo[this.sel] = o.id;
    if (!this.asequible(nuevo)) return UI.aviso('No hay recursos suficientes para esa combinación.', 'malo');
    this.asig = nuevo;
    this.pintar();
  },

  ejecutar() {
    const cola = Object.entries(this.asig).map(([mid, oid]) => [this.d.misiones.find(m => m.id === mid), this.op(oid)]);
    if (!cola.length) {
      return this.despedir();
    }
    aplicar(Object.fromEntries(Object.entries(this.costeTotal()).map(([k, v]) => [k, -v])));
    for (const [, op] of cola) if (op.costeSospecha) aplicar({ sospecha: op.costeSospecha });
    this.resolver(cola, 0);
  },

  resolver(cola, idx) {
    if (idx >= cola.length) {
      UI.limpiar();
      if (Motor.comprobarSospecha()) return;
      return this.despedir();
    }
    const [m, op] = cola[idx];
    const prob = this.probabilidad(m, op);
    UI.limpiar();
    const p = UI.pos(UI.crear('div', 'panel resultado'), 50, 22, 220);
    p.innerHTML = `
      <h2>${m.titulo}</h2>
      <div class="r-op"></div>
      <div class="r-tirada">Probabilidad de éxito: ${prob}%<div class="dado">--</div></div>
      <div class="r-texto"></div>
      <div class="r-pie"></div>`;
    UI.retrato(op.id, p.querySelector('.r-op'));
    UI.crear('div', null, `<b>${op.nombre}</b><br><i>${op.papel}</i>`, p.querySelector('.r-op'));

    const dado = p.querySelector('.dado');
    const tirada = 1 + Math.floor(Math.random() * 100);
    let n = 0;
    const giro = setInterval(() => {
      dado.textContent = 1 + Math.floor(Math.random() * 100);
      Sonido.tirada();
      if (++n > 18) {
        clearInterval(giro);
        dado.textContent = tirada;
        this.desenlace(m, op, tirada <= prob, p, () => this.resolver(cola, idx + 1));
      }
    }, 70);
  },

  desenlace(m, op, exito, p, sig) {
    const txt = p.querySelector('.r-texto');
    const nombre = s => (s || '').replace(/\{op\}/g, op.nombre);
    let resumen = '';
    if (exito) {
      Sonido.exito();
      p.classList.add('exito');
      aplicar(m.recompensa);
      resumen = describirEfecto(m.recompensa);
      if (op.traidor) Estado.banderas.traidorInformo = true;
      txt.innerHTML = `<p class="bueno">ÉXITO</p><p>${nombre(m.exito)}</p>`;
    } else {
      Sonido.fracaso();
      p.classList.add('fracaso');
      aplicar(m.fracasoEfecto);
      resumen = describirEfecto(m.fracasoEfecto);
      let extra = '';
      if (Math.random() < (m.captura || 0)) {
        if (op.id === 'elias') {
          aplicar({ sospecha: 25 });
          extra = '<p class="malo">Elías escapa por los pelos, pero un Ojo ha registrado su silueta. +25% sospecha.</p>';
        } else if (op.esencial) {
          Estado.banderas[`baja_${op.id}_${this.d.numero + 1}`] = true;
          extra = `<p class="malo">${op.nombre} vuelve con una herida de bala. Mañana no podrá salir.</p>`;
        } else {
          Estado.banderas['capturado_' + op.id] = true;
          if (op.traidor) Estado.banderas.traidorFuera = true;
          aplicar({ red: -1, sospecha: 10 });
          extra = `<p>${nombre(m.capturado)}</p><p class="malo">${op.nombre} ha sido capturado. −1 red · +10% sospecha.</p>`;
        }
      }
      txt.innerHTML = `<p class="malo">FRACASO</p><p>${nombre(m.fracaso)}</p>${extra}`;
    }
    if (resumen) UI.crear('p', 'r-botin', resumen, txt);
    UI.boton('Continuar ▸', 'rojo', sig, p.querySelector('.r-pie'));
  }
};

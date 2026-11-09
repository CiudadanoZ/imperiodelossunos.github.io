// ============================================================
//  ACTO 2 · DÍA 5 — «La Inspectora» (los dos caminos juntos)
//  Viernes, 8 de febrero de 2041. Hel llega (A) o vuelve (B) a la colonia y adelanta el traslado
//  a Helios a mañana sábado. Se sienta detrás de Elías. Y le deja hacer.
// ============================================================

window.COLONIA_DIA5 = {
  numero: 5,
  fecha: 'Viernes, 8 de febrero de 2041',
  horaInicio: 8,
  horaFin: 17,
  escenaCasa: 'colonia',
  escenaMesa: 'oficinaColonia',
  cabecera: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
  medidor: 'sospecha',
  ojo: { desviado: [2200, 4200], aviso: 800, mirando: [3200, 5800] },

  intro: {
    inicio: 'c0',
    nodos: {
      c0: { texto: 'Viernes. A las nueve, el coche negro cruza la puerta de la colonia. Mil doscientos internos forman en la nieve. Nadie tiembla.', siguiente: 'c1' },
      c1: { rama: [{ si: 'ramaCiudad', ir: 'a1' }], siguiente: 'b1' },

      a1: { quien: 'inspectora', texto: 'Inspector Vogt. De la Sección 14 del Registro. Qué casualidad: yo también estuve en la Sección 14. Una semana. ¿Se acuerda?', siguiente: 'a2' },
      a2: { quien: 'inspectora', texto: 'No ponga esa cara. Siga con su auditoría. Hoy me sentaré detrás de usted. Como en los viejos tiempos.', siguiente: 'a3' },
      a3: { quien: 'elias', pensamiento: true, texto: 'No me detiene. Sabe quién soy, sabe con quién he venido y no me detiene. Eso es peor.', siguiente: 'm1' },

      b1: { quien: 'inspectora', texto: 'Buenos días, 41-0877. Vengo de la Ciudadela con buenas noticias: la Ciudadela tiene prisa. Mucha.', siguiente: 'b2' },
      b2: { rama: [{ si: 'trasladoJuliaFalsificado', ir: 'b3f' }], siguiente: 'm1' },
      b3f: { quien: 'inspectora', texto: 'Su bonita fecha de marzo... La he respetado tres días. Hoy la cambio yo, con mi propia letra. Cada uno tiene sus sellos, archivero.', siguiente: 'm1' },

      m1: { escena: 'oficinaColonia', efecto: { hora: 0.97 }, quien: 'rusk', texto: 'Órdenes nuevas de la Cancillería: el traslado a Helios se adelanta a mañana, sábado, a las seis. Hoy se cierran las listas. Todas.', siguiente: 'm2' },
      m2: { quien: 'elias', pensamiento: true, texto: 'Mañana a las seis. El tren de Kurt llega esta noche a las diez. Ocho horas. Y la Inspectora, respirando detrás de mí.' }
    }
  },

  directivas: {
    titulo: 'REGISTRO · CIERRE DE LISTAS (INSPECCIÓN)',
    textos: [
      'TRASLADOS y órdenes de la Cancillería: aprobar siempre.',
      'INFORMES de confidentes y CIRCULARES: aprobar siempre.',
      'RACIONES: rechazar si la cuota de trabajo es menor de 65.',
      'BARRACONES 7 y 9 en cuarentena.',
      'Sello vigente. Hoy: 08.02.2041.'
    ],
    listaGris: ['Nowak, Olek', 'Grau, Tobías', 'Haddad, Samira'],
    reglas: { fecha: '08.02.2041', indiceMinViaje: 70, indiceMinRacion: 65, reubicacionAprobar: true, distritosCerrados: ['Barracón 7', 'Barracón 9'] }
  },

  expedientes: [
    {
      id: 'listaFinal', nombre: 'Traslado a Helios · lista definitiva', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO A HELIOS · LISTA CERRADA', numero: 'CT-H-0209', distrito: 'Ciudadela Helios',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'Salida: sábado 09.02.2041, 06:00. 112 internos. Custodia especial: interna 2033-114 (J. A.), E. Kowalczyk, M. Ferrer.',
      comentario: 'Ciento doce nombres. Tres con custodia especial: los tres de Lumen. Si apruebo, la lista se cierra con ellos dentro. La Inspectora lee por encima de mi hombro.',
      retrato: { emblema: true },
      alAprobar: { bandera: 'listaCerrada' },
      alRechazar: { bandera: 'listaDevuelta' },
      falsificar: { efecto: { bandera: 'ingenierosFueraLista' }, aviso: 'Kowalczyk y Ferrer pasan a la lista del martes, «por error de transcripción». Julia sigue: su nombre lo ha escrito Hel a mano.' }
    },
    {
      id: 'circularMara', si: 'maraEnColonia', nombre: 'M. S. (fogonera)', edad: '—', tipo: 'INFORME', etiqueta: 'CIRCULAR · TRIPULACIÓN DESAPARECIDA', numero: 'CT-T14-DES', distrito: 'Estación Este-1',
      indice: '—', sello: '31.12.2041',
      motivo: 'La fogonera de relevo del tren 14 no se presentó a la salida del jueves. Registrar barracones.',
      comentario: 'Mara. Si apruebo, esta tarde registran los barracones. Si la devuelvo, Rusk preguntará por qué me importa una fogonera.',
      retratoDe: 'mara',
      alAprobar: { bandera: 'registroBarracones' },
      alRechazar: { bandera: 'circularMaraRetenida' }
    },
    {
      id: 'informeLeif', si: 'traidorDentro_leif', nombre: 'Agente L.', edad: '—', tipo: 'INFORME', etiqueta: 'INFORME DE CONFIDENTE', numero: 'DS-0208-L', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'El falso inspector y su grupo esperan un tren esta noche a las 22:00 para sacar a la interna 2033-114 y a los ingenieros de Lumen. Instrucciones: NO INTERVENIR. Dejar salir.',
      comentario: 'Leif. El fogonero de Varsovia. «No intervenir. Dejar salir.» Hel sabe que nos vamos esta noche. Y quiere que nos vayamos.',
      retratoDe: 'leif',
      alAprobar: { bandera: ['vioInformeLeif', 'sabeQueHelDeja'] },
      alRechazar: { bandera: ['vioInformeLeif', 'sabeQueHelDeja'] }
    },
    {
      id: 'informeJonas2', si: 'traidorDentro_jonas', nombre: 'Interno J. K.', edad: '—', tipo: 'INFORME', etiqueta: 'INFORME DE CONFIDENTE', numero: 'CT-1-INF-34', distrito: 'Barracón 12',
      indice: '—', sello: '31.12.2041',
      motivo: 'El tren 14 del jueves salió sin incidentes. El confidente se disculpa. Nueva información: la fuga podría ser esta noche, con otro tren.',
      comentario: 'Jonas otra vez. Esta vez ha acertado. Rusk está leyendo mi cara mientras lo leo.',
      comentarioSi: [{ si: 'jonasEngañado', texto: 'Jonas otra vez. Le hicimos creer que era el jueves y movió a veinte guardias para nada. Ahora nadie le cree. Ni Rusk.' }],
      retrato: { piel: '#d8b294', pelo: '#3a2c20', estilo: 'rapado', ropa: '#4a4a52' },
      alAprobar: { bandera: 'informeJonas2' },
      alRechazar: { bandera: 'informeJonas2Retenido' }
    },
    {
      id: 'ferrer5', nombre: 'Marcos Ferrer', edad: 62, tipo: 'RACIÓN', numero: 'CT-1-L-011', distrito: 'Barracón 12',
      indice: 51, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 51%. Observación: no ha comido en dos días.',
      comentario: 'Marcos Ferrer. Cincuenta y uno. Si no come hoy, esta noche no podrá correr hasta el tren.',
      retrato: { piel: '#c49373', pelo: '#e0dcd4', estilo: 'corto', ropa: '#4a4a52', arrugas: true },
      alAprobar: { bandera: 'ferrerComio' }
    },
    {
      id: 'kasia5', nombre: 'Kasia Wrona', edad: 29, tipo: 'RACIÓN', numero: 'CT-1-2211', distrito: 'Barracón 3',
      indice: 52, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 52%.',
      comentario: 'Kasia. Setenta y cuatro el lunes. Cincuenta y dos el viernes. Una semana. Así se baja de la línea.',
      comentarioSi: [{ si: 'kasiaAyudada', texto: 'Kasia. El miércoles le aprobé la ración por debajo de la línea. Hoy ha bajado más. No hay sello que suba una línea.' }],
      retrato: { piel: '#e6c4a8', pelo: '#8a6a40', estilo: 'largo', ropa: '#4a4a52' }
    }
  ],

  informe: {
    firma: 'rusk',
    titulo: 'INFORME DE JORNADA · REGISTRO DE LA COLONIA',
    salir: 'Salir de la oficina ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Impecable, archivero. La Inspectora dice que es usted el mejor funcionario que ha visto en años. No sé si alegrarme por usted.' },
      { maxErrores: 2, texto: 'Errores, con la Inspectora delante. Y ella no ha dicho nada. Ni una palabra. Eso no me había pasado nunca.' },
      { maxErrores: 99, texto: 'Todo mal, y la Inspectora sonriendo. Me voy a dormir a la oficina. Esta noche no quiero estar cerca de usted.' }
    ],
    extras: [
      { si: 'listaDevuelta', texto: '(Rusk:) Ha devuelto la lista de Helios. La Inspectora la ha firmado ella misma, delante de usted, sin decir nada. Me da escalofríos.' },
      { si: 'registroBarracones', texto: '(Rusk:) Esta tarde registramos los barracones. Buscamos a una fogonera. Usted lo ha firmado.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'oficinaColonia', texto: '17:00. Rusk se va. La Inspectora no. Recoge sus guantes muy despacio.', siguiente: 's2' },
      s2: { quien: 'inspectora', texto: 'Hay cosas que solo se ven si se deja que pasen, archivero. Usted lo sabe: llevaba once años dejando pasar expedientes para ver quién los firmaba.', siguiente: 's3' },
      s3: { quien: 'inspectora', texto: 'Mañana a las seis sale un tren hacia Helios. Esta noche, quizá salga otro. Yo voy a dormir muy bien. ¿Y usted?', siguiente: 's4' },
      s4: { rama: [{ si: 'registroBarracones', ir: 's5r' }], siguiente: 's6' },
      s5r: { texto: 'A las seis, los guardias registran el barracón 12 litera por litera. No encuentran a Mara: está dentro de la estufa apagada, con Samira sentada encima tejiendo un calcetín.', efecto: { sospecha: 6 }, siguiente: 's6' },
      s6: { rama: [{ si: 'avisoRelojero', ir: 's7r' }], siguiente: 's7' },
      s7r: { quien: 'elias', pensamiento: true, texto: 'Esta noche, a las diez. «Si la puerta se abre fácil, pregúntate quién la ha engrasado.»' },
      s7: { quien: 'elias', pensamiento: true, texto: 'Esta noche, a las diez. Y una inspectora que duerme tranquila. Nunca había oído nada que me diera más miedo.' }
    }
  }
};

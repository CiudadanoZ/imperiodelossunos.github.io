// ============================================================
//  ACTO 2 · DÍA 4 — «Las listas» (los dos caminos se juntan)
//  Jueves, 7 de febrero de 2041. Colonia de Trabajo Este-1.
//  A: Elías llega como «inspector del Registro» en la locomotora de Kurt y audita el registro.
//  B: Elías, preso, sigue en la mesa del registro, con Mara escondida en el barracón 12.
//  Llegan los refuerzos de otras colonias para Helios: aquí reaparecen los que se sellaron en el Acto 1.
// ============================================================

window.COLONIA_DIA4 = {
  numero: 4,
  fecha: 'Jueves, 7 de febrero de 2041',
  horaInicio: 8,
  horaFin: 17,
  escenaCasa: 'colonia',
  escenaMesa: 'oficinaColonia',
  cabecera: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
  medidor: 'sospecha',
  ojo: { desviado: [2400, 4600], aviso: 850, mirando: [3000, 5500] },

  intro: {
    inicio: 'c0',
    nodos: {
      c0: { rama: [{ si: 'ramaCiudad', ir: 'a1' }], siguiente: 'b1' },

      // --- Camino A: el inspector llega en tren ---
      a1: { rama: [{ si: 'retraso', ir: 'a2t' }], siguiente: 'a2' },
      a2t: { texto: 'Jueves. La locomotora de Kurt entra en la estación de la colonia a las nueve, a plena luz. Todo el andén la ve llegar.', efecto: { sospecha: 8 }, siguiente: 'a3' },
      a2: { texto: 'Jueves. La locomotora de Kurt entra en la estación de la colonia a las siete, todavía de noche. Nadie mira a los trenes de carbón.', siguiente: 'a3' },
      a3: { rama: [{ si: 'helSabeTren', ir: 'a4h' }], siguiente: 'a5' },
      a4h: { texto: 'En el andén hay más guardias de lo normal. Uno de ellos apunta el número de la locomotora en una libreta.', efecto: { sospecha: 8 }, siguiente: 'a5' },
      a5: { quien: 'rusk', texto: '¿Un inspector del Registro? ¿Aquí? Nunca viene nadie del Registro. Los últimos archiveros que tuve se murieron de frío en diciembre. Supongo que viene a ver por qué.', siguiente: 'a6' },
      a6: { rama: [{ si: 'codigosColonia', ir: 'a7c' }], siguiente: 'a7' },
      a7c: { quien: 'elias', texto: 'Auditoría de rutina, capataz. «Carbón para el taller.» Relevo a las seis y a las dieciocho. Barracón 4, trato especial. ¿Sigo?', siguiente: 'a8c' },
      a8c: { quien: 'rusk', texto: '...No hace falta. Conoce usted mi colonia mejor que yo. Pase.', siguiente: 'a9' },
      a7: { quien: 'rusk', texto: 'Vamos a ver esos papeles. Despacio. Aquí todo se hace despacio, inspector: el frío no deja ir más deprisa.', efecto: { sospecha: 10 }, siguiente: 'a9' },
      a9: { rama: [{ si: 'coberturaPreso', ir: 'a10p' }, { si: 'relojeroPerdido', ir: 'a10l' }], siguiente: 'a11' },
      a10p: { texto: 'El preso Grau, «en traslado», entra en el barracón 12 sin mirar atrás. Ahora el Relojero está dentro. Como quería.', siguiente: 'a11' },
      a10l: { texto: 'Al pasar por la puerta del recinto, Elías ve un vagón de presos descargando. El último en bajar es un viejo que se para a mirar el reloj de la torre. Está parado. Como todos los de esta colonia.', siguiente: 'a11' },
      a11: { quien: 'rusk', texto: 'La Inspectora Hel llega mañana, por cierto. Querrá conocerle. A ella le encantan los del Registro.', siguiente: 'q1' },

      // --- Camino B: preso, cuarto día ---
      b1: { texto: 'Jueves. Esta mañana el coche negro de la Inspectora ha salido hacia la Ciudadela. Rusk dice que vuelve mañana con órdenes nuevas.', siguiente: 'b2' },
      b2: { rama: [{ si: 'jonasEngañado', ir: 'b3j' }], siguiente: 'b4' },
      b3j: { texto: 'A las cinco de la mañana, veinte guardias han registrado el tren 14 vagón por vagón. No han encontrado nada. Jonas Kerr se ha pasado el desayuno mirando al suelo.', siguiente: 'b4' },
      b4: { quien: 'elias', pensamiento: true, texto: 'Mara duerme bajo la litera de Olek. Es la primera vez en mi vida que alguien duerme cerca de mí porque quiere.', siguiente: 'q1' },

      // ¿Está el Relojero con el grupo en la colonia? (resume las decisiones de los días anteriores)
      q1: { rama: [
        { si: ['ramaCiudad', 'guiaRelojero', '!relojeroRetenido'], ir: 'q2' },
        { si: 'relojeroRecuperado', ir: 'q2' }, { si: 'relojeroPerdido', ir: 'q2' },
        { si: ['ramaColonia', 'relojeroEnBarracon'], ir: 'q2' }
      ], siguiente: 'm1' },
      q2: { rama: [], efecto: { bandera: 'relojeroConGrupo' }, siguiente: 'm1' },

      // --- Los dos: los refuerzos para Helios ---
      m1: { escena: 'oficinaColonia', efecto: { hora: 0.97 }, quien: 'rusk', texto: 'Hoy llegan refuerzos de otras colonias. La Ciudadela Helios pide manos, y Este-1 es la última parada antes de Helios. Cien fichas. Que las lea alguien que sepa leer.', siguiente: 'm2' },
      m2: { quien: 'elias', pensamiento: true, texto: 'Las colonias del Este no devuelven a nadie. Pero se los pasan de unas a otras, como un sello de una mesa a otra. Y todas las mesas acaban aquí.' }
    }
  },

  directivas: {
    titulo: 'REGISTRO · LLEGADAS PARA HELIOS',
    textos: [
      'TRASLADOS a la Ciudadela Helios: aprobar siempre.',
      'RACIONES de llegada: rechazar si la cuota de trabajo es menor de 65.',
      'PERMISOS: rechazar si la cuota es menor de 70.',
      'BARRACONES 7 y 9 en cuarentena: rechazar todo lo que venga de ellos.',
      'Sello vigente. Hoy: 07.02.2041.'
    ],
    listaGris: ['Nowak, Olek', 'Grau, Tobías', 'Haddad, Samira'],
    reglas: { fecha: '07.02.2041', indiceMinViaje: 70, indiceMinRacion: 65, reubicacionAprobar: true, distritosCerrados: ['Barracón 7', 'Barracón 9'] }
  },

  expedientes: [
    {
      id: 'kowalczyk', nombre: 'Ewa Kowalczyk', edad: 59, tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO A HELIOS', numero: 'CT-1-L-006', distrito: 'Barracón 4',
      indice: '—', sello: '31.12.2041', intel: 2,
      motivo: 'Traslado prioritario a la Ciudadela Helios, 12.02.2041. Ingeniera de red.',
      nota: 'Historial: Proyecto Lumen (Voss Energía), 2006–2008. «Conocimiento crítico.» Misma anotación que la interna 2033-114.',
      comentario: 'Lumen. 2006–2008. La misma anotación que la ficha de Julia. Una de las dos personas que construyeron la red con ella.',
      retrato: { piel: '#e6c4a8', pelo: '#c9c4bd', estilo: 'moño', ropa: '#4a4a52', gafas: true, arrugas: true }
    },
    {
      id: 'ferrer', nombre: 'Marcos Ferrer', edad: 62, tipo: 'RACIÓN', numero: 'CT-1-L-011', distrito: 'Barracón 12',
      indice: 55, sello: '30.04.2041', intel: 1,
      motivo: 'Ración de llegada. Técnico de red. Cuota de trabajo: 55%.',
      nota: 'Historial: Proyecto Lumen (Voss Energía), 2006–2008. Familia: una nieta, Lucía Ferrer (fallecida, Hospital Central, 2031).',
      comentario: 'Ferrer. Lucía Ferrer. La niña de seis años de la primera lista del Hospital Central. El nombre de los papeles falsos de Mara. Este hombre es su abuelo.',
      retrato: { piel: '#c49373', pelo: '#e0dcd4', estilo: 'corto', ropa: '#4a4a52', arrugas: true },
      alAprobar: { bandera: 'ferrerAyudado' }
    },
    {
      id: 'hansC', si: 'hansReubicado', nombre: 'Hans Keller', edad: 51, tipo: 'RACIÓN', numero: 'CT-2-1412', distrito: 'Barracón 12',
      indice: 61, sello: '30.04.2041',
      motivo: 'Ración de llegada desde la Colonia Este-2. Cuota de trabajo: 61%.',
      comentario: 'Hans. Mesa 12. Lo sellé el miércoles de la auditoría, con Brandt respirando detrás. Ha llegado aquí recitando números de expediente. Los míos también, supongo.',
      retratoDe: 'hans',
      alAprobar: { bandera: 'hansAyudado' },
      alRechazar: { bandera: 'hansSinRacion' }
    },
    {
      id: 'klausC', si: ['klausReubicado', '!klausRescatado'], nombre: 'Klaus Ernst', edad: 58, tipo: 'RACIÓN', numero: 'CT-3-1180', distrito: 'Barracón 9',
      indice: 41, sello: '30.04.2041',
      motivo: 'Ración de llegada desde la Colonia Este-3. Cuota de trabajo: 41%.',
      comentario: 'Klaus Ernst. Jubilado del ferrocarril. Lo denuncié yo, para limpiar mi ficha. Barracón 9, en cuarentena. Todas las normas dicen que no. Todas, menos una que no está escrita.',
      retrato: { piel: '#d0a888', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true },
      alAprobar: { bandera: 'klausAyudado' }
    },
    {
      id: 'leoC', si: ['leoReubicado', '!leoRescatado'], nombre: 'Leo Sanz', edad: 23, tipo: 'RACIÓN', numero: 'CT-5-0012', distrito: 'Barracón 12',
      indice: 68, sello: '30.04.2041',
      motivo: 'Ración de llegada desde la Colonia Este-5. Cuota de trabajo: 68%.',
      comentario: 'Leo. El chico de la mesa 12 que miraba las caras. Sesenta y ocho: come. Me mira desde la foto como yo miraba las suyas.',
      comentarioSi: [{ si: 'denuncioLeo', texto: 'Leo. Le di su nombre a la Inspectora para que no me miraran a mí. Sesenta y ocho: come. Él no sabe que fui yo. O sí.' }],
      retratoDe: 'leo'
    },
    {
      id: 'brandtC4', si: 'brandtPurgado', nombre: 'Konrad Brandt', edad: 52, tipo: 'RACIÓN', numero: 'CT-1-4480', distrito: 'Barracón 12',
      indice: 52, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 52%. Asignado al taller (reparación de relojes de torre).',
      comentario: 'Brandt. Purgado. Repara relojes de torre con el viejo Grau en el taller. Los dos hombres que me vigilaron toda la vida, juntos, arreglando relojes que nadie mira.',
      retratoDe: 'brandt',
      alAprobar: { bandera: 'brandtAyudado' }
    },
    {
      id: 'tomasC4', si: ['tomasReubicado', '!muerteChispa'], nombre: 'Tomás Rey', edad: 19, tipo: 'RACIÓN', numero: 'CT-1-3107', distrito: 'Barracón 7',
      indice: 70, sello: '31.03.2041',
      motivo: 'Ración de enfermería. Diagnóstico: tifus (en recuperación).',
      comentario: 'Chispa. Sigue vivo. Barracón 7: la norma dice que no. Ya no sonríe en las fotos. Pero sigue vivo.',
      retratoDe: 'tomas',
      alAprobar: { bandera: 'chispaAyudado' }
    },
    {
      id: 'danielH', si: 'recluta_martaR', nombre: 'Daniel Hessel', edad: 20, tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO A HELIOS', numero: 'CT-6-2209', distrito: 'Barracón 12',
      indice: '—', sello: '31.12.2041',
      motivo: 'Llegado desde la Colonia Este-6. Traslado a la Ciudadela Helios, 12.02.2041. Mozo de carga.',
      comentario: 'Daniel Hessel. Veinte años. El hijo de Marta. No estaba en Este-6: lo trajeron aquí la semana pasada. Marta duerme a doscientos metros y no lo sabe.',
      retrato: { piel: '#dcb495', pelo: '#6b4a2f', estilo: 'despeinado', ropa: '#4a4a52' },
      alAprobar: { bandera: 'danielEncontrado' },
      alRechazar: { bandera: 'danielEncontrado' }
    }
  ],

  informe: {
    firma: 'rusk',
    titulo: 'INFORME DE JORNADA · REGISTRO DE LA COLONIA',
    salir: 'Salir de la oficina ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Ni un error con cien fichas. Si todos los del Registro son así, no entiendo cómo perdieron Madrid.' },
      { maxErrores: 2, texto: 'Algún error. Raciones de más, sobre todo. Aquí cada ración de más es una de menos para otro. Lo apunto.' },
      { maxErrores: 99, texto: 'Demasiadas raciones de más. O usted no sabe sumar, o sabe demasiado bien a quién quiere dar de comer.' }
    ],
    extras: [
      { si: 'klausAyudado', texto: '(Rusk:) Y le ha dado ración a uno del 9. Del tifus. Si se contagia el barracón 12, la culpa es suya.' },
      { si: 'memo_kowalczyk', texto: '(Rusk:) Le he visto leer dos veces la ficha de la ingeniera. Esa ficha es de la Cancillería. Yo no la leería dos veces.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'colonia', texto: '17:00. Ya es de noche. La columna de los recién llegados forma en la nieve delante del barracón 12. Cien caras.', siguiente: 's2' },
      s2: { rama: [{ si: 'hansReubicado', ir: 's3h' }], siguiente: 's4' },
      s3h: { texto: 'Una de ellas mira a Elías y mueve los labios sin voz. Está diciendo un número: NB-1412-M. El número de su propio expediente. Hans se acuerda de todos.', siguiente: 's4' },
      s4: { rama: [{ si: 'ramaCiudad', ir: 's5a' }], siguiente: 's5b' },
      s5a: { quien: 'elias', pensamiento: true, texto: 'Esta noche, el inspector Vogt saldrá a fumar. No fumo. En el barracón 12 me espera la célula de la colonia.', siguiente: 's6' },
      s5b: { quien: 'elias', pensamiento: true, texto: 'Esta noche hay que contárselo todo a Mara y a los demás. La lista de Helios ya no son nombres. Son caras que conozco.', siguiente: 's6' },
      s6: { texto: 'Desde la torre, el foco barre la nieve. Cuarenta y dos segundos por vuelta.' }
    }
  }
};

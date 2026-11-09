// ============================================================
//  ACTO 2 · CAMINO A · DÍA 3 — «La frontera»
//  Miércoles, 6 de febrero de 2041. Puesto fronterizo 12, a la entrada de la Zona de Helios.
//  Con los salvoconductos de Ruth, Elías pasa por inspector del Registro. El comandante, sin
//  archivero, le sienta a sellar la cola. Entre los papeles, los de Mara y el Relojero.
//  Vuelve la sospecha (medidor: 'sospecha') durante el viaje.
// ============================================================

window.DIA_A3 = {
  numero: 3,
  fecha: 'Miércoles, 6 de febrero de 2041',
  horaInicio: 8,
  horaFin: 16,
  escenaCasa: 'tren',
  escenaMesa: 'frontera',
  cabecera: 'PUESTO FRONTERIZO 12 · ZONA DE HELIOS',
  medidor: 'sospecha',
  ojo: { desviado: [2600, 5000], aviso: 900, mirando: [3000, 5200] },

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Miércoles. Treinta horas de vía. Kurt no ha dormido: dice que las locomotoras viejas se ponen celosas si las dejas solas.', siguiente: 'a2' },
      a2: { quien: 'kurt', texto: 'Puesto fronterizo 12 en una hora. Detrás está la Zona de Helios. Ahí no entra nadie sin un papel que la Orden se crea.', siguiente: 'p0' },
      p0: { rama: [{ si: 'salvoconductos', ir: 'p1' }], siguiente: 'p3' },
      p1: { quien: 'mara', texto: 'Según estos papeles, eres el Inspector Elías Vogt, de la Sección 14 del Registro, en auditoría de fronteras. Yo soy tu secretaria. Que no se te suba a la cabeza.', siguiente: 'p2' },
      p2: { quien: 'mara', texto: 'La tinta todavía huele. Quien los hizo dice que son mejores que los de verdad. Ojalá tenga razón.', siguiente: 'r0' },
      p3: { quien: 'mara', texto: 'Llevamos los salvoconductos viejos de Madrid. Si alguien los mira dos veces, estamos muertos. Así que nadie tiene que mirarlos dos veces.', efecto: { sospecha: 20 }, siguiente: 'r0' },

      // --- El Relojero, esposado o no ---
      r0: { rama: [{ si: 'relojeroEsposado', ir: 'r1' }, { si: 'guiaRelojero', ir: 'r4' }], siguiente: 'b1' },
      r1: { quien: 'relojero', texto: 'Antes del control, una cosa. Un hombre esposado en un tren de la Orden solo puede ser una de dos cosas: un preso o un problema.', siguiente: 'r2' },
      r2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Entonces serás un preso. Te llevo en traslado a la colonia.»', ir: 'r3a', efecto: { bandera: 'coberturaPreso' } },
          { texto: 'Quitarle las esposas.', ir: 'r3b', efecto: { bandera: 'esposasQuitadas' } }
        ]
      },
      r3a: { quien: 'relojero', texto: 'Un preso en traslado a la Colonia Este-1. Escoltado por el archivero al que escondí. Si hay un dios, sigue con el sentido del humor.', siguiente: 'b1' },
      r3b: { texto: 'Las esposas caen en el carbón. El Relojero se frota las muñecas y no dice nada. Luego, muy bajo: «gracias». Es la segunda vez en tu vida que se lo oyes.', siguiente: 'b1' },
      r4: { quien: 'relojero', texto: 'Sin esposas, viajo como lo que pone en mis papeles falsos: un relojero jubilado que va a ver a su hermano. Si alguien me reconoce, haz como que no me conoces. Se te da bien.', siguiente: 'b1' },

      // --- El comandante ---
      b1: { escena: 'frontera', efecto: { hora: 0.97 }, quien: 'ostrowski', texto: '¿Inspector del Registro? ¿De auditoría? El cielo me lo manda. Mi archivero tiene tifus y llevo un tren de viajeros parado desde ayer.', siguiente: 'b2' },
      b2: { quien: 'ostrowski', texto: 'Siéntese ahí. Aplique las normas de paso. Yo miraré. Me gusta ver trabajar a la gente de Madrid. Ustedes miran los papeles como si fueran a morder.', siguiente: 'b3' },
      b3: { quien: 'elias', pensamiento: true, texto: 'Otra mesa. Otro sello. Y esta vez, en la cola, están los míos.', siguiente: 'b4' },
      b4: { texto: 'LA FRONTERA: sellas los papeles de paso como en el Ministerio. Vuelve la SOSPECHA: si el comandante sospecha de ti, nadie de tu tren cruzará. Y el sello que estampes en los papeles de los tuyos es el que decide si pasan.' }
    }
  },

  directivas: {
    titulo: 'PUESTO FRONTERIZO 12 · NORMAS DE PASO',
    textos: [
      'MERCANCÍAS y TRASLADOS de presos a la Zona de Helios: aprobar siempre.',
      'VIAJES: rechazar si el Índice de Pureza es menor de 70.',
      'Rechazar a todo viajero procedente de la ZONA INSURRECTA (antigua Nueva Berlín).',
      'Rechazar a cualquiera de la LISTA GRIS.',
      'Sello vigente. Hoy: 06.02.2041.'
    ],
    listaGris: ['Tobías Grau', 'Lucía Ferrer', 'Nico Barros'],
    reglas: { fecha: '06.02.2041', indiceMinViaje: 70, reubicacionAprobar: true, distritosCerrados: ['Zona insurrecta'] }
  },

  expedientes: [
    {
      id: 'carga', nombre: 'Locomotora 2019-114', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'MANIFIESTO DE CARGA', numero: 'FR-12-0331', distrito: 'Ferroviarios',
      indice: '—', sello: '31.12.2041',
      motivo: 'Carga: repuestos de caldera y cable para la red de Helios. Destino: Colonia Este-1 (taller).',
      comentario: 'Nuestra locomotora. Kurt ha escrito «repuestos» con una letra tan buena que da miedo. Mercancías: se aprueba.',
      retrato: { emblema: true }
    },
    {
      id: 'navarro', nombre: 'Lucía Navarro', edad: 33, tipo: 'VIAJE', numero: 'FR-12-1180', distrito: 'Distrito 4',
      indice: 38, sello: '30.04.2041',
      motivo: 'Viaje hacia el Oeste con dos hijos. Destino declarado: Madrid. «Dicen que allí ya no hay listas.»',
      comentario: 'Treinta y ocho. Quiere ir a la ciudad de donde vengo. Dice que allí ya no hay listas. No sabe que allí ahora juzgamos a gente con sellos. Como este.',
      retrato: { piel: '#c8977a', pelo: '#2a1a12', estilo: 'largo', ropa: '#3c2f3a' },
      alAprobar: { bandera: 'navarroPasa' }
    },
    {
      id: 'maraF', si: 'salvoconductos', nombre: 'Ana Solano', edad: 41, tipo: 'VIAJE', numero: 'FR-12-2041', distrito: 'Distrito 1',
      indice: 78, sello: '31.03.2041',
      motivo: 'Secretaria del Inspector E. Vogt (Sección 14, Registro). Auditoría de fronteras.',
      comentario: 'Mara. Con otro nombre, otra vez. En la foto tiene la misma cicatriz en la ceja. Todo en orden. Por una vez, la verdad y la mentira coinciden.',
      retratoDe: 'mara',
      alAprobar: { bandera: 'maraCruza' },
      alRechazar: { bandera: 'maraRetenida' }
    },
    {
      id: 'maraF2', si: '!salvoconductos', nombre: 'Lucía Ferrer', edad: 41, tipo: 'VIAJE', numero: 'NB-6048-D', distrito: 'Zona insurrecta',
      indice: 74, sello: '28.11.2040',
      motivo: 'Viaje a la Colonia Este-1. Motivo declarado: «personal sanitario».',
      nota: 'Salvoconducto emitido en Nueva Berlín. Nombre en la Lista Gris desde noviembre.',
      comentario: 'Mara. Con los papeles de siempre: Lucía Ferrer, la niña de la primera lista. Lista Gris, sello caducado, zona insurrecta. Todas las normas dicen que no.',
      retratoDe: 'mara',
      alAprobar: { bandera: 'maraCruza' },
      alRechazar: { bandera: 'maraRetenida' },
      falsificar: { efecto: { bandera: ['maraCruza', 'maraFalsificada'] }, aviso: 'Ahora pone «Lucía Ferrero», Distrito 1, sello de marzo. Una letra más y otra ciudad.' }
    },
    {
      id: 'relojeroPreso', si: 'coberturaPreso', nombre: 'Tobías Grau', edad: 64, tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO DE PRESO', numero: 'FR-12-0007', distrito: 'Cárcel del Distrito 1',
      indice: '—', sello: '31.12.2041',
      motivo: 'Traslado de preso a la Colonia de Trabajo Este-1. Escolta: Inspector E. Vogt (Sección 14).',
      comentario: 'Tobías Grau, en la Lista Gris, viajando como preso. Los traslados se aprueban siempre. Es la primera vez que la norma le salva en vez de condenarle.',
      retratoDe: 'relojero',
      alAprobar: { bandera: 'relojeroCruza' },
      alRechazar: { bandera: 'relojeroRetenido' }
    },
    {
      id: 'relojeroAlias', si: ['guiaRelojero', '!coberturaPreso'], nombre: 'Tomás Gil', edad: 64, tipo: 'VIAJE', numero: 'FR-12-0071', distrito: 'Distrito 1',
      indice: 72, sello: '31.03.2041', vigilado: 'ostrowski',
      motivo: 'Viaje a la Zona de Helios. Motivo declarado: visitar a su hermano, relojero del taller de la Colonia Este-1.',
      nota: 'Comprobación facial automática: coincidencia del 74% con GRAU, Tobías (Lista Gris).',
      comentario: 'El Relojero con otro nombre. El nombre no está en la lista; la cara, casi. El comandante se ha acercado a mirar.',
      retratoDe: 'relojero',
      alAprobar: { bandera: ['relojeroCruza', 'relojeroSospechoso'] },
      alRechazar: { bandera: 'relojeroRetenido' },
      falsificar: { efecto: { bandera: ['relojeroCruza', 'relojeroCamuflado'] }, aviso: 'Coincidencia facial: 7%. Un cero menos, y Tobías Grau vuelve a ser nadie.' }
    },
    {
      id: 'ruthF', si: 'guiaRuth', nombre: 'Rosa Alarcón', edad: 72, tipo: 'VIAJE', numero: 'FR-12-1969', distrito: 'Distrito 1',
      indice: 71, sello: '31.03.2041',
      motivo: 'Viaje a la Zona de Helios. Motivo declarado: «a morirme cerca de mi hermana».',
      comentario: 'Ruth. Rosa Alarcón, viuda, setenta y dos años, Índice 71. Ella misma se ha hecho los papeles. Por un punto. Siempre por un punto.',
      retratoDe: 'ruth',
      alAprobar: { bandera: 'ruthCruza' },
      alRechazar: { bandera: 'ruthRetenida' }
    },
    {
      id: 'martaF', nombre: 'Marta Hessel', edad: 49, tipo: 'VIAJE', numero: 'NB-5561-B', distrito: 'Distrito 4',
      indice: 58, sello: '19.12.2041',
      motivo: 'Viaje a la Colonia de Trabajo Este-6. Motivo declarado: visitar a su hijo.',
      comentario: 'Cincuenta y ocho. Quiere ir a ver a su hijo a una colonia. Nadie visita las colonias.',
      comentarioSi: [{ si: 'memo_marta', texto: 'La recuerdo. Marta Hessel. En noviembre quería visitar a su hijo en Este-6 y yo se lo negué en el Ministerio. Ha llegado hasta aquí igual. A pie, dice el comandante.' }],
      retratoDe: 'marta',
      alAprobar: { bandera: 'martaPasa' },
      alRechazar: { bandera: 'martaRechazada' }
    },
    {
      id: 'gretaF', si: '!gretaRechazada', nombre: 'Greta Lang', edad: 29, tipo: 'VIAJE', numero: 'CH-0092-A', distrito: 'Ciudadela Helios',
      indice: 90, sello: '30.06.2041',
      motivo: 'Regreso a su puesto: técnica de la red de distribución, Ciudadela Helios.',
      comentario: 'Greta Lang. La de la Juventud Solar. El primer día le aprobé el traslado a la Ciudadela Helios. Me está mirando a través del cristal. Me ha reconocido.',
      retratoDe: 'greta',
      alAprobar: { bandera: 'gretaHelios' }
    },
    {
      id: 'busquedaJulia', si: 'juliaPorOtroCamino', nombre: 'Julia Aranda', edad: 60, tipo: 'INFORME', etiqueta: 'ORDEN DE BUSCA Y CAPTURA', numero: 'DS-0114-B', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041', vigilado: 'ostrowski',
      motivo: 'Circular a todos los puestos: la terrorista «la Voz de Madrid» ha abandonado la zona insurrecta. Detener y entregar a la Inspectora A. Hel.',
      comentario: 'Mi madre. Busca y captura. Si apruebo, la circular sale hoy a todos los puestos del Este. Si la devuelvo, el comandante querrá saber por qué.',
      retratoDe: 'julia',
      alAprobar: { bandera: 'circularJulia' },
      alRechazar: { bandera: 'circularJuliaRetenida' }
    }
  ],

  informe: {
    firma: 'ostrowski',
    titulo: 'INFORME DE JORNADA · PUESTO FRONTERIZO 12',
    salir: 'Cruzar la frontera ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Impecable, inspector. Ni mi archivero lo hacía tan bien. Claro que mi archivero tenía tifus.' },
      { maxErrores: 2, texto: 'Algún error. Los de Madrid siempre tienen el corazón blando. Por eso perdieron la ciudad. Ah, no, que la ganaron. Ya no me entero.' },
      { maxErrores: 99, texto: 'Usted no es inspector de nada, Vogt. Lo sé. Lo que no sé es si me importa. Váyase antes de que me importe.' }
    ],
    extras: [
      { si: 'maraRetenida', texto: 'Por cierto: su secretaria se queda aquí. Sus papeles no estaban en regla. Usted mismo lo ha dicho con su sello.' },
      { si: 'relojeroRetenido', texto: 'Y el viejo se queda en el calabozo del puesto. Lo ha decidido usted. Yo solo cumplo.' },
      { si: 'relojeroSospechoso', texto: 'Ese relojero... me suena su cara. Lo comprobaré con la Dirección de Seguridad. Tardan dos días en contestar. Siempre.' },
      { si: 'circularJuliaRetenida', texto: 'Ha devuelto una circular de la Inspectora Hel. No sé si es usted muy valiente o muy de Madrid.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'trenNieve', texto: '16:00. La barrera se levanta. La locomotora 2019-114 cruza a la Zona de Helios con un pitido largo.', siguiente: 's2' },
      s2: { rama: [{ si: 'maraRetenida', ir: 's3m' }, { si: 'relojeroRetenido', ir: 's3r' }], siguiente: 's4' },
      s3m: { quien: 'kurt', texto: 'Se han quedado a Mara. La has rechazado tú, chico. Con tu sello. Esta noche paramos en el apartadero del kilómetro 40 y vamos a por ella. Y no quiero oír que no tenías elección.', siguiente: 's4' },
      s3r: { quien: 'kurt', texto: 'El viejo se ha quedado en el calabozo del puesto. Sin él no sabemos entrar en la colonia. Esta noche volvemos a por él.', siguiente: 's4' },
      s4: { rama: [{ si: 'gretaHelios', ir: 's5g' }], siguiente: 's6' },
      s5g: { texto: 'En el andén del puesto, Greta Lang se sube al tren de la mañana hacia la Ciudadela. Antes de subir, se lleva un dedo a los labios. Mirando a Elías.', siguiente: 's6' },
      s6: { quien: 'elias', pensamiento: true, texto: 'Las torres de Helios, a los dos lados de la vía, hasta donde llega la vista. Llevan luz a todas partes menos a donde vamos.' }
    }
  }
};

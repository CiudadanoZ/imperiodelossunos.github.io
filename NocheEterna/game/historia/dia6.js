// ============================================================
//  DÍA 6 — Sábado, 8 de noviembre de 2040 · El último día en la mesa
//  Novedad: expediente.falsificar = { efecto, aviso }
//  Añade el botón FALSIFICAR (tecla F): tarda más que memorizar, la orden
//  sale aprobada con el cambio dentro, y si el Ojo mira, la sospecha se dispara.
// ============================================================

window.DIA6 = {
  numero: 6,
  fecha: 'Sábado, 8 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 14,
  ojo: { desviado: [2200, 4200], aviso: 800, mirando: [3000, 5200] },
  // si Brandt «estropeó» el Ojo, gira más despacio
  ojoSi: [{ si: 'ojoLento', ojo: { desviado: [4500, 7500], aviso: 1300, mirando: [2000, 3200] } }],

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Sábado. 06:00. El último día de Elías Vogt en el Ministerio de Registro. Pase lo que pase mañana, no volverá a sentarse en esa silla.', siguiente: 'a2' },
      a2: { quien: 'pantalla', texto: 'Mañana, Día del Sol. El Canciller Voss hablará a la humanidad desde La Aguja a las 21:00. Los funcionarios trabajarán hoy media jornada para preparar el despliegue.', siguiente: 'a3' },
      a3: { si: 'octavillaMadre', quien: 'elias', pensamiento: true, texto: 'Llevo la octavilla de mi madre en el bolsillo interior. «Sigue mirando.» Hoy miraré las órdenes. Y las cambiaré.', siguiente: 'b0' },
      b0: { rama: [{ si: 'brandtPurgado', ir: 'h1' }, { si: 'capturado_brandt', ir: 'h1' }, { si: 'recluta_brandt', ir: 'k1' }], siguiente: 'n1' },

      // La Inspectora Hel ocupa la mesa de Brandt
      h1: { escena: 'oficina', efecto: { hora: 1.96 }, texto: 'Sección 14. La mesa del Supervisor Brandt tiene otro nombre en la placa: Inspectora A. Hel.', siguiente: 'h2' },
      h2: { quien: 'inspectora', texto: 'Vogt. Hoy tramitará las órdenes de despliegue del Día del Sol. Son las más importantes que verá en su vida. Las revisaré todas. Una por una.', siguiente: 'f1' },

      // Brandt, ya de los nuestros
      k1: { escena: 'oficina', efecto: { hora: 1.96 }, texto: 'Sección 14. Brandt está en su mesa, como siempre. Cuando Elías pasa a su lado, no levanta la vista.', siguiente: 'k2' },
      k2: { quien: 'brandt', texto: 'Vogt. Órdenes de despliegue. Las he dejado en su bandeja yo mismo. El Ojo de su mesa ha tenido... una avería de mantenimiento. Gira más despacio. No le dé las gracias.', efecto: { bandera: 'ojoLento' }, siguiente: 'k3' },
      k3: { si: 'brandtEngañado', quien: 'brandt', texto: 'Aquel nombre que me dio el jueves, el que no existe. Ahora entiendo para qué servía. Bien hecho. No se lo diga a nadie.', siguiente: 'f1' },

      // Brandt, a secas
      n1: { escena: 'oficina', efecto: { hora: 1.96 }, texto: 'Sección 14. Brandt está en su mesa. Tiene ojeras. Parece un hombre que ha dejado de dormir.', siguiente: 'n2' },
      n2: { quien: 'brandt', texto: 'Órdenes de despliegue, Vogt. Tramítelas bien. Mañana es el día más importante de nuestras vidas. Para todos.', siguiente: 'n3' },
      n3: { si: 'brandtEngañado', quien: 'brandt', texto: 'Por cierto. Aquel nombre que no existe. A veces todavía lo busco. Me pregunto a cuánta gente habrá salvado alguien que nunca nació.', siguiente: 'f1' },

      f1: { texto: 'NUEVO: algunas órdenes se pueden FALSIFICAR (tecla F). Tarda más que memorizar. La orden sale aprobada, pero con tu cambio dentro. Si el Ojo te ve, la sospecha se dispara.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · VÍSPERA DEL DÍA DEL SOL',
    textos: [
      'ÓRDENES DE DESPLIEGUE, TRASLADOS e INFORMES: aprobar siempre.',
      'VIAJES: suspendidos. Rechazar todos.',
      'RACIONES: rechazar si el Índice es menor de 55.',
      'DISTRITOS 4, 6, 9 y 11 en cuarentena.',
      'Sello vigente. Hoy: 08.11.2040.'
    ],
    listaGris: ['Klara Dietz', 'Pablo Ortega', 'Mateo Ruiz'],
    reglas: { fecha: '08.11.2040', viajesSuspendidos: true, indiceMinViaje: 65, indiceMinRacion: 55, reubicacionAprobar: true, distritosCerrados: ['Distrito 4', 'Distrito 6', 'Distrito 9', 'Distrito 11'] }
  },

  // ---------------- EXPEDIENTES ----------------
  expedientes: [
    {
      id: 'ordenAguja', nombre: 'Guardia Negra · Perímetro', edad: '—', tipo: 'ORDEN', numero: 'DS-0911-A', distrito: 'La Aguja',
      indice: '—', sello: '31.12.2040',
      motivo: 'DESPLIEGUE DEL DÍA DEL SOL: tres compañías de la Guardia Negra en el perímetro de La Aguja, de 19:00 a 23:00.',
      comentario: 'Tres compañías. Seiscientos visores negros entre nosotros y la puerta. A no ser que alguien cambie un número.',
      retratoDe: 'guardia',
      falsificar: { efecto: { bandera: 'guardiaDesviada' }, aviso: 'Dos de las tres compañías irán a proteger la Ciudadela Helios.' }
    },
    {
      id: 'sergio', nombre: 'Sergio Alba', edad: 36, tipo: 'RACIÓN', numero: 'NB-4471-C', distrito: 'Distrito 3',
      indice: 58, sello: '20.02.2041',
      motivo: 'Ración ordinaria. Electricista de la central Helios.',
      comentario: 'Cincuenta y ocho. Electricista. Mañana, cuando se apaguen las luces, será de los pocos que sepan por qué.'
    },
    {
      id: 'ordenAcceso', nombre: 'Personal · Nivel 0', edad: '—', tipo: 'ORDEN', numero: 'DS-0911-B', distrito: 'La Aguja',
      indice: '—', sello: '31.12.2040',
      motivo: 'Lista de personal civil autorizado en la entrada de servicio de La Aguja (nivel 0) durante el Día del Sol.',
      comentario: 'Cuarenta nombres de limpiadores, cocineros y mozos. Cabrían doce más. Si alguien los escribiera.',
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'pasesAguja' }, aviso: 'Doce nombres más en la lista. Doce Insomnes con pase de servicio.' }
    },
    {
      id: 'ordenEclipse', si: 'eclipseDescifrado', nombre: 'Protocolo Eclipse', edad: '—', tipo: 'ORDEN', numero: 'OD-2100-E', distrito: 'ODÍN',
      indice: '—', sello: '31.12.2040',
      motivo: 'Confirmación técnica del Protocolo Eclipse. Apagado general a las 21:00:00. Reactivación de ODÍN a los 60 segundos.',
      comentario: 'Sesenta segundos de oscuridad. Un cero más y serían seiscientos.',
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'eclipseLargo' }, aviso: 'Reactivación de ODÍN: 300 segundos. Cinco minutos de oscuridad.' }
    },
    {
      id: 'irma', nombre: 'Irma Vidal', edad: 70, tipo: 'VIAJE', numero: 'NB-1122-F', distrito: 'Distrito 2',
      indice: 81, sello: '14.04.2041',
      motivo: 'Viaje al Distrito 1 para ver el desfile del Día del Sol desde la primera fila.',
      comentario: 'Setenta años y quiere ver al Canciller de cerca. Mañana lo verá mucha gente. No como ella espera.'
    },
    {
      id: 'ordenColonias', nombre: 'Colonia Este-1', edad: '—', tipo: 'TRASLADO', numero: 'CT-0001-E', distrito: 'Colonias del Este',
      indice: '—', sello: '31.12.2040',
      motivo: 'Traslado de 400 internos de la Colonia Este-1 a Nueva Berlín como mano de obra para el desmontaje del desfile.',
      comentario: 'Cuatrocientos internos de la Colonia Este-1. Cuatrocientos nombres en una lista que nadie leerá.',
      comentarioSi: [{ si: 'nombreReal', texto: 'Colonia Este-1. El último lugar donde alguien vio a mi madre. Cuatrocientos nombres. Hay sitio para uno más.' }],
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'juliaTraslado' }, aviso: 'Un nombre añadido al final de la lista: Julia Aranda.' }
    },
    {
      id: 'ruthOrden', si: 'ruthCaida', nombre: 'Ruth Adler', edad: 71, tipo: 'TRASLADO', numero: 'NB-1969-A', distrito: 'Dirección de Seguridad',
      indice: 0, sello: '31.12.2040',
      motivo: 'Detenida en el Archivo Central. Ejecución sumaria programada: 09.11.2040, al amanecer.',
      comentario: 'Ruth. «Para el niño que miraba.» Mañana al amanecer. A no ser que el papel diga otra cosa.',
      retratoDe: 'ruth',
      falsificar: { efecto: { bandera: 'ruthEnAguja' }, aviso: 'Ruth será trasladada a La Aguja, nivel -4, para «interrogatorio». Estará dentro mañana.' }
    },
    {
      id: 'tomasOrden', si: 'capturado_tomas', nombre: 'Tomás Rey', edad: 19, tipo: 'TRASLADO', numero: 'NB-9931-K', distrito: 'Dirección de Seguridad',
      indice: 0, sello: '31.12.2040',
      motivo: 'Detenido. Traslado a la Colonia Este-6 en el primer tren del lunes.',
      comentario: 'Chispa. En el primer tren del lunes. Si mañana sale bien, no habrá trenes el lunes.',
      retratoDe: 'tomas',
      falsificar: { efecto: { bandera: 'tomasEnAguja' }, aviso: 'Chispa será trasladado a La Aguja, nivel -4. Justo al lado del núcleo de ODÍN.' }
    }
  ],

  // ---------------- INFORME ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Todo en orden para mañana. Váyase a casa. Descanse. Que el Sol le ilumine.' },
      { maxErrores: 2, texto: 'Algún error. Hoy ya no importa. Mañana importará todo.' },
      { maxErrores: 99, texto: 'Hoy le han temblado las manos, Vogt. Lo he visto. No se preocupe: mañana nos temblarán a todos.' }
    ],
    extras: [
      { si: ['recluta_brandt', '!capturado_brandt'], texto: '(Brandt, en voz baja:) Puerta de personal, 20:55. No llegue tarde. Llegar tarde también es una forma de lealtad.' },
      { si: 'brandtPurgado', texto: '(Firma el informe la Inspectora Hel. Al salir, le mira a la cara un segundo más de lo necesario.)' },
      { si: 'capturado_brandt', texto: '(Firma el informe la Inspectora Hel. «Su antiguo supervisor está en el nivel -4, Vogt. Dice muy poco. Todavía.»)' }
    ]
  },

  // ---------------- SALIDA ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'oficina', texto: '14:00. Elías ordena su mesa. Las gomas, los sellos, la lámpara verde. Once años.', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: 'Me llevo una sola cosa: el sello de RECHAZADO. Es lo único de esta mesa que alguna vez salvó a alguien.', efecto: { bandera: 'selloRechazado' }, siguiente: 's3' },
      s3: { escena: 'calle', texto: 'En la calle, los operarios terminan el escenario del desfile. Cuelgan un sol negro de veinte metros de la fachada del Ministerio.', siguiente: 's4' },
      s4: { quien: 'elias', pensamiento: true, texto: 'Mañana a las nueve. Una noche más.' }
    }
  }
};

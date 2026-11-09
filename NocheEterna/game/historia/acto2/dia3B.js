// ============================================================
//  ACTO 2 · CAMINO B · DÍA 3 — «El tren del jueves»
//  Miércoles, 6 de febrero de 2041. Colonia Este-1. Tercer día en el registro.
//  En el manifiesto del tren de carbón: «fogonera de relevo: M. S., Lavapiés».
// ============================================================

window.DIA_B3 = {
  numero: 3,
  fecha: 'Miércoles, 6 de febrero de 2041',
  horaInicio: 7,
  horaFin: 17,
  escenaCasa: 'barracon',
  escenaMesa: 'oficinaColonia',
  cabecera: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
  ojo: { desviado: [2400, 4600], aviso: 850, mirando: [3000, 5500] },

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Miércoles. Esta noche han muerto dos personas en el barracón 7. Por la mañana, los guardias las sacan en una carretilla. Nadie mira. Elías sí.', siguiente: 'a2' },
      a2: { rama: [{ si: 'maraViene', ir: 'a3' }], siguiente: 'b1' },
      a3: { quien: 'elias', pensamiento: true, texto: 'Mara viene. Lo pienso al despertar, antes que el frío. Es la primera vez en mi vida que lo primero que pienso al despertar es un nombre.', siguiente: 'b1' },
      b1: { escena: 'oficinaColonia', efecto: { hora: 0.95 }, quien: 'rusk', texto: 'La Inspectora sigue aquí. Duerme en mi casa y yo duermo en la oficina. Así que hoy no hay errores, 41-0877. No me hagas dormir en el barracón.', siguiente: 'b2' },
      b2: { rama: [{ si: 'traidorDentro_jonas', ir: 'b3j' }], siguiente: 'b4' },
      b3j: { quien: 'elias', pensamiento: true, texto: 'Jonas Kerr me ha sonreído esta mañana en la cola del agua. Jonas nunca sonríe.', siguiente: 'b4' },
      b4: { quien: 'elias', pensamiento: true, texto: 'Hoy el tren de carbón trae relevo de tripulación. Los manifiestos pasan por esta mesa. Todo pasa por esta mesa.' }
    }
  },

  directivas: {
    titulo: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
    textos: [
      'TRASLADOS, MANIFIESTOS y órdenes de la Cancillería: aprobar siempre.',
      'INFORMES de confidentes y CERTIFICADOS: aprobar siempre (pasan a la Inspectora).',
      'RACIONES: rechazar si la cuota de trabajo es menor de 65.',
      'PERMISOS: rechazar si la cuota es menor de 70.',
      'BARRACONES 7 y 9 en cuarentena. Sello vigente: hoy 06.02.2041.'
    ],
    listaGris: ['Nowak, Olek', 'Grau, Tobías', 'Haddad, Samira'],
    reglas: { fecha: '06.02.2041', indiceMinViaje: 70, indiceMinRacion: 65, reubicacionAprobar: true, distritosCerrados: ['Barracón 7', 'Barracón 9'] }
  },

  expedientes: [
    {
      id: 'manifiesto', nombre: 'Tren de carbón 14', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'MANIFIESTO DE CARGA', numero: 'CT-T14-0207', distrito: 'Estación Este-1',
      indice: '—', sello: '31.12.2041',
      motivo: 'Llegada: miércoles, 18:00. Carga de carbón para la Ciudadela Helios. Salida: jueves, 05:00. Tripulación: maquinista O. Ritter; fogonera de relevo: M. S., Lavapiés.',
      nota: 'Relevo de tripulación autorizado en la frontera. Origen: zona insurrecta.',
      comentario: 'M. S., Lavapiés. Una fogonera de Madrid en un tren de carbón de la Orden. Nadie de Lavapiés se llama M. S. salvo una persona.',
      comentarioSi: [{ si: 'nombreMara', texto: 'M. S., Lavapiés. «Mara Solís Ortega. Nacida en Lavapiés. Ya lo tienes.» Lo tengo. Lo he tenido todo este tiempo.' }],
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'manifiestoFalsificado' }, aviso: 'Al final de la tripulación, cuatro líneas nuevas: «mozos de carga (internos), 4». Cuatro sitios en el tren del jueves.' }
    },
    {
      id: 'permiso12', si: 'promesaBarracon', nombre: 'Barracón 12 (32 internos)', edad: '—', tipo: 'VIAJE', etiqueta: 'PERMISO COLECTIVO', numero: 'CT-1-P12', distrito: 'Barracón 12',
      indice: 64, sello: '31.03.2041',
      motivo: 'Permiso de trabajo fuera del recinto: carga del tren 14 en la estación, jueves 04:00. Cuota media del barracón: 64%.',
      comentario: 'Treinta y dos personas en la estación, a las cuatro de la mañana, al lado de un tren que se va. Sesenta y cuatro: la norma dice que no. Le prometí a Samira que iríamos todos.',
      retrato: { emblema: true },
      alAprobar: { bandera: 'permisoBarracon12' }
    },
    {
      id: 'segundaOrden', si: 'trasladoJuliaRechazado', nombre: '[CLASIFICADO] · Interna 2033-114', edad: 60, tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO · SEGUNDA ORDEN', numero: 'DS-H-0114-2', distrito: 'Ciudadela Helios',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'Traslado a la Ciudadela Helios, 12.02.2041. Segunda orden. Firmada otra vez, con la misma letra, por la Inspectora A. Hel.',
      comentario: '«Lo firmaré otra vez mañana. Y pasado. Tengo muchos sellos.» Ha cumplido. Está detrás de mí, esperando a ver si yo también.',
      retratoDe: 'julia',
      alAprobar: { bandera: 'trasladoJuliaAprobado' },
      alRechazar: { bandera: 'segundoRechazo' },
      falsificar: { efecto: { bandera: 'trasladoJuliaFalsificado' }, aviso: 'La fecha dice «12.03.2041». Delante de ella. Otra vez.' }
    },
    {
      id: 'informeJonas', si: 'traidorDentro_jonas', nombre: 'Interno J. K.', edad: '—', tipo: 'INFORME', etiqueta: 'INFORME DE CONFIDENTE', numero: 'CT-1-INF-31', distrito: 'Barracón 12',
      indice: '—', sello: '31.12.2041',
      motivo: 'El interno 41-0877 (archivero) y otros del barracón 12 preparan una fuga aprovechando el tren de carbón del jueves. Recomendación: registrar el tren.',
      comentario: 'Jonas. Le acepté en nuestro barracón. Si apruebo esto, mañana a las cinco habrá veinte guardias en el tren. Si lo devuelvo, Rusk preguntará por qué un informe de confidente vuelve a su mesa.',
      retrato: { piel: '#d8b294', pelo: '#3a2c20', estilo: 'rapado', ropa: '#4a4a52' },
      alAprobar: { bandera: 'informeJonasEntregado' },
      alRechazar: { bandera: 'informeJonasRetenido' }
    },
    {
      id: 'defuncionTomas', si: ['tomasReubicado', 'observacionAprobada'], nombre: 'Tomás Rey', edad: 19, tipo: 'INFORME', etiqueta: 'CERTIFICADO DE DEFUNCIÓN', numero: 'CT-1-D-3107', distrito: 'Barracón de observación',
      indice: '—', sello: '31.12.2041',
      motivo: 'Causa: tifus exantemático. Fecha: 06.02.2041, 03:40. Pertenencias: un destornillador hecho con una cuchara.',
      comentario: 'Chispa. Sellé su reubicación el primer día. Ayer sellé su traslado al barracón de observación. Hoy sello esto. Tres sellos. Diecinueve años.',
      retratoDe: 'tomas',
      alAprobar: { bandera: 'muerteChispa' },
      alRechazar: { bandera: 'muerteChispa' }
    },
    {
      id: 'kasia3', nombre: 'Kasia Wrona', edad: 29, tipo: 'RACIÓN', numero: 'CT-1-2211', distrito: 'Barracón 3',
      indice: 59, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 59%.',
      comentario: 'Setenta y cuatro, sesenta y tres, cincuenta y nueve. Tres días. Así es como se baja de la línea: poco a poco, y luego todo de golpe.',
      retrato: { piel: '#e6c4a8', pelo: '#8a6a40', estilo: 'largo', ropa: '#4a4a52' },
      alAprobar: { bandera: 'kasiaAyudada' }
    }
  ],

  informe: {
    firma: 'rusk',
    titulo: 'INFORME DE JORNADA · REGISTRO DE LA COLONIA',
    salir: 'Volver al barracón ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Bien. Hoy he dormido tranquilo en mi silla. Esta noche dormiré tranquilo otra vez.' },
      { maxErrores: 2, texto: 'Errores. La Inspectora los cuenta. Yo también. Ella los anota en una libreta negra; yo, en tu ración.' },
      { maxErrores: 99, texto: 'Tantos errores no son errores, 41-0877. Son una costumbre. Y las costumbres aquí se curan en el barracón de observación.' }
    ],
    extras: [
      { si: 'informeJonasRetenido', texto: '(Rusk:) Un informe de confidente devuelto. Jonas vendrá a preguntarme por qué. Le diré que fue el archivero.' },
      { si: 'informeJonasEntregado', texto: '(Rusk:) El informe de Jonas va a la libreta negra de la Inspectora. Mañana el tren 14 tendrá compañía.' },
      { si: 'segundoRechazo', texto: '(Rusk:) Dos órdenes de la Inspectora devueltas en dos días. Ya no sé si eres valiente. Empiezo a pensar que es otra cosa.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'colonia', texto: '18:00. Las columnas vuelven de la cantera. Desde la alambrada se ve la estación: el tren 14 entra despacio, echando humo negro contra la nieve.', siguiente: 's2' },
      s2: { texto: 'En la plataforma de la locomotora, una figura pequeña con un gorro de lana palea carbón sin parar. No mira hacia la colonia. No mira a ninguna parte.', siguiente: 's3' },
      s3: { quien: 'elias', pensamiento: true, texto: 'Mara nunca mira cuando está trabajando. Dice que mirar es para después.', siguiente: 's4' },
      s4: { rama: [{ si: 'muerteChispa', ir: 's5c' }], siguiente: 's6' },
      s5c: { quien: 'elias', pensamiento: true, texto: 'Y Chispa no verá nunca ese tren. Ni la luz. Ni el concierto. Me lo apunto, como apunto todos los nombres. Esta vez duele al escribirlo.', siguiente: 's6' },
      s6: { texto: 'Esa noche, alguien llama tres veces a la puerta del barracón 12.' }
    }
  }
};

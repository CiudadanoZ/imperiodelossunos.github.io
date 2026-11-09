// ============================================================
//  ACTO 2 · PRÓLOGO B «El Este» · DÍA 1
//  Lunes, 4 de febrero de 2041. Colonia de Trabajo Este-1.
//  El asalto fracasó (final «La noche sigue»). Elías, preso, lleva el registro de la colonia.
//  Usa la mesa del Acto 1 (js/dia.js) con escenas propias: barracon y oficinaColonia.
// ============================================================

window.DIA_B1 = {
  numero: 1,
  fecha: 'Lunes, 4 de febrero de 2041',
  horaInicio: 7,
  horaFin: 17,
  escenaCasa: 'barracon',
  escenaMesa: 'oficinaColonia',
  cabecera: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
  ojo: { desviado: [2800, 5500], aviso: 900, mirando: [3000, 5500] },

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Colonia de Trabajo Este-1. A dos mil kilómetros de Madrid. En febrero, aquí el sol sale a las ocho y se pone a las cuatro. Nadie lo ve.', siguiente: 'a2' },
      a2: { texto: 'Tres meses después del Día del Sol. El asalto fracasó. Elías pasó seis semanas en una celda del nivel -4 de La Aguja. En enero lo subieron a un tren de ganado.', siguiente: 'a3' },
      a3: { quien: 'elias', pensamiento: true, texto: 'Ya no soy el ciudadano 44-190-V. Soy el interno 41-0877. Me lo han cosido en el abrigo. Encima del corazón, para que se vea bien.', siguiente: 'a4' },
      a4: { rama: [{ si: 'nombreReal', ir: 'a5n' }], siguiente: 'b1' },
      a5n: { quien: 'elias', pensamiento: true, texto: 'Elías Aranda. Nadie aquí sabe ese nombre. Lo repito cada noche, en voz baja, para que no se me olvide cómo suena.', siguiente: 'b1' },

      b1: { escena: 'oficinaColonia', efecto: { hora: 0.95 }, quien: 'rusk', texto: 'El 41-0877. El archivero. Aquí nos faltan archiveros: los tres últimos se murieron de frío en diciembre.', siguiente: 'b2' },
      b2: { quien: 'rusk', texto: 'Llevarás el registro de internos. Raciones, permisos, traslados. Las normas están en la pared. Si te equivocas, a la cantera. Si te equivocas a propósito, al barracón de observación. De ahí no vuelve nadie.', siguiente: 'b3' },
      b3: { quien: 'elias', pensamiento: true, texto: 'Otra mesa. Otro sello. Otra vez decidiendo quién come. Solo que ahora yo también estoy en la lista.', siguiente: 'b4' },
      b4: { texto: 'EL REGISTRO DE LA COLONIA funciona como el Ministerio: compara cada ficha con las normas y aprueba o rechaza. La cámara de la torre gira como el Ojo. Y la SOSPECHA vuelve: aquí la mide el capataz.' }
    }
  },

  directivas: {
    titulo: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
    textos: [
      'TRASLADOS (a Helios, al barracón de observación): aprobar siempre.',
      'RACIONES: rechazar si la cuota de trabajo es menor de 60.',
      'PERMISOS (correo, trabajo fuera): rechazar si la cuota es menor de 70.',
      'BARRACÓN 7 en cuarentena (tifus): rechazar todo lo que venga de él.',
      'Sello vigente. Hoy: 04.02.2041.'
    ],
    listaGris: ['Nowak, Olek', 'Grau, Tobías', 'Haddad, Samira'],
    reglas: { fecha: '04.02.2041', indiceMinViaje: 70, indiceMinRacion: 60, reubicacionAprobar: true, distritosCerrados: ['Barracón 7'] }
  },

  expedientes: [
    {
      id: 'kasia', nombre: 'Kasia Wrona', edad: 29, tipo: 'RACIÓN', numero: 'CT-1-2211', distrito: 'Barracón 3',
      indice: 74, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cantera, turno de mañana. Cuota de trabajo: 74%.',
      comentario: 'Setenta y cuatro. Hoy come. Aquí eso es una buena noticia, y ya está.',
      retrato: { piel: '#e6c4a8', pelo: '#8a6a40', estilo: 'largo', ropa: '#4a4a52' }
    },
    {
      id: 'olekF', nombre: 'Olek Nowak', edad: 38, tipo: 'RACIÓN', numero: 'CT-1-0934', distrito: 'Barracón 12',
      indice: 58, sello: '31.03.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 58%. Motivo: fractura de mano en la cantera (no tratada).',
      comentario: 'Cincuenta y ocho. Dos puntos. Se rompió la mano picando piedra para que otro llegara a su cuota. Duerme en mi barracón.',
      retratoDe: 'olek',
      alAprobar: { bandera: 'olekAyudado' }
    },
    {
      id: 'traslado', nombre: 'Traslado colectivo · 40 internos', edad: '—', tipo: 'REUBICACIÓN', numero: 'CT-H-0412', distrito: 'Ciudadela Helios',
      indice: '—', sello: '31.12.2041', intel: 1,
      motivo: 'Traslado a la Ciudadela Helios. Mano de obra para el mantenimiento de la red. Prioridad: internos con formación técnica.',
      nota: 'Al final de la lista, dos nombres tachados a mano y vueltos a escribir: «E. Kowalczyk, ingeniera» y «M. Ferrer, técnico de red». Firma: «A. H.»',
      comentario: 'Cuarenta nombres hacia el sitio de donde sale la luz. Dos de ellos, escritos dos veces. Alguien quiere que esos dos lleguen a Helios.',
      retrato: { emblema: true }
    },
    {
      id: 'tomasB', si: 'tomasReubicado', nombre: 'Tomás Rey', edad: 19, tipo: 'RACIÓN', numero: 'CT-1-3107', distrito: 'Barracón 7',
      indice: 71, sello: '31.03.2041',
      motivo: 'Ración de enfermería. Diagnóstico: tifus. Cuota de trabajo antes de enfermar: 71%.',
      comentario: 'Tomás Rey. En la foto de noviembre sonreía. Yo sellé su reubicación el primer día. En esta foto ya no sonríe. Barracón 7: la norma dice que se rechaza.',
      retratoDe: 'tomas',
      alAprobar: { bandera: 'tomasBAyudado' },
      alRechazar: { bandera: 'tomasBAbandonado' }
    },
    {
      id: 'brandtB', si: 'brandtPurgado', nombre: 'Konrad Brandt', edad: 52, tipo: 'VIAJE', numero: 'CT-1-4480', distrito: 'Barracón 9',
      indice: 44, sello: '31.03.2041',
      motivo: 'Permiso de correo: una carta a Madrid, Ministerio de Registro, Sección 14. Destinatario: «el archivero de la mesa 7».',
      comentario: 'Brandt. Purgado en la Semana de la Lealtad. Una carta para el archivero de la mesa 7. Mi mesa. Me escribe a mí, a Madrid, sin saber que estoy a cuarenta metros.',
      retratoDe: 'brandt',
      alAprobar: { bandera: 'cartaBrandt' }
    },
    {
      id: 'interna', nombre: '[CLASIFICADO] · Interna 2033-114', edad: 60, tipo: 'RACIÓN', numero: 'CT-1-0114', distrito: 'Barracón 4',
      indice: '—', sello: '31.12.2041', intel: 2,
      motivo: 'Ración completa. Trato especial por orden de la Dirección de Seguridad.',
      nota: 'Observaciones (2033): «No trasladar. No castigar. No dejar morir.» Nacida en Madrid. Profesión anterior: locutora.',
      comentario: 'Una interna a la que nadie puede tocar, en un sitio donde la gente se muere de frío. Madrid. Locutora. Tiene los ojos de alguien que mira a la gente como si fuera a desaparecer.',
      comentarioSi: [{ si: 'nombreReal', texto: 'Madrid, 2033. Locutora. «No dejar morir.» Mi madre llegó a la Colonia Este-1 en 2033. Y tiene... tiene mis ojos. No la cara: los ojos.' }],
      retratoDe: 'julia'
    },
    {
      id: 'relojeroB', nombre: 'Tobías Grau', edad: 64, tipo: 'REUBICACIÓN', numero: 'CT-1-0007', distrito: 'Barracón 12',
      indice: '—', sello: '31.12.2041',
      motivo: 'Traslado a celda de aislamiento. Causa: negarse a trabajar. Duración: indefinida.',
      comentario: 'El Relojero. Aquí. Hel nos ha mandado a los dos a la misma colonia. Con ella nada es casualidad.',
      retratoDe: 'relojero',
      alAprobar: { bandera: 'relojeroAislado' },
      alRechazar: { bandera: 'relojeroEnBarracon' }
    }
  ],

  informe: {
    firma: 'rusk',
    titulo: 'INFORME DE JORNADA · REGISTRO DE LA COLONIA',
    salir: 'Volver al barracón ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Ni un error. Los otros archiveros tardaban un mes en aprender. Tú ya sabías. Me pregunto dónde.' },
      { maxErrores: 2, texto: 'Errores. Aquí los errores se pagan en raciones. La tuya de mañana, por ejemplo.' },
      { maxErrores: 99, texto: 'O no sabes leer o sabes demasiado. Mañana lo averiguaremos, 41-0877.' }
    ],
    extras: [
      { si: 'relojeroEnBarracon', texto: '(Rusk, en voz baja:) Devolviste la orden del viejo relojero. Él tampoco trabaja. Ya veremos cuánto dura en tu barracón.' },
      { si: 'tomasBAyudado', texto: 'Y una ración del barracón 7. Del tifus. ¿Quieres contagiar a toda la colonia?' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'colonia', texto: '17:00. Ya es de noche. La columna de internos vuelve de la cantera en silencio, pisando las huellas del de delante.', siguiente: 's2' },
      s2: { rama: [{ si: 'memo_interna', ir: 's3m' }], siguiente: 's4' },
      s3m: { quien: 'elias', pensamiento: true, texto: 'Barracón 4. La interna 2033-114. He memorizado su foto. La tengo delante de los ojos cada vez que parpadeo.', siguiente: 's4' },
      s4: { texto: 'Junto a la alambrada del barracón 4, una mujer de pelo gris se queda mirando la columna. Cuando Elías pasa, da un paso adelante. Luego un guardia grita, y ella vuelve atrás.', siguiente: 's5' },
      s5: { quien: 'elias', pensamiento: true, texto: 'Nadie aquí mira las caras. Salvo ella. Y yo.' }
    }
  }
};

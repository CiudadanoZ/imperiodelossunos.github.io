// ============================================================
//  ACTO 2 · PRÓLOGO B · DÍA 2 — «La Inspectora»
//  Martes, 5 de febrero de 2041. Hel llega a la colonia y se sienta detrás de Elías.
//  Orden de traslado de la interna 2033-114 (Julia) a la Ciudadela Helios.
// ============================================================

window.DIA_B2 = {
  numero: 2,
  fecha: 'Martes, 5 de febrero de 2041',
  horaInicio: 7,
  horaFin: 17,
  escenaCasa: 'colonia',
  escenaMesa: 'oficinaColonia',
  cabecera: 'REGISTRO DE INTERNOS · COLONIA ESTE-1',
  ojo: { desviado: [2400, 4600], aviso: 850, mirando: [3000, 5500] },

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Martes. A las seis de la mañana, un coche negro cruza la puerta de la colonia. Es el primer coche que Elías ve desde noviembre.', siguiente: 'a2' },
      a2: { texto: 'Toda la colonia forma en la nieve. Mil doscientos internos en filas de a diez. Nadie tiembla: temblar se castiga.', siguiente: 'a3' },
      a3: { quien: 'inspectora', texto: 'Buenos días. Soy la Inspectora Adela Hel, de la Cancillería. Estaré con ustedes unos días. No se preocupen: no he venido a por ustedes.', siguiente: 'a4' },
      a4: { texto: 'Pasa entre las filas despacio, mirando las caras. Se para delante del interno 41-0877.', siguiente: 'a5' },
      a5: { quien: 'inspectora', texto: 'Archivero Vogt. Me sigue debiendo un nombre de su sección. Hoy me sentaré detrás de usted. Como en los viejos tiempos.', siguiente: 'b1' },
      b1: { escena: 'oficinaColonia', efecto: { hora: 0.95 }, quien: 'rusk', texto: 'Ya la has oído. Hoy no te equivoques, 41-0877. Ni a propósito ni sin querer.' }
    }
  },

  directivas: {
    titulo: 'REGISTRO DE INTERNOS · INSPECCIÓN',
    textos: [
      'TRASLADOS y órdenes de la Cancillería: aprobar siempre.',
      'RACIONES: rechazar si la cuota de trabajo es menor de 65.',
      'PERMISOS: rechazar si la cuota es menor de 70.',
      'BARRACONES 7 y 9 en cuarentena: rechazar todo lo que venga de ellos.',
      'Sello vigente. Hoy: 05.02.2041.'
    ],
    listaGris: ['Nowak, Olek', 'Grau, Tobías', 'Haddad, Samira'],
    reglas: { fecha: '05.02.2041', indiceMinViaje: 70, indiceMinRacion: 65, reubicacionAprobar: true, distritosCerrados: ['Barracón 7', 'Barracón 9'] }
  },

  expedientes: [
    {
      id: 'olekPermiso', nombre: 'Olek Nowak', edad: 38, tipo: 'VIAJE', numero: 'CT-1-0934', distrito: 'Barracón 12',
      indice: 72, sello: '31.03.2041',
      motivo: 'Permiso de trabajo fuera del recinto: descarga de carbón en la estación de la colonia (jueves).',
      comentario: 'La estación. Los trenes de los jueves. Setenta y dos: se aprueba. Por una vez, lo correcto y lo útil coinciden.',
      retratoDe: 'olek',
      alAprobar: { bandera: 'olekEnEstacion' }
    },
    {
      id: 'observacion', nombre: 'Traslado · barracón de observación', edad: '—', tipo: 'REUBICACIÓN', numero: 'CT-1-OBS-02', distrito: 'Barracón 7',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'Traslado de 12 internos del barracón 7 (tifus) al barracón de observación.',
      nota: 'El barracón de observación no tiene estufa.',
      comentario: 'Observación. Nadie vuelve del barracón de observación. Doce nombres. La Inspectora respira detrás de mí.',
      comentarioSi: [{ si: 'tomasReubicado', texto: 'Doce nombres. El cuarto es Tomás Rey. Chispa. La Inspectora respira detrás de mí.' }],
      retrato: { emblema: true },
      alAprobar: { bandera: 'observacionAprobada' },
      alRechazar: { bandera: 'observacionRechazada' }
    },
    {
      id: 'samiraRacion', nombre: 'Samira Haddad', edad: 41, tipo: 'RACIÓN', numero: 'CT-1-1502', distrito: 'Barracón 9',
      indice: 88, sello: '30.04.2041',
      motivo: 'Ración doble para la enfermería. Pacientes a su cargo: 40.',
      comentario: 'Samira. Ochenta y ocho: se aprobaría. Pero hoy el barracón 9 está en cuarentena. Y cuarenta personas dependen de esa ración.',
      retratoDe: 'samira',
      alAprobar: { bandera: 'samiraAyudada' }
    },
    {
      id: 'ordenJulia', nombre: '[CLASIFICADO] · Interna 2033-114', edad: 60, tipo: 'REUBICACIÓN', numero: 'DS-H-0114', distrito: 'Ciudadela Helios',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'Traslado a la Ciudadela Helios, 12.02.2041. Custodia personal. Orden directa: Inspectora A. Hel.',
      comentario: 'La intocable. La que me preguntó mi nombre. Dentro de una semana, a Helios. La Inspectora me mira mientras la leo.',
      comentarioSi: [{ si: 'reconocioJulia', texto: 'Mi madre. Dentro de una semana, a Helios, con Hel. La Inspectora me mira mientras la leo. Sabe que lo sé.' }],
      retratoDe: 'julia',
      alAprobar: { bandera: 'trasladoJuliaAprobado' },
      alRechazar: { bandera: 'trasladoJuliaRechazado' },
      falsificar: { efecto: { bandera: 'trasladoJuliaFalsificado' }, aviso: 'La fecha dice ahora 12.03.2041. Un mes más. Con la Inspectora sentada detrás.' }
    },
    {
      id: 'kasia2', nombre: 'Kasia Wrona', edad: 29, tipo: 'RACIÓN', numero: 'CT-1-2211', distrito: 'Barracón 3',
      indice: 63, sello: '30.04.2041',
      motivo: 'Ración ordinaria. Cuota de trabajo: 63%. Ayer tenía 74.',
      comentario: 'Ayer setenta y cuatro. Hoy sesenta y tres. Y hoy la línea está en sesenta y cinco. Un invierno más aquí y todos acabaremos por debajo de alguna línea.',
      retrato: { piel: '#e6c4a8', pelo: '#8a6a40', estilo: 'largo', ropa: '#4a4a52' }
    }
  ],

  informe: {
    firma: 'rusk',
    titulo: 'INFORME DE JORNADA · REGISTRO DE LA COLONIA',
    salir: 'Volver al barracón ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Impecable, 41-0877. La Inspectora ha tomado notas. No sé si eso es bueno.' },
      { maxErrores: 2, texto: 'Errores delante de la Cancillería. Esta noche, media ración. Y reza para que sea solo eso.' },
      { maxErrores: 99, texto: 'La Inspectora ha visto cada error. Ha sonreído en cada uno. Nunca la había visto sonreír. Me da más miedo que tú.' }
    ],
    extras: [
      { si: 'trasladoJuliaRechazado', texto: '(Rusk:) Has devuelto una orden firmada por la Inspectora. Delante de ella. No sé si eres valiente o si quieres morirte.' },
      { si: 'trasladoJuliaFalsificado', texto: '(Rusk:) La orden de la 2033-114 lleva la fecha de marzo. Juraría que ponía febrero. Serán mis ojos.' },
      { si: 'observacionRechazada', texto: '(Rusk:) Y los doce del barracón 7 siguen en el 7. Por ahora.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'oficinaColonia', texto: '17:00. Rusk se ha ido. La Inspectora no. Se sienta en la silla del capataz y le hace un gesto para que no se levante.', siguiente: 's2' },
      s2: { quien: 'inspectora', texto: '¿Sabe quién firmó su traslado a esta colonia, Vogt? Yo. A esta, y no a otra de las cuarenta. ¿No se pregunta por qué?', siguiente: 's3' },
      s3: { quien: 'inspectora', texto: 'Hay una persona aquí que lleva siete años sin decir una sola palabra que me sirva. Quizá a usted se la diga.', siguiente: 's4' },
      s4: { rama: [{ si: 'trasladoJuliaFalsificado', ir: 's5f' }, { si: 'trasladoJuliaRechazado', ir: 's5r' }], siguiente: 's5' },
      s5f: { quien: 'inspectora', texto: 'Por cierto: bonita letra. «Marzo». Casi me lo creo. Dejaré la fecha como está, para que vea que yo también sé ser paciente.', siguiente: 's6' },
      s5r: { quien: 'inspectora', texto: 'Devolvió mi orden. Delante de mí. Hacía años que nadie me decía que no. Lo firmaré otra vez mañana. Y pasado. Tengo muchos sellos.', siguiente: 's6' },
      s5: { quien: 'inspectora', texto: 'El día doce se la llevo a Helios. Tiene una semana para despedirse de ella. O para averiguar por qué la quiero allí.', siguiente: 's6' },
      s6: { quien: 'elias', pensamiento: true, texto: 'No me ha dicho quién. No hace falta. Me ha dejado a solas con un fichero lleno de nombres y una semana. Es lo que hacía yo con los expedientes: dejar que se leyeran solos.' }
    }
  }
};

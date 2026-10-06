// ============================================================
//  NOCHE 4 — Los Documentos Semilla
//  Novedades en misiones:
//    solo: 'id'           -> solo ese operativo puede hacerla
//    fracasoEfecto: {...} -> efecto que se aplica si la misión falla
// ============================================================

window.NOCHE4 = {
  numero: 4,

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'refugioAnden', ir: 'n1a' }], siguiente: 'n1s' },
      n1a: { escena: 'anden', texto: 'Medianoche. El andén de Sol. Alguien ha colgado una sábana sobre el cartel de la estación, como si el nombre pudiera delatarlos.', siguiente: 'b0' },
      n1s: { escena: 'sotano', texto: 'Medianoche. El sótano de la Calle del Reloj. Arriba, Nico ronca sobre un catre, convencido de que nadie sabe quién es.', siguiente: 'b0' },

      // --- Ruth y su expediente del jueves ---
      b0: { rama: [{ si: 'ruthBuscada', ir: 'b1' }, { si: 'ruthProtegida', ir: 'b4' }], siguiente: 't0' },
      b1: { quien: 'ruth', texto: 'Mi cara está en la telepantalla del mercado, niño. Setenta y un años y por fin salgo en televisión.', efecto: { bandera: 'baja_ruth_4' }, siguiente: 'b2' },
      b2: { quien: 'elias', texto: 'Era una reubicación. Brandt estaba detrás. Yo...', siguiente: 'b3' },
      b3: { quien: 'ruth', texto: 'Ya lo sé. Sellaste para seguir sentado en esa silla, y esa silla nos hace falta. Pero esta noche no salgo. Y tú me debes una partida de mus.', siguiente: 't0' },
      b4: { quien: 'ruth', texto: 'Me han contado que mi reubicación volvió a tu mesa y salió sin sello. Con Brandt respirándote en la nuca.', siguiente: 'b5' },
      b5: { quien: 'ruth', texto: 'Eres un insensato, niño. Gracias.', efecto: { vinculo_ruth: 1 }, siguiente: 't0' },

      // --- «T. G.» ---
      t0: { rama: [{ si: 'relojeroRescatado', ir: 't1' }], siguiente: 't5' },
      t1: { quien: 'elias', texto: 'Tobías. Hoy he visto mi expediente. Mi cambio de apellido lo firmó «T. G.».', siguiente: 't2' },
      t2: { quien: 'relojero', texto: 'Sí.', siguiente: 't3' },
      t3: { quien: 'elias', texto: '¿Sí? ¿Solo eso?', siguiente: 't4' },
      t4: { quien: 'relojero', texto: 'Esta noche vais a por el Proyecto Semilla. Ahí está tu nombre. Léelo primero. Después pregúntame lo que quieras.', siguiente: 'a0' },
      t5: { quien: 'elias', texto: 'Mi cambio de apellido lo firmó alguien con las iniciales «T. G.».', siguiente: 't6' },
      t6: { quien: 'ruth', texto: '...Tobías Grau. No me mires así, niño. Esta noche vais a por el Proyecto Semilla. Ahí dentro está todo.', siguiente: 'a0' },

      // --- Aurora ---
      a0: { rama: [{ si: ['traidorDentro_aurora', 'vioInformeAurora'], ir: 'a1' }], siguiente: 'q1' },
      a1: { texto: 'Aurora está sentada aparte, limpiando unas ganzúas electrónicas. Levanta la vista cuando Elías se acerca. Sonríe.', siguiente: 'a2' },
      a2: { quien: 'aurora', texto: '¿Qué pasa, archivero? Pareces un expediente con malas noticias.', siguiente: 'a3' },
      a3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: 'Contárselo a Mara y echarla ahora mismo.', ir: 'a4a', efecto: { bandera: ['fuera_aurora', 'auroraExpulsada'] } },
          { texto: 'Callar. Y dejar que «oiga» que vamos al Archivo del Distrito 11.', ir: 'a4b', efecto: { bandera: 'auroraEngañada' } },
          { texto: 'No decir nada todavía.', ir: 'a4c', efecto: { bandera: 'auroraIgnorada' } }
        ]
      },
      a4a: { quien: 'mara', texto: 'Fuera. Ahora. Y si vuelvo a verte cerca de Sol, no habrá tercera advertencia porque no habrá segunda.', siguiente: 'a5a' },
      a5a: { texto: 'Aurora se va sin discutir. En la escalera se gira un momento. Ya no sonríe.', siguiente: 'q1' },
      a4b: { texto: 'Mara lo entiende sin palabras. Diez minutos después, en voz demasiado alta, alguien comenta que el golpe de esta noche será en el Archivo del Distrito 11. Aurora sale «a tomar el aire».', siguiente: 'q1' },
      a4c: { quien: 'elias', pensamiento: true, texto: 'Quizá me equivoco. Quizá el informe era falso. Quizá. Quizá.', siguiente: 'q1' },

      // --- Quién entra en el Archivo ---
      q1: { quien: 'mara', texto: 'El Proyecto Semilla se quema el domingo. O lo sacamos esta noche o no lo saca nadie. La pregunta es quién entra.', siguiente: 'q2' },
      q2: { quien: 'mara', texto: 'Es tu nombre el que está ahí dentro, Elías. Elige tú.', siguiente: 'q3' },
      q3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: 'Chispa, entrando por la red de ODÍN.', ir: 'q4c', si: ['tomasSalvado', '!capturado_tomas'], efecto: { bandera: 'vaChispa' } },
          { texto: 'Irene, con papeles de limpiadora.', ir: 'q4i', si: ['recluta_irene', '!capturado_irene', '!ireneBuscada'], efecto: { bandera: 'vaIrene' } },
          { texto: 'Ruth. Nadie sospecha de una anciana.', ir: 'q4r', si: ['!ruthBuscada', '!fuera_ruth'], efecto: { bandera: 'vaRuth' } },
          { texto: 'Yo mismo. Tengo pase del Ministerio.', ir: 'q4e', si: 'sospecha<30', efecto: { bandera: 'vaElias' } },
          { texto: 'Nadie. No voy a arriesgar a nadie por un apellido.', ir: 'q4n', efecto: { bandera: 'nadieVa' } }
        ]
      },
      q4c: { quien: 'tomas', texto: 'Hecho. Si ODÍN me ve, al menos que me vea guapo.', siguiente: 'q9' },
      q4i: { quien: 'irene', texto: 'Limpiadora. He sido cosas peores. He sido poeta.', siguiente: 'q9' },
      q4r: { quien: 'ruth', texto: 'Por fin alguien en esta ciudad que respeta a sus mayores. Dame el abrigo feo, niño.', siguiente: 'q9' },
      q4e: { quien: 'mara', texto: '...Vale. Pero vuelves. Es una orden.', siguiente: 'q9' },
      q4n: { quien: 'mara', texto: 'Lo respeto. Nadie te lo va a reprochar aquí abajo. Nadie.', siguiente: 'q9' },
      q9: { quien: 'mara', texto: 'Lo demás, como siempre: elegid bien. Tres noches, Elías. Tres.' }
    }
  },

  // ---------------- ASPIRANTES ----------------
  aspirantes: [
    {
      id: 'mateo', si: '!mateoViaja', nombre: 'Mateo Ruiz', papel: 'Ferroviario jubilado',
      dice: 'Mi hija murió el martes. Yo estaba aquí, con un permiso denegado en la mano. Ya no tengo a nadie a quien proteger. Úsenme.',
      habilidades: { labia: 1, fuerza: 1 },
      traidor: false,
      memo: 'mateo',
      comparacion: 'Recuerdas su primer expediente: la hija enferma, el Índice 41. Todo es verdad. Tú denegaste ese permiso.',
      informe: 'Ruth: «Su hija murió en el Hospital del Distrito Sur el martes. Es verdad. Y no hay nada más peligroso que un hombre al que ya no le queda nada.»'
    },
    {
      id: 'rosa', si: ['rosaRechazada', 'almacenAsaltado'], nombre: 'Rosa Ibarra', papel: 'Madre del Distrito 9',
      dice: 'Me negaron la ración del Distrito 9 el martes. Mi hija come gracias a las cajas del almacén que alguien repartió. Sé quién fue. Quiero ayudar.',
      habilidades: { sigilo: 1, labia: 1 },
      traidor: false,
      memo: 'rosa',
      comparacion: 'Su expediente del martes: Distrito 9, una hija de cuatro años, ración denegada. Coincide.',
      informe: 'Ruth: «Viuda. Una hija. Vive en el Distrito 9 desde antes de que se llamara Distrito 9. Limpia.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'semillaChispa', si: 'vaChispa', solo: 'tomas',
      titulo: 'Proyecto Semilla · por la red',
      desc: 'Chispa entra en el sistema del Archivo Central a través de ODÍN y abre la sala 14 desde dentro.',
      habilidad: 'tecnica', base: 5,
      bonus: [{ si: 'odinPinchado', mas: 25 }, { si: 'reconArchivo', mas: 10 }, { si: 'auroraIgnorada', mas: -35 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'semillaConseguida', intel: 2 },
      captura: 0.7,
      exito: 'Las puertas de la sala 14 se abren solas a las 03:01. Chispa sale con una caja de cartón y una sonrisa de oreja a oreja.',
      fracaso: 'ODÍN detecta la intrusión en el minuto dos. Chispa corta la conexión y huye sin nada.',
      capturado: 'Era una emboscada. La Guardia Negra estaba dentro de la sala 14 esperando. Alguien les había avisado.'
    },
    {
      id: 'semillaIrene', si: 'vaIrene', solo: 'irene',
      titulo: 'Proyecto Semilla · la limpiadora',
      desc: 'Irene entra en el turno de limpieza de las 02:00 con papeles falsos y un carrito con doble fondo.',
      habilidad: 'labia', base: 25,
      bonus: [{ si: 'reconArchivo', mas: 25 }, { si: 'sabeFalsificar', mas: 10 }, { si: 'auroraIgnorada', mas: -35 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'semillaConseguida', intel: 2 },
      captura: 0.6,
      exito: 'Irene sale a las 04:00 empujando el carrito. Debajo de las bolsas de basura hay una caja entera del Proyecto Semilla.',
      fracaso: 'La jefa de turno no la conoce y no le gustan las caras nuevas. Irene tiene que irse sin tocar la sala 14.',
      capturado: 'Un guardia reconoce la cara de las telepantallas. «Poeta», dice. Y sonríe.'
    },
    {
      id: 'semillaRuth', si: 'vaRuth', solo: 'ruth',
      titulo: 'Proyecto Semilla · la anciana',
      desc: 'Ruth entra como «viuda que busca el certificado de defunción de su marido». Nadie registra a una anciana que llora.',
      habilidad: 'labia', base: 35,
      bonus: [{ si: 'reconArchivo', mas: 25 }, { si: 'auroraIgnorada', mas: -35 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'semillaConseguida', intel: 2 },
      fracasoEfecto: { bandera: ['semillaConseguida', 'ruthCaida', 'fuera_ruth'] },
      captura: 0,
      exito: 'Ruth vuelve al amanecer, con los ojos rojos de «llorar» y la caja escondida bajo el abrigo feo. «Cuarenta años de práctica», dice.',
      fracaso: 'Ruth no vuelve. Al amanecer, en el buzón de la vieja relojería, aparece una caja del Proyecto Semilla envuelta en su abrigo feo. Dentro, una nota: «Para el niño que miraba».'
    },
    {
      id: 'semillaElias', si: 'vaElias', solo: 'elias',
      titulo: 'Proyecto Semilla · el archivero',
      desc: 'Elías entra con su pase del Ministerio y pide la caja «para una revisión urgente de la Sección 14».',
      habilidad: 'labia', base: 40,
      bonus: [{ si: 'reconArchivo', mas: 20 }, { si: 'auroraIgnorada', mas: -35 }],
      coste: {},
      recompensa: { bandera: 'semillaConseguida', intel: 2 },
      fracasoEfecto: { bandera: ['semillaConseguida', 'brandtLoSabe'], sospecha: 40 },
      captura: 0,
      exito: 'El guardia bosteza, firma el recibí y le entrega la caja sin mirarle a la cara. Nadie mira las caras.',
      fracaso: 'Elías sale con la caja. Pero el guardia de la puerta ha apuntado su número de pase. Y mañana ese papel llegará a la mesa de Brandt.'
    },
    {
      id: 'fichaRuth', si: ['sabeFalsificar', '!fuera_ruth', '!ruthBuscada'],
      titulo: 'Limpiar tu ficha',
      desc: 'Ruth «corrige» el historial de Elías en la copia de la Dirección de Seguridad. Hace falta información para saber qué borrar.',
      habilidad: 'tecnica', base: 40,
      coste: { intel: 2 },
      recompensa: { sospecha: -20, bandera: 'fichaLimpia' },
      captura: 0.2,
      exito: 'Tres infracciones desaparecen del historial de Elías. En su lugar, una mención por «celo en el servicio».',
      fracaso: 'La copia está en una caja fuerte nueva. Ruth no puede ni verla.',
      capturado: 'La copia estaba marcada. Alguien esperaba que alguien la tocara.'
    },
    {
      id: 'fichaHans', si: ['hansRescatado', '!capturado_hans'],
      titulo: 'La memoria de Hans',
      desc: 'Hans recuerda los códigos de corrección de la Sección 14. Con ellos, un expediente puede «extraviarse».',
      habilidad: 'tecnica', base: 45,
      coste: { intel: 2 },
      recompensa: { sospecha: -20, bandera: 'fichaLimpia' },
      captura: 0.3,
      exito: 'El historial de Elías Vogt se «extravía» durante un traslado de archivos. Brandt tendrá que empezar de cero.',
      fracaso: 'Han cambiado los códigos. Hans se queda mirando el papel, como si le hubieran robado algo.',
      capturado: 'Hans usa un código antiguo. Demasiado antiguo: era el suyo.'
    },
    {
      id: 'armas',
      titulo: 'Armas para el domingo',
      desc: 'Un contacto de la Guardia de la central Helios vende fusiles viejos a cambio de raciones.',
      habilidad: 'fuerza', base: 45,
      coste: { suministros: 2 },
      recompensa: { bandera: 'armas', red: 1 },
      captura: 0.4,
      exito: 'Doce fusiles de 2029 envueltos en lona. Viejos, pero disparan. El domingo, eso es suficiente.',
      fracaso: 'El contacto no se presenta. Mejor eso que presentarse con compañía.',
      capturado: 'El contacto sí se presenta. Con compañía.'
    },
    {
      id: 'celulas',
      titulo: 'Las células del sur',
      desc: 'Convencer a las tres células de los distritos del sur de que se unan el domingo.',
      habilidad: 'labia', base: 40,
      coste: { intel: 1 },
      recompensa: { red: 3, bandera: 'celulasSur' },
      captura: 0.3,
      exito: 'Las tres células dicen que sí. Una de ellas tiene cuarenta personas. Cuarenta.',
      fracaso: 'No se fían. Después de tantas redadas, nadie se fía de nadie.',
      capturado: 'Una de las tres células ya no existía. Quien acudió a la cita no era de la resistencia.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'd0',
    nodos: {
      d0: { rama: [{ si: 'semillaConseguida', ir: 's1' }], siguiente: 'f0' },

      // --- La revelación ---
      s1: { texto: 'La caja del Proyecto Semilla está sobre la mesa. Cientos de fichas. Cientos de niños sin apellido.', siguiente: 's2' },
      s2: { rama: [{ si: ['hansRescatado', '!capturado_hans'], ir: 's3h' }], siguiente: 's3' },
      s3h: { quien: 'hans', texto: 'Hogar número 4, ingreso de febrero de 2008. Déjame a mí. Once años ordenando fichas. Aquí.', siguiente: 's4' },
      s3: { texto: 'Elías tarda casi una hora en encontrarla. Hogar número 4. Ingreso: febrero de 2008.', siguiente: 's4' },
      s4: { texto: '«Interno 2008-117. Hallado en la puerta del Colegio de San Ildefonso con una nota: SE LLAMA ELÍAS. Encontrado por: Tobías Grau, conserje.»', siguiente: 's5' },
      s5: { texto: '«Cruce de linaje, Proyecto Semilla, 2032. Madre: JULIA ARANDA. Locutora de la emisora ilegal "La Voz de Madrid". Categoría: disidente de primer grado. Hijo: eliminar de la Lista Blanca.»', siguiente: 's6' },
      s6: { texto: 'Debajo, a mano, con otra tinta: «Reasignado como VOGT. Linaje: desconocido. — T. G.»', siguiente: 's7' },
      s7: { quien: 'elias', pensamiento: true, texto: 'La Voz de Madrid. «¿Recuerdas Madrid?» La contraseña. La frase que me trajo aquí la primera noche. Era de mi madre.', siguiente: 's8' },
      s8: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: 'Decirlo en voz alta: «Elías Aranda.»', ir: 's9a', efecto: { bandera: ['nombreReal', 'nombreDicho'] } },
          { texto: 'Doblar la ficha y guardarla sin decir nada.', ir: 's9b', efecto: { bandera: ['nombreReal', 'nombreGuardado'] } }
        ]
      },
      s9a: { texto: 'Es la primera vez que alguien pronuncia ese nombre en treinta y dos años. Suena raro. Suena a él.', siguiente: 's10' },
      s9b: { texto: 'Elías guarda la ficha en el bolsillo interior del abrigo, junto al corazón. Un nombre es algo que se lleva encima.', siguiente: 's10' },
      s10: { si: 'ruthCaida', quien: 'elias', pensamiento: true, texto: '«Para el niño que miraba.» Ruth me ha dado mi nombre. Y se ha quedado sin el suyo.', siguiente: 'f0' },

      // --- La última hora ---
      f0: {
        texto: 'Queda una hora antes del amanecer que no llega.',
        opciones: [
          { texto: 'Hablar con el Relojero.', ir: 'r0', si: 'relojeroRescatado' },
          { texto: 'Sentarse con Mara.', ir: 'm0' },
          { texto: 'Buscar a Chispa.', ir: 'c1', si: ['tomasSalvado', '!capturado_tomas'] },
          { texto: 'Acompañar a Ruth.', ir: 'x0', si: '!fuera_ruth' },
          { texto: 'Irse a casa.', ir: 'z1' }
        ]
      },

      // --- El Relojero: la tercera capa ---
      r0: { rama: [{ si: 'nombreReal', ir: 'r1' }], siguiente: 'r9' },
      r1: { quien: 'relojero', texto: 'Ya lo has leído.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Te encontré en la puerta del colegio, en febrero de 2008. Llovía. Llevabas un papel en el bolsillo: «Se llama Elías». No llorabas. Mirabas.', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'En 2032 la Orden cruzó los registros. Tu madre ya era la Voz de Madrid. Si te encontraban, te borraban. Así que te borré yo primero. Te hice nadie para que siguieras vivo.', siguiente: 'r4' },
      r4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Gracias.»', ir: 'r5a', efecto: { bandera: 'perdonaRelojero' } },
          { texto: '«Me robaste mi nombre.»', ir: 'r5b', efecto: { bandera: 'rencorRelojero' } }
        ]
      },
      r5a: { quien: 'relojero', texto: 'No me des las gracias todavía. No sabes lo que queda.', siguiente: 'r6' },
      r5b: { quien: 'relojero', texto: 'Sí. Las dos cosas son verdad: te lo robé y te salvé. Casi todo lo que he hecho en la vida ha sido las dos cosas a la vez.', siguiente: 'r6' },
      r6: { quien: 'elias', texto: '¿Y mi madre?', siguiente: 'r7' },
      r7: { quien: 'relojero', texto: 'Colonia Este-1. Eso fue lo último que supe, en 2033. Después, nada. El domingo hay una cosa más que tienes que saber. La última. Y es la peor.', efecto: { bandera: 'relojeroConfeso' }, siguiente: 'z1' },
      r9: { quien: 'relojero', texto: 'Sin la ficha no te lo voy a contar, Elías. No porque no quiera. Porque no me creerías. Y el domingo necesito que me creas.', siguiente: 'z1' },

      // --- Mara ---
      m0: { rama: [{ si: 'maraMano', ir: 'm1' }], siguiente: 'n1' },
      m1: { texto: 'Mara está despierta, sentada en la escalera, lejos de la luz. Cuando Elías se sienta, ella apoya la cabeza en su hombro. Como si fuera lo más normal del mundo.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Pase lo que pase el domingo, quiero que sepas una cosa.', siguiente: 'm3' },
      m3: { quien: 'mara', texto: '...No. Te la digo el lunes. Así tenemos que llegar los dos al lunes.', efecto: { vinculo_mara: 1, bandera: 'promesaLunes' }, siguiente: 'm4' },
      m4: { si: 'nombreDicho', quien: 'mara', texto: 'Aranda. Me gusta. Te queda mejor que Vogt. Todo te queda mejor que Vogt.', siguiente: 'z1' },
      n1: { texto: 'Mara revisa por tercera vez los mapas de La Aguja. Le pasa uno a Elías sin mirarle.', siguiente: 'n2' },
      n2: { quien: 'mara', texto: 'Si me pasa algo el domingo, que alguien diga mi nombre en voz alta. Mi nombre de verdad, no el de los papeles. Tú. Tú que los recuerdas todos.', siguiente: 'n3' },
      n3: { quien: 'mara', texto: 'Mara Solís Ortega. Nacida en Lavapiés. Ya lo tienes.', efecto: { vinculo_mara: 1, bandera: 'nombreMara' }, siguiente: 'z1' },

      // --- Chispa ---
      c1: { quien: 'tomas', texto: 'Oye, hermano. ¿Tú crees que después de esto habrá conciertos? Conciertos de verdad, con luces. Nunca he visto uno.', siguiente: 'c2' },
      c2: { si: 'nombreReal', quien: 'tomas', texto: 'Por cierto: «Aranda». Suena a pueblo con río y con fiestas. Te pega más que Vogt, que suena a estornudo.', siguiente: 'c3' },
      c3: { quien: 'elias', texto: 'Habrá conciertos. Te lo prometo.', efecto: { vinculo_tomas: 1, bandera: 'promesaConcierto' }, siguiente: 'z1' },

      // --- Ruth ---
      x0: { rama: [{ si: 'nombreReal', ir: 'x1' }], siguiente: 'x5' },
      x1: { quien: 'ruth', texto: 'Julia Aranda.', siguiente: 'x2' },
      x2: { quien: 'ruth', texto: 'Yo imprimía sus octavillas, niño. En 2031. «¿Recuerdas Madrid?» Lo escribió ella, en una servilleta, en un bar de la calle Toledo. Yo solo le puse tinta.', siguiente: 'x3' },
      x3: { quien: 'ruth', texto: 'Tenía tus ojos. No la cara: los ojos. Esa manía de mirar a la gente como si fuera a desaparecer.', efecto: { vinculo_ruth: 2, bandera: 'ruthConocioMadre' }, siguiente: 'x4' },
      x4: { quien: 'elias', pensamiento: true, texto: 'Llevo treinta y cuatro años mirando caras para que no desaparezcan. Ahora sé de quién lo aprendí.', siguiente: 'z1' },
      x5: { quien: 'ruth', texto: 'Mañana, si hay mañana, te enseño a hacer un sello de goma con una patata. Lo usábamos en otra guerra. Funciona mejor de lo que crees.', efecto: { vinculo_ruth: 1 }, siguiente: 'z1' },

      // --- Final ---
      z1: { rama: [{ si: 'nombreReal', ir: 'z1n' }], siguiente: 'z1g' },
      z1n: { escena: 'calle', texto: 'De vuelta a casa. Por primera vez en años, Elías no cuenta los drones. Cuenta las letras de un nombre. Seis. A-R-A-N-D-A.', siguiente: 'z2' },
      z1g: { escena: 'calle', texto: 'De vuelta a casa, pegado a las paredes. En algún sótano del Archivo Central, una caja con su nombre espera al domingo para arder.', siguiente: 'z2' },
      z2: { escena: 'titulo', texto: 'Quedan tres noches para el Día del Sol.' }
    }
  }
};

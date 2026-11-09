// ============================================================
//  ACTO 2 · PRÓLOGO A · NOCHE 2 — «Hacia el Este»
//  La mitad de la verdad: Julia sabe cómo funciona Helios. Elías decide ir al Este
//  con Mara y el Relojero (o Ruth, con el cuaderno del Relojero, si él murió).
//  Banderas nuevas: guiaRelojero / guiaRuth / guiaCuaderno, relojeroEsposado, radioChispa.
// ============================================================

window.NOCHE_A2 = {
  numero: 2,
  subtitulo: 'Apagón',
  escenaLlegada: 'madridOscura',
  sinOperativos: ['relojero'],

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'vossEjecucion', ir: 'n1e' }, { si: 'leyMantenida', ir: 'n1l' }], siguiente: 'n1a' },
      n1e: { texto: 'Medianoche. La sentencia se cumplirá el lunes. Esta noche, por primera vez desde el Día del Sol, hay gente bailando alrededor de las hogueras. Elías no sabe si eso es bueno.', siguiente: 'n2' },
      n1l: { texto: 'Medianoche. Alguien ha tirado una piedra contra la ventana de la relojería. Envuelta en un papel: «TRAIDOR». Mara la guarda en un cajón, con las otras.', siguiente: 'n2' },
      n1a: { texto: 'Medianoche. La votación sigue pendiente. La ciudad también: a oscuras, a medio decidir.', siguiente: 'n2' },
      n2: { rama: [{ si: 'refugioAnden', ir: 'n3a' }], siguiente: 'n3s' },
      n3a: { escena: 'anden', texto: 'El andén de Sol. Hoy nadie duerme.', siguiente: 'j0' },
      n3s: { escena: 'sotano', texto: 'El sótano de la relojería. Hoy nadie duerme.', siguiente: 'j0' },

      // --- La mitad de la verdad ---
      j0: { rama: [{ si: 'juliaEnMadrid', ir: 'j1' }, { si: 'relojeroPreso', ir: 't1' }, { si: 'ruthViva', ir: 'u1' }], siguiente: 'w1' },

      j1: { quien: 'julia', texto: 'Hay algo que no os he contado. Por qué la Orden me tuvo viva siete años en un sitio del que no vuelve nadie.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Yo sé cómo funciona Helios por dentro. Trabajé en él antes de que se llamara así. Antes de que existiera la Orden.', siguiente: 'j3' },
      j3: { quien: 'mara', texto: '¿Antes de 2029?', siguiente: 'j4' },
      j4: { quien: 'julia', texto: 'Mucho antes. Hay una forma de devolverle la luz a Madrid sin pedirle nada a la Orden. Pero hay que ir allí. A la Ciudadela.', siguiente: 'j5' },
      j5: { quien: 'julia', texto: 'Y antes, a la Colonia Este-1. Allí quedaron dos personas que construyeron la red conmigo. Sin ellas no hay nada que hacer. No me preguntéis más esta noche.', efecto: { bandera: ['sabeHelios', 'juliaPorOtroCamino'] }, siguiente: 'j6' },
      j6: { quien: 'elias', pensamiento: true, texto: '«Antes de que existiera la Orden.» Yo nací antes de que existiera la Orden. Y me dejaron en una puerta.', siguiente: 'g0' },

      t1: { texto: 'A la una de la madrugada llega un guardia de la cárcel del Distrito 1. El preso Grau pide hablar con el archivero. Dice que es sobre Helios.', siguiente: 't2' },
      t2: { escena: 'celda', quien: 'relojero', texto: 'Tu madre sabe cómo funciona Helios, Elías. Es la única persona fuera de la Orden que lo sabe. Por eso la mantuvieron viva.', siguiente: 't3' },
      t3: { quien: 'relojero', texto: 'Si quieres luz para esta ciudad, tienes que ir a buscarla a la Colonia Este-1. Y tendrás que llevarme contigo: yo conozco los códigos de las colonias. Los aprendí para venderla. Ahora te los doy para sacarla.', siguiente: 't4' },
      t4: { rama: [{ si: 'mensajeJulia', ir: 't5' }], siguiente: 't6' },
      t5: { quien: 'elias', texto: 'Me ha mandado decir que no vaya.', siguiente: 't5b' },
      t5b: { quien: 'relojero', texto: 'Claro. Es tu madre. Yo tampoco quería que vinieras a la Calle del Reloj. Y te dejé una nota en el abrigo.', siguiente: 't6' },
      t6: { quien: 'elias', pensamiento: true, texto: 'Me dejó una nota en el abrigo. «Calle del Reloj, 7. Medianoche. Quema esto.» Fue él. Siempre fue él.', efecto: { bandera: 'sabeHelios' }, siguiente: 'g0' },

      u1: { quien: 'ruth', texto: 'Tobías me dejó esto antes del Día del Sol. «Por si no vuelvo», dijo. Y no volvió.', siguiente: 'u2' },
      u2: { texto: 'Un cuaderno de tapas negras, lleno de números, horarios de trenes y nombres de colonias. En la primera página, con letra pequeña: «Julia sabe cómo funciona Helios. Por eso sigue viva. Este-1, barracón 12».', siguiente: 'u3' },
      u3: { quien: 'ruth', texto: 'Yo me sé de memoria la mitad de lo que pone. La otra mitad la entiendo. Así que me voy contigo, niño. No discutas con una vieja.', efecto: { bandera: 'sabeHelios' }, siguiente: 'g0' },

      w1: { texto: 'Nadie trae respuestas esta noche. Solo el cuaderno negro del Relojero, que apareció en el buzón de la relojería el día de su entierro: «Julia sabe cómo funciona Helios. Este-1, barracón 12».', efecto: { bandera: ['sabeHelios', 'guiaCuaderno'] }, siguiente: 'g1' },

      // --- Quién va y quién se queda ---
      g0: { rama: [{ si: 'relojeroPreso', ir: 'g0r' }, { si: 'ruthViva', ir: 'g0u' }], siguiente: 'g1' },
      g0r: { efecto: { bandera: 'guiaRelojero' }, rama: [], siguiente: 'g1' },
      g0u: { efecto: { bandera: 'guiaRuth' }, rama: [], siguiente: 'g1' },
      g1: { quien: 'mara', texto: 'Entonces está decidido. Yo voy contigo. No me lo discutas tú tampoco: en esta ciudad ya no queda nadie que sepa cerrar una herida con lo que haya.', siguiente: 'g2' },
      g2: { quien: 'anselmo', texto: 'Yo me quedo al frente del Comité. Un maestro jubilado gobernando una ciudad a oscuras. Si mis alumnos me vieran...', siguiente: 'g3' },
      g3: { rama: [{ si: 'chispaVivo', ir: 'g4c' }], siguiente: 'g5' },
      g4c: { quien: 'tomas', texto: '¿Y yo? ¿Me quedo aquí con los generadores mientras vosotros os vais de excursión a la Ciudadela del mal?', siguiente: 'g4d' },
      g4d: { quien: 'mara', texto: 'Tú eres la radio. Cada noche, a las doce, en la frecuencia de la Voz. Si no te oímos, no sabremos si Madrid sigue en pie.', siguiente: 'g4e' },
      g4e: { quien: 'tomas', texto: '...Vale. Pero traedme una pieza de Helios. Un tornillo. Lo que sea.', efecto: { bandera: 'radioChispa' }, siguiente: 'g5' },
      g5: { rama: [{ si: 'guiaRelojero', ir: 'g6r' }], siguiente: 'x1' },
      g6r: { quien: 'mara', texto: 'Y el Relojero viene con nosotros. Bajo custodia. ¿Cómo lo llevamos, Elías?', siguiente: 'g7r' },
      g7r: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Esposado. Hasta que se gane lo contrario.»', ir: 'g8a', efecto: { bandera: 'relojeroEsposado', principios: 2 } },
          { texto: '«Sin esposas. Ya no tiene adónde huir.»', ir: 'g8b', efecto: { bandera: 'relojeroSinEsposas' } }
        ]
      },
      g8a: { quien: 'relojero', texto: 'Es justo. Siempre fuiste justo. Hasta de niño repartías las galletas en partes iguales, aunque te tocara la más pequeña.', siguiente: 'x1' },
      g8b: { quien: 'relojero', texto: '...Gracias. No volveré a darte motivos. Eso sí que no te lo puedo prometer, pero lo intentaré.', siguiente: 'x1' },

      x1: { quien: 'mara', texto: 'Los Ferroviarios de Kurt tienen una locomotora. Sale al amanecer hacia el Este, si esta noche lo preparamos todo. Última noche en Madrid. Hagámoslo bien.' }
    }
  },

  aspirantes: [],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'salvoconductos',
      titulo: 'Papeles para la frontera',
      desc: 'Falsificar salvoconductos de la Orden para cruzar la frontera del Este: tres pasajeros, una locomotora y una carga de «repuestos».',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'ruthViva', mas: 20 }, { si: 'sabeFalsificar', mas: 15 }, { si: 'auroraUsada', mas: 15 }, { si: 'ramon_usar', mas: 10 }],
      coste: { intel: 1 },
      recompensa: { bandera: 'salvoconductos' },
      captura: 0.2,
      exito: 'Tres salvoconductos con el sello de la Dirección de Seguridad. La tinta todavía huele. «Mejores que los de verdad», dice quien los ha hecho.',
      fracaso: 'Los sellos de la frontera han cambiado este mes. Tendréis que improvisar en el puesto.',
      capturado: 'Alguien estaba esperando a que intentáramos falsificar esos sellos.'
    },
    {
      id: 'locomotora',
      titulo: 'Una locomotora al Este',
      desc: 'Preparar con los Ferroviarios de Kurt una locomotora de carbón, sin rastro en los registros de ODÍN.',
      habilidad: 'fuerza', base: 35,
      bonus: [{ si: 'celulaFerroviarios', mas: 30 }, { si: 'celulasUltima', mas: 10 }, { si: 'wrenUsado', mas: 15 }],
      coste: { suministros: 2 },
      recompensa: { bandera: 'trenListo' },
      captura: 0.2,
      exito: 'A las cinco de la mañana, en la cochera 4, hay una locomotora de 2019 con la caldera encendida y un vagón de carbón. Kurt la acaricia como a un caballo.',
      fracaso: 'La caldera tiene una grieta. Kurt dice que aguantará. Kurt dice eso de todo.',
      capturado: 'Los saboteadores de Hel también saben dónde están las cocheras.'
    },
    {
      id: 'ciudadEstable',
      titulo: 'Dejar la ciudad en pie',
      desc: 'Reunir a los representantes de los barrios y conseguir que el Comité aguante sin ti una semana.',
      habilidad: 'labia', base: 35,
      bonus: [{ si: 'hospitalEncendido', mas: 15 }, { si: 'saboteadoresCaidos', mas: 15 }, { si: 'celulaAnselmo', mas: 15 }, { si: 'leyMantenida', mas: -10 }],
      coste: {},
      recompensa: { ira: -10, bandera: 'ciudadEstable' },
      captura: 0.1,
      exito: 'Los barrios dan su palabra. «Una semana», dicen. «Y si vuelves con la luz, dos.»',
      fracaso: 'Cada barrio quiere algo distinto. Anselmo tendrá que apañárselas.',
      capturado: 'En la reunión había alguien que no representaba a ningún barrio.'
    },
    {
      id: 'topo',
      titulo: 'Quién habla con Hel',
      desc: 'Alguien del Comité le cuenta a Hel lo que pasa en Madrid. Encontrarlo antes de irse.',
      habilidad: 'sigilo', base: 25,
      bonus: [{ si: 'odin_pieter', mas: 30 }, { si: 'pieterUsado', mas: 20 }, { si: 'senalHel', mas: 15 }, { si: 'traidorDentro_nicoR', mas: -15 }],
      coste: { intel: 1 },
      recompensa: { bandera: 'topoDescubierto', ira: -5 },
      captura: 0.25,
      exito: 'Es el secretario de actas del Comité. Lleva tres meses copiando cada sesión para la Ciudadela. Hel sabe todo lo que se ha votado. Y que os vais.',
      fracaso: 'El topo sigue dentro. Y Hel sabrá mañana que el archivero se ha ido de Madrid.',
      capturado: 'El topo era más listo que {op}.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro y media. El tren sale al amanecer. Última hora en Madrid.',
        opciones: [
          { texto: 'Con Mara.', ir: 'm1' },
          { texto: 'Con Julia.', ir: 'j1', si: 'juliaEnMadrid' },
          { texto: 'Con Chispa, en la radio.', ir: 'c1', si: 'chispaVivo' },
          { texto: 'Con Ruth.', ir: 'x1', si: 'ruthViva' },
          { texto: 'Con el Relojero, en el vagón.', ir: 'r1', si: 'guiaRelojero' },
          { texto: 'Solo, en la Puerta del Sol.', ir: 's1' }
        ]
      },

      m1: { quien: 'mara', texto: 'La última vez que salimos de noche a hacer algo imposible, era para detener a un hombre. Ahora es para encender una ciudad. Voy mejorando.', siguiente: 'm2' },
      m2: { rama: [{ si: 'beso', ir: 'm3b' }], siguiente: 'm3' },
      m3b: { texto: 'Se quedan un rato con las frentes juntas, sin hablar. Fuera se oye la caldera de la locomotora, como un corazón muy grande.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },
      m3: { quien: 'mara', texto: 'Si en la frontera algo sale mal, sigues. Sin mirar atrás. Como me dijiste tú a mí el Día del Sol. ¿O te lo dije yo a ti? Ya no me acuerdo.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },

      j1: { quien: 'julia', texto: 'Yo me quedo. Si voy contigo, todo el mundo sabrá adónde vas. La Voz de Madrid no pasa desapercibida en un tren.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Iré después, por otro camino. Nos veremos en la colonia. Te lo prometo. Es la segunda promesa que te hago en la vida. La primera fue una nota en un bolsillo.', efecto: { vinculo_julia: 1, bandera: 'promesaJulia' }, siguiente: 'z1' },

      c1: { quien: 'tomas', texto: 'Frecuencia de la Voz, cada noche a las doce. Si no contestas en dos noches seguidas, voy a buscarte. Con generador y todo.', siguiente: 'c2' },
      c2: { quien: 'tomas', texto: 'Y oye... cuando vuelva la luz, el primer concierto lo dedico a los que no llegaron. Tú dirás los nombres. Tú te los sabes.', efecto: { vinculo_tomas: 1 }, siguiente: 'z1' },

      x1: { quien: 'ruth', texto: 'Toma. Doce uvas pasas. Por si en Nochevieja estás en un tren. Siempre se está en algún tren en Nochevieja.', siguiente: 'x2' },
      x2: { quien: 'ruth', texto: 'Y vuelve, niño. Setenta y dos años no son para despedir a nadie más.', efecto: { vinculo_ruth: 1 }, siguiente: 'z1' },

      r1: { texto: 'El Relojero está sentado en el vagón de carga, sobre un saco de carbón, mirando la ciudad a oscuras por la rendija.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'La última vez que salí de Madrid en tren fue en 2033. Para ir a venderla. Ahora voy a buscarla. Si hay un dios, tiene sentido del humor.', siguiente: 'r3' },
      r3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Ayúdame a sacarla y hablaremos de perdón.»', ir: 'r4a', efecto: { bandera: 'tratoRelojero' } },
          { texto: 'No decir nada. Sentarse a su lado.', ir: 'r4b' }
        ]
      },
      r4a: { quien: 'relojero', texto: 'No quiero que me perdones. Quiero que ella salga. Lo otro, si llega, que llegue solo.', siguiente: 'z1' },
      r4b: { texto: 'Se quedan así, el hombre que lo escondió y el niño que escondió, mirando cómo Madrid no se enciende.', siguiente: 'z1' },

      s1: { escena: 'madridOscura', texto: 'La Puerta del Sol, a oscuras. El reloj de la Casa de Correos lleva nueve años parado. Alguien le ha colgado un cartel a mano: «¿RECUERDAS MADRID?».', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: 'Recuerdo el sol. Y voy a buscarlo.', siguiente: 'z1' },

      z1: { escena: 'titulo', texto: 'Al amanecer, una locomotora sin nombre sale de la cochera 4 hacia el Este.' }
    }
  }
};

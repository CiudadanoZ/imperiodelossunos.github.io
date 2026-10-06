// ============================================================
//  NOCHE 5 — Las células
//  La reunión con los líderes de otras células de la ciudad.
//  Cada uno pide algo distinto; convencerlos suma Red para el domingo.
// ============================================================

window.NOCHE5 = {
  numero: 5,

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'refugioAnden', ir: 'n1a' }], siguiente: 'n1s' },
      n1a: { escena: 'anden', texto: 'Medianoche. El andén de Sol está lleno. Hay caras que Elías no ha visto nunca: los líderes de las otras células de Nueva Berlín.', siguiente: 'b0' },
      n1s: { escena: 'sotano', texto: 'Medianoche. El sótano de la Calle del Reloj está lleno. Hay caras que Elías no ha visto nunca: los líderes de las otras células de Nueva Berlín.', siguiente: 'b0' },

      // --- Brandt en la puerta ---
      b0: { rama: [{ si: 'brandtSalvado', ir: 'b1' }], siguiente: 'm1' },
      b1: { texto: 'Antes de que empiece la reunión, Chispa baja corriendo la escalera. Alguien les ha seguido. Un hombre solo, sin uniforme, con las manos en alto.', siguiente: 'b2' },
      b2: { quien: 'brandt', texto: 'No he venido a detenerle, Vogt. Si quisiera, lo habría hecho el martes. O el miércoles. O esta mañana.', siguiente: 'b3' },
      b3: { quien: 'brandt', texto: 'Me ha salvado la vida delante de la Inspección. No sé por qué. Yo tampoco sé por qué no le denuncié a usted. Supongo que eso nos hace algo. No sé qué.', siguiente: 'b4' },
      b4: { quien: 'mara', texto: 'Elías. Decide tú. Es tu jefe.', siguiente: 'b5' },
      b5: { quien: 'elias', pensamiento: true, texto: 'Luego, entre los aspirantes. Primero, la reunión.', siguiente: 'm1' },

      // --- La reunión ---
      m1: { quien: 'mara', texto: 'Tenemos dos días. Los Insomnes solos no podemos tomar La Aguja. Necesitamos a todos. Y cada uno de ellos quiere algo antes de decir que sí.', siguiente: 'm1b' },
      m1b: { si: ['relojeroRescatado'], texto: 'Uno de los líderes, un hombre con las manos negras de aceite, mira al Relojero y escupe al suelo.', siguiente: 'm1c' },
      m1c: { si: ['relojeroRescatado'], texto: '«Grau. El que se entregó. Dicen que en el Centro 3 comía mejor que los guardias.» El Relojero no contesta. Sigue dándole cuerda a su reloj parado.', efecto: { bandera: 'dudaCelulas' }, siguiente: 'f1' },

      // --- Los Ferroviarios ---
      f1: { texto: 'KURT, de los Ferroviarios. Trescientos hombres en las cocheras del Distrito 11. «No movemos un tren por un rumor. Demostradme que el domingo hay una oportunidad de verdad.»', siguiente: 'f2' },
      f2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Protocolo Eclipse: a las 21:00, ODÍN apagará la ciudad un minuto.»', ir: 'f3a', si: 'eclipseDescifrado', efecto: { red: 3, bandera: 'celulaFerroviarios' } },
          { texto: '«Tenemos doce fusiles y gente que sabe usarlos.»', ir: 'f3b', si: 'armas', efecto: { red: 3, bandera: 'celulaFerroviarios' } },
          { texto: '«No tengo pruebas. Solo tengo gente dispuesta a morir.»', ir: 'f3c' }
        ]
      },
      f3a: { texto: 'Kurt se queda callado mucho rato. «Un minuto. En un minuto se descarrila un tren.» Dice que sí.', siguiente: 't1' },
      f3b: { texto: 'Kurt sopesa uno de los fusiles. «De 2029. Como mi hijo.» Dice que sí.', siguiente: 't1' },
      f3c: { texto: '«Gente dispuesta a morir hay mucha. Gente dispuesta a ganar, poca.» Kurt no dice que sí. Tampoco dice que no. Quizá mañana.', siguiente: 't1' },

      // --- Las Tejedoras ---
      t1: { texto: 'NEREA, de las Tejedoras del Distrito 4. Cosen los uniformes del desfile. «Nos han vendido dos veces. ¿Cómo sé que en vuestro agujero no hay otra rata?»', siguiente: 't2' },
      t2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Hubo ratas. Las encontramos mirando sus expedientes. Las dos.»', ir: 't3a', si: ['!redadaSufrida', '!auroraIgnorada'], efecto: { red: 3, bandera: 'celulaTejedoras' } },
          { texto: '«Hubo una rata. Por mi culpa cayó gente. No volverá a pasar.»', ir: 't3b', si: 'redadaSufrida', efecto: { red: 2, bandera: 'celulaTejedoras' } },
          { texto: '«No lo sabes. Nadie lo sabe nunca. Por eso hace falta valor.»', ir: 't3c' }
        ]
      },
      t3a: { texto: 'Nerea sonríe por primera vez. «Un archivero que caza ratas con papeles. Esto sí que no lo había visto.» Dice que sí, y promete cuarenta uniformes de la Guardia Negra.', efecto: { bandera: 'uniformesTejedoras' }, siguiente: 'a1' },
      t3b: { texto: '«Por lo menos no mientes.» Nerea dice que sí. Pero sin uniformes: esos se los guarda por si acaso.', siguiente: 'a1' },
      t3c: { texto: 'Nerea se encoge de hombros. «El valor no se cose.» No dice que sí.', siguiente: 'a1' },

      // --- Anselmo ---
      a1: { texto: 'ANSELMO, un maestro jubilado del Distrito 9, habla el último, despacio. «Y el lunes, ¿qué? Si cae Voss, ¿quién manda? No quiero cambiar un sol negro por otro de otro color.»', siguiente: 'a2' },
      a2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Nadie. Que se enciendan las luces y cada barrio decida.»', ir: 'a3a', efecto: { red: 2, bandera: 'celulaAnselmo' } },
          { texto: '«Nosotros. Alguien tiene que mandar.»', ir: 'a3b' },
          { texto: '«Me llamo Elías Aranda. Mi madre era la Voz de Madrid. Ella no quería mandar. Quería que recordáramos.»', ir: 'a3c', si: 'nombreReal', efecto: { red: 4, bandera: ['celulaAnselmo', 'hijoDeLaVoz'] } }
        ]
      },
      a3a: { texto: 'Anselmo asiente. «Eso es lo que dicen todos antes de ganar. Pero me vale.»', siguiente: 'x1' },
      a3b: { texto: 'Anselmo se levanta y se pone el abrigo. «Eso decía Voss en 2029.» Se va.', siguiente: 'x1' },
      a3c: { texto: 'El refugio se queda en silencio. Anselmo se quita las gafas. «Julia Aranda. Yo tenía su radio escondida en el horno.» Se levanta y le da la mano. Detrás de él, uno a uno, todos los líderes hacen lo mismo.', siguiente: 'x2' },
      x2: { quien: 'elias', pensamiento: true, texto: 'Treinta y cuatro años sin que nadie me diera la mano. Esta noche, veinte.', siguiente: 'x1' },

      x1: { quien: 'mara', texto: 'Ya está. Lo demás es trabajo. Esta noche hay que preparar el domingo, y alguien más ha pedido entrar.' }
    }
  },

  // ---------------- ASPIRANTES ----------------
  aspirantes: [
    {
      id: 'brandt', si: 'brandtSalvado', nombre: 'Konrad Brandt', papel: 'Supervisor de la Sección 14',
      dice: 'El domingo estaré de guardia en la entrada de personal de La Aguja, nivel 0. Si queréis una puerta abierta, yo tengo la llave. No os pido que me creáis. Os pido que me miréis a la cara.',
      habilidades: { labia: 2, sigilo: 1 },
      traidor: false,
      memo: 'brandtRev',
      comparacion: 'Su revisión decía: «tolerancia con subordinados desleales». El subordinado desleal eres tú. Te ha protegido toda la semana. No sabes por qué. Él tampoco.',
      informe: 'Ruth: «Konrad Brandt. Once años de supervisor. Ni una sola reubicación propuesta por él. Ni una. Siempre firmaba las de otros. Eso no lo hace bueno. Lo hace otra cosa.»'
    },
    {
      id: 'leo', si: 'leoSalvado', nombre: 'Leo Sanz', papel: 'Archivero de la mesa 12',
      dice: 'Me han dicho que fuiste tú quien devolvió mi expediente. Yo solo miraba las caras. No sabía que eso fuera un delito. Ahora que lo sé, quiero seguir haciéndolo.',
      habilidades: { tecnica: 1, labia: 1 },
      traidor: false,
      memo: 'leo',
      comparacion: 'Su expediente: cuatro minutos por expediente. Mirando las caras. Dice la verdad.',
      informe: 'Ruth: «Veintitrés años. Huérfano. Hogar de Formación número 4.» Otro más de San Ildefonso.'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'semillaUltima', si: ['!semillaConseguida'],
      titulo: 'Última oportunidad: el Proyecto Semilla',
      desc: 'El archivo arde mañana. Esta noche lo han trasladado al patio del Archivo Central, junto a la incineradora.',
      habilidad: 'sigilo', base: 15,
      bonus: [{ si: 'semillaAplazada', mas: 25 }, { si: 'reconArchivo', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'semillaConseguida', intel: 1 },
      captura: 0.5,
      exito: '{op} vuelve con una sola caja, chamuscada por una esquina. Hogar número 4. Es suficiente.',
      fracaso: 'La incineradora ya está encendida cuando {op} llega. El humo huele a papel.',
      capturado: 'El patio está iluminado como un escenario. Esperaban a alguien.'
    },
    {
      id: 'planos', si: '!planosAguja',
      titulo: 'Los planos de La Aguja',
      desc: 'Conseguir los planos de los niveles 0 a -4 de La Aguja: accesos de personal, ascensores de servicio y el núcleo de ODÍN.',
      habilidad: 'sigilo', base: 30,
      bonus: [{ si: 'contactoAguja', mas: 25 }, { si: 'mensajeRelojero', mas: 10 }, { si: 'recluta_brandt', mas: 20 }],
      coste: { intel: 1 },
      recompensa: { intel: 2, bandera: 'planosAguja' },
      captura: 0.45,
      exito: 'Doce hojas de papel cebolla. En la última, a mano, alguien ha marcado con una cruz el núcleo de ODÍN. Nivel -4.',
      fracaso: 'Los planos están en una caja fuerte que no estaba en ningún informe.',
      capturado: 'La oficina de obras de La Aguja tiene más guardias que la propia torre.'
    },
    {
      id: 'eclipseReloj', si: 'eclipseDescifrado',
      titulo: 'Cronometrar el eclipse',
      desc: 'Sincronizar todos los relojes de la resistencia con el reloj maestro de ODÍN para el apagón de las 21:00.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'relojeroRescatado', mas: 20 }],
      coste: {},
      recompensa: { bandera: 'eclipseSincronizado' },
      captura: 0.2,
      exito: 'Veinte relojes de bolsillo, ajustados al segundo. «El minuto empieza a las 21:00:00», dice el Relojero. «No a las 21:00:01. Un segundo es una vida.»',
      fracaso: 'El reloj maestro de ODÍN no emite en abierto. Tendréis que improvisar.',
      capturado: 'ODÍN detecta la sincronización y la rastrea.'
    },
    {
      id: 'uniformes', si: '!uniformesTejedoras',
      titulo: 'Uniformes de la Guardia Negra',
      desc: 'Robar uniformes de la lavandería del cuartel del Distrito 9.',
      habilidad: 'fuerza', base: 40,
      coste: { suministros: 1 },
      recompensa: { bandera: 'uniformes' },
      captura: 0.4,
      exito: 'Quince uniformes negros, con visor. Con el visor bajado, cualquiera es cualquiera.',
      fracaso: 'La lavandería está vacía. Los uniformes ya están planchados para el desfile, en el cuartel.',
      capturado: 'La lavandera grita. Tiene buena voz.'
    },
    {
      id: 'klausRescate', si: 'klausReubicado',
      titulo: 'Sacar a Klaus Ernst del tren',
      desc: 'El tren de las 05:00 hacia la Colonia Este-3 lleva a Klaus Ernst. Al que denunciaste tú.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'celulaFerroviarios', mas: 30 }],
      coste: { suministros: 1 },
      recompensa: { red: 1, bandera: 'klausRescatado' },
      captura: 0.4,
      exito: 'El vagón 7 se desengancha en una curva. Klaus Ernst baja a oscuras, sin saber quién le ha salvado. Ni quién le condenó.',
      fracaso: 'El tren sale a su hora. Klaus Ernst va en el vagón 7.',
      capturado: 'La Guardia Negra custodia el tren entero. Todo el trayecto.'
    },
    {
      id: 'leoRescate', si: 'leoReubicado',
      titulo: 'Sacar a Leo Sanz del calabozo',
      desc: 'El chico de la mesa 12 espera su tren en el calabozo del Distrito 5.',
      habilidad: 'sigilo', base: 45,
      coste: {},
      recompensa: { red: 1, bandera: 'leoRescatado' },
      captura: 0.35,
      exito: 'Leo sale del calabozo y lo primero que hace es mirar a {op} a la cara. Mucho rato. Como si quisiera memorizarla.',
      fracaso: 'Han cambiado a Leo de calabozo. Nadie sabe a cuál.',
      capturado: 'El calabozo del Distrito 5 ya no tiene un guardia que bebe.'
    },
    {
      id: 'radio2',
      titulo: 'La Voz vuelve',
      desc: 'Emitir por onda corta, en la frecuencia de la vieja «Voz de Madrid», la convocatoria para el domingo.',
      habilidad: 'tecnica', base: 20,
      bonus: [{ si: 'hijoDeLaVoz', mas: 20 }],
      coste: { suministros: 1 },
      recompensa: { red: 3, bandera: 'vozVuelve' },
      captura: 0.35,
      exito: '«¿Recuerdas Madrid? El domingo, a las nueve, cuando se apaguen las luces, sal a la calle.» En veinte mil casas alguien sube el volumen.',
      fracaso: 'ODÍN ahoga la frecuencia con el himno.',
      capturado: 'La frecuencia de la Voz de Madrid lleva nueve años vigilada. Esperaban que alguien la usara.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'd0',
    nodos: {
      // Si el Proyecto Semilla llegó esta noche, la revelación ocurre ahora
      d0: { rama: [{ si: ['semillaConseguida', '!nombreReal'], ir: 's1' }], siguiente: 'f0' },
      s1: { texto: 'La caja chamuscada del Proyecto Semilla está sobre la mesa. Elías la abre con las manos temblando.', siguiente: 's2' },
      s2: { texto: '«Interno 2008-117. Hallado en la puerta del Colegio de San Ildefonso con una nota: SE LLAMA ELÍAS. Encontrado por: Tobías Grau, conserje.»', siguiente: 's3' },
      s3: { texto: '«Cruce de linaje, 2032. Madre: JULIA ARANDA. Locutora de la emisora ilegal "La Voz de Madrid".» Debajo, a mano: «Reasignado como VOGT. — T. G.»', siguiente: 's4' },
      s4: { quien: 'elias', pensamiento: true, texto: '«¿Recuerdas Madrid?» Era su frase. La de mi madre. Elías Aranda. Me llamo Elías Aranda.', efecto: { bandera: ['nombreReal', 'nombreDicho'] }, siguiente: 'f0' },

      f0: {
        texto: 'La reunión ha terminado. Queda una hora antes de volver a ser Vogt. Solo un día más.',
        opciones: [
          { texto: 'Hablar con el Relojero.', ir: 'r1', si: 'relojeroRescatado' },
          { texto: 'Sentarse con Mara.', ir: 'm0' },
          { texto: 'Buscar a Chispa.', ir: 'c1', si: ['tomasSalvado', '!capturado_tomas'] },
          { texto: 'Acompañar a Ruth.', ir: 'x0', si: '!fuera_ruth' },
          { texto: 'Irse a casa.', ir: 'z1' }
        ]
      },

      // --- El Relojero: la promesa ---
      r1: { quien: 'relojero', texto: 'Has oído lo que dicen de mí. Que comía mejor que los guardias.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Es verdad. Y el domingo vas a ver cosas peores. Me vas a ver al lado de gente con la que no debería estar.', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'Pase lo que pase, veas lo que veas: confía en mí. Una vez. Es lo único que te voy a pedir en la vida.', siguiente: 'r4' },
      r4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Confío en ti.»', ir: 'r5a', efecto: { bandera: 'confiaRelojero' } },
          { texto: '«No puedo prometerte eso.»', ir: 'r5b', efecto: { bandera: 'dudaRelojero' } }
        ]
      },
      r5a: { quien: 'relojero', texto: 'Gracias, hijo.', siguiente: 'r6' },
      r6: { quien: 'elias', pensamiento: true, texto: '«Hijo.» Lo ha dicho sin darse cuenta. O dándose cuenta perfectamente.', siguiente: 'z1' },
      r5b: { quien: 'relojero', texto: 'Haces bien. Yo tampoco confiaría en mí. Pero acuérdate de que te lo pedí.', siguiente: 'z1' },

      // --- Mara ---
      m0: { rama: [{ si: 'promesaLunes', ir: 'm1' }], siguiente: 'n1' },
      m1: { texto: 'Alguien ha encendido la radio de Chispa. Suena una canción de otro continente, de otro siglo, con mucha interferencia.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: '¿Sabes bailar?', siguiente: 'm3' },
      m3: { quien: 'elias', texto: 'No. Nunca he... No.', siguiente: 'm4' },
      m4: { quien: 'mara', texto: 'Yo tampoco. Así que no se notará.', siguiente: 'm5' },
      m5: { texto: 'Bailan mal, despacio, entre cajas de fusiles y mapas de La Aguja. Nadie les mira. O todos les miran y hacen como que no.', efecto: { vinculo_mara: 1, bandera: 'baile' }, siguiente: 'm6' },
      m6: { quien: 'mara', texto: 'El lunes. No te olvides.', siguiente: 'z1' },
      n1: { texto: 'Mara está limpiando un fusil de 2029. Le da otro a Elías, descargado.', siguiente: 'n2' },
      n2: { quien: 'mara', texto: 'Así se sujeta. Así se apunta. Y ojalá no tengas que hacer nunca lo tercero.', siguiente: 'n3' },
      n3: { quien: 'elias', texto: '¿Y si tengo que hacerlo?', siguiente: 'n4' },
      n4: { quien: 'mara', texto: 'Entonces no pienses en la cara. Tú, que siempre miras las caras. Esa vez, no.', efecto: { vinculo_mara: 1, bandera: 'sabeDisparar' }, siguiente: 'z1' },

      // --- Chispa ---
      c1: { rama: [{ si: 'llaveODIN', ir: 'c2' }], siguiente: 'c7' },
      c2: { quien: 'tomas', texto: 'Repasemos. El núcleo de ODÍN está en el nivel -4. Metes la llave, giras a la derecha, cuentas hasta tres. No hasta cuatro. Hasta tres.', siguiente: 'c3' },
      c3: { quien: 'tomas', texto: 'Si yo no llego al -4, lo haces tú. Prométemelo.', siguiente: 'c4' },
      c4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Te lo prometo. Y luego iremos a ese concierto.»', ir: 'c5', efecto: { vinculo_tomas: 1, bandera: 'promesaLlave' } },
          { texto: '«Llegarás tú. Yo no sé ni contar hasta tres.»', ir: 'c6', efecto: { vinculo_tomas: 1 } }
        ]
      },
      c5: { quien: 'tomas', texto: 'En primera fila. Tú invitas. Con tu sueldo de funcionario.', siguiente: 'z1' },
      c6: { quien: 'tomas', texto: 'Uno, dos, tres. Ya está, ya sabes. Pareces mi abuelo, hermano.', siguiente: 'z1' },
      c7: { quien: 'tomas', texto: 'No duermo. Si duermo, sueño con el Este. Quédate un rato, ¿vale? No hace falta hablar.', efecto: { vinculo_tomas: 1 }, siguiente: 'z1' },

      // --- Ruth ---
      x0: { rama: [{ si: 'ruthConocioMadre', ir: 'x1' }], siguiente: 'x5' },
      x1: { quien: 'ruth', texto: 'Toma. La he guardado nueve años dentro de un libro de cocina.', siguiente: 'x2' },
      x2: { texto: 'Es una octavilla amarillenta. Arriba, impreso: «¿RECUERDAS MADRID?». Abajo, a mano, con letra apretada: «Sigue mirando. — J.»', siguiente: 'x3' },
      x3: { quien: 'ruth', texto: 'Esa letra es la de tu madre, niño. La única cosa suya que no quemaron.', efecto: { vinculo_ruth: 2, bandera: 'octavillaMadre' }, siguiente: 'x4' },
      x4: { quien: 'elias', pensamiento: true, texto: '«Sigue mirando.» Es lo que llevo haciendo toda la vida. Sin saber que alguien me lo había pedido.', siguiente: 'z1' },
      x5: { quien: 'ruth', texto: 'Cuando yo tenía tu edad, pensaba que las guerras las ganaban los valientes. Las ganan los que no se cansan. Duerme, niño. Esa también es un arma.', efecto: { vinculo_ruth: 1 }, siguiente: 'z1' },

      z1: { escena: 'calle', texto: 'Por las calles, los operarios terminan de colgar banderas negras. Mañana es sábado. El último día de Elías Vogt en el Ministerio.', siguiente: 'z2' },
      z2: { escena: 'titulo', texto: 'Quedan dos noches para el Día del Sol.' }
    }
  }
};

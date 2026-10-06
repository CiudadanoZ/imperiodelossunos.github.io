// ============================================================
//  NOCHE 6 — La víspera
//  Últimos preparativos y la última hora antes del Día del Sol.
// ============================================================

window.NOCHE6 = {
  numero: 6,

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'refugioAnden', ir: 'n1a' }], siguiente: 'n1s' },
      n1a: { escena: 'anden', texto: 'Medianoche. El andén de Sol huele a aceite de fusil y a café recalentado. Nadie duerme. Nadie finge dormir.', siguiente: 'p1' },
      n1s: { escena: 'sotano', texto: 'Medianoche. El sótano de la Calle del Reloj huele a aceite de fusil y a café recalentado. Nadie duerme.', siguiente: 'p1' },

      p1: { quien: 'mara', texto: 'Escuchad. Es la última vez que lo digo. Mañana a las 20:55, puerta de personal de La Aguja, nivel 0.', siguiente: 'p2' },
      p2: { quien: 'mara', texto: 'A las 21:00:00, ODÍN apaga la ciudad para que todo el mundo mire la torre. En ese minuto, un grupo baja al nivel -4 y deja ciego a ODÍN. Otro sube a la planta 60.', siguiente: 'p3' },
      p3: { quien: 'mara', texto: 'Al despacho del Canciller. Y lo detenemos. No lo matamos: lo detenemos. Quiero que lo juzguen delante de todos. Quiero que oiga los nombres.', siguiente: 'p4' },
      p4: { quien: 'mara', texto: 'Elías, tú subes a la planta 60. Eres el que recuerda los nombres. Tienes que ser tú quien se los diga a la cara.', siguiente: 'q0' },

      q0: { rama: [{ si: 'guardiaDesviada', ir: 'q1' }], siguiente: 'q2' },
      q1: { quien: 'elias', texto: 'Dos de las tres compañías de la Guardia Negra estarán mañana en la Ciudadela Helios. Lo ordené yo. Con un sello.', siguiente: 'q2' },
      q2: { rama: [{ si: 'eclipseLargo', ir: 'q3' }], siguiente: 'q4' },
      q3: { quien: 'elias', texto: 'Y el Eclipse no durará un minuto. Durará cinco.', siguiente: 'q3b' },
      q3b: { quien: 'mara', texto: '...Cinco minutos. Elías, en cinco minutos se puede cambiar el mundo.', efecto: { vinculo_mara: 1 }, siguiente: 'q4' },
      q4: { rama: [{ si: 'ruthEnAguja', ir: 'q5' }], siguiente: 'q6' },
      q5: { quien: 'elias', texto: 'Ruth no morirá al amanecer. La he trasladado a La Aguja, nivel -4. Mañana estará al lado del núcleo de ODÍN.', siguiente: 'q5b' },
      q5b: { quien: 'mara', texto: 'Entonces la sacamos de paso. Esa vieja nos debe una partida de mus.', siguiente: 'q6' },
      q6: { rama: [{ si: 'tomasEnAguja', ir: 'q7' }], siguiente: 'q8' },
      q7: { quien: 'elias', texto: 'Y Chispa también está en el nivel -4. Justo donde tenemos que ir.', siguiente: 'q8' },
      q8: { rama: [{ si: 'relojeroRescatado', ir: 'r1' }], siguiente: 'z0' },
      r1: { quien: 'relojero', texto: 'Yo subiré por mi cuenta. Tengo mi propia manera de entrar en La Aguja. No me preguntéis cuál.', siguiente: 'r2' },
      r2: { quien: 'mara', texto: '¿Esa manera tiene algo que ver con lo que dicen de ti en las células?', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'Tiene todo que ver.', efecto: { bandera: 'relojeroPorSuCuenta' }, siguiente: 'z0' },
      z0: { quien: 'mara', texto: 'Queda una noche de trabajo. La última. Hacedlo bien.' }
    }
  },

  aspirantes: [],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'pases', si: '!pasesAguja',
      titulo: 'Pases de servicio',
      desc: 'Falsificar doce pases de personal de limpieza de La Aguja.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'sabeFalsificar', mas: 20 }, { si: 'contactoAguja', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'pasesAguja' },
      captura: 0.3,
      exito: 'Doce pases con la foto y el nombre de doce limpiadores que no existen. Tinta de verdad.',
      fracaso: 'El holograma de los pases nuevos es imposible de copiar en una noche.',
      capturado: 'La imprenta que usa {op} tiene un informante en la trastienda.'
    },
    {
      id: 'llave', si: '!llaveODIN',
      titulo: 'Una llave para ODÍN',
      desc: 'Robar un chip de mantenimiento de ODÍN del taller técnico del Distrito 2.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: ['hansRescatado', '!capturado_hans'], mas: 15 }, { si: 'odinPinchado', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'llaveODIN' },
      captura: 0.4,
      exito: '{op} vuelve con un chip del tamaño de una uña. «Gira a la derecha y cuenta hasta tres», dice la etiqueta del técnico.',
      fracaso: 'El taller ha cambiado las cerraduras hoy. Todo el mundo ha cambiado las cerraduras hoy.',
      capturado: 'El técnico de guardia esperaba a alguien. No a {op}. Da igual.'
    },
    {
      id: 'armasUltimas', si: '!armas',
      titulo: 'Fusiles para mañana',
      desc: 'Recoger los fusiles escondidos en el túnel de la vieja línea 1.',
      habilidad: 'fuerza', base: 45,
      coste: { suministros: 1 },
      recompensa: { bandera: 'armas' },
      captura: 0.35,
      exito: 'Diez fusiles y cuatro cajas de munición. Ojalá sobren todas.',
      fracaso: 'El túnel está inundado. Los fusiles, bajo un metro de agua.',
      capturado: 'Una patrulla de mantenimiento del metro. Nunca había patrullas de mantenimiento del metro.'
    },
    {
      id: 'uniformesUltimos', si: ['!uniformes', '!uniformesTejedoras'],
      titulo: 'Uniformes negros',
      desc: 'Conseguir uniformes de la Guardia Negra en la lavandería del cuartel.',
      habilidad: 'sigilo', base: 40,
      coste: {},
      recompensa: { bandera: 'uniformes' },
      captura: 0.35,
      exito: 'Diez uniformes con visor. Con el visor bajado, nadie mira las caras. Por una vez, eso juega a favor.',
      fracaso: 'La lavandería está cerrada por el Día del Sol.',
      capturado: 'La lavandería está llena de guardias recogiendo sus uniformes planchados.'
    },
    {
      id: 'convocatoria',
      titulo: 'La última emisión',
      desc: 'Emitir por la frecuencia de la Voz de Madrid la convocatoria: «Mañana, a las nueve, cuando se apaguen las luces, salid a la calle».',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'vozVuelve', mas: 20 }, { si: 'hijoDeLaVoz', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { red: 3, bandera: 'convocatoria' },
      captura: 0.3,
      exito: 'En veinte mil cocinas, alguien baja el volumen de la telepantalla y sube el de una radio vieja.',
      fracaso: 'ODÍN ahoga la señal con el himno. Solo un puñado de radios la oyen.',
      capturado: 'La Guardia Negra lleva toda la semana esperando esta emisión.'
    },
    {
      id: 'celulasUltimas', si: ['!celulaFerroviarios', '!celulaTejedoras'],
      titulo: 'Las células que dudan',
      desc: 'Una última visita a los Ferroviarios y a las Tejedoras. Mañana los necesitáis.',
      habilidad: 'labia', base: 35,
      bonus: [{ si: 'hijoDeLaVoz', mas: 20 }, { si: 'eclipseDescifrado', mas: 10 }],
      coste: {},
      recompensa: { red: 4, bandera: 'celulasUltima' },
      captura: 0.2,
      exito: 'Kurt y Nerea escuchan en silencio. Luego se dan la mano entre ellos. Mañana estarán.',
      fracaso: 'Ni Kurt ni Nerea abren la puerta. Mañana se verá.',
      capturado: 'Las cocheras del Distrito 11 están llenas de Guardia Negra.'
    }
  ],

  // ---------------- LA ÚLTIMA NOCHE ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro de la madrugada. La última hora antes del Día del Sol. Mañana, a esta hora, todo habrá terminado. De una forma u otra.',
        opciones: [
          { texto: 'Con Mara.', ir: 'm0' },
          { texto: 'Con Chispa.', ir: 'c1', si: ['tomasSalvado', '!capturado_tomas'] },
          { texto: 'Con Ruth.', ir: 'x1', si: '!fuera_ruth' },
          { texto: 'Con el Relojero.', ir: 'r1', si: 'relojeroRescatado' },
          { texto: 'Solo.', ir: 's1' }
        ]
      },

      // --- Mara ---
      m0: { rama: [{ si: ['maraMano', 'vinculo_mara>=5'], ir: 'm1' }], siguiente: 'n1' },
      m1: { texto: 'Mara no dice nada. Le coge la mano y le lleva al rincón más oscuro del refugio, donde la luz no llega.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Lo que te iba a decir el lunes...', siguiente: 'm3' },
      m3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Dímelo el lunes. Llegaremos.»', ir: 'm4a', efecto: { vinculo_mara: 1, bandera: 'esperarLunes' } },
          { texto: 'Besarla.', ir: 'm4b', efecto: { vinculo_mara: 2, bandera: 'beso' } }
        ]
      },
      m4a: { quien: 'mara', texto: 'Llegaremos. Te lo juro por Lavapiés.', siguiente: 'm5' },
      m4b: { texto: 'Es torpe y es breve y sabe a café recalentado. Mara se ríe contra su boca. Es la primera vez que Elías la oye reírse.', siguiente: 'm5' },
      m5: { rama: [{ si: 'refugioAnden', ir: 'm5a' }], siguiente: 'm5s' },
      m5a: { texto: 'Se quedan así, sentados en el borde del andén, con las piernas colgando sobre las vías muertas, hasta que alguien enciende la radio y dice que son las cinco.', siguiente: 'z1' },
      m5s: { texto: 'Se quedan así, sentados en el suelo, con la espalda contra la pared húmeda, hasta que alguien enciende la radio y dice que son las cinco.', siguiente: 'z1' },
      n1: { quien: 'mara', texto: 'No me hagas prometer nada, Elías. Mañana no prometo nada a nadie.', siguiente: 'n2' },
      n2: { quien: 'mara', texto: 'Solo esto: si caigo, no te pares. Subes a la planta 60 y le dices los nombres. Todos. También el mío.', efecto: { vinculo_mara: 1, bandera: 'promesaNombres' }, siguiente: 'z1' },

      // --- Chispa ---
      c1: { quien: 'tomas', texto: 'Estaba pensando en el concierto. ¿Tú qué crees que tocarían? Yo quiero algo que haga mucho ruido. Nueve años de silencio, hermano. Algo que haga MUCHO ruido.', siguiente: 'c2' },
      c2: { rama: [{ si: 'llaveODIN', ir: 'c3' }], siguiente: 'c4' },
      c3: { quien: 'tomas', texto: 'Tienes la llave, ¿verdad? A la derecha. Hasta tres. No hasta cuatro.', siguiente: 'c4' },
      c4: { quien: 'tomas', texto: 'Oye... gracias por lo del lunes. Lo del primer lunes. Por no sellar.', efecto: { vinculo_tomas: 1 }, siguiente: 'z1' },

      // --- Ruth ---
      x1: { quien: 'ruth', texto: 'Setenta y un años, niño. Tres guerras. Esta es la primera que creo que podemos ganar. Será que me hago vieja.', siguiente: 'x2' },
      x2: { quien: 'ruth', texto: 'Si mañana sale bien, quiero una cosa. Doce uvas. En Nochevieja. En la Puerta del Sol, con las campanadas. Tú me las pelas.', efecto: { vinculo_ruth: 1, bandera: 'promesaUvas' }, siguiente: 'z1' },

      // --- El Relojero ---
      r1: { quien: 'relojero', texto: 'Mañana te voy a decir la última verdad, Elías. La peor. Y después tendrás que decidir qué haces conmigo.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Esta noche solo quiero darte esto.', siguiente: 'r3' },
      r3: { texto: 'Es un reloj de bolsillo. El que no funcionaba. Ahora marca la hora exacta: las 04:12. Por detrás, grabado a mano: «E.»', efecto: { bandera: 'relojDeTobias' }, siguiente: 'z1' },

      // --- Solo ---
      s1: { texto: 'Elías se sienta solo, apartado de los demás. Saca la octavilla, el sello de RECHAZADO, el papel con su nombre. Los mira mucho rato.', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: 'Hace una semana no tenía nada que perder. Ahora tengo todo. Es mucho peor. Y es mucho mejor.', siguiente: 'z1' },

      z1: { escena: 'titulo', texto: 'Domingo, 9 de noviembre de 2040. El Día del Sol.' }
    }
  }
};

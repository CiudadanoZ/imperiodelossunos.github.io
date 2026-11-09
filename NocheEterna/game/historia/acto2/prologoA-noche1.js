// ============================================================
//  ACTO 2 · PRÓLOGO A · NOCHE 1 — «La voz en la radio»
//  La Inspectora Hel habla por primera vez. Julia (si está en Madrid) quiere contestar.
// ============================================================

window.NOCHE_A1 = {
  numero: 1,
  subtitulo: 'Apagón',
  escenaLlegada: 'madridOscura',
  sinOperativos: ['relojero'],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { texto: 'Medianoche. En la ciudad libre ya no hay toque de queda. Tampoco hay luz. Sin farolas, la gente se acuesta a las ocho, como hace doscientos años.', siguiente: 'n2' },
      n2: { rama: [{ si: 'refugioAnden', ir: 'n3a' }], siguiente: 'n3s' },
      n3a: { escena: 'anden', texto: 'El andén de Sol ya no es un escondite: es la sala de radio del Comité. Pero sigue siendo el único sitio de Madrid donde Elías duerme tranquilo.', siguiente: 'c0' },
      n3s: { escena: 'sotano', texto: 'El sótano de la Calle del Reloj ya no es un escondite: es la sala de radio del Comité. Pero sigue siendo el único sitio de Madrid donde Elías duerme tranquilo.', siguiente: 'c0' },

      c0: { rama: [{ si: 'chispaVivo', ir: 'c1' }], siguiente: 'r0' },
      c1: { quien: 'tomas', texto: 'Tengo tres generadores y gasoil para dos noches. Si enciendo la radio, el hospital de Mara se queda a oscuras. Si enciendo el hospital, nadie oye la radio. Bienvenido a la libertad, hermano.', siguiente: 'r0' },
      r0: { rama: [{ si: 'ruthViva', ir: 'r1' }], siguiente: 'h1' },
      r1: { quien: 'ruth', texto: 'Calla, niño. Chispa ha pillado algo en la frecuencia de la Orden. Lleva una hora repitiéndose.', siguiente: 'h1' },

      // --- Hel ---
      h1: { quien: 'inspectora', texto: 'Ciudadanos de Madrid. Soy la Inspectora Adela Hel, de la Cancillería. La Orden no os ha abandonado. Os está esperando.', siguiente: 'h2' },
      h2: { quien: 'inspectora', texto: 'La luz volverá el día que entreguéis a Aldric Voss y a los terroristas del llamado Comité. Tenéis hasta que termine el invierno. Hace mucho frío en Madrid, ¿verdad?', siguiente: 'h3' },
      h3: { quien: 'inspectora', texto: 'Y un saludo para el archivero Vogt. Me debe usted un nombre de su sección. Todavía lo estoy esperando.', siguiente: 'h4' },
      h4: { quien: 'mara', texto: 'Hel. La que se sentó detrás de ti la Semana de la Lealtad. Nadie la detuvo. Nadie se acordó de ella.', siguiente: 'h5' },
      h5: { quien: 'elias', pensamiento: true, texto: 'Yo sí me acordaba. Me acuerdo de todas las caras. Pero la suya la guardé en un cajón para no tener que mirarla.', siguiente: 'j0' },

      // --- Julia ---
      j0: { rama: [{ si: 'juliaEnMadrid', ir: 'j1' }], siguiente: 'k1' },
      j1: { texto: 'En un rincón, junto al micrófono, una mujer de pelo gris se levanta. Lleva tres meses en Madrid. Todavía se sienta cerca de las puertas, como en la colonia.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Dejadme contestarle. Esa frecuencia la usé yo durante dos años. La gente todavía se acuerda de mi voz.', siguiente: 'j3' },
      j3: { quien: 'mara', texto: 'Si contestas, sabrán desde dónde emitimos. Y la ciudad entera oirá que la Voz de Madrid ha vuelto. Elías, tú decides.', siguiente: 'j4' },
      j4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Contéstale.»', ir: 'j5a', efecto: { vinculo_julia: 2, ira: 6, bandera: 'juliaContesto' } },
          { texto: '«Todavía no. Nos oirían.»', ir: 'j5b', efecto: { bandera: 'juliaCallada' } }
        ]
      },
      j5a: { quien: 'julia', texto: 'Aquí la Voz de Madrid. Inspectora: no le vamos a entregar a nadie. Si quiere a Voss, venga a buscarlo. Y traiga la luz. Nosotros ya estamos acostumbrados a la oscuridad. Ustedes no.', siguiente: 'j6a' },
      j6a: { texto: 'Chispa corta la señal. Durante un minuto nadie habla. Luego, desde la calle, a través de la trampilla, llega un ruido raro. Es gente aplaudiendo en la oscuridad.', siguiente: 'k0' },
      j5b: { quien: 'julia', texto: 'Siete años callada en la colonia. Y ahora me manda callar mi hijo. Tienes razón. Eso es lo peor: que tienes razón.', siguiente: 'k0' },

      // --- Sin Julia: un mensaje del Este ---
      k0: { rama: [{ si: 'juliaEnMadrid', ir: 'x1' }], siguiente: 'k1' },
      k1: { quien: 'kurt', texto: 'Perdonad la hora. Esta tarde ha llegado un mercancías de vacío desde el Este. Entre los vagones venía una mujer medio congelada. Se escapó de la Colonia Este-1.', siguiente: 'k2' },
      k2: { quien: 'kurt', texto: 'Solo repite una frase. Dice que se la hicieron aprender de memoria para el archivero de la Sección 14.', siguiente: 'k3' },
      k3: { texto: '«Julia Aranda vive. Dice que no vengas.»', efecto: { bandera: 'mensajeJulia' }, siguiente: 'k4' },
      k4: { quien: 'elias', pensamiento: true, texto: 'Sabe quién soy. Sabe dónde trabajaba. Siete años en una colonia y sabe dónde trabajaba su hijo. Y lo único que me pide es que no vaya.', siguiente: 'x1' },

      x1: { quien: 'mara', texto: 'Mañana se vota lo de Voss y esta noche tenemos que mantener la ciudad en pie. Ha venido gente que quiere ayudar. Míralos bien, como siempre.' }
    }
  },

  // ---------------- ASPIRANTES ----------------
  aspirantes: [
    {
      id: 'marcoR', si: 'marco_perdonar', nombre: 'Marco Ibáñez', papel: 'Exguardia',
      dice: 'Esta mañana me soltaste. Sé usar un fusil y sé dónde duermen los que aún llevan visor. Déjame hacer algo que no me dé vergüenza.',
      habilidades: { fuerza: 2, sigilo: 1 },
      traidor: false,
      informe: 'Ruth: «Su fusil no disparó en la redada. Lo sabemos porque lo comprobaste tú, ¿no? O porque tienes buen ojo.»'
    },
    {
      id: 'linaR', si: 'linaPerdonada', nombre: 'Lina Ortiz', papel: 'Exjefa de grupo de la Juventud Solar',
      dice: 'Anselmo me ha dado de cenar. Nadie me había dado de cenar sin pedirme un nombre a cambio. Conozco a todos los de la Juventud que siguen reuniéndose. Quiero que dejen de hacerlo.',
      habilidades: { labia: 2, sigilo: 1 },
      traidor: false,
      informe: 'Ruth: «Tiene dieciséis años y tres medallas por denunciar. Ahora quiere una más, por lo contrario. Los niños son así.»'
    },
    {
      id: 'nicoR', si: 'fuera_nico', nombre: 'Nico Barros', papel: 'Voluntario de la Guardia de la Ciudad',
      dice: 'Me llamo Nico. Trabajaba en la Fundición Helios hasta que cerró. Quiero entrar en la nueva Guardia de la Ciudad. Alguien tiene que poner orden en esta oscuridad.',
      habilidades: { fuerza: 2, labia: 1 },
      traidor: true,
      memo: 'nico',
      comparacion: 'MIENTE. Otra vez. Hace tres meses te contó lo mismo con otra cara de pena. Su expediente decía: «Servicio de Enlace · Dirección de Seguridad».',
      informe: 'Ruth: «Nico Barros. El de la redada de la Calle del Reloj. Tiene la cara más dura que he visto en setenta y un años.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'gasoil',
      titulo: 'Gasoil para el hospital',
      desc: 'Llevar los bidones de gasoil de las cocheras al hospital sin listas, antes de que se congelen los enfermos de la planta 3.',
      habilidad: 'fuerza', base: 45,
      coste: { suministros: 1 },
      recompensa: { red: 1, principios: 3, bandera: 'hospitalEncendido' },
      captura: 0.2,
      exito: 'A las tres de la madrugada, el hospital de Mara es el único edificio con luz de todo Madrid. La gente se acerca solo para mirarlo.',
      fracaso: 'Los bidones están congelados. {op} vuelve con las manos quemadas de frío y nada más.',
      capturado: 'Alguien de la Orden esperaba en las cocheras. Todavía quedan muchos en Madrid.'
    },
    {
      id: 'saboteadores',
      titulo: 'Los que vuelan el carbón',
      desc: 'Alguien está volando los depósitos de carbón de la ciudad. Encontrar a los leales a la Orden que lo hacen.',
      habilidad: 'labia', base: 30,
      bonus: [{ si: 'brandtUsado', mas: 20 }, { si: 'wrenUsado', mas: 20 }, { si: 'marco_usar', mas: 15 }, { si: 'pilar_usar', mas: 10 }],
      coste: { intel: 1 },
      recompensa: { ira: -8, intel: 1, bandera: 'saboteadoresCaidos' },
      captura: 0.35,
      exito: '{op} da con ellos en un portal del Distrito 1: cinco antiguos guardias con explosivos de minería y una radio sintonizada en la frecuencia de Hel.',
      fracaso: 'Nadie habla. En esta ciudad, la gente aprendió a no hablar durante nueve años. No se olvida en tres meses.',
      capturado: 'Los saboteadores sabían que {op} iba a ir. Alguien del Comité habla con la Orden.'
    },
    {
      id: 'carbonCocheras',
      titulo: 'Carbón de las cocheras',
      desc: 'Los Ferroviarios de Kurt tienen tres vagones de carbón parados en el Distrito 11. Hay que bajarlo a los barrios antes del amanecer.',
      habilidad: 'fuerza', base: 40,
      bonus: [{ si: 'celulaFerroviarios', mas: 25 }, { si: 'celulasUltima', mas: 10 }],
      coste: {},
      recompensa: { suministros: 3, ira: -5 },
      captura: 0.2,
      exito: 'Al amanecer hay carbón en todos los portales del Distrito 9. Anselmo dice que es lo más parecido a una revolución que ha visto.',
      fracaso: 'Los vagones están vacíos. Alguien llegó antes.',
      capturado: 'En las cocheras había gente armada que no era de los Ferroviarios.'
    },
    {
      id: 'senalHel',
      titulo: 'De dónde habla Hel',
      desc: 'Rastrear la señal de radio de la Inspectora Hel con los viejos receptores de Chispa.',
      habilidad: 'tecnica', base: 25,
      bonus: [{ si: 'wrenUsado', mas: 35 }, { si: 'odinPinchado', mas: 10 }, { si: 'chispaVivo', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { intel: 2, bandera: 'senalHel' },
      captura: 0.15,
      exito: 'La señal no sale de ninguna ciudad. Sale de la Ciudadela Helios, a mil ochocientos kilómetros al Este. Hel está donde está la luz.',
      fracaso: 'La señal rebota en tantos repetidores que parece salir de todas partes a la vez.',
      capturado: 'Hel también estaba escuchando. Ahora sabe desde dónde escucháis vosotros.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro de la madrugada. Mañana hay votación. Queda una hora.',
        opciones: [
          { texto: 'Con Mara.', ir: 'm0' },
          { texto: 'Con Julia.', ir: 'j1', si: 'juliaEnMadrid' },
          { texto: 'Con Chispa y sus generadores.', ir: 'c1', si: 'chispaVivo' },
          { texto: 'Con Ruth.', ir: 'x1', si: 'ruthViva' },
          { texto: 'Visitar al Relojero en la cárcel.', ir: 'r1', si: 'relojeroPreso' },
          { texto: 'Irse a casa.', ir: 'z1' }
        ]
      },

      // --- Mara ---
      m0: { rama: [{ si: 'beso', ir: 'm1' }, { si: 'esperarLunes', ir: 'm1' }], siguiente: 'm5' },
      m1: { texto: 'Mara se ha quedado dormida sobre los mapas de los depósitos de carbón. Elías le pone su abrigo por encima. Ella abre un ojo.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Anoche soñé que volvía la luz. Que se encendía todo a la vez y yo no sabía dónde meterme. Nueve años escondida y ahora me da miedo que me vean.', siguiente: 'm3' },
      m3: { quien: 'elias', texto: 'Yo te veo igual. Con luz o sin ella.', siguiente: 'm4' },
      m4: { quien: 'mara', texto: 'Eso es lo más cursi que me han dicho en la vida, archivero. Repítelo mañana.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },
      m5: { quien: 'mara', texto: 'Mañana te van a pedir que votes a favor de matar a Voss. Te lo van a pedir llorando, con nombres. Algunos serán nombres que tú recuerdas.', siguiente: 'm6' },
      m6: { quien: 'mara', texto: 'Yo no te voy a decir qué votar. Solo te digo que el día del despacho dijiste: «No lo matamos: lo detenemos». Yo te oí. Madrid también.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },

      // --- Julia ---
      j1: { texto: 'Julia está junto a la estufa, con las manos casi dentro. En la colonia perdió dos dedos del pie. Dice que ya no siente el frío. Miente.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'No sé cómo se habla con un hijo de treinta y cuatro años. En la colonia no había ensayos.', siguiente: 'j3' },
      j3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Yo tampoco sé hablar con una madre. Empatamos.»', ir: 'j4a', efecto: { vinculo_julia: 2 } },
          { texto: '«¿Por qué me dejaste en aquella puerta?»', ir: 'j4b', efecto: { vinculo_julia: 1, bandera: 'preguntoPuerta' } }
        ]
      },
      j4a: { quien: 'julia', texto: 'Empatamos. Te pareces a mí más de lo que crees. Y eso, créeme, no es una buena noticia.', siguiente: 'z1' },
      j4b: { quien: 'julia', texto: 'Porque te querían encontrar. Y la única forma de que no te encontraran era que yo tampoco supiera dónde estabas. No me preguntes quién. Todavía no.', siguiente: 'j5' },
      j5: { quien: 'elias', pensamiento: true, texto: '2008. La Orden no existía en 2008. ¿Quién buscaba a un niño de dos años?', siguiente: 'z1' },

      // --- Chispa ---
      c1: { quien: 'tomas', texto: 'Mira esto: un generador de 2019 con piezas de una telepantalla. Si lo conecto a la radio, emitimos. Si lo conecto al hospital, calentamos a cuarenta personas. Si lo conecto a los dos, explota.', siguiente: 'c2' },
      c2: { rama: [{ si: 'promesaConcierto', ir: 'c3' }], siguiente: 'c4' },
      c3: { quien: 'tomas', texto: 'Y no te creas que me he olvidado del concierto. Cuando vuelva la luz, me lo debes. Con un escenario. Y altavoces que se oigan desde Toledo.', siguiente: 'c4' },
      c4: { quien: 'tomas', texto: 'Oye, hermano. Si al final tenéis que ir a buscar la luz a donde esté... llevadme. Soy el único que sabe hablar con las máquinas de la Orden.', efecto: { vinculo_tomas: 1 }, siguiente: 'z1' },

      // --- Ruth ---
      x1: { quien: 'ruth', texto: 'La Nochevieja pasó a oscuras, niño. Ni campanadas, ni uvas. Solo un reloj de la relojería dando las doce para nadie.', siguiente: 'x2' },
      x2: { rama: [{ si: 'promesaUvas', ir: 'x3' }], siguiente: 'x4' },
      x3: { quien: 'ruth', texto: 'Me debes doce uvas. Las del año que viene. Y peladas, que ya no tengo dientes para pieles.', siguiente: 'x4' },
      x4: { quien: 'ruth', texto: 'Una cosa, y no te enfades con una vieja. Esa mujer, Julia... yo le imprimía las octavillas. Era buena. Pero la colonia no devuelve a nadie entero. No lo olvides.', efecto: { vinculo_ruth: 1 }, siguiente: 'z1' },

      // --- El Relojero ---
      r1: { texto: 'La cárcel del Distrito 1, sin luz. Tobías Grau está sentado en el catre, dándole cuerda a un reloj que no tiene.', siguiente: 'r2' },
      r2: { rama: [{ si: 'juliaEnMadrid', ir: 'r3j' }], siguiente: 'r3n' },
      r3j: { quien: 'relojero', texto: 'Ha venido a verme. Tu madre. Se ha sentado ahí, donde estás tú, y ha estado una hora mirándome sin decir nada. Es lo peor que me han hecho nunca. Y me han hecho de todo.', siguiente: 'r4' },
      r3n: { quien: 'relojero', texto: 'Está viva, ¿verdad? Lo sé por tu cara. Siempre has tenido la cara de un libro abierto, desde que tenías dos años.', siguiente: 'r4' },
      r4: { rama: [{ si: 'rencorRelojero', ir: 'r5r' }], siguiente: 'r5' },
      r5r: { quien: 'relojero', texto: 'No me perdones. No te lo he pedido. Pero escúchame una vez más: Julia no es solo tu madre. Julia sabe algo que la Orden necesita. Por eso la mantuvieron viva.', siguiente: 'z1' },
      r5: { quien: 'relojero', texto: 'Escúchame, Elías. Julia no es solo tu madre. Sabe algo que la Orden necesita. Siete años en una colonia de la que no vuelve nadie... y volvió. Pregúntate por qué.', siguiente: 'z1' },

      z1: { escena: 'madridOscura', texto: 'De vuelta a casa por una ciudad sin una sola luz. Por primera vez en nueve años, Elías no cuenta drones. Cuenta hogueras.', siguiente: 'z2' },
      z2: { escena: 'titulo', texto: 'Mañana, el Comité vota qué hacer con Aldric Voss.' }
    }
  }
};

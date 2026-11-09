// ============================================================
//  ACTO 2 · PRÓLOGO B · NOCHE 2 — «Julia»
//  Madre e hijo, por fin sabiéndolo. La mitad de la verdad sobre Helios.
//  La noticia de que un tren viene de Madrid.
// ============================================================

window.NOCHE_B2 = {
  numero: 2,
  subtitulo: 'Barracón 12',
  escenaLlegada: 'colonia',
  refugio: 'barracon',
  operativos: ['elias', 'olek', 'samira', 'tobias'],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'barracon', texto: 'Medianoche. Samira ha tapado la ventana del barracón con una manta. Alguien vigila la puerta. Julia está sentada en la litera de Elías.', siguiente: 'n2' },
      n2: { rama: [{ si: 'reconocioJulia', ir: 'k1' }], siguiente: 'd1' },

      // --- Si todavía no se lo había dicho ---
      d1: { quien: 'julia', texto: 'Me llamo Julia Aranda. En febrero de 2008 dejé a un niño de dos años en la puerta del Colegio de San Ildefonso, en Madrid, con una nota en el bolsillo.', siguiente: 'd2' },
      d2: { quien: 'julia', texto: 'Ponía «Se llama Elías». No puse el apellido. No podía.', siguiente: 'd3' },
      d3: { rama: [{ si: 'nombreReal', ir: 'd4n' }], siguiente: 'd4' },
      d4n: { quien: 'elias', pensamiento: true, texto: 'Lo sabía. Lo leí en una ficha chamuscada del Proyecto Semilla. Pero leerlo no es esto. Esto es una mujer con mis ojos que tiembla sin frío.', efecto: { vinculo_julia: 2 }, siguiente: 'k1' },
      d4: { quien: 'elias', pensamiento: true, texto: 'Aranda. Treinta y cuatro años sin apellido de verdad, y me lo dice una presa, en un barracón, a dos mil kilómetros de Madrid.', efecto: { vinculo_julia: 2, bandera: ['nombreReal', 'nombreMadre'] }, siguiente: 'k1' },

      // --- La mitad de la verdad ---
      k1: { quien: 'julia', texto: 'Escúchame bien, porque solo te lo voy a contar una vez esta noche. La Inspectora quiere llevarme a Helios. No porque sea tu madre. Porque sé cómo funciona Helios por dentro.', siguiente: 'k2' },
      k2: { quien: 'julia', texto: 'Trabajé en él antes de que se llamara así. Antes de que existiera la Orden. Por eso sigo viva. Por eso «no trasladar, no castigar, no dejar morir».', efecto: { bandera: 'sabeHelios' }, siguiente: 'k3' },
      k3: { quien: 'elias', texto: '¿Y por qué ahora? ¿Por qué me trae a mí aquí?', siguiente: 'k4' },
      k4: { quien: 'julia', texto: 'Porque durante siete años no le he dicho nada. Y cree que por ti sí hablaré. Tiene razón: por ti hablaría. Por eso tienes que irte antes de que me lo pida delante de ti.', siguiente: 'k5' },
      k5: { rama: [{ si: 'trasladoJuliaFalsificado', ir: 'k6f' }], siguiente: 'k6' },
      k6f: { quien: 'julia', texto: 'Me han dicho que cambiaste la fecha de mi traslado. Delante de ella. Eso es de familia, ¿sabes? Hacer tonterías valientes con un papel.', efecto: { vinculo_julia: 1 }, siguiente: 'k6' },
      k6: { quien: 'olek', texto: 'Perdonad. Tengo noticias. El maquinista de hoy dice que en la estación de la frontera hay un tren parado. De Madrid. Con una mujer que pregunta por el archivero.', siguiente: 'k7' },
      k7: { rama: [{ si: 'mensajeEnviado', ir: 'k8m' }], siguiente: 'k8' },
      k8m: { quien: 'olek', texto: 'Tiene una cicatriz en la ceja. Dice que ha recibido tu mensaje. Que no te muevas de aquí. Que ya va ella.', efecto: { bandera: 'maraViene' }, siguiente: 'x1' },
      k8: { quien: 'olek', texto: 'No sé cómo sabía que estabas aquí. Tiene una cicatriz en la ceja y muy mal humor, dice el maquinista.', efecto: { bandera: 'maraViene' }, siguiente: 'x1' },

      x1: { quien: 'elias', pensamiento: true, texto: 'Mara. Mara viene. Nadie ha venido nunca a buscarme a ningún sitio.' }
    }
  },

  aspirantes: [],

  misiones: [
    {
      id: 'focos',
      titulo: 'El ritmo del foco',
      desc: 'Contar, desde el tejado del barracón, cuánto tarda el foco de la torre en dar la vuelta y dónde deja zonas a oscuras.',
      habilidad: 'sigilo', base: 45,
      coste: {},
      recompensa: { intel: 1, bandera: 'ritmoFoco' },
      captura: 0.25,
      exito: 'Cuarenta y dos segundos por vuelta. Y once segundos en los que la esquina de la cantera se queda completamente a oscuras.',
      fracaso: 'La nieve no deja ver nada. Ni el foco, ni la cantera, ni las propias manos.',
      capturado: 'El foco se paró. Justo encima de {op}.'
    },
    {
      id: 'llavesB4',
      titulo: 'Las llaves del barracón 4',
      desc: 'Conseguir una copia de la llave del barracón 4, donde duerme Julia, para sacarla cuando llegue el tren.',
      habilidad: 'sigilo', base: 30,
      bonus: [{ si: 'samiraAyudada', mas: 20 }, { si: 'barracon7Ayudado', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'llaveBarracon4' },
      captura: 0.3,
      exito: 'Una llave hecha con una cuchara aplastada y paciencia. Encaja. A la tercera, pero encaja.',
      fracaso: 'La cerradura del 4 es nueva. De la Cancillería. Nada de lo de aquí la abre.',
      capturado: 'Un guardia del 4 estaba despierto. Hel ha doblado la guardia.'
    },
    {
      id: 'aislamiento',
      titulo: 'Sacar al Relojero del aislamiento',
      desc: 'La celda de aislamiento está fuera del recinto, junto a la cantera. Tobías no durará allí otra semana.',
      si: 'relojeroAislado',
      habilidad: 'sigilo', base: 25,
      bonus: [{ si: 'ritmoFoco', mas: 20 }, { si: 'olekEnEstacion', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: ['relojeroEnBarracon', 'relojeroSacado'] },
      captura: 0.35,
      exito: '{op} vuelve con Tobías a hombros, casi congelado. Lo primero que dice al entrar en calor es: «Siempre sacándome de donde me mandan».',
      fracaso: 'La celda tiene dos guardias esta noche. Hel no deja nada al azar.',
      capturado: 'Los guardias de la celda de aislamiento sabían que alguien iría.'
    },
    {
      id: 'estacion',
      titulo: 'Un sitio en el tren',
      desc: 'Con Olek en la estación, preparar un escondite en el tren de carbón del jueves para cuando llegue Mara.',
      habilidad: 'fuerza', base: 30,
      bonus: [{ si: 'olekEnEstacion', mas: 30 }, { si: 'promesaOlek', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'esconditeTren' },
      captura: 0.2,
      exito: 'Bajo el carbón del tercer vagón, un hueco del tamaño de cuatro personas. Olek dice que caben seis si nadie respira.',
      fracaso: 'Los vagones del jueves se registran uno por uno. Hel ha cambiado las normas de la estación.',
      capturado: 'En la estación había un guardia nuevo que no se creía nada.'
    }
  ],

  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro. Julia tiene que volver al barracón 4 antes de la ronda de las cinco. Queda una hora.',
        opciones: [
          { texto: 'Quedarse con Julia.', ir: 'j1' },
          { texto: 'Llevar a Julia ante el Relojero.', ir: 'r1', si: 'relojeroEnBarracon' },
          { texto: 'Con Olek y Samira.', ir: 'o1' }
        ]
      },

      j1: { texto: 'Se sientan en el borde de la litera. Ninguno de los dos sabe qué hacer con las manos. Al final, Julia coge las de Elías y las mira, una por una, como quien comprueba un inventario.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Tienes las manos de tu padre. Eso tampoco me lo esperaba.', siguiente: 'j3' },
      j3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«¿Quién era mi padre?»', ir: 'j4a', efecto: { bandera: 'preguntoPadre' } },
          { texto: 'No preguntar. Quedarse así.', ir: 'j4b', efecto: { vinculo_julia: 2 } }
        ]
      },
      j4a: { quien: 'julia', texto: 'Alguien que no merece que gastes una pregunta en él. Todavía no. Déjame guardarme eso un poco más. Es lo único que la Orden no sabe de mí.', siguiente: 'z1' },
      j4b: { texto: 'Se quedan así hasta que Samira tose en la puerta. Es la hora. Julia se levanta, y en la puerta se da la vuelta otra vez. Esta vez sonríe.', siguiente: 'z1' },

      r1: { texto: 'Tobías Grau se incorpora en su litera al ver entrar a Julia. Intenta ponerse de pie. No puede.', siguiente: 'r2' },
      r2: { quien: 'julia', texto: 'Tobías.', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'Julia. Te vendí en 2033. A cambio de la ficha limpia de tu hijo. Lo sabes, ¿verdad?', siguiente: 'r4' },
      r4: { quien: 'julia', texto: 'Lo sé desde el primer día. Me lo dijo Hel, para que te odiara. Te he odiado siete años, Tobías. Todos los días.', siguiente: 'r5' },
      r5: { quien: 'julia', texto: 'Y luego miro a mi hijo. Vivo. Con treinta y cuatro años. Y no sé qué hacer con el odio.', siguiente: 'r6' },
      r6: { quien: 'relojero', texto: 'Guárdalo. Lo vas a necesitar para Hel.', efecto: { bandera: 'juliaYRelojero' }, siguiente: 'z1' },

      o1: { quien: 'samira', texto: 'Cuando llegue ese tren, ¿nos llevarás? No te lo pido por mí. Hay treinta y dos personas en este barracón.', siguiente: 'o2' },
      o2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Iremos todos o no irá nadie.»', ir: 'o3a', efecto: { red: 2, bandera: 'promesaBarracon' } },
          { texto: '«No puedo prometer eso.»', ir: 'o3b' }
        ]
      },
      o3a: { quien: 'olek', texto: 'Treinta y dos personas en un tren de carbón. Me gusta. Es la tontería más grande que he oído en tres años.', siguiente: 'z1' },
      o3b: { quien: 'samira', texto: 'Lo sé. Nadie puede. Gracias por no mentir.', siguiente: 'z1' },

      z1: { escena: 'colonia', texto: 'A las cinco suena la campana. En algún lugar al oeste, un tren espera en una frontera con una mujer que no sabe esperar.' }
    }
  }
};

// ============================================================
//  ACTO 2 · CAMINO A · NOCHE 3 — «Zona de Helios»
//  En el tren, cruzando la Zona de Helios. La radio de Madrid (el Comité, a distancia),
//  polizones en el carbón y los códigos para entrar en la Colonia Este-1.
// ============================================================

window.NOCHE_A3 = {
  numero: 3,
  subtitulo: 'Zona de Helios',
  etiqueta: 'ZONA DE HELIOS',
  escenaLlegada: 'trenNieve',
  refugio: 'tren',
  operativos: ['elias', 'kurt', { id: 'mara', si: '!maraRetenida' }, { id: 'tobias', si: ['guiaRelojero', '!relojeroRetenido'] },
    { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] }, 'martaR', 'leif'],
  nuevosOperativos: [
    { id: 'kurt', nombre: 'Kurt', papel: 'Ferroviario', habilidades: { fuerza: 3, tecnica: 2 }, esencial: true },
    { id: 'tobias', nombre: 'Tobías', papel: 'El Relojero', habilidades: { labia: 2, tecnica: 2, sigilo: 1 }, esencial: true, si: 'guiaRelojero' }
  ],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { texto: 'Medianoche en la Zona de Helios. A los lados de la vía, cada cien metros, una torre de alta tensión zumba en la oscuridad.', siguiente: 'n2' },
      n2: { texto: 'Los pueblos que cruzan están a oscuras. Los cables pasan por encima de sus tejados llevando la luz a otra parte.', siguiente: 'n3' },
      n3: { escena: 'tren', quien: 'kurt', texto: 'Así es la Orden. Fabrica la luz aquí y se la lleva lejos. A los de aquí les deja el ruido de los cables. Mi padre decía que eso es lo que es un imperio.', siguiente: 'h0' },

      // --- Los que se quedaron en la frontera ---
      h0: { rama: [{ si: 'maraRetenida', ir: 'h1' }, { si: 'relojeroRetenido', ir: 'h2' }], siguiente: 'd0' },
      h1: { quien: 'kurt', texto: 'Apartadero del kilómetro 40. Desde aquí se ve el puesto. A Mara la tienen en la caseta del fondo. Esta noche la sacamos o mañana entramos en la colonia sin ella.', siguiente: 'd0' },
      h2: { quien: 'kurt', texto: 'Apartadero del kilómetro 40. El viejo está en el calabozo del puesto. Sin él no tenemos los códigos de la colonia. Esta noche hay que ir a por él.', siguiente: 'd0' },

      // --- La radio de Madrid ---
      d0: { texto: '00:00. Kurt sintoniza la radio de la cabina en la frecuencia de la Voz. Interferencias. Luego, una voz conocida.', siguiente: 'd1' },
      d1: { rama: [{ si: 'radioChispa', ir: 'd2c' }], siguiente: 'd2a' },
      d2c: { quien: 'tomas', texto: '¿Me oís? Aquí Madrid, que sigue a oscuras y sigue en pie. Os paso con el jefe. Bueno, con el maestro.', siguiente: 'd3' },
      d2a: { quien: 'anselmo', texto: '¿Me oís? Aquí Anselmo. El chico de los generadores me ha enseñado a usar esto. Tardé dos horas. No os riais.', siguiente: 'd3' },
      d3: { rama: [{ si: 'ciudadEstable', ir: 'd4e' }], siguiente: 'd4i' },
      d4e: { quien: 'anselmo', texto: 'Los barrios han cumplido su palabra. Hay colas, hay frío, pero no hay piedras en las ventanas. Por ahora.', siguiente: 'd5' },
      d4i: { quien: 'anselmo', texto: 'Esto se está poniendo feo. Ayer quemaron la puerta del Comité. La gente dice que nos hemos ido a buscar la luz y no vamos a volver.', efecto: { ira: 8 }, siguiente: 'd5' },
      d5: { rama: [{ si: 'juliaPorOtroCamino', ir: 'd6j' }], siguiente: 'd7' },
      d6j: { quien: 'anselmo', texto: 'Otra cosa. Julia se fue ayer en un camión de mercancías hacia el Este. Con papeles de la Orden. Nadie sabe de dónde los sacó. Dijo que la esperéis en la colonia.', siguiente: 'd7' },
      d7: { rama: [{ si: 'vossEjecucion', ir: 'v1' }, { si: 'wrenUsado', ir: 'w1' }], siguiente: 'q1' },

      v1: { quien: 'anselmo', texto: 'La ejecución de Voss es el lunes. El Comité quiere tu voto otra vez, archivero, ahora que estás lejos y la sala no te ve la cara. ¿Seguimos adelante?', siguiente: 'v2' },
      v2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Seguid adelante.»', ir: 'v3a', efecto: { ira: -10, principios: -8, bandera: 'ejecucionConfirmada' } },
          { texto: '«Suspendedla. Hasta que vuelva.»', ir: 'v3b', efecto: { ira: 15, principios: 10, bandera: 'ejecucionSuspendida' } }
        ]
      },
      v3a: { quien: 'anselmo', texto: 'Entendido. Que conste en acta que lo dijiste por radio, de noche, desde un tren. La historia es así de rara.', siguiente: 'x1' },
      v3b: { quien: 'anselmo', texto: 'Entendido. La gente no lo va a entender. Yo sí. Vuelve pronto, que no sé cuánto aguanto explicándolo.', siguiente: 'x1' },

      w1: { quien: 'anselmo', texto: 'Wren dice que puede encontrar a los saboteadores en una noche si le dejamos encender ODÍN entero. Todas las cámaras de Madrid. Todas las voces. ¿Le dejamos?', siguiente: 'w2' },
      w2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Que lo encienda. Solo esta noche.»', ir: 'w3a', efecto: { ira: -10, principios: -12, bandera: 'odinEncendido' } },
          { texto: '«No. Nunca más.»', ir: 'w3b', efecto: { ira: 6, principios: 6, bandera: 'odinApagado' } }
        ]
      },
      w3a: { quien: 'anselmo', texto: 'Solo esta noche. Eso dijo la Orden en 2031 cuando apagó las luces «por ahorro».', siguiente: 'x1' },
      w3b: { quien: 'anselmo', texto: 'Bien. Wren se ha encogido de hombros. Dice que ya cambiaremos de opinión. Me da miedo que tenga razón.', siguiente: 'x1' },

      q1: { quien: 'anselmo', texto: 'Han asaltado un almacén de raciones en el Distrito 4. Media ciudad quiere toque de queda. Nosotros, que vivimos nueve años bajo uno. ¿Qué hacemos?', siguiente: 'q2' },
      q2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Toque de queda. Solo para los almacenes.»', ir: 'q3a', efecto: { ira: -8, principios: -8, bandera: 'toqueQuedaMadrid' } },
          { texto: '«Nada de toques de queda. Guardias en los almacenes, y ya.»', ir: 'q3b', efecto: { ira: 8, principios: 4 } }
        ]
      },
      q3a: { quien: 'anselmo', texto: 'Hecho. Esta noche, por primera vez desde noviembre, han sonado las sirenas en Madrid. Las nuestras. Suenan igual.', siguiente: 'x1' },
      q3b: { quien: 'anselmo', texto: 'Hecho. Si mañana hay otro asalto, me echarán la culpa a mí. Para eso están los maestros.', siguiente: 'x1' },

      x1: { quien: 'mara', texto: 'Kurt ha encontrado gente escondida en el vagón del carbón. Y hay que preparar la entrada en la colonia antes del amanecer.' }
    }
  },

  // ---------------- POLIZONES ----------------
  aspirantes: [
    {
      id: 'martaR', nombre: 'Marta Hessel', papel: 'Madre que busca a su hijo',
      dice: 'Mi hijo Daniel está en la Colonia Este-6. Llevo dos años intentando llegar. Si me dejáis bajar con vosotros en la colonia, desde allí sigo sola. Sé coser, sé cocinar con nada y sé esperar.',
      habilidades: { labia: 1, sigilo: 2 },
      traidor: false,
      memo: 'marta',
      comparacion: 'Su expediente de noviembre: viaje a la Colonia Este-6 para visitar a su hijo. Se lo negaste. Dice la verdad. Siempre la dijo.',
      informe: 'Kurt: «Se metió en el carbón en el puesto 12. Lleva una foto de un chico de veinte años cosida al forro del abrigo.»'
    },
    {
      id: 'leif', nombre: 'Leif', papel: 'Fogonero',
      dice: 'Me mandan los Ferroviarios de Varsovia. Sé que vais a la Colonia Este-1. Conozco a los maquinistas de los trenes de carbón de allí. Puedo abriros la estación.',
      habilidades: { fuerza: 2, tecnica: 1 },
      traidor: true,
      informe: 'Kurt: «¿Los Ferroviarios de Varsovia? Los fusilaron a todos en 2034. Yo conocía a su jefe. Este chico no le ha visto en su vida.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'rescateMara', si: 'maraRetenida',
      titulo: 'Sacar a Mara del puesto 12',
      desc: 'Volver a pie desde el apartadero y sacar a Mara de la caseta del puesto fronterizo.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'circularJuliaRetenida', mas: -10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'maraRecuperada' },
      fracasoEfecto: { sospecha: 15, bandera: 'maraSola' },
      captura: 0,
      exito: '{op} vuelve con Mara antes de las tres. Mara no dice nada en todo el camino. Luego, en el vagón: «Me rechazaste. Con tu sello.» Y luego: «Hiciste bien. Si no, nos habrían mirado a todos.»',
      fracaso: 'La caseta tiene dos guardias despiertos. Al amanecer, Mara no está. Ha dejado una nota en la vía: «Nos vemos en la colonia. No me esperéis.»'
    },
    {
      id: 'rescateRelojero', si: 'relojeroRetenido',
      titulo: 'Sacar al Relojero del calabozo',
      desc: 'El calabozo del puesto 12 es un vagón de mercancías con candado. El Relojero lleva dentro desde las cuatro.',
      habilidad: 'fuerza', base: 40,
      coste: { suministros: 1 },
      recompensa: { bandera: 'relojeroRecuperado' },
      fracasoEfecto: { bandera: 'relojeroPerdido' },
      captura: 0.2,
      exito: 'El candado salta a la tercera. Tobías sale tiritando y lo primero que dice es: «Siempre sacándome de donde me mandan».',
      fracaso: 'Al llegar, el vagón ya no está. Se lo han llevado en el tren de las dos. Hacia la colonia. Como querías tú, pero sin ti.',
      capturado: 'Había un guardia dentro del vagón, con él.'
    },
    {
      id: 'caldera',
      titulo: 'Que no se apague la caldera',
      desc: 'Cruzar el paso de montaña con la caldera agrietada, a diez bajo cero, sin parar.',
      habilidad: 'fuerza', base: 45,
      coste: { suministros: 1 },
      recompensa: { bandera: 'llegadaATiempo' },
      fracasoEfecto: { bandera: 'retraso' },
      captura: 0,
      exito: 'Paleando carbón por turnos toda la noche. A las cinco, el paso queda atrás. Kurt le da una palmada a la caldera como quien se la da a un caballo.',
      fracaso: 'La caldera se para dos horas en lo alto del paso. Llegaréis tarde a la colonia: a plena luz.'
    },
    {
      id: 'drones',
      titulo: 'Los drones de Helios',
      desc: 'La Zona de Helios está llena de drones de vigilancia. Hay que esconder la locomotora en los tramos con cobertura.',
      habilidad: 'sigilo', base: 30,
      bonus: [{ si: 'wrenUsado', mas: 20 }, { si: 'senalHel', mas: 15 }, { si: 'odinPinchado', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'trenInvisible' },
      fracasoEfecto: { sospecha: 12, bandera: 'helSabeTren' },
      captura: 0,
      exito: 'En cada túnel, apagar el faro. En cada bosque, parar. Los drones pasan por encima sin bajar la cabeza.',
      fracaso: 'Un dron se queda quieto encima de la locomotora diez segundos. Luego se va. Hel ya sabe que viene un tren.'
    },
    {
      id: 'codigos',
      titulo: 'Los códigos de la colonia',
      desc: 'Aprender de memoria las contraseñas, los turnos y los números de las puertas de la Colonia Este-1.',
      habilidad: 'labia', base: 25,
      bonus: [{ si: 'guiaRelojero', mas: 35 }, { si: 'relojeroRetenido', mas: -30 }, { si: 'guiaRuth', mas: 25 }, { si: 'guiaCuaderno', mas: 15 }],
      coste: { intel: 1 },
      recompensa: { intel: 2, bandera: 'codigosColonia' },
      captura: 0,
      exito: 'Puerta norte: «Carbón para el taller». Relevo de guardias: 6:00 y 18:00. Barracón 4: la intocable. Elías lo repite hasta que suena a nombre propio.',
      fracaso: 'Demasiados números. Mañana entraréis en la colonia improvisando.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro. Quedan dos horas para la colonia. La nieve golpea los cristales de la cabina.',
        opciones: [
          { texto: 'Con Mara, junto a la caldera.', ir: 'm0', si: '!maraRetenida' },
          { texto: 'Con Mara, junto a la caldera.', ir: 'm0', si: 'maraRecuperada' },
          { texto: 'Con el Relojero.', ir: 'r1', si: ['guiaRelojero', '!relojeroRetenido'] },
          { texto: 'Con el Relojero.', ir: 'r1', si: 'relojeroRecuperado' },
          { texto: 'Con Ruth.', ir: 'u1', si: ['guiaRuth', '!ruthRetenida'] },
          { texto: 'Con Kurt, en los mandos.', ir: 'k1' },
          { texto: 'Con Marta Hessel.', ir: 'h1', si: 'recluta_martaR' }
        ]
      },

      m0: { rama: [{ si: 'beso', ir: 'm1' }], siguiente: 'm4' },
      m1: { texto: 'Mara se ha quitado los guantes para calentarse las manos en la caldera. Elías le coge una. Está helada. Ella no la retira.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'En el hospital, en 2031, tenía una compañera que decía que el amor es sujetarle la mano a alguien mientras se está muriendo. Yo pensaba que era lo más triste que había oído.', siguiente: 'm3' },
      m3: { quien: 'mara', texto: 'Ahora pienso que se equivocaba en una cosa: no hace falta que nadie se esté muriendo.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },
      m4: { quien: 'mara', texto: 'Cuando encontremos a tu madre... no sé qué voy a ser yo. La amiga del hijo. La que lo arrastró a todo esto. La de la ceja partida.', siguiente: 'm5' },
      m5: { quien: 'elias', texto: 'La que me llamó por mi nombre cuando nadie lo hacía.', siguiente: 'm6' },
      m6: { quien: 'mara', texto: '...Eso. Vale. Eso me sirve.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },

      r1: { quien: 'relojero', texto: 'Me vas a preguntar por qué te dejó en aquella puerta. Todos me lo preguntan con los ojos. No lo sé, Elías. Nunca me lo dijo.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Solo me dijo una cosa, en 2031, cuando vino a buscarme a la relojería: «Si alguien pregunta por un niño de San Ildefonso, dile que murió». Alguien preguntó. En 2032. Le dije que habías muerto.', siguiente: 'r3' },
      r3: { quien: 'elias', texto: '¿Quién preguntó?', siguiente: 'r4' },
      r4: { quien: 'relojero', texto: 'Un hombre de una empresa de energía. Con un maletín muy caro. No me dio su nombre. Llevaba en la solapa un sol pequeño, de los de antes. Todavía no era negro.', efecto: { bandera: 'pistaHombreSol' }, siguiente: 'z1' },

      u1: { quien: 'ruth', texto: 'He leído el cuaderno de Tobías tres veces. Hay una página que no entiendo: «Lumen, 2008. Ella firmó la salida. Él no la dejó salir.» Y nada más.', siguiente: 'u2' },
      u2: { quien: 'ruth', texto: 'No sé quién es «él». Pero conozco la letra de Tobías cuando tiene miedo. Esta es.', efecto: { bandera: 'pistaLumen' }, siguiente: 'z1' },

      k1: { quien: 'kurt', texto: 'Mi hijo tenía un fusil de 2029. Era más viejo que él. Murió con él en las manos en el Distrito 11, el día de la Noche Larga.', siguiente: 'k2' },
      k2: { quien: 'kurt', texto: 'Por eso conduzco este trasto. Las cosas viejas que aún funcionan son lo único que les ganamos a ellos.', siguiente: 'z1' },

      h1: { quien: 'marta', texto: 'Mi hijo se llama Daniel. Tenía dieciocho años cuando se lo llevaron. Ahora tiene veinte. Me pregunto si me reconocerá. Si yo le reconoceré a él.', siguiente: 'h2' },
      h2: { quien: 'elias', pensamiento: true, texto: 'Yo me pregunté lo mismo antes de conocer a Julia. La respuesta es: no. Y sí. Las dos cosas.', siguiente: 'z1' },

      z1: { escena: 'trenNieve', texto: 'Al amanecer, entre la nieve, aparecen las torres de vigilancia y las alambradas. Colonia de Trabajo Este-1.' }
    }
  }
};

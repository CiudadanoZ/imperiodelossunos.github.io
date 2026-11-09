// ============================================================
//  ACTO 2 · NOCHE 5 — «La huida»
//  El tren de Kurt llega a las 22:00. Julia cuenta la mitad de la verdad: la llave maestra.
//  Cada operación saca a alguien (o no). Lo que no salga hoy irá mañana a Helios.
//  Y la sensación de que ha sido demasiado fácil: Hel les ha dejado salir.
// ============================================================

window.COLONIA_NOCHE5 = {
  numero: 5,
  subtitulo: 'La huida',
  escenaLlegada: 'colonia',
  etiqueta: 'COLONIA ESTE-1',
  refugio: 'barracon',
  operativos: ['elias', 'mara', 'olek', 'samira', { id: 'tobias', si: 'relojeroConGrupo' }, { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] },
    'kurt', 'martaR', 'leif', 'hansC', 'brandtC', 'leoC', 'ilse'],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'barracon', texto: '21:00. Nadie en el barracón 12 duerme. Treinta y dos personas con los abrigos puestos, sentadas en las literas, como en una estación.', siguiente: 'j1' },

      // --- La mitad de la verdad ---
      j1: { quien: 'julia', texto: 'Antes de salir quiero que sepáis por qué Hel me quiere en Helios. Por si alguno no llega al tren.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Helios no es solo una central. Es una red. Y la red tiene una llave maestra: desde el centro se puede apagar cualquier ciudad del mundo. Cualquiera. Con una orden.', siguiente: 'j3' },
      j3: { quien: 'julia', texto: 'No es un fallo. Es el plan. Se diseñó así desde el principio, en Lumen, hace treinta años. Lo de Madrid de hace tres semanas fue solo eso: girar una llave.', siguiente: 'j4' },
      j4: { quien: 'julia', texto: 'Ewa, Marcos y yo sabemos cómo funciona esa llave. Somos los únicos que quedan fuera de la Orden. Por eso seguimos vivos.', efecto: { bandera: 'sabeLlave' }, siguiente: 'j5' },
      j5: { rama: [{ si: 'sabeQueHelDeja', ir: 'h1' }], siguiente: 'x1' },
      h1: { quien: 'elias', texto: 'Hel sabe que nos vamos esta noche. Lo he leído en el informe de Leif. «No intervenir. Dejar salir.»', siguiente: 'h2' },
      h2: { quien: 'mara', texto: 'Entonces nos vamos igual. Una puerta abierta sigue siendo una puerta. Ya pensaremos en el tren por qué estaba abierta.', siguiente: 'x1' },
      x1: { quien: 'olek', texto: 'Las diez menos cuarto. El tren de Kurt está en la vía muerta, detrás de la cantera. Cada uno sabe lo que tiene que hacer. Y si no lo sabe, que mire al de al lado.' }
    }
  },

  aspirantes: [],

  // ---------------- LA HUIDA ----------------
  misiones: [
    {
      id: 'sacarJulia',
      titulo: 'Sacar a Julia del barracón 4',
      desc: 'El barracón 4 tiene cerradura de la Cancillería y un guardia en la puerta. Julia tiene que estar en el tren a las 22:10.',
      habilidad: 'sigilo', base: 25,
      bonus: [{ si: 'llaveBarracon4', mas: 30 }, { si: 'juliaInfiltrada', mas: 30 }, { si: 'uniformesColonia', mas: 10 }, { si: 'brandtFoco', mas: 10 },
        { si: 'ritmoFoco', mas: 10 }, { si: 'traidorDentro_ilse', mas: -20 }],
      coste: {},
      recompensa: { bandera: 'juliaLibre' },
      fracasoEfecto: { bandera: 'juliaAHelios' },
      captura: 0,
      exito: 'La llave entra a la tercera. Julia ya está de pie, con el abrigo puesto. «Llegas tarde», dice. «Treinta y cuatro años tarde. Vamos.»',
      fracaso: 'Cuando {op} llega al barracón 4, la puerta está abierta y la litera de Julia, vacía. Un guardia dice que la Inspectora se la ha llevado en el coche negro hace una hora. A Helios. Antes que a nadie.'
    },
    {
      id: 'sacarIngenieros',
      titulo: 'Sacar a Ewa y a Marcos',
      desc: 'Los dos ingenieros de Lumen tienen que salir del recinto sin que los echen de menos hasta las seis.',
      habilidad: 'labia', base: 25,
      bonus: [{ si: 'ingenierosConvencidos', mas: 35 }, { si: 'ingenierosFueraLista', mas: 15 }, { si: 'ferrerComio', mas: 10 }, { si: 'maraYFerrer', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'ingenierosLibres' },
      fracasoEfecto: { bandera: 'ingenierosAHelios' },
      captura: 0,
      exito: 'Ewa Kowalczyk camina por la nieve con el paso de quien lleva años ensayándolo en la cabeza. Marcos Ferrer va detrás, apoyado en Mara.',
      fracaso: 'Ewa no se atreve. En el último momento se queda en la puerta del barracón, temblando, y Marcos no la deja sola. Mañana irán a Helios en el tren de las seis.'
    },
    {
      id: 'focoHuida',
      titulo: 'Apagar el foco de la torre',
      desc: 'Cuarenta segundos de oscuridad en la torre para cruzar la alambrada junto a la cantera.',
      habilidad: 'tecnica', base: 25,
      bonus: [{ si: 'brandtFoco', mas: 45 }, { si: 'ritmoFoco', mas: 20 }, { si: 'codigosColonia', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'focoApagado' },
      fracasoEfecto: { sospecha: 15, bandera: 'huidaVista' },
      captura: 0,
      exito: 'A las 22:00:00 el foco se para. Cuarenta segundos. La nieve, la alambrada y la cantera desaparecen en la oscuridad.',
      fracaso: 'El foco no se para. Hay que cruzar entre vuelta y vuelta, a ciegas, de once en once segundos. Alguien en la torre grita algo. Luego se calla.'
    },
    {
      id: 'barracon12Huida', si: 'promesaBarracon',
      titulo: 'Los treinta y dos del barracón 12',
      desc: 'Lo prometiste: «iremos todos o no irá nadie». Treinta y dos personas hasta un tren de carbón.',
      habilidad: 'fuerza', base: 25,
      bonus: [{ si: 'permisoBarracon12', mas: 25 }, { si: 'esconditeTren', mas: 20 }, { si: 'manifiestoFalsificado', mas: 10 }, { si: 'uniformesColonia', mas: 10 }],
      coste: {},
      recompensa: { red: 4, bandera: 'barracon12Libre' },
      fracasoEfecto: { bandera: 'barracon12Atrapado' },
      captura: 0,
      exito: 'Treinta y dos personas cruzan la nieve en fila, pisando las huellas del de delante, como cuando vuelven de la cantera. Esta vez van hacia otra parte.',
      fracaso: 'La mitad llega al tren. La otra mitad se queda atrás cuando la sirena empieza a sonar. Samira se queda con ellos. Dice que alguien tiene que curarlos.'
    },
    {
      id: 'losDeLaMesa',
      titulo: 'Los de las otras colonias',
      desc: 'Hans, Leo, Klaus, Brandt, Chispa... todos los que llegaron para Helios y conoces de algo. Que suban al tren.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'recluta_hansC', mas: 15 }, { si: 'chispaListo', mas: 10 }, { si: 'hansAyudado', mas: 5 }, { si: 'klausAyudado', mas: 5 }],
      coste: { suministros: 1 },
      recompensa: { red: 2, bandera: 'otrosLibres' },
      fracasoEfecto: { bandera: 'otrosAHelios' },
      captura: 0,
      exito: 'Uno a uno, los nombres de tu mesa suben al vagón de carbón. Hans va diciendo en voz baja el número de cada uno al pasar.',
      fracaso: 'No hay tiempo para todos. Los que se quedan os ven irse desde la alambrada. Nadie dice nada. Mañana irán a Helios.'
    }
  ],

  // ---------------- EL TREN ----------------
  despedida: {
    inicio: 'e0',
    nodos: {
      e0: { rama: [{ si: 'focoApagado', ir: 'e1a' }], siguiente: 'e1b' },
      e1a: { escena: 'colonia', texto: '22:00:00. El foco de la torre se para. Cuarenta segundos de oscuridad total. En la nieve, decenas de sombras echan a correr hacia la cantera.', siguiente: 'e2' },
      e1b: { escena: 'colonia', texto: '22:00. El foco sigue girando. Cuarenta y dos segundos por vuelta, once de oscuridad. Se corre de once en once segundos, tirándose al suelo cuando vuelve la luz.', siguiente: 'e2' },
      e2: { escena: 'trenNieve', texto: '22:14. La locomotora de Kurt arranca sin pitar. Detrás, la colonia se queda a oscuras, con su foco y sus mil doscientos internos.', siguiente: 'q0' },

      // --- Quién está en el tren ---
      q0: { rama: [{ si: 'juliaLibre', ir: 'q1' }], siguiente: 'q2' },
      q1: { escena: 'tren', texto: 'Julia va sentada sobre el carbón, con las manos en las rodillas, mirando por la rendija cómo se aleja la torre. No llora. Mira.', siguiente: 'q3' },
      q2: { escena: 'tren', texto: 'En el vagón no está Julia. Hel se la llevó una hora antes. A Helios. El tren va hacia el mismo sitio que ella, pero por otro camino.', siguiente: 'q3' },
      q3: { rama: [{ si: 'ingenierosLibres', ir: 'q4' }], siguiente: 'q5' },
      q4: { texto: 'Ewa Kowalczyk le da a Marcos Ferrer su bufanda. Marcos tiene en la mano la foto de una niña con un vestido de lunares.', siguiente: 'q6' },
      q5: { texto: 'Ewa y Marcos se han quedado en la colonia. Mañana a las seis irán a Helios en el tren de los presos. Allí estará también Julia. Allí estará todo.', siguiente: 'q6' },
      q6: { rama: [{ si: ['recluta_martaR', 'danielEncontrado', 'otrosLibres'], ir: 'q7' }], siguiente: 'q8' },
      q7: { texto: 'En una esquina del vagón, Marta Hessel abraza a un chico de veinte años que no sabe dónde poner las manos. No se dicen nada. Llevan dos años sin decirse nada.', siguiente: 'q8' },
      q8: { rama: [{ si: 'barracon12Libre', ir: 'q9' }, { si: 'barracon12Atrapado', ir: 'q10' }], siguiente: 's0' },
      q9: { quien: 'olek', texto: 'Treinta y dos. Los he contado dos veces. Nunca he dejado a nadie en un andén, archivero. Hoy tampoco.', siguiente: 's0' },
      q10: { quien: 'olek', texto: 'Dieciséis. Los otros dieciséis se han quedado. Y Samira con ellos. Dijo que alguien tenía que curarlos.', siguiente: 's0' },

      // --- Demasiado fácil ---
      s0: { quien: 'mara', texto: 'Ha sido demasiado fácil.', siguiente: 's1' },
      s1: { rama: [{ si: 'relojeroConGrupo', ir: 's2' }], siguiente: 's3' },
      s2: { quien: 'relojero', texto: 'Nos ha dejado salir. Lo sabía. Hel no deja nada al azar: si estamos en este tren es porque quiere que vayamos a algún sitio.', siguiente: 's3' },
      s3: { quien: 'kurt', texto: 'A Helios. Las vías de esta zona solo van a dos sitios: a las colonias o a la Ciudadela. Y antes, a través de la tierra de nadie.', siguiente: 'u0' },
      u0: { rama: [{ si: 'juliaLibre', ir: 'u1' }], siguiente: 'u4' },
      u1: { quien: 'julia', texto: 'Lo que hay en Helios lo construimos nosotros. Ewa, Marcos, yo. Y él.', siguiente: 'u2' },
      u2: { quien: 'elias', texto: '¿Él? ¿Quién es él?', siguiente: 'u3' },
      u3: { quien: 'julia', texto: 'Mañana. Esta noche déjame mirar la nieve. Hacía siete años que no la veía desde un sitio que se movía.', efecto: { bandera: 'julia_el' }, siguiente: 'z1' },
      u4: { quien: 'elias', pensamiento: true, texto: 'Vamos hacia el mismo sitio que mi madre. Hel lo sabe. Lo ha preparado así. Y aun así no hay otro camino.', siguiente: 'z1' },

      z1: { escena: 'trenNieve', texto: 'Al amanecer, la vía deja atrás las torres de vigilancia y entra en una llanura blanca sin cables, sin luces y sin nombre. La tierra de nadie.' }
    }
  }
};

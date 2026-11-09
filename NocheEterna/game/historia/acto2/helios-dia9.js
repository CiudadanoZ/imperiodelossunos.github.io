// ============================================================
//  ACTO 2 · DÍA 9 — «El asalto a Helios» (los dos caminos juntos)
//  Martes, 12 de febrero de 2041. 05:00. Formato ASALTO (ver js/asalto.js y historia/dia7.js).
//    escalera  subir de los talleres al nivel 0 (prueba)
//    sala      llegar a los pedestales con Hel delante (prueba)
//    roto      si fallan las dos, no se llega a la llave
//    armario   abrir el armario del CUSTODIO si no se abrió la víspera (prueba)
//    padre     solo camino B: el Canciller llega antes de hora
//    nombre    el nombre que se escribe en el custodio (la decisión)
//    calma     las dos manos en calma: girar la llave (prueba)
//  Finales: EL APAGÓN (custodio Julia) · LUZ PARA TODOS (nadie) · LUZ PROPIA (Madrid) ·
//           LA NOCHE VUELVE (custodia Hel, o la llave no gira).
// ============================================================

window.HELIOS_DIA9 = {
  numero: 9,
  titulo: 'DÍA 9',
  fecha: 'Martes, 12 de febrero de 2041 · El asalto a Helios',
  escena: 'helios',
  notaFinal: 'Fin del Capítulo 2 · Gracias por jugar',
  alFinal: (fin) => Juego.finCapitulo2(fin),

  fases: [
    // ---------------- LA ESCALERA DEL RÍO ----------------
    {
      id: 'escalera', hora: 4.95,
      guion: {
        inicio: 'a1',
        nodos: {
          a1: { escena: 'talleres', texto: '4:57. Los talleres están en silencio. Ni la bobina late. Treinta personas con monos que no son suyos esperan al pie de la escalera del río.', siguiente: 'a2' },
          a2: { rama: [{ si: 'calderasListas', ir: 'a3c' }], siguiente: 'a3' },
          a3c: { quien: 'ilyas', texto: 'A las cinco en punto, las calderas con sol de tiza bajan la presión. Noventa segundos sin cámaras y sin puertas. Ni uno más. Contad conmigo.', siguiente: 'a4' },
          a3: { quien: 'ilyas', texto: 'Hel ha quitado a los suyos de la escalera. Los demás guardias no lo saben. Para ellos somos lo que somos: terroristas con monos robados.', siguiente: 'a4' },
          a4: { quien: 'mara', texto: 'Arriba hay una sala con dos pedestales. Nadie se queda atrás, nadie se hace el héroe. Si alguien cae, se le dice el nombre en voz alta y se sigue subiendo.', siguiente: 'a5' },
          a5: { quien: 'elias', pensamiento: true, texto: 'Cinco de la mañana. A esta hora empezaba mi turno en la Sección 14. Hoy también voy a una mesa.' }
        }
      },
      prueba: {
        titulo: 'La escalera del río',
        desc: 'Subir de los talleres al nivel 0 antes de que la guardia de la Ciudadela entienda lo que pasa.',
        base: 30,
        bonus: [
          { si: 'calderasListas', mas: 20, texto: 'Noventa segundos de apagón en las calderas' },
          { si: 'torreCiega', mas: 15, texto: 'La torre 4 está ciega' },
          { si: 'monosNucleo', mas: 10, texto: 'Monos blancos de técnico del núcleo' },
          { si: 'planosNucleo', mas: 10, texto: 'Los planos del nivel 0' },
          { si: 'cuadrillaConNosotros', mas: 10, texto: 'La Cuadrilla 7 conoce los conductos' },
          { si: 'fogonerosAliados', mas: 5, texto: 'Los fogoneros miran hacia otro lado' },
          { si: 'otrosLibres', mas: 5, texto: 'Hans, Leo y los demás de tu mesa suben contigo' },
          { si: 'helSabeRuta', mas: -10, texto: 'La costurera de Ostra contó por dónde veníais' },
          { si: 'trenRetenido', mas: -5, texto: 'El tren de Kurt sigue precintado' }
        ],
        exito: {
          texto: 'Cuando vuelve la luz, ya están arriba. Un guardia del nivel 0 levanta la vista de su café y ve treinta monos blancos que no estaban ahí hace dos minutos.',
          efecto: { logros: 1 }
        },
        fracaso: {
          texto: 'La luz vuelve a los sesenta segundos. Alguien grita. En la escalera hay disparos. Ilyas se queda abajo, sujetando la puerta de hierro con el hombro, para que los demás sigan subiendo.',
          efecto: { bandera: ['precioAlto', 'ilyasCae'] }
        }
      }
    },

    // ---------------- LA SALA DE LA LLAVE ----------------
    {
      id: 'sala', hora: 5.1,
      guion: {
        inicio: 's1',
        nodos: {
          s1: { escena: 'salaLlave', texto: '5:06. La puerta de la Sala de la Llave está abierta. Dentro, el anillo de luz, los dos pedestales y la Inspectora Hel, de pie, con las manos a la espalda. Dos guardias. Solo dos.', siguiente: 's2' },
          s2: { quien: 'inspectora', texto: 'Puntuales. Los del Registro siempre lo son.', siguiente: 's3' },
          s3: { rama: [{ si: ['juliaAHelios', '!juliaRescatada'], ir: 's4j' }], siguiente: 's5' },
          s4j: { texto: 'Junto a la rejilla de la voz, con un guardia a cada lado, está Julia. Descalza. Le han quitado los zapatos para que no corra. Cuando ve a Elías, no sonríe. Cierra los ojos.', siguiente: 's5' },
          s5: { quien: 'inspectora', texto: 'Acérquense. Nadie les va a disparar. A ustedes no. Necesito sus manos tranquilas.' }
        }
      },
      prueba: {
        titulo: 'Los pedestales',
        desc: 'Llegar a los pedestales y al armario de detrás antes de que los guardias de Hel cierren el paso.',
        base: 25,
        bonus: [
          { si: 'calderasListas', mas: 15, texto: 'La segunda bajada de presión de las calderas' },
          { si: 'gretaSala', mas: 15, texto: 'Greta tiene pase a la Sala de la Llave' },
          { si: 'maraPase', mas: 10, texto: 'Mara está en la enfermería del núcleo, a veinte metros' },
          { si: 'relojeroPase', mas: 10, texto: 'El Relojero, en el reloj de la torre, encima de la sala' },
          { si: 'juliaPase', mas: 10, texto: 'Julia conoce el nivel 0 con fregona y cubo' },
          { si: 'juliaRescatada', mas: 10, texto: 'Julia va con vosotros, no con Hel' },
          { si: 'escaleraExito', mas: 10, texto: 'Habéis llegado arriba sin que nadie dé la alarma' },
          { si: 'alarmaArchivo', mas: -10, texto: 'La guardia del nivel 0 está avisada desde ayer' }
        ],
        exito: {
          texto: 'Mara derriba a uno de los guardias con una bandeja de la enfermería. El otro duda. Hel levanta una mano: «Quietos». Le interesa más la llave que su guardia.',
          efecto: { logros: 1 }
        },
        fracaso: {
          texto: 'Los guardias de Hel cierran el paso. Hay un forcejeo junto al pedestal. Mara cae con un golpe en la cabeza y no se levanta enseguida. Hel no mueve un músculo.',
          efecto: { bandera: ['precioAlto', 'maraHerida'] }
        }
      }
    },

    // ---------------- SI TODO FALLA ----------------
    {
      id: 'roto', si: ['escaleraFracaso', 'salaFracaso'],
      guion: {
        inicio: 'r1',
        nodos: {
          r1: { escena: 'salaLlave', texto: 'Llegan arriba demasiado pocos y demasiado tarde. La guardia de la Ciudadela llena el pasillo. Hel suspira, como quien ve romperse una taza que le gustaba.', siguiente: 'r2' },
          r2: { quien: 'inspectora', texto: 'Qué pena. Tendremos que intentarlo otra vez dentro de otros nueve años. Llévenselos. Al hijo, con cuidado.', efecto: { bandera: 'asaltoRoto' } }
        }
      }
    },

    // ---------------- EL ARMARIO DEL CUSTODIO ----------------
    {
      id: 'armario', si: ['!custodioAbierto', '!asaltoRoto'], hora: 5.2,
      guion: {
        inicio: 'c1',
        nodos: {
          c1: { escena: 'salaLlave', texto: 'Detrás de los pedestales, el armario de relés con su etiqueta: CUSTODIO. Anoche no se pudo abrir. Ahora, con Hel a cinco metros, hay que hacerlo con las manos que haya.' }
        }
      },
      prueba: {
        titulo: 'El armario del CUSTODIO',
        desc: 'Abrir el registro de relés de 2007 para poder escribir otro nombre en el momento del giro.',
        base: 20,
        bonus: [
          { si: 'planoLlaveGuardado', mas: 25, texto: 'El plano 14-B, doblado en el pecho' },
          { si: 'ingenierosLibres', mas: 20, texto: 'Ewa conoce el registro: lo diseñó Marcos' },
          { si: 'ingenierosAHelios', mas: 15, texto: 'Ewa y Marcos están en la sala, asignados a CORONA' },
          { si: 'gretaSala', mas: 15, texto: 'Greta ha hecho las pruebas de esta sala' },
          { si: 'planosNucleo', mas: 10, texto: 'Los planos del nivel 0' }
        ],
        exito: {
          texto: 'La puerta del armario cede con un chasquido. Dentro, una pantalla verde y una línea parpadeando: CUSTODIO: A. HEL. El cursor espera.',
          efecto: { bandera: 'custodioAbierto', logros: 1 }
        },
        fracaso: {
          texto: 'La cerradura no cede. La dibujó el mismo hombre que dibujó la llave, y lo hizo bien. En la pantalla del armario sigue escrito: CUSTODIO: A. HEL.'
        }
      }
    },

    // ---------------- CAMINO B: EL PADRE ----------------
    {
      id: 'padre', si: ['ramaColonia', '!asaltoRoto'], hora: 5.3,
      guion: {
        inicio: 'p1',
        nodos: {
          p1: { escena: 'salaLlave', texto: '5:18. Pasos en el pasillo que no deberían estar ahí todavía. El tren del Canciller ha llegado cuarenta minutos antes de hora.', siguiente: 'p2' },
          p2: { texto: 'Aldric Voss entra en la Sala de la Llave con su abrigo negro y sus dos escoltas. Es más bajo de lo que parece en las telepantallas. Más viejo. Mira los pedestales. Luego mira a Elías. Mucho rato.', siguiente: 'p3' },
          p3: { quien: 'voss', texto: 'Inspectora. Me dijo que había una sorpresa para el encendido. ¿Es esta?', siguiente: 'p4' },
          p4: { quien: 'voss', texto: 'Tienes las manos de tu madre. Y mis ojos. El conserje me dijo que habías muerto de neumonía. Le creí. Quería creerle.', siguiente: 'p5' },
          p5: { quien: 'inspectora', texto: 'Lo siento, Canciller. Ya no hace falta.', siguiente: 'p6' },
          p6: { texto: 'Los dos escoltas del Canciller giran a la vez. No hacia Elías. Hacia Voss.', siguiente: 'p7' },
          p7: {
            quien: 'elias', texto: '...',
            opciones: [
              { texto: 'Ponerte delante de él.', ir: 'p8a', efecto: { principios: 5, bandera: 'vossSalvado' } },
              { texto: 'No moverte.', ir: 'p8b', efecto: { principios: -5, bandera: 'vossMuertoDelante' } }
            ]
          },
          p8a: { texto: 'Elías da dos pasos y se pone entre los fusiles y su padre. Los escoltas se quedan quietos. No pueden disparar. Elías es la segunda mano: Hel lo necesita vivo y tranquilo.', siguiente: 'p9a' },
          p9a: { quien: 'inspectora', texto: 'Bajen las armas. ...Qué familia.', siguiente: 'p10a' },
          p10a: { quien: 'voss', texto: 'Elías.', siguiente: 'p11a' },
          p11a: { quien: 'elias', texto: 'No le salvo a usted. Le salvo de ella. Usted irá a juicio, como todos.' },
          p8b: { texto: 'Elías no se mueve. Dos disparos. Aldric Voss cae junto al pedestal de la mano, el que diseñó para sí mismo.', siguiente: 'p9b' },
          p9b: { quien: 'voss', texto: 'Elías... Voss... Aranda.', siguiente: 'p10b' },
          p10b: { quien: 'elias', pensamiento: true, texto: 'Mi nombre entero. El único que ha dicho alguna vez mi nombre entero ha sido él. Ahora. En el suelo. Me tiemblan las manos.' }
        }
      }
    },

    // ---------------- EL NOMBRE ----------------
    {
      id: 'nombre', si: '!asaltoRoto', hora: 5.4,
      guion: {
        inicio: 'n0',
        nodos: {
          n0: { escena: 'salaLlave', rama: [{ si: '!custodioAbierto', ir: 'h1' }, { si: 'ingenierosLibres', ir: 'n1e' }, { si: 'gretaSala', ir: 'n1g' }], siguiente: 'n1m' },
          n1e: { quien: 'ewa', texto: 'Estoy en el armario, Elías. El cursor está detrás del nombre de Hel. Dime un nombre. Uno.', siguiente: 'n2' },
          n1g: { quien: 'greta', texto: 'Estoy en el armario. El cursor está detrás del nombre de Hel. Dime un nombre. Uno. Y deprisa.', siguiente: 'n2' },
          n1m: { quien: 'mara', texto: 'Estoy delante del armario. Hay un cursor que parpadea detrás del nombre de Hel. Dime qué escribo, Elías.', siguiente: 'n2' },
          n2: { texto: 'Hel mira el armario abierto por primera vez. No grita. Solo cambia el peso de un pie al otro. Es lo más parecido al miedo que Elías le ha visto nunca.', siguiente: 'n3' },
          n3: { quien: 'julia', texto: 'Escríbelo, Elías: Julia Aranda. Que se apaguen ellos, para variar. Una noche. Una semana. Que sepan lo que es. Llevo treinta y tres años esperando esta rejilla.', siguiente: 'n4' },
          n4: { rama: [{ si: 'ramaCiudad', ir: 'n5a' }], siguiente: 'n5b' },
          n5a: { quien: 'elias', pensamiento: true, texto: 'Madrid lleva tres semanas a oscuras. Si escribo su nombre, Madrid tendrá la llave del mundo. Si escribo el de mi madre, el mundo de la Orden se queda a oscuras en febrero. Si no escribo ninguno...', siguiente: 'n6' },
          n5b: { quien: 'elias', pensamiento: true, texto: 'Si escribo Madrid, los nuestros tendrán la llave del mundo. Si escribo el nombre de mi madre, las ciudades de la Orden se quedan a oscuras en febrero. Si no escribo ninguno...', siguiente: 'n6' },
          n6: {
            quien: 'elias', texto: '...',
            opciones: [
              { texto: '«Nadie. Que la llave no sea de nadie.»', ir: 'o1', efecto: { bandera: 'custodioNadie' } },
              { texto: '«El Comité de la Ciudad Libre de Madrid.»', ir: 'o2', si: 'ramaCiudad', efecto: { bandera: 'custodioComite' } },
              { texto: '«Madrid. Los Insomnes.»', ir: 'o2', si: 'ramaColonia', efecto: { bandera: 'custodioComite' } },
              { texto: '«Julia Aranda.»', ir: 'o3', efecto: { bandera: 'custodioJulia' } }
            ]
          },
          o1: { quien: 'elias', texto: 'Nadie. Que nadie pueda volver a apagar una ciudad. Ni ella, ni nosotros, ni tú, mamá.', siguiente: 'q0' },
          o2: { quien: 'elias', texto: 'Madrid. Que la luz la tenga la gente que ha pasado tres semanas sin ella. Que la llave esté en una mesa donde se vota.', siguiente: 'q0' },
          o3: { quien: 'elias', texto: 'Julia Aranda.', siguiente: 'q3' },
          q0: { rama: [{ si: 'vinculo_julia>=4', ir: 'q1' }], siguiente: 'q2' },
          q1: { quien: 'julia', texto: '...Nadie. Como tú en aquella puerta. Sin apellido. Está bien, Elías. Está bien. Lo hago por ti, no por ellos.', efecto: { bandera: 'juliaAcepta' } },
          q2: { quien: 'julia', texto: 'No. No después de siete años en una cantera. No me pidas que lo haga tranquila.', efecto: { bandera: 'juliaNoAcepta' } },
          q3: { quien: 'julia', texto: 'Gracias, hijo.', efecto: { bandera: 'juliaAcepta' } },

          // --- sin el armario abierto ---
          h1: { quien: 'inspectora', texto: 'El armario está cerrado, archivero. Lo que giren aquí será mío. Pero Madrid tendrá luz en un minuto. Usted decide qué pesa más.', siguiente: 'h2' },
          h2: {
            quien: 'elias', texto: '...',
            opciones: [
              { texto: '«No la giramos.»', ir: 'h3a', efecto: { bandera: 'llaveNoGirada' } },
              { texto: '«La giramos igual. La gente no puede esperar más.»', ir: 'h3b', efecto: { bandera: 'custodioHel' } }
            ]
          },
          h3a: { quien: 'inspectora', texto: 'Respetable. Inútil, pero respetable. Llévenselos. Al hijo, con cuidado.' },
          h3b: { quien: 'inspectora', texto: 'Sabía que lo haría. Usted siempre ha mirado las caras.' }
        }
      }
    },

    // ---------------- LAS DOS MANOS ----------------
    {
      id: 'calma', si: ['!asaltoRoto', '!llaveNoGirada'], hora: 5.5,
      guion: {
        inicio: 'k1',
        nodos: {
          k1: { escena: 'salaLlave', texto: 'Julia acerca la boca a la rejilla. Elías pone la mano en la forma de la mano. Le viene exacta. La hicieron para él cuando tenía veinte meses.', siguiente: 'k2' },
          k2: { texto: 'En el pedestal se enciende una línea: «CALMA REQUERIDA: 2 / 2». Una llave que se gira con miedo no gira.' }
        }
      },
      prueba: {
        titulo: 'Las dos manos',
        desc: 'La voz de Julia y la mano de Elías, en calma a la vez. Si alguna tiembla, la llave no gira.',
        base: 30,
        bonus: [
          { si: 'custodioJulia', mas: 25, texto: 'Julia lleva treinta y tres años esperando este momento' },
          { si: 'juliaAcepta', mas: 10, texto: 'Julia está de acuerdo con el nombre' },
          { si: 'juliaNoAcepta', mas: -20, texto: 'Julia no está de acuerdo con el nombre' },
          { si: 'llamoMama', mas: 15, texto: '«Mamá»' },
          { si: 'relojeroJuliaPaz', mas: 10, texto: 'Julia y el Relojero, en paz' },
          { si: 'ultimaHoraJulia', mas: 5, texto: 'La última hora fue con ella' },
          { si: 'maraLunes', mas: 10, texto: 'Era lunes. Mara dejó de esperar' },
          { si: 'ultimaHoraMara', mas: 5, texto: 'La última hora fue con Mara' },
          { si: 'relojEnHora', mas: 5, texto: 'El reloj de San Ildefonso anda en tu bolsillo' },
          { si: 'eliasNiega', mas: 5, texto: '«No soy su hijo»' },
          { si: 'eliasAcepta', mas: 5, texto: '«Soy su hijo, y eso no cambia nada»' },
          { si: 'eliasDuda', mas: -5, texto: 'Todavía no sabes quién eres' },
          { si: 'principios>=60', mas: 10, texto: 'Tus principios siguen enteros' },
          { si: 'principios<30', mas: -15, texto: 'Has hecho demasiadas cosas que no querías hacer' },
          { si: ['custodioJulia', 'principios>=60'], mas: -10, texto: 'Tu mano no está de acuerdo con lo que has escrito' },
          { si: 'maraHerida', mas: -10, texto: 'Mara sigue en el suelo' },
          { si: 'vossMuertoDelante', mas: -15, texto: 'Tu padre acaba de morir a tus pies' },
          { si: 'vossEjecutado', mas: -5, texto: 'Tu padre murió ayer, con tu voto' },
          { si: ['juliaAHelios', '!juliaRescatada'], mas: -5, texto: 'Julia ha pasado la noche con los guardias de Hel' }
        ],
        exito: {
          texto: 'La línea del pedestal se pone verde: «CALMA: 2 / 2». Julia dice su código en voz baja, como una canción de cuna. El anillo de luz gira un cuarto de vuelta. Y la red entera del mundo obedece.',
          efecto: { logros: 1, bandera: 'llaveGirada' }
        },
        fracaso: {
          texto: 'La línea del pedestal se queda en rojo: «CALMA: 1 / 2». Una mano tiembla. Nadie sabe cuál. La llave no gira. En el pasillo, por fin, se oyen las botas de la guardia de la Ciudadela.',
          efecto: { bandera: 'llaveFallida' }
        }
      }
    }
  ],

  // ---------------- FINALES ----------------
  finales: [
    {
      id: 'apagon', si: ['custodioJulia', 'llaveGirada'],
      titulo: 'EL APAGÓN',
      subtitulo: 'Helios es de Julia Aranda. Y las ciudades de la Orden se quedaron a oscuras en pleno invierno.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'salaLlave', texto: '5:32. En la pantalla del armario: CUSTODIO: J. ARANDA. Julia no aparta la boca de la rejilla. Dice una lista de ciudades. Berlín. Viena. Varsovia. Praga. Una a una.', siguiente: 'x2' },
          x2: { escena: 'madridOscura', texto: 'En todo el continente, las ciudades de la Orden se apagan como velas en una corriente de aire. Los hospitales. Las estufas. Los ascensores de las torres. A doce grados bajo cero.', siguiente: 'x3' },
          x3: { quien: 'inspectora', texto: 'Enhorabuena, señora Aranda. Ha hecho usted lo que habría hecho él.', siguiente: 'x4' },
          x4: { texto: 'Hel sale de la sala por la puerta del archivo, con una caja de cartón bajo el brazo. Nadie la detiene. Todos están mirando a Julia.', efecto: { bandera: 'helHuye' }, siguiente: 'x5' },
          x5: { quien: 'elias', pensamiento: true, texto: 'Lo he escrito yo. Con mi letra de archivero. Llevo once años escribiendo nombres que deciden quién vive. Este es el más largo de todos.', siguiente: 'e1' },
          e1: { escena: 'amanecer', texto: 'Tres semanas después. La Orden ha caído en once ciudades. Nadie sabe todavía cuánta gente murió de frío para eso. Los números llegan despacio, como los de las colonias.', siguiente: 'e2' },
          e2: { quien: 'julia', texto: 'Ya está, Elías. Ya pueden volver a encenderse. Dime tú cuándo.', siguiente: 'e3' },
          e3: { quien: 'elias', pensamiento: true, texto: 'La llave sigue teniendo dueño. Mi madre. Y en algún sitio, Hel tiene una caja con la muestra de sangre de un niño de veinte meses.' }
        }
      }
    },
    {
      id: 'todos', si: ['custodioNadie', 'llaveGirada'],
      titulo: 'LUZ PARA TODOS',
      subtitulo: 'La llave no es de nadie. Y nadie podrá volver a apagar una ciudad.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'salaLlave', texto: '5:32. En la pantalla del armario: CUSTODIO: —. La llave gira un cuarto de vuelta y luego, sin que nadie la toque, sigue girando. Se suelta. Cae al suelo, con un ruido de cuchara.', siguiente: 'x2' },
          x2: { texto: 'La pantalla del armario se llena con una sola línea: RED SIN CENTRO. Cada ciudad tiene ya su propia luz, y nadie puede quitársela desde esta sala. Ni siquiera ellos.', siguiente: 'x3' },
          x3: { quien: 'inspectora', texto: '...Siempre alguien, archivero. Siempre hay alguien que se queda con la luz. Ya lo verá.', siguiente: 'x4' },
          x4: { texto: 'Hel sale de la sala por la puerta del archivo, con una caja de cartón bajo el brazo. En el caos, nadie la detiene.', efecto: { bandera: 'helHuye' }, siguiente: 'x5' },
          x5: { rama: [{ si: 'maraHerida', ir: 'x6h' }], siguiente: 'x6' },
          x6h: { quien: 'mara', texto: 'Me duele la cabeza. Dime que ha salido bien. Dímelo despacio.', siguiente: 'e1' },
          x6: { quien: 'mara', texto: 'Has escrito «nadie». En la casilla más importante del mundo. Eres el archivero más raro de la historia.', siguiente: 'e1' },
          e1: { escena: 'amanecer', texto: 'Martes, 12 de febrero. 7:40. Amanece. Y a la vez, en todas partes, se encienden las luces. En Madrid. En Ostra, por primera vez desde el Colapso. En los barracones de Este-1. Y en Berlín, y en Viena: también allí.', siguiente: 'e2' },
          e2: { rama: [{ si: 'ramaCiudad', ir: 'e3a' }], siguiente: 'e3b' },
          e3a: { quien: 'anselmo', texto: '¿Me oís? Se ha encendido todo. La Gran Vía. Las farolas. Las casas de los que nos odiaban y las de los que no. Esto no hay quien lo explique en el Comité. Ni falta que hace.', siguiente: 'e4' },
          e3b: { quien: 'kurt', texto: 'Dicen por la radio que en Madrid la gente ha salido a las ventanas. Sin telepantallas. Solo a mirar las bombillas. La Orden no sabe qué hacer con una ciudad que no puede apagar.', siguiente: 'e4' },
          e4: { rama: [{ si: 'juliaAcepta', ir: 'e5j' }], siguiente: 'e5n' },
          e5j: { quien: 'julia', texto: 'Nadie. Me ha costado treinta y tres años aprender esa palabra. Tú la aprendiste en una puerta con dos años.', siguiente: 'e6' },
          e5n: { quien: 'julia', texto: 'Lo has hecho a tu manera. No sé si te lo perdonaré. Pero has dicho mi nombre en esa sala y no lo has escrito. Eso también es algo.', siguiente: 'e6' },
          e6: { quien: 'elias', pensamiento: true, texto: 'Quien controla la luz, controla el mundo. Hoy no la controla nadie. Mañana veremos qué hace el mundo con eso.' }
        }
      }
    },
    {
      id: 'propia', si: ['custodioComite', 'llaveGirada'],
      titulo: 'LUZ PROPIA',
      subtitulo: 'Madrid tiene la llave de Helios. La luz vuelve a casa. Y el interruptor del mundo también.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'salaLlave', rama: [{ si: 'ramaCiudad', ir: 'x2a' }], siguiente: 'x2b' },
          x2a: { texto: '5:32. En la pantalla del armario: CUSTODIO: COMITÉ DE LA CIUDAD LIBRE (MADRID). La llave gira un cuarto de vuelta y se queda quieta. Obediente.', siguiente: 'x3' },
          x2b: { texto: '5:32. En la pantalla del armario: CUSTODIO: MADRID. La llave gira un cuarto de vuelta y se queda quieta. Obediente.', siguiente: 'x3' },
          x3: { quien: 'inspectora', texto: 'Una ciudad entera con la llave del mundo. Qué democrático. ¿Cuánto tardarán en votar a quién apagar?', siguiente: 'x4' },
          x4: { texto: 'Hel sale de la sala por la puerta del archivo, con una caja de cartón bajo el brazo. Nadie la detiene: todos miran la pantalla.', efecto: { bandera: 'helHuye' }, siguiente: 'e1' },
          e1: { escena: 'amanecer', texto: 'Martes, 12 de febrero. 7:40. Amanece sobre Madrid y Madrid tiene luz. Y Ostra. Y las colonias liberadas. Las ciudades de la Orden siguen encendidas: por ahora. Eso lo decide Madrid.', siguiente: 'e2' },
          e2: { rama: [{ si: 'ramaCiudad', ir: 'e3a' }], siguiente: 'e3b' },
          e3a: { quien: 'anselmo', texto: 'El Comité ha votado por primera vez qué ciudades tienen luz. Hemos votado todas. Esta vez. Me da miedo la palabra «esta».', siguiente: 'e4' },
          e3b: { quien: 'kurt', texto: 'En Madrid los Insomnes han tomado La Aguja sin disparar un tiro. Los guardias no pelean por una torre que puede quedarse a oscuras con una llamada.', siguiente: 'e4' },
          e4: { rama: [{ si: 'juliaAcepta', ir: 'e5j' }], siguiente: 'e5n' },
          e5j: { quien: 'julia', texto: 'Madrid. Me parece bien que sea Madrid. Yo le grité a esa ciudad durante años. Ahora que me conteste ella.', siguiente: 'e6' },
          e5n: { quien: 'julia', texto: 'Le has dado la llave a una sala llena de gente que hace tres semanas quería colgar a tu padre. Ya veremos qué hacen con ella.', siguiente: 'e6' },
          e6: { quien: 'elias', pensamiento: true, texto: 'He puesto la llave del mundo en una mesa donde se vota. Es lo mejor que conozco. No sé si es suficiente.' }
        }
      }
    },
    {
      id: 'helCustodia', si: ['custodioHel', 'llaveGirada'],
      titulo: 'LA NOCHE VUELVE',
      subtitulo: 'Madrid tiene luz. Y Helios tiene una nueva dueña.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'salaLlave', texto: '5:32. En la pantalla del armario: CUSTODIO: A. HEL. La llave gira. En algún sitio, muy lejos, Madrid se enciende.', siguiente: 'x2' },
          x2: { quien: 'inspectora', texto: 'Gracias, archivero. De verdad. Madrid tendrá luz mientras se porte bien. Usted se lo ha ganado.', siguiente: 'x3' },
          x3: { texto: 'La guardia de la Ciudadela entra en la sala. Hel les señala a todos menos a Elías. «A él, con cuidado. Puedo volver a necesitarle.»', siguiente: 'e1' },
          e1: { escena: 'madridOscura', texto: 'Semanas después, en Madrid, las luces se encienden a las seis y se apagan a las diez. Exactamente. Nadie en el Comité ha votado ese horario.', siguiente: 'e2' },
          e2: { quien: 'elias', pensamiento: true, texto: 'Elegí las caras de Madrid. Y le di el mundo a la persona que mejor sabía esperar. Sigo mirando.' }
        }
      }
    },
    {
      id: 'noche', si: null,
      titulo: 'LA NOCHE VUELVE',
      subtitulo: 'La llave no giró. Helios sigue en manos de la Orden. Pero alguien volverá a preguntar si recuerdas Madrid.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'salaLlave', rama: [{ si: 'llaveFallida', ir: 'x2f' }, { si: 'llaveNoGirada', ir: 'x2n' }], siguiente: 'x2r' },
          x2f: { texto: 'La llave no gira. La guardia de la Ciudadela entra en la sala. Hel mira la línea roja del pedestal con una pena que parece sincera.', siguiente: 'x3' },
          x2n: { texto: 'No giran la llave. La guardia de la Ciudadela entra en la sala. Hel no da la orden de disparar. No le hace falta.', siguiente: 'x3' },
          x2r: { texto: 'La guardia de la Ciudadela llena la escalera, el pasillo, la sala. Hel ni siquiera se quita los guantes.', siguiente: 'x3' },
          x3: { quien: 'inspectora', texto: 'Otra vez será. Yo sé esperar. Llévenselos. Al hijo y a la madre, con cuidado: que no les pase nada. Nunca.', siguiente: 'e1' },
          e1: { escena: 'madridOscura', texto: 'Madrid sigue a oscuras. Pero en los talleres de Helios, en las calderas, alguien sigue pintando soles de tiza. Los borran por la mañana. Vuelven a aparecer por la tarde.', siguiente: 'e2' },
          e2: { quien: 'elias', pensamiento: true, texto: 'Fallamos. Pero estuvimos a un cuarto de vuelta. Y ella necesita que yo esté tranquilo. Nunca lo voy a estar.' }
        }
      }
    }
  ],

  // ---------------- DESTINOS (pantalla final) ----------------
  destinos: [
    // La llave
    { si: ['custodioNadie', 'llaveGirada'], texto: 'La red Helios ya no tiene custodio. Ninguna ciudad del mundo puede volver a apagarse desde una sala.' },
    { si: ['custodioComite', 'llaveGirada'], texto: 'Madrid es custodia de Helios. Cada mes, su Comité vota qué ciudades tienen luz. De momento, todas.' },
    { si: ['custodioJulia', 'llaveGirada'], texto: 'Julia Aranda es la custodia de Helios. Las ciudades de la Orden pasaron diecinueve días a oscuras.' },
    { si: ['custodioHel', 'llaveGirada'], texto: 'Adela Hel es la custodia de Helios. Madrid tiene luz de seis a diez. Exactamente.' },
    { si: '!llaveGirada', texto: 'Helios sigue en manos de la Orden. Madrid sigue a oscuras.' },
    // Elías
    { si: ['llaveGirada', 'eliasNiega'], texto: 'Elías firma como Elías Aranda. Cuando alguien le llama Voss, no se gira.' },
    { si: ['llaveGirada', 'eliasAcepta'], texto: 'Elías sabe que se llamó Elías Voss Aranda. Lo dice sin bajar la voz.' },
    { si: ['llaveGirada', '!eliasNiega', '!eliasAcepta'], texto: 'Elías todavía no sabe qué apellido poner. En los papeles nuevos deja la casilla en blanco.' },
    { si: '!llaveGirada', texto: 'Elías está en una celda de Helios con luz eléctrica las veinticuatro horas. Hel le visita los martes.' },
    // Julia
    { si: ['juliaAcepta', 'llaveGirada', '!custodioJulia'], texto: 'Julia Aranda volvió a la radio. Ya no grita. Pregunta.' },
    { si: ['juliaNoAcepta', 'llaveGirada'], texto: 'Julia Aranda no habla con su hijo desde aquella mañana. Le escucha por la radio cada noche.' },
    { si: ['custodioJulia', 'llaveGirada'], texto: 'Julia volvió a encender las ciudades de la Orden a los diecinueve días. Nadie le ha pedido perdón. Ella tampoco.' },
    { si: '!llaveGirada', texto: 'Julia Aranda vuelve a ser la interna 2033-114. No dejar morir.' },
    // Mara
    { si: ['maraLunes', 'llaveGirada'], texto: 'Mara y Elías llegaron a otro lunes. Y a otro.' },
    { si: ['maraHerida', 'llaveGirada'], texto: 'Mara tiene una cicatriz nueva, al lado de la de la ceja. Dice que hacen juego.' },
    { si: ['llaveGirada', '!maraLunes', '!maraHerida'], texto: 'Mara Solís dirige el primer hospital de Madrid que no se apaga nunca.' },
    { si: '!llaveGirada', texto: 'Mara Solís escapó por los conductos del río. Desde algún sótano, sigue preguntando si alguien recuerda Madrid.' },
    // El Relojero
    { si: ['relojeroConGrupo', 'relojEnHora'], texto: 'Tobías Grau arregla el reloj de la torre de Helios. Dice que va dos minutos adelantado, como debe ir un reloj.' },
    { si: ['relojeroConGrupo', '!relojEnHora'], texto: 'Tobías Grau volvió a la Calle del Reloj, 7. Julia le manda una postal cada mes. Sin firma.' },
    { si: 'relojeroMuerto', texto: 'En la tumba de Tobías Grau, en la Almudena, alguien ha dejado un reloj en marcha.' },
    // Voss
    { si: 'vossEjecutado', texto: 'Aldric Voss fue ejecutado en Madrid el 11 de febrero. Preguntó si había llamado el archivero.' },
    { si: ['ramaCiudad', '!vossEjecutado'], texto: 'Aldric Voss sigue en su celda del Distrito 1. Elías fue a leerle el anexo en voz alta. No dijeron nada más.' },
    { si: 'vossSalvado', texto: 'Aldric Voss sobrevivió a su propia escolta. Será juzgado en Madrid. Pidió que su hijo no testifique.' },
    { si: 'vossMuertoDelante', texto: 'Aldric Voss murió en la Sala de la Llave, junto al pedestal que diseñó para su propia mano.' },
    // Hel
    { si: 'helHuye', texto: 'Adela Hel salió de Helios con una caja de cartón. Dentro iba la muestra de sangre de un niño de veinte meses.' },
    // Los demás
    { si: 'ilyasCae', texto: 'Ilyas sujetó la puerta de la escalera del río. En la caldera 11 hay un sol de tiza que nadie borra.' },
    { si: ['fogonerosAliados', '!ilyasCae', 'llaveGirada'], texto: 'Ilyas y los fogoneros duermen ahora en el anillo interior. Con luz.' },
    { si: ['gretaDentro', 'llaveGirada'], texto: 'Greta Lang enseña a los nuevos técnicos de Helios. Les pide que miren las caras.' },
    { si: ['ingenierosLibres', 'llaveGirada'], texto: 'Ewa Kowalczyk y Marcos Ferrer reescriben los planos de la red. El plano 14-B ya no existe.' },
    { si: ['b12EnOstra', 'llaveGirada'], texto: 'En Ostra hay luz por primera vez desde el Colapso. Olek tiene una estación. Wanda, una puerta que ya no hace falta cerrar.' },
    { si: ['martaSeQueda'], texto: 'Marta y Daniel Hessel viven en Ostra. Él arregla agujas. Ella las cuenta.' },
    { si: ['luzMadrid'], texto: 'En el Hospital Central de Madrid hay una placa: «4 horas. 10 de febrero de 2041».' }
  ]
};

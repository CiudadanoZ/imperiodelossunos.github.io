// ============================================================
//  ACTO 2 · NOCHE 7 — «Los que hacen la luz»
//  Los talleres bajo el anillo exterior. Ilyas y los fogoneros de Helios.
//  Elías cuenta lo de «44-190-V»: la llave tiene dos manos (Julia, Ewa o Greta lo explican a medias).
//  El archivo de Lumen está en el nivel 0: mañana entrará con la orden que él mismo selló.
//  Camino A con ejecución en pie: la última llamada de Anselmo antes del amanecer.
// ============================================================

window.HELIOS_NOCHE7 = {
  numero: 7,
  subtitulo: 'Los que hacen la luz',
  escenaLlegada: 'talleres',
  etiqueta: 'HELIOS · TALLERES',
  refugio: 'talleres',
  operativos: ['elias', 'mara', 'kurt', 'ilyas', { id: 'tobias', si: 'relojeroConGrupo' }, { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] },
    { id: 'julia', si: 'juliaLibre' }, { id: 'greta', si: 'gretaDentro' }, { id: 'ewa', si: 'ingenierosLibres' },
    { id: 'hansC', si: 'otrosLibres' }, { id: 'brandtC', si: 'otrosLibres' }, { id: 'leoC', si: 'otrosLibres' },
    { id: 'martaR', si: 'martaSigue' }, 'leif'],
  nuevosOperativos: [
    { id: 'ilyas', nombre: 'Ilyas', papel: 'Fogonero', habilidades: { fuerza: 2, tecnica: 2, labia: 1 }, esencial: true },
    { id: 'greta', nombre: 'Greta', papel: 'Técnica de Helios', habilidades: { tecnica: 3, labia: 1 }, si: 'gretaDentro' },
    { id: 'ewa', nombre: 'Ewa', papel: 'Ingeniera de Lumen', habilidades: { tecnica: 3, labia: 1 }, esencial: true, si: 'ingenierosLibres' }
  ],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'talleres', texto: '21:00. Bajo el anillo exterior, donde no llega la luz que se fabrica arriba. Literas, tuberías y una bobina al fondo que late como un corazón enfermo.', siguiente: 'n2' },
      n2: { quien: 'ilyas', texto: 'Ilyas. Dieciséis años echando carbón a las calderas auxiliares. Aquí abajo somos cuatro mil. Hacemos la luz de medio mundo y dormimos a oscuras. Kurt dice que tú sabes leer papeles. Siéntate.', siguiente: 'c0' },

      // --- Los de la Cuadrilla 7 ---
      c0: { rama: [{ si: ['otrosAHelios', 'otrosProtegidos'], ir: 'c1' }, { si: 'otrosAHelios', ir: 'c3' }], siguiente: 'r0' },
      c1: { texto: 'A las diez bajan los de la Cuadrilla 7, con la cara negra de los conductos del río. No de las bobinas. Alguien ha cambiado una línea en una orden.', siguiente: 'c2' },
      c2: { rama: [{ si: 'hansReubicado', ir: 'c2h' }], siguiente: 'r0' },
      c2h: { quien: 'hans', texto: 'NB-1412-M. Mi expediente. Lo sellaste tú en noviembre. Hoy has sellado otro y me has quitado de las bobinas. Estamos en paz, Vogt. Y me sé de memoria los planos de los conductos.', siguiente: 'r0' },
      c3: { texto: 'A las diez, la Cuadrilla 7 pasa en fila hacia la escalera de las bobinas. Nadie la ha quitado de allí. Quince caras. Algunas, Elías las ha visto antes en su mesa.', siguiente: 'r0' },

      // --- La radio ---
      r0: { rama: [{ si: ['ramaCiudad', 'luzMadrid'], ir: 'r1' }, { si: ['ramaColonia', 'calorColonia'], ir: 'r3' }], siguiente: 'v0' },
      r1: { quien: 'anselmo', texto: '¿Me oís? A las seis de la tarde se ha encendido el Hospital Central. Y media calle del Distrito 9. Cuatro horas. La gente ha salido a la calle a mirar las bombillas. ¿Has sido tú, archivero?', siguiente: 'r2' },
      r2: { quien: 'elias', pensamiento: true, texto: 'Una línea en una orden. Cuatro horas. Media calle. Es lo más grande que he hecho nunca con un sello.', efecto: { principios: 4 }, siguiente: 'v0' },
      r3: { quien: 'kurt', texto: 'Mensaje de Samira por la frecuencia de los ferroviarios: en Este-1 han vuelto a encender las estufas de los barracones. Y la guardia ha pasado la noche tiritando. Dice que no sabe quién ha sido, pero que se lo imagina.', efecto: { principios: 4 }, siguiente: 'v0' },

      // --- 44-190-V ---
      v0: { quien: 'elias', texto: 'Hoy he sellado una orden para calibrar el lector de la Sala de la Llave. «Segunda mano. Perfil de sucesión 44-190-V.» Es mi número de ciudadano.', siguiente: 'v1' },
      v1: { rama: [{ si: 'juliaLibre', ir: 'j1' }, { si: 'ingenierosLibres', ir: 'w1' }, { si: 'gretaDentro', ir: 'g1' }], siguiente: 'e1' },

      j1: { texto: 'Julia se queda blanca. Deja la taza en el suelo, muy despacio, como si pesara mucho.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Catorce B. La llave tiene dos manos, Elías. La primera es una voz: un código que solo sé decir yo. La segunda era una mano de sangre: la suya. Lo diseñamos así para que nadie pudiera usarla solo.', efecto: { bandera: 'sabeDosManos' }, siguiente: 'j3' },
      j3: { quien: 'julia', texto: 'Y si tu número está en ese lector, es que él hizo lo que me juró que no haría. No te lo voy a contar yo. Mañana, si entras en el archivo de Lumen, lo leerás con su letra. Así no tendrás que creerme a mí.', siguiente: 'a1' },

      w1: { quien: 'ewa', texto: 'Catorce B. El interruptor central. Dos manos: la voz de Julia y la sangre de Aldric. Ninguna de las dos sirve sola. Y si Aldric faltaba...', efecto: { bandera: 'sabeDosManos' }, siguiente: 'w2' },
      w2: { quien: 'ewa', texto: 'No. Eso lo firmó él solo, y no seré yo quien te lo diga. Está en el archivo de Lumen, en el nivel 0. Si quieres saberlo, léelo con tus ojos.', siguiente: 'a1' },

      g1: { quien: 'greta', texto: 'Yo he estado en esa sala. Hay dos pedestales. Uno tiene una rejilla para hablar. El otro tiene la forma de una mano. Y al lado, una puerta cerrada que pone «Fundación Lumen · Archivo».', efecto: { bandera: 'sabeDosManos' }, siguiente: 'a1' },

      e1: { quien: 'elias', pensamiento: true, texto: '«Primera mano.» La orden de mi madre. «Segunda mano.» La orden con mi número. Un archivero sabe cuándo dos documentos hablan del mismo expediente.', efecto: { bandera: 'sabeDosManos' }, siguiente: 'a1' },

      // --- El archivo ---
      a1: { quien: 'ilyas', texto: 'El archivo de Lumen está en el nivel 0, pegado a la Sala de la Llave. Nadie entra ahí. Pero tú has sellado una orden de mantenimiento para esa sala. Con tu propio número. Nadie para a un técnico que lleva su propia orden.', siguiente: 't0' },

      // --- El Relojero y la Sección de Linaje ---
      t0: { rama: [{ si: 'relojeroConGrupo', ir: 't1' }], siguiente: 'x1' },
      t1: { quien: 'relojero', texto: 'Una cosa más. En 2032, cuando cambié tu apellido, el Proyecto Semilla tenía una Sección de Linaje. La dirigía una funcionaria muy joven que ya entonces tenía el pelo blanco.', siguiente: 't2' },
      t2: { quien: 'relojero', texto: 'Revisó mi ficha falsa durante una hora. Luego la selló sin decir nada. Yo pensé que había tenido suerte. Llevo nueve años pensando que tuve suerte.', efecto: { bandera: 'pistaLinaje' }, siguiente: 'x1' },

      x1: { quien: 'ilyas', texto: 'Esta noche se trabaja. Mañana tú lees. Y pasado mañana, a las cinco, ya veremos quién controla la luz.' }
    }
  },

  aspirantes: [],

  misiones: [
    {
      id: 'fogoneros',
      titulo: 'Los cuatro mil de abajo',
      desc: 'Ilyas responde por su cuadrilla. Los demás fogoneros no conocen a Elías. Hay que convencerlos, turno a turno, de que esta vez no es otra promesa.',
      habilidad: 'labia', base: 30,
      bonus: [{ si: 'luzMadrid', mas: 10 }, { si: 'calorColonia', mas: 10 }, { si: 'otrosProtegidos', mas: 10 }, { si: 'vozDeVuelta', mas: 10 }],
      coste: {},
      recompensa: { red: 3, bandera: 'fogonerosAliados' },
      captura: 0,
      exito: 'A las tres, en las calderas 9 a 14, los fogoneros tienen una tiza en el bolsillo. Mañana, quien esté con vosotros pintará un sol pequeño en su caldera.',
      fracaso: 'Ilyas vuelve negando con la cabeza. La mitad os apoya. La otra mitad esperará a ver quién gana.'
    },
    {
      id: 'planosNucleo',
      titulo: 'Los planos del nivel 0',
      desc: 'Copiar los planos de la Sala de la Llave y del archivo de Lumen: puertas, conductos, armarios de relés.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'planoHelios', mas: 20 }, { si: 'gretaDentro', mas: 20 }, { si: 'turnosAnillo', mas: 10 }, { si: 'hansReubicado', mas: 5 }],
      coste: {},
      recompensa: { intel: 2, bandera: 'planosNucleo' },
      captura: 0,
      exito: '{op} vuelve con tres hojas de papel de calco. La Sala de la Llave, el archivo y, detrás, un armario de relés con una etiqueta: «CUSTODIO».',
      fracaso: '{op} solo consigue el plano del pasillo. Lo que hay detrás de la Sala de la Llave sigue siendo una pared en blanco.'
    },
    {
      id: 'monos',
      titulo: 'Monos de técnico del núcleo',
      desc: 'En el nivel 0 solo entran técnicos con mono blanco. La lavandería del anillo interior cierra a medianoche.',
      habilidad: 'sigilo', base: 40,
      bonus: [{ si: 'maraPase', mas: 15 }, { si: 'juliaPase', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'monosNucleo' },
      captura: 0,
      exito: 'Seis monos blancos, recién planchados, con la tarjeta de técnico cosida en el pecho. Uno es de la talla de Elías. Casi.',
      fracaso: 'La lavandería estaba cerrada con candado nuevo. Mañana habrá que entrar en el nivel 0 con el mono gris de los talleres.'
    },
    {
      id: 'cuadrilla7', si: 'otrosAHelios',
      titulo: 'La Cuadrilla 7',
      desc: 'Quince internos de Este-1 que conocen los conductos del núcleo. Si se unen, el asalto tiene quince pares de manos más.',
      habilidad: 'labia', base: 35,
      bonus: [{ si: 'otrosProtegidos', mas: 30 }, { si: 'hansReubicado', mas: 10 }],
      coste: {},
      recompensa: { red: 2, bandera: 'cuadrillaConNosotros' },
      captura: 0,
      exito: 'Los quince dicen que sí. Uno pregunta si después habrá un tren de vuelta. {op} le dice que sí. No sabe si es verdad.',
      fracaso: 'Están demasiado cansados para creer en nada. Algunos vendrán. Otros dormirán.'
    },
    {
      id: 'torre4',
      titulo: 'Cegar la torre 4',
      desc: 'La torre 4 vigila la escalera del río, el camino más corto de los talleres al núcleo. Cegarla para el martes a las cinco.',
      habilidad: 'tecnica', base: 25,
      bonus: [{ si: 'planoHelios', mas: 25 }, { si: 'turnosAnillo', mas: 15 }, { si: 'helSabeRuta', mas: -15 }],
      coste: {},
      recompensa: { bandera: 'torreCiega' },
      captura: 0,
      exito: 'Un fusible fundido en el foco de la torre 4, «por el frío». El parte de avería no se revisará hasta el miércoles.',
      fracaso: 'La torre 4 tiene un guardia nuevo, y el guardia nuevo no duerme. Alguien se ha ocupado de que esa torre esté despierta.'
    },
    {
      id: 'mensajeJulia', si: 'juliaAHelios',
      titulo: 'Un mensaje para la interna 2033-114',
      desc: 'Julia está en una celda del nivel 0, a la espera del día 12. Hacerle llegar un papel. Y traer otro de vuelta.',
      habilidad: 'sigilo', base: 20,
      bonus: [{ si: 'gretaDentro', mas: 25 }, { si: 'ingenierosAHelios', mas: 10 }, { si: 'maraPase', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'juliaContactada' },
      captura: 0,
      exito: 'El papel vuelve doblado en cuatro, con una sola línea a lápiz: «Sé lo que hay en el lector. No vengas. Te quiero». Es la letra del margen de los planos de Lumen.',
      fracaso: '{op} no pasa del segundo control. Julia pasará otra noche sola, sin saber que estáis aquí.'
    }
  ],

  despedida: {
    inicio: 'd0',
    nodos: {
      d0: { rama: [{ si: 'fogonerosAliados', ir: 'd1' }], siguiente: 'd2' },
      d1: { escena: 'talleres', texto: 'A las cuatro, en la caldera 11, alguien ha pintado con tiza un sol pequeño. Luego otro, en la 12. Luego, en todas.', siguiente: 'd2' },
      d2: { rama: [{ si: ['ramaCiudad', 'ejecucionFirme'], ir: 'q1' }], siguiente: 'z1' },

      // --- La última llamada de Anselmo ---
      q1: { quien: 'anselmo', texto: 'Archivero. Son las cinco. A las siete sacan a Voss al patio. Te llamo porque te lo prometí. Esta vez no te pregunto. Solo te aviso.', siguiente: 'q2' },
      q2: { quien: 'elias', pensamiento: true, texto: 'Hel ha escrito «no intervenir». Hel quiere a mi padre muerto. Si muere, yo soy la única segunda mano que queda en el mundo.', siguiente: 'q3' },
      q3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Que se cumpla.»', ir: 'q4a', efecto: { principios: -4, bandera: 'ejecucionUltima' } },
          { texto: '«Paradlo. Hel lo quiere muerto. No le demos lo que quiere.»', ir: 'q4b', efecto: { principios: 4, bandera: 'ejecucionParada' } }
        ]
      },
      q4a: { quien: 'anselmo', texto: 'Entendido. No te llamaré para contártelo. Lo sabrás igual.', siguiente: 'z1' },
      q4b: { quien: 'anselmo', texto: '¿Hel? ¿Qué tiene que ver Hel? ...No me lo expliques. Te creo. Voy a tener que explicárselo yo a medio Madrid. Lo paro.', siguiente: 'z1' },

      z1: { escena: 'helios', texto: 'Lunes. 5:30. La Ciudadela sigue encendida, como todas las noches desde 2030. En algún sitio de ese resplandor hay un archivo con el nombre de Elías escrito tres veces.', siguiente: 'z2' },
      z2: { quien: 'elias', pensamiento: true, texto: 'Mañana leeré quién soy en los papeles de otros. Como siempre. Como he hecho con todo el mundo durante once años.' }
    }
  }
};

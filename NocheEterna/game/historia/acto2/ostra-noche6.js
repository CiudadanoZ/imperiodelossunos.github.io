// ============================================================
//  ACTO 2 · NOCHE 6 — «El corazón de Lumen»
//  La estación de Ostra. La radio de Kurt (A: Madrid y la ejecución · B: Voss anuncia que irá a Helios).
//  Alguien confirma lo que dice el periódico: Julia, si está; si no, el Relojero; si no, Ewa; si no, nadie.
//  Las operaciones preparan el Día 7: el cambio de agujas, el plano del anillo, la espía de Hel, Greta, la Voz.
// ============================================================

window.OSTRA_NOCHE6 = {
  numero: 6,
  subtitulo: 'El corazón de Lumen',
  escenaLlegada: 'ostra',
  etiqueta: 'OSTRA · TIERRA DE NADIE',
  refugio: 'puestoOstra',
  operativos: ['elias', 'mara', 'olek', { id: 'samira', si: '!barracon12Atrapado' }, { id: 'tobias', si: 'relojeroConGrupo' },
    { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] }, 'kurt', 'martaR', 'leif',
    { id: 'hansC', si: 'otrosLibres' }, { id: 'brandtC', si: 'otrosLibres' }, { id: 'leoC', si: 'otrosLibres' },
    { id: 'julia', si: 'juliaLibre' }, { id: 'piotr', si: 'desertorDentro' }],
  nuevosOperativos: [
    { id: 'julia', nombre: 'Julia', papel: 'La Voz de Madrid', habilidades: { labia: 3, tecnica: 2 }, esencial: true, si: 'juliaLibre' },
    { id: 'piotr', nombre: 'Piotr', papel: 'Desertor', habilidades: { sigilo: 2, fuerza: 1 }, si: 'desertorDentro' }
  ],

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'hemerotecaQuemada', ir: 'n1q' }], siguiente: 'n1' },
      n1q: { escena: 'ostra', texto: '21:00. En todas las ventanas de Ostra arde papel. Veintiséis años de noticias calientan seis mil manos. Huele a tinta quemada.', siguiente: 'n2' },
      n1: { escena: 'ostra', texto: '21:00. Ostra a oscuras. Las chimeneas de lata echan un humo fino que se pierde en la nieve. En la estación, Kurt ha encendido la radio de la locomotora.', siguiente: 'n2' },
      n2: { rama: [{ si: 'zielinski_rechazar', ir: 'n3z' }], siguiente: 'r0' },
      n3z: { texto: 'En el bolsillo de Elías hay dos papeles doblados: el periódico de Bogdan y los turnos del anillo de Helios que dejó el desertor al irse. Uno pesa más que el otro.', efecto: { bandera: 'turnosAnillo' }, siguiente: 'r0' },

      // --- La radio ---
      r0: { rama: [{ si: 'ramaCiudad', ir: 'ra1' }], siguiente: 'rb1' },

      ra1: { quien: 'anselmo', texto: '¿Me oís? Aquí Madrid. Sigue a oscuras. Sigue en pie. Casi.', siguiente: 'ra2' },
      ra2: { rama: [{ si: 'ejecucionConfirmada', ir: 'rx1' }], siguiente: 'rv1' },
      rx1: { quien: 'anselmo', texto: 'Está todo preparado para el lunes al amanecer. En el patio de la cárcel del Distrito 1. Solo te llamo porque lo dijiste tú, y quería oírtelo decir otra vez.', siguiente: 'rx2' },
      rx2: { quien: 'elias', pensamiento: true, texto: 'El lunes. Al amanecer. Tengo su cara en el bolsillo, al lado del corazón, doblada en cuatro.', siguiente: 'rx3' },
      rx3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Seguid adelante. No ha cambiado nada.»', ir: 'rx4a', efecto: { principios: -6, bandera: 'ejecucionFirme' } },
          { texto: '«Suspendedla. Tengo que hablar con él antes.»', ir: 'rx4b', efecto: { principios: 4, bandera: ['ejecucionSuspendida', 'quiereHablarVoss'] } },
          { texto: '«...Ya no me corresponde a mí decidirlo.»', ir: 'rx4c', efecto: { principios: 2, bandera: 'ejecucionEnManosComite' } }
        ]
      },
      rx4a: { quien: 'anselmo', texto: 'Entendido. Hay algo en tu voz que no estaba el otro día, archivero. No sé qué es. No voy a preguntar.', siguiente: 'c0' },
      rx4b: { quien: 'anselmo', texto: '¿Hablar con él? La ciudad va a decir que te has ablandado lejos de casa. Pero la ciudad ya ha dicho cosas peores. Se suspende.', siguiente: 'c0' },
      rx4c: { quien: 'anselmo', texto: 'Entonces se vota otra vez. Sin ti. Que conste que es la primera vez que te oigo no querer un sello.', siguiente: 'c0' },

      rv1: { quien: 'anselmo', texto: 'Una cosa rara. Voss ha pedido papel y lápiz. Ha escrito una sola línea y ha pedido que te la leamos a ti. Solo a ti.', siguiente: 'rv2' },
      rv2: { quien: 'anselmo', texto: 'Dice: «Cuando sepas quién es el hombre de la foto, ven a verme. Tengo algo que te pertenece».', siguiente: 'rv3' },
      rv3: { quien: 'elias', pensamiento: true, texto: '«Cuando sepas.» No «si sabes». Lo sabía en La Aguja. Lo sabía en el juicio. Lo sabía cuando dije el nombre de mi madre delante de él.', efecto: { bandera: 'mensajeVoss' }, siguiente: 'c0' },

      rb1: { quien: 'kurt', texto: 'Escuchad. No es Madrid. Es la frecuencia de la Orden.', siguiente: 'rb2' },
      rb2: { quien: 'voss', texto: 'Ciudadanos. El martes, día doce, la Red Helios se encenderá entera por primera vez. Toda Europa, una sola luz. Yo mismo estaré en la Ciudadela para verlo.', siguiente: 'rb3' },
      rb3: { quien: 'voss', texto: 'Hace treinta y cuatro años, alguien quiso que Lumen no se encendiera nunca. Se equivocaba. La luz siempre encuentra el camino a casa.', siguiente: 'rb4' },
      rb4: { quien: 'elias', pensamiento: true, texto: 'Treinta y cuatro años. Lo dice por la radio, a todo el continente. Y me lo está diciendo a mí.', efecto: { bandera: 'vossAHelios' }, siguiente: 'c0' },

      // --- La confirmación ---
      c0: { rama: [{ si: 'juliaLibre', ir: 'j1' }, { si: 'relojeroConGrupo', ir: 'r1' }, { si: 'ingenierosLibres', ir: 'w1' }], siguiente: 'z1' },

      j1: { escena: 'puestoOstra', texto: 'Julia está sentada en el andén, junto a una estufa hecha con un bidón. Ha guardado sitio a su lado. Ha guardado sitio a su lado toda la noche.', siguiente: 'j2' },
      j2: { quien: 'elias', texto: 'He visto la foto entera.', siguiente: 'j3' },
      j3: { quien: 'julia', texto: 'Ya lo sé. Te he visto verla. Tienes la misma cara que pongo yo cuando leo algo que ya sabía.', siguiente: 'j4' },
      j4: { quien: 'julia', texto: 'Sí. Aldric Voss es tu padre.', efecto: { bandera: 'padreConfirmado' }, siguiente: 'j5' },
      j5: { quien: 'julia', texto: 'En 2005 no era el de las telepantallas. Era un ingeniero de treinta y tantos que quería encender Europa con espejos y viento. Hablaba de la luz como otros hablan de Dios. Yo tenía veinticinco años. Me lo creí todo. Él también.', siguiente: 'j6' },
      j6: { quien: 'julia', texto: 'En 2008 encontré la llave maestra en los planos. No era un fallo: la había dibujado él, de su puño y letra. Firmé mi salida del proyecto. Él no me dejó salir.', siguiente: 'j7' },
      j7: { quien: 'julia', texto: 'Así que me fui sin permiso. Contigo. Y te dejé en la puerta de San Ildefonso sin apellido. Un Voss no se pierde, Elías. Con su apellido te habría encontrado en una semana.', siguiente: 'j8' },
      j8: { quien: 'julia', texto: 'Lo de «no dejar morir» de mi ficha no era piedad. Era que yo era la única que sabía dónde te había dejado. Y yo ya no lo sabía. Me aseguré de no saberlo.', siguiente: 'j9' },
      j9: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«¿Por qué no me lo dijiste en la colonia?»', ir: 'j10a' },
          { texto: '«Me buscó. En 2032. Preguntó por mí.»', ir: 'j10b', si: 'pistaHombreSol' },
          { texto: 'No decir nada. Sentarse a su lado.', ir: 'j10c', efecto: { vinculo_julia: 2 } }
        ]
      },
      j10a: { quien: 'julia', texto: 'Porque en la colonia eras el chico que había venido a buscarme. Quería serlo un día más. Solo eso. Una madre que encuentra a su hijo. Sin él en medio.', efecto: { vinculo_julia: 1 }, siguiente: 'j11' },
      j10b: { quien: 'julia', texto: 'Lo sé. Por eso la Orden vino a por mí al año siguiente. Él pensó que si me tenía a mí, te tendría a ti. Se equivocó dos veces.', efecto: { vinculo_julia: 1 }, siguiente: 'j11' },
      j10c: { texto: 'Elías se sienta. Julia apoya la cabeza en su hombro, despacio, como si pidiera permiso. Se quedan así hasta que el bidón se apaga.', siguiente: 'j11' },
      j11: { quien: 'julia', texto: 'La Voz de Madrid empezó en 2031 para gritarle a él. Cada vez que decía «¿Recuerdas Madrid?», le estaba diciendo: «Recuerdo lo que eras». Y él lo sabía. Por eso nunca me mató.', siguiente: 'x1' },

      r1: { escena: 'puestoOstra', texto: 'Tobías Grau está sentado en el andén, dándole cuerda a un reloj que no anda. Ve el periódico en la mano de Elías y deja de darle cuerda.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'El hombre del sol pequeño. Más viejo, con el pelo ya blanco. Pero era él. Vino en 2032, con dinero en un sobre y una foto tuya de bebé.', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'Le dije que el niño había muerto de neumonía en el invierno de 2010. Me creyó. O hizo como que me creía. Al año siguiente la Orden vino a pedirme a tu madre.', siguiente: 'r4' },
      r4: { quien: 'relojero', texto: 'Y yo se la di. Creo que él quería saber si yo mentía. Y yo le contesté de la peor forma posible.', efecto: { bandera: 'padreConfirmado' }, siguiente: 'r5' },
      r5: { quien: 'elias', texto: 'Es mi padre.', siguiente: 'r6' },
      r6: { quien: 'relojero', texto: 'Es el hombre que puso su semilla en ti. Tu padre fue un conserje que te enseñó a dar cuerda a los relojes. Y lo hizo fatal. Pero lo hizo.', efecto: { bandera: 'relojeroPadre' }, siguiente: 'x1' },

      w1: { escena: 'puestoOstra', texto: 'Ewa Kowalczyk ve el periódico en la mano de Elías desde el otro lado del andén. Se quita las gafas y se las limpia en la bufanda, muy despacio.', siguiente: 'w2' },
      w2: { quien: 'ewa', texto: 'Aldric y Julia. Todo Lumen lo sabía y nadie lo decía. Cuando ella se fue, en 2008, él nos interrogó uno a uno. No preguntaba por los planos. Preguntaba por el niño.', siguiente: 'w3' },
      w3: { quien: 'ewa', texto: 'Tienes sus manos. Me di cuenta en la colonia y no dije nada. Julia tampoco lo habría dicho. Ninguno de los tres lo diremos nunca en voz alta. Ya está: lo he dicho.', efecto: { bandera: 'padreConfirmado' }, siguiente: 'x1' },

      z1: { escena: 'puestoOstra', texto: 'No hay nadie en el andén que pueda contestarle. Elías desdobla el periódico junto al bidón y lo mira hasta que se sabe la foto de memoria. Luego, el pie de foto. Luego, la fecha.', siguiente: 'z2' },
      z2: { quien: 'elias', pensamiento: true, texto: 'Nadie me lo va a confirmar esta noche. Pero un archivero sabe cuándo dos documentos hablan de la misma persona.', siguiente: 'x1' },

      x1: { quien: 'kurt', texto: 'Wanda cumple su palabra: su gente está en la aguja. Pero el cambio lleva oxidado desde el Colapso. Y mañana, a las seis, quiero estar cruzando el puente viejo.' }
    }
  },

  aspirantes: [],

  misiones: [
    {
      id: 'agujas',
      titulo: 'El cambio de agujas',
      desc: 'Desbloquear la aguja de la estación de Ostra para que el tren de Kurt pueda tomar el puente viejo hacia Helios.',
      habilidad: 'tecnica', base: 35,
      bonus: [{ si: 'b12EnOstra', mas: 15 }, { si: 'relojeroConGrupo', mas: 10 }, { si: 'motinOstra', mas: -15 }],
      coste: {},
      recompensa: { bandera: 'agujasListas' },
      fracasoEfecto: { bandera: 'agujasMal' },
      captura: 0,
      exito: 'A las cuatro y media, la aguja cruje como un hueso que vuelve a su sitio. La vía hacia el puente viejo queda abierta.',
      fracaso: 'La aguja no cede. Mañana habrá que mover el tren a mano los primeros doscientos metros. Lento. Y a la vista.'
    },
    {
      id: 'planoAnillo', si: 'desertorDentro',
      titulo: 'El plano del anillo',
      desc: 'Piotr Zieliński conoce el anillo exterior de Helios. Que lo dibuje entero: torres, relevos y puertas de servicio.',
      habilidad: 'labia', base: 40,
      bonus: [{ si: 'odin_zielinski', mas: 20 }, { si: 'zielinski_acoger', mas: 15 }],
      coste: {},
      recompensa: { intel: 2, bandera: 'planoHelios' },
      captura: 0,
      exito: 'Piotr dibuja en la pared del sótano con un trozo de carbón. Tres anillos, doce torres, una puerta de servicio en el lado del río. «Por ahí entraba el pan.»',
      fracaso: 'Piotr dibuja lo que recuerda, pero a las dos se le cierran los ojos. Medio anillo. Algo es algo.'
    },
    {
      id: 'costurera', si: 'lenaDentro',
      titulo: 'La costurera de la estación',
      desc: 'Lena Wolff ha pedido coser en la estación, junto al tren. Vigilarla esta noche. Ver con quién habla.',
      habilidad: 'sigilo', base: 30,
      bonus: [{ si: 'odin_lena', mas: 30 }, { si: 'juliaLibre', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'espiaDescubierta' },
      fracasoEfecto: { bandera: 'helSabeRuta' },
      captura: 0,
      exito: 'A las tres, Lena saca del cuello del abrigo algo del tamaño de una moneda y le susurra. {op} la deja terminar. Luego le dice lo que tiene que susurrar a partir de ahora.',
      fracaso: '{op} la pierde de vista entre los vagones durante diez minutos. Cuando vuelve a verla, está cosiendo. Sonríe. Ya ha dicho lo que tenía que decir.'
    },
    {
      id: 'greta', si: 'gretaHelios',
      titulo: 'Un mensaje para Greta Lang',
      desc: 'Greta trabaja ya dentro de la Ciudadela. Hacerle llegar un mensaje por la frecuencia de mantenimiento de la red.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'ingenierosLibres', mas: 25 }, { si: 'tomasSalvado', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'gretaContactada' },
      captura: 0,
      exito: 'A las dos, en la frecuencia de mantenimiento, una voz de mujer dice tres palabras y corta: «Puerta del río.»',
      fracaso: 'Ruido. Solo ruido. Si Greta escucha, no puede contestar.'
    },
    {
      id: 'comidaOstra',
      titulo: 'Comida para el refugio',
      desc: 'Hay un almacén de la Orden abandonado a ocho kilómetros, en la otra orilla. Si queda algo, es de Ostra.',
      habilidad: 'fuerza', base: 45,
      bonus: [{ si: 'b12EnOstra', mas: 10 }, { si: 'desertorDentro', mas: 10 }],
      coste: {},
      recompensa: { suministros: 2, ira: -15, bandera: 'almacenOstra' },
      captura: 0,
      exito: 'Cuarenta latas, dos sacos de harina y un bidón de aceite. No es mucho. En Ostra es una fiesta.',
      fracaso: 'El almacén está vacío. Alguien llegó antes. Las huellas en la nieve son de botas de la Orden. Recientes.'
    },
    {
      id: 'vozOstra', si: 'juliaLibre',
      titulo: 'La Voz de Madrid',
      desc: 'La radio de la locomotora llega hasta Madrid y hasta las colonias. Julia quiere hablar. Siete años después.',
      habilidad: 'labia', base: 40,
      bonus: [{ si: 'padreConfirmado', mas: 10 }, { si: 'tomasSalvado', mas: 10 }],
      coste: {},
      recompensa: { red: 2, bandera: 'vozDeVuelta' },
      captura: 0,
      exito: 'A las doce en punto, en todas las radios escondidas entre Madrid y las colonias, una voz de mujer pregunta: «¿Recordáis Madrid?». Siete años después, alguien contesta.',
      fracaso: 'La señal se corta a los cuarenta segundos. Pero cuarenta segundos de la Voz de Madrid son cuarenta segundos.'
    }
  ],

  despedida: {
    inicio: 'e0',
    nodos: {
      e0: { rama: [{ si: 'agujasListas', ir: 'e1a' }], siguiente: 'e1b' },
      e1a: { escena: 'ostra', texto: '5:00. La locomotora de Kurt está en la vía del puente viejo, echando vapor. La gente de Wanda tiene las manos negras de óxido y no se queja.', siguiente: 'e2' },
      e1b: { escena: 'ostra', texto: '5:00. La aguja sigue oxidada. Habrá que empujar el tren entre todos al amanecer. La gente de Wanda dice que no será la primera vez que Ostra empuja algo.', siguiente: 'e2' },
      e2: { rama: [{ si: ['lenaDentro', '!espiaDescubierta'], ir: 'e3l' }, { si: 'espiaDescubierta', ir: 'e3d' }], siguiente: 'm0' },
      e3l: { texto: 'En la estación, la costurera nueva cose junto al tren. Ha hablado con alguien esta noche, aunque nadie la ha visto hablar.', efecto: { bandera: 'helSabeRuta' }, siguiente: 'm0' },
      e3d: { quien: 'mara', texto: 'La costurera le ha contado a Hel que vamos por el puente del sur. A pie. Que lo crea un día entero.', siguiente: 'm0' },

      // --- Mara ---
      m0: { escena: 'puestoOstra', texto: 'Mara sube al tejado de la estación con dos tazas de algo caliente que no es café. Se sienta junto a Elías. Mira hacia el este, donde el cielo empieza a ponerse gris.', siguiente: 'm1' },
      m1: { rama: [{ si: ['padreConfirmado', 'ramaCiudad'], ir: 'm2a' }, { si: 'padreConfirmado', ir: 'm2b' }], siguiente: 'm2n' },
      m2a: { quien: 'mara', texto: 'Me lo ha contado Kurt, que lo ha oído todo desde la locomotora. No me mires así: en un tren no hay paredes.', siguiente: 'm3a' },
      m3a: { quien: 'mara', texto: 'No eres su hijo, Elías. Eres el que lo detuvo.', siguiente: 'm4' },
      m2b: { quien: 'mara', texto: 'Kurt lo ha oído todo desde la locomotora. En un tren no hay paredes.', siguiente: 'm3b' },
      m3b: { quien: 'mara', texto: 'No eres su hijo, Elías. Eres el que va a llegar a Helios antes que él.', siguiente: 'm4' },
      m2n: { quien: 'mara', texto: 'Llevas toda la noche con la mano en el bolsillo del abrigo. ¿Qué hay ahí?', siguiente: 'm2n2' },
      m2n2: { texto: 'Elías saca el periódico y se lo da. Mara lo lee dos veces. Se lo devuelve doblado en cuatro, como estaba.', siguiente: 'm3n' },
      m3n: { quien: 'mara', texto: 'Una foto no es una sangre. Y aunque lo fuera. No eres su hijo. Eres el que lo va a mirar a la cara.', siguiente: 'm4' },
      m4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«No soy su hijo. Soy el archivero que lo detuvo.»', ir: 'm5a', si: 'ramaCiudad', efecto: { principios: 3, bandera: 'eliasNiega' } },
          { texto: '«No soy su hijo. Soy el que le va a apagar la luz.»', ir: 'm5a', si: 'ramaColonia', efecto: { principios: 3, bandera: 'eliasNiega' } },
          { texto: '«Soy su hijo. Y eso no cambia lo que vamos a hacer.»', ir: 'm5b', efecto: { bandera: 'eliasAcepta' } },
          { texto: '«No lo sé, Mara. Todavía no lo sé.»', ir: 'm5c', efecto: { vinculo_mara: 1, bandera: 'eliasDuda' } }
        ]
      },
      m5a: { quien: 'mara', texto: 'Eso. Dilo así mañana también. Y pasado. Hasta que te lo creas.', siguiente: 'k0' },
      m5b: { quien: 'mara', texto: 'Bien. Porque si cambia algo, me lo dices tú antes de que me lo diga una telepantalla.', siguiente: 'k0' },
      m5c: { texto: 'Mara no contesta. Le pasa la taza. Se quedan mirando cómo amanece sobre una ciudad que no tiene números.', siguiente: 'k0' },

      // --- Los que se quedan ---
      k0: { rama: [{ si: 'martaSeQueda', ir: 'k1' }, { si: 'danielSeQueda', ir: 'k2' }], siguiente: 'k3' },
      k1: { texto: 'En el andén, Marta Hessel y Daniel despiden el tren. Marta no dice adiós con la mano. Se queda quieta, con el brazo de su hijo por los hombros, hasta que el humo los tapa.', siguiente: 'k3' },
      k2: { texto: 'Daniel Hessel se queda en el andén con las manos negras de óxido. Su madre sube al tren sin mirar atrás, porque si mira atrás no sube.', siguiente: 'k3' },
      k3: { rama: [{ si: 'b12EnOstra', ir: 'k4' }], siguiente: 'k5' },
      k4: { quien: 'olek', texto: 'Yo me quedo, archivero. Alguien tiene que enseñar a esta gente a llevar una estación. Si volvéis, aquí habrá un tren esperando. Te lo prometo. Yo cumplo lo que prometo. Tú también, ya lo he visto.', efecto: { bandera: 'olekEnOstra' }, siguiente: 'k5' },
      k5: { quien: 'wanda', texto: 'Si sale bien lo que vais a hacer, volved y contádnoslo. Si sale mal, no volváis: aquí no queremos a la Orden. Ni siquiera a la que viene detrás de vosotros.', siguiente: 'z1' },

      z1: { escena: 'trenNieve', texto: 'Domingo, 6:00. El tren de Kurt cruza el puente viejo de Ostra. Al otro lado del río, en el horizonte, hay una luz. La única luz encendida en cien kilómetros.', siguiente: 'z2' },
      z2: { quien: 'kurt', texto: 'La Ciudadela Helios. Quien controla la luz, controla el mundo. Eso pone en la puerta. En letras de dos metros.' }
    }
  }
};

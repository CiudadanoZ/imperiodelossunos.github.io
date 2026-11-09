// ============================================================
//  ACTO 2 · NOCHE 4 — «Barracón 12» (los dos caminos juntos)
//  La célula de la colonia. Julia (según cómo haya llegado cada uno). El abuelo de Lucía Ferrer.
//  Se prepara la huida del viernes: el tren de Kurt.
// ============================================================

window.COLONIA_NOCHE4 = {
  numero: 4,
  subtitulo: 'Barracón 12',
  escenaLlegada: 'colonia',
  etiqueta: 'COLONIA ESTE-1',
  refugio: 'barracon',
  operativos: ['elias', 'mara', 'olek', 'samira', { id: 'tobias', si: 'relojeroConGrupo' }, { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] },
    'kurt', 'martaR', 'leif', 'hansC', 'brandtC', 'leoC'],
  nuevosOperativos: [
    { id: 'olek', nombre: 'Olek', papel: 'Ferroviario', habilidades: { fuerza: 2, tecnica: 1, labia: 1 }, esencial: true },
    { id: 'samira', nombre: 'Samira', papel: 'Enfermera', habilidades: { sigilo: 2, labia: 1 }, esencial: true },
    { id: 'tobias', nombre: 'Tobías', papel: 'El Relojero', habilidades: { labia: 2, tecnica: 2, sigilo: 1 }, esencial: true, si: 'relojeroConGrupo' }
  ],

  llegada: {
    inicio: 'n0',
    nodos: {
      n0: { rama: [{ si: 'ramaCiudad', ir: 'a1' }], siguiente: 'b1' },

      // --- Camino A: el inspector entra en el barracón ---
      a1: { escena: 'barracon', texto: 'Medianoche. El inspector Vogt sale de la casa de invitados «a fumar». Cruza la nieve en los cuarenta y dos segundos que tarda el foco en dar la vuelta.', siguiente: 'a2' },
      a2: { quien: 'olek', texto: '¿Tú eres el inspector? El viejo del reloj dice que eres de los suyos. Yo soy Olek. Conducía trenes hasta que me pillaron con un pasajero de más.', siguiente: 'a3' },
      a3: { quien: 'samira', texto: 'Samira. Enfermera. Aquí curo con nieve y con mentiras. Si eres inspector, yo soy la reina de Saba. Siéntate.', siguiente: 'a4' },
      a4: { rama: [{ si: 'maraSola', ir: 'a5m' }], siguiente: 'j0' },
      a5m: { texto: 'En la litera del fondo, alguien con los pies vendados levanta la cabeza. Mara. Ha llegado a pie esta tarde, siguiendo las vías desde el puesto 12.', siguiente: 'a6m' },
      a6m: { quien: 'mara', texto: 'Cuarenta kilómetros. Con estas botas. La próxima vez que me rechaces los papeles, archivero, me rechazas también las botas.', siguiente: 'j0' },

      // --- Camino B: el cuarto día ---
      b1: { escena: 'barracon', texto: 'Medianoche. Mara sale de debajo de la litera de Olek, se estira y dice que hay sitios peores para esconderse. Ha estado en casi todos.', siguiente: 'j0' },

      // --- Julia ---
      j0: { rama: [
        { si: 'ramaColonia', ir: 'jb1' },
        { si: ['juliaPorOtroCamino', 'circularJulia'], ir: 'jd1' },
        { si: 'juliaPorOtroCamino', ir: 'jc1' }
      ], siguiente: 'jn1' },

      jb1: { texto: 'Julia llega a medianoche, como siempre. Esta vez se sienta al lado de Mara sin pedir permiso, y Mara le hace sitio sin que se lo pida.', siguiente: 'f0' },

      jd1: { quien: 'samira', texto: 'Esta tarde ha llegado un camión de la Guardia Negra. Traían a una mujer esposada. La detuvieron en un control al sur: había una circular con su nombre en todos los puestos.', siguiente: 'jd2' },
      jd2: { quien: 'elias', pensamiento: true, texto: 'La circular. La aprobé yo. En el puesto 12. Con mi sello.', siguiente: 'jd3' },
      jd3: { texto: 'Samira la trae a medianoche. Julia tiene un ojo morado y la misma sonrisa torcida de siempre.', siguiente: 'jd4' },
      jd4: { quien: 'julia', texto: 'Te dije que nos veríamos en la colonia. No te dije cómo. A Hel le ha venido de maravilla: me quería aquí y aquí estoy.', efecto: { bandera: 'juliaDetenida' }, siguiente: 'f0' },

      jc1: { texto: 'A medianoche, Samira trae a una enfermera de la Cruz Solar que ha llegado esta tarde con un camión de vendas. Se quita la cofia. Es Julia.', siguiente: 'jc2' },
      jc2: { quien: 'julia', texto: 'Te dije que nos veríamos en la colonia. Papeles de la Cruz Solar: una vieja amiga de la radio que ahora reparte vendas para la Orden. Nadie mira a las enfermeras. Ya lo sabe Mara.', efecto: { vinculo_julia: 1, bandera: 'juliaInfiltrada' }, siguiente: 'f0' },

      jn1: { texto: 'A medianoche, Samira trae a la intocable del barracón 4. Una mujer de pelo gris que se para en la puerta y mira a Elías como si fuera a desaparecer.', siguiente: 'jn2' },
      jn2: { rama: [{ si: 'mensajeJulia', ir: 'jn3m' }], siguiente: 'jn3' },
      jn3m: { quien: 'julia', texto: 'Te dije que no vinieras. Te lo mandé decir con una mujer que casi se muere en un tren de mercancías. Y has venido igual.', siguiente: 'jn4' },
      jn3: { quien: 'julia', texto: 'Tú eres Elías. Lo sé por los ojos. Son los míos. Nadie me dijo que tendrías mis ojos.', siguiente: 'jn4' },
      jn4: { quien: 'elias', texto: 'Julia Aranda.', siguiente: 'jn5' },
      jn5: { quien: 'julia', texto: 'Aquí soy un número. Pero sí. Esta noche, sí.', efecto: { vinculo_julia: 2, bandera: 'reconocioJulia' }, siguiente: 'f0' },

      // --- El abuelo de Lucía Ferrer ---
      f0: { texto: 'En la litera de al lado de la estufa, un hombre mayor con las manos quemadas por los cables escucha sin hablar.', siguiente: 'f1' },
      f1: { quien: 'julia', texto: 'Marcos. Marcos Ferrer. Trabajamos juntos en el Proyecto Lumen hace más de treinta años. Él, Ewa Kowalczyk y yo. Somos los tres que quedan.', siguiente: 'f2' },
      f2: { quien: 'mara', texto: '...Ferrer. ¿Tenía usted una nieta? ¿Lucía?', siguiente: 'f3' },
      f3: { texto: 'El viejo la mira. Mucho rato. Como si buscara algo en su cara.', siguiente: 'f4' },
      f4: { quien: 'mara', texto: 'Yo era enfermera en el Hospital Central. En 2031. Su nieta era la primera de la lista. Desde entonces uso su nombre en mis papeles falsos. Para que alguien lo siga diciendo en voz alta.', siguiente: 'f5' },
      f5: { texto: 'Marcos Ferrer se levanta despacio. Le coge las dos manos a Mara. No dice nada. No hace falta. En el barracón 12 nadie habla durante un minuto entero.', efecto: { bandera: 'maraYFerrer', vinculo_mara: 1 }, siguiente: 'p1' },

      // --- El plan ---
      p1: { quien: 'mara', texto: 'Kurt vuelve mañana por la noche con el tren. Es el último antes del traslado a Helios del día doce. Nos vamos mañana, todos los que quepan.', siguiente: 'p2' },
      p2: { quien: 'julia', texto: 'Ewa y Marcos vienen conmigo. Sin ellos, lo que hay que hacer en Helios no se puede hacer. No preguntéis todavía qué es. Mañana.', siguiente: 'x1' },
      x1: { quien: 'olek', texto: 'Entonces esta noche se trabaja. Y mañana, más. Ha venido gente de las otras colonias que quiere ayudar. Algunos los conoces tú, archivero.' }
    }
  },

  // ---------------- LOS QUE QUIEREN AYUDAR ----------------
  aspirantes: [
    {
      id: 'hansC', si: 'hansReubicado', nombre: 'Hans Keller', papel: 'Archivero de la mesa 12',
      dice: 'NB-1412-M. Mi expediente. Lo sellaste tú. No te guardo rencor: yo habría hecho lo mismo con Brandt detrás. Me sé de memoria los planos de la red de Este-2. Y los turnos de todas las torres que he visto.',
      habilidades: { tecnica: 2, labia: 1 },
      traidor: false,
      memo: 'hans',
      comparacion: 'Su expediente del miércoles de la auditoría: «retención no autorizada de datos de expedientes (memorización)». Recuerda todo. Como siempre.',
      informe: 'Samira: «Lleva dos semanas aquí y se sabe el número de cada interno del barracón. Hasta el mío. Ni yo me lo sé.»'
    },
    {
      id: 'brandtC', si: 'brandtPurgado', nombre: 'Konrad Brandt', papel: 'Antiguo supervisor de la Sección 14',
      dice: 'Vogt. Me purgaron por no vigilarle lo suficiente. Tenían razón. Ahora reparo relojes de torre con el viejo Grau. Sé abrir la caseta del foco. Le debo una puerta.',
      habilidades: { labia: 2, sigilo: 1 },
      traidor: false,
      memo: 'brandtRev',
      comparacion: 'Su revisión de lealtad: «tolerancia con subordinados desleales». Te protegió toda la semana. No sabes por qué. Él tampoco.',
      informe: 'Samira: «Repara los relojes de la torre. Los arregla de noche para que vuelvan a pararse de día. Dice que es su forma de protestar.»'
    },
    {
      id: 'leoC', si: ['leoReubicado', '!leoRescatado'], nombre: 'Leo Sanz', papel: 'Archivero de la mesa 12',
      dice: 'Miraba las caras. Por eso estoy aquí. Ahora tengo muchas caras que mirar. Dime cuáles hay que sacar y las memorizo todas.',
      habilidades: { tecnica: 1, labia: 1, sigilo: 1 },
      traidor: false,
      memo: 'leo',
      comparacion: 'Su expediente: cuatro minutos por expediente, mirando las caras. Dice la verdad.',
      informe: 'Samira: «Ha aprendido el nombre de todos los niños del barracón 3. Hay cuarenta.»'
    },
    {
      id: 'ilse', nombre: 'Ilse Brandauer', papel: 'Kapo del barracón 9',
      dice: 'Soy la kapo del 9. Tengo la llave de la cocina y del almacén de mantas. Si os vais, me voy con vosotros. Y os abro lo que haga falta.',
      habilidades: { sigilo: 1, labia: 2 },
      traidor: true,
      informe: 'Samira: «Ilse lleva tres años de kapo. Los kapos que sobreviven tres años es porque Rusk los necesita. Y Rusk no necesita a nadie gratis.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'ingenieros',
      titulo: 'Convencer a los ingenieros',
      desc: 'Ewa Kowalczyk y Marcos Ferrer llevan años sin hablar de Lumen con nadie. Hay que convencerlos de que mañana se vienen.',
      habilidad: 'labia', base: 30,
      bonus: [{ si: 'maraYFerrer', mas: 25 }, { si: 'memo_kowalczyk', mas: 15 }, { si: 'ferrerAyudado', mas: 10 }, { si: 'pistaLumen', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'ingenierosConvencidos' },
      captura: 0,
      exito: 'Ewa Kowalczyk se quita las gafas: «Treinta años esperando a que alguien quisiera arreglar lo que rompimos. Me voy». Marcos solo asiente, mirando a Mara.',
      fracaso: 'Ewa tiene miedo. Dice que la última vez que alguien habló de Lumen, desapareció. Mañana veremos.'
    },
    {
      id: 'llaveB4c', si: '!llaveBarracon4',
      titulo: 'La llave del barracón 4',
      desc: 'Sin una llave del barracón 4, Julia y Ewa no salen mañana de su barracón.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'brandtAyudado', mas: 15 }, { si: 'samiraAyudada', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'llaveBarracon4' },
      captura: 0.3,
      exito: 'Una llave hecha con una cuchara aplastada y mucha paciencia. Encaja a la tercera.',
      fracaso: 'La cerradura del 4 es nueva. De la Cancillería. Nada de lo de aquí la abre.',
      capturado: 'Hel ha puesto un guardia dentro del barracón 4. Por si acaso.'
    },
    {
      id: 'focoC', si: '!ritmoFoco',
      titulo: 'El ritmo del foco',
      desc: 'Contar desde el tejado cuánto tarda el foco de la torre y dónde deja zonas a oscuras.',
      habilidad: 'sigilo', base: 45,
      bonus: [{ si: 'codigosColonia', mas: 15 }],
      coste: {},
      recompensa: { intel: 1, bandera: 'ritmoFoco' },
      captura: 0.25,
      exito: 'Cuarenta y dos segundos por vuelta. Y once segundos en los que la esquina de la cantera se queda completamente a oscuras.',
      fracaso: 'La nieve no deja ver nada. Ni el foco, ni la cantera, ni las propias manos.',
      capturado: 'El foco se paró. Justo encima de {op}.'
    },
    {
      id: 'uniformesC', si: '!uniformesColonia',
      titulo: 'Uniformes de guardia',
      desc: 'Dos uniformes de guardia del secadero de la lavandería, para cruzar la puerta del recinto mañana.',
      habilidad: 'sigilo', base: 35,
      coste: { suministros: 1 },
      recompensa: { bandera: 'uniformesColonia' },
      captura: 0.3,
      exito: 'Dos uniformes congelados, tiesos como tablas. Junto a la estufa volverán a ser uniformes.',
      fracaso: 'La lavandería tiene un perro. Nadie sabía que había perros.',
      capturado: 'El perro no era nuevo. Lo tenían escondido.'
    },
    {
      id: 'archivoLumen',
      titulo: 'Los papeles de Lumen',
      desc: 'En el archivo de la colonia hay una caja con lo que se requisó a los tres ingenieros en 2033.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'fichaJulia2033', mas: 20 }, { si: 'pistaLumen', mas: 10 }, { si: 'recluta_hansC', mas: 15 }],
      coste: {},
      recompensa: { intel: 2, bandera: 'pistaFoto' },
      captura: 0.2,
      exito: 'Entre manuales viejos, una foto de 2007: el equipo de Lumen delante de una maqueta de la central. Julia, con veintisiete años, se ríe. A su lado había un hombre. Alguien recortó su cara con unas tijeras.',
      fracaso: 'La caja está vacía. Alguien se la llevó antes. Alguien con muchos sellos.',
      capturado: 'En el archivo, de noche, la cámara no gira. Lo sabías.'
    },
    {
      id: 'medicinas7', si: 'chispaAyudado',
      titulo: 'Sacar a Chispa del barracón 7',
      desc: 'Chispa se recupera del tifus en el barracón 7. Hay que tenerlo en pie para mañana.',
      habilidad: 'sigilo', base: 40,
      bonus: [{ si: 'barracon7Ayudado', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'chispaListo' },
      captura: 0.25,
      exito: 'Chispa abre los ojos al ver a Elías. «Archivero. Me debes un concierto. Y una explicación. Empieza por el concierto.»',
      fracaso: 'Chispa tiene demasiada fiebre para moverse esta noche. Mañana habrá que llevarlo a hombros.',
      capturado: 'Hay un guardia nuevo en la puerta del 7.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro. Mañana, todo. Queda una hora.',
        opciones: [
          { texto: 'Con Julia.', ir: 'j1' },
          { texto: 'Con Mara y Marcos Ferrer.', ir: 'm1' },
          { texto: 'Con el Relojero.', ir: 'r1', si: 'relojeroConGrupo' },
          { texto: 'Con los de la mesa 12.', ir: 'h1', si: 'recluta_hansC' },
          { texto: 'Con Brandt, en el taller.', ir: 'b1', si: 'recluta_brandtC' }
        ]
      },

      j1: { quien: 'julia', texto: '¿Te acuerdas de algo de antes de San Ildefonso? De una canción, de un olor. De mí.', siguiente: 'j2' },
      j2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«De una radio. Una voz que se reía.»', ir: 'j3a', efecto: { vinculo_julia: 2 } },
          { texto: '«De nada. Lo siento.»', ir: 'j3b', efecto: { vinculo_julia: 1 } }
        ]
      },
      j3a: { quien: 'julia', texto: 'Te cantaba los números de la lotería para dormirte. Con voz de pájaro, como los niños de San Ildefonso. Nunca pensé que acabarías cantándolos tú.', siguiente: 'z1' },
      j3b: { quien: 'julia', texto: 'No lo sientas. Tenías dos años. Yo me acuerdo por los dos. Es lo único que he hecho bien en siete años: acordarme.', siguiente: 'z1' },

      m1: { texto: 'Mara y Marcos Ferrer están sentados junto a la estufa apagada. Él le enseña una foto pequeña, gastada de tanto tocarla: una niña con un vestido de lunares.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Llevo nueve años diciendo su nombre en voz alta, Elías. Y hoy, por fin, sé cómo era su cara.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },

      r1: { quien: 'relojero', texto: 'Julia y yo no nos hemos dicho nada en todo el día. Es mejor así. Hay cosas que solo se pueden decir en un tren, de noche, cuando ya no se puede bajar.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Mañana, cuando salgamos, Hel nos va a dejar salir. Fíjate bien. Ella no deja nada al azar. Si la puerta se abre fácil, pregúntate quién la ha engrasado.', efecto: { bandera: 'avisoRelojero' }, siguiente: 'z1' },

      h1: { quien: 'hans', texto: 'He hecho una lista con los ciento doce internos de Este-1 que están en la lista de Helios. Nombre, número, barracón. Por si mañana no cabemos todos. Para que alguien los recuerde.', siguiente: 'h2' },
      h2: { quien: 'elias', pensamiento: true, texto: 'Hans hace lo mismo que yo. Lo hizo siempre. A cuatro metros de mí, durante once años. Y nunca nos lo dijimos.', siguiente: 'z1' },

      b1: { quien: 'brandt', texto: 'Vogt. Le debo una puerta. La caseta del foco se abre con la misma llave que los relojes de la torre. La tengo yo. Mañana, a las 22:00, el foco se parará cuarenta segundos. Será un fallo de mantenimiento.', efecto: { bandera: 'brandtFoco' }, siguiente: 'b2' },
      b2: { quien: 'brandt', texto: 'La puntualidad es una forma de lealtad. A las 22:00. Ni un segundo antes.', siguiente: 'z1' },

      z1: { escena: 'colonia', texto: 'A las cinco suena la campana. Mañana llega el tren de Kurt. Y la Inspectora.' }
    }
  }
};

// ============================================================
//  ACTO 2 · PRÓLOGO A «La ciudad a oscuras» · DÍA 1
//  Lunes, 4 de febrero de 2041. Madrid libre, tres meses después de la caída de La Aguja.
//  Formato Comité (ver js/comite.js): sellos PERDONAR · JUICIO · USAR y CONSULTAR ODÍN.
//  Banderas de resumen (js/main.js, empezarActo2): juliaEnMadrid, chispaVivo, ruthViva, brandtAliado,
//  hansLibre, relojeroPreso, relojeroMuerto.
// ============================================================

window.COMITE_A1 = {
  numero: 1,
  fecha: 'Lunes, 4 de febrero de 2041',
  horaInicio: 9,
  horaFin: 17,
  escenaCasa: 'madridOscura',

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Madrid. Febrero de 2041. Ya nadie dice «Nueva Berlín».', siguiente: 'a2' },
      a2: { texto: 'Hace tres meses cayó La Aguja. Hace tres semanas, Aldric Voss fue condenado a cadena perpetua. Y hace dos, la Ciudadela Helios cortó la corriente de la ciudad.', siguiente: 'a3' },
      a3: { texto: 'Nadie sabe desde dónde se dio la orden. Solo que, desde entonces, Madrid es libre y está a oscuras. Y hace cuatro grados bajo cero.', siguiente: 'a4' },
      a4: { rama: [{ si: 'nombreReal', ir: 'a5n' }], siguiente: 'a5' },
      a5n: { quien: 'elias', pensamiento: true, texto: 'La gente ha empezado a llamarme Aranda. Todavía me giro tarde cuando lo oigo.', siguiente: 'a6' },
      a5: { quien: 'elias', pensamiento: true, texto: 'Sigo firmando como Vogt. No tengo otro nombre que poner.', siguiente: 'a6' },
      a6: { rama: [{ si: 'relojeroMuerto', ir: 'a7m' }], siguiente: 'b1' },
      a7m: { quien: 'elias', pensamiento: true, texto: 'Esta mañana he pasado por el cementerio de la Almudena. En la tumba de Tobías alguien ha dejado un reloj parado. Siempre hay alguien que deja un reloj parado.', siguiente: 'b1' },

      b1: { escena: 'comite', efecto: { hora: 0.96 }, texto: 'El antiguo Ministerio de Registro. Donde estaba la Sección 14, ahora se reúne el Comité de la Ciudad Libre. A la luz de las velas.', siguiente: 'b2' },
      b2: { quien: 'mara', texto: 'Llegas tarde. No pasa nada: aquí ya nadie cuenta los minutos. Todavía.', siguiente: 'b2r' },
      b2r: { rama: [{ si: 'beso', ir: 'b3b' }, { si: 'esperarLunes', ir: 'b3b' }], siguiente: 'b4' },
      b3b: { texto: 'Mara le arregla el cuello del abrigo sin mirarle, como quien lo ha hecho muchas mañanas. Lo ha hecho muchas mañanas.', siguiente: 'b4' },
      b4: { quien: 'anselmo', texto: 'Hay dos mil expedientes de colaboradores esperando. Guardias, funcionarios, porteras que denunciaban a sus vecinos por medio kilo de azúcar. La gente quiere nombres. Y quiere castigos.', siguiente: 'b5' },
      b5: { quien: 'mara', texto: 'Y nosotros no somos la Orden. Por eso te necesitamos a ti, Elías. Eres el único que sabe leer sus papeles. Y el único que mira las caras.', siguiente: 'b6' },
      b6: { quien: 'elias', pensamiento: true, texto: 'Otra vez una mesa. Otra vez expedientes. Otra vez un sello en la mano. Solo ha cambiado de quién es la cara de la foto.', siguiente: 't1' },

      t1: { texto: 'EL COMITÉ: cada expediente es alguien que trabajó para la Orden. Decide con un sello: PERDONAR (vuelve a casa), JUICIO (a la cárcel, hasta un juicio con abogado) o USAR (se le perdona a cambio de trabajar para la ciudad).', siguiente: 't2' },
      t2: { texto: 'Ya no hay sospecha. Hay dos medidores: la IRA de la ciudad (sube si perdonas, baja si hay juicios) y tus PRINCIPIOS (bajan si usas a la gente o si encendéis ODÍN). Si la Ira llega al 100%, la calle se toma la justicia por su mano.', siguiente: 't3' },
      t3: { texto: 'ODÍN está apagado desde el Día del Sol. Pero su archivo sigue ahí: CONSULTAR ODÍN revela lo que no dice el expediente. Cada vez que lo enciendes, te pareces un poco más a ellos.' }
    }
  },

  normas: {
    titulo: 'EL COMITÉ · PRIMERA SESIÓN',
    textos: [
      'PERDONAR: el acusado vuelve a su casa. La calle no olvida.',
      'JUICIO: cárcel del Distrito 1 hasta un juicio con abogado.',
      'USAR: perdón a cambio de trabajar para la ciudad.',
      'La ciudad libre votó no tener pena de muerte. Fue lo primero que votó.',
      'ODÍN está apagado. Encenderlo es decisión tuya.'
    ]
  },

  expedientes: [
    {
      id: 'marco', nombre: 'Marco Ibáñez', edad: 20, cargo: 'Guardia Negra, 3.ª compañía',
      acusacion: 'Participó en la redada del Distrito 9 del 2 de noviembre. Siete detenidos, dos muertos.',
      pruebas: 'Su número de visor consta en el parte de la redada.',
      defensa: 'Tenía diecinueve años. Si no disparaba, me disparaban a mí. Me dijeron que eran terroristas.',
      clamor: '«¡Que se quite el visor! ¡Que le veamos la cara!»',
      odin: 'Registro de su fusil en la redada: ni un solo disparo. Informó de «fallo de munición» tres veces aquella noche.',
      comentario: 'Diecinueve años. La edad de Chispa. Sin el visor, es un chico con granos y las orejas rojas de frío.',
      retrato: { piel: '#e0bfa5', pelo: '#3a2c20', estilo: 'rapado', ropa: '#1c1c1c', uniforme: true },
      perdonar: { efecto: { ira: 10, principios: 2 }, texto: 'Marco Ibáñez sale por la puerta de atrás. Alguien le escupe en la escalera.' },
      juzgar: { texto: 'Marco Ibáñez baja la cabeza. No protesta.' },
      usar: { efecto: { ira: 4, principios: -5, red: 1 }, texto: 'Marco Ibáñez conoce los turnos de los cuarteles que aún resisten en el Distrito 1. Ahora son tuyos.' }
    },
    {
      id: 'pilar', nombre: 'Pilar Soto', edad: 58, cargo: 'Portera del número 12 de la calle Toledo',
      acusacion: 'Catorce denuncias contra vecinos entre 2034 y 2040. Nueve reubicados.',
      pruebas: 'Las catorce denuncias, con su firma. Medio kilo de azúcar por cada una.',
      defensa: 'Tenía tres nietos y una cartilla gris. ¿Usted qué habría hecho, archivero? No me conteste. Ya sé lo que hacía usted.',
      clamor: '«¡Catorce familias! ¡Catorce!»',
      julia: { si: 'juliaEnMadrid', texto: 'Catorce familias. Que la juzguen catorce veces.' },
      odin: 'Doce de las catorce denuncias fueron contra vecinos que ya estaban en la Lista Gris y habrían caído igual. Las otras dos, contra su propio hijo y su nuera. Los denunció el mismo día que salieron hacia el Sur con papeles falsos. La denuncia les dio doce horas de ventaja.',
      comentario: 'Calle Toledo. En un bar de la calle Toledo, alguien escribió «¿Recuerdas Madrid?» en una servilleta.',
      comentarioSi: [{ si: 'ruthConocioMadre', texto: 'Calle Toledo. Ruth me dijo que allí, en un bar, mi madre escribió «¿Recuerdas Madrid?» en una servilleta. Esta mujer abría el portal de enfrente.' }],
      retrato: { piel: '#d4ab8c', pelo: '#bdb8b0', estilo: 'moño', ropa: '#4b4034', arrugas: true },
      perdonar: { efecto: { ira: 12, principios: 2 }, texto: 'La sala se levanta. Mara tiene que pedir silencio tres veces.' },
      juzgar: { efecto: { ira: -8 }, texto: 'Pilar Soto se aferra al bolso como si dentro hubiera algo que no le pueden quitar.' },
      usar: { efecto: { ira: 5, principios: -6, intel: 1 }, texto: 'Pilar Soto sabe quién hacía qué en cada portal del Distrito 4. Ahora te lo cuenta a ti.' }
    },
    {
      id: 'ramon', nombre: 'Ramón Gil', edad: 47, cargo: 'Archivero de 2.ª clase · Sección 14, mesa 3',
      acusacion: 'Once años en la Sección 14. Más de cuarenta mil expedientes sellados, siete mil reubicaciones.',
      pruebas: 'Su sello en los libros de registro. Todos.',
      defensa: 'Hice lo mismo que el archivero que me está juzgando. En la mesa de al lado. Durante once años.',
      clamor: '«¿Y tú, Vogt? ¿Quién te juzga a ti?»',
      comentario: 'Mesa 3. Cuatro metros a mi izquierda. Once años. Nunca supe cómo se llamaban sus hijos. Él tampoco los míos. No tengo.',
      comentarioSi: [{ si: 'denuncioInocente', texto: 'Mesa 3. Once años a cuatro metros de mí. Tiene razón. Y yo, además, denuncié a un inocente para limpiar mi ficha. Él no lo sabe. La sala tampoco.' }],
      retrato: { piel: '#dcb495', pelo: '#5a4a38', estilo: 'corto', ropa: '#4a4f58', gafas: true },
      perdonar: { efecto: { ira: 10, principios: 3 }, texto: 'Ramón Gil te da la mano al salir. Sabe por qué lo has hecho. La sala también.' },
      juzgar: { efecto: { ira: -6, principios: -2 }, texto: 'Ramón Gil te mira mientras se lo llevan. No dice nada. No hace falta.' },
      usar: { efecto: { ira: 3, principios: -4, intel: 2 }, texto: 'Ramón Gil conoce los códigos de archivo de todas las secciones. Los dos sabéis dónde está cada papel.' }
    },
    {
      id: 'brandtC', si: 'brandtAliado', nombre: 'Konrad Brandt', edad: 52, cargo: 'Supervisor de la Sección 14',
      acusacion: 'Once años al frente de la Sección 14. Firmó las reubicaciones que redactaban otros.',
      pruebas: 'Su propia declaración en el juicio contra Voss.',
      defensa: 'Soy culpable. Lo dije delante del tribunal y lo repito aquí. Haga lo que tenga que hacer, Vogt. Pero hágalo mirándome.',
      clamor: 'Silencio. Medio Madrid le vio abrir la puerta de La Aguja.',
      comentario: 'El hombre que me vigiló durante siete días. El que me encubrió sin saber por qué. El que abrió una puerta.',
      retratoDe: 'brandt',
      perdonar: { efecto: { ira: 4, principios: 3, bandera: 'brandtPerdonado' }, texto: 'Brandt se pone el abrigo despacio. «La puntualidad es una forma de lealtad», dice. «Llegaré mañana a las ocho.»' },
      juzgar: { efecto: { ira: -4, bandera: 'brandtJuzgado' }, texto: 'Brandt asiente. «Correcto, Vogt.» Es la primera vez que se lo dice sin ironía.' },
      usar: { efecto: { ira: 2, principios: -3, red: 1, bandera: 'brandtUsado' }, texto: 'Brandt conoce a todos los funcionarios que siguen escondidos en Madrid. Y sabe cuáles de ellos hablan con la Ciudadela.' }
    },
    {
      id: 'lina', nombre: 'Lina Ortiz', edad: 16, cargo: 'Juventud Solar · jefa de grupo, Distrito 6',
      acusacion: 'Denunció a sus propios padres por escuchar la radio de la Voz de Madrid en 2038.',
      pruebas: 'Su denuncia, con letra de niña de trece años y el sello de la Juventud Solar.',
      defensa: 'Me enseñaron que era lo correcto. En el colegio nos daban una medalla por cada denuncia. Yo tenía tres.',
      clamor: '«¡Que la juzguen como a una adulta! ¡Ella no tuvo piedad!»',
      julia: { si: 'juliaEnMadrid', texto: 'Sus padres escuchaban mi voz. Por eso se los llevaron. No me pidáis que la perdone.' },
      odin: 'Sus padres siguen vivos en la Colonia Este-3. Lina escribe una carta a la semana a la colonia desde hace tres años. Ninguna ha salido del Registro.',
      comentario: 'Dieciséis años. Trece cuando firmó. Tiene las uñas mordidas hasta la carne.',
      retrato: { piel: '#e6c4a8', pelo: '#8a6a40', estilo: 'largo', ropa: '#1c1c1c', uniforme: true },
      perdonar: { efecto: { ira: 8, principios: 3, bandera: 'linaPerdonada' }, texto: 'Lina Ortiz sale llorando. Anselmo la acompaña hasta la puerta, porque nadie más lo hace.' },
      juzgar: { efecto: { ira: -5, principios: -3 }, texto: 'Lina Ortiz tiene dieciséis años y va a pasar la noche en la cárcel del Distrito 1. La sala aplaude.' },
      usar: { efecto: { ira: 2, principios: -8 }, texto: 'Lina Ortiz conoce a los jefes de la Juventud Solar que siguen reuniéndose. Tiene dieciséis años y vuelve a denunciar. Esta vez, para ti.' }
    },
    {
      id: 'wren', nombre: 'Tomasz Wren', edad: 45, cargo: 'Ingeniero de ODÍN · núcleo de La Aguja, nivel -4',
      acusacion: 'Diez años de mantenimiento de la red de vigilancia. Diseñó el sistema que calculaba el Índice de Pureza.',
      pruebas: 'Su firma en los manuales de ODÍN.',
      defensa: 'Puedo volver a encender ODÍN entero. Las cámaras, los registros, las voces. Y sé cómo habla con la Ciudadela Helios. No os pido perdón. Os ofrezco un trato.',
      clamor: '«¡El que nos contaba! ¡El que nos puso un número!»',
      comentario: 'El hombre que convirtió a todo el mundo en un número. Y el único que sabe por qué Helios nos ha dejado a oscuras.',
      retrato: { piel: '#ecc9ad', pelo: '#c9c4bd', estilo: 'corto', ropa: '#2d3a45', gafas: true },
      perdonar: { efecto: { ira: 14, principios: 1 }, texto: 'Tomasz Wren sale con las manos en los bolsillos. Nadie sabe adónde va. Eso preocupa a Mara más que la sala.' },
      juzgar: { efecto: { ira: -8 }, texto: 'Tomasz Wren sonríe al salir, como quien ha perdido una partida que ya sabía perdida.' },
      usar: { efecto: { ira: 6, principios: -8, intel: 2, bandera: 'wrenUsado' }, texto: 'Tomasz Wren tendrá un despacho en el nivel -4 de La Aguja. Con un guardia en la puerta. Y las llaves de ODÍN.' }
    }
  ],

  informe: {
    firma: 'mara',
    comentarios: [
      { si: 'linchamiento', texto: 'Esta noche hay tres hombres colgados en la Puerta del Sol, Elías. Tres. Y nadie del Comité estaba allí para impedirlo.' },
      { si: 'ira>=70', texto: 'La calle pide sangre. Hoy lo he oído en la cola del pan: «el archivero los suelta a todos». Mañana será peor.' },
      { si: 'principios<55', texto: 'Esta tarde las cámaras del Distrito 1 han vuelto a parpadear en rojo. Sé que has sido tú. No me gusta cómo se ve eso desde la calle.' },
      { si: 'ira<25', texto: 'La sala ha salido contenta. Eso me preocupa más que si hubiera salido furiosa. Nunca he visto una sala contenta después de meter a gente en la cárcel.' },
      { texto: 'Nadie nos enseñó a hacer esto. A escondernos, sí. A juzgar, no. Lo has hecho mejor que la mayoría. No te lo tomes como un cumplido.' }
    ],
    extras: [
      { si: 'wrenUsado', texto: 'Y has dejado a Wren con las llaves de ODÍN. Espero que sepas lo que haces.' },
      { si: 'linaPerdonada', texto: 'Lo de la niña... Anselmo dice que ha sido lo único bueno del día.' },
      { si: 'brandtPerdonado', texto: 'Brandt mañana a las ocho. Seguro que llega a las ocho menos uno.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'madridOscura', texto: '17:00. Ya es de noche. En la Gran Vía, la gente se agrupa alrededor de bidones encendidos.', siguiente: 's2' },
      s2: { rama: [{ si: 'ira>=60', ir: 's3m' }, { si: 'ira<35', ir: 's3b' }], siguiente: 's3n' },
      s3m: { texto: 'Un hombre se aparta del fuego al verle pasar. «Ahí va el archivero. El que los suelta a todos.» Nadie le contesta. Nadie le defiende.', siguiente: 's4' },
      s3b: { texto: 'Una mujer le hace sitio junto al bidón sin decir nada. Le pasa una lata de sopa caliente. Es la primera vez que alguien le da algo sin pedirle un sello a cambio.', siguiente: 's4' },
      s3n: { texto: 'Nadie le mira. En la oscuridad, todas las caras son iguales. Por primera vez en su vida, eso no le parece un alivio.', siguiente: 's4' },
      s4: { rama: [{ si: 'hijoDeLaVoz', ir: 's5v' }], siguiente: 's6' },
      s5v: { texto: 'Un niño le tira de la manga. «¿Es verdad que eres el hijo de la Voz?» Su madre lo aparta, avergonzada, pero sonríe.', siguiente: 's6' },
      s6: { quien: 'elias', pensamiento: true, texto: 'Mañana el Comité vota lo de Voss. Toda la ciudad lo sabe. Toda la ciudad ya ha votado.' }
    }
  }
};

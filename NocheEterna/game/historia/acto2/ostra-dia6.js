// ============================================================
//  ACTO 2 · DÍA 6 — «Tierra de nadie» (los dos caminos juntos)
//  Sábado, 9 de febrero de 2041. El puente hacia Helios está volado. La única vía buena pasa por Ostra,
//  una ciudad muerta desde el Colapso donde viven seis mil personas sin Índice.
//  Formato Comité con mesa propia (datos.mesa): la PUERTA DEL RÍO. Sellos ACOGER · RECHAZAR · A PRUEBA
//  y la tentación: REGISTRAR. Medidores: TENSIÓN del refugio y PRINCIPIOS.
//  El último expediente es el carro de Bogdan: un periódico de 2007 con la foto entera. El padre de Elías es Voss.
// ============================================================

window.OSTRA_DIA6 = {
  numero: 6,
  fecha: 'Sábado, 9 de febrero de 2041',
  horaInicio: 9,
  horaFin: 17,
  escenaCasa: 'ostra',
  escenaMesa: 'puestoOstra',

  mesa: {
    medidor: 'refugio',
    iraInicial: 40,
    cabecera: 'CIUDAD DE OSTRA · PUERTA DEL RÍO',
    tipoPapel: 'SOLICITUD DE REFUGIO',
    etiquetaCargo: 'VIENE DE',
    etiquetaAcusacion: 'Pide',
    ayuda: '<b>A</b> acoger · <b>R</b> rechazar · <b>P</b> a prueba · <b>E</b> registrar',
    sellos: [
      { id: 'acoger', tecla: 'a', boton: '<u>A</u>COGER', cls: 'verde', rotulo: 'ACOGIDO', efecto: { ira: 5, principios: 3 } },
      { id: 'rechazar', tecla: 'r', boton: '<u>R</u>ECHAZAR', cls: 'rojo', rotulo: 'RECHAZADO', efecto: { ira: -5, principios: -5 } },
      { id: 'prueba', tecla: 'p', boton: 'A <u>P</u>RUEBA', cls: 'memo', rotulo: 'A PRUEBA', efecto: { ira: 2, principios: -1 } }
    ],
    consulta: {
      tecla: 'e', boton: 'R<u>E</u>GISTRAR', rotulo: 'REGISTRO', coste: { principios: -4 }, bandera: 'registroUsado',
      aviso: 'Has mandado registrar a alguien que solo pedía un techo · −4% principios'
    },
    estallido: {
      bandera: 'motinOstra',
      texto: 'MOTÍN EN LA COLA DEL PAN · La gente de Ostra ha cerrado la Puerta del Río con sus propias manos. Hoy ya no entra nadie más.'
    },
    acta: 'REGISTRO DE LA PUERTA · CIUDAD DE OSTRA',
    salir: 'Cerrar la puerta ▸'
  },

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'trenNieve', texto: 'Sábado. 7:40. El tren de Kurt frena en seco en mitad de la llanura blanca. Delante, donde tendría que estar el puente sobre el río, hay dos muñones de hierro retorcido.', siguiente: 'a2' },
      a2: { quien: 'kurt', texto: 'Volado. Hace poco: la nieve de los hierros aún no ha cuajado. Alguien no quiere que lleguemos a Helios por aquí.', siguiente: 'a3' },
      a3: { rama: [{ si: 'relojeroConGrupo', ir: 'a4r' }], siguiente: 'a4m' },
      a4r: { quien: 'relojero', texto: 'O alguien quiere que lleguemos por otro sitio. Hel no vuela puentes. Hel elige caminos.', siguiente: 'a5' },
      a4m: { quien: 'mara', texto: 'O alguien quiere que lleguemos por otro sitio. Primero nos abre la alambrada y luego nos cierra el puente. Esto tiene forma de embudo.', siguiente: 'a5' },
      a5: { quien: 'kurt', texto: 'Hay otra vía. Doce kilómetros al norte, por el puente viejo de Ostra. Pero el cambio de agujas está en la estación de Ostra, y en Ostra no entra nadie sin permiso de Ostra.', siguiente: 'a6' },
      a6: { quien: 'elias', texto: '¿Qué es Ostra?', siguiente: 'a7' },
      a7: { quien: 'kurt', texto: 'Una ciudad que se murió en el Colapso y no se ha enterado. Seis mil personas sin Índice, sin cartilla y sin luz. La Orden no entra porque no hay nada que llevarse. Ellos no salen porque fuera está la Orden.', siguiente: 'b1' },

      b1: { escena: 'ostra', texto: '10:15. Ostra. Bloques de viviendas sin cristales, chimeneas de lata en todas las ventanas y una muralla hecha con coches, puertas y somieres. Sobre la puerta del río, alguien ha pintado: «AQUÍ NO HAY NÚMEROS».', siguiente: 'b2' },
      b2: { quien: 'wanda', texto: 'Wanda Krol. Alcaldesa, porque nadie más quiso. Os he visto llegar en ese tren de carbón. Y detrás de vosotros, desde el amanecer, una cola de gente que viene de las colonias. Tu fuga, archivero, me ha llenado la puerta.', siguiente: 'b3' },
      b3: { rama: [{ si: 'barracon12Libre', ir: 'b4a' }], siguiente: 'b4b' },
      b4a: { quien: 'wanda', texto: 'Y treinta y dos de ellos vienen en tu propio tren. Tengo comida para veinte bocas más. No para cien.', siguiente: 'b5' },
      b4b: { quien: 'wanda', texto: 'Tengo comida para veinte bocas más. No para todos los que están en la cola.', siguiente: 'b5' },
      b5: { quien: 'wanda', texto: 'Os propongo un trato. Mi gente arregla esta noche el cambio de agujas de la estación. A cambio, tú te sientas hoy en mi puerta y decides quién entra.', siguiente: 'b6' },
      b6: { quien: 'elias', texto: '¿Por qué yo?', siguiente: 'b7' },
      b7: { quien: 'wanda', texto: 'Porque sabes leer los papeles de la Orden, y la mitad de los de la cola los traen falsos. Y porque si decido yo, mañana me cuelgan los que se quedaron fuera. Si decide un forastero, solo te odiarán a ti. Y tú te vas mañana.', siguiente: 'b8' },
      b8: { rama: [{ si: 'juliaLibre', ir: 'b9j' }], siguiente: 'b9' },
      b9j: { quien: 'julia', texto: 'Hazlo, Elías. Yo me quedo a tu lado. Llevo siete años al otro lado de una mesa así. Sé lo que se ve desde ahí.', efecto: { vinculo_julia: 1 }, siguiente: 'b9' },
      b9: { quien: 'elias', pensamiento: true, texto: 'Otra mesa. Esta vez en la calle, sobre dos bidones y una puerta de armario. Ninguna mesa ha sido nunca tan honesta sobre lo que es.', siguiente: 't1' },

      t1: { escena: 'puestoOstra', texto: 'LA PUERTA DEL RÍO: cada papel es alguien que pide entrar en Ostra. ACOGER (se queda), RECHAZAR (sigue su camino, a la nieve) o A PRUEBA (entra vigilado, a trabajar, hasta que Ostra decida).', siguiente: 't2' },
      t2: { texto: 'El medidor de arriba ahora es la TENSIÓN del refugio: sube con cada boca de más. Si llega al 100%, la gente de Ostra cerrará la puerta por su cuenta. Tus PRINCIPIOS siguen ahí.', siguiente: 't3' },
      t3: { texto: 'Wanda te presta a dos hombres con linternas. REGISTRAR a alguien revela lo que esconde. Pero todos los de la cola saben lo que es que te registren.' }
    }
  },

  normas: {
    titulo: 'PUERTA DEL RÍO · NORMAS DE OSTRA',
    textos: [
      'Hay comida para veinte bocas más. Ni una.',
      'Nadie que haya llevado el uniforme de la Orden.',
      'Los niños entran siempre.',
      'A PRUEBA: dentro, vigilado, trabajando en la vía.',
      'Aquí no hay números. Ni para entrar.'
    ]
  },

  expedientes: [
    {
      id: 'nowak', nombre: 'Familia Nowak (4)', edad: '41 · 38 · 9 · 6', cargo: 'Colonia Este-3, a pie',
      acusacion: 'Refugio para cuatro. Se escaparon anoche, cuando sonó la sirena de Este-1 y las torres de Este-3 se giraron a mirar.',
      pruebas: 'Sin papeles. Dos niños con los pies envueltos en trapos.',
      defensa: 'Oímos la sirena y echamos a correr. No sabíamos adónde. Seguimos las vías y llegamos aquí.',
      clamor: 'En la muralla, una mujer de Ostra: «Cuatro bocas. Dos son niños. Las normas dicen que los niños entran.»',
      julia: { si: 'juliaLibre', texto: 'La sirena de anoche era por nosotros. Esta familia está aquí por nosotros.' },
      comentario: 'Huyeron por nuestra sirena. Nuestra fuga ha abierto un agujero en la nieve, y por el agujero sale gente.',
      retrato: { piel: '#dcb495', pelo: '#5a3a22', estilo: 'corto', ropa: '#4a4a52', arrugas: true },
      acoger: { efecto: { ira: 7, principios: 3 }, texto: 'Los Nowak entran. El pequeño se queda mirando la pintada de la puerta. Todavía no sabe leer.' },
      rechazar: { efecto: { ira: -6, principios: -8 }, texto: 'La familia Nowak se da la vuelta. El padre coge en brazos al pequeño. La nieve les llega a las rodillas.' },
      prueba: { efecto: { ira: 3, principios: 1 }, texto: 'Los padres trabajarán en la vía. Los niños, dentro, que las normas son las normas.' }
    },
    {
      id: 'zielinski', nombre: 'Piotr Zieliński', edad: 24, cargo: 'Guardia Negra · anillo exterior de Helios',
      acusacion: 'Refugio. Desertó hace tres días. Viene sin el visor, pero con las botas y el abrigo del uniforme.',
      pruebas: 'Norma 2: nadie que haya llevado el uniforme de la Orden.',
      defensa: 'Yo nací aquí. En el bloque siete. Me fui con ellos a los dieciséis porque daban de comer. Sé los turnos del anillo de Helios. Os los doy. Solo quiero volver a casa.',
      clamor: 'Desde la muralla: «¡Se fue con ellos! ¡Que vuelva con ellos!»',
      julia: { si: 'juliaLibre', texto: 'Los del anillo exterior me escoltaron en dos traslados. Ninguno me miró a la cara. Este tampoco lo hacía, seguro. Y aun así.' },
      odin: 'En el forro del abrigo: un plano a lápiz del anillo exterior de Helios, con las horas de relevo de cada torre. Y una foto de una mujer de Ostra. Detrás pone «mamá, bloque 7».',
      comentario: 'Veinticuatro años. Ha vuelto a la única puerta de la que se acordaba. Las normas son las normas. Las normas siempre son las normas.',
      retrato: { piel: '#e0bfa5', pelo: '#8a6a40', estilo: 'rapado', ropa: '#1c1c1c', uniforme: true },
      acoger: { efecto: { ira: 14, principios: 2, bandera: 'desertorDentro' }, texto: 'Piotr Zieliński cruza la puerta con la cabeza baja. Alguien le tira una piedra. Una mujer mayor sale del bloque siete corriendo.' },
      rechazar: { efecto: { ira: -8, principios: -4 }, texto: 'Piotr Zieliński no discute. Antes de irse, deja en la mesa un papel doblado: los turnos del anillo de Helios. «Para lo que vayáis a hacer.»' },
      prueba: { efecto: { ira: 5, principios: -2, bandera: 'desertorDentro' }, texto: 'Zieliński dormirá en el sótano de la estación, con un guardia de Ostra en la puerta. Ha dicho que le parece justo.' }
    },
    {
      id: 'b12', si: 'barracon12Libre', nombre: 'Barracón 12 (32 personas)', edad: '7 a 71', cargo: 'Colonia Este-1, en tu tren',
      acusacion: 'Refugio para treinta y dos. Olek habla por todos.',
      pruebas: 'Norma 1: comida para veinte bocas más. Son treinta y dos.',
      defensa: 'Dijiste «iremos todos o no irá nadie». Ya hemos ido. Ahora alguien tiene que quedarse en algún sitio. Nosotros no vamos a Helios, archivero. Somos ferroviarios, enfermeras y viejos.',
      clamor: 'En la cola, los que llevan horas esperando: «¡Treinta y dos de golpe! ¿Y nosotros qué?»',
      comentario: 'Treinta y dos. Prometí que iríamos todos. No prometí adónde.',
      retrato: { piel: '#dcb495', pelo: '#8a6a40', estilo: 'despeinado', ropa: '#4a4a52' },
      acoger: { efecto: { ira: 20, principios: 5, bandera: 'b12EnOstra' }, texto: 'Treinta y dos personas entran en Ostra. Olek cuenta en voz alta en la puerta. La gente de la muralla no aplaude.' },
      rechazar: { efecto: { ira: -10, principios: -12, bandera: 'b12Fuera' }, texto: 'Olek te mira un rato largo. «Entendido, archivero.» Los treinta y dos vuelven a subir al vagón de carbón. Vendrán con vosotros. Adonde sea.' },
      prueba: { efecto: { ira: 9, principios: 1, bandera: 'b12EnOstra' }, texto: 'Los treinta y dos entran a trabajar en la vía. Los que sirvan, se quedan. Olek dice que en un ferrocarril siempre sirve todo el mundo.' }
    },
    {
      id: 'lena', nombre: 'Lena Wolff', edad: 31, cargo: 'Colonia Este-2, a pie',
      acusacion: 'Refugio para una. Dice que es costurera y que se escapó con la sirena de anoche, como los Nowak.',
      pruebas: 'Sin papeles. Habla bien. Demasiado bien para alguien que lleva doce horas andando por la nieve.',
      defensa: 'Coso. Arreglo abrigos, botas, lo que sea. No pido nada más que un rincón cerca de una estufa.',
      clamor: 'La cola se impacienta: «¡Una costurera! ¡Eso sí que hace falta!»',
      julia: { si: 'juliaLibre', texto: 'No la conozco de Este-2. Y en Este-2 yo conocía a todas las costureras: me cosían los números.' },
      odin: 'Las suelas de sus botas son nuevas, de almacén de la Orden. En el forro del cuello, un emisor del tamaño de una moneda. Encendido.',
      comentario: 'Las manos de una costurera tienen callos en el índice y el pulgar. Las suyas no tienen ni uno.',
      retrato: { piel: '#ecc9ad', pelo: '#3a2c20', estilo: 'largo', ropa: '#46463c' },
      acoger: { efecto: { ira: 3, principios: 3, bandera: 'lenaDentro' }, texto: 'Lena Wolff da las gracias con una sonrisa perfecta. Pide la litera más cercana a la estación.' },
      rechazar: { efecto: { ira: -4, principios: -4 }, texto: 'Lena Wolff no protesta. Se aleja por la orilla del río, hacia el norte. No hacia las colonias. Hacia el norte.' },
      prueba: { efecto: { ira: 2, principios: -1, bandera: 'lenaDentro' }, texto: 'Lena Wolff entra a prueba, a coser abrigos en la estación. Exactamente donde quería estar.' }
    },
    {
      id: 'hessel', si: ['recluta_martaR', 'danielEncontrado', 'otrosLibres'], nombre: 'Marta y Daniel Hessel', edad: '49 · 20', cargo: 'Tu tren',
      acusacion: 'Quedarse en Ostra. No ir a Helios.',
      defensa: 'Vine a buscar a mi hijo y lo he encontrado. No me pidas que lo lleve a la Ciudadela. Te he seguido hasta aquí, archivero. Aquí me bajo.',
      clamor: 'Daniel no dice nada. Mira la mesa como si todavía fuera la de la colonia.',
      comentario: 'Marta cruzó media Europa con un nombre en la cabeza. Ha encontrado al chico. Lo demás ya no es asunto suyo.',
      retratoDe: 'marta',
      acoger: { efecto: { ira: 4, principios: 3, bandera: 'martaSeQueda' }, texto: 'Marta Hessel te da un abrazo torpe, de los que no se ensayan. Daniel te da la mano. Se quedan en Ostra.' },
      rechazar: { efecto: { ira: -3, principios: -3, bandera: 'martaSigue' }, texto: '«Te necesitamos en Helios, Marta.» Ella aprieta los labios. «Entonces, después de Helios.» Daniel viene también.' },
      prueba: { efecto: { ira: 2, principios: 1, bandera: ['martaSigue', 'danielSeQueda'] }, texto: 'Daniel se queda en Ostra, trabajando en la vía. Marta sigue con vosotros hasta Helios. «Para que vuelva a casa alguien más.»' }
    },
    {
      id: 'grillo', nombre: '«Grillo» (sin nombre)', edad: '~9', cargo: 'Nadie sabe',
      acusacion: 'Nada. Está en la cola porque la cola es donde hay gente.',
      pruebas: 'Ni papeles, ni número, ni Índice. Dice que lo llaman Grillo porque no para de hablar. No ha dicho nada desde que ha llegado.',
      clamor: 'Silencio en la muralla. Norma 3: los niños entran siempre.',
      julia: { si: 'juliaLibre', texto: 'Elías.' },
      comentario: 'Sin apellido. Sin número. Nadie sabe quién lo dejó en la cola. Yo tenía dos años cuando alguien me dejó en una puerta.',
      comentarioSi: [{ si: 'juliaLibre', texto: 'Sin apellido. Sin número. Mi madre está a mi lado y no dice nada más que mi nombre. Los dos estamos mirando lo mismo.' }],
      retrato: { piel: '#d9b18f', pelo: '#2e2a26', estilo: 'despeinado', ropa: '#4b4034' },
      acoger: { efecto: { ira: 1, principios: 4, bandera: 'grilloDentro' }, texto: 'Grillo cruza la puerta. Se para. Vuelve. Le da algo a Elías: una tuerca. Luego se va corriendo.' },
      rechazar: { efecto: { ira: 0, principios: -20, bandera: 'grilloFuera' }, texto: 'Wanda coge el papel antes de que se seque la tinta y lo rompe. «Los niños entran siempre, forastero. Siempre.» Grillo entra igual.' },
      prueba: { efecto: { ira: 0, principios: -6, bandera: 'grilloDentro' }, texto: 'Wanda tacha «A PRUEBA» con el pulgar. «¿A prueba de qué? Es un niño.» Grillo entra.' }
    },
    {
      id: 'bogdan', nombre: 'Bogdan Lis', edad: 78, cargo: 'Ostra · antiguo bibliotecario',
      acusacion: 'Permiso para quemar la hemeroteca municipal en las estufas del refugio. Veintiséis años de periódicos. Un carro entero.',
      pruebas: 'El carro está aparcado junto a la mesa. Huele a papel viejo y a humedad.',
      defensa: 'Los he guardado desde el Colapso. Nadie los ha leído en quince años. Ahora hay cien bocas más y hace diez bajo cero. Un periódico calienta poco. Veintiséis años calientan una semana.',
      clamor: 'Desde la cola: «¡Que arda! ¡El papel no come!»',
      comentario: 'Un archivero firmando la quema de un archivo. Si alguien me lo hubiera contado hace un mes, me habría reído. No me río.',
      retratoDe: 'bogdan',
      acoger: { efecto: { ira: -10, principios: -2, bandera: 'hemerotecaQuemada' }, texto: 'Bogdan asiente despacio. Empieza a descargar el carro. Del montón se escurre un periódico y cae a tus pies.' },
      rechazar: { efecto: { ira: 8, principios: 3, bandera: 'hemerotecaSalvada' }, texto: '«La memoria no se quema. Ni aquí.» Bogdan se queda quieto. Luego coge un periódico del carro y te lo pone en la mesa.' },
      prueba: { efecto: { ira: -4, principios: 1, bandera: 'hemerotecaLeida' }, texto: 'Arderá, pero después de que alguien lo lea. Bogdan saca el primer periódico del montón y te lo da. «Empiece usted, archivero.»' }
    }
  ],

  informe: {
    firma: 'wanda',
    comentarios: [
      { si: 'motinOstra', texto: 'Han cerrado la puerta con sus manos, forastero. Mis vecinos. Esta noche tendré que ir casa por casa a pedir perdón por ti. Y por mí.' },
      { si: 'ira>=75', texto: 'Hoy has metido en Ostra más bocas de las que caben. Lo sé yo y lo saben ellos. Mañana te vas. Yo me quedo con las bocas.' },
      { si: 'principios<45', texto: 'Has mandado a mucha gente a la nieve. Mis vecinos están contentos. Yo no sé si lo estoy.' },
      { texto: 'Lo has hecho como lo haría alguien que lleva años detrás de una mesa. Rápido, sin mirar mucho. No te lo digo como reproche. A veces es la única forma de no volverse loco.' }
    ],
    extras: [
      { si: 'desertorDentro', texto: 'Piotr Zieliński está en el bloque siete con su madre. A la madre le has devuelto un hijo. Al bloque siete, un guardia negro. Ya veremos qué pesa más.' },
      { si: 'registroUsado', texto: 'Mis hombres dicen que les has mandado registrar a gente. Aquí no registramos a nadie. Por eso existimos.' },
      { si: 'lenaDentro', texto: 'La costurera nueva ha pedido trabajar en la estación. Qué casualidad: justo donde estará tu tren.' },
      { si: 'grilloFuera', texto: 'Y lo del niño no te lo perdono. Que te conste.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'puestoOstra', texto: '17:00. Ya es de noche. Los hombres de Wanda cierran la puerta del río con una cadena. En la mesa solo queda un periódico, amarillo y doblado en cuatro.', siguiente: 's2' },
      s2: { texto: 'GACETA DE LA ENERGÍA · 14 de marzo de 2007. «VOSS ENERGÍA PRESENTA EL PROYECTO LUMEN: LUZ PARA TODA EUROPA».', siguiente: 's3' },
      s3: { texto: 'Debajo, una foto. El equipo de Lumen delante de una maqueta de la central. Elías ya la ha visto: es la misma foto. Pero esta tiene todas las caras.', siguiente: 's4' },
      s4: { rama: [{ si: 'pistaFoto', ir: 's5f' }], siguiente: 's5' },
      s5f: { quien: 'elias', pensamiento: true, texto: 'La foto de Julia. La de la cara recortada con tijeras. Aquí nadie ha recortado nada.', siguiente: 's6' },
      s5: { quien: 'elias', pensamiento: true, texto: 'Ewa Kowalczyk, con gafas ya entonces. Marcos Ferrer, joven y con todo el pelo. Y una mujer de veintisiete años que se ríe. Mi madre.', siguiente: 's6' },
      s6: { texto: 'A su lado, con una mano en el hombro de Julia, un hombre de treinta y tantos años, con el pelo todavía oscuro y un sol pequeño en la solapa.', siguiente: 's7' },
      s7: { texto: 'Pie de foto: «El fundador, Aldric Voss, con la joven ingeniera Julia Aranda, a quien llama "el corazón de Lumen"».', efecto: { bandera: 'vioRecorte' }, siguiente: 's8' },
      s8: { rama: [{ si: 'pistaHombreSol', ir: 's9s' }], siguiente: 's9' },
      s9s: { quien: 'elias', pensamiento: true, texto: 'Un sol pequeño en la solapa. «Un hombre de una empresa de energía preguntó por un niño de San Ildefonso.» En 2032. El año que la Orden me cambió el apellido.', siguiente: 's10' },
      s9: { quien: 'elias', pensamiento: true, texto: 'La mano en el hombro. La forma de mirarla. No es la mano de un jefe. Es la de alguien que no piensa soltarla.', siguiente: 's10' },
      s10: { quien: 'elias', pensamiento: true, texto: 'Marzo de 2007. Yo tenía un año. Él tiene en la foto mi edad. Treinta y cuatro años.', siguiente: 's11' },
      s11: { rama: [{ si: 'ramaCiudad', ir: 's12a' }], siguiente: 's12b' },
      s12a: { quien: 'elias', pensamiento: true, texto: 'El hombre al que juzgamos. El que me miró en La Aguja y dijo: «Así que este es el niño». No era una frase. Era una pregunta que llevaba treinta años sin hacer.', siguiente: 's13' },
      s12b: { quien: 'elias', pensamiento: true, texto: 'El hombre de todas las telepantallas. El que sigue en la Cancillería. El que dijo «no dejar morir» en la ficha de mi madre. No era piedad.', siguiente: 's13' },
      s13: { quien: 'bogdan', texto: '¿Lo conoce? No me extraña. Es el único de esa foto que no ha envejecido peor que el periódico. Puede quedárselo, archivero. A mí ya no me calienta.', efecto: { bandera: 'recorteGuardado' }, siguiente: 's14' },
      s14: { rama: [{ si: 'juliaLibre', ir: 's15j' }], siguiente: 's15' },
      s15j: { texto: 'Al otro lado de la mesa, Julia está mirando el periódico. Ha visto la foto. Ha visto que Elías la ha visto. No dice nada. Se da la vuelta y se va hacia la estación.', siguiente: 's16' },
      s15: { quien: 'elias', pensamiento: true, texto: 'Mi madre no está aquí para explicármelo. Está en Helios. Con él. O con lo que construyeron juntos.', siguiente: 's16' },
      s16: { quien: 'elias', pensamiento: true, texto: 'Doblo el periódico en cuatro. Lo guardo en el bolsillo interior del abrigo, donde los archiveros guardan lo que no se puede sellar.' }
    }
  }
};

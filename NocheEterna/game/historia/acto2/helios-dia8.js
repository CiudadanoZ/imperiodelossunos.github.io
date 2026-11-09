// ============================================================
//  ACTO 2 · DÍA 8 — «El archivo de Lumen» (los dos caminos juntos)
//  Lunes, 11 de febrero de 2041. Elías entra en el nivel 0 con la orden que él mismo selló.
//  Formato Comité con mesa propia: el archivo. Sellos GUARDAR · DEJAR · QUEMAR y LEER EL MARGEN.
//  Medidor: ALARMA (la ronda de la guardia) y PRINCIPIOS.
//  Los papeles cuentan 2005–2041: la llave de dos manos, el anexo de sucesión («Elías Voss Aranda»),
//  la baja denegada de Julia, la V de 44-190-V (Hel, 2032) y el Proyecto CORONA: la trampa.
//  Al salir, Hel le enseña la Sala de la Llave y le explica por qué no necesita obligarle a nada.
// ============================================================

window.HELIOS_DIA8 = {
  numero: 8,
  fecha: 'Lunes, 11 de febrero de 2041',
  horaInicio: 9,
  horaFin: 13,
  escenaCasa: 'talleres',
  escenaMesa: 'archivoLumen',

  mesa: {
    medidor: 'archivo',
    iraInicial: 25,
    cabecera: 'FUNDACIÓN LUMEN · ARCHIVO CENTRAL',
    tipoPapel: 'DOCUMENTO CLASIFICADO',
    etiquetaNombre: 'DOCUMENTO',
    etiquetaEdad: 'FECHA',
    etiquetaCargo: 'FIRMA',
    etiquetaAcusacion: 'Contenido',
    ayuda: '<b>G</b> guardar · <b>D</b> dejar · <b>Q</b> quemar · <b>L</b> leer el margen',
    sellos: [
      { id: 'guardar', tecla: 'g', boton: '<u>G</u>UARDAR', cls: 'verde', rotulo: 'GUARDADO', efecto: { ira: 7 } },
      { id: 'dejar', tecla: 'd', boton: '<u>D</u>EJAR', cls: 'memo', rotulo: 'EN SU CAJA', efecto: { ira: 3 } },
      { id: 'quemar', tecla: 'q', boton: '<u>Q</u>UEMAR', cls: 'rojo', rotulo: 'QUEMADO', efecto: { ira: 9, principios: -2 } }
    ],
    consulta: {
      tecla: 'l', boton: '<u>L</u>EER EL MARGEN', rotulo: 'AL MARGEN', coste: { ira: 5 }, bandera: 'leyoMargenes',
      aviso: 'Lees despacio las notas a mano. La ronda se acerca · +5% alarma'
    },
    estallido: {
      bandera: 'alarmaArchivo',
      texto: 'PASOS EN EL PASILLO · Una linterna barre la puerta del archivo. Se detiene. Luego se aleja. Alguien ha mandado a la guardia a otra parte.'
    },
    acta: 'LO QUE SALE CONTIGO DEL ARCHIVO DE LUMEN',
    salir: 'Salir del archivo ▸'
  },

  intro: {
    inicio: 'a0',
    nodos: {
      a0: { rama: [{ si: ['ramaCiudad', 'ejecucionUltima'], ir: 'x1' }, { si: ['ramaCiudad', 'ejecucionParada'], ir: 'p1' }, { si: 'ramaColonia', ir: 'b1' }], siguiente: 'm1' },

      // --- Madrid, al amanecer ---
      x1: { escena: 'talleres', quien: 'anselmo', texto: 'Se ha cumplido. A las siete y doce. No dijo nada. Bueno, una cosa: preguntó si había llamado el archivero.', efecto: { bandera: 'vossEjecutado' }, siguiente: 'x2' },
      x2: { quien: 'elias', pensamiento: true, texto: 'Mi padre ha muerto esta mañana en un patio de Madrid, con mi voto. No sé qué se supone que tengo que sentir. Siento frío. Aquí abajo siempre hace frío.', siguiente: 'e1' },
      p1: { escena: 'talleres', quien: 'anselmo', texto: 'Lo hemos parado. La calle está que arde y me han llamado traidor tres veces antes del desayuno. Voss ha dicho una sola frase al enterarse: «Que lea el anexo».', efecto: { bandera: 'vossLeeAnexo' }, siguiente: 'e1' },
      m1: { escena: 'talleres', quien: 'kurt', texto: 'Mensaje de Madrid por la frecuencia de los ferroviarios. Del preso Voss, otra vez. Una sola línea: «Que lea el anexo».', efecto: { bandera: 'vossLeeAnexo' }, siguiente: 'e1' },
      b1: { escena: 'talleres', quien: 'kurt', texto: 'La telepantalla del muelle no para de repetirlo: mañana a las seis llega el tren del Canciller. Han puesto banderas en el andén. Dos guardias. Solo dos.', siguiente: 'e1' },

      // --- La entrada al nivel 0 ---
      e1: { quien: 'ilyas', texto: 'Las nueve. La ronda del nivel 0 pasa cada veinte minutos. Con tu orden de mantenimiento entras. Lo que tardes en salir, eso ya es cosa tuya.', siguiente: 'e2' },
      e2: { rama: [{ si: 'monosNucleo', ir: 'e3m' }], siguiente: 'e3' },
      e3m: { texto: 'Mono blanco, tarjeta de técnico cosida en el pecho y la orden 44-190-V en la mano. En el control del nivel 0, el guardia lee la orden, mira el número y abre sin decir nada.', efecto: { ira: -10 }, siguiente: 'e4' },
      e3: { texto: 'Mono gris de los talleres y la orden 44-190-V en la mano. En el control del nivel 0, el guardia mira el mono dos veces. Luego mira el número y abre sin decir nada.', efecto: { ira: 5 }, siguiente: 'e4' },
      e4: { rama: [{ si: 'gretaSala', ir: 'e5g' }], siguiente: 'e6' },
      e5g: { quien: 'greta', texto: 'Por aquí. La puerta del archivo tiene la misma cerradura que la sala de pruebas. Tienes hasta la ronda de las doce. Yo vigilo el pasillo.', efecto: { ira: -5 }, siguiente: 'e6' },
      e6: { rama: [{ si: ['juliaLibre', 'juliaPase'], ir: 'e7j' }], siguiente: 'e8' },
      e7j: { texto: 'Detrás de él, con un cubo y una fregona, entra una limpiadora del nivel 0. Julia. Cierra la puerta con el pie. «No te iba a dejar leer esto solo», dice.', efecto: { vinculo_julia: 1, bandera: 'juliaEnArchivo' }, siguiente: 'e8' },
      e8: { escena: 'archivoLumen', texto: 'El archivo de la Fundación Lumen. Estanterías de metal, cajas con fechas de 2005 a 2041 y una mesa con un flexo. Alguien lo ha ordenado todo con mucho cuidado. Alguien que esperaba visita.', siguiente: 't1' },
      t1: { texto: 'EL ARCHIVO: cada documento es una pieza de lo que pasó. GUARDAR (te lo llevas: abulta), DEJAR (vuelve a su caja) o QUEMAR (el mechero de Kurt: hace humo). LEER EL MARGEN revela las notas a mano.', siguiente: 't2' },
      t2: { texto: 'El medidor de arriba es la ALARMA: la ronda de la guardia. Cuanto más tardas, más cerca está. Lo que guardes puede servir mañana.' }
    }
  },

  normas: {
    titulo: 'ARCHIVO DE LUMEN · NIVEL 0',
    textos: [
      'GUARDAR: te lo llevas en el mono. Abulta, y se nota.',
      'DEJAR: vuelve a su caja, como estaba.',
      'QUEMAR: el mechero de Kurt. Hace humo.',
      'LEER EL MARGEN: las notas a mano. Llevan tiempo.',
      'La ronda pasa cada veinte minutos.'
    ]
  },

  expedientes: [
    {
      id: 'lumen05', nombre: 'Acta fundacional · Proyecto Lumen', edad: '12.09.2005', cargo: 'A. Voss, director',
      acusacion: 'Voss Energía funda el Proyecto Lumen: una red de fusión que llegue a todas las casas de Europa. Equipo: A. Voss, J. Aranda, E. Kowalczyk, M. Ferrer.',
      defensa: 'Ninguna casa a oscuras. Nunca más.',
      julia: { si: 'juliaEnArchivo', texto: 'Esa frase la escribí yo. Él la firmó. Así fue siempre.' },
      odin: 'A lápiz, con la letra de Julia: «Me lo creí. Lo escribo aquí para acordarme de que me lo creí».',
      comentario: 'Mi padre escribió «ninguna casa a oscuras» en 2005. Treinta y seis años después apagó Madrid.',
      retratoDe: 'voss',
      guardar: { efecto: { ira: 6, bandera: 'actaGuardada' }, texto: 'El acta va al bolsillo del mono. Una promesa de hace treinta y seis años no pesa nada.' },
      quemar: { efecto: { ira: 9, principios: -3 }, texto: '«Ninguna casa a oscuras.» Arde enseguida. Las promesas siempre arden enseguida.' }
    },
    {
      id: 'plano14b', nombre: 'Plano 14-B · Interruptor central', edad: '03.2007', cargo: 'A. Voss · J. Aranda',
      acusacion: 'Un mando central capaz de cortar cualquier nodo de la red. Requiere DOS MANOS: un código de voz (primera mano, J. Aranda) y una firma genética viva (segunda mano, A. Voss).',
      pruebas: 'Salvaguarda añadida por J. Aranda: las dos manos deben estar en calma. Una llave que se gira con miedo no gira.',
      defensa: 'Por si un día la red cae en malas manos. Las nuestras son las únicas buenas.',
      julia: { si: 'juliaEnArchivo', texto: 'La salvaguarda fue idea mía. Pensé que así nadie podría usarla. No pensé que alguien supiera esperar.' },
      odin: 'Letra de Julia, más pequeña: «Nadie podrá girarla con una pistola en la nuca. Es lo único que salvé».',
      comentario: 'En calma. Por eso Hel no nos ha detenido. No puede obligarnos a girar la llave. Tiene que conseguir que queramos.',
      retrato: { emblema: true },
      guardar: { efecto: { ira: 7, bandera: 'planoLlaveGuardado' }, texto: 'El plano 14-B, doblado en ocho. Si alguien puede engañar a esa llave, necesitará esto.' },
      quemar: { efecto: { ira: 9, principios: -2 }, texto: 'El plano arde. La llave sigue ahí abajo, entera. Los planos se queman; las máquinas no.' }
    },
    {
      id: 'anexo07', nombre: 'Anexo de sucesión al plano 14-B', edad: '20.11.2007', cargo: 'A. Voss (sin contrafirma)',
      acusacion: 'Si A. Voss falta, la segunda mano pasa a su heredero directo: Elías Voss Aranda, nacido el 2 de marzo de 2006. Muestra genética del menor archivada.',
      pruebas: 'Casilla de la contrafirma de J. Aranda: vacía.',
      julia: { si: 'juliaEnArchivo', texto: 'Tenías veinte meses. Te pinchó un dedo para la muestra. Lloraste. Él dijo que era por el futuro de Europa.' },
      odin: 'Letra de Julia, apretando tanto que rompió el papel: «No. No lo firmo. No es una pieza».',
      comentario: 'Elías Voss Aranda. Tres nombres para un niño de un año y medio. Me quedé con el primero. Era el único que me dejaron.',
      comentarioSi: [{ si: 'vossLeeAnexo', texto: '«Que lea el anexo.» Esto es lo que mi padre quería que leyera. Lo que «me pertenece». Elías Voss Aranda. Me quedé con el primer nombre. Era el único que me dejaron.' }],
      retrato: { emblema: true },
      guardar: { efecto: { ira: 6, bandera: 'anexoGuardado' }, texto: 'El anexo, en el bolsillo interior. Junto al periódico de Ostra. Ya tengo dos papeles que dicen quién soy.' },
      quemar: { efecto: { ira: 9, bandera: 'anexoQuemado' }, texto: 'Elías Voss Aranda arde en un cenicero de metal. La máquina no lee papeles: lee sangre. Pero el papel ya no existe, y eso también cuenta.' }
    },
    {
      id: 'baja08', nombre: 'Solicitud de baja voluntaria · J. Aranda', edad: '04.02.2008', cargo: 'Resuelve: A. Voss',
      acusacion: 'Motivo: «objeción al plano 14-B y a su anexo de sucesión». Resolución: DENEGADA. Retirar el pasaporte. Vigilar a la empleada y al menor.',
      julia: { si: 'juliaEnArchivo', texto: 'Si me iba sola, tú te quedabas con él. Si me iba contigo, nos buscaba a los dos. Así que me fui contigo. Y luego te solté.' },
      odin: 'Letra de Voss: «Que se vaya ella, si quiere. El niño se queda».',
      comentario: '«Ella firmó la salida. Él no la dejó salir.» El cuaderno del Relojero tenía razón a medias. No era a ella a quien no quería dejar salir.',
      retratoDe: 'julia',
      guardar: { efecto: { ira: 6, bandera: 'bajaGuardada' }, texto: 'La baja de Julia. Su firma tiembla un poco. Tenía veintiocho años y un hijo que alguien quería convertir en una llave.' },
      quemar: { efecto: { ira: 9, principios: -3 }, texto: 'La baja denegada arde. La única prueba de que ella intentó irse por las buenas.' }
    },
    {
      id: 'seguridad08', nombre: 'Informe de seguridad · Voss Energía', edad: '19.02.2008', cargo: 'Jefe de seguridad',
      acusacion: 'La empleada J. Aranda desapareció con el menor el día 11. Búsqueda en toda la península: negativa. Ningún menor registrado con los apellidos Voss o Aranda en hospitales ni orfanatos.',
      julia: { si: 'juliaEnArchivo', texto: 'El 11 de febrero. Llovía. Te dejé dormido para no tener que oírte. Hoy hace treinta y tres años.' },
      odin: 'Letra de Voss: «Lo ha dejado sin apellido. Listad a todos los niños sin apellido de Madrid». Debajo, otra mano: «Ciento doce. Imposible comprobarlos todos».',
      comentario: 'Ciento doce niños sin apellido en Madrid en 2008. Uno era yo. Me salvó ser uno más. Me salvó ser nadie.',
      retrato: { emblema: true },
      guardar: { efecto: { ira: 6 }, texto: 'Ciento doce niños sin apellido. Me llevo la lista. Alguien debería buscarlos a todos alguna vez.' },
      quemar: { efecto: { ira: 9, principios: -2 }, texto: 'El informe arde. Ciento doce niños vuelven a no estar en ningún papel.' }
    },
    {
      id: 'semilla32', nombre: 'Proyecto Semilla · revisión del interno 44-190', edad: '14.06.2032', cargo: 'A. Hel, Sección de Linaje',
      acusacion: 'Interno del antiguo San Ildefonso. Apellido asignado por el conserje T. Grau: VOGT. Revisión genética: coincidencia completa con la muestra «Lumen 14-B / anexo».',
      pruebas: 'Resolución: no informar a la Cancillería. Mantener el apellido Vogt. Añadir el sufijo V al número de ciudadano.',
      odin: 'Letra de Hel: «El Canciller pregunta por el niño. El conserje le ha dicho que murió. Que lo siga creyendo».',
      comentario: '44-190-V. La V no era de Vogt. Ella lo sabe desde 2032. Me ha tenido guardado nueve años, como quien guarda una llave en un cajón.',
      comentarioSi: [{ si: 'pistaLinaje', texto: 'La funcionaria del pelo blanco que revisó la ficha falsa de Tobías durante una hora. No fue suerte. Me vio, y me guardó para ella. 44-190-V. Nueve años en un cajón.' }],
      retratoDe: 'inspectora',
      guardar: { efecto: { ira: 6, bandera: 'pruebaHel' }, texto: 'La firma de Hel ocultándole a su Canciller que su hijo vivía. Hay gente en la Orden que mataría por este papel.' },
      quemar: { efecto: { ira: 9, principios: -2 }, texto: 'La revisión de 2032 arde. Con ella, la única prueba de que Hel traicionó a Voss hace nueve años.' }
    },
    {
      id: 'ficha33', nombre: 'Ficha de la interna 2033-114', edad: '09.2033', cargo: 'A. Hel',
      acusacion: 'Detenida en Madrid: la Voz de Madrid. Destino: Colonia Este-1. NO DEJAR MORIR. Motivo real: primera mano del plano 14-B (código de voz).',
      julia: { si: 'juliaEnArchivo', texto: 'Siete años pensando que me mantenían viva por crueldad. Era paciencia. No sé qué es peor.' },
      odin: 'Letra de Hel: «La voz no se puede sacar a la fuerza. Hay que esperar a que ella quiera usarla».',
      comentario: 'No dejar morir. Siete años. Hel no la estaba castigando. La estaba guardando, igual que a mí.',
      retratoDe: 'julia',
      guardar: { efecto: { ira: 6 }, texto: 'La ficha de mi madre. La primera vez que la vi fue una línea en un expediente. Ahora sé lo que significaba.' },
      quemar: { efecto: { ira: 9 }, texto: 'Interna 2033-114 arde. Ojalá con eso dejara de ser un número.' }
    },
    {
      id: 'corona41', nombre: 'Proyecto CORONA', edad: '01.2041', cargo: 'Inspectora A. Hel',
      acusacion: 'El día 12, el primer giro completo de la llave 14-B registrará un CUSTODIO único de la red Helios. Primera mano: J. Aranda. Segunda mano: heredero 44-190-V. Custodio previsto: A. Hel.',
      pruebas: 'Fase 1: cortar Madrid. Fase 2: dejar escapar a la primera mano y al heredero. Fase 3: dejarles llegar. Fase 4: que la giren ellos, en calma, para salvar Madrid.',
      julia: { si: 'juliaEnArchivo', texto: 'Si la giramos para encender Madrid, le damos el mundo. Si no la giramos, Madrid se congela. Lo ha hecho bien. Tan bien como lo habría hecho él.' },
      odin: 'Letra de Hel: «No hay que obligarles a nada. Solo hay que darles una ciudad que salvar».',
      comentario: 'La alambrada abierta. El puente volado. La costurera de Ostra. No nos perseguía: nos traía. Y Madrid a oscuras era el cebo.',
      comentarioSi: [{ si: 'ramaColonia', texto: 'Mandarme a la colonia. La alambrada abierta. El puente volado. La costurera de Ostra. No nos perseguía: nos traía. Y mi madre era el cebo.' }],
      retratoDe: 'inspectora',
      guardar: { efecto: { ira: 7, bandera: 'pruebaCorona' }, texto: 'CORONA, doblado en el pecho. Los fogoneros tienen que ver esto. Todo el mundo tiene que ver esto.' },
      quemar: { efecto: { ira: 9, principios: -2 }, texto: 'CORONA arde. El plan no: el plan está en la cabeza de Hel, no en un papel.' }
    }
  ],

  informe: {
    firma: 'inspectora',
    comentarios: [
      { si: 'alarmaArchivo', texto: 'He mandado a la guardia a otra parte. No me lo agradezca. Yo tardé nueve años en reunir esas cajas. Usted ha tardado una mañana en revolverlas.' },
      { texto: '¿Ha encontrado lo que buscaba? Yo tardé nueve años en reunir esas cajas. Usted ha tardado una mañana. Siempre me han gustado los archiveros.' }
    ],
    extras: [
      { si: 'anexo07_quemar', texto: 'Ha quemado el anexo. Qué gesto tan bonito. La máquina no lee papeles, archivero. Lee sangre.' },
      { si: 'pruebaCorona', texto: 'Se lleva CORONA en el pecho. Enséñeselo a quien quiera. Es un plan que funciona aunque todo el mundo lo conozca.' },
      { si: 'pruebaHel', texto: 'Y mi revisión de 2032. Si quiere enseñársela al Canciller, dese prisa.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'salaLlave', efecto: { bandera: 'leyoArchivo' }, texto: '13:00. La Inspectora Hel abre la puerta de al lado del archivo y se aparta para dejarle pasar. «Venga. Ya que está.» La Sala de la Llave.', siguiente: 's2' },
      s2: { texto: 'Un anillo de luz suspendido sobre dos pedestales. En el de la izquierda, una rejilla para hablar. En el de la derecha, la forma de una mano. Es más pequeño de lo que Elías imaginaba. Las cosas que deciden el mundo siempre lo son.', siguiente: 's3' },
      s3: { quien: 'inspectora', texto: 'Mañana a las cinco no habrá guardias en este pasillo. Ni en la escalera del río. Ni en la torre 4, aunque se hayan tomado la molestia de cegarla.', siguiente: 's4' },
      s4: { quien: 'elias', texto: '¿Por qué iba a venir?', siguiente: 's5' },
      s5: { rama: [{ si: 'ramaColonia', ir: 's6b' }, { si: 'luzMadrid', ir: 's6l' }], siguiente: 's6a' },
      s6a: { quien: 'inspectora', texto: 'Porque Madrid lleva tres semanas a oscuras y a cuatro grados bajo cero. Porque si la llave gira, Madrid se enciende en un minuto. Usted ha visto la orden. La ha tenido en la mano.', siguiente: 's7' },
      s6l: { quien: 'inspectora', texto: 'Porque Madrid lleva tres semanas a oscuras. Cuatro horas de luz en el Hospital Central: eso fue usted, lo sé. Qué poco, ¿verdad? Mañana podría ser la ciudad entera, para siempre.', siguiente: 's7' },
      s6b: { quien: 'inspectora', texto: 'Porque mañana a las seis llega su padre. Y su padre, con su propia mano, encenderá la red entera y la Orden durará cien años más. A menos que alguien la gire antes.', siguiente: 's7' },
      s7: { quien: 'inspectora', texto: 'Ustedes vendrán a salvar algo. Girarán la llave en calma, porque será por algo bueno. Y al girarla, la red me reconocerá a mí. No necesito mentirle, archivero. Solo necesito que no tenga otra opción.', siguiente: 's8' },
      s8: { rama: [{ si: 'vossEjecutado', ir: 's9x' }, { si: 'ramaColonia', ir: 's9b' }], siguiente: 's10' },
      s9x: { quien: 'inspectora', texto: 'Su padre ha muerto esta mañana. Lo siento, de verdad: fue un gran hombre hasta 2008. Ahora usted es la única segunda mano que queda en el mundo. Es usted muy valioso, archivero. Cuídese esta noche.', siguiente: 's10' },
      s9b: { quien: 'inspectora', texto: 'Su padre no sabe que usted existe. Yo me ocupé de eso. Mañana, en el andén, me ocuparé de que no tenga que saberlo nunca.', efecto: { bandera: 'sabePlanVoss' }, siguiente: 's10' },
      s10: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«No vendremos.»', ir: 's11a' },
          { texto: '«¿Y si no la giramos para nadie?»', ir: 's11b', efecto: { bandera: 'preguntoNadie' } },
          { texto: 'No decir nada. Mirar los pedestales.', ir: 's11c' }
        ]
      },
      s11a: { quien: 'inspectora', texto: 'Vendrán. Su madre, por venganza. Usted, por Madrid. Mara Solís, por usted. Llevo nueve años conociéndole, archivero. Usted siempre ha mirado las caras. Mañana mirará las de Madrid.', siguiente: 's12' },
      s11b: { quien: 'inspectora', texto: 'La llave no sabe girar para nadie. Pregúntele a su madre: ella la diseñó. Alguien tiene que quedarse con la luz. Siempre alguien.', siguiente: 's12' },
      s11c: { texto: 'Elías mira los pedestales mucho rato. La rejilla para la voz de su madre. La forma de la mano, que le vendrá exacta. Hel no le mete prisa. Hel nunca tiene prisa.', siguiente: 's12' },
      s12: { quien: 'inspectora', texto: 'Vuelva con los suyos. No voy a seguirle. No hace falta: mañana estará aquí.', siguiente: 's13' },
      s13: { escena: 'helios', quien: 'elias', pensamiento: true, texto: 'He leído miles de expedientes. Nunca había leído uno en el que el que firma la sentencia sabe que el condenado va a venir solo, a su hora, y a dar las gracias.' }
    }
  }
};

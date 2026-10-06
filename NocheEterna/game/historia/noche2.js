// ============================================================
//  NOCHE 2 — Los nuevos
//  Novedad: ASPIRANTES que quieren unirse a los Insomnes.
//    si:          condición para que aparezca
//    dice:        lo que cuenta de sí mismo
//    habilidades: las que tendrá como operativo si lo aceptas
//    traidor:     true si es informante de la Guardia Negra (oculto al jugador)
//    memo:        id del expediente que, si Elías lo memorizó, permite comparar
//    comparacion: lo que Elías recuerda de ese expediente
//    informe:     lo que averigua Ruth si lo investiga (cuesta 1 información)
//  Banderas que se crean: recluta_<id>, traidorDentro (traidor aceptado sin saberlo),
//    traidorUsado (traidor descubierto y aceptado para darle información falsa),
//    traidorExpulsado.
//  Para que un operativo no pueda salir una noche: bandera 'baja_<id>_<noche>'.
// ============================================================

window.NOCHE2 = {
  numero: 2,

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'calle', texto: 'Medianoche. Calle del Reloj, 7. Esta vez Elías conoce el camino. Esta vez cuenta los drones.', siguiente: 'n2' },
      n2: { escena: 'sotano', quien: 'mara', texto: '¿Recuerdas Madrid?', siguiente: 'n3' },
      n3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Recuerdo el sol.»', ir: 'n4a', efecto: { vinculo_mara: 1 } },
          { texto: '«Mara, soy yo.»', ir: 'n4b' }
        ]
      },
      n4a: { quien: 'mara', texto: 'Bien. Casi pareces uno de los nuestros.', siguiente: 'r1' },
      n4b: { quien: 'mara', texto: 'Ya sé que eres tú. La contraseña no es para saber quién eres. Es para saber que nadie te ha seguido.', siguiente: 'r1' },

      // --- El Relojero ---
      r1: { quien: 'mara', texto: '¿Ha pasado algo del Relojero por tu mesa?', siguiente: 'r2' },
      r2: { si: 'memo_relojero', quien: 'elias', texto: 'Tobías Grau. Sesenta y tres años. No lo detuvieron. Se presentó él solo en la Dirección de Seguridad, el 20 de octubre.', efecto: { bandera: 'sabeVoluntario' }, siguiente: 'r3' },
      r3: { si: 'memo_relojero', quien: 'ruth', texto: 'Mentira.', siguiente: 'r4' },
      r4: { si: 'memo_relojero', quien: 'mara', texto: '...No. Tobías no se rinde. Si entró por su propio pie, es porque quería estar dentro.', siguiente: 'r5' },
      r5: { si: '!memo_relojero', quien: 'elias', texto: 'Pasó un expediente. No pude memorizarlo entero. Solo vi la foto y el sello.', siguiente: 'r6' },
      r6: { si: 'relojeroTrasladado', quien: 'elias', texto: 'Hoy he sellado su traslado. A La Aguja. Nivel menos cuatro.', siguiente: 'r7' },
      r7: { si: 'relojeroTrasladado', quien: 'mara', texto: 'La Aguja. El único sitio de esta ciudad donde no podemos entrar.', siguiente: 'r8' },
      r8: { si: 'relojeroTrasladado', quien: 'ruth', texto: 'O el único sitio donde él quería estar.', siguiente: 'r9' },
      r9: { si: 'relojeroEnCentro3', quien: 'elias', texto: 'Iban a trasladarlo a La Aguja. Rechacé el traslado. Sigue en el Centro de Reeducación 3.', siguiente: 'r10' },
      r10: { si: 'relojeroEnCentro3', quien: 'mara', texto: 'Entonces aún podemos sacarlo de allí. Necesitaremos los planos del Centro 3.', siguiente: 'r11' },
      r11: { si: 'relojeroEnCentro3', quien: 'ruth', texto: 'Y si él quería ir a La Aguja, le acabas de estropear el plan, niño. Ya veremos cuál de las dos cosas es.', siguiente: 't1' },

      // --- Chispa ---
      t1: { si: 'tomasBuscado', quien: 'tomas', texto: 'He visto mi cara en la telepantalla del mercado. Busca y captura. Gracias por el sello, archivero.', efecto: { bandera: 'baja_tomas_2' }, siguiente: 't2' },
      t2: {
        si: 'tomasBuscado', quien: 'elias', texto: '...', siguiente: 't4',
        opciones: [
          { texto: '«No tenía elección. Brandt me vigila.»', ir: 't3a' },
          { texto: '«Lo siento. De verdad.»', ir: 't3b', efecto: { vinculo_tomas: 1 } }
        ]
      },
      t3a: { quien: 'tomas', texto: 'Ya. Nadie la tiene. Por eso estamos todos aquí abajo. Esta noche no puedo salir: mi cara está en todas partes.', siguiente: 'p1' },
      t3b: { quien: 'tomas', texto: '...Vale. Te creo. Pero esta noche no puedo salir: mi cara está en todas partes.', siguiente: 'p1' },
      t4: { si: 'tomasProtegido', quien: 'tomas', texto: 'Dos veces. Me has salvado dos veces. Empiezo a pensar que me tienes cariño, archivero.', siguiente: 't5' },
      t5: {
        si: 'tomasProtegido', quien: 'elias', texto: '...', siguiente: 'p1',
        opciones: [
          { texto: '«No te acostumbres.»', ir: 't6a', efecto: { vinculo_tomas: 1 } },
          { texto: '«Alguien tiene que mirar las caras.»', ir: 't6b', efecto: { vinculo_tomas: 1 } }
        ]
      },
      t6a: { quien: 'tomas', texto: 'Demasiado tarde. Ya me he acostumbrado.', siguiente: 'p1' },
      t6b: { quien: 'tomas', texto: 'La mía es muy bonita, así que hiciste bien.', siguiente: 'p1' },

      // --- Aspirantes ---
      p1: { si: 'pintadasHechas', quien: 'mara', texto: 'Después de lo del Distrito 9, la gente habla. Esta noche hay caras nuevas que quieren entrar.', siguiente: 'p2' },
      p2: { si: '!pintadasHechas', quien: 'mara', texto: 'Cada vez que cae una célula, sus huérfanos vienen a buscarnos. Esta noche hay caras nuevas que quieren entrar.', siguiente: 'p3' },
      p3: { quien: 'mara', texto: 'Algunos serán valientes. Alguno será de la Guardia Negra. Siempre lo es. Tú has visto pasar sus vidas por tu mesa, Elías. Úsalo.' }
    }
  },

  // ---------------- ASPIRANTES ----------------
  aspirantes: [
    {
      id: 'irene', si: 'ireneSalvada', nombre: 'Irene Castaño', papel: 'Poeta',
      dice: 'Me bajasteis de un tren que iba al Este. Sé escribir, sé mentir en verso y conozco a todas las porteras del Distrito 9.',
      habilidades: { labia: 2, sigilo: 1 },
      traidor: false,
      memo: 'irene',
      comparacion: 'Su expediente decía «poesía no autorizada» y «la imprenta de la vieja». Coincide con todo lo que cuenta.',
      informe: 'Ruth: «Sus poemas llevan siete años en mi imprenta. Respondo por ella con mis dos manos.»'
    },
    {
      id: 'julian', si: 'julianAtrapado', nombre: 'Julián Mora', papel: 'Estibador',
      dice: 'Estoy en la Lista Gris. Me quedan días. Prefiero gastarlos aquí abajo que esperando en casa a que llamen a la puerta.',
      habilidades: { fuerza: 2, sigilo: 1 },
      traidor: false,
      memo: 'julian',
      comparacion: 'Su expediente decía lo mismo que él: Lista Gris, un viaje denegado y ningún sitio adonde ir. No miente.',
      informe: 'Ruth: «Está en la Lista Gris de verdad. Ningún informante se pondría ahí por gusto.»'
    },
    {
      id: 'greta', si: 'gretaRechazada', nombre: 'Greta Lang', papel: 'Exmiembro de la Juventud Solar',
      dice: 'Fui de la Juventud Solar. Ayer me negaron un traslado por un sello caducado hace dos días. Esta mañana me han expulsado. Por fin he entendido para quién trabajaba.',
      habilidades: { tecnica: 1, labia: 1 },
      traidor: false,
      memo: 'greta',
      comparacion: 'Recuerdas su expediente: el sello caducado, la insignia en la solapa. Lo que cuenta cuadra con lo que viste.',
      informe: 'Ruth: «Su expulsión de la Juventud Solar salió esta mañana en el boletín interno. Es real. Lo que no sé es si su rabia durará.»'
    },
    {
      id: 'nico', nombre: 'Nico Barros', papel: 'Obrero de fundición',
      dice: 'Trabajo en la Fundición Helios. Mi hermano murió en una redada el año pasado. Quiero devolvérsela a la Orden.',
      habilidades: { fuerza: 2, labia: 1 },
      traidor: true,
      memo: 'nico',
      comparacion: 'MIENTE. Su expediente decía: «Empleador: Servicio de Enlace · Dirección de Seguridad». No ha pisado una fundición en su vida.',
      informe: 'Ruth: «La cartilla es buena. Demasiado buena. Esa tinta solo la usa la Dirección de Seguridad.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'planos', si: 'relojeroEnCentro3',
      titulo: 'Los planos del Centro 3',
      desc: 'Fotografiar los planos del Centro de Reeducación 3 en la oficina de obras del distrito. Sin ellos no habrá rescate.',
      habilidad: 'sigilo', base: 40,
      coste: { suministros: 1 },
      recompensa: { intel: 1, bandera: 'planosCentro3' },
      captura: 0.4,
      exito: '{op} vuelve con un carrete entero. El Centro 3 tiene un túnel de desagüe que nadie ha tapiado desde 2031.',
      fracaso: 'La oficina de obras tiene un guardia nuevo. {op} vuelve sin nada.',
      capturado: 'La alarma salta antes de que {op} llegue a la segunda planta.'
    },
    {
      id: 'aguja', si: 'relojeroTrasladado',
      titulo: 'Una grieta en La Aguja',
      desc: 'Encontrar entre el personal de limpieza de La Aguja a alguien dispuesto a hablar.',
      habilidad: 'labia', base: 30,
      coste: { intel: 1 },
      recompensa: { intel: 1, bandera: 'contactoAguja' },
      captura: 0.45,
      exito: 'Una limpiadora del turno de noche acepta hablar. Dice que en el nivel -4 hay un preso que pide relojes rotos para arreglarlos.',
      fracaso: 'Nadie en La Aguja habla. Tienen miedo hasta de su sombra, y hacen bien.',
      capturado: 'La limpiadora ya había hablado. Con la Guardia Negra.'
    },
    {
      id: 'octavillas',
      titulo: 'Papel y tinta',
      desc: 'Imprimir y repartir octavillas en las colas del racionamiento: «El Día del Sol, apagad la luz.»',
      habilidad: 'tecnica', base: 50,
      coste: { suministros: 1 },
      recompensa: { red: 2, bandera: 'octavillas' },
      captura: 0.3,
      exito: 'Al amanecer, las octavillas pasan de mano en mano dentro de los abrigos. Nadie las lee en público. Todos las leen.',
      fracaso: 'La tinta se corre con la lluvia. Las octavillas son manchas negras.',
      capturado: 'Un Ojo graba a {op} dejando el paquete en la cola del Distrito 6.'
    },
    {
      id: 'hospital',
      titulo: 'Medicinas del Hospital Central',
      desc: 'Sacar antibióticos y vendas del almacén del Hospital Central usando los papeles de «Lucía Ferrer».',
      habilidad: 'labia', base: 40,
      coste: {},
      recompensa: { suministros: 2, bandera: 'medicinas' },
      captura: 0.35,
      exito: '{op} sale por la puerta principal con dos cajas y una sonrisa. Nadie para a una enfermera con prisa.',
      fracaso: 'Han cambiado los códigos del almacén. {op} se va antes de levantar sospechas.',
      capturado: 'La jefa de planta recuerda a la verdadera Lucía Ferrer. Tenía seis años.'
    },
    {
      id: 'eclipse', si: 'odinPinchado',
      titulo: 'Protocolo Eclipse',
      desc: 'Descifrar los mensajes interceptados de ODÍN sobre el «Protocolo Eclipse».',
      habilidad: 'tecnica', base: 45,
      coste: { suministros: 1 },
      recompensa: { intel: 2, bandera: 'eclipseDescifrado' },
      captura: 0.3,
      exito: 'Protocolo Eclipse: el Día del Sol, a las 21:00, ODÍN apagará todas las luces de la ciudad salvo La Aguja. Un minuto de oscuridad total, para que el mundo mire la torre.',
      fracaso: 'El cifrado cambia cada hora. {op} se queda a medias.',
      capturado: 'ODÍN aprende rápido. Esta vez rastrea la señal hasta el origen.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f1',
    nodos: {
      f1: { escena: 'sotano', quien: 'mara', texto: 'Ya está. Queda una hora para el cambio de guardia.', siguiente: 'f1b' },
      f1b: { si: 'algunRecluta', texto: 'Los nuevos se quedan a dormir en el sótano. Mara reparte mantas y se sienta donde puede verlos a todos.', siguiente: 'f2' },
      f2: {
        texto: 'Elías podría irse a casa. O podría quedarse un rato más.',
        opciones: [
          { texto: 'Subir a la azotea con Mara.', ir: 'm1' },
          { texto: 'Ayudar a Chispa con la radio.', ir: 'c1', si: ['tomasSalvado', '!capturado_tomas'] },
          { texto: 'Quedarse con Ruth junto a la imprenta.', ir: 'x1' },
          { texto: 'Irse a casa.', ir: 'z1' }
        ]
      },

      // --- Mara ---
      m1: { escena: 'titulo', texto: 'La azotea de la relojería. Desde aquí se ve La Aguja, la única luz constante de la ciudad.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Yo era enfermera en el Hospital Central. En 2031 nos dieron una lista de pacientes que ya no merecían tratamiento. La primera se llamaba Lucía Ferrer. Tenía seis años.', siguiente: 'm3' },
      m3: { quien: 'elias', pensamiento: true, texto: 'Lucía Ferrer. El nombre de sus papeles falsos.', siguiente: 'm4' },
      m4: { quien: 'mara', texto: 'Uso su nombre para que alguien lo siga diciendo en voz alta.', siguiente: 'm5' },
      m5: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Yo memorizo nombres. Para que no desaparezcan del todo.»', ir: 'm6a', efecto: { vinculo_mara: 2 } },
          { texto: '«Es peligroso. Te pueden rastrear por él.»', ir: 'm6b' }
        ]
      },
      m6a: { quien: 'mara', texto: '...Por eso te elegimos, Elías. No por el Ministerio. Por eso.', siguiente: 'm7' },
      m6b: { quien: 'mara', texto: 'Todo es peligroso. Respirar es peligroso. Recordar, más.', siguiente: 'm7' },
      m7: { texto: 'Se quedan un rato en silencio. Es el primer silencio de su vida que no le pesa.', siguiente: 'z1' },

      // --- Chispa ---
      c1: { texto: 'Chispa tiene una radio abierta en canal sobre la mesa, con piezas por todas partes.', siguiente: 'c2' },
      c2: { quien: 'tomas', texto: '¿Sabes qué es esto? Un receptor de onda corta de 1998. Más viejo que yo. ODÍN no sabe que existe porque no tiene chip.', siguiente: 'c3' },
      c3: { quien: 'tomas', texto: 'Mi padre me enseñó a arreglarlas. Luego se lo llevaron al Este y yo me puse a romper cosas de la Orden. Arreglar lo viejo, romper lo nuevo.', siguiente: 'c4' },
      c4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«¿Me enseñas?»', ir: 'c5a', efecto: { vinculo_tomas: 2 } },
          { texto: '«Tu padre estaría orgulloso.»', ir: 'c5b', efecto: { vinculo_tomas: 1 } }
        ]
      },
      c5a: { quien: 'tomas', texto: '¿En serio? Vale. Pero si rompes algo, lo pagas en café sintético.', siguiente: 'c6' },
      c6: { texto: 'Una hora después, la radio escupe tres segundos de música de otro continente. Elías se ríe. Es un ruido raro. Chispa se ríe más de él por eso.', siguiente: 'z1' },
      c5b: { quien: 'tomas', texto: '...No sabes nada de mi padre. Pero gracias, archivero.', siguiente: 'z1' },

      // --- Ruth ---
      x1: { texto: 'Ruth imprime en silencio. Cada vez que baja la palanca, la máquina suena como un corazón.', siguiente: 'x2' },
      x2: { quien: 'ruth', texto: 'Tú no recuerdas Madrid, ¿verdad? Eras un crío.', siguiente: 'x3' },
      x3: { quien: 'ruth', texto: 'Había una plaza con un oso y un árbol. Y en Nochevieja la gente se comía doce uvas con las doce campanadas. Todo el país a la vez, atragantándose y riéndose.', siguiente: 'x4' },
      x4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Cuéntame más.»', ir: 'x5a', efecto: { vinculo_ruth: 2 } },
          { texto: '«¿Para qué? Ya no existe.»', ir: 'x5b' }
        ]
      },
      x5a: { quien: 'ruth', texto: 'La Gran Vía de noche. Tanta luz que no se veían las estrellas. Ahora solo quedan estrellas.', siguiente: 'x6' },
      x5b: { quien: 'ruth', texto: 'Por eso mismo, niño. Lo que nadie cuenta deja de haber existido. La Orden lo sabe mejor que tú.', siguiente: 'x6' },
      x6: { quien: 'ruth', texto: 'Tobías trabajó una temporada en un Hogar de Formación, ¿sabes? Arreglando relojes. Nunca quiso contar lo que vio allí.', efecto: { bandera: 'pistaHogar' }, siguiente: 'x7' },
      x7: { quien: 'elias', pensamiento: true, texto: 'Un Hogar de Formación. Yo crecí en uno.', siguiente: 'z1' },

      // --- Final ---
      z1: { escena: 'calle', texto: 'De vuelta a casa, pegado a las paredes, contando drones.', siguiente: 'z2' },
      z2: { si: 'traidorDentro', texto: 'En el sótano, alguien espera a que todos se duerman.', siguiente: 'z3' },
      z3: { escena: 'titulo', texto: 'Quedan cinco noches para el Día del Sol.' }
    }
  }
};

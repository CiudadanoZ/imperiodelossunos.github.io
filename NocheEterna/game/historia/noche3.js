// ============================================================
//  NOCHE 3 — La redada
//  Novedad: nodos RAMA { rama: [{ si, ir }, ...], siguiente }
//  No se muestran: saltan al primer 'ir' cuya condición se cumpla
//  (o a 'siguiente' si no se cumple ninguna). Sirven para decir «o».
//  Bandera 'refugioAnden': a partir de ahí la célula vive en el andén de Sol.
//  Bandera 'fuera_<id>': ese operativo deja de estar disponible.
//  Misiones: bonus: [{ si, mas }] suma % de éxito si se cumple la condición.
// ============================================================

window.NOCHE3 = {
  numero: 3,

  llegada: {
    inicio: 'r0',
    nodos: {
      r0: {
        rama: [
          { si: ['traidorDentro_nico', 'avisoRedada'], ir: 'a1' },
          { si: 'traidorDentro_nico', ir: 'b1' },
          { si: 'traidorExpulsado_nico', ir: 'c1' },
          { si: 'traidorRechazado_nico', ir: 'c1' },
          { si: 'traidorUsado_nico', ir: 'd1' }
        ],
        siguiente: 'd1'
      },

      // --- A: Elías avisa a tiempo ---
      a1: { escena: 'calle', texto: '18:16. Calle del Reloj, 7. Elías golpea la puerta trasera tres veces, empapado.', siguiente: 'a2' },
      a2: { escena: 'sotano', quien: 'mara', texto: '¿Elías? ¿Qué haces aquí tan pronto? Si te ha visto un dron...', siguiente: 'a3' },
      a3: { quien: 'elias', texto: 'Nico es de la Guardia Negra. Redada a las once. Lo he leído en su propio informe. Lo he sellado yo.', siguiente: 'a4' },
      a4: { texto: 'Mara no hace preguntas. En veinte minutos vacían el sótano: la imprenta de Ruth, los mapas, la radio. Nico ha salido «a por pan» hace una hora. No volverá.', efecto: { bandera: ['redadaEvitada', 'fuera_nico', 'refugioAnden'], vinculo_mara: 1 }, siguiente: 'a5' },
      a5: { escena: 'anden', texto: 'A las once, desde el andén abandonado de la vieja estación de Sol, oyen las botas de la Guardia Negra sobre sus cabezas. Nadie respira.', siguiente: 'a6' },
      a6: { quien: 'mara', texto: 'Nos has salvado a todos, Elías. A todos. Que no se te olvide nunca, pase lo que pase el domingo.', siguiente: 'k0' },

      // --- B: la redada llega ---
      b1: { escena: 'calle', texto: 'Medianoche. La relojería de la Calle del Reloj tiene la puerta arrancada. Los relojes del escaparate están en el suelo, parados.', siguiente: 'b2' },
      b2: { quien: 'mara', texto: 'No entres. Ven. Rápido.', siguiente: 'b3' },
      b3: { escena: 'anden', texto: 'El andén abandonado de la vieja estación de Sol. Huele a óxido y a humo.', efecto: { bandera: ['redadaSufrida', 'fuera_nico', 'refugioAnden'], red: -2, suministros: -3, sospecha: 10 }, siguiente: 'b4' },
      b4: { quien: 'mara', texto: 'Redada a las once. Nico les abrió la puerta desde dentro.', siguiente: 'b5' },
      b5: {
        rama: [
          { si: 'recluta_julian', ir: 'bj' },
          { si: 'recluta_greta', ir: 'bg' },
          { si: 'recluta_irene', ir: 'bi' }
        ],
        siguiente: 'br'
      },
      bj: { quien: 'ruth', texto: 'Se han llevado a Julián. Se quedó atrás, sujetando la puerta, para que los demás saliéramos. Estaba en la Lista Gris. Supongo que ya lo sabía.', efecto: { bandera: 'capturado_julian' }, siguiente: 'b6' },
      bg: { quien: 'ruth', texto: 'Se han llevado a Greta. Les gritó que era de la Juventud Solar. No la creyeron.', efecto: { bandera: 'capturado_greta' }, siguiente: 'b6' },
      bi: { quien: 'ruth', texto: 'Se han llevado a Irene. Iba recitando algo mientras la subían al furgón. No pude oír qué.', efecto: { bandera: 'capturado_irene' }, siguiente: 'b6' },
      br: { quien: 'ruth', texto: 'Me dieron un culatazo. No es nada. Pero mi imprenta... cuarenta años. Ya no existe.', efecto: { bandera: ['imprentaPerdida', 'baja_ruth_3'] }, siguiente: 'b6' },
      b6: { quien: 'elias', pensamiento: true, texto: 'Yo lo acepté. Yo le di la bienvenida. Tenía su expediente delante y no lo miré bien.', siguiente: 'b7' },
      b7: { quien: 'mara', texto: 'No. Ni se te ocurra. La culpa es de quien abre la puerta, no de quien confía. Si dejamos de confiar, ya han ganado.', siguiente: 'k0' },

      // --- C: Nico fue rechazado o expulsado, pero sabía dónde estaba el sótano ---
      c1: { escena: 'calle', texto: 'Medianoche. La Calle del Reloj está a oscuras. En la puerta de la relojería, una marca de tiza: una flecha hacia abajo y tres letras. SOL.', siguiente: 'c2' },
      c2: { escena: 'anden', texto: 'Mara ha trasladado la célula al andén abandonado de la vieja estación de Sol.', efecto: { bandera: 'refugioAnden' }, siguiente: 'c3' },
      c3: { quien: 'mara', texto: 'Nico sabía dónde estaba el sótano. A las once llegó la Guardia Negra y solo encontró relojes. Echarlo fue buena idea, Elías. Mudarnos, mejor.', siguiente: 'k0' },

      // --- D: Nico sigue dentro, pero sabemos quién es ---
      d1: { escena: 'calle', texto: 'Medianoche. Calle del Reloj, 7. Arriba, en la relojería, hay una luz encendida.', siguiente: 'd1r' },
      d1r: { rama: [{ si: 'traidorUsado_nico', ir: 'd2' }], siguiente: 'd3' },
      d2: { escena: 'sotano', quien: 'mara', texto: 'Nico duerme arriba. Cree que se lo contamos todo. Esta noche le contaremos algo que merezca la pena repetir.', siguiente: 'k0' },
      d3: { escena: 'sotano', quien: 'mara', texto: 'Llegas tarde. Siéntate. Hay mucho que hacer.', siguiente: 'k0' },

      // --- El Relojero ---
      k0: {
        rama: [
          { si: 'relojeroEnCentro3', ir: 'k1' },
          { si: 'relojeroTrasladado', ir: 'k4' }
        ],
        siguiente: 'h0'
      },
      k1: { quien: 'mara', texto: 'Esta noche sacamos a Tobías del Centro 3. Con planos o sin ellos.', siguiente: 'k2' },
      k2: { si: 'planosCentro3', quien: 'mara', texto: 'Tenemos el túnel de desagüe. Es estrecho, huele a muerte y nadie lo vigila. Es perfecto.', siguiente: 'k3' },
      k3: { si: '!planosCentro3', quien: 'ruth', texto: 'Sin planos es un suicidio. Pero Tobías haría lo mismo por cualquiera de nosotros. Lo ha hecho.', siguiente: 'h0' },
      k4: { quien: 'mara', texto: 'Tobías está en La Aguja. No podemos sacarlo de ahí. Pero quizá podamos hacerle llegar un mensaje.', siguiente: 'k5' },
      k5: { si: 'contactoAguja', quien: 'mara', texto: 'La limpiadora del turno de noche. Dice que Tobías le pide relojes rotos para arreglarlos. Podemos esconder algo dentro de uno.', siguiente: 'h0' },

      // --- Hans ---
      h0: {
        rama: [
          { si: 'hansReubicado', ir: 'h1' },
          { si: 'hansSalvado', ir: 'h4' }
        ],
        siguiente: 'i0'
      },
      h1: { quien: 'elias', texto: 'Hoy he sellado la reubicación de un compañero. Hans Keller. Lo detuvieron por memorizar expedientes.', siguiente: 'h2' },
      h2: { quien: 'ruth', texto: 'Como tú.', siguiente: 'h3' },
      h3: { quien: 'elias', pensamiento: true, texto: 'Como yo.', siguiente: 'i0' },
      h4: { quien: 'elias', texto: 'Hoy he rechazado la reubicación de un compañero. Hans Keller. Delante de Brandt.', siguiente: 'h5' },
      h5: { quien: 'mara', texto: 'Entonces su expediente está en revisión y él en un calabozo de distrito. Esos calabozos los conocemos bien.', siguiente: 'i0' },

      // --- Irene ---
      i0: { si: ['ireneBuscada', '!capturado_irene'], quien: 'irene', texto: 'Mi cara vuelve a estar en las telepantallas. Gracias por el sello, archivero. Esta noche me quedo abajo.', efecto: { bandera: 'baja_irene_3' }, siguiente: 'i1' },
      i1: { si: ['ireneProtegida', '!capturado_irene'], quien: 'irene', texto: 'Me han dicho que mi expediente volvió a tu mesa. Y que volvió a salir sin sello. Un día te escribiré un poema. Uno malo, para que no te lo creas.', siguiente: 'x1' },

      x1: { quien: 'mara', texto: 'Hay caras nuevas otra vez. Ya sabéis lo que eso significa: esta vez, miradlas dos veces.' }
    }
  },

  // ---------------- ASPIRANTES ----------------
  aspirantes: [
    {
      id: 'klara', si: 'klaraRechazada', nombre: 'Klara Dietz', papel: 'Maestra',
      dice: 'Llevo tres días en la Lista Gris. Ayer vinieron a por mi vecina. Hoy me han negado la ración. Mañana vendrán a por mí. Prefiero que me encuentren aquí.',
      habilidades: { labia: 1, sigilo: 1, fuerza: 1 },
      traidor: false,
      memo: 'klara',
      comparacion: 'Su expediente: Lista Gris, ración denegada. La denegaste tú. Dice la verdad.',
      informe: 'Ruth: «Klara Dietz. Maestra hasta 2031. Enseñaba a los niños a leer en voz alta. La Orden prefiere que lean en silencio.»'
    },
    {
      id: 'aurora', nombre: 'Aurora Blanco', papel: 'Estudiante de ingeniería',
      dice: 'Estudio ingeniería en el Distrito 4. A mi hermano lo reubicaron el año pasado. Sé abrir cerraduras electrónicas. Dejadme hacer algo que sirva.',
      habilidades: { tecnica: 2, sigilo: 1 },
      traidor: true,
      memo: 'aurora',
      comparacion: 'NO CUADRA. Su expediente decía: «Tramitado por la Oficina 7, Dirección de Seguridad (vía rápida)». Nadie del Distrito 4 tiene amigos en Seguridad. Salvo los que trabajan para ella.',
      informe: 'Ruth: «Su hermano existe y está en el Este, eso es verdad. Lo raro es que desde entonces a ella le han SUBIDO el Índice diez puntos. A los familiares de reubicados se lo bajan. Siempre.»'
    }
  ],

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'rescate', si: 'relojeroEnCentro3',
      titulo: 'Sacar al Relojero',
      desc: 'Entrar en el Centro de Reeducación 3 y sacar a Tobías Grau antes de que la Cancillería insista en trasladarlo.',
      habilidad: 'sigilo', base: 15,
      bonus: [{ si: 'planosCentro3', mas: 35 }],
      coste: { suministros: 1 },
      recompensa: { intel: 2, red: 1, bandera: 'relojeroRescatado' },
      captura: 0.5,
      exito: '{op} vuelve por el túnel de desagüe con un hombre mayor, en los huesos, que no deja de mirar un reloj de bolsillo parado.',
      fracaso: 'Los perros huelen el túnel antes de tiempo. {op} tiene que retroceder sin él.',
      capturado: 'La reja del túnel estaba electrificada. Nadie lo sabía. Tobías sí lo sabía.'
    },
    {
      id: 'mensaje', si: 'relojeroTrasladado',
      titulo: 'Un mensaje al nivel -4',
      desc: 'Esconder un mensaje dentro de un reloj roto y hacérselo llegar a Tobías en La Aguja.',
      habilidad: 'labia', base: 20,
      bonus: [{ si: 'contactoAguja', mas: 35 }],
      coste: { intel: 1 },
      recompensa: { intel: 1, bandera: 'mensajeRelojero' },
      captura: 0.4,
      exito: 'La limpiadora vuelve con otro reloj roto. Dentro de la tapa, grabado con una aguja: «Decidle a Vogt que siga mirando las caras. El domingo a las 21:00 estaré donde tengo que estar.»',
      fracaso: 'La limpiadora no aparece en su turno. Nadie sabe por qué. Nadie pregunta.',
      capturado: 'El reloj pasa por un escáner. Dentro había un mensaje. Y el nombre de quien lo entregó.'
    },
    {
      id: 'hansRescate', si: 'hansSalvado',
      titulo: 'Sacar a Hans Keller',
      desc: 'Hans espera su revisión en el calabozo del Distrito 5. El turno de noche es de un solo guardia, y bebe.',
      habilidad: 'sigilo', base: 45,
      coste: {},
      recompensa: { red: 1, intel: 1, bandera: 'hansRescatado' },
      captura: 0.35,
      exito: 'Hans sale del calabozo repitiendo números de expediente en voz baja, como una oración. Los recuerda todos. Todos.',
      fracaso: 'Esta noche el guardia no bebe. Mala suerte.',
      capturado: 'El guardia no bebía. Nunca había bebido. Era un cebo.'
    },
    {
      id: 'desinfo', si: 'traidorUsado_nico',
      titulo: 'Mentirle a Nico',
      desc: 'Dejar caer delante de Nico un plan falso para el domingo, para que la Guardia Negra mire hacia otro lado.',
      habilidad: 'labia', base: 55,
      coste: {},
      recompensa: { bandera: 'engañoGuardia' },
      captura: 0.1,
      exito: '{op} comenta, como quien no quiere la cosa, que el golpe del domingo será en la Ciudadela Helios. Diez minutos después, Nico sale «a por tabaco».',
      fracaso: 'Nico no muerde el anzuelo. Quizá empieza a sospechar.',
      capturado: 'Nico no se lo cree. Y ya no vuelve.'
    },
    {
      id: 'archivo', si: 'memo_semilla',
      titulo: 'Reconocer el Archivo Central',
      desc: 'Estudiar los turnos de guardia del sótano 2 del Archivo Central, donde se guarda el Proyecto Semilla.',
      habilidad: 'sigilo', base: 45,
      coste: { suministros: 1 },
      recompensa: { intel: 1, bandera: 'reconArchivo' },
      captura: 0.35,
      exito: 'El sótano 2 cambia de guardia a las 03:00. Hay cuatro minutos sin nadie en la puerta de la sala 14.',
      fracaso: 'Hay más guardias de lo normal. Alguien está preparando algo para el domingo.',
      capturado: 'Las cámaras del Archivo Central no giran. Graban siempre.'
    },
    {
      id: 'andenMision', si: 'refugioAnden',
      titulo: 'Hacer habitable el andén',
      desc: 'Bajar mantas, agua y cable eléctrico robado a la vieja estación de Sol.',
      habilidad: 'fuerza', base: 60,
      coste: {},
      recompensa: { suministros: 1, red: 1 },
      captura: 0.2,
      exito: 'A las cuatro de la mañana, el andén tiene luz, agua y, por primera vez, una tetera.',
      fracaso: 'El cable está demasiado vigilado. Otra noche a oscuras.',
      capturado: 'Una patrulla sorprende a {op} con un rollo de cable al hombro.'
    },
    {
      id: 'radio',
      titulo: 'La voz de los Insomnes',
      desc: 'Emitir tres minutos por onda corta en la frecuencia de la telepantalla, con la radio vieja de Chispa.',
      habilidad: 'tecnica', base: 40,
      coste: { suministros: 1 },
      recompensa: { red: 2, bandera: 'radioEmitida' },
      captura: 0.35,
      exito: 'Durante tres minutos, en veinte mil telepantallas, en lugar del himno suena una voz: «¿Recuerdas Madrid?».',
      fracaso: 'ODÍN corta la señal a los veinte segundos. Nadie ha oído nada.',
      capturado: 'Los triangulan en noventa segundos.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'f0',
    nodos: {
      f0: { rama: [{ si: 'refugioAnden', ir: 'f1a' }], siguiente: 'f1s' },
      f1a: { escena: 'anden', texto: 'Las tres de la madrugada en el andén. El farol hace sombras largas sobre las vías muertas.', siguiente: 'f2' },
      f1s: { escena: 'sotano', texto: 'Las tres de la madrugada en el sótano. La bombilla parpadea, como siempre.', siguiente: 'f2' },
      f2: {
        texto: 'Queda una hora antes de que Elías tenga que volver a ser Vogt.',
        opciones: [
          { texto: 'Sentarse con Mara.', ir: 'm0' },
          { texto: 'Buscar a Chispa.', ir: 'c1', si: ['tomasSalvado', '!capturado_tomas'] },
          { texto: 'Acompañar a Ruth.', ir: 'x0' },
          { texto: 'Hablar con el Relojero.', ir: 'r1', si: 'relojeroRescatado' },
          { texto: 'Irse a casa.', ir: 'z1' }
        ]
      },

      // --- Mara: la relación depende de cuánto se hayan acercado ---
      m0: { rama: [{ si: 'vinculo_mara>=3', ir: 'm1' }], siguiente: 'n1' },
      m1: { texto: 'Mara está sentada en el suelo, con la espalda contra la pared. Le hace sitio a su lado sin decir nada.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: '¿Tienes miedo?', siguiente: 'm3' },
      m3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Sí.»', ir: 'm4a', efecto: { vinculo_mara: 1 } },
          { texto: '«Contigo aquí, menos.»', ir: 'm4b', efecto: { vinculo_mara: 2, bandera: 'maraConfesion' } }
        ]
      },
      m4a: { quien: 'mara', texto: 'Bien. Los que no tienen miedo no vuelven.', siguiente: 'm5' },
      m4b: { quien: 'mara', texto: '...No digas eso, Elías. Aquí abajo la gente se muere. No quiero que me duela más de lo que ya me va a doler.', siguiente: 'm5' },
      m5: { texto: 'Mara le coge la mano. No la aprieta. Solo la deja ahí, encima de la suya.', siguiente: 'm6' },
      m6: { quien: 'mara', texto: 'Para que no se te olvide que tienes una.', siguiente: 'm7' },
      m7: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: 'Entrelazar los dedos con los suyos.', ir: 'm8a', efecto: { vinculo_mara: 1, bandera: 'maraMano' } },
          { texto: 'Retirar la mano con cuidado.', ir: 'm8b', efecto: { bandera: 'maraDistancia' } }
        ]
      },
      m8a: { texto: 'Se quedan así hasta que el farol parpadea. Ninguno de los dos dice nada. No hace falta. Es la primera vez en treinta y cuatro años que alguien le coge la mano a Elías.', siguiente: 'z1' },
      m8b: { quien: 'mara', texto: 'Tienes razón. Aún no. Quizá cuando esto acabe. Si acaba.', siguiente: 'z1' },

      n1: { texto: 'Mara está vendando la mano de alguien. Le hace un gesto para que se acerque.', siguiente: 'n2' },
      n2: { quien: 'mara', texto: 'Mira. Si alguien cae en La Aguja, aprietas aquí, con todo tu peso. Tres minutos. Aunque grite.', siguiente: 'n3' },
      n3: { quien: 'elias', texto: '¿Y si el que cae soy yo?', siguiente: 'n4' },
      n4: { quien: 'mara', texto: 'Entonces aprieto yo. Aunque grites.', efecto: { vinculo_mara: 1, bandera: 'primerosAuxilios' }, siguiente: 'z1' },

      // --- Chispa ---
      c1: { texto: 'Chispa está sentado en un rincón, con algo pequeño y brillante entre los dedos.', siguiente: 'c2' },
      c2: { quien: 'tomas', texto: 'Esto es una llave. No de puerta: de ODÍN. Un chip de mantenimiento que robé antes de que me pillaran. Si lo metes en el núcleo, ODÍN se queda ciego diez minutos.', siguiente: 'c3' },
      c3: { quien: 'tomas', texto: 'Si me pasa algo, quédatela tú. Tú sabes moverte por sitios oficiales. Tienes cara de funcionario, archivero. Es un cumplido. Más o menos.', siguiente: 'c4' },
      c4: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«No te va a pasar nada.»', ir: 'c5a', efecto: { vinculo_tomas: 1 } },
          { texto: '«La guardo. Y te la devuelvo el domingo.»', ir: 'c5b', efecto: { vinculo_tomas: 2, bandera: 'llaveODIN' } }
        ]
      },
      c5a: { quien: 'tomas', texto: 'Eso dicen siempre los que luego lloran. Anda, quédatela igualmente.', efecto: { bandera: 'llaveODIN' }, siguiente: 'z1' },
      c5b: { quien: 'tomas', texto: 'Trato hecho, hermano. Y si no me la devuelves, te persigo como fantasma. Un fantasma muy pesado.', siguiente: 'z1' },

      // --- Ruth ---
      x0: { rama: [{ si: 'imprentaPerdida', ir: 'x1b' }], siguiente: 'x1' },
      x1: { texto: 'Ruth limpia sus tipos de imprenta uno a uno, como si fueran dientes de leche.', siguiente: 'x2' },
      x1b: { texto: 'Ruth le da vueltas a un solo tipo de imprenta: la letra M. Es lo único que salvó de su máquina.', siguiente: 'x2' },
      x2: { rama: [{ si: 'pistaHogar', ir: 'x3' }], siguiente: 'y1' },
      x3: { quien: 'ruth', texto: 'Te dije que Tobías trabajó en un Hogar de Formación. Fue en el Hogar número 4. Antes de la Orden se llamaba Colegio de San Ildefonso. Los niños de ese colegio cantaban la lotería de Navidad, ¿sabes? Los números, con voces de pájaro.', siguiente: 'x4' },
      x4: { quien: 'elias', texto: 'Yo crecí en el Hogar número 4.', siguiente: 'x5' },
      x5: { quien: 'ruth', texto: '...Ya lo sé, niño. Tobías me lo contó hace años. Me hizo jurar que no te lo diría hasta que tú preguntaras.', efecto: { vinculo_ruth: 2, bandera: 'ruthSabe' }, siguiente: 'x6' },
      x6: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«¿Qué más te contó?»', ir: 'x7a' },
          { texto: '«No quiero saber más. Todavía no.»', ir: 'x7b' }
        ]
      },
      x7a: { quien: 'ruth', texto: 'Que te llamaban «el niño que miraba». Que llorabas por los demás y nunca por ti. Y que él sí lloró, por ti. Lo demás te lo tendrá que contar él.', siguiente: 'z1' },
      x7b: { quien: 'ruth', texto: 'Sabia decisión. La verdad pesa. Llévala cuando tengas los hombros para ella.', siguiente: 'z1' },
      y1: { quien: 'ruth', texto: 'Tres noches sin dormir, niño. Siéntate. Te voy a enseñar a falsificar una firma. Es lo más útil que sé hacer, y no me queda mucho tiempo para enseñarlo.', efecto: { vinculo_ruth: 1, bandera: 'sabeFalsificar' }, siguiente: 'z1' },

      // --- El Relojero ---
      r1: { texto: 'El Relojero está sentado aparte, dándole cuerda a un reloj de bolsillo que no funciona.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Elías.', siguiente: 'r3' },
      r3: { quien: 'elias', pensamiento: true, texto: 'Nadie le ha dicho cómo me llamo. Y no ha dicho «Vogt». Ha dicho Elías, como si lo hubiera dicho mil veces.', siguiente: 'r4' },
      r4: { quien: 'relojero', texto: 'Me habéis sacado de donde necesitaba estar. Tres semanas de preparación, a la basura.', siguiente: 'r5' },
      r5: { quien: 'relojero', texto: 'Pero te agradezco la intención. Siempre fuiste así. De pequeño llorabas por los demás y nunca por ti.', siguiente: 'r6' },
      r6: { quien: 'elias', texto: '¿Nos conocemos?', siguiente: 'r7' },
      r7: { quien: 'relojero', texto: 'Te conocí cuando todavía llorabas. Luego aprendiste a no hacerlo. Lo siento por eso. Más de lo que imaginas.', siguiente: 'r8' },
      r8: { quien: 'relojero', texto: 'El resto te lo contaré el domingo. Si llegamos al domingo.', efecto: { bandera: 'relojeroHablo' }, siguiente: 'z1' },

      // --- Final ---
      z1: { escena: 'calle', texto: 'De vuelta a casa, pegado a las paredes. Los drones vuelan más bajo que ayer.', siguiente: 'z2' },
      z2: { si: 'traidorDentro_aurora', texto: 'En el refugio, alguien nuevo finge dormir y cuenta las respiraciones de los demás.', siguiente: 'z3' },
      z3: { escena: 'titulo', texto: 'Quedan cuatro noches para el Día del Sol.' }
    }
  }
};

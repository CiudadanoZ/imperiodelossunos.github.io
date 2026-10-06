// ============================================================
//  DÍA 7 — Domingo, 9 de noviembre de 2040 · EL DÍA DEL SOL
//  Formato ASALTO (ver js/asalto.js):
//    fases: [{ id, si, hora, guion, prueba }]
//      prueba: { titulo, desc, base, bonus: [{ si, mas, texto }], exito: { texto, efecto, guion }, fracaso: {...} }
//      al resolverse crea la bandera <id>Exito o <id>Fracaso
//    finales: el primero cuya condición se cumple
//    destinos: líneas de la pantalla final
//  Estado.logros cuenta las fases superadas. Bandera 'precioAlto' = la victoria costó cara.
// ============================================================

// ---------- El juicio: lo comparten los dos finales de victoria ----------
function nodosJuicio(sig) {
  return {
    j1: { escena: 'tribunal', texto: 'Tres meses después. Madrid. Ya nadie dice «Nueva Berlín».', siguiente: 'j2' },
    j2: { texto: 'El juicio contra Aldric Voss es el primero en nueve años con abogados, con testigos y con público. Y sin guion.', siguiente: 'j3' },
    j3: { si: ['hansRescatado', '!capturado_hans'], quien: 'hans', texto: 'Hans Keller. Archivero. Mesa 12. Testifico que el acusado firmó personalmente cuatro mil doscientas reubicaciones. Recuerdo los números de todas.', siguiente: 'j4' },
    j4: { si: 'semillaConseguida', texto: 'La prueba número uno es una caja de cartón chamuscada: el Proyecto Semilla. Doce mil niños a los que la Orden les quitó el apellido.', siguiente: 'j5' },
    j5: { si: ['recluta_brandt', '!capturado_brandt'], quien: 'brandt', texto: 'Konrad Brandt. Durante once años firmé reubicaciones que redactaban otros. Soy culpable. Y vengo a decir de quién.', siguiente: 'j6' },
    j6: { texto: 'El último testigo es un archivero de treinta y cuatro años. No trae papeles. No los necesita.', siguiente: 'j7' },
    j7: { quien: 'elias', texto: 'Voy a decir los nombres. Los que pasaron por mi mesa y los que me quitaron.', siguiente: 'n1' },
    n1: { si: 'tomasReubicado', quien: 'elias', texto: 'Tomás Rey. Diecinueve años. En la foto sonreía.', siguiente: 'n2' },
    n2: { si: 'ireneReubicada', quien: 'elias', texto: 'Irene Castaño. Treinta y cuatro años. Poeta.', siguiente: 'n3' },
    n3: { si: 'hansReubicado', quien: 'elias', texto: 'Hans Keller. Cincuenta y un años. Archivero. Detenido por recordar.', siguiente: 'n4' },
    n4: { si: ['klausReubicado', '!klausRescatado'], quien: 'elias', texto: 'Klaus Ernst. Cincuenta y ocho años. Lo denuncié yo. Digo su nombre también por eso.', siguiente: 'n5' },
    n5: { si: ['leoReubicado', '!leoRescatado'], quien: 'elias', texto: 'Leo Sanz. Veintitrés años. Tardaba cuatro minutos por expediente porque miraba las caras.', siguiente: 'n6' },
    n6: { si: 'capturado_julian', quien: 'elias', texto: 'Julián Mora. Cuarenta y cuatro años. Sujetó una puerta para que los demás salieran.', siguiente: 'n7' },
    n7: { si: 'capturado_irene', quien: 'elias', texto: 'Irene Castaño. Iba recitando algo cuando la subieron al furgón.', siguiente: 'n7b' },
    n7b: { si: 'capturado_greta', quien: 'elias', texto: 'Greta Lang. Veintinueve años. Les gritó que era de la Juventud Solar. No la creyeron.', siguiente: 'n7c' },
    n7c: { si: ['capturado_tomas', '!tomasRescatado'], quien: 'elias', texto: 'Tomás Rey. Chispa. Diecinueve años. Le prometí un concierto.', siguiente: 'n7d' },
    n7d: { si: 'capturado_hans', quien: 'elias', texto: 'Hans Keller. Lo saqué de un calabozo y lo perdí en otro.', siguiente: 'n7e' },
    n7e: { si: 'capturado_brandt', quien: 'elias', texto: 'Konrad Brandt. Mi supervisor. Me encubrió toda la semana sin saber por qué.', siguiente: 'n8' },
    n8: { si: ['ruthCaida', '!ruthRescatada'], quien: 'elias', texto: 'Ruth Adler. Setenta y un años. Falsificadora. Me dejó mi nombre en un buzón.', siguiente: 'n9' },
    n9: { si: 'relojeroCaido', quien: 'elias', texto: 'Tobías Grau. Conserje. Relojero. Me encontró en una puerta cuando tenía dos años. Y me escondió. Y vendió a mi madre. Las tres cosas.', siguiente: 'n10' },
    n10: { quien: 'elias', texto: 'Lucía Ferrer. Seis años. La primera de una lista del Hospital Central, en 2031.', siguiente: 'n11' },
    n11: { quien: 'elias', texto: 'Julia Aranda. La Voz de Madrid. Mi madre.', siguiente: 'n12' },
    n12: { si: 'promesaNombres', quien: 'elias', texto: 'Y uno más. Mara Solís Ortega, nacida en Lavapiés. Me pidió que lo dijera aquí si caía. No cayó. Lo digo igual, para que conste que estuvo.', siguiente: 'j8' },
    j8: { texto: 'Tarda cuatro horas en decirlos todos. Nadie sale de la sala. Nadie mira el reloj.', siguiente: 'j9' },
    j9: { quien: 'voss', texto: 'La historia me absolverá.', siguiente: 'j10' },
    j10: { quien: 'elias', pensamiento: true, texto: 'No. La historia no absuelve a nadie. La historia recuerda.', siguiente: 'j11' },
    j11: { texto: 'Veredicto: culpable de crímenes contra la humanidad. Cadena perpetua. La nueva ciudad había votado no tener pena de muerte. Fue lo primero que votó.', siguiente: 'j12' },
    j12: { texto: 'Aldric Voss pasará el resto de su vida en una celda con una ventana. Con luz. Todas las noches.', siguiente: sig }
  };
}

window.ASALTO = {
  numero: 7,
  titulo: 'DÍA 7',
  fecha: 'Domingo, 9 de noviembre de 2040 · Día del Sol',

  fases: [
    // ---------------- LA MAÑANA ----------------
    {
      id: 'manana', hora: 8,
      guion: {
        inicio: 'a1',
        nodos: {
          a1: { escena: 'apartamento', texto: 'Domingo. La telepantalla no se enciende a las seis. Se enciende a las ocho, con el himno completo y a todo volumen.', siguiente: 'a2' },
          a2: { quien: 'pantalla', texto: 'Ciudadanos de Nueva Berlín: hoy se cumplen nueve años de la Noche Larga. A las 21:00, el Canciller hablará a la humanidad. Mirad a La Aguja. La Aguja os mira.', siguiente: 'a3' },
          a3: { escena: 'calle', texto: 'El desfile pasa por la antigua Gran Vía. Tanques, antorchas, niños de la Juventud Solar con banderas negras. Elías aplaude cuando toca aplaudir. Por última vez.', siguiente: 'a4' },
          a4: { si: 'relojDeTobias', quien: 'elias', pensamiento: true, texto: 'El reloj de Tobías marca las 12:04. Por detrás, una «E». Nunca había tenido nada con mi inicial.', siguiente: 'a5' },
          a5: { quien: 'elias', pensamiento: true, texto: 'Nueve horas. Luego, o hay un mundo nuevo o no hay nada.' }
        }
      }
    },

    // ---------------- LA PUERTA ----------------
    {
      id: 'puerta', hora: 20.9,
      guion: {
        inicio: 'p1',
        nodos: {
          p1: { escena: 'aguja', texto: '20:55. Entrada de servicio de La Aguja, nivel 0. Treinta Insomnes vestidos de limpiadores, de cocineros, de nadie.', siguiente: 'p2' },
          p2: { si: ['recluta_brandt', '!capturado_brandt'], quien: 'brandt', texto: 'Llegan ustedes puntuales. Bien. La puntualidad es una forma de lealtad. Y hoy he decidido a quién se la debo.', siguiente: 'p3' },
          p3: { quien: 'mara', texto: 'Ahora. Todo o nada.' }
        }
      },
      prueba: {
        titulo: 'La puerta de personal',
        desc: 'Entrar en La Aguja sin disparar un tiro. O con los menos posibles.',
        base: 20,
        bonus: [
          { si: ['recluta_brandt', '!capturado_brandt'], mas: 35, texto: 'Brandt abre la puerta desde dentro' },
          { si: 'pasesAguja', mas: 25, texto: 'Doce pases de servicio' },
          { si: 'uniformes', mas: 10, texto: 'Uniformes de la Guardia Negra' },
          { si: 'uniformesTejedoras', mas: 15, texto: 'Los cuarenta uniformes de las Tejedoras' },
          { si: 'guardiaDesviada', mas: 20, texto: 'Dos compañías desviadas a la Ciudadela Helios' },
          { si: 'engañoGuardia', mas: 10, texto: 'La Guardia espera el golpe en otro sitio' },
          { si: 'contactoAguja', mas: 10, texto: 'La limpiadora del turno de noche' },
          { si: 'planosAguja', mas: 10, texto: 'Los planos de La Aguja' },
          { si: ['traidorDentro_aurora', '!auroraEngañada', '!auroraExpulsada'], mas: -25, texto: 'Aurora avisó a la Guardia Negra' },
          { si: 'traidorInformo', mas: -10, texto: 'Un traidor contó a la Guardia lo que vio en sus misiones' }
        ],
        exito: { texto: 'La puerta se abre sin un ruido. Dentro, el vestíbulo de servicio está vacío: todos miran la torre desde fuera.', efecto: { logros: 1 } },
        fracaso: {
          texto: 'Alguien grita. Hay disparos en el vestíbulo. Entran, pero se quedan tres en el suelo de mármol.',
          efecto: { red: -3 },
          guion: {
            inicio: 'h0',
            nodos: {
              h0: { rama: [{ si: ['primerosAuxilios', 'medicinas'], ir: 'h1' }, { si: 'primerosAuxilios', ir: 'h4' }, { si: 'medicinas', ir: 'h6' }], siguiente: 'h8' },
              // las dos cosas: nadie se queda en el suelo
              h1: { quien: 'elias', pensamiento: true, texto: 'Aprietas aquí, con todo tu peso. Tres minutos. Aunque grite.', siguiente: 'h2' },
              h2: { texto: 'Elías se arrodilla sobre el primero. Mara, sobre el segundo. Del bolsillo de Mara salen las vendas y los antibióticos del Hospital Central.', siguiente: 'h3' },
              h3: { quien: 'mara', texto: 'Los tres respiran. Los tres. Dejad a dos con ellos y seguimos.', efecto: { red: 2 } },
              // solo el torniquete
              h4: { quien: 'elias', pensamiento: true, texto: 'Aprietas aquí, con todo tu peso. Tres minutos. Aunque grite.', siguiente: 'h5' },
              h5: { texto: 'Elías salva a uno. Para los otros dos no basta con apretar. No tienen ni una venda.', efecto: { red: 1, bandera: 'precioAlto' } },
              // solo las medicinas
              h6: { texto: 'Mara reparte las vendas del Hospital Central. Nadie más sabe usarlas.', siguiente: 'h7' },
              h7: { quien: 'mara', texto: 'Uno aguantará. Los otros dos... Seguid. Seguid, he dicho.', efecto: { red: 1, bandera: 'precioAlto' } },
              // nada
              h8: { quien: 'mara', texto: 'No os paréis. No podemos hacer nada por ellos. Seguid.', efecto: { bandera: 'precioAlto' } }
            }
          }
        }
      }
    },

    // ---------------- EL ECLIPSE ----------------
    {
      id: 'odin', hora: 21,
      guion: {
        inicio: 'e1',
        nodos: {
          e1: { escena: 'nucleo', texto: '21:00:00. Nueva Berlín se apaga entera. Solo queda encendida La Aguja, como una vela en una habitación vacía.', siguiente: 'e2' },
          e2: { texto: 'Nivel -4. El núcleo de ODÍN respira en rojo. Un ojo enorme en el centro de la sala.', siguiente: 'e3' },
          e3: { rama: [{ si: ['tomasSalvado', '!capturado_tomas'], ir: 'e4' }, { si: 'tomasEnAguja', ir: 'e5' }], siguiente: 'e6' },
          e4: { quien: 'tomas', texto: 'Hola, ODÍN. Llevo cinco años queriendo hacer esto. A la derecha. Hasta tres.' },
          e5: { quien: 'tomas', texto: '¡Aquí! ¡Celda doce! ¡Sacadme y os apago ese bicho! ¡A la derecha y hasta tres!' },
          e6: { quien: 'mara', texto: 'No hay nadie que sepa hacer esto. Así que lo haremos nosotros. A la derecha. Hasta tres.' }
        }
      },
      prueba: {
        titulo: 'Dejar ciego a ODÍN',
        desc: 'Meter la llave de mantenimiento en el núcleo antes de que termine el eclipse.',
        base: 15,
        bonus: [
          { si: 'llaveODIN', mas: 35, texto: 'La llave de mantenimiento de ODÍN' },
          { si: 'eclipseDescifrado', mas: 10, texto: 'Sabíais lo del Protocolo Eclipse' },
          { si: 'eclipseSincronizado', mas: 15, texto: 'Veinte relojes sincronizados al segundo' },
          { si: 'eclipseLargo', mas: 20, texto: 'Cinco minutos de oscuridad en vez de uno' },
          { si: 'planosAguja', mas: 15, texto: 'Sabéis dónde está el núcleo' },
          { si: ['tomasSalvado', '!capturado_tomas'], mas: 10, texto: 'Chispa baja con vosotros' },
          { si: 'tomasEnAguja', mas: 10, texto: 'Chispa ya estaba en el nivel -4' },
          { si: ['hansRescatado', '!capturado_hans'], mas: 5, texto: 'Hans recuerda los códigos de acceso' }
        ],
        exito: {
          texto: 'El gran ojo rojo parpadea. Una vez. Dos. Tres. Y se apaga. ODÍN ya no ve nada.',
          efecto: { logros: 1 },
          guion: {
            inicio: 'r0',
            nodos: {
              r0: { rama: [{ si: 'ruthEnAguja', ir: 'r1' }], siguiente: 'r3' },
              r1: { texto: 'En la celda nueve del nivel -4, una anciana con un abrigo feo está sentada muy recta, como en misa.', efecto: { bandera: 'ruthRescatada' }, siguiente: 'r2' },
              r2: { quien: 'ruth', texto: 'Tarde, niño. Tarde, pero bien peinado.', siguiente: 'r3' },
              r3: { rama: [{ si: 'tomasEnAguja', ir: 'r4' }], siguiente: 'r5' },
              r4: { texto: 'Chispa sale de la celda doce abrazando a todo el que se cruza.', efecto: { bandera: 'tomasRescatado' }, siguiente: 'r5' },
              r5: { quien: 'mara', texto: 'Arriba. Planta 60. Elías, sube. Nosotros cubrimos el ascensor.' }
            }
          }
        },
        fracaso: {
          texto: 'El ojo rojo tiembla... y vuelve a abrirse. A las 21:01, ODÍN despierta. Los drones de la torre giran todos hacia el mismo sitio.',
          efecto: { bandera: 'precioAlto' },
          guion: { inicio: 'f1', nodos: { f1: { quien: 'mara', texto: '¡Sube, Elías! ¡Planta 60! ¡Nosotros los entretenemos!' } } }
        }
      }
    },

    // ---------------- LA CIUDAD ----------------
    {
      id: 'ciudad', hora: 21.05,
      guion: {
        inicio: 'c1',
        nodos: {
          c1: { escena: 'calle', texto: 'Fuera, en la oscuridad, la ciudad tiene que elegir. Quedarse en casa mirando la torre. O salir.', siguiente: 'c2' },
          c2: { si: 'convocatoria', texto: 'En veinte mil cocinas, una radio vieja repite la misma frase con la voz de una mujer que lleva años callada: «¿Recuerdas Madrid?».' }
        }
      },
      prueba: {
        titulo: 'La ciudad sale a la calle',
        desc: 'Si la gente sale, la Guardia Negra no podrá subir a la torre.',
        base: 10,
        bonus: [
          { si: 'red>=15', mas: 15, texto: 'La red de los Insomnes es grande' },
          { si: 'red>=25', mas: 10, texto: 'La red es enorme' },
          { si: 'convocatoria', mas: 20, texto: 'La última emisión de la Voz' },
          { si: 'vozVuelve', mas: 10, texto: 'La Voz de Madrid volvió a sonar' },
          { si: 'hijoDeLaVoz', mas: 15, texto: 'El hijo de la Voz está dentro de la torre' },
          { si: 'celulaFerroviarios', mas: 10, texto: 'Los Ferroviarios' },
          { si: 'celulaTejedoras', mas: 10, texto: 'Las Tejedoras' },
          { si: 'celulaAnselmo', mas: 10, texto: 'La gente de Anselmo' },
          { si: 'celulasSur', mas: 10, texto: 'Las células del sur' },
          { si: 'celulasUltima', mas: 10, texto: 'Las células que dudaban' },
          { si: 'pintadasHechas', mas: 5, texto: '«¿Recuerdas Madrid?» en los muros' },
          { si: 'radioEmitida', mas: 5, texto: 'Los tres minutos de los Insomnes en las telepantallas' }
        ],
        exito: { texto: 'Primero son diez. Luego cien. Luego la Gran Vía entera, a oscuras, con velas. La Guardia Negra no puede avanzar ni un metro.', efecto: { logros: 1 } },
        fracaso: { texto: 'Las calles siguen vacías. La gente mira la torre desde las ventanas, como le han enseñado.', efecto: { bandera: 'precioAlto' } }
      }
    },

    // ---------------- TODO O NADA (si las cosas van mal) ----------------
    {
      id: 'ultimo', si: 'logros<2', hora: 21.1,
      guion: {
        inicio: 'u1',
        nodos: {
          u1: { escena: 'aguja', texto: 'Todo se tuerce. Pero Elías sigue subiendo. Planta 20. Planta 40. Escalera de servicio, porque los ascensores ya no funcionan.', siguiente: 'u2' },
          u2: { quien: 'elias', pensamiento: true, texto: 'Si me paro, todo lo de esta semana no habrá servido para nada.' }
        }
      },
      prueba: {
        titulo: 'Todo o nada',
        desc: 'Llegar a la planta 60 antes que la Guardia Negra.',
        base: 25,
        bonus: [
          { si: 'confiaRelojero', mas: 15, texto: 'El Relojero te espera arriba' },
          { si: ['recluta_brandt', '!capturado_brandt'], mas: 10, texto: 'Brandt conoce las escaleras de servicio' },
          { si: 'armas', mas: 10, texto: 'Los fusiles de 2029' },
          { si: 'vinculo_mara>=5', mas: 10, texto: 'Mara no se separa de ti' },
          { si: 'sabeDisparar', mas: 5, texto: 'Mara te enseñó a sujetar un fusil' }
        ],
        exito: { texto: 'Elías llega a la planta 60 con los pulmones ardiendo. Detrás de él, la escalera se llena de visores negros. Pero ha llegado.', efecto: { logros: 2, bandera: 'precioAlto' } },
        fracaso: { texto: 'En la planta 52, una mano con guante negro le agarra del abrigo.', efecto: {} }
      }
    },

    // ---------------- EL DESPACHO ----------------
    {
      id: 'despacho', si: 'logros>=2', hora: 21.12,
      guion: {
        inicio: 'd1',
        nodos: {
          d1: { escena: 'despacho', texto: 'Planta 60. El despacho del Canciller. La puerta está abierta. Dentro no hay guardias.', efecto: { bandera: 'relojeroEnDespacho' }, siguiente: 'd2' },
          d2: { texto: 'Aldric Voss está de pie junto al ventanal, de espaldas, mirando su ciudad a oscuras. A dos metros de él, con una pistola en la mano, está Tobías Grau.', siguiente: 'd2b' },
          d2b: { si: ['relojeroEnCentro3', '!relojeroRescatado'], quien: 'elias', pensamiento: true, texto: 'El Centro 3. Yo rechacé su traslado. Alguien firmó otro después. O lo pidió él.', siguiente: 'd3' },
          d3: { quien: 'relojero', texto: 'Llegas a tu hora, Elías. Siempre fuiste puntual. Hasta de niño.', siguiente: 'd4' },
          d4: { quien: 'voss', texto: 'Así que este es el niño. El que miraba las caras. Grau me ha hablado mucho de usted.', siguiente: 'd5' },
          d5: { quien: 'relojero', texto: 'La última verdad, Elías. La peor. En 2033 la Orden encontró tu ficha. Me ofrecieron un trato: tu ficha limpia a cambio de un nombre.', siguiente: 'd6' },
          d6: { quien: 'relojero', texto: 'Y yo les di uno. El de tu madre. Julia Aranda. La Voz de Madrid. Yo les dije dónde estaba.', siguiente: 'd6r' },
          d6r: { rama: [{ si: 'perdonaRelojero', ir: 'd6p' }, { si: 'rencorRelojero', ir: 'd6c' }], siguiente: 'd7' },
          d6p: { quien: 'relojero', texto: 'En el refugio me diste las gracias. No sabías esto. Ahora puedes quitármelas.', siguiente: 'd7' },
          d6c: { quien: 'relojero', texto: 'Me dijiste que te robé tu nombre. Tenías razón. Te robé mucho más que eso.', siguiente: 'd7' },
          d7: { rama: [{ si: 'nombreReal', ir: 'd7a' }], siguiente: 'd7b' },
          d7a: { quien: 'elias', pensamiento: true, texto: 'La octavilla en el bolsillo. «Sigue mirando.» La letra de una mujer a la que este hombre vendió para que yo viviera.', siguiente: 'd8' },
          d7b: { quien: 'elias', pensamiento: true, texto: 'Julia Aranda. Mi madre. Acabo de saber su nombre y quién la vendió en la misma frase.', efecto: { bandera: 'nombreMadre' }, siguiente: 'd8' },
          d8: { quien: 'relojero', texto: 'Siete años preparando esto. Me entregué para llegar hasta aquí. Les prometí entregarles a los Insomnes. Nunca pensé cumplirlo. Solo quería estar a un metro de él. Con una bala.', siguiente: 'd9' },
          d9: { quien: 'voss', texto: 'Adelante, Grau. Dispare. Mañana seré un mártir. Y la Orden tendrá un dios en vez de un Canciller.', siguiente: 'd10' },
          d10: {
            quien: 'elias', texto: '...',
            opciones: [
              { texto: '«Baja el arma, Tobías.»', ir: 'e1' },
              { texto: 'Ponerse entre la pistola y Voss.', ir: 'e5' },
              { texto: 'No decir nada.', ir: 'e1' }
            ]
          },
          e1: { rama: [{ si: 'confiaRelojero', ir: 'e2' }], siguiente: 'e3' },
          e2: { quien: 'relojero', texto: 'Te pedí que confiaras en mí, veas lo que veas. Y has confiado. Entonces confía también en esto.', siguiente: 'e2b' },
          e2b: { texto: 'Tobías baja el arma. La deja sobre la mesa, despacio, como quien deja un reloj que ya no hace falta. Esta vez, alguien decide no disparar.', efecto: { bandera: 'relojeroBajaArma' }, siguiente: 'a1' },
          e3: { texto: 'Tobías duda. Un segundo. Dos. Por la puerta privada del despacho entra un guardia con el visor bajado y el arma levantada.', siguiente: 'e3r' },
          e3r: { rama: [{ si: ['recluta_brandt', '!capturado_brandt'], ir: 'e4b' }], siguiente: 'e4' },
          e4b: { quien: 'brandt', texto: '¡Quieto! Sección 14. Suelte eso.', siguiente: 'e4c' },
          e4c: { texto: 'Brandt ha subido detrás de Elías. Desarma al guardia con una llave que nadie le conocía. Tobías mira la pistola en su propia mano como si fuera de otro. La deja caer.', efecto: { bandera: 'relojeroBajaArma' }, siguiente: 'a1' },
          e4: { texto: 'Hay un disparo. Uno solo. Tobías Grau cae hacia atrás, contra el ventanal, con la mano todavía cerrada sobre una pistola que nunca llegó a usar.', efecto: { bandera: ['relojeroCaido', 'precioAlto'] }, siguiente: 'e4d' },
          e4d: { quien: 'relojero', texto: 'No llores por mí, Elías. Llora por ella. Y luego, deja de llorar y sigue mirando.', siguiente: 'a1' },
          e5: { texto: 'Elías se pone delante del cañón. Entre la bala y el hombre que ordenó borrar su nombre.', siguiente: 'e6' },
          e6: { quien: 'relojero', texto: 'Quítate, hijo.', siguiente: 'e7' },
          e7: { quien: 'elias', texto: 'No. Si disparas, gana él. Yo quiero que le juzguen. Que oiga los nombres. Todos. También el de ella.', siguiente: 'e8' },
          e8: { quien: 'relojero', texto: '...Tienes sus ojos. ¿Lo sabías? Miras igual que ella.', siguiente: 'e9' },
          e9: { texto: 'Tobías baja el arma. Esta vez, alguien decide no disparar.', efecto: { bandera: 'relojeroBajaArma' }, siguiente: 'a1' },

          // la detención
          a1: { texto: 'Aldric Voss se da la vuelta. Es más bajo de lo que parecía en las telepantallas. Más viejo. Solo es un hombre.', efecto: { bandera: 'vossDetenido' }, siguiente: 'a2' },
          a2: { quien: 'voss', texto: '¿Y ahora qué, archivero? ¿Me va a sellar un expediente?', siguiente: 'a3' },
          a3: { rama: [{ si: 'nombreReal', ir: 'a4n' }, { si: 'nombreMadre', ir: 'a4n' }], siguiente: 'a4' },
          a4n: { quien: 'elias', texto: 'Me llamo Elías Aranda. Hijo de Julia Aranda. Aldric Voss, queda usted detenido.', siguiente: 'a5' },
          a4: { quien: 'elias', texto: 'Aldric Voss, queda usted detenido.', siguiente: 'a5' },
          a5: { quien: 'voss', texto: '¿Detenido? ¿Por quién? ¿Por un archivero?', siguiente: 'a6' },
          a6: { quien: 'elias', texto: 'Por un archivero que recuerda todas las caras. Y todos los nombres que usted borró.', siguiente: 'a7' },
          a7: { rama: [{ si: 'selloRechazado', ir: 'a8' }], siguiente: 'a9' },
          a8: { texto: 'Sobre la mesa del Canciller está el decreto del Día del Sol, esperando su firma. Elías saca el sello de la Sección 14 y lo estampa encima: RECHAZADO.', siguiente: 'a9' },
          a9: { quien: 'mara', texto: 'Hay que bajarlo antes de que la Guardia se reorganice. Vamos.', siguiente: 'a10' },
          a10: { texto: 'Mara le pone unas esposas de la Guardia Negra. Le quedan grandes.', siguiente: 'a11' },
          a11: { rama: [{ si: 'odinExito', ir: 'a12' }], siguiente: 'a13' },
          a12: { texto: 'A las 21:07, sin ODÍN que las racione, las centrales Helios devuelven la luz. Todas las luces de la ciudad se encienden a la vez. Por primera vez en nueve años.', efecto: { bandera: 'lucesEncendidas' } },
          a13: { texto: 'A las 21:01, ODÍN ha despertado. Pero ya no hay nadie en el despacho de la planta 60 para darle órdenes.' }
        }
      }
    }
  ],

  // ---------------- FINALES ----------------
  finales: [
    {
      id: 'amanecer', si: ['logros>=2', '!precioAlto'],
      titulo: 'AMANECER',
      subtitulo: 'La Aguja cayó. Voss fue detenido. Y no hubo que pagar un precio imposible.',
      guion: {
        inicio: 'x1',
        nodos: Object.assign({
          x1: { escena: 'amanecer', texto: 'Lunes, 10 de noviembre de 2040. 07:42. Por primera vez en nueve años, amanece sobre Madrid.', siguiente: 'x2' },
          x2: { texto: 'Las luces siguen encendidas aunque ya no hagan falta. Nadie se atreve a apagarlas todavía.', siguiente: 'm0' },
          m0: { rama: [{ si: 'beso', ir: 'm1' }, { si: 'esperarLunes', ir: 'm1' }, { si: 'maraMano', ir: 'm1' }], siguiente: 'm6' },
          m1: { quien: 'mara', texto: 'Es lunes.', siguiente: 'm2' },
          m2: { quien: 'elias', texto: 'Es lunes.', siguiente: 'm3' },
          m3: { quien: 'mara', texto: 'Lo que te quería decir... Que te quiero. O algo muy parecido. Llevo nueve años sin decirlo y ya no me acuerdo bien de cómo se hace.', siguiente: 'm4' },
          m4: { texto: 'Se besan en la azotea de la relojería mientras la ciudad se despierta. Abajo, alguien grita el nombre de alguien, solo porque puede.', siguiente: 'o1' },
          m6: { texto: 'Mara le encuentra en la Puerta del Sol, entre miles de personas. Le coge la mano.', siguiente: 'm7' },
          m7: { quien: 'mara', texto: 'Lo hiciste.', siguiente: 'm8' },
          m8: { quien: 'elias', texto: 'Lo hicimos.', siguiente: 'o1' },
          o1: { si: [ 'tomasSalvado', '!capturado_tomas' ], texto: 'Chispa ha encontrado un altavoz y lo ha conectado a una radio de 1998. Suena algo que hace MUCHO ruido.', siguiente: 'o2' },
          o2: { si: 'tomasRescatado', texto: 'Chispa ha encontrado un altavoz y lo ha conectado a una radio de 1998. Suena algo que hace MUCHO ruido.', siguiente: 'o3' },
          o3: { si: 'ruthRescatada', quien: 'ruth', texto: 'Doce uvas en Nochevieja, niño. Me lo prometiste. Y ya no hay toque de queda para no cumplirlo.', siguiente: 'o4' },
          o4: { si: ['!fuera_ruth', '!ruthRescatada'], quien: 'ruth', texto: 'Doce uvas en Nochevieja, niño. Me las pelas tú.', siguiente: 'j1' }
        }, nodosJuicio('k1'), {
          k1: { escena: 'amanecer', texto: 'Esa noche, en la azotea de la relojería, alguien pregunta en voz alta, por costumbre:', siguiente: 'k2' },
          k2: { quien: 'mara', texto: '¿Recuerdas Madrid?', siguiente: 'k3' },
          k3: { quien: 'elias', texto: 'Recuerdo el sol.', siguiente: 'k4' },
          k4: { si: 'juliaTraslado', texto: 'En la lista de los cuatrocientos internos llegados de la Colonia Este-1 hay una mujer de pelo gris que pregunta por un niño que miraba las caras.', siguiente: 'k5' },
          k5: { si: 'juliaTraslado', texto: 'Se llama Julia.' }
        })
      }
    },
    {
      id: 'rojo', si: 'logros>=2',
      titulo: 'AMANECER ROJO',
      subtitulo: 'La Aguja cayó. Voss fue detenido. Pero la noche costó más de lo que nadie quería pagar.',
      guion: {
        inicio: 'x1',
        nodos: Object.assign({
          x1: { escena: 'amanecer', texto: 'Lunes, 10 de noviembre de 2040. Amanece sobre Madrid. Las luces están encendidas. Hay demasiados huecos en las filas.', siguiente: 'x2' },
          x2: { si: 'relojeroCaido', texto: 'A Tobías Grau lo entierran con un reloj de bolsillo en la mano. Funciona. Lo arregló la noche antes.', siguiente: 'x3' },
          x3: { texto: 'Se ganó. Pero nadie celebra nada durante tres días.', siguiente: 'm0' },
          m0: { rama: [{ si: 'beso', ir: 'm1' }, { si: 'esperarLunes', ir: 'm1' }], siguiente: 'm6' },
          m1: { quien: 'mara', texto: 'Es lunes. Llegamos. No todos, pero llegamos.', siguiente: 'm2' },
          m2: { quien: 'mara', texto: 'Te quiero, Elías. Te lo digo hoy porque ya sé lo poco que dura un mañana.', siguiente: 'm3' },
          m3: { texto: 'Se abrazan en la azotea de la relojería, sin decir nada más, mucho rato.', siguiente: 'j1' },
          m6: { quien: 'mara', texto: 'Hemos ganado. Dilo tú, que yo no puedo todavía.', siguiente: 'm7' },
          m7: { quien: 'elias', texto: 'Hemos ganado.', siguiente: 'j1' }
        }, nodosJuicio('k1'), {
          k1: { escena: 'amanecer', texto: 'En la Puerta del Sol ponen una placa. No lleva ningún nombre. Lleva una pregunta.', siguiente: 'k2' },
          k2: { texto: '«¿Recuerdas Madrid?»', siguiente: 'k3' },
          k3: { quien: 'elias', pensamiento: true, texto: 'Recuerdo el sol. Y a todos los que no llegaron a verlo.', siguiente: 'k4' },
          k4: { si: 'juliaTraslado', texto: 'Semanas después, entre los internos llegados de la Colonia Este-1, una mujer de pelo gris pregunta por un niño que miraba las caras. Se llama Julia.' }
        })
      }
    },
    {
      id: 'noche', si: null,
      titulo: 'LA NOCHE SIGUE',
      subtitulo: 'El asalto fracasó. Pero alguien volverá a preguntar si recuerdas Madrid.',
      guion: {
        inicio: 'x1',
        nodos: {
          x1: { escena: 'celda', texto: 'Elías despierta en una celda del nivel -4. No sabe cuántos días han pasado. Por el ventanuco no entra luz. Nunca entra.', siguiente: 'x2' },
          x2: { quien: 'pantalla', texto: 'Ciudadanos: la Orden ha sofocado una insurrección terrorista. El Canciller está a salvo. La Orden os observa porque la Orden os cuida.', siguiente: 'x3' },
          x3: { quien: 'elias', pensamiento: true, texto: 'Fallamos. Pero salieron a la calle. Los vi. Diez, cien. Con velas.', siguiente: 'x4' },
          x4: { texto: 'Esa misma noche, en un muro del Distrito 9, alguien pinta una frase que se borra por la mañana y vuelve a aparecer por la tarde.', siguiente: 'x5' },
          x5: { texto: '«¿Recuerdas Madrid?»', siguiente: 'x6' },
          x6: { quien: 'elias', pensamiento: true, texto: 'Sigo mirando.' }
        }
      }
    }
  ],

  // ---------------- DESTINOS (pantalla final) ----------------
  destinos: [
    // Voss
    { si: 'vossDetenido', texto: 'Aldric Voss: detenido en su despacho. Juzgado y condenado a cadena perpetua. Vive en una celda con ventana.' },
    { si: '!vossDetenido', texto: 'Aldric Voss sigue hablando cada mañana desde las telepantallas.' },
    // Elías
    { si: ['nombreReal', 'vossDetenido'], texto: 'Elías Aranda recuperó su nombre y dijo en voz alta todos los demás.' },
    { si: ['nombreReal', '!vossDetenido'], texto: 'En una celda del nivel -4, un preso sin número repite un nombre para no olvidarlo: Elías Aranda.' },
    { si: ['!nombreReal', 'nombreMadre'], texto: 'Elías supo el nombre de su madre por boca del hombre que la vendió.' },
    { si: ['!nombreReal', '!nombreMadre', '!vossDetenido'], texto: 'Elías Vogt sigue en una celda del nivel -4, sin saber su nombre. Otro archivero ocupa su mesa.' },
    // Mara
    { si: ['beso', 'vossDetenido'], texto: 'Mara y Elías llegaron al lunes. Y ella se lo dijo.' },
    { si: ['!beso', 'esperarLunes', 'vossDetenido'], texto: 'Mara y Elías llegaron al lunes. Y ella se lo dijo.' },
    { si: ['!beso', '!esperarLunes', 'vossDetenido'], texto: 'Mara Solís Ortega, nacida en Lavapiés, dirige hoy el primer hospital sin listas.' },
    { si: '!vossDetenido', texto: 'Mara Solís escapó de La Aguja. Desde algún sótano, sigue preguntando si alguien recuerda Madrid.' },
    // El Relojero
    { si: 'relojeroBajaArma', texto: 'Tobías Grau bajó el arma. Se entregó al tribunal y confesó lo de 2033. Arregla relojes en la prisión.' },
    { si: 'relojeroCaido', texto: 'Tobías Grau murió en el despacho del Canciller, con una bala que nunca llegó a disparar.' },
    // Chispa
    { si: ['tomasRescatado', 'vossDetenido'], texto: 'Chispa salió del nivel -4 y organizó el primer concierto en nueve años. Hizo MUCHO ruido.' },
    { si: ['tomasSalvado', '!capturado_tomas', 'vossDetenido'], texto: 'Chispa organizó el primer concierto en nueve años. Elías pagó las entradas.' },
    { si: ['tomasSalvado', '!capturado_tomas', '!vossDetenido'], texto: 'Chispa sigue rompiendo cosas de la Orden. Todavía le debe un concierto a alguien.' },
    { si: ['capturado_tomas', '!tomasRescatado'], texto: 'Chispa salió en el primer tren del lunes hacia la Colonia Este-6.' },
    { si: ['tomasReubicado', 'vossDetenido'], texto: 'De Tomás Rey nunca se supo nada. Su nombre se leyó en el juicio.' },
    { si: ['tomasReubicado', '!vossDetenido'], texto: 'De Tomás Rey nunca se supo nada.' },
    // Ruth
    { si: ['ruthRescatada', 'vossDetenido'], texto: 'Ruth Adler se comió doce uvas en la Puerta del Sol en Nochevieja. Elías se las peló.' },
    { si: ['ruthCaida', '!ruthRescatada'], texto: 'Ruth Adler no volvió del Archivo Central. Le dejó a Elías su nombre en un buzón.' },
    // Brandt, Hans
    { si: ['recluta_brandt', '!capturado_brandt', 'vossDetenido'], texto: 'Konrad Brandt testificó contra la Orden. Cumple condena por lo que firmó. Dice que duerme mejor.' },
    { si: 'capturado_brandt', texto: 'Konrad Brandt cayó en una misión de los Insomnes. Nadie volvió a verle.' },
    { si: 'brandtPurgado', texto: 'Konrad Brandt fue purgado. Nadie sabe en qué colonia está.' },
    { si: ['hansRescatado', '!capturado_hans', 'vossDetenido'], texto: 'Hans Keller dirige el nuevo Archivo de la Memoria. Tarda cuatro minutos por expediente.' },
    // Julia
    { si: 'juliaTraslado', texto: 'Julia Aranda llegó en un tren desde la Colonia Este-1. Continuará.' }
  ]
};

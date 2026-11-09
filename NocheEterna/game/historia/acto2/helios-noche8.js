// ============================================================
//  ACTO 2 · NOCHE 8 — «La víspera»
//  Los talleres. Elías cuenta CORONA. Julia (o su nota) y la parte que no está en ningún papel.
//  El Relojero y Julia, frente a frente: él la vendió en 2033.
//  El plan contra la trampa: el armario del CUSTODIO, detrás de la Sala de la Llave.
//  La última hora: Mara (es lunes), Julia, el Relojero o nadie.
// ============================================================

window.HELIOS_NOCHE8 = {
  numero: 8,
  subtitulo: 'La víspera',
  escenaLlegada: 'talleres',
  etiqueta: 'HELIOS · TALLERES',
  refugio: 'talleres',
  medidor: 'sospecha',
  operativos: ['elias', 'mara', 'kurt', 'ilyas', { id: 'tobias', si: 'relojeroConGrupo' }, { id: 'ruth', si: ['guiaRuth', '!ruthRetenida'] },
    { id: 'julia', si: 'juliaLibre' }, { id: 'greta', si: 'gretaDentro' }, { id: 'ewa', si: 'ingenierosLibres' },
    { id: 'hansC', si: 'otrosLibres' }, { id: 'brandtC', si: 'otrosLibres' }, { id: 'leoC', si: 'otrosLibres' },
    { id: 'martaR', si: 'martaSigue' }, 'leif'],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'talleres', texto: '21:00. Elías lo cuenta todo, de pie junto a la bombilla robada. La llave de dos manos. El anexo. La V de su número. CORONA. Nadie le interrumpe.', siguiente: 'n2' },
      n2: { rama: [{ si: 'pruebaCorona', ir: 'n3p' }], siguiente: 'n3' },
      n3p: { texto: 'Cuando termina, despliega CORONA encima del banco de trabajo. Ilyas lo lee dos veces, con el dedo debajo de cada línea, como quien lee una carta de un pariente muerto.', siguiente: 'n4' },
      n3: { texto: 'Cuando termina, nadie dice nada durante un rato largo. La bobina del fondo late. Alguien tose en una litera.', siguiente: 'n4' },
      n4: { quien: 'mara', texto: 'Entonces la trampa es que no hay trampa. Nos deja entrar, nos deja girar la llave, y gana igual. Bien. Odio los planos que no tienen ningún agujero. Busquémosle uno.', siguiente: 'j0' },

      // --- Julia ---
      j0: { rama: [{ si: 'juliaLibre', ir: 'j1' }, { si: 'juliaContactada', ir: 'jc1' }], siguiente: 'jn1' },
      j1: { quien: 'julia', texto: 'Ya lo has leído todo. Él no quería un hijo, Elías. Quería una mano. Por eso te solté en aquella puerta: para que fueras un niño y no una pieza.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Y aun así le quise. Esa es la parte que no está en ningún papel del archivo. Le quise hasta el día en que vi tu nombre en el anexo. Luego ya no pude.', siguiente: 'j3' },
      j3: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«¿Me habrías buscado, si no hubiera venido nadie?»', ir: 'j4a' },
          { texto: '«Mañana, ¿qué vas a hacer con la llave?»', ir: 'j4b', efecto: { bandera: 'preguntoLlave' } },
          { texto: 'Cogerle la mano.', ir: 'j4c', efecto: { vinculo_julia: 1 } }
        ]
      },
      j4a: { quien: 'julia', texto: 'Te busqué cada noche, por la radio. «¿Recuerdas Madrid?» Tú eras Madrid. Nunca me contestaste. Ahora sé por qué: alguien te había borrado la memoria con un apellido.', siguiente: 'r0' },
      j4b: { quien: 'julia', texto: 'Lo que tenga que hacer. Llevo treinta y tres años sabiendo lo que haría con esa llave si la tuviera delante. No me lo preguntes esta noche. Mañana lo sabrás. Los dos lo sabremos.', efecto: { bandera: 'juliaDecidida' }, siguiente: 'r0' },
      j4c: { texto: 'Julia no dice nada. Le aprieta la mano con fuerza, la de una mujer que ha cavado siete años en una cantera. Luego, muy bajo: «Tienes mis manos. No las suyas. Mira». Y es verdad.', siguiente: 'r0' },

      jc1: { texto: 'Elías desdobla otra vez la nota de la celda: «Sé lo que hay en el lector. No vengas. Te quiero». La lee hasta que se le borra la vista.', siguiente: 'jc2' },
      jc2: { quien: 'elias', pensamiento: true, texto: 'No vengas. Es lo mismo que me dijo con una manta, en una puerta, en 2008. Esta vez no le voy a hacer caso.', siguiente: 'r0' },
      jn1: { quien: 'elias', pensamiento: true, texto: 'Mi madre está en una celda del nivel 0, a cien metros de aquí, esperando a que la lleven a una sala. No sabe que estoy tan cerca. O sí. Hel se lo habrá contado.', siguiente: 'r0' },

      // --- El Relojero y Julia, frente a frente ---
      r0: { rama: [{ si: ['relojeroConGrupo', 'juliaLibre'], ir: 'r1' }], siguiente: 'p1' },
      r1: { texto: 'El Relojero se levanta de su litera. Cruza el taller despacio y se para delante de Julia. Es la primera vez que están cara a cara desde 2033.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Te vendí. Para que tu hijo tuviera una ficha limpia. Lo volvería a hacer. Y llevo ocho años sin dormir una noche entera.', siguiente: 'r3' },
      r3: { quien: 'julia', texto: 'Lo sé. Lo supe en el camión, cuando vi quién no venía a despedirme.', siguiente: 'r4' },
      r4: { quien: 'julia', texto: 'Yo le dejé en una puerta. Tú le diste un nombre y le enseñaste a dar cuerda a los relojes. No te perdono, conserje. Pero estamos en paz.', efecto: { bandera: 'relojeroJuliaPaz' }, siguiente: 'r5' },
      r5: { quien: 'relojero', texto: 'Con eso me basta. No pensaba llegar a tanto.', siguiente: 'p1' },

      // --- El agujero en el plan ---
      p1: { rama: [{ si: 'ingenierosLibres', ir: 'p2e' }, { si: 'gretaDentro', ir: 'p2g' }], siguiente: 'p2n' },
      p2e: { quien: 'ewa', texto: 'El custodio no lo decide la llave. Lo decide un registro, en un armario de relés detrás de la sala. Lo diseñó Marcos. Si mañana a las cinco pone otro nombre en ese registro, la llave obedecerá a otro.', siguiente: 'p3' },
      p2g: { quien: 'greta', texto: 'Detrás de la Sala de la Llave hay un armario de relés con una etiqueta: CUSTODIO. Nadie lo toca nunca. Si se puede cambiar lo que pone ahí dentro, la llave obedecerá a otro.', siguiente: 'p3' },
      p2n: { quien: 'ilyas', texto: 'En los planos hay un armario detrás de la sala. Pone CUSTODIO. Yo no sé de llaves, archivero. Pero sé que todo lo que tiene cables se puede desenchufar.', siguiente: 'p3' },
      p3: { quien: 'mara', texto: 'Ahí está el agujero. Si ese armario dice otro nombre, Hel se queda mirando una sala vacía. La pregunta es qué nombre ponemos.', siguiente: 'p4' },
      p4: { quien: 'elias', pensamiento: true, texto: 'Qué nombre. Toda mi vida he escrito nombres en casillas. Mañana tengo que escribir uno en la casilla que decide quién tiene luz en el mundo.', siguiente: 'x1' },

      x1: { quien: 'ilyas', texto: 'La última noche. Que cada uno haga lo que sabe hacer. A las cinco, todos en la escalera del río.' }
    }
  },

  aspirantes: [],

  misiones: [
    {
      id: 'custodio',
      titulo: 'El armario del CUSTODIO',
      desc: 'Preparar el registro de relés de detrás de la Sala de la Llave para poder cambiar el nombre del custodio en el momento del giro.',
      habilidad: 'tecnica', base: 20,
      bonus: [{ si: 'planoLlaveGuardado', mas: 25 }, { si: 'ingenierosLibres', mas: 20 }, { si: 'gretaSala', mas: 15 }, { si: 'planosNucleo', mas: 10 }, { si: 'ingenierosAHelios', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'custodioAbierto' },
      captura: 0,
      exito: '{op} vuelve con las uñas negras y un destornillador doblado. «Está abierto. Mañana, quien esté delante de ese armario cuando giréis la llave podrá escribir lo que quiera.»',
      fracaso: '{op} no consigue abrir el registro: la cerradura es del 2007, del mismo hombre que dibujó la llave. Mañana habrá que hacerlo en la sala, con Hel delante.'
    },
    {
      id: 'calderas', si: 'fogonerosAliados',
      titulo: 'Las calderas, a las cinco',
      desc: 'A las cinco en punto, los fogoneros de las calderas con un sol de tiza bajarán la presión. Las cámaras y las puertas del anillo interior se quedarán sin corriente noventa segundos.',
      habilidad: 'fuerza', base: 40,
      bonus: [{ si: 'pruebaCorona', mas: 15 }, { si: 'cuadrillaConNosotros', mas: 15 }],
      coste: {},
      recompensa: { bandera: 'calderasListas' },
      captura: 0,
      exito: 'Cada fogonero sabe su caldera, su llave de paso y su segundo exacto. Noventa segundos de oscuridad, el martes a las cinco.',
      fracaso: 'Solo la mitad de las calderas estarán listas. Sesenta segundos, quizá. Quizá menos.'
    },
    {
      id: 'fogoneros8', si: '!fogonerosAliados',
      titulo: 'Los cuatro mil de abajo (otra vez)',
      desc: 'Ayer la mitad de los fogoneros no se fió. Esta noche hay algo que enseñarles.',
      habilidad: 'labia', base: 25,
      bonus: [{ si: 'pruebaCorona', mas: 30 }, { si: 'luzMadrid', mas: 10 }, { si: 'calorColonia', mas: 10 }],
      coste: {},
      recompensa: { red: 3, bandera: 'fogonerosAliados' },
      captura: 0,
      exito: 'A medianoche aparecen los soles de tiza en las calderas. Tarde, pero aparecen.',
      fracaso: 'Ilyas se encoge de hombros: «Los de abajo solo se mueven cuando ven moverse a los de arriba».'
    },
    {
      id: 'radios',
      titulo: 'Todas las radios escondidas',
      desc: 'Avisar a Madrid, a Ostra y a las colonias: mañana a las cinco pasará algo con la luz. Que estén despiertos.',
      habilidad: 'tecnica', base: 45,
      bonus: [{ si: 'vozDeVuelta', mas: 20 }, { si: 'tomasSalvado', mas: 10 }],
      coste: {},
      recompensa: { red: 2, bandera: 'radiosAvisadas' },
      captura: 0,
      exito: 'En Madrid, Anselmo. En Ostra, Wanda. En Este-1, Samira. Todos repiten lo mismo antes de cortar: «¿Recuerdas Madrid?».',
      fracaso: 'Solo contesta Madrid. El resto del mundo se enterará mañana, como siempre: cuando se encienda o se apague algo.'
    },
    {
      id: 'sacarJuliaN', si: 'juliaAHelios',
      titulo: 'Sacar a Julia de la celda',
      desc: 'Julia está en una celda del nivel 0. Hel la llevará a la Sala de la Llave a las 05:00. Llegar antes.',
      habilidad: 'sigilo', base: 15,
      bonus: [{ si: 'juliaContactada', mas: 20 }, { si: 'monosNucleo', mas: 20 }, { si: 'gretaSala', mas: 15 }, { si: 'planosNucleo', mas: 10 }],
      coste: {},
      recompensa: { bandera: 'juliaRescatada' },
      fracasoEfecto: { bandera: 'juliaEnLaSala' },
      captura: 0,
      exito: 'La celda se abre a las tres. Julia sale descalza, con los zapatos en la mano. «Te dije que no vinieras», dice. Luego le abraza tan fuerte que le cruje la espalda.',
      fracaso: 'La celda está vacía. Se la han llevado antes de tiempo. Mañana, a las cinco, Julia estará ya en la Sala de la Llave. Esperando. Como siempre.'
    },
    {
      id: 'andenVoss', si: 'vossAHelios',
      titulo: 'El andén del Canciller',
      desc: 'Hel ha reducido la escolta de Voss a dos hombres. Saber qué piensa hacer con él en el andén a las seis.',
      habilidad: 'sigilo', base: 30,
      bonus: [{ si: 'sabePlanVoss', mas: 20 }, { si: 'pruebaHel', mas: 15 }],
      coste: {},
      recompensa: { bandera: 'andenVigilado' },
      captura: 0,
      exito: 'Los dos hombres de la escolta son de Hel. Llevan en el bolsillo un parte ya escrito: «El Canciller fue abatido por terroristas de la zona insurrecta». Solo falta la hora.',
      fracaso: '{op} no consigue acercarse al andén. Está lleno de banderas y de guardias que no deberían estar allí a estas horas.'
    }
  ],

  // ---------------- LA ÚLTIMA HORA ----------------
  despedida: {
    inicio: 'u0',
    nodos: {
      u0: { escena: 'talleres', texto: '3:30. Faltan hora y media. Cada uno se busca un rincón. Elías tiene una hora y nada que hacer con ella, salvo decidir con quién la pasa.', siguiente: 'u1' },
      u1: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: 'Con Mara.', ir: 'm0', efecto: { vinculo_mara: 1, bandera: 'ultimaHoraMara' } },
          { texto: 'Con Julia.', ir: 'h1', si: 'juliaLibre', efecto: { vinculo_julia: 1, bandera: 'ultimaHoraJulia' } },
          { texto: 'Con Julia.', ir: 'h1', si: 'juliaRescatada', efecto: { vinculo_julia: 1, bandera: 'ultimaHoraJulia' } },
          { texto: 'Con el Relojero.', ir: 't1', si: 'relojeroConGrupo', efecto: { bandera: 'ultimaHoraRelojero' } },
          { texto: 'Solo.', ir: 's1', efecto: { bandera: 'ultimaHoraSolo' } }
        ]
      },

      // --- Mara ---
      m0: { rama: [{ si: 'esperarLunes', ir: 'm1l' }, { si: 'beso', ir: 'm1b' }], siguiente: 'm1n' },
      m1l: { quien: 'mara', texto: 'Hoy es lunes, Elías. Te dije «dímelo el lunes». Llevo tres meses esperando un lunes en el que no estuviéramos a punto de morir. Me he cansado de esperar.', siguiente: 'm2l' },
      m2l: { texto: 'Y es ella la que se lo dice. Sin palabras. A la luz de una bombilla robada, en el sótano de la fábrica de luz del mundo.', efecto: { bandera: 'maraLunes' }, siguiente: 'z1' },
      m1b: { texto: 'Mara se quita las botas, se sienta en la litera y le deja sitio. No hablan. Lo importante ya se lo dijeron en noviembre, la víspera de otro asalto.', siguiente: 'm2b' },
      m2b: { quien: 'mara', texto: 'Si mañana sale mal, no quiero que lo último que me digas sea un plan. Dime otra cosa.', siguiente: 'm3b' },
      m3b: { quien: 'elias', texto: 'Recuerdo Madrid.', siguiente: 'm4b' },
      m4b: { quien: 'mara', texto: '...Recuerdo el sol. Idiota.', siguiente: 'z1' },
      m1n: { quien: 'mara', texto: 'Nunca te he preguntado por qué memorizabas las caras de los expedientes. Ahora creo que lo sé. Querías que alguien se acordara de ellos. Mañana, yo me acordaré de ti. Pase lo que pase.', siguiente: 'm2n' },
      m2n: { texto: 'Pasan la hora sentados en la escalera de servicio, hombro con hombro, contando los latidos de la bobina. Ninguno de los dos se aparta.', siguiente: 'z1' },

      // --- Julia ---
      h1: { quien: 'julia', texto: 'Cuando eras un bebé no dormías si no había luz. Una lamparita, cualquier cosa. En Madrid, en 2007, todavía sobraba la luz. Te dormía cantándote encima de la lamparita.', siguiente: 'h2' },
      h2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Mamá.»', ir: 'h3a', efecto: { vinculo_julia: 2, bandera: 'llamoMama' } },
          { texto: '«Cántamela.»', ir: 'h3b', efecto: { vinculo_julia: 1 } }
        ]
      },
      h3a: { texto: 'Es la primera vez que lo dice. Le sale raro, como una palabra en otro idioma. Julia cierra los ojos y no los abre en un rato largo.', siguiente: 'z1' },
      h3b: { texto: 'Julia canta muy bajo, desafinando, una canción que nadie en el taller conoce. Elías tampoco la conoce. Pero algo en él sí.', siguiente: 'z1' },

      // --- El Relojero ---
      t1: { quien: 'relojero', texto: 'Toma. El reloj de bolsillo de San Ildefonso. Lo llevaba el conserje para tocar la campana del recreo. Está parado desde 2031, desde la Noche Larga.', siguiente: 't2' },
      t2: { quien: 'relojero', texto: 'Dale cuerda tú. Yo ya le he dado cuerda a demasiadas cosas. Que la primera hora que marque después de diez años sea la tuya.', siguiente: 't3' },
      t3: { texto: 'Elías le da cuerda. El reloj arranca a las 3:51 de la madrugada de un martes. Tobías lo oye hacer tic y sonríe como Elías no le ha visto sonreír nunca.', efecto: { bandera: 'relojEnHora' }, siguiente: 'z1' },

      // --- Solo ---
      s1: { escena: 'helios', texto: 'Elías sube por la escalera de servicio hasta una rejilla que da a la calle. Arriba, la Ciudadela encendida. Abajo, cuatro mil personas que la encienden.', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: 'Elías Vogt. Elías Aranda. Elías Voss Aranda. 44-190-V. Esta noche tengo más nombres que nunca y ninguno me sirve para decidir qué hacer mañana.', siguiente: 's3' },
      s3: { rama: [{ si: 'grilloDentro', ir: 's4g' }], siguiente: 'z1' },
      s4g: { quien: 'elias', pensamiento: true, texto: 'En el bolsillo, la tuerca que me dio un niño sin nombre en Ostra. Él tampoco tiene ninguno. Y no parecía necesitarlo.', siguiente: 'z1' },

      z1: { escena: 'talleres', texto: 'Martes, 12 de febrero de 2041. 4:45. En las calderas de abajo, los soles de tiza. En la escalera del río, un grupo de gente con monos de otro.', siguiente: 'z2' },
      z2: { quien: 'ilyas', texto: 'A las cinco. Quien controla la luz, controla el mundo. Vamos a ver quién la controla.' }
    }
  }
};

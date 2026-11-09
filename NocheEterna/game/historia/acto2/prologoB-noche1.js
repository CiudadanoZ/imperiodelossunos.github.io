// ============================================================
//  ACTO 2 · PRÓLOGO B · NOCHE 1 — «Barracón 12»
//  Los presos: Olek (ferroviario), Samira (enfermera) y, quizá, el Relojero.
//  Y una mujer de pelo gris que pregunta por su nombre.
// ============================================================

window.NOCHE_B1 = {
  numero: 1,
  subtitulo: 'Barracón 12',
  escenaLlegada: 'colonia',
  refugio: 'barracon',
  operativos: ['elias', 'olek', 'samira', 'tobias'],
  nuevosOperativos: [
    { id: 'olek', nombre: 'Olek', papel: 'Ferroviario', habilidades: { fuerza: 2, tecnica: 1, labia: 1 }, esencial: true },
    { id: 'samira', nombre: 'Samira', papel: 'Enfermera', habilidades: { sigilo: 2, labia: 1 }, esencial: true },
    { id: 'tobias', nombre: 'Tobías', papel: 'El Relojero', habilidades: { labia: 2, tecnica: 2, sigilo: 1 }, esencial: true, si: 'relojeroEnBarracon' }
  ],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'barracon', texto: 'Barracón 12. Cuarenta literas, treinta y dos presos, una estufa. Por la noche la estufa se apaga a las diez. A las diez y cinco empieza a nevar dentro.', siguiente: 'n2' },
      n2: { quien: 'olek', texto: 'El archivero. Nos han dicho que hoy has sellado raciones. Yo soy Olek. Conducía trenes hasta que me pillaron con un pasajero de más.', siguiente: 'n3' },
      n3: { rama: [{ si: 'olekAyudado', ir: 'n4o' }], siguiente: 'n4' },
      n4o: { quien: 'olek', texto: 'Y hoy me has aprobado la ración con un 58. Dos puntos por debajo. Sé leer las normas de la pared, archivero. Te debo una.', siguiente: 'n5' },
      n4: { quien: 'olek', texto: 'Hoy me has negado la ración. Cincuenta y ocho: dos puntos. No te culpo. Yo también cumplía horarios.', siguiente: 'n5' },
      n5: { quien: 'samira', texto: 'Samira. Enfermera. Aquí curo con nieve y con mentiras. ¿Tienes fiebre, archivero? No. Bien. Entonces puedes ayudar.', siguiente: 'r0' },

      r0: { rama: [{ si: 'relojeroEnBarracon', ir: 'r1' }, { si: 'relojeroAislado', ir: 'r4' }], siguiente: 'j1' },
      r1: { texto: 'En la litera del fondo, un hombre mayor le da cuerda a un reloj que no tiene. Levanta la vista.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Devolviste mi traslado al aislamiento. Otra vez sacándome de donde me mandan. Es una costumbre tuya.', siguiente: 'r3' },
      r3: { quien: 'relojero', texto: 'Hel nos ha puesto en la misma colonia, Elías. Y no por mí. Hay alguien más aquí. Alguien a quien ella quiere que encuentres.', siguiente: 'j1' },
      r4: { quien: 'samira', texto: 'Al viejo del reloj se lo han llevado a la celda de aislamiento esta tarde. Dicen que lo firmaste tú. No te miro así por eso. Te miro así porque aquí todos firmamos algo.', siguiente: 'j1' },

      // --- La mujer de pelo gris ---
      j1: { texto: 'A medianoche se abre la puerta del barracón. Samira la cierra enseguida detrás de alguien: una mujer de pelo gris, con un abrigo de interna demasiado grande.', siguiente: 'j2' },
      j2: { quien: 'samira', texto: 'La del barracón 4. La intocable. Los guardias no la miran: tienen orden de no tocarla. Así que puede ir a donde quiera. Ha venido a verte a ti.', siguiente: 'j3' },
      j3: { rama: [{ si: ['memo_interna', 'nombreReal'], ir: 'j4s' }], siguiente: 'j4' },
      j4s: { quien: 'elias', texto: 'Usted es la interna 2033-114. Julia Aranda.', siguiente: 'j5s' },
      j5s: { quien: 'julia', texto: 'Aquí no digas ese nombre. Aquí soy un número, como tú. Pero sí. Soy yo. Y tú eres Elías. Tienes... tienes mis ojos. Nadie me dijo que tendrías mis ojos.', efecto: { vinculo_julia: 3, bandera: 'reconocioJulia' }, siguiente: 'z0' },
      j4: { quien: 'julia', texto: '¿Tú eres el archivero nuevo? ¿Cómo te llamas?', siguiente: 'j5' },
      j5: { quien: 'elias', texto: 'Elías.', siguiente: 'j6' },
      j6: { quien: 'julia', texto: '...Elías. ¿Elías qué?', siguiente: 'j7' },
      j7: { quien: 'elias', texto: 'Vogt.', siguiente: 'j8' },
      j8: { quien: 'julia', texto: 'Vogt. Claro. Qué nombre tan feo te pusieron.', siguiente: 'j9' },
      j9: { texto: 'Se va antes de que nadie pueda decir nada. En la puerta se da la vuelta y le mira a la cara un segundo más de lo necesario. Como miraba él las fotos del Registro.', efecto: { vinculo_julia: 1 }, siguiente: 'j10' },
      j10: { quien: 'elias', pensamiento: true, texto: '«Te pusieron.» No «te llamas». «Te pusieron».', siguiente: 'z0' },

      z0: { quien: 'olek', texto: 'Bueno. Si vamos a hacer algo esta noche, que sea antes de que vuelva la ronda de las dos.' }
    }
  },

  aspirantes: [
    {
      id: 'jonas', nombre: 'Jonas Kerr', papel: 'Interno del barracón 12',
      dice: 'He oído que tramáis algo. Yo quiero salir de aquí más que nadie. Tengo una hija en Varsovia. Sé dónde guardan las llaves de la cocina.',
      habilidades: { sigilo: 2, labia: 1 },
      traidor: true,
      informe: 'Samira: «Jonas es el único del barracón que no ha perdido peso este invierno. Aquí eso solo significa una cosa: que come en la mesa del capataz.»'
    }
  ],

  misiones: [
    {
      id: 'panCocina',
      titulo: 'El pan de los guardias',
      desc: 'Sacar pan de la cocina de los guardias por la trampilla del carbón.',
      habilidad: 'sigilo', base: 45,
      coste: {},
      recompensa: { suministros: 2, red: 1 },
      captura: 0.3,
      exito: 'Seis hogazas bajo los abrigos. Esta noche el barracón 12 cena dos veces.',
      fracaso: 'Han cambiado el candado de la trampilla. {op} vuelve con las manos negras de carbón y nada más.',
      capturado: 'La ronda de las dos llegó a la una y media.'
    },
    {
      id: 'mensajeMadrid',
      titulo: 'Un mensaje para Madrid',
      desc: 'Hacer llegar un mensaje a lo que queda de los Insomnes en Madrid, a través de los maquinistas de los trenes de carbón.',
      habilidad: 'labia', base: 30,
      bonus: [{ si: 'olekAyudado', mas: 25 }, { si: 'celulaFerroviarios', mas: 15 }],
      coste: { intel: 1 },
      recompensa: { bandera: 'mensajeEnviado' },
      captura: 0.2,
      exito: 'El maquinista del jueves se guarda el papel en la bota. «Para Mara Solís, Lavapiés. Estoy en Este-1. Ella también.»',
      fracaso: 'El maquinista de esta semana es nuevo. Y tiene miedo. No se lleva nada.',
      capturado: 'El maquinista era de Rusk.'
    },
    {
      id: 'listaHelios',
      titulo: 'La lista de Helios',
      desc: 'Volver de noche a la oficina del registro y copiar la lista completa del traslado a la Ciudadela Helios.',
      habilidad: 'tecnica', base: 35,
      bonus: [{ si: 'memo_traslado', mas: 25 }],
      coste: {},
      recompensa: { intel: 2, bandera: 'listaHelios' },
      captura: 0.3,
      exito: 'Cuarenta nombres. Treinta y ocho son presos cualquiera. Los otros dos, Kowalczyk y Ferrer, tienen al lado una anotación a lápiz: «Proyecto Lumen, 2008».',
      fracaso: 'La oficina está cerrada con un candado nuevo. Rusk no se fía de nadie. Hace bien.',
      capturado: 'La cámara de la torre no gira de noche. Se queda mirando la oficina.'
    },
    {
      id: 'barracon7',
      titulo: 'Medicinas para el barracón 7',
      desc: 'Llevar lo que Samira ha podido reunir (nieve hervida, corteza de sauce, dos aspirinas) al barracón del tifus.',
      habilidad: 'sigilo', base: 40,
      bonus: [{ si: 'tomasBAyudado', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { red: 2, bandera: 'barracon7Ayudado' },
      captura: 0.25,
      exito: 'En el barracón 7, cuarenta personas tiritan en la oscuridad. Esta noche, alguien les ha traído algo. Es más de lo que les ha traído nadie en todo el invierno.',
      fracaso: 'Hay un guardia en la puerta del 7. Nunca había un guardia en la puerta del 7.',
      capturado: 'El guardia de la puerta del 7 no tenía miedo del tifus.'
    }
  ],

  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las tres de la madrugada. La estufa está fría. Queda una hora antes de la campana.',
        opciones: [
          { texto: 'Con Olek.', ir: 'o1' },
          { texto: 'Con Samira.', ir: 's1' },
          { texto: 'Con el Relojero.', ir: 'r1', si: 'relojeroEnBarracon' },
          { texto: 'Dormir.', ir: 'z1' }
        ]
      },
      o1: { quien: 'olek', texto: 'Los trenes de carbón pasan cada jueves. Vacíos hacia el Oeste, llenos hacia Helios. Llevo tres años contándolos desde la cantera. Uno de esos trenes es la salida.', siguiente: 'o2' },
      o2: { quien: 'olek', texto: 'Si alguna vez salgo de aquí, te llevo en la cabina. Nunca he dejado a nadie en un andén.', efecto: { bandera: 'promesaOlek' }, siguiente: 'z1' },
      s1: { quien: 'samira', texto: 'En Madrid tenías a alguien, ¿verdad? Se te nota. Los que tienen a alguien fuera duermen con un ojo abierto. Los que no, duermen con los dos.', siguiente: 's2' },
      s2: { rama: [{ si: 'beso', ir: 's3b' }], siguiente: 's3' },
      s3b: { quien: 'elias', texto: 'Una enfermera. Me enseñó a hacer un torniquete. Me dijo que el lunes me contaría algo. No llegamos al lunes.', siguiente: 's4' },
      s3: { quien: 'elias', texto: 'Una enfermera. Como tú. Dirigía una célula. Me llamó por mi nombre cuando nadie lo hacía.', siguiente: 's4' },
      s4: { quien: 'samira', texto: 'Entonces vive. Las enfermeras no se mueren: se esconden y siguen curando. Duérmete con un ojo abierto, archivero.', siguiente: 'z1' },
      r1: { quien: 'relojero', texto: 'La mujer de pelo gris. Sé quién es. Y tú también lo sabes, aunque todavía no te atrevas a pensarlo.', siguiente: 'r2' },
      r2: { quien: 'relojero', texto: 'Cuando te lo diga ella, acuérdate de que yo la traje aquí. En 2033. Para que tú siguieras vivo. No me perdones. Solo acuérdate.', siguiente: 'z1' },
      z1: { escena: 'colonia', texto: 'A las cinco suena la campana. La torre barre la nieve con su foco. Otro día en la Colonia Este-1.' }
    }
  }
};

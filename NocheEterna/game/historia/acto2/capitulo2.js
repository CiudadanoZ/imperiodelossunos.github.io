// ============================================================
//  ACTO 2 · CAPÍTULO 2 — índice
//  A: prólogo «La ciudad a oscuras» (Amanecer / Amanecer rojo en el Acto 1)
//  B: prólogo «El Este» (La noche sigue)
//  Los dos se juntan en la Colonia Este-1 (días 4–5). Esquema completo en docs/ACTO2.md.
//  Pasos: { tipo: 'cinematica' | 'comite' | 'dia' | 'noche', datos }
// ============================================================

window.ACTO2 = {
  A: [
    { tipo: 'cinematica', datos: CINEMATICAS.prologoA },
    { tipo: 'comite', datos: COMITE_A1 },
    { tipo: 'noche', datos: NOCHE_A1 },
    { tipo: 'comite', datos: COMITE_A2 },
    { tipo: 'noche', datos: NOCHE_A2 },
    { tipo: 'cinematica', datos: CINEMATICAS.tren },
    { tipo: 'dia', datos: DIA_A3 },
    { tipo: 'noche', datos: NOCHE_A3 },
    { tipo: 'cinematica', datos: CINEMATICAS.colonia },
    { tipo: 'dia', datos: COLONIA_DIA4 },
    { tipo: 'noche', datos: COLONIA_NOCHE4 },
    { tipo: 'dia', datos: COLONIA_DIA5 },
    { tipo: 'noche', datos: COLONIA_NOCHE5 },
    { tipo: 'cinematica', datos: CINEMATICAS.tierraDeNadie },
    { tipo: 'comite', datos: OSTRA_DIA6 },
    { tipo: 'noche', datos: OSTRA_NOCHE6 },
    { tipo: 'cinematica', datos: CINEMATICAS.helios },
    { tipo: 'dia', datos: HELIOS_DIA7 },
    { tipo: 'noche', datos: HELIOS_NOCHE7 },
    { tipo: 'comite', datos: HELIOS_DIA8 },
    { tipo: 'noche', datos: HELIOS_NOCHE8 },
    { tipo: 'asalto', datos: HELIOS_DIA9 }
  ],
  B: [
    { tipo: 'cinematica', datos: CINEMATICAS.prologoB },
    { tipo: 'dia', datos: DIA_B1 },
    { tipo: 'noche', datos: NOCHE_B1 },
    { tipo: 'dia', datos: DIA_B2 },
    { tipo: 'noche', datos: NOCHE_B2 },
    { tipo: 'dia', datos: DIA_B3 },
    { tipo: 'noche', datos: NOCHE_B3 },
    { tipo: 'dia', datos: COLONIA_DIA4 },
    { tipo: 'noche', datos: COLONIA_NOCHE4 },
    { tipo: 'dia', datos: COLONIA_DIA5 },
    { tipo: 'noche', datos: COLONIA_NOCHE5 },
    { tipo: 'cinematica', datos: CINEMATICAS.tierraDeNadie },
    { tipo: 'comite', datos: OSTRA_DIA6 },
    { tipo: 'noche', datos: OSTRA_NOCHE6 },
    { tipo: 'cinematica', datos: CINEMATICAS.helios },
    { tipo: 'dia', datos: HELIOS_DIA7 },
    { tipo: 'noche', datos: HELIOS_NOCHE7 },
    { tipo: 'comite', datos: HELIOS_DIA8 },
    { tipo: 'noche', datos: HELIOS_NOCHE8 },
    { tipo: 'asalto', datos: HELIOS_DIA9 }
  ],

  // ---------- Archivo personal: las pistas sobre 2008 (se ven en el tablero de cada noche) ----------
  pistas: [
    { si: 'pistaHombreSol', titulo: '2032 · El hombre del sol pequeño', texto: 'Un hombre de una empresa de energía, con un sol pequeño en la solapa, preguntó al Relojero por un niño de San Ildefonso. Tobías le dijo que habías muerto.' },
    { si: 'pistaLumen', titulo: '«Proyecto Lumen, 2008»', texto: '«Ella firmó la salida. Él no la dejó salir.» Una página del cuaderno del Relojero, con su letra de cuando tiene miedo.' },
    { si: 'fichaJulia2033', titulo: 'La ficha de Julia (2033)', texto: 'Exempleada del Proyecto Lumen (Voss Energía, 2006–2008). Conocimiento crítico. No dejar morir.' },
    { si: 'preguntoPadre', titulo: '«Las manos de tu padre»', texto: 'Julia no quiso decir quién era. «Es lo único que la Orden no sabe de mí.»' },
    { si: 'memo_kowalczyk', titulo: 'Ewa Kowalczyk', texto: 'Ingeniera de red. Proyecto Lumen, 2006–2008. La misma anotación que Julia: «conocimiento crítico».' },
    { si: 'maraYFerrer', titulo: 'Marcos Ferrer', texto: 'Técnico de red de Lumen. Abuelo de Lucía Ferrer, la niña de la primera lista. «Ewa, Marcos y yo: somos los tres que quedan.»' },
    { si: 'pistaFoto', titulo: 'Una foto de 2007', texto: 'El equipo de Lumen delante de una maqueta de la central. Julia, con veintisiete años, se ríe. A su lado había un hombre. Alguien le recortó la cara con unas tijeras.' },
    { si: 'sabeLlave', titulo: 'La llave maestra', texto: 'Desde el centro de Helios se puede apagar cualquier ciudad del mundo. No es un fallo: se diseñó así, en Lumen.' },
    { si: 'julia_el', titulo: '«Y él»', texto: '«Lo que hay en Helios lo construimos nosotros. Ewa, Marcos, yo. Y él.» Julia no dijo más.' },
    { si: 'vioRecorte', titulo: 'Gaceta de la Energía, 14-3-2007', texto: '«El fundador, Aldric Voss, con la joven ingeniera Julia Aranda, a quien llama "el corazón de Lumen".» La misma foto. Esta vez, con todas las caras. Un sol pequeño en la solapa.' },
    { si: 'padreConfirmado', titulo: 'Aldric Voss', texto: 'Mi padre. Ella encontró la llave maestra en sus planos, en 2008, y se fue conmigo. Me dejó sin apellido para que no me encontrara. Me buscó igual.' },
    { si: 'mensajeVoss', titulo: '«Tengo algo que te pertenece»', texto: '«Cuando sepas quién es el hombre de la foto, ven a verme.» Una línea a lápiz desde la cárcel del Distrito 1.' },
    { si: 'sabeDosManos', titulo: 'La llave de dos manos', texto: 'Plano 14-B. Primera mano: una voz, la de Julia. Segunda mano: una mano de sangre, la de Voss. Las dos en calma, o la llave no gira.' },
    { si: 'vioLector', titulo: '44-190-V', texto: 'Mi número de ciudadano, en una orden para calibrar el lector genético de la segunda mano. Firmada por Hel.' },
    { si: 'pistaLinaje', titulo: 'La Sección de Linaje (2032)', texto: 'Una funcionaria joven, con el pelo ya blanco, revisó durante una hora la ficha falsa que hizo Tobías. Luego la selló sin decir nada.' },
    { si: 'leyoArchivo', titulo: 'Elías Voss Aranda', texto: 'Anexo de sucesión, 20.11.2007: si A. Voss falta, la segunda mano pasa a su heredero. Julia no lo firmó. Por eso se fue conmigo; por eso me dejó sin apellido.' },
    { si: 'leyoArchivo', titulo: 'La V', texto: 'En 2032, Hel descubrió quién era el interno 44-190 y no se lo dijo al Canciller. Añadió una V a mi número y me guardó nueve años.' },
    { si: 'leyoArchivo', titulo: 'Proyecto CORONA', texto: 'El primer giro completo de la llave registrará un custodio de la red. Primera mano: Julia. Segunda: yo. Custodio previsto: Hel. Solo tenemos que querer girarla.' },
    { si: 'vossEjecutado', titulo: '11 de febrero, 7:12', texto: 'Ejecutaron a Aldric Voss en el patio de la cárcel del Distrito 1. Preguntó si había llamado el archivero.' },
    { si: 'vossAHelios', titulo: 'El martes, día doce', texto: 'Voss estará en la Ciudadela cuando se encienda la Red Helios. «La luz siempre encuentra el camino a casa.»' }
  ],

  // ---------- Resumen rápido: para empezar el Capítulo 2 sin la partida del Capítulo 1 ----------
  resumen: {
    inicio: 'q0',
    nodos: {
      q0: { texto: 'CAPÍTULO 2. Antes de empezar, cuéntanos qué pasó en Nueva Berlín. Solo lo importante.', siguiente: 'q1' },
      q1: {
        texto: '¿Cómo terminó el Día del Sol?',
        opciones: [
          { texto: 'Amanecer: tomamos La Aguja y detuvimos a Voss.', ir: 'q2', efecto: { bandera: ['vossDetenido', 'lucesEncendidas'] } },
          { texto: 'Amanecer rojo: lo detuvimos, pero costó muy caro.', ir: 'q2', efecto: { bandera: ['vossDetenido', 'precioAlto'] } },
          { texto: 'La noche sigue: el asalto fracasó.', ir: 'q2' }
        ]
      },
      q2: {
        texto: 'El primer día en el Ministerio, ¿qué hiciste con el expediente de Tomás Rey, «Chispa»?',
        opciones: [
          { texto: 'Lo rechacé. Chispa se unió a los Insomnes.', ir: 'q3', efecto: { bandera: 'tomasSalvado' } },
          { texto: 'Lo sellé. Lo reubicaron en el Este.', ir: 'q3', efecto: { bandera: 'tomasReubicado' } }
        ]
      },
      q3: {
        texto: '¿Descubriste tu verdadero nombre en los Documentos Semilla?',
        opciones: [
          { texto: 'Sí. Me llamo Elías Aranda. Mi madre era la Voz de Madrid.', ir: 'q4', efecto: { bandera: ['nombreReal', 'nombreDicho', 'ruthConocioMadre'] } },
          { texto: 'No. Sigo siendo Elías Vogt.', ir: 'q4' }
        ]
      },
      q4: { rama: [{ si: 'vossDetenido', ir: 'q5' }], siguiente: 'q7' },
      q5: {
        texto: 'En el despacho de Voss, el Relojero tenía una pistola. ¿Qué pasó?',
        opciones: [
          { texto: 'Bajó el arma. Está preso y confesó.', ir: 'q6', efecto: { bandera: ['relojeroBajaArma', 'confiaRelojero', 'nombreMadre'] } },
          { texto: 'Un guardia le disparó. Murió allí.', ir: 'q6', efecto: { bandera: ['relojeroCaido', 'nombreMadre'] } }
        ]
      },
      q6: {
        texto: 'El último día en el Ministerio, ¿añadiste el nombre de tu madre al tren que venía de la Colonia Este-1?',
        opciones: [
          { texto: 'Sí. Julia Aranda llegó a Madrid.', ir: 'q7', efecto: { bandera: 'juliaTraslado' } },
          { texto: 'No.', ir: 'q7' }
        ]
      },
      q7: {
        texto: '¿Qué hubo entre Mara y Elías?',
        opciones: [
          { texto: 'Se besaron la víspera del Día del Sol.', ir: 'q8', efecto: { bandera: ['maraMano', 'beso'], vinculo_mara: 6 } },
          { texto: 'Algo que se iban a decir «el lunes».', ir: 'q8', efecto: { bandera: ['maraMano', 'esperarLunes'], vinculo_mara: 5 } },
          { texto: 'Una amistad profunda. Nada más.', ir: 'q8', efecto: { vinculo_mara: 3 } }
        ]
      },
      q8: {
        texto: '¿Y Konrad Brandt, tu supervisor?',
        opciones: [
          { texto: 'Le salvé de la purga y se unió a nosotros.', ir: 'q9', efecto: { bandera: ['brandtSalvado', 'recluta_brandt'] } },
          { texto: 'Lo purgaron. Nadie sabe dónde está.', ir: 'q9', efecto: { bandera: 'brandtPurgado' } }
        ]
      },
      q9: {
        texto: '¿Y Ruth, la falsificadora?',
        opciones: [
          { texto: 'Sigue con nosotros.', ir: 'q10', efecto: { bandera: ['promesaUvas', 'sabeFalsificar'] } },
          { texto: 'No volvió del Archivo Central.', ir: 'q10', efecto: { bandera: ['ruthCaida', 'fuera_ruth', 'semillaConseguida'] } }
        ]
      },
      q10: { texto: 'Gracias. El resto lo iremos descubriendo. Empieza el Capítulo 2.' }
    }
  },

  // ---------- Mientras el Acto 2 se escribe: pantalla al terminar el prólogo ----------
  finProvisional: {
    titulo: 'FIN DEL DÍA 8',
    subtitulo: 'Continuará en el Día 9: el asalto a Helios.',
    lineas: [
      { si: 'leyoArchivo', texto: 'Has leído el archivo de Lumen. Te llamaste Elías Voss Aranda. Tu madre te dejó sin apellido para que no fueras una llave.' },
      { si: 'leyoArchivo', texto: 'CORONA: si giráis la llave, la red será de Hel. Si no la giráis, nada cambia.' },
      { si: 'custodioAbierto', texto: 'El armario del CUSTODIO está abierto: mañana podréis escribir otro nombre.' },
      { si: 'vossEjecutado', texto: 'Aldric Voss fue ejecutado en Madrid el lunes a las 7:12.' },
      { si: 'ejecucionParada', texto: 'Paraste la ejecución de Voss. «Que lea el anexo.»' },
      { si: 'vossAHelios', texto: 'Mañana a las seis llega el Canciller. Hel le ha preparado el andén.' },
      { si: 'andenVigilado', texto: 'La escolta del Canciller lleva ya escrito el parte de su muerte.' },
      { si: 'juliaLibre', texto: 'Julia está contigo. Sabe lo que hará con la llave. No te lo ha dicho.' },
      { si: 'juliaRescatada', texto: 'Sacaste a Julia de su celda a las tres de la madrugada.' },
      { si: 'juliaEnLaSala', texto: 'Julia te espera en la Sala de la Llave. Con Hel.' },
      { si: 'relojeroJuliaPaz', texto: 'Julia y el Relojero, en paz. Sin perdón.' },
      { si: 'fogonerosAliados', texto: 'Los fogoneros de Helios han pintado soles de tiza en sus calderas.' },
      { si: 'calderasListas', texto: 'A las cinco, noventa segundos de oscuridad en el anillo interior.' },
      { si: 'luzMadrid', texto: 'Una línea falsificada encendió el Hospital Central de Madrid cuatro horas.' },
      { si: 'calorColonia', texto: 'Una línea falsificada devolvió la calefacción a los barracones de Este-1.' },
      { si: 'otrosProtegidos', texto: 'Sacaste a la Cuadrilla 7 de las bobinas.' },
      { si: 'maraLunes', texto: 'Era lunes. Mara dejó de esperar.' },
      { si: 'llamoMama', texto: '«Mamá.» Por primera vez.' },
      { si: 'relojEnHora', texto: 'El reloj de San Ildefonso vuelve a andar.' }
    ]
  }
};

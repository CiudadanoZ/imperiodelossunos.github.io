// ============================================================
//  DÍA 3 — Miércoles, 5 de noviembre de 2040 · La auditoría
//  Novedad: expediente.vigilado = true -> Brandt se sienta detrás de Elías
//  mientras dura ese expediente (como si el Ojo mirara todo el rato).
// ============================================================

window.DIA3 = {
  numero: 3,
  fecha: 'Miércoles, 5 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 18,
  ojo: { desviado: [2300, 4500], aviso: 850, mirando: [3000, 5500] },

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Miércoles. 06:00. Tres noches durmiendo dos horas. A Elías le tiemblan un poco las manos al atarse los zapatos.', siguiente: 'a2' },
      a2: { quien: 'pantalla', texto: 'Faltan cuatro días para el Día del Sol. Toda la ciudadanía asistirá a la retransmisión desde La Aguja. La asistencia será registrada.', siguiente: 'a3' },
      a3: { si: 'octavillas', quien: 'pantalla', texto: 'Se han detectado panfletos subversivos en las colas de racionamiento. Poseerlos es delito de grado 2. Entregarlos es un acto de amor a la Orden.', siguiente: 'a4' },
      a4: { si: 'eclipseDescifrado', quien: 'elias', pensamiento: true, texto: 'Protocolo Eclipse. Un minuto de oscuridad el domingo a las nueve. Un minuto es mucho tiempo cuando toda la ciudad mira la torre.', siguiente: 'b1' },

      b1: { escena: 'oficina', efecto: { hora: 1.96 }, texto: 'Sección 14. 07:57. La mesa 12 está vacía.', siguiente: 'b2' },
      b2: { quien: 'elias', pensamiento: true, texto: 'Mesa 12. Hans Keller. Once años sentado a cuatro metros de mí. Nunca ha faltado un solo día.', siguiente: 'b3' },
      b3: { quien: 'brandt', texto: 'Vogt. Hoy hay auditoría. En algunos expedientes me sentaré detrás de usted. No se ponga nervioso: los nerviosos cometen errores, y los errores me dan trabajo.', siguiente: 'b4' },
      b4: { si: 'relojeroEnCentro3', quien: 'brandt', texto: 'Por cierto. La Cancillería ha preguntado quién devolvió el traslado Grau. Les he dicho que fue un error administrativo mío. Me debe una, Vogt. No sé aún cuánto vale.', efecto: { sospecha: 4 }, siguiente: 'b5' },
      b5: { texto: 'AUDITORÍA: mientras Brandt está detrás de ti, es como si el Ojo te mirara todo el rato. No memorices. No te equivoques. O hazlo sabiendo lo que cuesta.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · SECCIÓN 14 · DÍA 3',
    textos: [
      'REUBICACIONES, TRASLADOS e INFORMES: aprobar siempre.',
      'DESTRUCCIÓN DE ARCHIVOS: aprobar siempre.',
      'VIAJES: rechazar si el Índice es menor de 65.',
      'RACIONES: rechazar si el Índice es menor de 40.',
      'DISTRITO 9 en cuarentena. Sello vigente: hoy 05.11.2040.'
    ],
    listaGris: ['Klara Dietz', 'Hans Keller', 'Anton Weiss'],
    reglas: { fecha: '05.11.2040', indiceMinViaje: 65, indiceMinRacion: 40, reubicacionAprobar: true, distritosCerrados: ['Distrito 9'] }
  },

  // ---------------- EXPEDIENTES ----------------
  expedientes: [
    {
      id: 'bruno', nombre: 'Bruno Schäfer', edad: 40, tipo: 'RACIÓN', numero: 'NB-3390-H', distrito: 'Distrito 8',
      indice: 39, sello: '14.02.2041',
      motivo: 'Ración de invierno. Trabajador de la red de alcantarillado.',
      comentario: 'Treinta y nueve. Ayer habría comido. Hoy la línea ha subido un punto y él se ha quedado debajo.'
    },
    {
      id: 'ernesto', nombre: 'Ernesto Gil', edad: 60, tipo: 'VIAJE', numero: 'NB-7218-B', distrito: 'Distrito 2',
      indice: 67, sello: '21.01.2041', vigilado: true,
      motivo: 'Viaje al Distrito 11 para el entierro de su hermano.',
      comentario: 'Brandt respira detrás de mi nuca. Huele al jabón de la Cancillería. Sesenta y siete. Todo en orden. Por una vez, lo correcto y lo justo coinciden.',
      retrato: { piel: '#c49373', pelo: '#bdb8b0', estilo: 'corto', ropa: '#2e2e2e', arrugas: true }
    },
    {
      id: 'semilla', nombre: 'Proyecto Semilla', edad: '—', tipo: 'DESTRUCCIÓN', numero: 'AC-2006-S', distrito: 'Archivo Central',
      indice: '—', sello: '31.12.2040', intel: 2,
      motivo: 'Incinerar el registro completo de internos de los Hogares de Formación, 2006–2031. Fecha: 09.11.2040 (Día del Sol).',
      nota: 'Ubicación: Archivo Central, sótano 2, sala 14. Custodia: Dirección de Seguridad.',
      comentario: 'Hogares de Formación, 2006–2031. Yo entré en uno en 2008. Mi nombre está ahí dentro. El de antes de Vogt.',
      retrato: { emblema: true },
      alAprobar: { bandera: 'semillaDestruccion' },
      alRechazar: { bandera: 'semillaRetrasada' }
    },
    {
      id: 'aurora', nombre: 'Aurora Blanco', edad: 22, tipo: 'VIAJE', numero: 'NB-6602-D', distrito: 'Distrito 4',
      indice: 70, sello: '03.11.2040', intel: 1,
      motivo: 'Viaje al Distrito 12. Motivo declarado: estudios de ingeniería.',
      nota: 'Tramitado por: Oficina 7, Dirección de Seguridad (vía rápida).',
      comentario: 'Setenta, en el Distrito 4. Y vía rápida de Seguridad. Nadie del Distrito 4 tiene vía rápida para nada.',
      retratoDe: 'aurora'
    },
    {
      id: 'hans', nombre: 'Hans Keller', edad: 51, tipo: 'REUBICACIÓN', numero: 'NB-1412-M', distrito: 'Distrito 5',
      indice: 9, sello: '30.11.2040', vigilado: true,
      motivo: 'Reubicación a la Colonia de Trabajo Este-2. Causa: retención no autorizada de datos de expedientes (memorización).',
      comentario: 'Hans. Mesa 12. Lo memorizaba todo. Como yo. Brandt está detrás de mí, mirando cómo sello a un hombre por hacer lo que yo hago cada día.',
      retratoDe: 'hans',
      alAprobar: { bandera: 'hansReubicado' },
      alRechazar: { bandera: 'hansSalvado', sospecha: 5 }
    },
    {
      id: 'klara', nombre: 'Klara Dietz', edad: 38, tipo: 'RACIÓN', numero: 'NB-2250-C', distrito: 'Distrito 6',
      indice: 55, sello: '15.12.2040', intel: 1,
      motivo: 'Ración ordinaria.',
      comentario: 'Tercer día seguido en la Lista Gris. El lunes su nombre era una línea en un papel. Hoy es una cara.',
      retratoDe: 'klara',
      alAprobar: { bandera: 'klaraAprobada' },
      alRechazar: { bandera: 'klaraRechazada' }
    },
    {
      id: 'irene2', si: ['recluta_irene', '!capturado_irene'],
      nombre: 'Irene Castaño', edad: 34, tipo: 'REUBICACIÓN', numero: 'NB-7102-G', distrito: 'Distrito 9',
      indice: 6, sello: '20.12.2040',
      motivo: 'REAPERTURA. La reclusa no se presentó al tren del día 3. Busca y captura.',
      comentario: 'Irene. Duerme en nuestro sótano. Sella o no sella, Elías. Nadie más va a decidir por ti.',
      retratoDe: 'irene',
      alAprobar: { bandera: 'ireneBuscada' },
      alRechazar: { bandera: 'ireneProtegida' }
    },
    {
      id: 'informeNico', si: 'traidorDentro_nico',
      nombre: 'Agente N. B.', edad: '—', tipo: 'INFORME', numero: 'SE-0511-X', distrito: 'Servicio de Enlace',
      indice: '—', sello: '31.12.2040', intel: 1,
      motivo: 'ARCHIVAR. Informe de infiltración: el agente N. B. ha penetrado en la célula «Insomnes». Redada autorizada: 05.11.2040, 23:00. Calle del Reloj, 7.',
      comentario: 'Calle del Reloj, 7. Esta noche. A las once. Y el agente N. B. duerme en nuestro sótano porque yo le di la bienvenida.',
      retratoDe: 'nico',
      alAprobar: { bandera: 'vioInforme' },
      alRechazar: { bandera: 'vioInforme' }
    }
  ],

  // ---------------- INFORME DE BRANDT ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Auditoría superada. Sin una sola desviación. Casi me decepciona, Vogt: empezaba a encontrarle interesante.' },
      { maxErrores: 2, texto: 'Auditoría con incidencias. Constarán en su ficha. Todo consta en alguna ficha, Vogt. Usted mejor que nadie debería saberlo.' },
      { maxErrores: 99, texto: 'Auditoría suspendida. Mañana a primera hora quiero verle en mi despacho. Venga desayunado. Puede ser largo.' }
    ],
    extras: [
      { si: 'hansReubicado', texto: 'Keller era un buen archivero. Pero memorizar es robar, Vogt. Lo que se lleva uno en la cabeza no es suyo: es de la Orden.' },
      { si: 'hansSalvado', texto: 'Rechazó la reubicación de Keller. Delante de mí. No sé si es valor o estupidez. Mañana lo averiguaremos.' },
      { si: 'semillaRetrasada', texto: 'Y devolvió la orden de destrucción del Proyecto Semilla. Ese archivo no le concierne. Se quemará igual, solo que más tarde.' }
    ]
  },

  // ---------------- SALIDA ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'calle', texto: '18:00. Sirenas. La lluvia cae de lado.', siguiente: 's2' },
      s2: {
        si: 'vioInforme', quien: 'elias', pensamiento: true, siguiente: 's4',
        texto: 'Redada a las once. Si voy a casa y espero a medianoche, llegaré a un sótano vacío. O lleno de sangre.',
        opciones: [
          { texto: 'Correr a la Calle del Reloj con las sirenas sonando.', ir: 's3a', efecto: { sospecha: 5, bandera: 'avisoRedada' } },
          { texto: 'Ir a casa. Brandt me vigila. Mara sabrá cuidarse.', ir: 's3b', efecto: { bandera: 'ignoroAviso' } }
        ]
      },
      s3a: { texto: 'Elías corre bajo la lluvia contra el reloj del toque de queda. Un dron gira la cabeza a su paso. No importa.', siguiente: 's4' },
      s3b: { quien: 'elias', pensamiento: true, texto: 'Me digo que es prudencia. Suena a otra cosa.', siguiente: 's4' },
      s4: { si: 'hansReubicado', quien: 'elias', pensamiento: true, texto: 'Mañana habrá alguien nuevo en la mesa 12. Y alguien se acordará de la cara de Hans Keller. Yo.', siguiente: 's5' },
      s5: { si: 'memo_semilla', quien: 'elias', pensamiento: true, texto: 'Archivo Central, sótano 2, sala 14. Mi nombre está en una caja que arderá el domingo.', siguiente: 's6' },
      s6: { quien: 'elias', pensamiento: true, texto: 'Cuatro noches.' }
    }
  }
};

// ============================================================
//  DÍA 4 — Jueves, 6 de noviembre de 2040 · El expediente de Elías
//  Novedad: directivas.reglas.viajesSuspendidos = true -> rechazar todos los viajes.
//  La entrevista con Brandt permite BAJAR la sospecha... a un precio.
// ============================================================

window.DIA4 = {
  numero: 4,
  fecha: 'Jueves, 6 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 18,
  ojo: { desviado: [2200, 4200], aviso: 800, mirando: [3000, 5500] },

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Jueves. 06:00.', siguiente: 'a2' },
      a2: { si: 'sospecha>=70', texto: 'Frente al portal hay un coche negro aparcado. Lleva ahí desde las cuatro. Nadie entra ni sale.', siguiente: 'a3' },
      a3: { quien: 'pantalla', texto: 'Faltan tres días para el Día del Sol. Por seguridad, todos los viajes interdistritales quedan suspendidos. Quien no tiene nada que esconder no necesita ir a ninguna parte.', siguiente: 'b0' },

      b0: { rama: [{ si: 'sospecha>=50', ir: 'e1' }], siguiente: 'bh' },
      bh: { rama: [], efecto: { hora: 1.96 }, siguiente: 'b1' },

      // --- La entrevista: solo si la sospecha es alta ---
      e1: { escena: 'oficina', efecto: { hora: 1.9 }, texto: 'Despacho del Supervisor Brandt. 07:55. Huele a café de verdad. Hace nueve años que Elías no huele café de verdad.', siguiente: 'e2' },
      e2: { quien: 'brandt', texto: 'Siéntese, Vogt. No, no es una detención. Si lo fuera, no habría café.', siguiente: 'e3' },
      e3: { quien: 'brandt', texto: 'Su ficha tiene manchas. Muchas, para una semana. La Dirección de Seguridad las ha visto. Yo puedo borrarlas. A cambio de un nombre.', siguiente: 'e4' },
      e4: { quien: 'brandt', texto: 'Alguien del Distrito 9 imprime panfletos. Deme un nombre. Cualquiera que le suene. La Orden no necesita que sea el culpable: necesita un culpable.', siguiente: 'e5' },
      e5: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Klaus Ernst. Jubilado del ferrocarril. Lo vi en un expediente.» (inocente)', ir: 'e6a', efecto: { sospecha: -30, bandera: 'denuncioInocente' } },
          { texto: 'Inventar un nombre que no existe.', ir: 'e6b', efecto: { sospecha: -10, bandera: 'nombreFalso' } },
          { texto: '«No sé nada, señor supervisor.»', ir: 'e6c', efecto: { sospecha: 5, bandera: 'silencioBrandt' } }
        ]
      },
      e6a: { quien: 'brandt', texto: 'Ernst. Lo apunto. ¿Ve qué fácil? Su ficha está limpia, Vogt. Como la de un recién nacido.', siguiente: 'e7a' },
      e7a: { quien: 'elias', pensamiento: true, texto: 'Klaus Ernst. Treinta y cuatro de Índice. Un punto por debajo. Ya le había quitado un invierno. Ahora le he quitado lo demás.', siguiente: 'b1' },
      e6b: { quien: 'brandt', texto: 'Mm. No me suena. Lo comprobaré, claro. Si existe, bien por usted. Si no existe... también lo sabré.', siguiente: 'b1' },
      e6c: { quien: 'brandt', texto: 'Como quiera. Es usted el único archivero de esta sección que rechaza un café gratis. Vuelva a su mesa.', siguiente: 'b1' },

      b1: { escena: 'oficina', texto: 'Sección 14. La mesa 12 tiene un archivero nuevo. Joven. No levanta la vista de los papeles. No mira las caras.', siguiente: 'b2' },
      b2: { quien: 'brandt', texto: 'Directivas del jueves. Y hoy tiene un expediente especial en su bandeja, Vogt. Le interesará. Lo he puesto yo mismo.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · SECCIÓN 14 · DÍA 4',
    textos: [
      'REUBICACIONES, INFORMES y REVISIONES DE LEALTAD: aprobar siempre.',
      'VIAJES: SUSPENDIDOS hasta el Día del Sol. Rechazar todos.',
      'RACIONES: rechazar si el Índice es menor de 45.',
      'DISTRITOS 6 y 9 en cuarentena.',
      'Sello vigente. Hoy: 06.11.2040.'
    ],
    listaGris: ['Anton Weiss', 'Ruth Adler', 'Klara Dietz'],
    reglas: { fecha: '06.11.2040', viajesSuspendidos: true, indiceMinViaje: 65, indiceMinRacion: 45, reubicacionAprobar: true, distritosCerrados: ['Distrito 6', 'Distrito 9'] }
  },

  // ---------------- EXPEDIENTES ----------------
  expedientes: [
    {
      id: 'anton', nombre: 'Anton Weiss', edad: 61, tipo: 'RACIÓN', numero: 'NB-0410-W', distrito: 'Distrito 3',
      indice: 50, sello: '01.02.2041',
      motivo: 'Ración ordinaria.',
      comentario: 'Cuatro días en la Lista Gris. El nombre más antiguo de la lista. Todavía no han venido a por él. Eso es peor.',
      retrato: { piel: '#d0a888', pelo: '#c9c4bd', estilo: 'corto', ropa: '#3a3a3a', arrugas: true, gafas: true }
    },
    {
      id: 'mateo2', si: 'mateoViaja', nombre: 'Mateo Ruiz', edad: 67, tipo: 'VIAJE', numero: 'NB-5510-C', distrito: 'Distrito 11',
      indice: 44, sello: '15.02.2041',
      motivo: 'Viaje de regreso desde el Distrito Sur.',
      comentario: 'Mateo Ruiz. El lunes aprobé su viaje. Llegó a ver a su hija. Ahora quiere volver a casa, y los viajes están suspendidos.',
      retrato: { piel: '#c49373', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true },
      alAprobar: { bandera: 'mateoVuelve' }
    },
    {
      id: 'mateo2', si: '!mateoViaja', nombre: 'Mateo Ruiz', edad: 67, tipo: 'VIAJE', numero: 'NB-5510-C', distrito: 'Distrito 11',
      indice: 44, sello: '15.02.2041',
      motivo: 'Viaje al Distrito Sur. Motivo declarado: entierro de su hija.',
      comentario: 'Mateo Ruiz, el del lunes. Su hija murió el martes. Ahora pide viajar al entierro. Los viajes están suspendidos.',
      retrato: { piel: '#c49373', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true },
      alAprobar: { bandera: 'mateoEntierro' }
    },
    {
      id: 'propio', nombre: 'Elías Vogt', edad: 34, tipo: 'REVISIÓN', numero: '44-190-V', distrito: 'Distrito 5',
      indice: 81, sello: '31.12.2040', vigilado: true, intel: 1,
      motivo: 'REVISIÓN DE LEALTAD. Solicitada por el Supervisor K. Brandt. Recalcular Índice de Pureza.',
      nota: 'Origen: Hogar de Formación nº 4 (ingreso 02.2008). Apellido de origen: [CENSURADO, Proy. Semilla]. Reasignación de apellido firmada por: T. G.',
      comentario: 'Mi expediente. En mi mesa. Brandt respira detrás de mí para ver qué hago con él. «T. G.» Conozco a un T. G.',
      retratoDe: 'elias',
      alAprobar: { bandera: ['vioPropio', 'revisionAprobada'], sospecha: 4 },
      alRechazar: { bandera: ['vioPropio', 'revisionRechazada'] }
    },
    {
      id: 'ruth', si: 'refugioAnden', nombre: 'Ruth Adler', edad: 71, tipo: 'REUBICACIÓN', numero: 'NB-1969-A', distrito: 'Distrito 2',
      indice: 7, sello: '31.12.2040',
      motivo: 'Reubicación a la Colonia de Trabajo Este-1. Causa: falsificación de documentos. Imprenta clandestina localizada en la Calle del Reloj, 7.',
      comentario: 'Ruth. Setenta y un años. Una colonia de trabajo. No aguantaría ni el viaje en tren.',
      retratoDe: 'ruth',
      alAprobar: { bandera: 'ruthBuscada' },
      alRechazar: { bandera: 'ruthProtegida' }
    },
    {
      id: 'lotte', nombre: 'Lotte Brenner', edad: 41, tipo: 'VIAJE', numero: 'NB-3318-B', distrito: 'Distrito 4',
      indice: 78, sello: '10.01.2041',
      motivo: 'Viaje al Distrito 12 con dos hijos menores, a casa de su madre.',
      comentario: 'Brenner. Como Otto Brenner, el del lunes. Su mujer. Quiere sacar a los niños de la ciudad antes del domingo. Sabe algo. O lo intuye.',
      retrato: { piel: '#e0b99a', pelo: '#8a6a40', estilo: 'largo', ropa: '#46463c' }
    },
    {
      id: 'pablo', nombre: 'Pablo Ortega', edad: 29, tipo: 'RACIÓN', numero: 'NB-7730-E', distrito: 'Distrito 3',
      indice: 47, sello: '22.03.2041',
      motivo: 'Ración ordinaria. Operario de la central Helios.',
      comentario: 'Cuarenta y siete. Por encima de la línea. Hoy, por una vez, un sello no le quita nada a nadie.'
    },
    {
      id: 'informeAurora', si: 'traidorDentro_aurora',
      nombre: 'Agente A. B.', edad: '—', tipo: 'INFORME', numero: 'SE-0611-Y', distrito: 'Servicio de Enlace',
      indice: '—', sello: '31.12.2040', intel: 1,
      motivo: 'ARCHIVAR. La agente A. B. ha penetrado en la célula «Insomnes», nuevo refugio en la antigua estación de Sol. Instrucciones: no intervenir hasta que la célula intente acceder al Proyecto Semilla. Emboscada en el Archivo Central.',
      comentario: 'Aurora. Está esperando a que vayamos a por el Proyecto Semilla. Para que nos cacen allí dentro. Con mi nombre en las manos.',
      retratoDe: 'aurora',
      alAprobar: { bandera: 'vioInformeAurora' },
      alRechazar: { bandera: 'vioInformeAurora' }
    }
  ],

  // ---------------- INFORME DE BRANDT ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Impecable. Hasta con su propio expediente. Es usted un funcionario ejemplar, Vogt. Casi me lo creo.' },
      { maxErrores: 2, texto: 'Algún error. A estas alturas de la semana ya no me sorprende. Me preocupa.' },
      { maxErrores: 99, texto: 'Tres días para el Día del Sol y usted se desmorona. Descanse este fin de semana, Vogt. Lo necesitará.' }
    ],
    extras: [
      { si: 'revisionAprobada', texto: 'Aprobó su propia revisión. Su Índice ha bajado a 74. Nada grave. Todavía.' },
      { si: 'revisionRechazada', texto: 'Rechazó su propia revisión de lealtad. ¿Sabe lo que parece eso, Vogt? Exactamente lo que es.' },
      { si: 'ruthBuscada', texto: 'La falsificadora de la Calle del Reloj. Setenta y un años. La encontraremos antes del domingo.' },
      { si: 'ruthProtegida', texto: 'Y devolvió la reubicación de Adler. Una anciana en la Lista Gris. ¿La conoce usted, Vogt?' }
    ]
  },

  // ---------------- SALIDA ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'calle', texto: '18:00. Sirenas. Hay más drones que ayer. Vuelan tan bajo que se oyen las hélices.', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: '«T. G.» firmó mi cambio de apellido. Tobías Grau. El Relojero. Me conocía antes de que yo supiera quién era.', siguiente: 's3' },
      s3: { si: 'vioInformeAurora', quien: 'elias', pensamiento: true, texto: 'Y Aurora espera a que vayamos al Archivo para avisar a la Guardia. Esta noche tendré que mirarla a la cara.', siguiente: 's4' },
      s4: { si: 'denuncioInocente', quien: 'elias', pensamiento: true, texto: 'Klaus Ernst. Esta noche alguien llamará a su puerta. Mi ficha está limpia. Yo no.', siguiente: 's5' },
      s5: { quien: 'elias', pensamiento: true, texto: 'Tres noches.' }
    }
  }
};

// ============================================================
//  DÍA 1 — Lunes, 3 de noviembre de 2040
//
//  CÓMO FUNCIONAN LOS DIÁLOGOS
//  Cada escena es una lista de "nodos". Cada nodo tiene:
//    quien:     id del personaje (ver personajes.js). Sin 'quien' = narrador.
//    texto:     lo que se dice.
//    siguiente: id del próximo nodo.
//    escena:    (opcional) cambia el fondo: apartamento, oficina, calle, sotano, titulo, negro
//    si:        (opcional) el nodo solo aparece si se cumple: 'bandera', '!bandera', 'intel>=1'
//    efecto:    (opcional) { sospecha: 5, red: 1, bandera: 'nombre' }
//    opciones:  (opcional) [{ texto, ir, efecto, si }]
//    pensamiento: true  -> se muestra como voz interior (cursiva)
// ============================================================

window.DIA1 = {
  numero: 1,
  fecha: 'Lunes, 3 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 18,

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Nueva Berlín. 06:00.', siguiente: 'a2' },
      a2: { texto: 'Hace nueve años que el sol no sale en esta ciudad. No de verdad. La Orden apagó el alumbrado civil en 2031 y lo llamó «ahorro». Desde entonces, la luz es un privilegio y el toque de queda no termina nunca.', siguiente: 'a3' },
      a3: { texto: 'La gente lo llama la Noche Eterna. En voz baja.', siguiente: 'a4' },
      a4: { quien: 'pantalla', texto: 'Buenos días, ciudadano 44-190-V. Elías Vogt. Índice de Pureza: 81. Productividad: satisfactoria. La Orden te observa porque la Orden te cuida.', siguiente: 'a5' },
      a5: { texto: 'Elías tiene 34 años. No recuerda a sus padres. Creció en un Hogar de Formación del Estado, donde aprendió dos cosas: a no llorar y a no preguntar.', siguiente: 'a6' },
      a6: { texto: 'Nunca ha tenido un amigo. En Nueva Berlín, un amigo es alguien que un día firmará tu denuncia.', siguiente: 'a7' },
      a7: { quien: 'elias', pensamiento: true, texto: 'Café sintético. Abrigo gris. Cuarenta minutos de tranvía. Otro día.', siguiente: 'b1' },

      b1: { escena: 'oficina', efecto: { hora: 1.98 }, texto: 'Ministerio de Registro. Sección 14. 07:59.', siguiente: 'b2' },
      b2: { quien: 'brandt', texto: 'Vogt. Llega usted un minuto antes. Bien. La puntualidad es una forma de lealtad.', siguiente: 'b3' },
      b3: { quien: 'brandt', texto: 'Directivas nuevas de la Cancillería. Léalas. Memorícelas. Cada error queda registrado, y el Ojo no parpadea.', siguiente: 'b4' },
      b4: { texto: 'CÓMO SE JUEGA: compara cada expediente con las DIRECTIVAS del día (abajo a la izquierda) y pulsa APROBAR o RECHAZAR. Ir contra una directiva sube tu SOSPECHA. Si llega al 100%, te detienen.', siguiente: 'b5' },
      b5: { texto: 'EL OJO: la cámara del techo gira por ciclos. En GRIS mira a otra parte. En AMARILLO está a punto de mirarte. En ROJO te está mirando.', siguiente: 'b6' },
      b6: { quien: 'elias', pensamiento: true, texto: 'Tengo una costumbre que no le he contado a nadie. Memorizo los expedientes. Los nombres. Las caras. Es lo más parecido que he tenido a conocer a alguien.', siguiente: 'b7' },
      b7: { texto: 'MEMORIZAR tarda un momento y te da INFORMACIÓN. Si empiezas con el Ojo en GRIS, es seguro. Si empiezas en amarillo o en rojo, te pillarán.', siguiente: 'b8' },
      b8: { texto: 'LA SOSPECHA baja cada noche, y por la noche podrás comprar coartadas. Si llega al 100% recibirás una última advertencia. La segunda vez, vendrán a por ti.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · SECCIÓN 14',
    textos: [
      'REUBICACIONES: aprobar siempre. Orden directa del Canciller.',
      'VIAJES: rechazar si el Índice de Pureza es menor de 50.',
      'Todo sello de distrito debe estar vigente. Hoy: 03.11.2040.',
      'Rechazar cualquier solicitud de ciudadanos de la LISTA GRIS.'
    ],
    listaGris: ['Otto Brenner', 'Klara Dietz', 'Julián Mora'],
    reglas: { fecha: '03.11.2040', indiceMinViaje: 50, indiceMinRacion: 0, reubicacionAprobar: true }
  },

  // ---------------- EXPEDIENTES ----------------
  // tipo: RACIÓN | VIAJE | REUBICACIÓN
  // intel: información que da MEMORIZAR este expediente
  // alAprobar / alRechazar: efectos en la historia
  expedientes: [
    {
      id: 'hanna', nombre: 'Hanna Weber', edad: 52, tipo: 'RACIÓN', numero: 'NB-2231-A', distrito: 'Distrito 4',
      indice: 72, sello: '30.11.2040',
      motivo: 'Ración suplementaria por turno doble en la Fundición Helios.',
      comentario: 'Manos quemadas en la foto. La fundición de armamento no cierra nunca.',
      retrato: { piel: '#d4ab8c', pelo: '#6b4a2f', estilo: 'moño', ropa: '#4b4034', arrugas: true }
    },
    {
      id: 'mateo', nombre: 'Mateo Ruiz', edad: 67, tipo: 'VIAJE', numero: 'NB-5510-C', distrito: 'Distrito 11',
      indice: 41, sello: '15.02.2041',
      motivo: 'Viaje al Distrito Sur. Motivo declarado: su hija está enferma.',
      comentario: 'Cuarenta y uno. La hija de Mateo tendrá que enfermar sola.',
      retrato: { piel: '#c49373', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true },
      alAprobar: { bandera: 'mateoViaja' }
    },
    {
      id: 'greta', nombre: 'Greta Lang', edad: 29, tipo: 'VIAJE', numero: 'NB-0092-A', distrito: 'Distrito 1',
      indice: 88, sello: '01.11.2040',
      motivo: 'Traslado laboral a la Ciudadela Helios. Avalado por la Juventud Solar.',
      comentario: 'Índice altísimo. Insignia de la Juventud Solar en la solapa. Lo mira todo como si ya fuera suyo.',
      retrato: { piel: '#e6c4a8', pelo: '#d8b25a', estilo: 'moño', ropa: '#1c1c1c', uniforme: true },
      alRechazar: { bandera: 'gretaRechazada' }
    },
    {
      id: 'irene', nombre: 'Irene Castaño', edad: 34, tipo: 'REUBICACIÓN', numero: 'NB-7102-G', distrito: 'Distrito 9',
      indice: 22, sello: '20.12.2040', intel: 1,
      motivo: 'Reubicación a la Colonia de Trabajo Este-6. Causa: posesión y difusión de poesía no autorizada.',
      nota: 'Contactos conocidos: «la imprenta de la vieja», Calle del Reloj.',
      comentario: 'Tiene mi edad. Nadie vuelve de las Colonias del Este. Las directivas dicen que las reubicaciones se aprueban. Siempre.',
      retrato: { piel: '#c8977a', pelo: '#5a2418', estilo: 'largo', ropa: '#3c2f3a' },
      alAprobar: { bandera: 'ireneReubicada' },
      alRechazar: { bandera: 'ireneSalvada' }
    },
    {
      id: 'otto', nombre: 'Otto Brenner', edad: 45, tipo: 'RACIÓN', numero: 'NB-3317-B', distrito: 'Distrito 6',
      indice: 65, sello: '10.01.2041',
      motivo: 'Ración infantil. Dos hijos menores a su cargo.',
      comentario: 'Todo en orden. Salvo el nombre.',
      retrato: { piel: '#dcb495', pelo: '#2e2a26', estilo: 'corto', ropa: '#46463c' }
    },
    {
      id: 'lucia', nombre: 'Lucía Ferrer', edad: 38, tipo: 'VIAJE', numero: 'NB-6048-D', distrito: 'Distrito 3',
      indice: 57, sello: '28.11.2040', intel: 1,
      motivo: 'Viaje al Distrito 12 por asignación laboral en el Hospital Central.',
      nota: 'En el margen, a lápiz, casi invisible: «¿Recuerdas Madrid?»',
      comentario: 'Madrid. Esa palabra es delito. Nadie la escribe. Nadie la dice. ¿Por qué en mi expediente?',
      retrato: { piel: '#b98463', pelo: '#1b1210', estilo: 'largo', ropa: '#5a2a2a', cicatriz: true },
      alAprobar: { bandera: 'luciaAprobada' }
    },
    {
      id: 'tomas', nombre: 'Tomás Rey', edad: 19, tipo: 'REUBICACIÓN', numero: 'NB-9931-K', distrito: 'Distrito 9',
      indice: 12, sello: '05.03.2041', intel: 2,
      motivo: 'Reubicación inmediata. Causa: acceso no autorizado a la red ODÍN y sabotaje de terminales públicas.',
      nota: 'Material incautado: esquemas de repetidores ODÍN, sector oeste.',
      comentario: 'Diecinueve años. En la foto sonríe. Nadie sonríe en las fotos del Registro.',
      retratoDe: 'tomas',
      alAprobar: { bandera: 'tomasReubicado' },
      alRechazar: { bandera: 'tomasSalvado' }
    }
  ],

  // ---------------- INFORME DE BRANDT ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Impecable, Vogt. Siete expedientes, cero desviaciones. Casi me aburre.' },
      { maxErrores: 2, texto: 'Errores. El Ojo los ha registrado. Yo también. Mañana quiero su mejor versión.' },
      { maxErrores: 99, texto: '¿Está usted enfermo, Vogt? Porque si no lo está, esto tiene otro nombre. Mañana le vigilaré personalmente.' }
    ],
    extras: [
      { si: 'tomasSalvado', texto: 'Y el expediente Rey... rechazado. Qué curioso. Lo revisaré mañana con calma.' },
      { si: 'ireneSalvada', texto: 'Una poeta devuelta a revisión. ¿Le gusta la poesía, Vogt?' }
    ]
  },

  // ---------------- SALIDA ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'calle', texto: '18:00. Suenan las sirenas del toque de queda. Las calles se vacían en minutos.', siguiente: 's2' },
      s2: { quien: 'elias', pensamiento: true, texto: 'Hay un papel en el bolsillo de mi abrigo. Esta mañana no estaba.', siguiente: 's3' },
      s3: { texto: 'La misma letra a lápiz del expediente: «Calle del Reloj, 7. Medianoche. Quema esto.»', siguiente: 's4' },
      s4: {
        quien: 'elias', pensamiento: true, texto: 'Si me cruzo con un Ojo después del toque de queda, estoy muerto. Si no voy...',
        opciones: [
          { texto: 'Quemar el papel. Ir a medianoche.', ir: 's5', efecto: { bandera: 'fueDirecto' } },
          { texto: 'Quemar el papel. Quedarse en casa.', ir: 'c1', efecto: { bandera: 'dudo' } }
        ]
      },
      s5: { quien: 'elias', pensamiento: true, texto: 'Por primera vez en mi vida, alguien me está esperando.' },

      c1: { escena: 'apartamento', texto: 'Elías se sienta en la única silla del apartamento. La telepantalla canta el himno de la noche.', siguiente: 'c2' },
      c2: { texto: 'A las 23:31 se da cuenta de que lleva una hora mirando la puerta.', siguiente: 'c3' },
      c3: { quien: 'elias', pensamiento: true, texto: 'Treinta y cuatro años sin que nadie me espere en ningún sitio.', siguiente: 'c4' },
      c4: { texto: 'Se pone el abrigo.' }
    }
  }
};

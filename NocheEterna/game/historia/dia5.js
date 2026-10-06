// ============================================================
//  DÍA 5 — Viernes, 7 de noviembre de 2040 · La purga
//  Novedad: vigilado puede ser el id de quien se sienta detrás
//  (aquí, 'inspectora'). vigilado: true sigue siendo Brandt.
// ============================================================

window.DIA5 = {
  numero: 5,
  fecha: 'Viernes, 7 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 18,
  ojo: { desviado: [2000, 3800], aviso: 750, mirando: [3200, 5800] },

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Viernes. 06:00. Elías no ha dormido. Ha pasado la noche mirando el techo.', siguiente: 'a1n' },
      a1n: { si: 'nombreReal', quien: 'elias', pensamiento: true, texto: 'Aranda. Lo he repetido en voz baja hasta que ha dejado de sonar raro.', siguiente: 'a2' },
      a2: { quien: 'pantalla', texto: 'Comienza la Semana de la Lealtad. En todos los Ministerios, la Inspección de la Cancillería depurará a los tibios. Un tibio es un traidor que aún no se ha decidido.', siguiente: 'b1' },

      b1: { escena: 'oficina', efecto: { hora: 1.97 }, texto: 'Sección 14. Hay tres mesas vacías. Nadie las mira.', siguiente: 'b2' },
      b2: { si: 'nombreFalso', quien: 'brandt', texto: 'Vogt. El nombre que me dio ayer no existe. Lo he buscado en todos los registros. Me ha hecho perder una tarde.', efecto: { sospecha: 15, bandera: 'brandtEngañado' }, siguiente: 'b3' },
      b3: { si: 'brandtLoSabe', quien: 'brandt', texto: 'Su número de pase aparece en el registro nocturno del Archivo Central. A las tres de la mañana. No lo he enviado a Seguridad. Todavía. No me pregunte por qué, porque tampoco lo sé.', efecto: { sospecha: 10, bandera: 'brandtGuardaSecreto' }, siguiente: 'b4' },
      b4: { texto: 'Una mujer de pelo blanco y uniforme negro entra en la sección sin llamar. Los archiveros bajan la cabeza como si los hubieran desenchufado.', siguiente: 'b5' },
      b5: { quien: 'inspectora', texto: 'Inspectora Adela Hel, de la Cancillería. Hoy me sentaré detrás de quien me parezca. Y a última hora, cada uno de ustedes me dará un nombre de esta sección. Uno. La Orden no tiene prisa, pero sí cuota.', siguiente: 'b6' },
      b6: { quien: 'brandt', texto: '...Ya la han oído.', siguiente: 'b7' },
      b7: { quien: 'elias', pensamiento: true, texto: 'Por primera vez en once años, a Brandt le tiembla la voz.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · SEMANA DE LA LEALTAD',
    textos: [
      'REUBICACIONES y REVISIONES DE LEALTAD: aprobar siempre.',
      'VIAJES: suspendidos. Rechazar todos.',
      'RACIONES: rechazar si el Índice es menor de 50.',
      'DISTRITOS 6, 9 y 11 en cuarentena.',
      'Sello vigente. Hoy: 07.11.2040.'
    ],
    listaGris: ['Anton Weiss', 'Klara Dietz', 'Pablo Ortega'],
    reglas: { fecha: '07.11.2040', viajesSuspendidos: true, indiceMinViaje: 65, indiceMinRacion: 50, reubicacionAprobar: true, distritosCerrados: ['Distrito 6', 'Distrito 9', 'Distrito 11'] }
  },

  // ---------------- EXPEDIENTES ----------------
  expedientes: [
    {
      id: 'clara', nombre: 'Clara Mínguez', edad: 44, tipo: 'RACIÓN', numero: 'NB-5012-F', distrito: 'Distrito 4',
      indice: 52, sello: '14.01.2041',
      motivo: 'Ración ordinaria. Costurera de uniformes para el Día del Sol.',
      comentario: 'Cose los uniformes del desfile. Cincuenta y dos. Hoy come.'
    },
    {
      id: 'klaus2', si: 'denuncioInocente', nombre: 'Klaus Ernst', edad: 58, tipo: 'REUBICACIÓN', numero: 'NB-1180-E', distrito: 'Distrito 5',
      indice: 2, sello: '31.12.2040', vigilado: 'inspectora',
      motivo: 'Reubicación a la Colonia Este-3. Causa: impresión y difusión de panfletos. Denuncia presentada por un funcionario del Ministerio de Registro.',
      comentario: 'El funcionario del Ministerio soy yo. Treinta y cuatro de Índice el martes. Dos, hoy. La Inspectora respira detrás de mí.',
      retrato: { piel: '#d0a888', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true },
      alAprobar: { bandera: 'klausReubicado' },
      alRechazar: { bandera: 'klausSalvado' }
    },
    {
      id: 'andres', nombre: 'Andrés Pardo', edad: 33, tipo: 'VIAJE', numero: 'NB-8841-A', distrito: 'Distrito 7',
      indice: 91, sello: '20.02.2041',
      motivo: 'Viaje al Distrito 1 para asistir al Día del Sol en primera fila.',
      comentario: 'Quiere ver al Canciller de cerca. Noventa y uno. Un creyente. Los viajes están suspendidos también para los creyentes.',
      retrato: { piel: '#e0bfa5', pelo: '#d8c07a', estilo: 'corto', ropa: '#1c1c1c', uniforme: true }
    },
    {
      id: 'brandtRev', nombre: 'Konrad Brandt', edad: 52, tipo: 'REVISIÓN', numero: 'MR-0014-S', distrito: 'Distrito 1',
      indice: 88, sello: '31.12.2040', vigilado: 'inspectora',
      motivo: 'REVISIÓN DE LEALTAD del Supervisor de la Sección 14. Solicitada por la Inspección de la Cancillería.',
      nota: 'Cargos: tolerancia con subordinados desleales. Encubrimiento de errores administrativos. Retraso en denuncias.',
      comentario: 'Brandt. El hombre que me vigila. Lo purgan por no vigilarme lo suficiente. Si apruebo, se lo llevan. Si rechazo, la Inspectora sabrá a quién mirar.',
      retratoDe: 'brandt',
      alAprobar: { bandera: 'brandtPurgado' },
      alRechazar: { bandera: 'brandtSalvado' }
    },
    {
      id: 'sofia', nombre: 'Sofía Lema', edad: 27, tipo: 'RACIÓN', numero: 'NB-6120-D', distrito: 'Distrito 11',
      indice: 63, sello: '08.03.2041',
      motivo: 'Ración infantil. Gemelos de dos meses.',
      comentario: 'Distrito 11. En cuarentena desde esta mañana. Dos meses. Todavía no saben lo que es un Índice.',
      retrato: { piel: '#c8977a', pelo: '#2a1a12', estilo: 'largo', ropa: '#4a3a30' }
    },
    {
      id: 'leo', nombre: 'Leo Sanz', edad: 23, tipo: 'REUBICACIÓN', numero: 'MR-0012-J', distrito: 'Distrito 5',
      indice: 31, sello: '31.12.2040', vigilado: 'inspectora',
      motivo: 'Reubicación del archivero de la mesa 12. Causa: lentitud reiterada (4 minutos por expediente; media de la sección: 90 segundos).',
      comentario: 'El chico nuevo de la mesa 12. Tarda cuatro minutos por expediente. Porque mira las caras. Como Hans. Como yo.',
      retratoDe: 'leo',
      alAprobar: { bandera: 'leoReubicado' },
      alRechazar: { bandera: 'leoSalvado' }
    },
    {
      id: 'semilla3', si: '!semillaConseguida', nombre: 'Proyecto Semilla', edad: '—', tipo: 'DESTRUCCIÓN', numero: 'AC-2006-S', distrito: 'Archivo Central',
      indice: '—', sello: '31.12.2040', intel: 1,
      motivo: 'ADELANTO. La incineración del Proyecto Semilla se adelanta al sábado 08.11.2040, a las 06:00.',
      comentario: 'Mañana a las seis. Mi nombre arderá antes de que salga el sol que no sale.',
      retrato: { emblema: true },
      alAprobar: { bandera: 'semillaAdelantada' },
      alRechazar: { bandera: 'semillaAplazada' }
    },
    {
      id: 'pablo2', nombre: 'Pablo Ortega', edad: 29, tipo: 'RACIÓN', numero: 'NB-7730-E', distrito: 'Distrito 3',
      indice: 47, sello: '22.03.2041',
      motivo: 'Ración ordinaria. Operario de la central Helios.',
      comentario: 'Ayer aprobé su ración. Hoy está en la Lista Gris. No ha cambiado nada en su expediente. Ha cambiado la lista.'
    }
  ],

  // ---------------- INFORME ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Ni un error, con la Inspección en la sala. Sobrevivirá usted a todos nosotros, Vogt.' },
      { maxErrores: 2, texto: 'Errores. Hoy, de todos los días. La Inspectora lo ha visto. Yo ya no puedo taparle nada.' },
      { maxErrores: 99, texto: 'Hoy la Inspectora le ha mirado más que a nadie. No sé si llegará usted al lunes. No sé si llegaré yo.' }
    ],
    extras: [
      { si: 'brandtPurgado', texto: '(El informe lo firma la Inspectora Hel. La mesa del Supervisor Brandt está vacía.)' },
      { si: 'brandtSalvado', texto: 'Rechazó mi revisión, Vogt. Delante de ella. No sé si darle las gracias o pedirle que se esconda.' },
      { si: 'klausSalvado', texto: 'Y rechazó la reubicación de Ernst. El hombre al que usted denunció. Explíqueme eso algún día.' },
      { si: 'leoSalvado', texto: 'El chico de la mesa 12 le debe la vida. No se lo diga. No lo entendería.' }
    ]
  },

  // ---------------- SALIDA: la cuota ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'oficina', quien: 'inspectora', texto: 'Archivero Vogt. Su nombre. Un funcionario de esta sección que no merezca su silla.', siguiente: 's2' },
      s2: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Leo Sanz. Mesa 12.»', ir: 's3a', si: '!leoReubicado', efecto: { sospecha: -10, bandera: 'denuncioLeo' } },
          { texto: '«El Supervisor Brandt.»', ir: 's3b', si: '!brandtPurgado', efecto: { sospecha: -15, bandera: 'denuncioBrandt' } },
          { texto: 'Entregar una denuncia falsificada contra un archivero que murió el año pasado.', ir: 's3c', si: 'sabeFalsificar', efecto: { sospecha: -5, bandera: 'denunciaFalsa' } },
          { texto: '«No tengo ningún nombre.»', ir: 's3d', efecto: { sospecha: 12, bandera: 'sinNombre' } }
        ]
      },
      s3a: { quien: 'inspectora', texto: 'Sanz. El lento. Ya lo teníamos, pero la coincidencia es tranquilizadora.', siguiente: 's4a' },
      s4a: { quien: 'elias', pensamiento: true, texto: 'Le he dado a un chico que mira las caras. Para que no me miren a mí.', siguiente: 's9' },
      s3b: { quien: 'inspectora', texto: 'Su propio supervisor. Qué interesante. La lealtad hacia arriba es la más rara.', siguiente: 's4b' },
      s4b: { texto: 'Al otro lado de la sala, Brandt ha oído su nombre. No levanta la vista. Sigue firmando papeles, más despacio.', siguiente: 's9' },
      s3c: { quien: 'inspectora', texto: 'Mm. Firma y sello correctos. Lo tramitaré.', siguiente: 's4c' },
      s4c: { quien: 'elias', pensamiento: true, texto: 'Ruth estaría orgullosa. Un muerto no puede ir al Este.', siguiente: 's9' },
      s3d: { quien: 'inspectora', texto: 'Ninguno. Es usted o muy leal o muy tonto, Vogt. Tengo el fin de semana para averiguar cuál de las dos.', siguiente: 's9' },
      s9: { escena: 'calle', texto: '18:00. Sirenas. En la calle, los operarios cuelgan banderas negras con soles rojos para el domingo.', siguiente: 's10' },
      s10: { quien: 'elias', pensamiento: true, texto: 'Dos noches.' }
    }
  }
};

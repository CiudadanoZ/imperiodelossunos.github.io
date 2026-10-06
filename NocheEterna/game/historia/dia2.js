// ============================================================
//  DÍA 2 — Martes, 4 de noviembre de 2040
//  Mismo formato que dia1.js. Novedades:
//    expediente.si          -> el expediente solo aparece si se cumple la condición
//    expediente.comentarioSi -> [{ si, texto }] cambia el pensamiento de Elías según el camino
//    directivas.reglas.distritosCerrados -> rechazar todo lo que venga de esos distritos
//    ojo -> ritmo de la cámara (milisegundos): más corto = más vigilancia
// ============================================================

window.DIA2 = {
  numero: 2,
  fecha: 'Martes, 4 de noviembre de 2040',
  horaInicio: 8,
  horaFin: 18,
  ojo: { desviado: [2500, 5000], aviso: 900, mirando: [3000, 5500] },

  // ---------------- MAÑANA ----------------
  intro: {
    inicio: 'a1',
    nodos: {
      a1: { escena: 'apartamento', texto: 'Martes. 06:00. Elías ha dormido dos horas. Le parecen más que en toda su vida.', siguiente: 'a2' },
      a2: { si: 'pintadasHechas', quien: 'pantalla', texto: 'Aviso a la ciudadanía. Elementos antisociales han vandalizado el Distrito 9 con consignas prohibidas. La Orden recuerda que la ciudad a la que aluden nunca existió. El Distrito 9 queda en cuarentena.', siguiente: 'a2b' },
      a2b: { si: '!pintadasHechas', quien: 'pantalla', texto: 'Aviso a la ciudadanía. Por productividad insuficiente, el Distrito 9 queda en cuarentena preventiva.', siguiente: 'a3' },
      a3: { si: 'almacenAsaltado', quien: 'pantalla', texto: 'Robo en el almacén de la Avenida Kessler. Quinientos créditos para quien aporte información. Denunciar es cuidar.', siguiente: 'a4' },
      a4: { quien: 'elias', pensamiento: true, texto: 'El espejo me devuelve la misma cara gris de siempre. Pero anoche alguien la miró.', siguiente: 'b1' },

      b1: { escena: 'oficina', efecto: { hora: 1.97 }, texto: 'Ministerio de Registro. Sección 14. 07:58.', siguiente: 'b2' },
      b2: { quien: 'brandt', texto: 'Vogt. Dos minutos antes. Llegar demasiado pronto también es una forma de esconder algo.', siguiente: 'b3' },
      b3: { si: 'tomasSalvado', quien: 'brandt', texto: 'El expediente Rey. Usted lo devolvió a revisión y anoche el detenido desapareció del calabozo. Una coincidencia, supongo.', efecto: { sospecha: 5 }, siguiente: 'b4' },
      b4: { quien: 'brandt', texto: 'Directivas endurecidas. La Cancillería prepara el Día del Sol y no quiere manchas en la ciudad. He pedido que el Ojo de su mesa gire más a menudo.', siguiente: 'b5' },
      b5: { quien: 'elias', pensamiento: true, texto: 'Tobías Grau. Si su nombre pasa por mi mesa, tengo que memorizarlo. Aunque el Ojo me esté mirando.' }
    }
  },

  // ---------------- DIRECTIVAS ----------------
  directivas: {
    titulo: 'DIRECTIVAS · SECCIÓN 14 · DÍA 2',
    textos: [
      'REUBICACIONES y TRASLADOS: aprobar siempre.',
      'VIAJES: rechazar si el Índice es menor de 60.',
      'RACIONES: rechazar si el Índice es menor de 35.',
      'DISTRITO 9 en cuarentena: rechazar todo, salvo reubicaciones.',
      'Sello de distrito vigente. Hoy: 04.11.2040.'
    ],
    listaGris: ['Julián Mora', 'Klara Dietz', 'Anton Weiss'],
    reglas: { fecha: '04.11.2040', indiceMinViaje: 60, indiceMinRacion: 35, reubicacionAprobar: true, distritosCerrados: ['Distrito 9'] }
  },

  // ---------------- EXPEDIENTES ----------------
  expedientes: [
    {
      id: 'klaus', nombre: 'Klaus Ernst', edad: 58, tipo: 'RACIÓN', numero: 'NB-1180-E', distrito: 'Distrito 5',
      indice: 34, sello: '22.12.2040',
      motivo: 'Ración de invierno. Jubilado del ferrocarril.',
      comentario: 'Treinta y cuatro. Un punto por debajo. Un punto es un invierno.',
      retrato: { piel: '#d0a888', pelo: '#bdb8b0', estilo: 'rapado', ropa: '#3a3a3a', arrugas: true }
    },
    {
      id: 'rosa', nombre: 'Rosa Ibarra', edad: 31, tipo: 'RACIÓN', numero: 'NB-4402-F', distrito: 'Distrito 9',
      indice: 61, sello: '30.01.2041',
      motivo: 'Ración infantil. Una hija de cuatro años.',
      comentario: 'Distrito 9. En cuarentena desde esta mañana.',
      comentarioSi: [{ si: 'pintadasHechas', texto: 'Distrito 9. Donde anoche pintamos «¿Recuerdas Madrid?». La cuarentena es por nosotros. El hambre de esta niña, también.' }],
      retrato: { piel: '#b98463', pelo: '#2a1a12', estilo: 'largo', ropa: '#4a3a30' },
      alRechazar: { bandera: 'rosaRechazada' }
    },
    {
      id: 'nico', nombre: 'Nico Barros', edad: 27, tipo: 'VIAJE', numero: 'NB-8813-C', distrito: 'Distrito 3',
      indice: 66, sello: '15.01.2041', intel: 1,
      motivo: 'Viaje al Distrito 12. Motivo declarado: visita a su madre.',
      nota: 'Empleador: Servicio de Enlace · Dirección de Seguridad.',
      comentario: 'Manos limpias. Corte de pelo reglamentario. Nadie del Distrito 3 lleva ese corte de pelo.',
      retratoDe: 'nico'
    },
    {
      id: 'julian', nombre: 'Julián Mora', edad: 44, tipo: 'VIAJE', numero: 'NB-2977-D', distrito: 'Distrito 7',
      indice: 52, sello: '11.03.2041', intel: 1,
      motivo: 'Viaje al puerto del Distrito Sur. Motivo declarado: oferta de trabajo.',
      comentario: 'Lista Gris. Si no sale de la ciudad esta semana, no saldrá nunca. Lo sabe. Se le nota en la foto.',
      retratoDe: 'julian',
      alAprobar: { bandera: 'julianHuye' },
      alRechazar: { bandera: 'julianAtrapado' }
    },
    {
      id: 'relojero', nombre: 'Tobías Grau', edad: 63, tipo: 'REUBICACIÓN', numero: 'NB-0007-R', distrito: 'Distrito 2',
      indice: 3, sello: '31.12.2040', intel: 2,
      motivo: 'TRASLADO del Centro de Reeducación 3 a La Aguja, nivel -4. Orden directa de la Cancillería.',
      nota: 'Observaciones: el detenido se presentó voluntariamente en la Dirección de Seguridad el 20.10.2040.',
      comentario: 'El Relojero. Me mira desde la foto como si supiera que iba a ser yo quien sellara esto.',
      retratoDe: 'relojero',
      alAprobar: { bandera: 'relojeroTrasladado' },
      alRechazar: { bandera: 'relojeroEnCentro3' }
    },
    {
      id: 'marta', nombre: 'Marta Hessel', edad: 49, tipo: 'VIAJE', numero: 'NB-5561-B', distrito: 'Distrito 4',
      indice: 58, sello: '19.12.2040',
      motivo: 'Viaje a la Colonia de Trabajo Este-6. Motivo declarado: visitar a su hijo.',
      comentario: 'Nadie visita las Colonias del Este. Ni siquiera sé si su hijo sigue allí. Ni si alguien sigue allí.',
      comentarioSi: [{ si: 'ireneReubicada', texto: 'Este-6. Donde mandé ayer a Irene Castaño. Nadie visita las Colonias del Este.' }],
      retrato: { piel: '#dcb495', pelo: '#6b4a2f', estilo: 'moño', ropa: '#4b4034', arrugas: true }
    },
    {
      id: 'pieter', nombre: 'Pieter Voss', edad: 36, tipo: 'RACIÓN', numero: 'NB-0001-A', distrito: 'Distrito 1',
      indice: 94, sello: '02.11.2040',
      motivo: 'Ración de categoría Oro. Familiar directo del Canciller.',
      comentario: 'Voss. El apellido del Canciller. Su sello caducó anteayer. Las directivas no dicen nada de sobrinos.',
      retrato: { piel: '#ecc9ad', pelo: '#d8c07a', estilo: 'corto', ropa: '#1c1c1c', uniforme: true },
      alAprobar: { bandera: 'pieterAprobado' },
      alRechazar: { bandera: 'pieterRechazado', sospecha: 4 }
    },
    {
      id: 'tomas2', si: 'tomasSalvado',
      nombre: 'Tomás Rey', edad: 19, tipo: 'REUBICACIÓN', numero: 'NB-9931-K', distrito: 'Distrito 9',
      indice: 4, sello: '05.03.2041',
      motivo: 'REAPERTURA. Orden de busca y captura tras la fuga del calabozo del Distrito 9.',
      comentario: 'Chispa me pidió que lo tirara a la trituradora. No hay trituradora. Solo dos sellos.',
      retratoDe: 'tomas',
      alAprobar: { bandera: 'tomasBuscado' },
      alRechazar: { bandera: 'tomasProtegido' }
    }
  ],

  // ---------------- INFORME DE BRANDT ----------------
  informe: {
    comentarios: [
      { maxErrores: 0, texto: 'Sin errores. Me alegra, Vogt. De verdad. Me ahorra un informe.' },
      { maxErrores: 2, texto: 'Otra vez errores. Le recuerdo que la Sección 14 no tiene archiveros de repuesto. Tiene vacantes.' },
      { maxErrores: 99, texto: 'He enviado su historial a la Dirección de Seguridad. Es el procedimiento. No se lo tome como algo personal.' }
    ],
    extras: [
      { si: 'pieterRechazado', texto: 'Rechazó usted la ración del sobrino del Canciller. Correctamente. Que la Orden nos ampare a los dos.' },
      { si: 'pieterAprobado', texto: 'Aprobó un sello caducado. Pero era un Voss. Lo pasaré por alto. Esta vez.' },
      { si: 'relojeroEnCentro3', texto: 'Y un traslado de la Cancillería devuelto a revisión. Espero que tenga un motivo excelente, Vogt.' },
      { si: 'tomasProtegido', texto: 'El expediente Rey ha vuelto a salir de su mesa sin sello. No habrá una tercera vez.' }
    ]
  },

  // ---------------- SALIDA ----------------
  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'calle', texto: '18:04. Un control de la Guardia Negra a la salida del tranvía.', siguiente: 's2' },
      s2: { quien: 'guardia', texto: 'Cartilla. Índice. Destino.', siguiente: 's3' },
      s3: { quien: 'elias', texto: '44-190-V. Índice 81. A casa.', siguiente: 's4' },
      s4: { texto: 'Detrás del guardia, sin uniforme, un hombre joven con el pelo cortado a la manera reglamentaria mira pasar a la gente, una a una.', siguiente: 's5' },
      s5: { si: 'memo_nico', quien: 'elias', pensamiento: true, texto: 'Nico Barros. El expediente de esta mañana. Servicio de Enlace. No está aquí para viajar a ver a su madre.', siguiente: 's6' },
      s6: { si: '!memo_nico', quien: 'elias', pensamiento: true, texto: 'Esa cara. La he visto hoy. Pasan tantas por mi mesa...', siguiente: 's7' },
      s7: { quien: 'guardia', texto: 'Circule.', siguiente: 's8' },
      s8: { quien: 'elias', pensamiento: true, texto: 'Esta noche vuelvo a la Calle del Reloj. Esta vez sin dudar.' }
    }
  }
};

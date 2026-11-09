// ============================================================
//  ACTO 2 · DÍA 7 — «La Ciudadela» (los dos caminos juntos)
//  Domingo, 10 de febrero de 2041. El tren de Kurt entra por la vía del río.
//  Elías acaba en la Oficina de Turnos y Pases del anillo interior: órdenes de mantenimiento,
//  asignaciones de turno y pases. Vuelve la sospecha. Falsificar una orden decide quién tiene luz.
//  Entre los papeles: el Proyecto CORONA, «primera mano» y, al final, su propio número de ciudadano
//  en una orden para el lector genético de la Sala de la Llave. La Inspectora se sienta detrás.
// ============================================================

window.HELIOS_DIA7 = {
  numero: 7,
  fecha: 'Domingo, 10 de febrero de 2041',
  horaInicio: 8,
  horaFin: 16,
  escenaCasa: 'helios',
  escenaMesa: 'oficinaHelios',
  cabecera: 'CIUDADELA HELIOS · OFICINA DE TURNOS Y PASES',
  medidor: 'sospecha',
  ojo: { desviado: [2400, 4600], aviso: 900, mirando: [3000, 5000] },

  intro: {
    inicio: 'a0',
    nodos: {
      a0: { efecto: { sospecha: -100 }, rama: [{ si: 'agujasMal', ir: 'a1m' }], siguiente: 'a1' },
      a1: { escena: 'helios', texto: 'Domingo. 6:40. El tren de Kurt entra en la Ciudadela por la vía del río, entre dos vagones de carbón que llegaban a la misma hora. Nadie mira dos veces un tren de carbón.', siguiente: 'a2' },
      a1m: { escena: 'helios', texto: 'Domingo. 9:30. Tres horas tarde, a plena luz, empujado los primeros metros por la gente de Ostra. El tren de Kurt entra en la Ciudadela por la vía del río. Desde la torre 4, alguien apunta algo en una libreta.', efecto: { sospecha: 15 }, siguiente: 'a2' },
      a2: { texto: 'Por dentro, Helios no se parece a nada. Calles limpias. Farolas encendidas a mediodía. Cuarenta mil personas que hacen la luz del mundo y duermen debajo, en los talleres, sin ella.', siguiente: 'a3' },
      a3: { quien: 'kurt', texto: 'Aquí abajo, en los talleres del anillo exterior, hay gente de los nuestros. Fogoneros. Yo os escondo en el carbón hasta la noche. Pero tú, archivero, no puedes pasarte el día entero en un saco.', siguiente: 'g0' },

      // --- La tapadera ---
      g0: { rama: [{ si: 'gretaContactada', ir: 'g1' }, { si: 'gretaHelios', ir: 'g4' }], siguiente: 'g7' },
      g1: { quien: 'greta', texto: '«Puerta del río.» Lo dije por radio y aquí estáis. Tengo un pase para ti: auxiliar de registro de la Oficina de Turnos. Mi jefe lleva una semana pidiendo a alguien que lea rápido.', siguiente: 'g2' },
      g2: { quien: 'greta', texto: 'El primer día me aprobaste el traslado a este sitio. Pensé que me habías condenado. Luego vi lo que hay aquí. Me salvaste de la Juventud Solar. No sé si me alegro.', efecto: { bandera: 'gretaDentro' }, siguiente: 'g3' },
      g3: { quien: 'elias', pensamiento: true, texto: 'Greta Lang. Le puse un sello verde en noviembre sin mirarle a la cara. Hoy me lleva ella a mí a una mesa.', siguiente: 'o1' },
      g4: { texto: 'En el andén del río, una técnica con mono gris deja de barrer cuando ve bajar a Elías del vagón. Greta Lang. Se le acerca con la escoba como si fuera a echarle.', siguiente: 'g5' },
      g5: { quien: 'greta', texto: 'No has contestado a nadie por radio porque nadie sabía que yo escuchaba. Da igual. En la Oficina de Turnos necesitan a alguien que lea. Di que vienes del Registro de Madrid. Es casi verdad.', efecto: { bandera: 'gretaDentro' }, siguiente: 'o1' },
      g7: { texto: 'En el muelle de carbón, un capataz grita por encima de las grúas: la Oficina de Turnos se ha quedado sin auxiliar. «El último se fue al núcleo y no volvió. ¿Alguien sabe leer?»', siguiente: 'g8' },
      g8: { quien: 'mara', texto: 'No levantes la mano. No levantes la... Ya la has levantado.', siguiente: 'o1' },

      // --- La oficina ---
      o1: { escena: 'oficinaHelios', efecto: { hora: 0.97 }, quien: 'dorn', texto: 'Ingeniero jefe Dorn. ¿Del Registro de Madrid? Mejor. Allí sabían leer órdenes. Aquí no sellamos lealtades: sellamos corriente.', siguiente: 'o2' },
      o2: { quien: 'dorn', texto: 'Si un papel está mal, una ciudad se apaga o un hombre se quema en las bobinas. No me importa cuál de las dos cosas le importe más a usted. Me importa que no pase en mi turno.', siguiente: 'o3' },
      o3: { quien: 'elias', pensamiento: true, texto: 'Otra mesa. La más grande de todas. Aquí cada sello no decide el destino de una persona. Decide el de una ciudad.', siguiente: 't1' },
      t1: { texto: 'LA OFICINA DE TURNOS: órdenes de mantenimiento de la red, asignaciones de turno y pases para el anillo interior. Vuelve la SOSPECHA: el ingeniero jefe mira, y el Ojo de Helios también.', siguiente: 't2' },
      t2: { texto: 'Las órdenes de la Dirección de Red se aprueban siempre. Pero una orden FALSIFICADA sale aprobada... con tu cambio dentro. Y aquí un cambio de una línea puede encender una ciudad.' }
    }
  },

  directivas: {
    titulo: 'OFICINA DE TURNOS · NORMAS DEL ANILLO INTERIOR',
    textos: [
      'ÓRDENES de la Dirección de Red y ASIGNACIONES de turno: aprobar siempre.',
      'PASES al anillo interior: Índice de Pureza mínimo 80.',
      'Nadie procedente de una COLONIA DE TRABAJO pasa del anillo exterior.',
      'Rechazar a cualquiera de la LISTA GRIS.',
      'Sello vigente. Hoy: 10.02.2041.'
    ],
    listaGris: ['Julia Aranda', 'Tobías Grau', 'Ewa Kowalczyk', 'Marcos Ferrer', 'Lucía Ferrer'],
    reglas: { fecha: '10.02.2041', indiceMinViaje: 80, reubicacionAprobar: true, distritosCerrados: ['Colonia Este-1', 'Colonia Este-6'] }
  },

  expedientes: [
    {
      id: 'h7carga', nombre: 'Locomotora 2019-114', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'MANIFIESTO DE ENTRADA', numero: 'HE-R-0114', distrito: 'Vía del río',
      indice: '—', sello: '31.12.2041',
      motivo: 'Cuarenta toneladas de carbón para las calderas auxiliares del anillo exterior. Tripulación: 2.',
      comentario: 'El tren de Kurt. Cuarenta toneladas de carbón y, debajo, todo lo que tengo. Tripulación: dos. Somos bastantes más.',
      comentarioSi: [{ si: 'agujasMal', texto: 'El tren de Kurt, con tres horas de retraso. Alguien de la torre 4 ha escrito una nota al margen: «llegada a la vista». Las entradas se aprueban. La nota se queda.' }],
      retrato: { emblema: true },
      alAprobar: { bandera: 'trenDentro' },
      alRechazar: { bandera: 'trenRetenido' }
    },
    {
      id: 'h7madrid', si: 'ramaCiudad', nombre: 'Subestación Oeste-4 (Madrid)', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'ORDEN DE MANTENIMIENTO', numero: 'DR-W4-0121', distrito: 'Red Oeste',
      indice: '—', sello: '31.12.2041',
      motivo: 'Mantener el corte total a la zona insurrecta (antigua Nueva Berlín). Revisar los relés cada 24 horas. Dirección de Red, 21.01.2041.',
      comentario: 'La orden que tiene a Madrid a oscuras desde hace tres semanas. Una hoja. Un sello. Así se apaga una ciudad: con lo mismo que yo hacía en la Sección 14.',
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'luzMadrid' }, aviso: 'Ahora pone: «Excepto Hospital Central y Distrito 9, de 18:00 a 22:00». Cuatro horas de luz. Nadie lee las excepciones.' }
    },
    {
      id: 'h7colonia', si: 'ramaColonia', nombre: 'Subestación Este-1', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'ORDEN DE MANTENIMIENTO', numero: 'DR-E1-0208', distrito: 'Red Este',
      indice: '—', sello: '31.12.2041',
      motivo: 'Represalia por la fuga del 8 de febrero: sin calefacción en los barracones 1 a 12 de la Colonia Este-1 durante diez días.',
      comentario: 'Diez días sin calefacción. A veinte bajo cero. Por nuestra fuga. Los que se quedaron pagan los que nos fuimos.',
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'calorColonia' }, aviso: 'Ahora pone «barracones de la guardia». Que pasen ellos diez días de frío.' }
    },
    {
      id: 'h7cuadrilla', si: 'otrosAHelios', nombre: 'Cuadrilla 7 (traslado de Este-1)', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'ASIGNACIÓN DE TURNO', numero: 'TU-B2-0007', distrito: 'Nivel -2',
      indice: '—', sello: '31.12.2041',
      motivo: 'Turno de noche en la Sala de Bobinas, nivel -2. Exposición máxima. Quince internos llegados de la Colonia Este-1 el 9 de febrero.',
      nota: 'Esperanza de servicio en bobinas: 40 días.',
      comentario: 'Los que no subieron a nuestro tren. Quince nombres de la lista de Este-1. Cuarenta días.',
      comentarioSi: [{ si: 'hansReubicado', texto: 'Los que no subieron a nuestro tren. El tercer nombre de la lista es «Keller, H.». Se los sabrá todos de memoria. Cuarenta días.' }],
      retrato: { emblema: true },
      falsificar: { efecto: { bandera: 'otrosProtegidos' }, aviso: 'Ahora la Cuadrilla 7 limpia los conductos de la vía del río. Hace frío. Pero se vive.' }
    },
    {
      id: 'h7mara', nombre: 'Ana Solano', edad: 41, tipo: 'VIAJE', etiqueta: 'PASE · ANILLO INTERIOR', numero: 'PA-0441', distrito: 'Anillo exterior',
      indice: 76, sello: '31.03.2041',
      motivo: 'Auxiliar sanitaria de los talleres. Solicita pase al anillo interior: enfermería del núcleo.',
      comentario: 'Mara. Quiere estar dentro mañana, cerca del núcleo. Setenta y seis. Las normas dicen ochenta. Por cuatro puntos.',
      retratoDe: 'mara',
      alAprobar: { bandera: 'maraPase' },
      alRechazar: { bandera: 'maraFuera' },
      falsificar: { efecto: { bandera: 'maraPase' }, aviso: 'Índice: 86. Un siete se convierte en un ocho con media línea.' }
    },
    {
      id: 'h7julia', si: 'juliaLibre', nombre: 'Rosa Medina', edad: 60, tipo: 'VIAJE', etiqueta: 'PASE · ANILLO INTERIOR', numero: 'PA-0602', distrito: 'Anillo exterior',
      indice: 81, sello: '31.03.2041', vigilado: 'dorn',
      motivo: 'Limpiadora. Solicita pase al anillo interior: limpieza del nivel 0.',
      nota: 'Comprobación facial automática: coincidencia del 88% con ARANDA, Julia (Lista Gris).',
      comentario: 'Mi madre, con el nombre de una limpiadora. El papel está en regla. La cara, no. Y el ingeniero jefe ha venido a mirar.',
      retratoDe: 'julia',
      alAprobar: { bandera: ['juliaPase', 'juliaMarcada'] },
      alRechazar: { bandera: 'juliaFuera' },
      falsificar: { efecto: { bandera: ['juliaPase', 'juliaCamuflada'] }, aviso: 'Coincidencia facial: 8%. Mi madre vuelve a ser nadie. Lo hemos hecho tantas veces en esta familia.' }
    },
    {
      id: 'h7relojero', si: 'relojeroConGrupo', nombre: 'Tomás Gil', edad: 64, tipo: 'VIAJE', etiqueta: 'PASE · ANILLO INTERIOR', numero: 'PA-0064', distrito: 'Colonia Este-1',
      indice: 72, sello: '31.03.2041',
      motivo: 'Relojero. Solicita pase para el taller del reloj de la torre del núcleo.',
      comentario: 'Tobías quiere arreglar el reloj de la torre del núcleo. Claro que quiere. Colonia Este-1: las normas dicen que no pasa.',
      retratoDe: 'relojero',
      alAprobar: { bandera: 'relojeroPase' },
      alRechazar: { bandera: 'relojeroFuera' },
      falsificar: { efecto: { bandera: 'relojeroPase' }, aviso: 'Procedencia: «Anillo exterior, taller 3». Índice 82. Un relojero que nunca ha estado en una colonia.' }
    },
    {
      id: 'h7greta', si: 'gretaHelios', nombre: 'Greta Lang', edad: 29, tipo: 'VIAJE', etiqueta: 'PASE · ANILLO INTERIOR', numero: 'PA-0092', distrito: 'Anillo 2 · distribución',
      indice: 90, sello: '30.06.2041',
      motivo: 'Técnica de distribución. Renovación de pase: acceso a la Sala de la Llave para las pruebas del día 12.',
      comentario: 'Greta pidiendo entrar en la Sala de la Llave. Todo en regla. Por una vez, la persona que necesito dentro es la que la norma deja pasar.',
      retratoDe: 'greta',
      alAprobar: { bandera: 'gretaSala' },
      alRechazar: { bandera: 'gretaFuera' }
    },
    {
      id: 'h7coronaA', si: 'ingenierosAHelios', nombre: 'Kowalczyk, E. · Ferrer, M.', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'ASIGNACIÓN AL NÚCLEO', numero: 'CO-14B-0002', distrito: 'Núcleo · nivel 0',
      indice: '—', sello: '31.12.2041',
      motivo: 'Proyecto CORONA. Asignación a la Sala de la Llave hasta el día 12. Autoriza: Inspectora A. Hel.',
      comentario: 'Ewa y Marcos. Los dos ingenieros de Lumen, en la Sala de la Llave. ¿Para qué necesita Hel a la gente que diseñó la llave? ¿Qué es CORONA?',
      retrato: { emblema: true },
      alAprobar: { bandera: 'pistaCorona' },
      alRechazar: { bandera: 'pistaCorona' }
    },
    {
      id: 'h7coronaB', si: 'ingenierosLibres', nombre: 'Kowalczyk, E. · Ferrer, M.', edad: '—', tipo: 'INFORME', etiqueta: 'ORDEN DE BÚSQUEDA', numero: 'DS-CO-0002', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041',
      motivo: 'Fugados de la Colonia Este-1 el 8 de febrero. Prioridad: Proyecto CORONA. Entregar VIVOS a la Inspectora Hel. No disparar.',
      comentario: 'Ewa y Marcos, buscados. «Vivos. No disparar.» Igual que la ficha de mi madre. Hel colecciona a la gente de Lumen. ¿Qué es CORONA?',
      retrato: { emblema: true },
      alAprobar: { bandera: 'pistaCorona' },
      alRechazar: { bandera: 'pistaCorona' }
    },
    {
      id: 'h7juliaN', si: 'juliaAHelios', nombre: 'Interna 2033-114', edad: 60, tipo: 'REUBICACIÓN', etiqueta: 'TRASLADO AL NÚCLEO', numero: 'CO-14B-0001', distrito: 'Núcleo · nivel 0',
      indice: '—', sello: '31.12.2041',
      motivo: 'Traslado a la Sala de la Llave, nivel 0, el día 12 a las 05:00. Referencia 14-B: «primera mano». Autoriza: Inspectora A. Hel.',
      comentario: 'Mi madre es un número otra vez. «Primera mano.» Como si fuera una pieza de un mecanismo.',
      retratoDe: 'julia',
      alAprobar: { bandera: 'pistaPrimeraMano' },
      alRechazar: { bandera: 'pistaPrimeraMano' }
    },
    {
      id: 'h7juliaB', si: 'juliaLibre', nombre: 'Interna 2033-114', edad: 60, tipo: 'INFORME', etiqueta: 'ORDEN DE BÚSQUEDA', numero: 'DS-CO-0001', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041',
      motivo: 'Fugada de la Colonia Este-1. Referencia 14-B: «primera mano». Entregar viva en la Sala de la Llave antes del día 12. No disparar bajo ningún concepto.',
      comentario: '«Primera mano.» Hel no quiere a mi madre presa. La quiere en una sala concreta, en un día concreto.',
      retratoDe: 'julia',
      alAprobar: { bandera: 'pistaPrimeraMano' },
      alRechazar: { bandera: 'pistaPrimeraMano' }
    },
    {
      id: 'h7vossB', si: 'vossAHelios', nombre: 'Canciller A. Voss', edad: 68, tipo: 'INFORME', etiqueta: 'VISITA OFICIAL', numero: 'CA-0001', distrito: 'Cancillería',
      indice: '—', sello: '31.12.2041',
      motivo: 'Llegada el día 12 a las 06:00 para el encendido de la Red Helios. La Inspectora Hel recibirá al Canciller en el andén. Escolta reducida a dos hombres, por orden de la Inspectora.',
      comentario: 'Dos hombres de escolta para el hombre más protegido del mundo. Hel no está protegiendo a su Canciller. Le está dejando solo.',
      retratoDe: 'voss',
      alAprobar: { bandera: 'helTraicionaVoss' },
      alRechazar: { bandera: 'helTraicionaVoss' }
    },
    {
      id: 'h7vossA1', si: ['ramaCiudad', 'ejecucionFirme'], nombre: 'Comité de la zona insurrecta', edad: '—', tipo: 'INFORME', etiqueta: 'COMUNICACIÓN INTERCEPTADA', numero: 'DS-RX-0211', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041',
      motivo: 'Radio de Madrid: la ejecución del preso Aldric Voss se cumplirá mañana, lunes 11, al amanecer.',
      nota: 'Anotación a mano de la Inspectora Hel: «No intervenir.»',
      comentario: 'El Canciller va a morir mañana y la mano derecha del Canciller ha escrito «no intervenir». Hel quiere a mi padre muerto.',
      retratoDe: 'voss',
      alAprobar: { bandera: 'helTraicionaVoss' },
      alRechazar: { bandera: 'helTraicionaVoss' }
    },
    {
      id: 'h7vossA2', si: ['ramaCiudad', '!ejecucionFirme'], nombre: 'Comité de la zona insurrecta', edad: '—', tipo: 'INFORME', etiqueta: 'COMUNICACIÓN INTERCEPTADA', numero: 'DS-RX-0211', distrito: 'Dirección de Seguridad',
      indice: '—', sello: '31.12.2041',
      motivo: 'Radio de Madrid: el preso Aldric Voss sigue en la cárcel del Distrito 1. Ha pedido papel y lápiz otra vez.',
      nota: 'Anotación a mano de la Inspectora Hel: «El viejo ya no hace falta.»',
      comentario: '«Ya no hace falta.» Para qué no hace falta. Y quién la sustituye.',
      retratoDe: 'voss',
      alAprobar: { bandera: 'helTraicionaVoss' },
      alRechazar: { bandera: 'helTraicionaVoss' }
    },
    {
      id: 'h7lector', nombre: 'Sala de la Llave · lector de sucesión', edad: '—', tipo: 'REUBICACIÓN', etiqueta: 'ORDEN DE MANTENIMIENTO · NÚCLEO', numero: 'CO-14B-0003', distrito: 'Núcleo · nivel 0',
      indice: '—', sello: '31.12.2041', vigilado: 'inspectora',
      motivo: 'Calibrar el lector genético de la segunda mano para el perfil de sucesión 44-190-V antes del día 12. Prioridad absoluta. Autoriza: Inspectora A. Hel.',
      comentario: '44-190-V. Mi número de ciudadano. Lo he escrito en once años de nóminas. Está en una orden para una máquina que lee la sangre.',
      retrato: { emblema: true },
      alAprobar: { bandera: 'vioLector' },
      alRechazar: { bandera: 'vioLector' }
    }
  ],

  informe: {
    firma: 'dorn',
    titulo: 'INFORME DE TURNO · OFICINA DE PASES',
    salir: 'Terminar el turno ▸',
    comentarios: [
      { maxErrores: 0, texto: 'Ni un error. En Madrid sabían leer, sí. Mañana le quiero aquí a las ocho. Dicen que mañana será un día largo. Siempre lo dicen.' },
      { maxErrores: 2, texto: 'Algún error. Aquí un error es un apagón en alguna parte. Mañana, menos.' },
      { maxErrores: 99, texto: 'Usted no viene del Registro de nada. Lo sé desde la segunda hoja. Y aun así la Inspectora ha dicho que no le toque. No entiendo nada. No quiero entender nada.' }
    ],
    extras: [
      { si: 'juliaMarcada', texto: 'Esa limpiadora... el sistema la marcó y usted la aprobó. Si me equivoco dejándolo estar, nos equivocamos los dos.' },
      { si: 'maraFuera', texto: 'La auxiliar sanitaria se queda en el anillo exterior. Normas.' },
      { si: 'trenRetenido', texto: 'Y el tren de carbón se queda en la vía muerta del río hasta que alguien lo revise. Usted lo ha dicho.' }
    ]
  },

  salida: {
    inicio: 's1',
    nodos: {
      s1: { escena: 'oficinaHelios', texto: '16:00. Elías levanta la vista del último papel. La silla de detrás está vacía. Ha estado ocupada todo el rato que ha tardado en leer «44-190-V».', siguiente: 's2' },
      s2: { quien: 'inspectora', texto: 'Buenas tardes, inspector Vogt. Duerma bien esta noche. Mañana es un día largo.', siguiente: 's3' },
      s3: { texto: 'La Inspectora Hel se pone los guantes despacio, un dedo detrás de otro, y se va por el pasillo sin mirar atrás. No llama a nadie. No hace falta.', siguiente: 's4' },
      s4: { quien: 'elias', pensamiento: true, texto: 'Sabe que estoy aquí. Sabe quién soy. Me ha dejado sellar su orden con mi propio número. Y se ha ido a dormir.', siguiente: 's5' },
      s5: { rama: [{ si: 'trenRetenido', ir: 's6r' }], siguiente: 's6' },
      s6r: { escena: 'helios', texto: 'El tren de Kurt sigue en la vía muerta del río, con un precinto de la Dirección. Los demás han salido del carbón por la noche, de uno en uno, hacia los talleres.', siguiente: 's7' },
      s6: { escena: 'helios', texto: 'Al salir, la Ciudadela entera está encendida. Farolas, ventanas, la aguja del núcleo. Ni una sombra donde esconderse. Elías baja a los talleres por una escalera de servicio.', siguiente: 's7' },
      s7: { quien: 'elias', pensamiento: true, texto: 'Toda mi vida he sido un número que nadie miraba. Hoy he descubierto que alguien lo miraba mucho.' }
    }
  }
};

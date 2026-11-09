// ============================================================
//  ACTO 2 · PRÓLOGO A · DÍA 2 — «La sentencia»
//  Martes, 5 de febrero de 2041. Segunda sesión del Comité y la votación sobre Voss.
// ============================================================

window.COMITE_A2 = {
  numero: 2,
  fecha: 'Martes, 5 de febrero de 2041',
  horaInicio: 9,
  horaFin: 17,
  escenaCasa: 'madridOscura',

  intro: {
    inicio: 'a1',
    nodos: {
      a1: { texto: 'Martes. Esta noche ha nevado sobre la nieve. En la puerta del antiguo Ministerio hay cola desde las seis de la mañana.', siguiente: 'a2' },
      a2: { rama: [{ si: 'linchamiento', ir: 'a3l' }, { si: 'juliaContesto', ir: 'a3j' }], siguiente: 'a3' },
      a3l: { texto: 'En la Puerta del Sol ya han descolgado los cuerpos. Alguien ha escrito debajo, con carbón: «JUSTICIA». Otro alguien lo ha tachado y ha escrito: «¿ESTO?».', siguiente: 'b1' },
      a3j: { texto: 'En las paredes del Distrito 9 han aparecido pintadas nuevas: «LA VOZ HA VUELTO». Y debajo, en letras más pequeñas: «Y QUIERE A VOSS».', siguiente: 'b1' },
      a3: { texto: 'En las paredes del Distrito 9, alguien ha pintado un sol negro con una soga alrededor.', siguiente: 'b1' },

      b1: { escena: 'comite', efecto: { hora: 0.96 }, quien: 'anselmo', texto: 'Hoy hay cinco expedientes. Y al final, la votación. La sala está llena y fuera hay más gente que dentro.', siguiente: 'b2' },
      b2: { rama: [{ si: 'juliaEnMadrid', ir: 'b3j' }], siguiente: 'b3' },
      b3j: { texto: 'En la primera fila, Julia Aranda. No ha pedido sitio. Se lo han dado. Cuando pasa por el pasillo, la gente se aparta como se apartaban antes ante un guardia.', siguiente: 'b4' },
      b3: { texto: 'En la primera fila hay una silla vacía. Nadie se sienta en ella. Anselmo dice que es para la Voz de Madrid. Por si vuelve.', siguiente: 'b4' },
      b4: { quien: 'mara', texto: 'Vamos allá. Y Elías: mira las caras. Hoy más que nunca.' }
    }
  },

  normas: {
    titulo: 'EL COMITÉ · SEGUNDA SESIÓN',
    textos: [
      'PERDONAR: el acusado vuelve a su casa. La calle no olvida.',
      'JUICIO: cárcel del Distrito 1 hasta un juicio con abogado.',
      'USAR: perdón a cambio de trabajar para la ciudad.',
      'Al final de la sesión: votación sobre la condena de Aldric Voss.',
      'ODÍN está apagado. Encenderlo es decisión tuya.'
    ]
  },

  expedientes: [
    {
      id: 'salas', nombre: 'Dr. Ernesto Salas', edad: 63, cargo: 'Jefe de Medicina Interna · Hospital Central',
      acusacion: 'Firmó en 2031 la primera lista de «pacientes que no merecen tratamiento». La primera de la lista se llamaba Lucía Ferrer. Tenía seis años.',
      pruebas: 'La lista original, con su firma y la fecha: 12 de noviembre de 2031.',
      defensa: 'Si no la firmaba yo, la firmaba otro. Y otro no habría hecho lo que hice yo con ella.',
      clamor: 'La sala se queda en silencio cuando Mara se levanta y se va sin decir nada.',
      odin: 'Versión anterior de la lista, borrada del registro: 276 nombres. Salas tachó 212 antes de firmar. La lista que se cumplió tenía 64. Lucía Ferrer estaba en la primera línea porque la habían puesto antes de que él la viera.',
      comentario: 'Lucía Ferrer. El nombre de los papeles falsos de Mara. Mara lo usa para que alguien lo siga diciendo en voz alta.',
      retrato: { piel: '#e0bfa5', pelo: '#e0dcd4', estilo: 'corto', ropa: '#e8e4dc', gafas: true, arrugas: true },
      perdonar: { efecto: { ira: 12, principios: 2, bandera: 'salasPerdonado' }, texto: 'El doctor Salas sale sin mirar a nadie. En la puerta se cruza con Mara, que vuelve. Ninguno de los dos se para.' },
      juzgar: { efecto: { ira: -8, bandera: 'salasJuzgado' }, texto: 'El doctor Salas asiente, como si le hubieran dado un diagnóstico que ya conocía.' },
      usar: { efecto: { ira: 5, principios: -5, suministros: 2, bandera: 'salasUsado' }, texto: 'El doctor Salas trabajará en el hospital sin listas. Con Mara. Nadie sabe cómo va a salir eso.' }
    },
    {
      id: 'pieter', nombre: 'Pieter Voss', edad: 36, cargo: 'Sobrino del Canciller · ración de categoría Oro',
      acusacion: 'Miembro de la familia del Canciller. Beneficiario de privilegios durante nueve años.',
      pruebas: 'Su cartilla de categoría Oro.',
      defensa: 'No elegí mi apellido. Usted debería entenderlo mejor que nadie, archivero.',
      clamor: '«¡Voss! ¡Voss! ¡Voss!»',
      odin: 'Tres transferencias en la última semana desde su cuenta a una cuenta de la Ciudadela Helios. Destinataria: Oficina de la Inspectora A. Hel.',
      comentario: 'Su expediente pasó por mi mesa en noviembre, con un sello caducado. «No elegí mi apellido.» Yo tampoco. A mí me lo eligieron para salvarme. A él, para salvarse.',
      comentarioSi: [{ si: 'pieterRechazado', texto: 'En noviembre le rechacé la ración, correctamente. Brandt dijo: «que la Orden nos ampare a los dos». Ahora es él quien pide amparo.' }],
      retrato: { piel: '#ecc9ad', pelo: '#d8c07a', estilo: 'corto', ropa: '#3a3a3a' },
      perdonar: { efecto: { ira: 16, principios: 2, bandera: 'pieterLibre' }, texto: 'Pieter Voss sale escoltado para que no lo linchen. Esa misma noche desaparece de Madrid.' },
      juzgar: { efecto: { ira: -10, bandera: 'pieterPreso' }, texto: 'Pieter Voss grita que es inocente. Es la primera vez que un Voss grita en esta sala. A la gente le gusta.' },
      usar: { efecto: { ira: 8, principios: -6, intel: 2, bandera: 'pieterUsado' }, texto: 'Pieter Voss seguirá hablando con Hel. Pero ahora le dirás tú lo que tiene que decir.' }
    },
    {
      id: 'aurora2', nombre: 'Aurora Blanco', edad: 22, cargo: 'Agente de la Oficina 7 · Dirección de Seguridad',
      acusacion: 'Infiltrada en los Insomnes en noviembre de 2040. Detenida el mes pasado en una casa del Distrito 4.',
      pruebas: 'Sus informes a la Dirección de Seguridad.',
      defensa: 'Mi hermano está en el Este. Me dijeron que si trabajaba para ellos, volvería. No ha vuelto.',
      clamor: '«¡La rata! ¡La de la emboscada!»',
      odin: 'Su hermano, Álvaro Blanco, murió en la Colonia Este-4 en marzo de 2040. Siete meses antes de que ella aceptara el trabajo. Nadie se lo dijo.',
      comentario: 'Aurora. Sonreía mientras limpiaba sus ganzúas en nuestro refugio.',
      comentarioSi: [
        { si: 'auroraExpulsada', texto: 'Aurora. La echamos antes de que tendiera su emboscada. En la escalera se giró y ya no sonreía.' },
        { si: 'auroraEngañada', texto: 'Aurora. La engañamos con lo del Archivo del Distrito 11. Nunca supo que lo sabíamos.' },
        { si: 'auroraIgnorada', texto: 'Aurora. Yo leí su informe y no dije nada. Por mi silencio, hubo una emboscada en el Archivo Central.' }
      ],
      retratoDe: 'aurora',
      perdonar: { efecto: { ira: 12, principios: 2 }, texto: 'Aurora Blanco no entiende lo que ha pasado. Se queda sentada hasta que alguien le abre la puerta.' },
      juzgar: { efecto: { ira: -8 }, texto: 'Aurora Blanco no se defiende más. Solo pregunta, al salir, si alguien sabe algo de su hermano.' },
      usar: { efecto: { ira: 4, principios: -6, intel: 2, bandera: 'auroraUsada' }, texto: 'Aurora Blanco conoce los códigos de la Oficina 7. Los que Hel sigue usando.' }
    },
    {
      id: 'colas', nombre: 'Encarna Ruiz', edad: 44, cargo: 'Funcionaria del racionamiento · Distrito 9',
      acusacion: 'Durante seis años, negó raciones a las familias de la Lista Gris del Distrito 9.',
      pruebas: 'Los libros de racionamiento, con sus iniciales.',
      defensa: 'Yo aplicaba la tabla. Usted también aplicaba tablas, archivero. Las mismas.',
      clamor: '«¡Mis hijos pasaron hambre por tu firma!»',
      comentario: 'Distrito 9. Rosa Ibarra, una hija de cuatro años, ración denegada. Esa tabla la aplicaba yo también.',
      retrato: { piel: '#c8977a', pelo: '#2a1a12', estilo: 'moño', ropa: '#46463c' },
      perdonar: { efecto: { ira: 10, principios: 2 } },
      juzgar: { efecto: { ira: -7 } },
      usar: { efecto: { ira: 5, principios: -4, suministros: 1 }, texto: 'Encarna Ruiz sabe dónde escondió la Orden los últimos almacenes de raciones del Distrito 9.' }
    },
    {
      id: 'guardiaCarcel', si: 'linchamiento', nombre: 'Sebastián Mora', edad: 39, cargo: 'Vigilante de la cárcel del Distrito 1 (del Comité)',
      acusacion: 'Anoche abrió las puertas de la cárcel a la multitud. Tres presos murieron en la Puerta del Sol.',
      pruebas: 'Doscientos testigos.',
      defensa: 'Eran cuatrocientas personas. Yo era uno. ¿Qué habría hecho usted?',
      clamor: 'La mitad de la sala le aplaude. La otra mitad baja la mirada.',
      comentario: 'Trabaja para nosotros. Para el Comité. Anoche, alguien de los nuestros abrió una puerta. Igual que Nico, pero al revés.',
      retrato: { piel: '#b58866', pelo: '#2e2a26', estilo: 'corto', ropa: '#3b3b30' },
      perdonar: { efecto: { ira: -4, principios: -4 }, texto: 'La sala aplaude. Mara no.' },
      juzgar: { efecto: { ira: 10, principios: 4 }, texto: 'Es el primer juicio del Comité contra alguien del Comité. La sala abuchea. Anselmo, no.' },
      usar: { efecto: { ira: 2, principios: -6 } }
    }
  ],

  informe: {
    firma: 'anselmo',
    comentarios: [
      { si: 'ira>=70', texto: 'La sala ha salido con ganas de sangre. Y ahora hay que votar lo de Voss. Mal momento, archivero. Muy mal momento.' },
      { si: 'principios<50', texto: 'Hemos encendido ODÍN más veces en dos días que la Orden en su primer mes. Eso me lo enseñaba en clase: así empiezan todas las historias que acaban mal.' },
      { texto: 'Yo daba clase en el Distrito 9. Enseñaba a los niños que una ley es lo que nos protege de nosotros mismos. Ahora vamos a ver si era verdad.' }
    ],
    extras: [
      { si: 'odin_pieter', texto: 'Y lo de Pieter Voss y la Ciudadela... Hel tiene oídos en esta ciudad. Más de los que pensamos.' },
      { si: 'salasUsado', texto: 'Mara no ha dicho nada de lo del doctor. Cuando Mara no dice nada, es peor.' }
    ]
  },

  // ---------------- LA VOTACIÓN ----------------
  salida: {
    inicio: 'v1',
    nodos: {
      v1: { escena: 'comite', texto: '18:00. Las velas se han consumido hasta la mitad. Ha llegado el último punto del día.', siguiente: 'v2' },
      v2: { quien: 'anselmo', texto: 'Aldric Voss fue condenado a cadena perpetua. Hoy se pide al Comité que revoque la primera ley de la ciudad libre y lo condene a muerte.', siguiente: 'v3' },
      v3: { rama: [{ si: 'juliaEnMadrid', ir: 'v4j' }], siguiente: 'v4c' },
      v4j: { quien: 'julia', texto: 'Siete años en la Colonia Este-1. En mi barracón éramos cuarenta. Volví yo. Ese hombre firmó cada uno de esos treinta y nueve nombres. Y le dais una celda con ventana.', siguiente: 'v5j' },
      v5j: { quien: 'julia', texto: 'Yo inventé «¿Recuerdas Madrid?». Pues yo me acuerdo. Me acuerdo de todo. Y exijo que muera.', siguiente: 'v6' },
      v4c: { texto: 'Una mujer del Distrito 9 se pone de pie. Lleva una foto en la mano. Luego otra. Luego doscientas personas, con doscientas fotos, en silencio.', siguiente: 'v6' },
      v6: { quien: 'mara', texto: 'El Comité somos cinco. Hay dos votos a favor y dos en contra. Falta el tuyo, Elías.', siguiente: 'v7' },
      v7: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«La ley se queda. Cadena perpetua.»', ir: 'v8a', efecto: { ira: 15, principios: 10, vinculo_julia: -1, bandera: 'leyMantenida' } },
          { texto: '«Que muera.»', ir: 'v8b', efecto: { ira: -30, principios: -25, vinculo_julia: 3, bandera: 'vossEjecucion' } },
          { texto: '«No voto hoy. No con esta rabia en la sala.»', ir: 'v8c', efecto: { ira: 8, principios: 2, bandera: 'votoAplazado' } }
        ]
      },
      v8a: { texto: 'Un rugido. Alguien lanza una silla. Anselmo se levanta para cubrir a Elías con su propio cuerpo, como hacen los maestros viejos.', siguiente: 'v9a' },
      v9a: { rama: [{ si: 'juliaEnMadrid', ir: 'v10a' }], siguiente: 'v11' },
      v10a: { quien: 'julia', texto: 'Te pareces a él. Al Relojero. Siempre tan seguro de que hay algo peor que matar. Ya aprenderás.', siguiente: 'v11' },
      v8b: { texto: 'La sala estalla en aplausos. Hay gente que llora. Mara se queda mirando la mesa, muy quieta, como en un entierro.', siguiente: 'v9b' },
      v9b: { quien: 'mara', texto: 'La primera ley que votamos. Tres meses ha durado.', siguiente: 'v11' },
      v8c: { texto: 'Nadie aplaude. Nadie grita. La sala se vacía despacio, con un rumor de algo que no ha terminado. La votación queda para cuando se pueda votar sin miedo.', siguiente: 'v11' },
      v11: { escena: 'madridOscura', texto: 'Fuera sigue nevando. En la radio de un portal, alguien ha sintonizado la frecuencia de Hel. Solo se oye el himno. Una y otra vez.' }
    }
  }
};

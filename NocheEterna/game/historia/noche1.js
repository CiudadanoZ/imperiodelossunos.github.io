// ============================================================
//  NOCHE 1 — Calle del Reloj, 7
//  Mismo formato de diálogos que dia1.js.
//  Las misiones usan:
//    habilidad: sigilo | fuerza | labia | tecnica
//    base: % de éxito sin bonificación (cada nivel de habilidad suma +15%)
//    coste / recompensa: { suministros, intel, creditos, red, sospecha, bandera }
//    captura: probabilidad de que el operativo caiga si la misión falla
//    exito / fracaso / capturado: textos ({op} = nombre del operativo)
// ============================================================

window.NOCHE1 = {
  numero: 1,

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'calle', texto: 'Calle del Reloj, 7. Una relojería cerrada desde hace años. Todos los relojes del escaparate marcan las doce.', siguiente: 'n2' },
      n2: { texto: 'La puerta trasera está abierta. Una escalera baja hacia un olor a humedad y a tinta.', siguiente: 'n3' },
      n3: { escena: 'sotano', texto: 'Abajo, una bombilla desnuda ilumina un mapa de la ciudad lleno de marcas rojas.', siguiente: 'n3a' },
      n3a: { si: 'fueDirecto', texto: 'Son las doce menos cinco. Una mujer le espera al pie de la escalera. Parece sorprendida de que haya llegado antes de hora.', siguiente: 'n3b' },
      n3b: { si: 'dudo', texto: 'Son las doce y media. Una mujer le espera al pie de la escalera, con los brazos cruzados, como si hubiera sabido que dudaría. Y que vendría igual.', siguiente: 'n4' },
      n4: { quien: 'mara', texto: 'Elías Vogt. Archivero de tercera clase, Sección 14. ¿Recuerdas Madrid?', siguiente: 'n5' },
      n5: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«No recuerdo nada. Nací aquí.»', ir: 'n6a' },
          { texto: '«¿Quiénes sois?»', ir: 'n6b' },
          { texto: '«Debería denunciaros.»', ir: 'n6c' }
        ]
      },
      n6a: { quien: 'mara', texto: 'Todos nacimos aquí. La respuesta es «Recuerdo el sol». Apréndela. La vas a necesitar.', siguiente: 'n7' },
      n6b: { quien: 'mara', texto: 'Nos llaman los Insomnes. Porque en esta ciudad los que duermen tranquilos son los que han dejado de mirar.', siguiente: 'n7' },
      n6c: { quien: 'ruth', texto: 'Ja. Si quisieras denunciarnos no habrías quemado la nota, niño. Hueles a ceniza.', siguiente: 'n7' },

      n7: { quien: 'mara', texto: 'Me llamo Mara Solís. Era enfermera, antes de que la Orden decidiera quién merecía ser curado.', siguiente: 'n8' },
      n8: { si: 'luciaAprobada', quien: 'mara', texto: 'Y esta mañana me llamaba Lucía Ferrer. Aprobaste mi permiso. Ruth dice que es su mejor falsificación.', siguiente: 'n8b' },
      n8b: { si: '!luciaAprobada', quien: 'mara', texto: 'Y esta mañana me llamaba Lucía Ferrer. Rechazaste mi permiso. Ruth aún no se lo ha perdonado.', siguiente: 'n9' },
      n9: { quien: 'ruth', texto: 'Ruth Adler. Setenta y un años. Falsifico papeles desde antes de que tú aprendieras a leer.', siguiente: 't1' },

      // --- Si salvaste a Tomás ---
      t1: { si: 'tomasSalvado', texto: 'Desde las sombras, alguien se ríe. Un chico flaco, de sonrisa torcida.', siguiente: 't2' },
      t2: { si: 'tomasSalvado', quien: 'tomas', texto: 'Y yo soy el tío al que hoy no has mandado a una colonia.', siguiente: 't3' },
      t3: { si: 'tomasSalvado', quien: 'mara', texto: 'Un rechazo devuelve el expediente a revisión. Tres días de papeleo. Nosotros lo sacamos del calabozo en tres horas.', siguiente: 't4' },
      t4: { si: 'tomasSalvado', quien: 'tomas', texto: 'Tomás. Me llaman Chispa. Te debo una, archivero. De las gordas.', efecto: { red: 1 }, siguiente: 'u1' },

      // --- Si reubicaste a Tomás ---
      u1: { si: 'tomasReubicado', quien: 'mara', texto: 'Esta mañana pasó por tu mesa un chico. Tomás Rey. Era uno de los nuestros.', siguiente: 'u2' },
      u2: { si: 'tomasReubicado', quien: 'mara', texto: 'Lo sellaste. No te culpo: no sabías nada. Pero ahora ya lo sabes.', siguiente: 'u3' },
      u3: { si: 'tomasReubicado', quien: 'ruth', texto: 'Salió en el tren de las cuatro hacia el Este. Recuerda su cara, archivero. Tú que tanto las miras.', siguiente: 'u4' },
      u4: { si: 'tomasReubicado', quien: 'elias', pensamiento: true, texto: 'La recuerdo. Sonreía.', siguiente: 'i1' },

      // --- Irene ---
      i1: { si: 'ireneSalvada', quien: 'ruth', texto: 'Irene Castaño. La poeta. Tu rechazo le ha dado tiempo. Esta noche duerme en una casa que no sale en ningún registro.', efecto: { red: 1 }, siguiente: 'i2' },
      i2: { si: 'ireneReubicada', quien: 'ruth', texto: 'También sellaste a Irene Castaño. Imprimía sus poemas aquí, en mi máquina. Siete años de poemas.', siguiente: 'm1' },

      m1: { quien: 'mara', texto: 'Hace dos semanas detuvieron a nuestro líder, el Relojero. Desde entonces la Guardia Negra ha desmantelado cuatro células. Quedamos pocos.', siguiente: 'm2' },
      m2: { quien: 'mara', texto: 'Necesitamos a alguien dentro del Ministerio de Registro. Alguien que vea los expedientes antes de que se conviertan en trenes.', siguiente: 'm3' },
      m3: { quien: 'elias', texto: '¿Por qué yo?', siguiente: 'm4' },
      m4: { quien: 'mara', texto: 'Porque llevamos meses observándote. Eres el único archivero que tarda más de lo necesario con cada expediente. Miras las caras. Nadie mira las caras.', siguiente: 'm5' },
      m5: { quien: 'elias', pensamiento: true, texto: 'Nadie me había observado nunca. No así. No para bien.', siguiente: 'm5b' },
      m5b: { si: 'intel>=1', quien: 'mara', texto: '¿Has memorizado expedientes hoy? Bien. Aquí abajo, lo que recuerdas vale más que el pan.', siguiente: 'm6' },
      m6: { quien: 'mara', texto: 'Dentro de seis días es el Día del Sol. El Canciller Voss estará en La Aguja. En persona. Por primera vez en nueve años sabemos exactamente dónde va a estar.', siguiente: 'm7' },
      m7: { quien: 'mara', texto: 'Tenemos seis noches para convertir a un puñado de insomnes en algo que pueda tomar esa torre. ¿Estás con nosotros, Elías?', siguiente: 'm8' },
      m8: {
        quien: 'elias', texto: '...',
        opciones: [
          { texto: '«Estoy con vosotros.»', ir: 'm9a', efecto: { red: 1, vinculo_mara: 1, bandera: 'aceptoPronto' } },
          { texto: '«No sé ser parte de nada.»', ir: 'm9b', efecto: { bandera: 'aceptoDudando' } }
        ]
      },
      m9a: { quien: 'mara', texto: 'Entonces bienvenido. Y no me des las gracias: esto te va a costar todo lo que tienes.', siguiente: 'm10' },
      m9b: { quien: 'mara', texto: 'Nadie sabe al principio. Quédate esta noche. Mira cómo trabajamos. Mañana decides.', siguiente: 'm9c' },
      m9c: { si: 'dudo', quien: 'mara', texto: 'Esta noche también dudaste en venir. Y has venido. Eso ya es una respuesta.', siguiente: 'm10' },
      m10: { quien: 'mara', texto: 'Hay trabajo. Podemos movernos antes del amanecer, aunque aquí nunca amanece. Cada operación tiene un precio: elige bien a quién mandas.' }
    }
  },

  // ---------------- OPERACIONES ----------------
  misiones: [
    {
      id: 'pintadas',
      titulo: 'Muros que recuerdan',
      desc: 'Pintar «¿Recuerdas Madrid?» en el muro del Distrito 9, frente al cuartel de los Ojos.',
      habilidad: 'sigilo', base: 50,
      coste: { suministros: 1 },
      recompensa: { red: 2, bandera: 'pintadasHechas' },
      captura: 0.3,
      exito: 'Al amanecer, medio Distrito 9 se para delante del muro. Nadie dice nada. Pero nadie lo borra.',
      fracaso: 'Un dron gira la esquina antes de tiempo. {op} tiene que huir con la pintura a medio secar.',
      capturado: 'Los focos atrapan a {op} contra el muro. La pintada queda a medias: «¿Recuerdas Ma—»'
    },
    {
      id: 'almacen',
      titulo: 'Pan para el invierno',
      desc: 'Vaciar un camión de raciones en el almacén de la Avenida Kessler antes del cambio de guardia.',
      habilidad: 'fuerza', base: 40,
      coste: {},
      recompensa: { suministros: 3, red: 1, bandera: 'almacenAsaltado' },
      captura: 0.4,
      exito: '{op} vuelve con cuatro cajas de raciones militares. Esta semana, tres familias del Distrito 9 comerán caliente.',
      fracaso: 'El camión no llega. Cambio de ruta de última hora. {op} vuelve con las manos vacías.',
      capturado: 'Era una trampa. La Guardia Negra esperaba dentro del almacén.'
    },
    {
      id: 'relojero',
      titulo: 'La pista del Relojero',
      desc: 'Usar lo que Elías ha memorizado para averiguar a qué centro llevaron al Relojero.',
      habilidad: 'labia', base: 35,
      coste: { intel: 1 },
      recompensa: { intel: 1, bandera: 'pistaRelojero' },
      captura: 0.5,
      exito: '{op} soborna a un conductor de furgones. El Relojero está vivo, en el Centro de Reeducación 3. Por ahora.',
      fracaso: 'Los nombres no llevan a ninguna parte. El Relojero sigue siendo un fantasma.',
      capturado: 'El contacto era un informante. {op} no llega a terminar la primera pregunta.'
    },
    {
      id: 'odin',
      si: 'tomasSalvado',
      titulo: 'Oídos en ODÍN',
      desc: 'Chispa cree que puede pinchar un repetidor de ODÍN usando los esquemas incautados de su expediente.',
      habilidad: 'tecnica', base: 40,
      coste: { suministros: 1 },
      recompensa: { intel: 2, bandera: 'odinPinchado' },
      captura: 0.35,
      exito: 'El repetidor del sector oeste ahora canta para los Insomnes. Primer mensaje interceptado: «Día del Sol. Protocolo Eclipse.»',
      fracaso: 'El repetidor tiene un cortafuegos nuevo. {op} se retira antes de que el rastreo complete.',
      capturado: 'ODÍN rastrea la señal en 40 segundos. Cuando llega la Guardia Negra, {op} aún está tecleando.'
    }
  ],

  // ---------------- DESPEDIDA ----------------
  despedida: {
    inicio: 'f1',
    nodos: {
      f1: { escena: 'sotano', quien: 'mara', texto: 'Vete a casa, Elías. Duerme dos horas. Y mañana a las ocho vuelve a ser un buen ciudadano.', siguiente: 'f1b' },
      f1b: { quien: 'mara', texto: 'Una cosa más. Si pasa por tu mesa cualquier papel sobre un hombre llamado Tobías Grau, memorízalo. Todo. Es el Relojero.', siguiente: 'f2' },
      f2: { si: 'tomasSalvado', quien: 'tomas', texto: 'Oye, archivero. Mañana, si ves mi expediente otra vez... tíralo a la trituradora, ¿vale?', siguiente: 'f3' },
      f3: { quien: 'ruth', texto: 'Y sonríe menos. Los buenos ciudadanos no sonríen.', siguiente: 'f4' },
      f4: { quien: 'elias', pensamiento: true, texto: '¿Estaba sonriendo?', siguiente: 'f5' },
      f5: { escena: 'calle', texto: 'Mientras sube las escaleras hacia la calle, Elías se da cuenta de algo.', siguiente: 'f6' },
      f6: { quien: 'elias', pensamiento: true, texto: 'Mara me ha llamado por mi nombre. No por mi número. Por mi nombre.', siguiente: 'f7' },
      f7: { escena: 'titulo', texto: 'Quedan seis noches para el Día del Sol.' }
    }
  }
};

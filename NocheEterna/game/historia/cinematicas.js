// ============================================================
//  CINEMÁTICAS — secuencias de planos con texto (ver js/secuencia.js).
//  Cada plano: { escena, camara: { de: {x, y, z}, a: {x, y, z} }, titulo, texto, dur, si }
//    x, y: punto al que mira la cámara en el lienzo de 320×180 · z: zoom (1 = escena entera)
//  Para ponerla en el capítulo: { tipo: 'cinematica', datos: CINEMATICAS.nombre } en js/main.js
// ============================================================

window.CINEMATICAS = {
  // Apertura del Acto 1, antes del Día 1 (se ve al empezar una partida nueva)
  intro: {
    planos: [
      {
        escena: 'negro', titulo: '9 DE NOVIEMBRE DE 2031', dur: 2,
        texto: 'En una sola noche, la Orden del Sol Negro tomó cuarenta países.'
      },
      {
        escena: 'titulo', camara: { de: { x: 160, y: 60, z: 1.8 }, a: { x: 160, y: 80, z: 1.25 } }, dur: 2.5,
        titulo: 'LA NOCHE LARGA',
        texto: 'Apagaron las luces «por ahorro». Nunca volvieron a encenderlas.'
      },
      {
        escena: 'calle', camara: { de: { x: 110, y: 100, z: 1.5 }, a: { x: 200, y: 95, z: 1.3 } }, dur: 2.5,
        texto: 'Madrid pasó a llamarse Nueva Berlín. Decir su antiguo nombre se convirtió en delito.'
      },
      {
        escena: 'aguja', camara: { de: { x: 160, y: 150, z: 1.9 }, a: { x: 160, y: 60, z: 1.4 } }, dur: 2.5,
        texto: 'En el centro levantaron La Aguja. Desde allí, ODÍN lo ve todo, lo oye todo y lo calcula todo.'
      },
      {
        escena: 'oficina', camara: { de: { x: 160, y: 90, z: 1 }, a: { x: 150, y: 80, z: 1.3 } }, dur: 2.5,
        texto: 'Y en el Ministerio de Registro, un archivero decide cada día quién come, quién viaja... y quién desaparece.'
      },
      {
        escena: 'apartamento', camara: { de: { x: 250, y: 60, z: 2 }, a: { x: 160, y: 90, z: 1.1 } }, dur: 3,
        titulo: 'NUEVA BERLÍN · 2040',
        texto: 'Nueve años después, el sol todavía no ha salido.'
      }
    ]
  },

  // Acto 2 · apertura del prólogo A (se ganó el Día del Sol)
  prologoA: {
    planos: [
      {
        escena: 'negro', titulo: 'FEBRERO DE 2041', dur: 2,
        texto: 'Tres meses después de la caída de La Aguja.'
      },
      {
        escena: 'tribunal', camara: { de: { x: 160, y: 80, z: 1.4 }, a: { x: 160, y: 90, z: 1.1 } }, dur: 2.5,
        texto: 'Aldric Voss fue condenado a cadena perpetua. La ciudad libre había votado no tener pena de muerte. Fue lo primero que votó.'
      },
      {
        escena: 'madridOscura', camara: { de: { x: 160, y: 50, z: 1.8 }, a: { x: 160, y: 90, z: 1.1 } }, dur: 2.5,
        texto: 'El 20 de enero, desde algún lugar del Este, alguien apagó un interruptor. La Ciudadela Helios cortó la luz de Madrid.'
      },
      {
        escena: 'madridOscura', camara: { de: { x: 60, y: 150, z: 2.4 }, a: { x: 170, y: 150, z: 2 } }, dur: 2.5,
        texto: 'Madrid es libre. Y está a oscuras. En pleno invierno.'
      },
      {
        escena: 'comite', camara: { de: { x: 240, y: 100, z: 1.6 }, a: { x: 150, y: 90, z: 1.1 } }, dur: 3,
        titulo: 'CAPÍTULO 2',
        texto: 'En el antiguo Ministerio hay dos mil expedientes por juzgar. Y un archivero que sabe leerlos.'
      }
    ]
  },

  // Acto 2 · apertura del prólogo B (se perdió el Día del Sol)
  prologoB: {
    planos: [
      {
        escena: 'negro', titulo: '9 DE NOVIEMBRE DE 2040', dur: 2,
        texto: 'El asalto a La Aguja fracasó.'
      },
      {
        escena: 'celda', camara: { de: { x: 160, y: 90, z: 1.6 }, a: { x: 160, y: 90, z: 1.2 } }, dur: 2.5,
        texto: 'Elías pasó seis semanas en una celda del nivel -4. Nadie le preguntó nada. Solo esperaban algo.'
      },
      {
        escena: 'colonia', camara: { de: { x: 60, y: 90, z: 1.5 }, a: { x: 200, y: 90, z: 1.3 } }, dur: 2.5,
        texto: 'En enero lo subieron a un tren hacia el Este. Colonia de Trabajo Este-1. A dos mil kilómetros de Madrid.'
      },
      {
        escena: 'barracon', camara: { de: { x: 160, y: 120, z: 1.8 }, a: { x: 160, y: 100, z: 1.2 } }, dur: 2.5,
        texto: 'Mil doscientos internos. Una estufa por barracón. Y una mujer a la que nadie tiene permiso para tocar.'
      },
      {
        escena: 'colonia', camara: { de: { x: 290, y: 50, z: 2.2 }, a: { x: 160, y: 90, z: 1 } }, dur: 3,
        titulo: 'CAPÍTULO 2',
        texto: 'Dicen que nadie vuelve del Este. Elías nunca se ha creído lo que dicen.'
      }
    ]
  },

  // Acto 2 · camino A · antes del Día 3: el tren hacia el Este
  tren: {
    planos: [
      {
        escena: 'trenNieve', camara: { de: { x: 230, y: 120, z: 2.2 }, a: { x: 170, y: 110, z: 1.4 } }, dur: 2.5,
        titulo: 'DÍA 3 · EL TREN',
        texto: 'Treinta horas de vía hacia el Este. Kurt dice que la locomotora tiene más años que Chispa y más paciencia que Mara.'
      },
      {
        escena: 'trenNieve', camara: { de: { x: 80, y: 80, z: 2 }, a: { x: 160, y: 90, z: 1 } }, dur: 2.5,
        texto: 'A los lados de la vía, las torres de Helios. Llevan la luz a las ciudades de la Orden. Los pueblos que cruzan siguen a oscuras.'
      },
      {
        escena: 'tren', camara: { de: { x: 160, y: 100, z: 1.8 }, a: { x: 150, y: 90, z: 1.2 } }, dur: 2.5,
        texto: 'Delante, el puesto fronterizo 12. Papeles falsos, un preso que no es preso y un archivero que sabe cómo se leen los papeles.'
      }
    ]
  },

  // Acto 2 · camino A · antes del Día 4: la llegada a la Colonia Este-1
  colonia: {
    planos: [
      {
        escena: 'trenNieve', camara: { de: { x: 260, y: 110, z: 2.2 }, a: { x: 200, y: 110, z: 1.6 } }, dur: 2,
        titulo: 'DÍA 4 · COLONIA ESTE-1',
        texto: 'Al amanecer, las vías se llenan de alambradas.'
      },
      {
        escena: 'colonia', camara: { de: { x: 294, y: 40, z: 2.6 }, a: { x: 160, y: 90, z: 1.1 } }, dur: 3,
        texto: 'Colonia de Trabajo Este-1. Mil doscientos internos. La última parada antes de Helios. El sitio de donde no vuelve nadie.'
      },
      {
        escena: 'barracon', camara: { de: { x: 160, y: 120, z: 1.8 }, a: { x: 160, y: 100, z: 1.2 } }, dur: 3,
        texto: 'Aquí se trae a los que se sellan en las mesas de todas las ciudades. Elías ha sellado a muchos. Hoy va a verles la cara.'
      }
    ]
  },

  // Acto 2 · los dos caminos · antes del Día 6: la tierra de nadie y Ostra
  tierraDeNadie: {
    planos: [
      {
        escena: 'trenNieve', camara: { de: { x: 60, y: 90, z: 2.2 }, a: { x: 200, y: 100, z: 1.2 } }, dur: 2.5,
        titulo: 'DÍA 6 · TIERRA DE NADIE',
        texto: 'Entre las colonias y Helios hay doscientos kilómetros sin cables, sin luces y sin nombre.'
      },
      {
        escena: 'trenNieve', camara: { de: { x: 220, y: 100, z: 1.4 }, a: { x: 260, y: 110, z: 2.4 } }, dur: 2.5,
        texto: 'Aquí el Colapso no terminó nunca. La Orden no vino a arreglarlo. Solo a cruzarlo.'
      },
      {
        escena: 'ostra', camara: { de: { x: 220, y: 128, z: 2.6 }, a: { x: 160, y: 90, z: 1 } }, dur: 3.5,
        texto: 'Ostra. Seis mil personas sin Índice. Sobre su puerta, en pintura blanca: «AQUÍ NO HAY NÚMEROS».'
      }
    ]
  },

  // Acto 2 · los dos caminos · antes del Día 7: la llegada a la Ciudadela Helios
  helios: {
    planos: [
      {
        escena: 'trenNieve', camara: { de: { x: 200, y: 100, z: 1.2 }, a: { x: 270, y: 100, z: 2.2 } }, dur: 2.5,
        titulo: 'DÍA 7 · LA CIUDADELA HELIOS',
        texto: 'Doscientos kilómetros sin una sola luz. Y de pronto, todas.'
      },
      {
        escena: 'helios', camara: { de: { x: 160, y: 110, z: 1 }, a: { x: 160, y: 80, z: 1.8 } }, dur: 3.5,
        texto: 'Tres anillos de muralla. Cuarenta mil trabajadores. De aquí sale la luz de medio mundo desde 2030.'
      },
      {
        escena: 'helios', camara: { de: { x: 160, y: 60, z: 2 }, a: { x: 160, y: 40, z: 3.2 } }, dur: 3.5,
        texto: 'Y en el centro, la Sala de la Llave. Donde, según Julia, alguien puede apagar una ciudad con una sola orden.'
      }
    ]
  }
};

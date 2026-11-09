// ============================================================
//  ACTO 2 · CAMINO B · NOCHE 3 — «Mara»
//  Mara se cuela en el barracón 12. Mara conoce a Julia. El plan: escapar antes del día 12.
//  Primera pista del origen: la ficha de ingreso de Julia en 2033.
// ============================================================

window.NOCHE_B3 = {
  numero: 3,
  subtitulo: 'Barracón 12',
  escenaLlegada: 'colonia',
  refugio: 'barracon',
  operativos: ['elias', 'olek', 'samira', 'tobias', 'mara'],

  llegada: {
    inicio: 'n1',
    nodos: {
      n1: { escena: 'barracon', texto: 'Tres golpes en la puerta del barracón 12. Samira abre una rendija. Entra nieve, entra frío y entra una mujer con la cara negra de carbón y una cicatriz en la ceja.', siguiente: 'n2' },
      n2: { quien: 'mara', texto: 'Treinta horas paleando carbón para la Orden. Si alguna vez me vuelves a dejar sola en un andén, archivero, te juro que...', siguiente: 'n3' },
      n3: { rama: [{ si: 'beso', ir: 'm1' }, { si: 'esperarLunes', ir: 'm4' }], siguiente: 'm6' },
      m1: { texto: 'No termina la frase. Elías tampoco. Treinta y dos presos miran hacia otro lado a la vez, con mucha educación.', efecto: { vinculo_mara: 2 }, siguiente: 'm2' },
      m2: { quien: 'olek', texto: 'Bueno. Ya sé quién es la de la cicatriz.', siguiente: 'j1' },
      m4: { quien: 'elias', texto: '¿Es lunes?', siguiente: 'm5' },
      m5: { quien: 'mara', texto: 'Es miércoles. En una colonia de trabajo. A dos mil kilómetros de casa. Te lo digo el lunes, que ya me queda poco.', efecto: { vinculo_mara: 2 }, siguiente: 'j1' },
      m6: { texto: 'Se abrazan como dos personas que no saben abrazarse: muy fuerte y muy mal. Mara huele a carbón y a tren.', efecto: { vinculo_mara: 1 }, siguiente: 'j1' },

      // --- Mara y Julia ---
      j1: { texto: 'Julia está sentada en la litera del fondo. Se levanta. Las dos mujeres se miran de arriba abajo, sin prisa, como se miran los médicos.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Tú eres la de la ceja partida. Él habla de ti dormido. Lo sé porque me quedo despierta mirándole dormir. Llevo treinta y cuatro años de retraso.', siguiente: 'j3' },
      j3: { quien: 'mara', texto: 'Y usted es la Voz de Madrid. Yo tenía su radio debajo de la cama del hospital en 2032. Nos salvó la vida a muchos, señora. Ahora vamos a devolverle el favor.', efecto: { vinculo_julia: 1 }, siguiente: 'p1' },

      // --- El plan ---
      p1: { quien: 'mara', texto: 'Escuchadme. El tren 14 sale mañana a las cinco, pero mañana no puede ser: la Inspectora ha doblado la guardia de la estación.', siguiente: 'p2' },
      p2: { rama: [{ si: 'informeJonasEntregado', ir: 'p3j' }], siguiente: 'p4' },
      p3j: { quien: 'olek', texto: 'Y además alguien ha avisado de que vamos a usar ese tren. Hay un chivato en este barracón.', efecto: { sospecha: 10 }, siguiente: 'p4' },
      p4: { quien: 'mara', texto: 'Kurt vuelve con otro tren el viernes por la noche. Ese es el bueno. Yo no me muevo de aquí hasta entonces: el tren 14 se irá mañana sin su fogonera. Dos días para prepararlo todo.', efecto: { bandera: 'maraEnColonia' }, siguiente: 'p5' },
      p5: { rama: [{ si: 'trasladoJuliaFalsificado', ir: 'p6f' }], siguiente: 'p6' },
      p6f: { quien: 'julia', texto: 'La orden de mi traslado dice «marzo». Hel no se lo cree, pero tiene que respetar su propio papel. Eso nos da tiempo. Y a ella, rabia.', siguiente: 'x1' },
      p6: { quien: 'julia', texto: 'El día doce me llevan a Helios. El viernes es el ocho. Llegamos justos. Como siempre en esta familia, por lo visto.', siguiente: 'x1' },
      x1: { quien: 'mara', texto: 'Esta noche, trabajo. Mañana, más. El viernes nos vamos todos.' }
    }
  },

  aspirantes: [],

  misiones: [
    {
      id: 'uniformesColonia',
      titulo: 'Uniformes de guardia',
      desc: 'Robar dos uniformes de guardia del secadero de la lavandería, junto a la casa de Rusk.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'samiraAyudada', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'uniformesColonia' },
      captura: 0.3,
      exito: 'Dos uniformes congelados, tiesos como tablas. Mañana, junto a la estufa, volverán a ser uniformes.',
      fracaso: 'La lavandería tiene un perro nuevo. Nadie sabía que había perros.',
      capturado: 'El perro no era nuevo. Lo tenían escondido.'
    },
    {
      id: 'llaveB4bis', si: '!llaveBarracon4',
      titulo: 'La llave del barracón 4',
      desc: 'Intentarlo otra vez: sin esa llave, Julia no sale de su barracón el viernes.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'samiraAyudada', mas: 15 }],
      coste: { suministros: 1 },
      recompensa: { bandera: 'llaveBarracon4' },
      captura: 0.3,
      exito: 'Esta vez, Mara: «En el hospital abríamos los armarios de morfina con horquillas. Una cerradura de la Cancillería no es más lista que un armario de morfina.»',
      fracaso: 'Nada. La cerradura del 4 es la única cosa nueva de toda la colonia.',
      capturado: 'Hel ha puesto un guardia dentro del barracón 4. Por si acaso.'
    },
    {
      id: 'jonas', si: 'traidorDentro_jonas',
      titulo: 'Darle de comer a Jonas',
      desc: 'Jonas Kerr es el chivato. Contarle, como quien no quiere la cosa, que la fuga será el jueves en el tren 14.',
      habilidad: 'labia', base: 50,
      coste: {},
      recompensa: { bandera: 'jonasEngañado' },
      captura: 0,
      exito: 'Jonas escucha con los ojos muy abiertos. Una hora después pide permiso para ir a la letrina. La letrina está al lado de la casa de Rusk.',
      fracaso: 'Jonas no pregunta nada. Eso es peor: ya sabe que lo sabemos.'
    },
    {
      id: 'aislamiento2', si: ['relojeroAislado', '!relojeroSacado'],
      titulo: 'Sacar al Relojero del aislamiento',
      desc: 'Tobías lleva tres días en la celda de aislamiento. Con Mara aquí, hay una persona más para cargar con él.',
      habilidad: 'sigilo', base: 35,
      bonus: [{ si: 'ritmoFoco', mas: 20 }, { si: 'uniformesColonia', mas: 10 }],
      coste: { suministros: 1 },
      recompensa: { bandera: ['relojeroEnBarracon', 'relojeroSacado'] },
      captura: 0.3,
      exito: '{op} vuelve con Tobías a hombros. Cuando ve a Mara, el viejo sonríe: «La de la Calle del Reloj. Siempre supe que vendrías.»',
      fracaso: 'La celda de aislamiento tiene luz toda la noche. Hel sabe que alguien vendrá.',
      capturado: 'Los guardias de la celda estaban esperando.'
    },
    {
      id: 'archivoColonia',
      titulo: 'La ficha de Julia',
      desc: 'Entrar de noche en el archivo de la colonia y buscar la ficha de ingreso de la interna 2033-114.',
      habilidad: 'tecnica', base: 30,
      bonus: [{ si: 'listaHelios', mas: 20 }, { si: 'memo_interna', mas: 15 }],
      coste: {},
      recompensa: { intel: 2, bandera: ['pistaLumen', 'fichaJulia2033'] },
      captura: 0.25,
      exito: 'Ficha de ingreso, 2033: «ARANDA, Julia. Exempleada del Proyecto Lumen (Voss Energía, 2006–2008). Conocimiento crítico. No dejar morir.» Voss Energía. 2008. El año de la puerta de San Ildefonso.',
      fracaso: 'La ficha de Julia no está en el archivo. Alguien se la ha llevado. Alguien con muchos sellos.',
      capturado: 'En el archivo, de noche, la cámara no gira. Ya lo sabías. Lo olvidaste.'
    }
  ],

  despedida: {
    inicio: 'f0',
    nodos: {
      f0: {
        texto: 'Las cuatro. Samira le ha hecho a Mara un hueco bajo la litera de Olek. Queda una hora antes de la campana.',
        opciones: [
          { texto: 'Con Mara, junto a la estufa apagada.', ir: 'm1' },
          { texto: 'Con Julia y Mara.', ir: 'j1' },
          { texto: 'Con Olek.', ir: 'o1' }
        ]
      },
      m1: { quien: 'mara', texto: '¿Sabes lo que pensé en el tren? Que si llegaba y no estabas, me quedaría aquí. En la colonia. Para que tu nombre no se quedara solo en una lista.', siguiente: 'm2' },
      m2: { quien: 'elias', texto: 'Eso es lo más absurdo que me han dicho nunca.', siguiente: 'm3' },
      m3: { quien: 'mara', texto: 'Ya. Lo sé. Lo peor es que lo decía en serio.', efecto: { vinculo_mara: 1 }, siguiente: 'z1' },

      j1: { texto: 'Las dos mujeres hablan en voz baja junto a la estufa. Cuando Elías se acerca, se callan a la vez. Luego se ríen a la vez. Es un sonido que no se oía en el barracón 12 desde hace años.', siguiente: 'j2' },
      j2: { quien: 'julia', texto: 'Le estaba contando que de pequeño, en los dos años que te tuve, no llorabas nunca. Solo mirabas. Ella dice que sigues igual.', siguiente: 'j3' },
      j3: { quien: 'mara', texto: 'Sigue igual. Mira. Se le nota cuando le importa algo porque mira más.', efecto: { vinculo_julia: 1, vinculo_mara: 1 }, siguiente: 'z1' },

      o1: { quien: 'olek', texto: 'Tu Mara es de las que no dejan a nadie en un andén. Como yo. Por eso el viernes nos vamos los treinta y dos, aunque haya que llevar a alguno a hombros.', siguiente: 'o2' },
      o2: { rama: [{ si: 'muerteChispa', ir: 'o3' }], siguiente: 'z1' },
      o3: { quien: 'olek', texto: 'El chico del barracón 7... el de la cuchara. Me han dicho que era de los tuyos. Lo siento. Aquí sentirlo es lo único que se puede hacer gratis.', siguiente: 'z1' },

      z1: { escena: 'colonia', texto: 'A las cinco, el tren 14 sale de la estación sin su fogonera. Nadie la echa de menos: en la Orden nadie cuenta a los fogoneros. Mara duerme bajo una litera del barracón 12.' }
    }
  }
};

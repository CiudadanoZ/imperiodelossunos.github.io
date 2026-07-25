/* ============================================================
   CAMPAÑA — EL YUNQUE, CONVOY DEL YERMO
   Mismo motor que la Valkiria: mandas desde la cabina de un
   transporte minero blindado que cruza un mundo arrasado.
   ============================================================ */

window.CAMPANAS = window.CAMPANAS || {};

(function(){

/* --------------------------- SISTEMAS --------------------------- */
/* Las claves internas son las mismas para todas las campañas
   (reactor/escudos/armas/motores/soporte/sensores). Aquí solo
   cambia lo que el jugador ve. */
const SISTEMAS = {
  reactor:  { nombre:'Generador',    icono:'⌁', max:8, base:1, precio:35,
              desc:'El grupo electrógeno. Cada nivel da una barra de corriente al resto.' },
  escudos:  { nombre:'Blindaje',     icono:'▤', max:8, base:2, precio:30,
              desc:'Cada 2 barras = 1 plancha. Absorbe un impacto y los soldadores la reponen.' },
  armas:    { nombre:'Torretas',     icono:'⌖', max:8, base:3, precio:30,
              desc:'Corriente necesaria para mantener las torretas alimentadas.' },
  motores:  { nombre:'Tren Motriz',  icono:'⚙', max:8, base:2, precio:25,
              desc:'Esquiva (+5% por barra) y potencia para el acelerón de fuga.' },
  soporte:  { nombre:'Agua y Filtros',icono:'≈', max:4, base:1, precio:25,
              desc:'Potabiliza y filtra el polvo. Sin ella la cuadrilla se seca.' },
  sensores: { nombre:'Puesto de Vigía',icono:'◎', max:3, base:1, precio:20,
              desc:'N1: chapa enemiga. N2: sus puntos débiles. N3: información que otros no ven.' }
};

const ARMAS = {
  ametralladora:{ nombre:'Ametralladora del 50', dmg:1, disparos:2, carga:9,  coste:1, perfora:0, precio:30,
                  desc:'Ráfaga corta. Come cinta, pero nunca se encasquilla.' },
  antimaterial: { nombre:'Fusil Antimaterial',   dmg:2, disparos:1, carga:9,  coste:2, perfora:0, precio:55,
                  desc:'Un tiro. Y donde entra, sale por el otro lado.' },
  escopetas:    { nombre:'Batería de Escopetas', dmg:1, disparos:3, carga:14, coste:3, perfora:0, precio:80,
                  desc:'Tres bocas a la vez: arranca planchas enteras.' },
  emp:          { nombre:'Cañón EMP',            dmg:0, disparos:1, carga:7,  coste:1, perfora:0, ion:2, precio:50,
                  desc:'No abolla nada: fríe los servos del blindaje enemigo 6 s.' },
  lanzagranadas:{ nombre:'Lanzagranadas',        dmg:3, disparos:1, carga:13, coste:2, perfora:9, municion:1, precio:60,
                  desc:'Entra por debajo de la chapa. Ignora TODO el blindaje.' },
  mortero:      { nombre:'Mortero Doble',        dmg:2, disparos:2, carga:17, coste:3, perfora:9, municion:2, precio:95,
                  desc:'Dos granadas por andanada, caen desde arriba.' },
  riel:         { nombre:'Cañón de Riel',        dmg:4, disparos:1, carga:19, coste:3, perfora:0, precio:110,
                  desc:'Devora corriente y tarda una eternidad. Merece la pena.' },
  lanzallamas:  { nombre:'Lanzallamas de Torre', dmg:2, disparos:1, carga:11, coste:2, perfora:0, sub:2, precio:70,
                  desc:'Funde ruedas y torretas antes que la chapa.' }
};

const ROLES = {
  conductor: { nombre:'Conductor',  afin:'motores'  },
  tirador:   { nombre:'Tirador',    afin:'armas'    },
  mecanico:  { nombre:'Mecánico',   afin:'reactor'  },
  soldador:  { nombre:'Soldador',   afin:'escudos'  },
  sanitario: { nombre:'Sanitario',  afin:'soporte'  },
  otero:     { nombre:'Otero',      afin:'sensores' }
};

const NOMBRES = ['Corva','Mella','Brea','Tuerca','Sarga','Cascote','Yesca','Hollín','Cierzo',
  'Zarpa','Muela','Trilla','Chispa','Costra','Grajo','Adobe','Escoria','Quilla','Pardo',
  'Salitre','Mecha','Tizón','Reja','Yunta','Alambre','Pómez','Estopa','Ámbar'];

const ENEMIGOS = [
  { id:'moto',    nombre:'Motorista Carroñero',   casco:6,  escudos:0, esquiva:5,  color:'#e8b25a',
     armas:[{nombre:'Recortada', dmg:1, disparos:1, carga:8}], min:1, max:2 },
  { id:'pickup',  nombre:'Camioneta de Saqueadores', casco:9, escudos:1, esquiva:15, color:'#ff9944',
     armas:[{nombre:'Ametralladora de caja', dmg:1, disparos:2, carga:9}], min:1, max:3 },
  { id:'milicia', nombre:'Blindado de la Milicia', casco:12, escudos:2, esquiva:10, color:'#d95f43',
     armas:[{nombre:'Cañón de 30', dmg:2, disparos:1, carga:10},
            {nombre:'Granada de tubo', dmg:2, disparos:1, carga:15, perfora:9}], min:2, max:4 },
  { id:'jauria',  nombre:'Jauría de Descarnados',  casco:10, escudos:1, esquiva:30, color:'#a8d05a',
     armas:[{nombre:'Arpones y garfios', dmg:1, disparos:3, carga:12}], min:2, max:5 },
  { id:'tanque',  nombre:'Tanque del Directorio',  casco:16, escudos:3, esquiva:12, color:'#c084fc',
     armas:[{nombre:'Torreta gemela', dmg:1, disparos:2, carga:8},
            {nombre:'Obús de asedio', dmg:3, disparos:1, carga:16}], min:3, max:5 },
  { id:'cazador', nombre:'Cazador Sin Rostro',     casco:14, escudos:2, esquiva:45, color:'#9ecfd6',
     armas:[{nombre:'Rifle de precisión', dmg:2, disparos:2, carga:11}], min:4, max:5 }
];

/* La punta de lanza de la columna que os sigue por cada región. */
const PERSEGUIDOR = {
  id:'batidores', nombre:'Batidores del Alto Mando', casco:14, escudos:2, esquiva:20, color:'#ff8866',
  armas:[{nombre:'Ametralladoras gemelas', dmg:1, disparos:2, carga:8},
         {nombre:'Granada de persecución', dmg:2, disparos:1, carga:13, perfora:9}]
};

const JEFE = {
  id:'jefe', nombre:'EL MARISCAL — Fortaleza Rodante', casco:30, escudos:4, esquiva:10, color:'#ff5533', jefe:true,
  armas:[{nombre:'Batería de torretas', dmg:1, disparos:3, carga:9},
         {nombre:'Lanzagranadas Bóreas', dmg:3, disparos:1, carga:14, perfora:9},
         {nombre:'Cañón de demolición', dmg:4, disparos:1, carga:18}]
};

const SECTORES = [
  { nombre:'Los Suburbios Calcinados',      fondo:'#3a2008', saltos:6 },
  { nombre:'El Vertedero de Sal',           fondo:'#3a3520', saltos:7 },
  { nombre:'La Autopista de los Ahorcados', fondo:'#3a1408', saltos:7 },
  { nombre:'Las Ruinas de la Capital',      fondo:'#2a1a2e', saltos:8 },
  { nombre:'El Búnker del Alto Mando',      fondo:'#2a0505', saltos:8 }
];

/* --------------------------- EVENTOS --------------------------- */
const EVENTOS = [
  { titulo:'VOZ EN LA BANDA 4',
    texto:'Entre el siseo de la radio, una mujer repite unas coordenadas y una frase: «Somos siete. Uno es un crío. Se nos acabó el agua anteayer».',
    opciones:[
      { texto:'Desviarse y recogerlos.', efecto:J=>{
          if(Math.random()<0.7){ J.reclutar(); return 'Los subís al remolque. Uno de ellos se queda a bordo: sabe soldar con las manos quemadas.'; }
          J.dañarCasco(2); return 'Eran cebo. Los que esperaban detrás del talud os revientan un flanco antes de que arranquéis. <em>-2 chasis</em>.'; } },
      { texto:'Triangular la señal antes de acercarse.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',18); return 'La grabación lleva ocho meses en bucle. Nadie vivo. Desvalijáis el campamento con calma. <em>+18 chatarra</em>.'; } },
      { texto:'Apagar la radio.', efecto:J=>{
          J.moralTodos(-6); return 'Nadie en la cabina dice nada. El crío se les queda a todos en la cabeza. <em>Moral a la baja</em>.'; } } ] },

  { titulo:'GASOLINERA ENTERRADA',
    texto:'Medio surtidor asoma de la duna. Debajo, los tanques subterráneos siguen sellados desde el día que todo ardió.',
    opciones:[
      { texto:'Bombear a mano.', efecto:J=>{
          J.recurso('combustible',2); return 'Cuatro horas de manivela y los bidones se llenan. <em>+2 diésel</em>.'; } },
      { texto:'Reventar el sello con soplete.', req:{rol:'mecanico'}, efecto:J=>{
          J.recurso('combustible',3); J.recurso('chatarra',22);
          return 'Tu mecánico corta el sello sin que salte una chispa. Vaciáis el tanque entero y arrancáis las bombas. <em>+3 diésel, +22 chatarra</em>.'; } },
      { texto:'Desguazar la estación.', efecto:J=>{
          J.recurso('chatarra',15); J.recurso('combustible',-1);
          return 'Buena chapa y cobre limpio, pero el generador de corte se bebe medio bidón. <em>+15 chatarra, -1 diésel</em>.'; } } ] },

  { titulo:'CAMPO DE MINAS',
    texto:'Alguien sembró el paso entero. Se ven los platos oxidados asomando entre la grava, y los que no se ven son el problema.',
    opciones:[
      { texto:'Cruzar a toda velocidad.', efecto:J=>{
          const ev = J.sistemas.motores.energia*5;
          if(Math.random()*100 < 45+ev){ J.recurso('chatarra',12); return 'El conductor pasa entre los platos como si los hubiera puesto él. Y de paso arrancáis un par sin detonar. <em>+12 chatarra</em>.'; }
          J.dañarCasco(3); return 'Un plato revienta bajo el eje trasero. El Yunque escora y sigue, cojeando. <em>-3 chasis</em>.'; } },
      { texto:'Rodear por el arcén hundido.', efecto:J=>{
          J.recurso('combustible',-1); return 'Doce kilómetros de rodeo por terreno blando. Ni un rasguño. <em>-1 diésel</em>.'; } },
      { texto:'Detonarlas desde lejos con las torretas.', efecto:J=>{
          J.recurso('chatarra',25); J.dañarCasco(1);
          return 'Espectáculo de fuegos artificiales y un montón de metal aprovechable. Una esquirla os abre el radiador. <em>+25 chatarra, -1 chasis</em>.'; } } ] },

  { titulo:'PEAJE DE LA MILICIA',
    texto:'Una barrera de vagones cruzada en la carretera. Un chaval con el uniforme del Alto Mando tres tallas grande golpea la puerta de la cabina.',
    opciones:[
      { texto:'Pagar el peaje (25 chatarra).', req:{chatarra:25}, efecto:J=>{
          J.recurso('chatarra',-25); return 'Ni siquiera mira el remolque. Le tiembla el pulso al coger la chatarra. <em>-25 chatarra</em>.'; } },
      { texto:'Enseñar salvoconductos falsificados.', req:{sensores:3}, efecto:J=>{
          return 'Vuestro otero lleva meses copiando sellos del Directorio. El chaval se cuadra y os abre la barrera.'; } },
      { texto:'Embestir la barrera.', efecto:J=>{
          J.combate(); return 'Las torres de vigilancia abren fuego antes de que el vagón termine de volcar. <em>¡COMBATE!</em>'; } } ] },

  { titulo:'LA GRIETA',
    texto:'La carretera termina en una zanja de treinta metros que no aparece en ningún mapa. El fondo brilla con un verde que no es de este mundo.',
    opciones:[
      { texto:'Bajar por el talud y cruzarla.', efecto:J=>{
          if(Math.random()<0.5){ J.saltosGratis++; return 'Al otro lado encontráis una vía de servicio despejada que os ahorra medio día. <em>El próximo tramo no gastará diésel</em>.'; }
          J.dañarSistemaAzar(2); return 'El fondo está caliente. Salís rápido, pero algo se ha cocido en las tripas del camión. <em>Sistemas dañados</em>.'; } },
      { texto:'Medirla desde el borde.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',20); J.subirPericia('sensores',12);
          return 'Vuestro otero cartografía la grieta entera. Ese mapa vale su peso en cualquier asentamiento. <em>+20 chatarra</em>.'; } },
      { texto:'Dar media vuelta sin discutirlo.', efecto:J=>'Nadie protesta. A veces la ruta larga es la ruta.' } ] },

  { titulo:'CARAVANA DE TRAPICHEO',
    texto:'Tres camiones pintados de colores imposibles, con la ropa tendida entre las cabinas. Hacen señales con un espejo: quieren comerciar, no pelear.',
    opciones:[
      { texto:'Trapichear.', efecto:J=>{ J.abrirTienda(); return null; } },
      { texto:'Venderles el mapa de la región anterior (+30 chatarra).', efecto:J=>{
          J.recurso('chatarra',30); return 'Pagan bien por saber dónde NO hay que meterse. <em>+30 chatarra</em>.'; } },
      { texto:'Asaltarlos.', efecto:J=>{
          J.moralTodos(-15); J.recurso('chatarra',45); J.recurso('combustible',1);
          return 'No se resisten. Nadie en la cabina te mira a los ojos durante el resto del día. <em>+45 chatarra, +1 diésel, moral por los suelos</em>.'; } } ] },

  { titulo:'TORMENTA DE CENIZA',
    texto:'El horizonte se pone del color del óxido y avanza hacia vosotros a sesenta por hora. La ceniza come pintura, pulmones y filtros.',
    opciones:[
      { texto:'Sellar el camión y aguantarla dentro.', efecto:J=>{
          if(J.sistemas.escudos.energia>=4){ J.recurso('chatarra',18); return 'Las planchas aguantan el arenado. Al escampar, la tormenta ha desenterrado un vertedero entero. <em>+18 chatarra</em>.'; }
          J.dañarCasco(4); return 'La ceniza entra por cada junta. Cuando pasa, el chasis parece lijado. <em>-4 chasis</em>.'; } },
      { texto:'Correr más que ella.', efecto:J=>{
          J.recurso('combustible',-1); return 'A fondo durante dos horas. La dejáis atrás y el motor lo paga. <em>-1 diésel</em>.'; } },
      { texto:'Meterse bajo un paso elevado.', req:{rol:'conductor'}, efecto:J=>{
          J.repararCasco(3); return 'Tu conductor recuerda ese puente de otra ruta. Pasáis la tormenta a resguardo y aprovecháis para soldar. <em>+3 chasis</em>.'; } } ] },

  { titulo:'PELEA EN EL REMOLQUE',
    texto:'Dos de los tuyos se gritan por una lata de melocotón. Uno tiene una llave inglesa en la mano y ya no la usa para aflojar tuercas.',
    opciones:[
      { texto:'Poner orden a voces.', efecto:J=>{
          J.moralTodos(-5); return 'Se callan. El silencio de después dura tres días. <em>-5 moral</em>.'; } },
      { texto:'Abrir la reserva y repartir.', efecto:J=>{
          J.recurso('chatarra',-15); J.moralTodos(18);
          return 'Comida de verdad para todos. Alguien saca una armónica esa noche. <em>-15 chatarra, +18 moral</em>.'; } },
      { texto:'Que lo arreglen ellos.', efecto:J=>{
          J.herirAzar(25); return 'Lo arreglan. Uno se pasa la semana con la cara vendada. <em>Alguien herido</em>.'; } } ] },

  { titulo:'CONVOY CALCINADO',
    texto:'Una columna militar entera, quemada en formación, con las puertas abiertas hacia fuera. Salieron corriendo. No llegaron lejos.',
    opciones:[
      { texto:'Registrarlo todo.', efecto:J=>{
          const r=Math.random();
          if(r<0.4){ J.darArmaAzar(); return 'En un blindado con la torreta intacta encontráis un arma que aún gira. <em>¡Nuevo armamento!</em>'; }
          if(r<0.8){ J.recurso('misiles',3); J.recurso('chatarra',20); return 'El furgón de munición no llegó a arder. <em>+3 granadas, +20 chatarra</em>.'; }
          J.herirAzar(40); return 'Uno abre un portón mal y se lleva por delante lo que quedaba de la carga. <em>Herido grave</em>.'; } },
      { texto:'Buscar la radio de mando.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',26); J.saltosGratis++;
          return 'La radio de mando conserva las rutas seguras del Directorio. <em>+26 chatarra, un tramo gratis</em>.'; } },
      { texto:'Dejarlos en paz.', efecto:J=>{
          J.moralTodos(10); return 'Pasáis de largo despacio. La cuadrilla lo agradece sin decirlo. <em>+10 moral</em>.'; } } ] },

  { titulo:'EMBOSCADA EN EL DESFILADERO',
    texto:'Tres columnas de polvo aparecen sobre las crestas. Una baja hacia la carretera. Las otras dos se quedan arriba, mirando.',
    opciones:[
      { texto:'Todos a sus puestos.', efecto:J=>{ J.combate(); return '<em>¡COMBATE!</em>'; } },
      { texto:'Pisar a fondo y salir de ahí.', efecto:J=>{
          if(J.sistemas.motores.energia>=3){ J.recurso('combustible',-1); return 'El tren motriz responde. Los perdéis en la primera curva. <em>-1 diésel</em>.'; }
          J.dañarCasco(3); J.combate(); return 'Demasiado pesados, demasiado lentos. Os alcanzan en la recta. <em>-3 chasis, ¡COMBATE!</em>'; } } ] },

  { titulo:'ASENTAMIENTO DEL POZO',
    texto:'Cuarenta personas viviendo alrededor de un pozo que todavía da agua. Huele a cabra, a humo y a algo parecido a la normalidad.',
    opciones:[
      { texto:'Dar permiso para bajar del camión.', efecto:J=>{
          J.moralTodos(20); J.curarTodos(35);
          return 'Una noche entera durmiendo en el suelo, sin turnos de guardia. Vuelven distintos. <em>+moral, +salud</em>.'; } },
      { texto:'Comerciar con los excedentes.', efecto:J=>{ J.abrirTienda(); return null; } },
      { texto:'Buscar quien quiera subirse (20 chatarra).', req:{chatarra:20}, efecto:J=>{
          J.recurso('chatarra',-20); J.reclutar();
          return 'Siempre hay alguien harto de mirar el mismo horizonte. <em>-20 chatarra, +1 en la cuadrilla</em>.'; } } ] },

  { titulo:'HOSPITAL DE CAMPAÑA',
    texto:'Tiendas blancas con la cruz del Alto Mando, ordenadas en filas perfectas. Nadie fuera. Los generadores siguen ronroneando.',
    opciones:[
      { texto:'Entrar a por suministros.', efecto:J=>{
          if(Math.random()<0.55){ J.recurso('chatarra',35); J.curarTodos(30); return 'Quirófanos enteros sin tocar, morfina, suero. <em>+35 chatarra, cuadrilla curada</em>.'; }
          J.herirTodos(28); return 'En la tienda del fondo hay gente. Todavía se mueve. Salís sin mirar atrás. <em>Cuadrilla herida</em>.'; } },
      { texto:'Leer los partes desde fuera.', req:{sensores:3}, efecto:J=>{
          J.recurso('chatarra',30); J.curarTodos(20);
          return 'Los partes dicen qué pabellones sellaron y por qué. Entráis solo en los limpios. <em>+30 chatarra, +salud</em>.'; } },
      { texto:'Respetar la cruz y seguir.', efecto:J=>'Marcáis el sitio en el mapa con una equis y aceleráis.' } ] },

  { titulo:'EL PREDICADOR DE LA CENIZA',
    texto:'Un hombre sobre el techo de un autobús vuelto del revés predica a nadie. Dice que el Alto Mando fue el castigo, no el pecado. Pide diezmo.',
    opciones:[
      { texto:'Dar 30 de chatarra.', req:{chatarra:30}, efecto:J=>{
          J.recurso('chatarra',-30);
          if(Math.random()<0.6){ J.repararCasco(6); J.moralTodos(12); return 'Sus fieles "bendicen" el chasis con soldadura de verdad durante toda la noche. <em>+6 chasis, +moral</em>.'; }
          return 'La bendición es un cántico de nueve minutos y una mano en la frente. Nada más. <em>-30 chatarra</em>.'; } },
      { texto:'Seguir de largo.', efecto:J=>'El sermón se pierde en el retrovisor junto con el autobús.' },
      { texto:'Discutirle la doctrina.', req:{sensores:2}, efecto:J=>{
          J.moralTodos(14); J.recurso('chatarra',10);
          return 'Le sacas los mapas de radiación y le desmontas media escatología. Impresionado, te regala repuestos. <em>+10 chatarra, +moral</em>.'; } } ] },

  { titulo:'REVIENTA EL RADIADOR',
    texto:'Un manguito del circuito de refrigeración estalla. El generador empieza a subir de temperatura y la aguja no piensa parar.',
    opciones:[
      { texto:'Que lo tapone el mecánico en caliente.', req:{rol:'mecanico'}, efecto:J=>{
          J.subirPericia('reactor',15); return 'Mete el brazo entre dos tubos a ochenta grados y aprieta con un trapo mojado. Aguanta. <em>Sin daños</em>.'; } },
      { texto:'Abrir el compartimento y purgar el vapor.', efecto:J=>{
          J.herirAzar(30); return 'La fuga se corta. Al que estaba dentro le da de lleno el chorro. <em>Alguien herido</em>.'; } },
      { texto:'Parar el generador y arrancarlo en frío.', efecto:J=>{
          J.dañarSistema('reactor',1); return 'Vuelve a arrancar, pero ya nunca suena igual. <em>Generador dañado</em>.'; } } ] }
];

const MANUAL = [
  ['Objetivo','Llevar el Yunque a través de 5 regiones y destruir la fortaleza rodante del MARISCAL.'],
  ['Corriente','El Generador da barras. Repártelas con los botones + / −. Si no queda ninguna libre, quítasela a otro sistema.'],
  ['Blindaje','2 barras = 1 plancha. Cada plancha come un impacto y los soldadores la reponen sola. Las granadas pasan por debajo.'],
  ['Torretas','Cada arma gasta corriente para estar cargada (clic en el arma para conectarla o desconectarla). Cuando pone LISTA, clic para disparar.'],
  ['Dónde apuntas','Abajo a la derecha del parabrisas eliges el blanco: chasis, torretas o ruedas del enemigo.'],
  ['Cuadrilla','Clic en alguien y luego en un sistema para mandarlo a ese puesto. Suma bonus, suelda averías y coge oficio con el tiempo.'],
  ['Diésel','Cada tramo gasta 1. Sin diésel te quedas tirado en mitad del yermo.'],
  ['Chatarra','La moneda. Sirve para el TALLER y para comprar en los asentamientos.'],
  ['Huir','Con el tren motriz alimentado puedes cargar el acelerón en pleno tiroteo y largarte.'],
  ['La columna','Os sigue. Cada tramo dentro de la región la acerca un paso; cambiar de región la deja atrás. Si os da alcance, cada tramo es un tiroteo con sus batidores. La lectura COLUMNA de arriba dice cuánto margen queda.'],
  ['Salir antes','La salida de la región está disponible desde el segundo tramo. Quedarse a rapiñar es una apuesta, no un trámite.'],
  ['Partida guardada','Se guarda sola. Puedes cerrar y seguir desde el menú. Al morir se borra: no hay vuelta atrás.'],
  ['Atajos','1-4 dispara las torretas · ESPACIO alto en seco · M mapa · U taller']
];

/* --------------------------- LÉXICO --------------------------- */
const LEX = {
  marca:'▰ E L   Y U N Q U E', marcaSub:'TRANSPORTE MINERO K-9 · MATRÍCULA 04-77',
  nave:'el Yunque', naveNom:'Yunque',
  casco:'CHASIS', cascoNom:'chasis',
  vital:'AGUA', vitalNom:'agua',
  combustible:'DIÉSEL', combustibleNom:'diésel',
  municion:'GRANADAS', municionNom:'granadas',
  moneda:'CHATARRA', monedaNom:'chatarra',
  region:'REGIÓN', regionNom:'región', etapaNom:'tramo',
  perseguidor:'COLUMNA',
  tripulacion:'CUADRILLA', tripulanteNom:'compañero',
  registro:'DIARIO DE RUTA',
  panelEnergia:'GENERADOR · DISTRIBUCIÓN', panelArmas:'ARMAMENTO', panelOrdenes:'CABINA · ÓRDENES',
  objCasco:'CHASIS', objArmas:'TORRETAS', objMotores:'RUEDAS',
  defensa:'BLINDAJE', defensaNom:'blindaje', ion:'EMP', motor:'ACELERÓN',
  ordenes:{
    saltar:['⟴ PONERSE EN MARCHA','Elegir camino · 1 diésel'],
    huir:['⚑ PISAR A FONDO','Requiere el acelerón cargado'],
    mejoras:['⚙ TALLER','Invertir chatarra'],
    puestos:['⚔ ¡TODOS A SUS PUESTOS!','Cada uno a lo suyo'],
    escudos:['▤ TODO AL BLINDAJE','Toda la corriente a las planchas'],
    reparar:['✚ SOLDAR AVERÍAS','Mandar gente a lo que está roto'],
    pausa:['⏸ ALTO EN SECO','Barra espaciadora'], reanudar:'▶ SEGUIR'
  },
  tituloMapa:'ELEGIR CAMINO', tituloMejoras:'TALLER DEL YUNQUE',
  tituloTienda:'ASENTAMIENTO', tituloManual:'MANUAL DEL CONDUCTOR',
  salirTienda:'Volver a la carretera',
  estados:{ pausa:'— ALTO EN SECO —', combate:'CONTACTO · TODOS ABAJO',
            listo:'AL RALENTÍ · LISTOS PARA SALIR', normal:'EN MARCHA' },
  avisos:{ sinMunicion:'SIN GRANADAS', sinCombustible:'SIN DIÉSEL',
           faltaEnergia:'FALTA CORRIENTE EN TORRETAS', sinObjetivo:'SIN BLANCO',
           sinAverias:'NADA QUE SOLDAR', sinLectura:'EL VIGÍA NO LLEGA',
           subSinLectura:'puntos débiles: sin lectura', sinResolver:'ESTO NO ESTÁ RESUELTO',
           sinPenetrar:'NO PASAN LA CHAPA', acosoEncima:'¡ENCIMA!' },
  tienda:{
    repara:['Soldar el chasis (+5)','Los del taller trabajan rápido y cobran caro.'],
    reparaFull:['Chapa y pintura completa','Deja el chasis como salido de fábrica.'],
    combustible:['Bidones ×2','Dos tramos más de autonomía.'],
    municion:['Granadas ×3','De las que pasan por debajo del blindaje.'],
    recluta:['Subir a alguien al camión','Hay quien pagaría por salir de aquí.'],
    seccionSuministros:'SUMINISTROS', seccionArmas:'ARMAMENTO', seccionGente:'GENTE'
  },
  nodos:{
    combate:['⚔','POLVAREDA EN EL HORIZONTE','Vienen a por algo'],
    evento: ['✳','HUMO SIN IDENTIFICAR','Alguien ha estado ahí'],
    tienda: ['⌂','ASENTAMIENTO','Se puede parar y trapichear'],
    vacio:  ['·','LLANURA MUERTA','Nada en kilómetros'],
    peligro:['☢','ZONA CALIENTE','La aguja del contador sube'],
    salida: ['⟴','SALIDA DE LA REGIÓN', n=>n?('Rumbo a '+n):'Las puertas del Búnker'],
    oculto: ['?','SIN RECONOCER','Sube el puesto de vigía para leerlo']
  }
};

/* --------------------------- TEXTOS --------------------------- */
const TXT = {
  intro:{
    titulo:'EL YUNQUE — CABINA DE MANDO',
    cuerpo:`El mundo no se acabó solo. Lo acabaron los que lo gobernaban: el <em>Alto Mando</em> quemó lo que no podía controlar y se encerró en su búnker a administrar las cenizas.

Conduces <em>el Yunque</em>, un transporte minero al que le han soldado encima todo lo que se podía soldar. En el remolque va la Simiente: el último banco de semillas sin contaminar que queda sobre la tierra.

Cinco regiones te separan del valle donde todavía llueve. El Alto Mando lo sabe, y ha mandado a su fortaleza rodante, <em>EL MARISCAL</em>, a impedirlo. Un mundo que puede darse de comer solo no los necesita.

Desde esta cabina repartes la corriente del generador, mandas a tu cuadrilla, disparas y eliges el camino. No hay nadie más.`,
    aceptar:'▶  Arrancar el motor', manual:'?  Leer el manual del conductor'
  },
  logInicio:['El Yunque arranca. La cuadrilla ocupa sus puestos, jefe.',
             'Destino: el valle, al otro lado del Búnker. Cinco regiones.'],
  logContacto: n=>`CONTACTO: ${n}.`,
  logBotin: (n,t)=>`${n} fuera de combate. Rapiña: ${t}.`,
  logHuida:'Acelerón a fondo. Los perdéis en el polvo.',
  logRegion: (n,nom)=>`Entrando en la región ${n}: ${nom}.`,
  logTienda:'Paráis en un asentamiento.',
  logVacio:'Llanura muerta. La cuadrilla aprovecha para dormir de verdad.',
  logVacioExtra:'Sacáis un par de bidones de un tractor abandonado.',
  logPeligroMal:'La zona os pasa factura.',
  logPeligroBien:'Sacáis metal aprovechable de entre los escombros.',
  logJefe:'Las puertas del Búnker se abren. EL MARISCAL sale a la carretera.',
  logPuestos:'¡Todos a sus puestos!',
  logDefensa:'Toda la corriente a las planchas.',
  logReparar:'Sopletes encendidos.',
  logAveria: n=>`Avería en ${n}.`,
  logRepara: (q,n)=>`${q} suelda ${n}.`,
  logHerido: q=>`${q} está herido.`,
  logMuerto: q=>`${q} no ha aguantado.`,
  logAlta: (q,r)=>`${q} (${r}) se sube al camión.`,
  logArma: n=>`Nueva torreta: ${n}.`,
  logCompra: n=>`Comprado: ${n}.`,
  logMejora: (n,l)=>`${n} mejorado a nivel ${l}.`,
  sinLitera:'No cabe nadie más en el remolque.',
  arsenalLleno:'No quedan afustes libres: lo vendéis por chatarra.',
  mapaCabecera: (r,s,t)=>`Región ${r} · tramo ${s} de ${t}`,
  logReanudar:'Volvéis a la carretera donde la dejasteis.',
  logEscape:'Habéis sacado ventaja a la columna. Por ahora.',
  logInterceptado:'Los batidores del Alto Mando os cortan el paso.',
  logAcoso: m=> m<=0 ? 'La columna os respira en el cuello: al próximo tramo os pillan.'
                     : 'La columna está a un tramo. Mejor salir de la región.',
  mapaAcoso: m=> m<0 ? 'La columna ya os ha dado alcance: cada tramo será un tiroteo.'
               : m===0 ? 'La columna os alcanza en el próximo tramo.'
               : `La columna llega en ${m} tramo${m===1?'':'s'}.`,
  consejoEscudo:'Tus disparos rebotan en el blindaje: prueba con el lanzagranadas, con el cañón EMP o con un arma de más bocas por andanada.',
  finVictoria:{ titulo:'EL VALLE',
    texto:'EL MARISCAL vuelca sobre su propio costado y arde durante horas en mitad de la carretera.\n\nDos días después el Yunque baja al valle con los frenos humeando. Llueve. Nadie de la cuadrilla se acuerda de cuándo fue la última vez que vio llover.\n\nAbrís el remolque y empezáis a sembrar.' },
  finCasco:{ titulo:'EL YUNQUE SE QUEDA',
    texto:'El chasis cede por la mitad y el remolque vuelca en la cuneta.\n\nLa Simiente se desparrama sobre la sal, donde no crecerá nada. El motor sigue girando un rato más, por costumbre, hasta que también se para.' },
  finGente:{ titulo:'EL YUNQUE SE QUEDA',
    texto:'No queda nadie que pueda conducir. El Yunque rueda solo por la recta hasta que se le acaba el diésel, y se queda ahí, intacto y en silencio, esperando a alguien que no va a venir.' },
  finPie: (r,s,m)=>`Regiones cruzadas: ${r}  ·  Tramos: ${s}  ·  Chatarra final: ${m}`,
  reiniciar:'Otra ruta',
  deriva:{
    titulo:'SIN UNA GOTA',
    texto:'Los bidones están secos y el Yunque se ha parado en mitad de la nada.\n\nSolo hay dos maneras de salir de esta, y ninguna es buena.',
    baliza:'Encender la radio y pedir auxilio', balizaReq:'GRATIS · TAMBIÉN LA OYEN OTROS',
    balizaBien:'Una caravana responde y os cede combustible.',
    balizaMal:'Responde alguien. No viene a ayudar.',
    refinar:'Desguazar media carga y destilar lo que sea', refinarReq:'CUESTA 30 DE CHATARRA',
    refinarLog:'Fundís medio remolque para sacar unos litros. Duele.'
  }
};

/* --------------------------- PINTOR --------------------------- */
/* Lo que se ve por el parabrisas: la carretera viniendo hacia ti,
   ruinas pasando a los lados y el hostil delante, sobre el asfalto. */
const PINTOR = (function(){
  let rayas = [], bordes = [], polvo = [];
  const HOR = 0.52;                      // altura del horizonte (fracción de H)

  /* Proyección: prof 1 = horizonte, prof pequeña = encima del morro. */
  function proy(W,H,prof,lat){
    const hy = H*HOR;
    const k  = 0.055/prof;               // 0.055 al fondo → grande al acercarse
    return { x: W/2 + lat*W*0.62*k, y: hy + (H-hy)*k, k };
  }

  function iniciar(W,H){
    rayas = []; bordes = []; polvo = [];
    for(let i=0;i<22;i++) rayas.push({ prof: 0.06 + i*0.045 });
    for(let i=0;i<26;i++) bordes.push({ prof: 0.06+Math.random()*1.1,
                                        lat: (Math.random()<0.5?-1:1)*(1.25+Math.random()*0.9),
                                        alto: 0.5+Math.random()*2.4,
                                        tipo: Math.random() });
    for(let i=0;i<70;i++) polvo.push({ x:Math.random(), y:Math.random(), v:0.2+Math.random() });
  }

  function fondo(ctx,W,H,dt,turbo,J){
    const hy = H*HOR;
    const tinte = SECTORES[J.sector].fondo;

    // cielo: del pardo oscuro arriba al polvo iluminado en el horizonte
    const cielo = ctx.createLinearGradient(0,0,0,hy);
    cielo.addColorStop(0,'#0b0603'); cielo.addColorStop(0.55,tinte); cielo.addColorStop(1,'#d9a05a');
    ctx.fillStyle = cielo; ctx.fillRect(0,0,W,hy);

    // sol enterrado en la calima
    const sol = ctx.createRadialGradient(W*0.68,hy*0.82,2, W*0.68,hy*0.82, H*0.34);
    sol.addColorStop(0,'rgba(255,225,170,.55)'); sol.addColorStop(1,'transparent');
    ctx.fillStyle = sol; ctx.fillRect(0,0,W,hy);

    // suelo
    const suelo = ctx.createLinearGradient(0,hy,0,H);
    suelo.addColorStop(0,'#6b4a24'); suelo.addColorStop(0.25,'#3a2713'); suelo.addColorStop(1,'#150d06');
    ctx.fillStyle = suelo; ctx.fillRect(0,hy,W,H-hy);

    const vel = (J.pausa ? 0.03 : 0.30) + turbo*1.4;

    // asfalto
    ctx.beginPath();
    const bi = proy(W,H,0.05,-1.05), bd = proy(W,H,0.05,1.05);
    ctx.moveTo(W/2,hy); ctx.lineTo(bd.x,H); ctx.lineTo(bi.x,H); ctx.closePath();
    ctx.fillStyle = '#1c1611'; ctx.fill();

    // arcenes
    ctx.strokeStyle = 'rgba(230,190,130,.35)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(W/2,hy); ctx.lineTo(bi.x,H);
    ctx.moveTo(W/2,hy); ctx.lineTo(bd.x,H); ctx.stroke();

    // línea discontinua central
    ctx.fillStyle = 'rgba(245,215,150,.75)';
    for(const r of rayas){
      r.prof -= vel*dt*0.34;
      if(r.prof <= 0.05) r.prof += 1.04;
      const a = proy(W,H,r.prof,0), b = proy(W,H,Math.max(0.045,r.prof-0.022),0);
      const an = Math.max(1, 3*a.k*6);
      ctx.beginPath(); ctx.moveTo(a.x-an/2,a.y); ctx.lineTo(a.x+an/2,a.y);
      ctx.lineTo(b.x+an*0.9,b.y); ctx.lineTo(b.x-an*0.9,b.y); ctx.closePath(); ctx.fill();
    }

    // postes, carcasas y ruinas pasando a los lados
    bordes.sort((p,q)=>q.prof-p.prof);
    for(const o of bordes){
      o.prof -= vel*dt*0.34;
      if(o.prof <= 0.05){ o.prof += 1.10; o.lat = (Math.random()<0.5?-1:1)*(1.25+Math.random()*0.9);
                          o.alto = 0.5+Math.random()*2.4; o.tipo = Math.random(); }
      const p = proy(W,H,o.prof,o.lat);
      if(p.y>H+40) continue;
      const h = (H-H*HOR)*p.k*o.alto*0.55, an = h*(o.tipo<0.45?0.14:0.62);
      ctx.fillStyle = 'rgba(24,16,10,.92)';
      if(o.tipo<0.45){                                   // poste de tendido
        ctx.fillRect(p.x-an/2, p.y-h, an, h);
        ctx.fillRect(p.x-an*2.6, p.y-h, an*5.2, Math.max(1,an*0.9));
      }else if(o.tipo<0.8){                              // muro / nave en ruinas
        ctx.fillRect(p.x-an/2, p.y-h*0.7, an, h*0.7);
      }else{                                             // chasis calcinado
        ctx.fillRect(p.x-an/2, p.y-h*0.32, an, h*0.32);
        ctx.fillRect(p.x-an*0.32, p.y-h*0.5, an*0.6, h*0.2);
      }
    }

    // polvo en suspensión sobre el parabrisas
    ctx.fillStyle = 'rgba(255,220,170,.32)';
    for(const g of polvo){
      g.y += dt*(0.05+vel*0.20)*g.v; g.x -= dt*0.02*g.v;
      if(g.y>1){ g.y=0; g.x=Math.random(); }
      if(g.x<0) g.x=1;
      ctx.fillRect(g.x*W, g.y*H, 1.6, turbo>0.05 ? 8+turbo*22 : 1.6);
    }
  }

  function posEnemigo(W,H,t,E){
    const hy = H*HOR;
    return { x: W*0.5 + Math.sin(t*0.35)*W*0.09,
             y: hy + (H-hy)*0.30 + Math.sin(t*0.9)*H*0.006,
             s: Math.min(W,H)*0.0026 * (E && E.jefe ? 1.8 : 1) };
  }

  function enemigo(ctx,p,E,t){
    const s = p.s*60, color = E.color;
    const bote = Math.sin(t*7.5)*s*0.035;
    ctx.save();
    ctx.translate(p.x, p.y+bote);

    // polvareda que levanta
    const g = ctx.createRadialGradient(0,s*0.5,s*0.2, 0,s*0.5,s*3.2);
    g.addColorStop(0,'rgba(190,150,100,.34)'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,s*0.5,s*3.2,0,7); ctx.fill();

    const an = s*(E.jefe?1.75:1.15), al = s*(E.jefe?1.05:0.78);

    // ruedas
    ctx.fillStyle='#0d0906';
    const rr = al*0.42;
    ctx.beginPath(); ctx.arc(-an*0.78, al*0.52, rr, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc( an*0.78, al*0.52, rr, 0, 7); ctx.fill();
    if(E.jefe){
      ctx.beginPath(); ctx.arc(-an*0.34, al*0.55, rr*0.9, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc( an*0.34, al*0.55, rr*0.9, 0, 7); ctx.fill();
    }

    // caja / chasis
    ctx.strokeStyle=color; ctx.lineWidth=1.5;
    ctx.fillStyle='#120c07'; ctx.shadowColor=color; ctx.shadowBlur=11;
    ctx.beginPath();
    ctx.moveTo(-an, al*0.45); ctx.lineTo(-an*0.92,-al*0.35); ctx.lineTo(-an*0.5,-al*0.72);
    ctx.lineTo( an*0.5,-al*0.72); ctx.lineTo( an*0.92,-al*0.35); ctx.lineTo( an, al*0.45);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // parabrisas iluminado y faros
    ctx.shadowBlur=0;
    ctx.fillStyle='rgba(255,220,150,.22)';
    ctx.fillRect(-an*0.42,-al*0.62, an*0.84, al*0.36);
    const pul = 0.65+0.35*Math.sin(t*5);
    ctx.fillStyle=`rgba(255,235,185,${0.55*pul})`;
    ctx.shadowColor='#ffe9b0'; ctx.shadowBlur=18*pul;
    ctx.fillRect(-an*0.86, al*0.06, an*0.24, al*0.14);
    ctx.fillRect( an*0.62, al*0.06, an*0.24, al*0.14);
    ctx.shadowBlur=0;

    // torreta superior
    ctx.strokeStyle=color; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(0,-al*0.72); ctx.lineTo(0,-al*1.05);
    ctx.moveTo(-an*0.2,-al*1.05); ctx.lineTo(an*0.2,-al*1.05); ctx.stroke();

    // planchas de blindaje activas
    if(E.escudo>0){
      ctx.strokeStyle='rgba(143,214,200,'+(0.30+0.14*E.escudo)+')';
      ctx.shadowColor='#8fd6c8'; ctx.shadowBlur=9; ctx.lineWidth=2.4;
      for(let i=0;i<E.escudo;i++){
        const m = an*(1.12+i*0.11), n = al*(1.22+i*0.13);
        ctx.beginPath();
        ctx.moveTo(-m, n*0.45); ctx.lineTo(-m,-n*0.35); ctx.lineTo(-m*0.45,-n*0.78);
        ctx.moveTo( m, n*0.45); ctx.lineTo( m,-n*0.35); ctx.lineTo( m*0.45,-n*0.78);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* Nuestras torretas están sobre la cabina, a los lados del parabrisas. */
  function origenPropio(W,H,lado){ return { x: W*(0.5+lado*0.42), y: H*1.04 }; }
  function destinoPropio(W,H,desv){ return { x: W*(0.5+desv*1.2), y: H*1.12 }; }

  /* Nuestras planchas: barras remachadas en el marco del parabrisas. */
  function defensa(ctx,W,H,capas,flash){
    if(capas<=0 && flash<=0) return;
    ctx.save();
    for(let i=0;i<capas;i++){
      const m = 5+i*7, gr = 5;
      ctx.fillStyle = 'rgba(143,214,200,'+(0.26-i*0.045+flash*0.5)+')';
      ctx.shadowColor='#8fd6c8'; ctx.shadowBlur=8;
      ctx.fillRect(m, m, W-m*2, gr);                 // arriba
      ctx.fillRect(m, H-m-gr, W-m*2, gr);            // abajo
      ctx.fillRect(m, m, gr, H-m*2);                 // izquierda
      ctx.fillRect(W-m-gr, m, gr, H-m*2);            // derecha
      // remaches
      ctx.shadowBlur=0; ctx.fillStyle='rgba(20,14,8,.55)';
      for(let x=m+10; x<W-m-6; x+=26){ ctx.fillRect(x, m+1, 2, gr-2); ctx.fillRect(x, H-m-gr+1, 2, gr-2); }
    }
    ctx.restore();
  }

  return { iniciar, fondo, posEnemigo, enemigo, origenPropio, destinoPropio, defensa };
})();

/* --------------------------- REGISTRO --------------------------- */
CAMPANAS.yermo = {
  id:'yermo',
  titulo:'EL YUNQUE',
  subtitulo:'Convoy del Yermo',
  genero:'Gestión de convoy · postapocalíptico',
  gancho:'El Alto Mando quemó el mundo y se encerró a administrar las cenizas. Conduces el último camión que lleva semillas, y ellos han mandado a su fortaleza rodante a por ti.',
  emblema:'▰',
  tema:{
    fosforo:'#ffb454', 'fosforo-mate':'#a36a22', 'fosforo-osc':'#2b1a08', tinta:'#1a0e02',
    acento:'#ffe08a', peligro:'#ff5a3c', frio:'#8fd6c8',
    borde:'#5c3d1d', panel:'#150d05', fondo:'#080502'
  },
  inicio:{ casco:30, combustible:8, moneda:40, municion:4,
           reactor:5, armas:3,
           arsenal:['ametralladora','lanzagranadas'],
           tripulacion:[['conductor','Corva'],['tirador'],['mecanico']],
           reparto:{escudos:2, armas:3, motores:2, soporte:1, sensores:1} },
  SISTEMAS, ARMAS, ROLES, NOMBRES, ENEMIGOS, PERSEGUIDOR, JEFE, SECTORES, EVENTOS, MANUAL, LEX, TXT, PINTOR
};

})();

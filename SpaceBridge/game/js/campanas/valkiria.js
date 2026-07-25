/* ============================================================
   CAMPAÑA — VALKIRIA, CLASE KESTREL
   Todo lo que hace que este juego sea "el espacial": contenido,
   vocabulario, paleta y cómo se pinta el ventanal.
   ============================================================ */

window.CAMPANAS = window.CAMPANAS || {};

(function(){

/* --------------------------- SISTEMAS --------------------------- */
const SISTEMAS = {
  reactor:  { nombre:'Reactor',       icono:'⚛', max:8, base:1, precio:35,
              desc:'Cada nivel produce una barra de energía para el resto de sistemas.' },
  escudos:  { nombre:'Escudos',       icono:'⌾', max:8, base:2, precio:30,
              desc:'Cada 2 barras = 1 capa de escudo. Absorbe un impacto y se regenera.' },
  armas:    { nombre:'Armamento',     icono:'⌖', max:8, base:3, precio:30,
              desc:'Energía necesaria para mantener las armas activas.' },
  motores:  { nombre:'Motores',       icono:'⧗', max:8, base:2, precio:25,
              desc:'Evasión (+5% por barra) y velocidad de carga del salto SLR.' },
  soporte:  { nombre:'Soporte Vital', icono:'✚', max:4, base:1, precio:25,
              desc:'Regenera oxígeno. Sin él, la tripulación se asfixia.' },
  sensores: { nombre:'Sensores',      icono:'◎', max:3, base:1, precio:20,
              desc:'N1: casco enemigo. N2: subsistemas. N3: opciones de diálogo ocultas.' }
};

const ARMAS = {
  laser_ligero: { nombre:'Láser Ligero',    dmg:1, disparos:2, carga:9,  coste:1, perfora:0, precio:30,
                  desc:'Ráfaga de 2. Barato y fiable.' },
  laser_pesado: { nombre:'Láser Pesado',    dmg:2, disparos:1, carga:9,  coste:2, perfora:0, precio:55,
                  desc:'Un impacto contundente.' },
  laser_racimo: { nombre:'Láser Racimo',    dmg:1, disparos:3, carga:14, coste:3, perfora:0, precio:80,
                  desc:'Tres disparos: derriba escudos enteros.' },
  canon_iones:  { nombre:'Cañón de Iones',  dmg:0, disparos:1, carga:7,  coste:1, perfora:0, ion:2, precio:50,
                  desc:'No daña el casco: colapsa los escudos enemigos 6 s.' },
  misil_perf:   { nombre:'Misil Perforante',dmg:3, disparos:1, carga:13, coste:2, perfora:9, municion:1, precio:60,
                  desc:'Atraviesa TODOS los escudos. Gasta 1 misil.' },
  misil_enjambre:{nombre:'Enjambre Hidra',  dmg:2, disparos:2, carga:17, coste:3, perfora:9, municion:2, precio:95,
                  desc:'Dos misiles perforantes por salva.' },
  canon_plasma: { nombre:'Cañón de Plasma', dmg:4, disparos:1, carga:19, coste:3, perfora:0, precio:110,
                  desc:'Daño brutal, recarga lentísima.' },
  rayo_minero:  { nombre:'Rayo Minero',     dmg:2, disparos:1, carga:11, coste:2, perfora:0, sub:2, precio:70,
                  desc:'Daño extra a los subsistemas enemigos.' }
};

const ROLES = {
  piloto:    { nombre:'Piloto',      afin:'motores'  },
  artillero: { nombre:'Artillero',   afin:'armas'    },
  ingeniero: { nombre:'Ingeniero',   afin:'reactor'  },
  tecnico:   { nombre:'Técnico',     afin:'escudos'  },
  medico:    { nombre:'Médico',      afin:'soporte'  },
  vigia:     { nombre:'Vigía',       afin:'sensores' }
};

const NOMBRES = ['Rennick','Vasil','Okoye','Marchetti','Sōma','Ivanova','Dahl','Quintero','Bram',
  'Nakamura','Osei','Lindqvist','Ferrer','Adeyemi','Kovač','Rostova','Ndiaye','Salgado','Yildiz',
  'Barros','Petrov','Amrani','Holt','Guerrero','Tanaka','Faraj','Bergström','Cardoso'];

const ENEMIGOS = [
  { id:'dron',     nombre:'Dron Chatarrero',    casco:6,  escudos:0, esquiva:5,  color:'#88ffaa',
     armas:[{nombre:'Perforador', dmg:1, disparos:1, carga:8}], min:1, max:2 },
  { id:'caza',     nombre:'Caza Pirata',        casco:9,  escudos:1, esquiva:15, color:'#ffaa66',
     armas:[{nombre:'Láser doble', dmg:1, disparos:2, carga:9}], min:1, max:3 },
  { id:'fragata',  nombre:'Fragata Mercenaria', casco:12, escudos:2, esquiva:10, color:'#ff9977',
     armas:[{nombre:'Láser pesado', dmg:2, disparos:1, carga:10},
            {nombre:'Misil táctico', dmg:2, disparos:1, carga:15, perfora:9}], min:2, max:4 },
  { id:'insecto',  nombre:'Enjambre Insectoide',casco:10, escudos:1, esquiva:30, color:'#bbff66',
     armas:[{nombre:'Aguijón bio', dmg:1, disparos:3, carga:12}], min:2, max:5 },
  { id:'crucero',  nombre:'Crucero de la Orden Negra', casco:16, escudos:3, esquiva:12, color:'#cc88ff',
     armas:[{nombre:'Batería iónica', dmg:1, disparos:2, carga:8},
            {nombre:'Lanza de plasma', dmg:3, disparos:1, carga:16}], min:3, max:5 },
  { id:'espectro', nombre:'Espectro Sin Bandera',casco:14, escudos:2, esquiva:45, color:'#99ddff',
     armas:[{nombre:'Rayo fantasma', dmg:2, disparos:2, carga:11}], min:4, max:5 }
];

/* La punta de lanza de la flota que te persigue por cada sector. */
const PERSEGUIDOR = {
  id:'vanguardia', nombre:'Vanguardia de la Orden Negra', casco:14, escudos:2, esquiva:20, color:'#ff77cc',
  armas:[{nombre:'Batería de caza', dmg:1, disparos:2, carga:8},
         {nombre:'Misil de persecución', dmg:2, disparos:1, carga:13, perfora:9}]
};

const JEFE = {
  id:'jefe', nombre:'NIDHOGG — Acorazado Insignia', casco:30, escudos:4, esquiva:10, color:'#ff5555', jefe:true,
  armas:[{nombre:'Batería triple', dmg:1, disparos:3, carga:9},
         {nombre:'Lanzamisiles Ragnar', dmg:3, disparos:1, carga:14, perfora:9},
         {nombre:'Cañón de asedio', dmg:4, disparos:1, carga:18}]
};

const SECTORES = [
  { nombre:'Cinturón de Kerrat',   fondo:'#0a2a3a', saltos:6 },
  { nombre:'Nebulosa de Vex',      fondo:'#2a0a35', saltos:7 },
  { nombre:'Frontera de Halcyon',  fondo:'#3a2a05', saltos:7 },
  { nombre:'Cementerio de Oberon', fondo:'#2a0a0a', saltos:8 },
  { nombre:'Núcleo — Espacio de la Orden Negra', fondo:'#1a0020', saltos:8 }
];

/* --------------------------- EVENTOS --------------------------- */
const EVENTOS = [
  { titulo:'SEÑAL DE SOCORRO',
    texto:'Un carguero civil deriva con el casco reventado. Sus motores tosen plasma y una voz repite en bucle: «Aquí el Amaranta... nos quedan seis horas de aire».',
    opciones:[
      { texto:'Acoplar y evacuar a los supervivientes.', efecto:J=>{
          if(Math.random()<0.7){ J.reclutar(); return 'Sacáis a tres personas del humo. Una de ellas se queda: sabe manejar una consola.'; }
          J.dañarCasco(2); return 'La esclusa cede al acoplar. Perdéis presión en la cubierta 3 antes de sellarla. <em>-2 casco</em>.'; } },
      { texto:'Escanear antes de acercarse.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',18); return 'Los sensores detectan una carga de fusión en la bodega: era una trampa carroñera. La desactiváis a distancia y saqueáis los restos. <em>+18 chatarra</em>.'; } },
      { texto:'Anotarlo en el registro y seguir.', efecto:J=>{
          J.moralTodos(-6); return 'Nadie dice nada en el puente durante un buen rato. <em>Moral de la tripulación a la baja</em>.'; } } ] },

  { titulo:'ESTACIÓN DE REPOSTAJE AUTOMATIZADA',
    texto:'Una boya de repostaje de la vieja Federación, abandonada. El brazo de carga aún responde a códigos antiguos.',
    opciones:[
      { texto:'Repostar con los códigos estándar.', efecto:J=>{
          J.recurso('combustible',2); return 'El depósito acepta. <em>+2 combustible</em>.'; } },
      { texto:'Forzar el núcleo de la boya.', req:{rol:'ingeniero'}, efecto:J=>{
          J.recurso('combustible',3); J.recurso('chatarra',22);
          return 'Tu ingeniero puentea el regulador y vacía la boya entera. <em>+3 combustible, +22 chatarra</em>.'; } },
      { texto:'Desguazarla por piezas.', efecto:J=>{
          J.recurso('chatarra',15); J.recurso('combustible',-1);
          return 'Buenas placas de blindaje, pero el corte consume reservas. <em>+15 chatarra, -1 combustible</em>.'; } } ] },

  { titulo:'CAMPO DE ASTEROIDES',
    texto:'Una rueda de roca y hielo gira entre vosotros y el punto de salto. Rodearla cuesta tiempo y combustible.',
    opciones:[
      { texto:'Atravesarlo a toda máquina.', efecto:J=>{
          const ev = J.sistemas.motores.energia*5;
          if(Math.random()*100 < 45+ev){ J.recurso('chatarra',12); return 'El piloto baila entre las rocas. Además arrancáis mineral de una veta. <em>+12 chatarra</em>.'; }
          J.dañarCasco(3); return 'Un peñasco os alcanza de refilón en el flanco de babor. <em>-3 casco</em>.'; } },
      { texto:'Rodear con calma.', efecto:J=>{
          J.recurso('combustible',-1); return 'Doce horas de maniobra y ni un rasguño. <em>-1 combustible</em>.'; } },
      { texto:'Minar las rocas con las armas.', efecto:J=>{
          J.recurso('chatarra',25); J.dañarCasco(1);
          return 'Sacáis un buen cargamento, aunque un fragmento os abolla la proa. <em>+25 chatarra, -1 casco</em>.'; } } ] },

  { titulo:'PATRULLA DE ADUANAS',
    texto:'«Valkiria, aquí control de sector. Su registro figura como incautado. Prepárense para inspección.»',
    opciones:[
      { texto:'Pagar la "tasa de tránsito" (25 chatarra).', req:{chatarra:25}, efecto:J=>{
          J.recurso('chatarra',-25); return 'El oficial no mira siquiera la bodega. <em>-25 chatarra</em>.'; } },
      { texto:'Falsificar el transpondedor.', req:{sensores:3}, efecto:J=>{
          return 'Vuestros sensores clonan la firma de un carguero de grano. La patrulla os desea buen viaje.'; } },
      { texto:'Encender motores y huir.', efecto:J=>{
          J.combate(); return 'Abren fuego en cuanto giráis. <em>¡COMBATE!</em>'; } } ] },

  { titulo:'ANOMALÍA DE PLIEGUE',
    texto:'El espacio delante de la Valkiria se dobla como una lámina de aceite. Los instrumentos discrepan entre sí.',
    opciones:[
      { texto:'Cruzar la anomalía.', efecto:J=>{
          if(Math.random()<0.5){ J.saltosGratis++; return 'Salís a dos saltos de distancia. <em>El próximo salto no consumirá combustible</em>.'; }
          J.dañarSistemaAzar(2); return 'Las corrientes de marea retuercen el casco. <em>Sistemas dañados</em>.'; } },
      { texto:'Estudiarla desde lejos.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',20); J.subirPericia('sensores',12);
          return 'Los datos valen una fortuna en cualquier puerto científico. <em>+20 chatarra</em>.'; } },
      { texto:'Alejarse de inmediato.', efecto:J=>'Prudencia. La anomalía se cierra sobre sí misma diez minutos después.' } ] },

  { titulo:'MERCADER ERRANTE',
    texto:'Una nave abigarrada, cubierta de antenas y ropa tendida, os hace señales luminosas. Comercian.',
    opciones:[
      { texto:'Comerciar.', efecto:J=>{ J.abrirTienda(); return null; } },
      { texto:'Vender datos de navegación (+30 chatarra).', efecto:J=>{
          J.recurso('chatarra',30); return 'Le vendéis las rutas del sector anterior. <em>+30 chatarra</em>.'; } },
      { texto:'Abordarlos.', efecto:J=>{
          J.moralTodos(-15); J.recurso('chatarra',45); J.recurso('combustible',1);
          return 'No oponen resistencia. Nadie en el puente te mira a los ojos. <em>+45 chatarra, +1 combustible, moral por los suelos</em>.'; } } ] },

  { titulo:'ESTRELLA FUGITIVA',
    texto:'Una enana roja escupe una llamarada. El casco se calienta y las lecturas de radiación suben.',
    opciones:[
      { texto:'Desviar toda la energía a escudos y aguantar.', efecto:J=>{
          if(J.sistemas.escudos.energia>=4){ J.recurso('chatarra',18); return 'Los escudos aguantan y de paso cosecháis plasma vendible. <em>+18 chatarra</em>.'; }
          J.dañarCasco(4); return 'Los escudos ceden. El casco se abrasa. <em>-4 casco</em>.'; } },
      { texto:'Saltar de inmediato.', efecto:J=>{
          J.recurso('combustible',-1); return 'Salto de emergencia. <em>-1 combustible</em>.'; } },
      { texto:'Refugiarse tras el planeta interior.', req:{rol:'piloto'}, efecto:J=>{
          J.repararCasco(3); return 'Tu piloto encuentra la sombra exacta. Aprovecháis la calma para parchear el casco. <em>+3 casco</em>.'; } } ] },

  { titulo:'MOTÍN EN LA CUBIERTA INFERIOR',
    texto:'Dos tripulantes discuten a gritos junto al reactor. Uno sostiene una llave de torsión como si fuera un arma.',
    opciones:[
      { texto:'Imponer disciplina.', efecto:J=>{
          J.moralTodos(-5); return 'El puente vuelve al silencio. Frío, pero silencio. <em>-5 moral</em>.'; } },
      { texto:'Escucharles y ceder raciones.', efecto:J=>{
          J.recurso('chatarra',-15); J.moralTodos(18);
          return 'Repartís reservas. Alguien silba por los pasillos por primera vez en semanas. <em>-15 chatarra, +18 moral</em>.'; } },
      { texto:'Dejar que lo resuelvan entre ellos.', efecto:J=>{
          J.herirAzar(25); return 'Lo resuelven. Uno acaba en la enfermería. <em>Tripulante herido</em>.'; } } ] },

  { titulo:'PECIO DE LA FEDERACIÓN',
    texto:'Un destructor partido en dos, congelado desde hace décadas. Su armería podría estar intacta.',
    opciones:[
      { texto:'Enviar un equipo de abordaje.', efecto:J=>{
          const r=Math.random();
          if(r<0.4){ J.darArmaAzar(); return 'Encontráis un arma operativa en el pañol. <em>¡Nuevo armamento!</em>'; }
          if(r<0.8){ J.recurso('misiles',3); J.recurso('chatarra',20); return 'La santabárbara sigue presurizada. <em>+3 misiles, +20 chatarra</em>.'; }
          J.herirAzar(40); return 'Una cubierta cede bajo el equipo. Los sacáis, pero malheridos. <em>Tripulante grave</em>.'; } },
      { texto:'Rastrear la caja negra.', req:{sensores:2}, efecto:J=>{
          J.recurso('chatarra',26); J.saltosGratis++;
          return 'La caja negra contiene rutas de salto de la vieja flota. <em>+26 chatarra, 1 salto gratis</em>.'; } },
      { texto:'Respetar el pecio y marcharse.', efecto:J=>{
          J.moralTodos(10); return 'La tripulación agradece el gesto. <em>+10 moral</em>.'; } } ] },

  { titulo:'EMBOSCADA',
    texto:'Tres firmas salen de detrás de la luna helada. Una sola se acerca; las otras dos se quedan mirando.',
    opciones:[
      { texto:'A puestos de combate.', efecto:J=>{ J.combate(); return '<em>¡COMBATE!</em>'; } },
      { texto:'Cargar el salto y huir.', efecto:J=>{
          if(J.sistemas.motores.energia>=3){ J.recurso('combustible',-1); return 'Los motores responden a tiempo. <em>-1 combustible</em>.'; }
          J.dañarCasco(3); J.combate(); return 'Demasiado lentos. Os alcanzan mientras cargáis. <em>-3 casco, ¡COMBATE!</em>'; } } ] },

  { titulo:'COLONIA MINERA',
    texto:'Una colonia excavada en un asteroide os ofrece atraque. Huele a polvo de hierro y sopa recalentada.',
    opciones:[
      { texto:'Permiso para bajar a tierra.', efecto:J=>{
          J.moralTodos(20); J.curarTodos(35);
          return 'Veinticuatro horas de permiso. La tripulación vuelve con otra cara. <em>+moral, +salud</em>.'; } },
      { texto:'Vender excedentes.', efecto:J=>{ J.abrirTienda(); return null; } },
      { texto:'Reclutar en el bar del muelle (20 chatarra).', req:{chatarra:20}, efecto:J=>{
          J.recurso('chatarra',-20); J.reclutar();
          return 'Alguien con deudas y buenas manos firma el rol. <em>-20 chatarra, +1 tripulante</em>.'; } } ] },

  { titulo:'BALIZA DE CUARENTENA',
    texto:'Una baliza automática marca el sistema como contaminado. Detrás de ella flota una nave hospital intacta.',
    opciones:[
      { texto:'Abordar la nave hospital.', efecto:J=>{
          if(Math.random()<0.55){ J.recurso('chatarra',35); J.curarTodos(30); return 'Suministros médicos y quirófanos enteros. <em>+35 chatarra, tripulación curada</em>.'; }
          J.herirTodos(28); return 'Algo sigue vivo en la sección de aislamiento. Salís corriendo. <em>Tripulación herida</em>.'; } },
      { texto:'Analizar la firma biológica primero.', req:{sensores:3}, efecto:J=>{
          J.recurso('chatarra',30); J.curarTodos(20);
          return 'Identificáis el patógeno y evitáis las cubiertas infectadas. Saqueo limpio. <em>+30 chatarra, +salud</em>.'; } },
      { texto:'Respetar la cuarentena.', efecto:J=>'Marcáis el sistema en la carta y os alejáis. Hay decisiones que solo se agradecen después.' } ] },

  { titulo:'PREDICADOR DEL VACÍO',
    texto:'Una nave-templo transmite un sermón en catorce idiomas. Piden un diezmo a cambio de "la bendición del pliegue".',
    opciones:[
      { texto:'Donar 30 de chatarra.', req:{chatarra:30}, efecto:J=>{
          J.recurso('chatarra',-30);
          if(Math.random()<0.6){ J.repararCasco(6); J.moralTodos(12); return 'Sus técnicos, "bendiciendo" el casco, lo reparan de verdad. <em>+6 casco, +moral</em>.'; }
          return 'La bendición consiste en un cántico de nueve minutos. Nada más. <em>-30 chatarra</em>.'; } },
      { texto:'Silenciar la transmisión.', efecto:J=>'El puente vuelve a llenarse del zumbido del reactor.' },
      { texto:'Discutir teología con el predicador.', req:{sensores:2}, efecto:J=>{
          J.moralTodos(14); J.recurso('chatarra',10);
          return 'Le ganas la discusión con datos de vuestros sensores. Impresionado, os regala repuestos. <em>+10 chatarra, +moral</em>.'; } } ] },

  { titulo:'FUGA EN EL REFRIGERANTE',
    texto:'Una junta del circuito primario revienta. El reactor entra en cascada térmica.',
    opciones:[
      { texto:'Sellado de emergencia por el ingeniero.', req:{rol:'ingeniero'}, efecto:J=>{
          J.subirPericia('reactor',15); return 'Tu ingeniero mete el brazo en un conducto a 80 °C y aprieta. Contenido. <em>Sin daños</em>.'; } },
      { texto:'Purgar la cubierta al espacio.', efecto:J=>{
          J.herirAzar(30); return 'Se detiene la fuga, pero alguien no llegó a la esclusa a tiempo. <em>Tripulante herido</em>.'; } },
      { texto:'Apagar el reactor y reiniciar.', efecto:J=>{
          J.dañarSistema('reactor',1); return 'El reinicio en frío deja el reactor tocado. <em>Reactor dañado</em>.'; } } ] }
];

const MANUAL = [
  ['Objetivo','Llevar la Valkiria a través de 5 sectores y destruir el acorazado NIDHOGG.'],
  ['Energía','El Reactor produce barras. Repártelas entre sistemas con los botones + / −. Si no hay barras libres, quita de otro sitio.'],
  ['Escudos','2 barras = 1 capa. Cada capa absorbe un impacto y se regenera sola. Los misiles la atraviesan.'],
  ['Armas','Cada arma consume energía para estar activa (clic en el arma para encender/apagar). Se cargan solas; cuando parpadea LISTA, clic para disparar.'],
  ['Objetivo de tiro','Abajo a la derecha del ventanal eliges dónde apuntas: casco, armas o motores enemigos.'],
  ['Tripulación','Clic en un tripulante y luego en un sistema para destinarlo allí. Suma bonus, repara averías y mejora su pericia con el tiempo.'],
  ['Combustible','Cada salto consume 1. Sin combustible estás a la deriva: solo te queda pedir ayuda.'],
  ['Chatarra','La moneda. Sirve para mejorar sistemas (orden MEJORAS) y comprar en puertos.'],
  ['Huir','Con motores activos puedes cargar el salto SLR en pleno combate y desaparecer.'],
  ['La flota','Te persigue. Cada salto dentro del sector la acerca un paso; salir del sector la deja atrás. Si te alcanza, cada salto es un combate contra su vanguardia. La lectura FLOTA de arriba te dice cuánto margen queda.'],
  ['Salir antes','El punto de salida está disponible desde el segundo salto. Quedarte a rascar botín es una apuesta, no un trámite.'],
  ['Partida guardada','Se guarda sola. Puedes cerrar y seguir desde el menú. Al morir se borra: no hay marcha atrás.'],
  ['Atajos','1-4 dispara las armas · ESPACIO pausa · M mapa · U mejoras']
];

/* --------------------------- LÉXICO --------------------------- */
const LEX = {
  marca:'◈ V A L K I R I A', marcaSub:'CLASE KESTREL · REG. FN-2213',
  nave:'la Valkiria', naveNom:'Valkiria',
  casco:'CASCO', cascoNom:'casco',
  vital:'O₂', vitalNom:'oxígeno',
  combustible:'COMBUST.', combustibleNom:'combustible',
  municion:'MISILES', municionNom:'misiles',
  moneda:'CHATARRA', monedaNom:'chatarra',
  region:'SECTOR', regionNom:'sector', etapaNom:'salto',
  perseguidor:'FLOTA',
  tripulacion:'TRIPULACIÓN', tripulanteNom:'tripulante',
  registro:'REGISTRO DE A BORDO',
  panelEnergia:'REACTOR · DISTRIBUCIÓN', panelArmas:'ARMAMENTO', panelOrdenes:'PUENTE · ÓRDENES',
  objCasco:'CASCO', objArmas:'ARMAS', objMotores:'MOTORES',
  defensa:'ESCUDO', defensaNom:'escudos', ion:'IONIZADO', motor:'SLR',
  ordenes:{
    saltar:['⟴ SALTAR (SLR)','Elegir destino · 1 combustible'],
    huir:['⚑ HUIR DEL COMBATE','Requiere el motor SLR cargado'],
    mejoras:['⚙ MEJORAS DE LA NAVE','Invertir chatarra'],
    puestos:['⚔ ¡PUESTOS DE COMBATE!','Cada uno a su estación'],
    escudos:['⌾ EMERGENCIA: ESCUDOS','Toda la energía a defensa'],
    reparar:['✚ REPARAR AVERÍAS','Destinar a los sistemas dañados'],
    pausa:['⏸ PAUSA TÁCTICA','Barra espaciadora'], reanudar:'▶ REANUDAR'
  },
  tituloMapa:'TRAZAR RUMBO', tituloMejoras:'MEJORAS DE LA VALKIRIA',
  tituloTienda:'PUERTO COMERCIAL', tituloManual:'MANUAL DE A BORDO',
  salirTienda:'Zarpar',
  estados:{ pausa:'— PAUSA TÁCTICA —', combate:'ALERTA ROJA · COMBATE',
            listo:'EN ÓRBITA · LISTOS PARA SALTAR', normal:'SISTEMAS EN LÍNEA' },
  avisos:{ sinMunicion:'SIN MISILES', sinCombustible:'SIN COMBUSTIBLE',
           faltaEnergia:'FALTA ENERGÍA EN ARMAS', sinObjetivo:'SIN OBJETIVO',
           sinAverias:'SIN AVERÍAS', sinLectura:'SENSORES INSUFICIENTES',
           subSinLectura:'subsistemas: sin lectura', sinResolver:'ASUNTO SIN RESOLVER',
           sinPenetrar:'NO PASAN EL ESCUDO', acosoEncima:'¡ENCIMA!' },
  tienda:{
    repara:['Reparar casco (+5)','Los soldadores del muelle hacen su trabajo.'],
    reparaFull:['Reparación completa','Deja el casco como nuevo.'],
    combustible:['Combustible ×2','Dos saltos más de autonomía.'],
    municion:['Misiles ×3','Munición perforante.'],
    recluta:['Contratar tripulante','Alguien busca pasaje y sabe trabajar.'],
    seccionSuministros:'SUMINISTROS', seccionArmas:'ARMAMENTO', seccionGente:'ENROLAMIENTO'
  },
  nodos:{
    combate:['⚔','FIRMA HOSTIL','Lectura de armas activas'],
    evento: ['✳','SEÑAL SIN CLASIFICAR','Origen desconocido'],
    tienda: ['⌂','PUERTO COMERCIAL','Atraque y suministros'],
    vacio:  ['·','ESPACIO VACÍO','Nada. Solo silencio'],
    peligro:['☢','ZONA INESTABLE','Radiación y escombros'],
    salida: ['⟴','PUNTO DE SALIDA', n=>n?('Salto a '+n):'Coordenadas del NIDHOGG'],
    oculto: ['?','SIN CLASIFICAR','Sube los sensores para leerlo']
  }
};

/* --------------------------- TEXTOS --------------------------- */
const TXT = {
  intro:{
    titulo:'VALKIRIA — PUENTE DE MANDO',
    cuerpo:`Eres el capitán de la <em>Valkiria</em>, un carguero reconvertido con más remiendos que planchas originales.

Llevas datos robados a la Orden Negra. Cinco sectores te separan de la flota que puede usarlos, y su acorazado insignia, el <em>NIDHOGG</em>, sale a buscarte.

Desde este panel repartes la energía del reactor, das órdenes a la tripulación, disparas y decides el rumbo. Nadie más va a hacerlo.`,
    aceptar:'▶  Asumir el mando', manual:'?  Leer el manual de a bordo'
  },
  logInicio:['Sistemas de la Valkiria en línea. Bienvenido a bordo, capitán.',
             'Destino: Núcleo de la Orden Negra. Cinco sectores.'],
  logContacto: n=>`CONTACTO HOSTIL: ${n}.`,
  logBotin: (n,t)=>`${n} destruido. Botín: ${t}.`,
  logHuida:'Salto de emergencia. Dejáis atrás al hostil.',
  logRegion: (n,nom)=>`Entrando en el sector ${n}: ${nom}.`,
  logTienda:'Atracáis en un puerto comercial.',
  logVacio:'Sistema vacío. La tripulación aprovecha para descansar.',
  logVacioExtra:'Condensáis algo de hidrógeno del medio interestelar.',
  logPeligroMal:'La zona os pasa factura.',
  logPeligroBien:'Recuperáis escombros de valor.',
  logJefe:'Coordenadas confirmadas. El NIDHOGG os está esperando.',
  logPuestos:'¡Todos a sus puestos!',
  logDefensa:'Energía derivada a los escudos.',
  logReparar:'Equipos de reparación en marcha.',
  logAveria: n=>`Avería en ${n}.`,
  logRepara: (q,n)=>`${q} repara ${n}.`,
  logHerido: q=>`${q} resulta herido.`,
  logMuerto: q=>`${q} ha muerto a bordo.`,
  logAlta: (q,r)=>`${q} (${r}) se une a la tripulación.`,
  logArma: n=>`Nuevo armamento: ${n}.`,
  logCompra: n=>`Comprado: ${n}.`,
  logMejora: (n,l)=>`${n} mejorado a nivel ${l}.`,
  sinLitera:'No queda litera libre a bordo.',
  arsenalLleno:'Arsenal lleno: se vende el hallazgo por chatarra.',
  mapaCabecera: (r,s,t)=>`Sector ${r} · salto ${s} de ${t}`,
  logReanudar:'Retomando la partida guardada. Bienvenido de vuelta, capitán.',
  logEscape:'Habéis dejado atrás a la flota. Por ahora.',
  logInterceptado:'La vanguardia de la flota os corta el paso.',
  logAcoso: m=> m<=0 ? 'La flota os pisa los talones: el próximo salto os alcanzan.'
                     : `La flota está a un salto. Conviene salir del sector.`,
  mapaAcoso: m=> m<0 ? 'La flota ya os ha alcanzado: cada salto será un combate.'
               : m===0 ? 'La flota os alcanza en el próximo salto.'
               : `La flota llega en ${m} salto${m===1?'':'s'}.`,
  consejoEscudo:'Tus disparos no atraviesan el escudo enemigo: prueba con misiles, con el cañón de iones o con un arma de más disparos por salva.',
  finVictoria:{ titulo:'MISIÓN CUMPLIDA',
    texto:'El NIDHOGG se desgarra desde la quilla y su reactor florece en silencio a popa.\n\nLa Valkiria, abollada y entera, pone rumbo a casa. En el puente alguien empieza a reírse y ya no puede parar.' },
  finCasco:{ titulo:'LA VALKIRIA SE PIERDE',
    texto:'El casco de la Valkiria se parte en dos. La nave se apaga sistema a sistema, y con ella el zumbido que la tripulación llevaba meses escuchando sin oírlo.' },
  finGente:{ titulo:'LA VALKIRIA SE PIERDE',
    texto:'No queda nadie en pie. La Valkiria sigue su rumbo, iluminada y vacía, hasta que el reactor se apague solo.' },
  finPie: (r,s,m)=>`Sectores recorridos: ${r}  ·  Saltos: ${s}  ·  Chatarra final: ${m}`,
  reiniciar:'Nueva partida',
  deriva:{
    titulo:'A LA DERIVA',
    texto:'Los depósitos están secos. La Valkiria flota sin rumbo.\n\nHay dos maneras de salir de esto, y ninguna es buena.',
    baliza:'Emitir una baliza de socorro', balizaReq:'GRATIS · PUEDE ATRAER CARROÑEROS',
    balizaBien:'Un carguero responde y os cede combustible.',
    balizaMal:'Responde un carroñero. No viene a ayudar.',
    refinar:'Desmontar mamparos y refinar el material', refinarReq:'CUESTA 30 DE CHATARRA',
    refinarLog:'Fundís media cubierta de carga para llenar los depósitos.'
  }
};

/* --------------------------- PINTOR --------------------------- */
/* Cómo se ve el mundo por el ventanal: campo de estrellas en
   perspectiva, nebulosa del sector y la nave hostil en vectores. */
const PINTOR = (function(){
  let estrellas = [];

  function iniciar(W,H){
    const n = Math.max(220, Math.round(W*H/1400));
    estrellas = [];
    for(let i=0;i<n;i++) estrellas.push({x:Math.random()*2-1, y:Math.random()*2-1, z:Math.random()*0.98+0.02, b:Math.random()});
  }

  function fondo(ctx,W,H,dt,turbo,J){
    ctx.fillStyle = '#000308'; ctx.fillRect(0,0,W,H);
    // nebulosa del sector
    const c = SECTORES[J.sector].fondo;
    const g = ctx.createRadialGradient(W*0.72,H*0.25,10, W*0.72,H*0.25, Math.max(W,H)*0.7);
    g.addColorStop(0,c); g.addColorStop(1,'transparent');
    ctx.globalAlpha = 0.55; ctx.fillStyle = g; ctx.fillRect(0,0,W,H); ctx.globalAlpha = 1;

    const vel = (J.pausa?0.02:0.06) + turbo*2.4;
    const cx=W/2, cy=H/2;
    for(const s of estrellas){
      s.z -= vel*dt*(1+s.b);
      if(s.z<=0.03){ s.x=Math.random()*2-1; s.y=Math.random()*2-1; s.z=1; }
      const k = 0.35/s.z;
      const x = cx + s.x*k*W*0.6, y = cy + s.y*k*H*0.6;
      if(x<0||x>W||y<0||y>H) continue;
      const r = Math.max(0.4,(1-s.z)*2.1), a = Math.min(1,(1-s.z)*1.4);
      if(turbo>0.02){
        const k2 = 0.35/Math.min(1, s.z+vel*dt*3);
        ctx.strokeStyle = `rgba(200,255,230,${a*0.8})`; ctx.lineWidth = r*0.8;
        ctx.beginPath(); ctx.moveTo(cx+s.x*k2*W*0.6, cy+s.y*k2*H*0.6); ctx.lineTo(x,y); ctx.stroke();
      }else{
        ctx.fillStyle = `rgba(210,255,235,${a})`;
        ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
      }
    }
  }

  function posEnemigo(W,H,t,E){
    return { x: W*0.5 + Math.sin(t*0.31)*W*0.10,
             y: H*0.42 + Math.sin(t*0.47)*H*0.05,
             s: Math.min(W,H)*0.0022 * (E && E.jefe ? 1.9 : 1) };
  }

  function enemigo(ctx,p,E,t){
    const s = p.s*60, color = E.color;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(Math.sin(t*0.4)*0.05);

    const g = ctx.createRadialGradient(0,0,s*0.2, 0,0,s*3);
    g.addColorStop(0,color+'44'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,s*3,0,7); ctx.fill();

    ctx.lineWidth=1.4; ctx.strokeStyle=color; ctx.fillStyle='#00000099';
    ctx.shadowColor=color; ctx.shadowBlur=12;
    ctx.beginPath();
    if(E.jefe){
      ctx.moveTo(0,-s*1.1); ctx.lineTo(s*0.5,-s*0.3); ctx.lineTo(s*1.6,-s*0.15);
      ctx.lineTo(s*1.9,s*0.25); ctx.lineTo(s*0.4,s*0.5); ctx.lineTo(0,s*1.0);
      ctx.lineTo(-s*0.4,s*0.5); ctx.lineTo(-s*1.9,s*0.25); ctx.lineTo(-s*1.6,-s*0.15); ctx.lineTo(-s*0.5,-s*0.3);
    }else{
      ctx.moveTo(0,-s*0.9); ctx.lineTo(s*0.55,-s*0.1); ctx.lineTo(s*1.25,s*0.15);
      ctx.lineTo(s*0.35,s*0.55); ctx.lineTo(0,s*0.35);
      ctx.lineTo(-s*0.35,s*0.55); ctx.lineTo(-s*1.25,s*0.15); ctx.lineTo(-s*0.55,-s*0.1);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.shadowBlur=0; ctx.globalAlpha=0.55;
    ctx.beginPath(); ctx.moveTo(-s*0.5,0); ctx.lineTo(s*0.5,0); ctx.stroke();
    ctx.globalAlpha=1;

    const pul = 0.6+0.4*Math.sin(t*8);
    ctx.fillStyle=color; ctx.shadowColor=color; ctx.shadowBlur=16*pul;
    ctx.fillRect(-s*0.22, s*0.42, s*0.44, s*0.16*pul);

    if(E.escudo>0){
      ctx.shadowBlur=10; ctx.shadowColor='#59d4ff';
      ctx.strokeStyle='rgba(89,212,255,'+(0.18+0.12*E.escudo)+')'; ctx.lineWidth=1.5;
      for(let i=0;i<E.escudo;i++){
        ctx.beginPath(); ctx.ellipse(0,0, s*(2.0+i*0.16), s*(1.35+i*0.12), 0, 0, 7); ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* De dónde salen nuestros disparos: los cañones de proa, fuera de cuadro. */
  function origenPropio(W,H,lado){ return { x: W*(0.5+lado*0.46), y: H*1.02 }; }
  /* Dónde acaban los disparos enemigos: contra el cristal. */
  function destinoPropio(W,H,desv){ return { x: W*(0.5+desv*1.3), y: H*1.1 }; }

  function defensa(ctx,W,H,capas,flash){
    if(capas<=0 && flash<=0) return;
    ctx.save();
    for(let i=0;i<capas;i++){
      const m = 4+i*5;
      ctx.strokeStyle = 'rgba(89,212,255,'+(0.30-i*0.05+flash*0.5)+')';
      ctx.lineWidth = 2; ctx.shadowColor='#59d4ff'; ctx.shadowBlur=10;
      ctx.strokeRect(m,m,W-m*2,H-m*2);
    }
    ctx.restore();
  }

  return { iniciar, fondo, posEnemigo, enemigo, origenPropio, destinoPropio, defensa };
})();

/* --------------------------- REGISTRO --------------------------- */
CAMPANAS.valkiria = {
  id:'valkiria',
  titulo:'VALKIRIA',
  subtitulo:'Clase Kestrel',
  genero:'Gestión de nave · ciencia ficción',
  gancho:'Eres el capitán. Reparte la energía del reactor, da órdenes a tu tripulación y cruza cinco sectores con la flota de la Orden Negra pisándote los talones.',
  emblema:'◈',
  tema:{
    fosforo:'#5cffb1', 'fosforo-mate':'#2f9c6b', 'fosforo-osc':'#0c2b1e', tinta:'#04180f',
    acento:'#ffb340', peligro:'#ff5a5a', frio:'#59d4ff',
    borde:'#1d5c3f', panel:'#06130d', fondo:'#030806'
  },
  inicio:{ casco:30, combustible:8, moneda:40, municion:4,
           reactor:5, armas:3,
           arsenal:['laser_ligero','misil_perf'],
           tripulacion:[['piloto','Rennick'],['artillero'],['ingeniero']],
           reparto:{escudos:2, armas:3, motores:2, soporte:1, sensores:1} },
  SISTEMAS, ARMAS, ROLES, NOMBRES, ENEMIGOS, PERSEGUIDOR, JEFE, SECTORES, EVENTOS, MANUAL, LEX, TXT, PINTOR
};

})();

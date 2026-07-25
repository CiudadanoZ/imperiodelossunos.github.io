/* ============================================================
   MENÚ — construye las tarjetas a partir del registro CAMPANAS,
   ofrece continuar la partida guardada y anima una vista previa
   usando el propio PINTOR de cada juego.
   Añadir una campaña nueva la hace aparecer aquí sola.
   ============================================================ */

(function(){

const cont = document.getElementById('tarjetas');
const lista = Object.values(window.CAMPANAS);
const vistas = [];

/* Lee el guardado de una campaña sin depender del motor del juego. */
function leerGuardado(id){
  try{
    const d = JSON.parse(localStorage.getItem('partida:'+id) || 'null');
    if(d && d.v===1 && d.camp===id && d.sector>=0) return d;
  }catch(e){}
  return null;
}

function ir(id, nueva){ location.href = 'juego.html?c='+encodeURIComponent(id) + (nueva?'&n=1':''); }

lista.forEach((c,i)=>{
  const g = leerGuardado(c.id);
  const zona = g ? (g.sector+1)+'-'+Math.max(1,g.salto) : null;
  const resumen = g ? `${c.LEX.regionNom} ${zona} · ${c.LEX.cascoNom} ${Math.ceil(g.casco)}/${g.cascoMax}` : '';

  const t = document.createElement('div');
  t.className = 'tarjeta';
  t.tabIndex = 0;
  t.setAttribute('role','button');
  for(const k in c.tema) t.style.setProperty('--'+k, c.tema[k]);
  t.innerHTML = `
    <span class="t-tecla">${i+1}</span>
    <canvas class="vista"></canvas>
    <div class="t-cuerpo">
      <div class="t-cabeza">
        <span class="t-emblema">${c.emblema}</span>
        <h2 class="t-titulo">${c.titulo}</h2>
      </div>
      <div class="t-sub">${c.subtitulo}</div>
      <span class="t-genero">${c.genero}</span>
      <p class="t-gancho">${c.gancho}</p>
      <div class="t-botones">
        ${g ? `<button class="t-jugar" data-accion="seguir">⏵ CONTINUAR</button>` : ''}
        <button class="${g?'t-nueva':'t-jugar'}" data-accion="nueva">▶ PARTIDA NUEVA</button>
      </div>
      ${g ? `<div class="t-guardado">Partida en curso · ${resumen}</div>` : ''}
    </div>`;

  const nueva = t.querySelector('[data-accion="nueva"]');
  const seguir = t.querySelector('[data-accion="seguir"]');

  if(seguir) seguir.onclick = e=>{ e.stopPropagation(); ir(c.id,false); };

  // Con partida en curso, empezar de cero la borra: se pide confirmación
  // en el propio botón, sin diálogos del navegador.
  let armado = false;
  nueva.onclick = e=>{
    e.stopPropagation();
    if(!g || armado) return ir(c.id,true);
    armado = true;
    nueva.textContent = '⚠ ¿BORRAR LA PARTIDA EN CURSO?';
    nueva.classList.add('avisando');
    setTimeout(()=>{ armado=false; nueva.textContent='▶ PARTIDA NUEVA'; nueva.classList.remove('avisando'); }, 4000);
  };

  // clic en la tarjeta: la acción por defecto (seguir si hay algo que seguir)
  t.onclick = ()=>ir(c.id, !g);
  t.onkeydown = e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); ir(c.id,!g); } };

  cont.appendChild(t);

  const cv = t.querySelector('.vista');
  vistas.push({ c, cv, ctx: cv.getContext('2d'),
    E: Object.assign({}, c.ENEMIGOS[1], {escudo:1, escudoMax:1, jefe:false}),
    J: { sector:i % c.SECTORES.length, pausa:false, tiempo:0 } });
});

document.addEventListener('keydown', e=>{
  const n = parseInt(e.key,10);
  if(n>=1 && n<=lista.length){
    const c = lista[n-1];
    ir(c.id, !leerGuardado(c.id));
  }
});

/* ---------- vistas previas animadas ---------- */
function dimensionar(){
  for(const v of vistas){
    const dpr = Math.min(2, window.devicePixelRatio||1);
    const w = v.cv.clientWidth, h = v.cv.clientHeight;
    if(!w||!h) continue;
    v.w=w; v.h=h;
    v.cv.width = w*dpr; v.cv.height = h*dpr;
    v.ctx.setTransform(dpr,0,0,dpr,0,0);
    window.SECTORES = v.c.SECTORES;      // el pintor lo consulta para el tinte
    v.c.PINTOR.iniciar(w,h);
  }
}
window.addEventListener('resize', dimensionar);

let ultimo = performance.now();
function bucle(ahora){
  let dt = (ahora-ultimo)/1000; ultimo = ahora;
  if(dt>0.2) dt = 0.2;
  for(const v of vistas){
    if(!v.w) continue;
    v.J.tiempo += dt;
    window.SECTORES = v.c.SECTORES;
    v.ctx.clearRect(0,0,v.w,v.h);
    v.c.PINTOR.fondo(v.ctx, v.w, v.h, dt, 0, v.J);
    const p = v.c.PINTOR.posEnemigo(v.w, v.h, v.J.tiempo, v.E);
    v.c.PINTOR.enemigo(v.ctx, p, v.E, v.J.tiempo);
  }
  requestAnimationFrame(bucle);
}

dimensionar();
requestAnimationFrame(bucle);

})();

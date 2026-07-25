/* ============================================================
   MAIN — bucles, controles y el ventanal.
   El fondo, el hostil y las defensas los dibuja el PINTOR de la
   campaña; aquí solo van los disparos, los destellos y el bucle.
   ============================================================ */

(function(){

const lienzo = document.getElementById('lienzo');
const ctx = lienzo.getContext('2d');
let W=0, H=0, DPR=1;
let flash = 0, flashDefensa = 0, turbo = 0;

function dimensionar(){
  DPR = Math.min(2, window.devicePixelRatio||1);
  W = lienzo.clientWidth; H = lienzo.clientHeight;
  lienzo.width = W*DPR; lienzo.height = H*DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize', ()=>{ dimensionar(); PINTOR.iniciar(W,H); });

/* --------- retícula de puntería --------- */
function reticula(p){
  const s = p.s*60*1.6;
  ctx.save();
  ctx.strokeStyle = J.objetivo==='casco' ? 'rgba(255,179,64,.65)' : 'rgba(180,255,220,.75)';
  ctx.lineWidth = 1; ctx.setLineDash([4,4]);
  ctx.strokeRect(p.x-s, p.y-s*0.7, s*2, s*1.4);
  ctx.setLineDash([]);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.font = '9px Courier New';
  const nom = J.objetivo==='casco' ? LEX.objCasco : (J.objetivo==='armas' ? LEX.objArmas : LEX.objMotores);
  ctx.fillText(nom, p.x-s, p.y-s*0.7-5);
  ctx.restore();
}

/* --------- disparos --------- */
function proyectiles(){
  const pe = PINTOR.posEnemigo(W,H,J.tiempo,J.enemigo);
  for(const p of J.proyectiles){
    if(p.lado===undefined){ p.lado = Math.random()<0.5?-1:1; p.desv=(Math.random()-0.5)*0.5; }
    const k = Math.min(1, p.t/p.dur);
    const col = p.tipo==='misil' ? '#ffb340' : p.tipo==='ion' ? '#8fd6c8' : '#ffe07a';

    if(p.origen==='jugador'){
      const o = PINTOR.origenPropio(W,H,p.lado);
      const x1 = pe.x + p.desv*30, y1 = pe.y;
      const cx = o.x + (x1-o.x)*k, cy = o.y + (y1-o.y)*k;
      const q = Math.max(0,k-0.18);
      ctx.save();
      ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 12;
      ctx.lineWidth = p.tipo==='misil' ? 3 : 2;
      ctx.beginPath(); ctx.moveTo(o.x+(x1-o.x)*q, o.y+(y1-o.y)*q); ctx.lineTo(cx,cy); ctx.stroke();
      ctx.restore();
    }else{
      const d = PINTOR.destinoPropio(W,H,p.desv);
      const cx = pe.x + (d.x-pe.x)*k, cy = pe.y + (d.y-pe.y)*k;
      const q = Math.max(0,k-0.16);
      ctx.save();
      ctx.strokeStyle = p.tipo==='misil' ? '#ff8a3d' : '#ff5a5a';
      ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 14;
      ctx.lineWidth = 1.5 + k*4;
      ctx.beginPath(); ctx.moveTo(pe.x+(d.x-pe.x)*q, pe.y+(d.y-pe.y)*q); ctx.lineTo(cx,cy); ctx.stroke();
      ctx.restore();
    }
  }
}

/* --------- render --------- */
function render(dt){
  if(!W) dimensionar();
  ctx.clearRect(0,0,W,H);

  PINTOR.fondo(ctx,W,H,dt,turbo,J);

  if(J.enemigo){
    const p = PINTOR.posEnemigo(W,H,J.tiempo,J.enemigo);
    PINTOR.enemigo(ctx,p,J.enemigo,J.tiempo);
    reticula(p);
  }

  proyectiles();
  PINTOR.defensa(ctx,W,H,J.escudoCapas,flashDefensa);

  if(flash>0){ ctx.fillStyle = `rgba(255,60,60,${flash*0.35})`; ctx.fillRect(0,0,W,H); }

  if(J.casco/J.cascoMax < 0.34 && J.modo!=='fin'){
    const a = 0.10 + 0.07*Math.sin(J.tiempo*6);
    const g = ctx.createRadialGradient(W/2,H/2,H*0.2, W/2,H/2,H*0.8);
    g.addColorStop(0,'transparent'); g.addColorStop(1,`rgba(255,0,0,${a})`);
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }

  flash        = Math.max(0, flash - dt*2.2);
  flashDefensa = Math.max(0, flashDefensa - dt*3);
  turbo        = Math.max(0, turbo - dt*0.8);
}

/* --------------------------- BUCLES ---------------------------
   La simulación va en un intervalo fijo (no depende de que la
   pestaña esté visible); el dibujo va en requestAnimationFrame. */
let ultimoTick = performance.now();
setInterval(()=>{
  const ahora = performance.now();
  let dt = (ahora-ultimoTick)/1000; ultimoTick = ahora;
  if(dt>0.25) dt = 0.25;
  if(!IU.modalVisible()) J.tick(dt);
}, 1000/30);

let ultimoRender = performance.now();
function bucle(ahora){
  let dt = (ahora-ultimoRender)/1000; ultimoRender = ahora;
  if(dt>0.25) dt = 0.25;
  IU.actualizar();
  if(IU.saltoFx){ turbo = 1.0; IU.saltoFx = 0; }
  if(IU.flash){ flash = 1; IU.flash = 0; }
  render(dt);
  requestAnimationFrame(bucle);
}

/* --------------------------- CONTROLES --------------------------- */
document.addEventListener('keydown', e=>{
  if(e.repeat) return;
  if(e.key==='Escape'){ if(IU.modalVisible() && !IU.bloqueado) IU.cerrarModal(); return; }
  if(IU.modalVisible()) return;
  if(e.key>='1' && e.key<='4'){ J.disparar(+e.key-1); e.preventDefault(); return; }
  switch(e.key.toLowerCase()){
    case ' ': J.pausa = !J.pausa; SFX.clic(); e.preventDefault(); break;
    case 'm': if(!IU.ordenes.saltar.disabled) IU.modalMapa(); break;
    case 'u': IU.modalMejoras(); break;
    case 'p': IU.ordenPuestos(); break;
    case 'r': IU.ordenReparar(); break;
  }
});
document.addEventListener('mousedown', ()=>SFX.iniciar(), {once:true});

/* --------------------------- ARRANQUE --------------------------- */
const C = cargarCampana(campanaPedida());

IU.iniciar();
dimensionar();
PINTOR.iniciar(W,H);
J.nuevaPartida();

/* Con ?n=1 se fuerza partida nueva; si no, se retoma la guardada. */
const retomada = !new URLSearchParams(location.search).has('n') && J.cargar();
if(retomada){
  IU.firmaTrip=''; IU.firmaArmas=''; IU.firmaLog=-1;
  IU.sucio('todo');
}else{
  IU.modal(TXT.intro.titulo, TXT.intro.cuerpo, [
    { texto:TXT.intro.aceptar, fn:()=>IU.cerrarModal() },
    { texto:TXT.intro.manual,  fn:()=>IU.modalAyuda() }
  ], true);
}

requestAnimationFrame(bucle);

/* Hook de desarrollo: forzar un fotograma desde la consola. */
window.VALKIRIA = { render, dimensionar };

})();

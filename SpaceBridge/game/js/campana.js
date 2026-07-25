/* ============================================================
   CAMPAÑA ACTIVA — decide con qué contenido arranca el motor.
   Publica en window las tablas que el resto del código usa por
   su nombre corto (SISTEMAS, ARMAS, LEX, TXT, PINTOR...).
   ============================================================ */

window.CAMP = null;

function campanaPedida(){
  const p = new URLSearchParams(location.search).get('c');
  if(p && window.CAMPANAS[p]) return p;
  try{ const g = localStorage.getItem('campana'); if(g && window.CAMPANAS[g]) return g; }catch(e){}
  return 'valkiria';
}

function cargarCampana(id){
  const c = window.CAMPANAS[id] || window.CAMPANAS.valkiria;
  window.CAMP = c;

  window.SISTEMAS = c.SISTEMAS; window.ARMAS   = c.ARMAS;
  window.ROLES    = c.ROLES;    window.NOMBRES = c.NOMBRES;
  window.ENEMIGOS = c.ENEMIGOS; window.JEFE    = c.JEFE;
  window.PERSEGUIDOR = c.PERSEGUIDOR;
  window.SECTORES = c.SECTORES; window.EVENTOS = c.EVENTOS;
  window.MANUAL   = c.MANUAL;   window.LEX     = c.LEX;
  window.TXT      = c.TXT;      window.PINTOR  = c.PINTOR;

  const raiz = document.documentElement;
  for(const k in c.tema) raiz.style.setProperty('--'+k, c.tema[k]);

  document.title = c.titulo + ' — ' + c.subtitulo;
  try{ localStorage.setItem('campana', c.id); }catch(e){}
  return c;
}

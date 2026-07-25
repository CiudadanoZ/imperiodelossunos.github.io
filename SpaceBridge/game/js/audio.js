/* ============================================================
   AUDIO — bleeps sintetizados con WebAudio. Sin ficheros externos.
   ============================================================ */

const SFX = {
  ctx:null,
  activo:true,

  iniciar(){
    if(this.ctx) return;
    try{ this.ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ this.activo=false; }
  },

  tono(frec, dur, tipo='square', vol=0.05, deslizA=null){
    if(!this.activo) return;
    this.iniciar();
    if(!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frec, t);
    if(deslizA) osc.frequency.exponentialRampToValueAtTime(Math.max(20,deslizA), t+dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
    osc.connect(g); g.connect(this.ctx.destination);
    osc.start(t); osc.stop(t+dur+0.02);
  },

  ruido(dur, vol=0.06){
    if(!this.activo) return;
    this.iniciar();
    if(!this.ctx) return;
    const n = Math.floor(this.ctx.sampleRate*dur);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i=0;i<n;i++) d[i] = (Math.random()*2-1) * (1 - i/n);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const g = this.ctx.createGain(); g.gain.value = vol;
    const f = this.ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=900;
    src.connect(f); f.connect(g); g.connect(this.ctx.destination);
    src.start();
  },

  clic(){ this.tono(880,0.04,'square',0.03); },
  pip(){ this.tono(1400,0.05,'square',0.025); },
  error(){ this.tono(160,0.18,'sawtooth',0.05); },
  laser(){ this.tono(1200,0.16,'sawtooth',0.045,240); },
  misil(){ this.tono(300,0.4,'triangle',0.05,90); },
  ion(){ this.tono(500,0.25,'sine',0.05,1600); },
  impacto(){ this.ruido(0.3,0.09); this.tono(90,0.25,'sawtooth',0.05,40); },
  escudo(){ this.tono(700,0.14,'sine',0.05,1500); },
  alarma(){ this.tono(440,0.12,'square',0.05); setTimeout(()=>this.tono(330,0.16,'square',0.05),140); },
  salto(){ this.tono(120,1.1,'sine',0.06,2400); },
  victoria(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>this.tono(f,0.16,'square',0.05),i*110)); },
  derrota(){ [400,320,250,160].forEach((f,i)=>setTimeout(()=>this.tono(f,0.3,'sawtooth',0.06),i*180)); }
};

// ============================================================
//  SONIDO — efectos sintetizados con WebAudio (sin archivos).
// ============================================================

const Sonido = (() => {
  let ac = null;
  let activo = true;
  let lluviaNodo = null, lluviaGain = null;

  function ctx() {
    if (!ac) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ac = new C();
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }

  function bufferRuido(seg) {
    const a = ctx();
    const b = a.createBuffer(1, Math.floor(a.sampleRate * seg), a.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  function tono(frec, dur, tipo = 'square', vol = 0.05, desliz = 0) {
    if (!activo) return;
    const a = ctx(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(frec, a.currentTime);
    if (desliz) o.frequency.exponentialRampToValueAtTime(Math.max(20, frec + desliz), a.currentTime + dur);
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g).connect(a.destination);
    o.start(); o.stop(a.currentTime + dur);
  }

  function golpe(dur, frecFiltro, vol) {
    if (!activo) return;
    const a = ctx(); if (!a) return;
    const s = a.createBufferSource(); s.buffer = bufferRuido(dur);
    const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = frecFiltro;
    const g = a.createGain();
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    s.connect(f).connect(g).connect(a.destination);
    s.start();
  }

  return {
    iniciar() { ctx(); },
    sello() { golpe(0.18, 400, 0.6); tono(70, 0.15, 'sine', 0.25, -30); },
    tecla() { tono(900 + Math.random() * 300, 0.02, 'square', 0.012); },
    clic() { tono(520, 0.05, 'square', 0.03); },
    aviso() { tono(1400, 0.08, 'square', 0.025); },
    alerta() { tono(220, 0.35, 'sawtooth', 0.08, -120); tono(233, 0.35, 'sawtooth', 0.06, -120); },
    tirada() { tono(300 + Math.random() * 500, 0.03, 'square', 0.02); },
    exito() { tono(392, 0.15, 'triangle', 0.08); setTimeout(() => tono(523, 0.3, 'triangle', 0.08), 140); },
    fracaso() { tono(196, 0.2, 'triangle', 0.08); setTimeout(() => tono(147, 0.45, 'triangle', 0.08), 180); },
    lluvia(on) {
      const a = ctx(); if (!a) return;
      if (on && !lluviaNodo) {
        lluviaNodo = a.createBufferSource();
        lluviaNodo.buffer = bufferRuido(2); lluviaNodo.loop = true;
        const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.4;
        lluviaGain = a.createGain(); lluviaGain.gain.value = activo ? 0.035 : 0;
        lluviaNodo.connect(f).connect(lluviaGain).connect(a.destination);
        lluviaNodo.start();
      } else if (!on && lluviaNodo) {
        lluviaNodo.stop(); lluviaNodo = null;
      }
    },
    alternar() {
      activo = !activo;
      if (lluviaGain) lluviaGain.gain.value = activo ? 0.035 : 0;
      return activo;
    }
  };
})();

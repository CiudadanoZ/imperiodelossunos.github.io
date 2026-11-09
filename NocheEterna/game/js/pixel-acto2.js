// ============================================================
//  PIXEL · ACTO 2 — escenas nuevas (amplían Pixel.escenas sin tocar las del Acto 1).
//    comite          la sala del Comité en el antiguo Ministerio, a la luz de las velas
//    madridOscura    Madrid libre y sin luz: hogueras, nieve y colas
//    colonia         la Colonia de Trabajo Este-1 por fuera: nieve, alambradas, torre de vigilancia
//    barracon        un barracón de la colonia por dentro
//    oficinaColonia  la caseta del registro de la colonia (donde trabaja Elías preso)
//    helios          la Ciudadela Helios desde fuera: tres anillos, torres y una sola llama
//    oficinaHelios   la oficina de turnos y pases del anillo interior
//    talleres        los talleres bajo el anillo exterior, donde duermen los que hacen la luz
//    salaLlave       la Sala de la Llave: dos pedestales y el anillo de luz
//    archivoLumen    el archivo de la Fundación Lumen, junto a la Sala de la Llave
// ============================================================

(() => {
  const { r, linea, circulo, rng, crearSkyline, dibujarSkyline, figura, vineta } = Pixel.util;
  const W = 320, H = 180;

  // ---------- piezas comunes ----------
  const COPOS = (() => { const g = rng(77); return Array.from({ length: 140 }, () => ({ x: g() * W, y: g() * H, v: 6 + g() * 10, d: g() * 6 })); })();
  function nieve(c, t, zona = { x: 0, y: 0, w: W, h: H }, densidad = 1, color = 'rgba(230,232,240,0.7)') {
    c.fillStyle = color;
    const n = Math.floor(COPOS.length * densidad);
    for (let i = 0; i < n; i++) {
      const f = COPOS[i];
      const y = (f.y + t * f.v) % zona.h;
      const x = ((f.x + Math.sin(t * 0.8 + f.d) * 3) % zona.w + zona.w) % zona.w;
      c.fillRect(Math.round(zona.x + x), Math.round(zona.y + y), 1, 1);
    }
  }
  // llama que tiembla (vela, hoguera, estufa)
  function llama(c, x, y, t, tam = 1, fase = 0) {
    const a = Math.sin(t * 9 + fase) > 0 ? 1 : 0;
    const g = c.createRadialGradient(x, y, 0, x, y, 14 * tam);
    g.addColorStop(0, 'rgba(255,190,90,0.22)'); g.addColorStop(1, 'rgba(255,190,90,0)');
    c.fillStyle = g; c.fillRect(x - 14 * tam, y - 14 * tam, 28 * tam, 28 * tam);
    r(c, x, y - 1 - a, 1, 2 + a, '#ffd070');
    if (tam > 1) { r(c, x - 1, y, 3, 2, '#ff8a30'); r(c, x - 2 + a, y - 3, 2, 3, '#ffb040'); }
  }
  // personita pequeña (15 px), como las multitudes del tráiler
  function persona(c, x, y, g, fase, t, abrigo) {
    const piel = ['#e6c4a8', '#d4ab8c', '#c9a07f', '#b98463', '#a87858'][Math.floor(g * 5)];
    const ropa = abrigo || ['#3a3a3a', '#46463c', '#3c3440', '#2d3a45', '#4a4034'][Math.floor(g * 7) % 5];
    r(c, x - 2, y - 4, 1, 4, '#121216'); r(c, x + 1, y - 4, 1, 4, '#121216');
    r(c, x - 2, y - 10, 4, 6, ropa);
    r(c, x - 3, y - 10 + (Math.sin(t * 2 + fase) > 0.9 ? 1 : 0), 1, 5, ropa); r(c, x + 2, y - 10, 1, 5, ropa);
    r(c, x - 1, y - 13, 3, 3, piel);
    r(c, x - 1, y - 14, 3, 1, '#2a2622');
  }
  const SKY_OSCURO = crearSkyline(91, 30, 90);
  // La Aguja sin luz: solo la silueta (Helios ha cortado la corriente)
  function agujaApagada(c, cx, top, base, color) {
    for (let y = top; y < base; y++) { const w = 1 + Math.floor((y - top) * 0.11); r(c, cx - (w >> 1), y, w, 1, color); }
    for (let k = 1; k <= 4; k++) { const y = top + Math.floor((base - top) * k / 5), w = 5 + Math.floor((y - top) * 0.11); r(c, cx - (w >> 1), y, w, 2, color); }
  }

  // ---------- el Comité ----------
  Pixel.escenas.comite = function (c, t, e) {
    r(c, 0, 0, W, H, '#1a1a1f');
    for (let x = 0; x < W; x += 30) r(c, x, 12, 1, 100, '#16161a');
    r(c, 0, 110, W, 70, '#141417');
    // ventana: la ciudad sin luz, La Aguja apagada
    r(c, 8, 18, 68, 58, '#0b0b0e'); r(c, 10, 20, 64, 54, '#15161b');
    agujaApagada(c, 50, 26, 74, '#24252c');
    for (let i = 0; i < 6; i++) r(c, 10 + i * 11, 60 - (i * 7 % 10), 10, 20, '#1d1f25');
    nieve(c, t, { x: 10, y: 20, w: 64, h: 54 }, 0.35);
    r(c, 41, 20, 2, 54, '#0b0b0e'); r(c, 10, 46, 64, 2, '#0b0b0e');
    // el cartel de la Orden, arrancado a medias
    r(c, 86, 20, 36, 22, '#5a0b16');
    for (let k = 0; k < 7; k++) r(c, 86 + k * 5, 42, 4, 2 + (k * 13 % 7), '#5a0b16');
    Pixel.solNegro(c, 104, 30, 6, 0, '#b8a888');
    r(c, 90, 96, 30, 8, '#4a0a14'); r(c, 96, 100, 18, 3, '#6a1420');      // el resto, en el suelo
    // en su lugar, una sábana pintada a mano
    r(c, 128, 18, 30, 34, '#d8d0bc');
    r(c, 131, 24, 24, 2, '#8a1424'); r(c, 133, 29, 20, 2, '#8a1424'); r(c, 131, 34, 24, 2, '#8a1424'); r(c, 135, 40, 16, 2, '#8a1424');
    // velas en la mesa
    r(c, 0, 104, 160, 76, '#34271f'); r(c, 0, 104, 160, 2, '#46362a');
    for (const [vx, f] of [[28, 0], [118, 2], [146, 4]]) { r(c, vx - 1, 96, 3, 8, '#e8e0cc'); llama(c, vx, 95, t, 1, f); }
    // el público, detrás de una cuerda
    const g = rng(12);
    for (let k = 0; k < 22; k++) {
      const x = 176 + (k % 11) * 13 + (k > 10 ? 6 : 0), y = k > 10 ? 112 : 104;
      persona(c, x, y, g(), k, t);
    }
    for (let x = 170; x < W; x += 30) r(c, x, 106, 2, 12, '#4a3a28');
    r(c, 170, 108, W - 170, 1, '#8a7050');
    for (const [vx, vy] of [[184, 92], [236, 90], [290, 93]]) llama(c, vx, vy, t, 1, vx);
    vineta(c, 160, 90, 60, 220, 0.8);
  };

  // ---------- Madrid a oscuras ----------
  Pixel.escenas.madridOscura = function (c, t, e) {
    const b = ['#07070a', '#09090d', '#0c0b10', '#0f0d12', '#121016'];
    b.forEach((col, i) => r(c, 0, i * 26, W, 26, col));
    agujaApagada(c, 160, 22, 150, '#1c1c24');                        // La Aguja, apagada
    dibujarSkyline(c, SKY_OSCURO, 150, '#040405', t, '#040405');     // sin una sola ventana encendida
    r(c, 0, 150, W, 1, '#1c1b22');
    r(c, 0, 150, W, 30, '#0d0c10');
    // hogueras en bidones y gente alrededor
    const g = rng(33);
    for (const [bx, n] of [[60, 5], [170, 7], [262, 4]]) {
      r(c, bx - 4, 150, 9, 12, '#2a2622'); r(c, bx - 4, 150, 9, 1, '#3a3430');
      llama(c, bx, 148, t, 2, bx);
      for (let k = 0; k < n; k++) persona(c, bx - 16 + k * (32 / n) + (k >= n / 2 ? 8 : 0), 166, g(), k, t);
    }
    nieve(c, t, { x: 0, y: 0, w: W, h: H }, 1);
    vineta(c, 160, 110, 70, 230, 0.75);
  };

  // ---------- la Colonia de Trabajo Este-1 ----------
  Pixel.escenas.colonia = function (c, t, e) {
    ['#101218', '#13151b', '#16181e', '#1a1c22'].forEach((col, i) => r(c, 0, i * 30, W, 30, col));
    // torres de alta tensión hacia Helios, al fondo
    for (const px of [30, 130, 230, 330]) {
      linea(c, px, 60, px - 5, 96, '#23262d'); linea(c, px, 60, px + 5, 96, '#23262d'); r(c, px - 7, 64, 15, 1, '#23262d');
    }
    for (let x = 0; x < W; x++) r(c, x, 64 + Math.round(Math.sin((x % 100) / 100 * Math.PI) * 5), 1, 1, '#1c1f25');
    r(c, 0, 96, W, 84, '#c8ccd4');                                    // nieve en el suelo
    r(c, 0, 96, W, 2, '#aeb3bd');
    // barracones
    for (const [bx, bw] of [[20, 70], [110, 80], [210, 64]]) {
      r(c, bx, 78, bw, 20, '#2a2724'); r(c, bx - 2, 76, bw + 4, 3, '#dfe2e8');
      for (let k = 6; k < bw - 6; k += 12) r(c, bx + k, 85, 4, 4, Math.sin(t + k) > -0.6 ? '#6a5020' : '#2a2724');
      r(c, bx + bw - 12, 66, 3, 10, '#1a1816');
      for (let s = 0; s < 4; s++) { const f = (t * 0.4 + s * 0.25) % 1; c.fillStyle = `rgba(160,160,170,${0.25 * (1 - f)})`; c.fillRect(bx + bw - 12 + f * 6, 64 - f * 22, 3 + f * 4, 3); }
    }
    // la torre de vigilancia y su foco
    r(c, 286, 40, 3, 60, '#1a1a1e'); r(c, 300, 40, 3, 60, '#1a1a1e'); r(c, 282, 34, 26, 8, '#222226');
    r(c, 284, 30, 22, 4, '#18181c');
    const a = Math.PI * 0.62 + Math.sin(t * 0.35) * 0.55;
    c.fillStyle = 'rgba(255,245,215,0.09)';
    c.beginPath(); c.moveTo(294, 40);
    c.lineTo(294 + Math.cos(a - 0.1) * 260, 40 + Math.sin(a - 0.1) * 260);
    c.lineTo(294 + Math.cos(a + 0.1) * 260, 40 + Math.sin(a + 0.1) * 260);
    c.closePath(); c.fill();
    r(c, 293, 38, 3, 2, '#fff0c0');
    // alambrada
    for (let x = 4; x < W; x += 22) r(c, x, 100, 2, 26, '#3a3a40');
    for (const y of [104, 112, 120]) for (let x = 0; x < W; x += 2) r(c, x, y + (x % 6 === 0 ? 1 : 0), 1, 1, '#4a4a52');
    // el cartel
    r(c, 120, 128, 80, 14, '#2a2a2e'); r(c, 124, 132, 72, 2, '#b8b0a0'); r(c, 132, 136, 56, 2, '#b8b0a0');
    r(c, 158, 142, 3, 14, '#2a2a2e');
    nieve(c, t, { x: 0, y: 0, w: W, h: H }, 1);
    vineta(c, 160, 100, 70, 220, 0.7);
  };

  // ---------- un barracón por dentro ----------
  Pixel.escenas.barracon = function (c, t, e) {
    r(c, 0, 0, W, H, '#1c1915');
    for (let y = 0; y < 120; y += 8) r(c, 0, y, W, 1, '#161410');
    r(c, 0, 120, W, 60, '#14120f');
    // ventanuco con nieve y el foco que pasa
    r(c, 140, 16, 40, 22, '#0c0d10'); nieve(c, t, { x: 140, y: 16, w: 40, h: 22 }, 0.3);
    if ((t * 0.35) % 1 < 0.18) { c.fillStyle = 'rgba(255,245,215,0.35)'; c.fillRect(140, 16, 40, 22); }
    r(c, 159, 16, 2, 22, '#1c1915');
    // literas a los dos lados
    const g = rng(4);
    for (const lado of [0, 1]) {
      for (let k = 0; k < 3; k++) {
        const x = lado ? 212 + k * 34 : 10 + k * 34;
        for (const y of [60, 96]) {
          r(c, x, y, 30, 4, '#3a3024'); r(c, x, y - 2, 30, 2, '#5a5448');
          r(c, x, y - 34 + 30, 2, 30, '#2a2218'); r(c, x + 28, y - 34 + 30, 2, 30, '#2a2218');
          if (g() < 0.7) { r(c, x + 6, y - 5, 16, 3, '#4a4a52'); r(c, x + 3, y - 6, 4, 3, ['#d4ab8c', '#c9a07f', '#a87858'][Math.floor(g() * 3)]); }
        }
      }
    }
    // la estufa en el centro
    r(c, 150, 96, 20, 26, '#2a2a2e'); r(c, 157, 50, 5, 46, '#222226');
    r(c, 154, 108, 12, 6, Math.sin(t * 7) > 0 ? '#ff7a30' : '#e8602a');
    llama(c, 160, 110, t, 2);
    // presos alrededor de la estufa
    for (let k = 0; k < 4; k++) persona(c, 132 + k * 18 + (k > 1 ? 14 : 0), 140, g(), k, t, '#4a4a52');
    vineta(c, 160, 110, 50, 200, 0.85);
  };

  // ---------- la caseta del registro de la colonia ----------
  Pixel.escenas.oficinaColonia = function (c, t, e) {
    r(c, 0, 0, W, H, '#2a241e');
    for (let x = 0; x < W; x += 12) r(c, x, 0, 1, 110, '#221d18');
    r(c, 0, 110, W, 70, '#1e1a16');
    // ventana: la torre y la nieve
    r(c, 8, 18, 68, 58, '#0e0f12'); r(c, 10, 20, 64, 54, '#1a1c22');
    r(c, 10, 60, 64, 14, '#b8bcc4');
    r(c, 52, 30, 2, 30, '#15151a'); r(c, 60, 30, 2, 30, '#15151a'); r(c, 49, 26, 16, 5, '#15151a');
    if (Math.sin(t * 0.7) > 0.3) { c.fillStyle = 'rgba(255,245,215,0.12)'; c.fillRect(10, 20, 64, 54); }
    nieve(c, t, { x: 10, y: 20, w: 64, h: 54 }, 0.5);
    r(c, 41, 20, 2, 54, '#0e0f12'); r(c, 10, 46, 64, 2, '#0e0f12');
    // el retrato del Canciller, torcido
    r(c, 90, 20, 28, 34, '#4a3a20'); r(c, 92, 22, 24, 30, '#6a5a44');
    r(c, 99, 28, 10, 10, '#c9ae90'); r(c, 99, 27, 10, 3, '#e0dcd4'); r(c, 96, 38, 16, 14, '#141416');
    // ficheros de madera
    for (let k = 0; k < 3; k++) {
      const ax = 176 + k * 44;
      r(c, ax, 40, 40, 70, '#3a3026');
      for (let d = 0; d < 5; d++) { r(c, ax + 2, 43 + d * 13, 36, 11, '#46392c'); r(c, ax + 17, 47 + d * 13, 6, 2, '#8a7a60'); }
    }
    // estufa y lámpara de aceite
    r(c, 132, 84, 18, 22, '#2a2a2e'); r(c, 137, 40, 5, 44, '#222226'); r(c, 136, 94, 10, 5, '#e8602a');
    llama(c, 141, 96, t, 1.5);
    // quien vigila, de pie detrás de Elías (la Inspectora, el capataz...)
    if (e && e.brandtDetras && window.PERSONAJES) {
      c.save(); c.translate(124, 38); c.scale(2, 2);
      figura(c, 6, 0, (PERSONAJES[e.vigilante] || PERSONAJES.rusk).retrato);
      c.restore();
    }
    r(c, 0, 104, 152, 76, '#3a2e22'); r(c, 0, 104, 152, 2, '#4d3e2e');
    r(c, 118, 94, 6, 10, '#8a6a30'); llama(c, 121, 93, t, 1, 3);
  };

  // ---------- el tren: la locomotora por la llanura nevada (exterior) ----------
  Pixel.escenas.trenNieve = function (c, t, e) {
    ['#12141a', '#15171d', '#191b21', '#1d1f25'].forEach((col, i) => r(c, 0, i * 28, W, 28, col));
    // montes lejanos y postes que pasan
    for (let x = 0; x < W; x++) r(c, x, 92 + Math.round(Math.sin(x / 40) * 6 + Math.sin(x / 13) * 2), 1, 30, '#1e2128');
    r(c, 0, 112, W, 68, '#c4c8d0');
    const avance = (t * 60) % 80;
    for (let k = -1; k < 5; k++) { const px = k * 80 - avance + 40; r(c, px, 70, 2, 44, '#2a2c32'); r(c, px - 6, 74, 14, 1, '#2a2c32'); }
    for (let x = 0; x < W; x++) r(c, x, 72 + Math.round(Math.sin(((x + avance) % 80) / 80 * Math.PI) * 4), 1, 1, '#2a2c32');
    // vías
    r(c, 0, 140, W, 2, '#5a5a62'); r(c, 0, 146, W, 2, '#5a5a62');
    for (let x = -((t * 120) % 10); x < W; x += 10) r(c, x, 139, 3, 10, '#4a3a2a');
    // la locomotora y dos vagones
    const lx = 150;
    r(c, lx, 112, 64, 26, '#18181c'); r(c, lx + 44, 100, 20, 38, '#1c1c20');
    r(c, lx + 48, 104, 12, 8, Math.sin(t * 6) > -0.3 ? '#e8a040' : '#b07020');        // la cabina, iluminada por la caldera
    r(c, lx + 8, 102, 8, 10, '#1c1c20'); r(c, lx - 2, 128, 4, 6, '#8a1a20');
    r(c, lx - 70, 116, 66, 22, '#222226'); r(c, lx - 140, 116, 66, 22, '#222226');
    r(c, lx - 70, 114, 66, 3, '#2a2a2e'); r(c, lx - 140, 114, 66, 3, '#2a2a2e');
    for (const rx of [lx + 6, lx + 26, lx + 50, lx - 60, lx - 20, lx - 130, lx - 90]) circulo(c, rx, 139, 4, '#0e0e10');
    r(c, lx + 62, 120, 6, 2, '#fff2c0');                                               // el faro
    c.fillStyle = 'rgba(255,240,190,0.08)'; c.beginPath(); c.moveTo(lx + 68, 120); c.lineTo(W, 104); c.lineTo(W, 150); c.closePath(); c.fill();
    // humo
    for (let k = 0; k < 9; k++) {
      const f = ((t * 0.7 + k / 9) % 1);
      c.fillStyle = `rgba(150,150,160,${0.35 * (1 - f)})`;
      c.fillRect(lx + 10 - f * 120, 96 - f * 40 - Math.sin(f * 6 + k) * 4, 6 + f * 14, 4 + f * 6);
    }
    nieve(c, t * 1.5, { x: 0, y: 0, w: W, h: H }, 1);
    vineta(c, 160, 110, 70, 220, 0.7);
  };

  // ---------- el tren: la cabina por dentro, de noche ----------
  Pixel.escenas.tren = function (c, t, e) {
    r(c, 0, 0, W, H, '#16161a');
    // ventanas: la llanura nevada que pasa
    for (const vx of [20, 220]) {
      r(c, vx, 22, 80, 46, '#0c0d12');
      r(c, vx + 2, 24, 76, 42, '#1a1c24');
      r(c, vx + 2, 52, 76, 14, '#a8acb6');
      const av = (t * 40) % 40;
      for (let px = -av; px < 76; px += 40) r(c, vx + 2 + px, 34, 2, 18, '#2a2c32');
      nieve(c, t * 2, { x: vx + 2, y: 24, w: 76, h: 42 }, 0.4);
      r(c, vx, 22, 80, 2, '#2a2a30');
    }
    // la caldera
    r(c, 128, 40, 64, 84, '#2a2622'); r(c, 132, 44, 56, 76, '#34302a');
    r(c, 146, 86, 28, 22, '#1a1612');
    const brillo = Math.sin(t * 8) > 0 ? '#ff8a30' : '#e86a20';
    r(c, 150, 92, 20, 14, brillo);
    const g = c.createRadialGradient(160, 100, 4, 160, 100, 90);
    g.addColorStop(0, 'rgba(255,150,60,0.25)'); g.addColorStop(1, 'rgba(255,150,60,0)');
    c.fillStyle = g; c.fillRect(70, 20, 180, 160);
    for (let k = 0; k < 5; k++) { r(c, 136 + k * 10, 50, 6, 6, '#8a8a90'); circulo(c, 139 + k * 10, 53, 1, '#d8d0b8'); }
    // suelo y carbón
    r(c, 0, 124, W, 56, '#0e0d0c');
    for (let k = 0; k < 40; k++) r(c, 230 + (k * 37) % 80, 128 + (k * 13) % 18, 4, 3, '#1a1816');
    // Kurt al mando, de espaldas a la ventana
    if (window.PERSONAJES) figura(c, 110, 80, PERSONAJES.kurt.retrato);
    vineta(c, 160, 100, 60, 210, 0.8);
  };

  // ---------- el puesto fronterizo ----------
  Pixel.escenas.frontera = function (c, t, e) {
    r(c, 0, 0, W, H, '#262622');
    for (let x = 0; x < W; x += 14) r(c, x, 0, 1, 110, '#20201c');
    r(c, 0, 110, W, 70, '#1c1c18');
    // ventana: la barrera, el tren parado y la cola en la nieve
    r(c, 8, 18, 68, 58, '#0e0f12'); r(c, 10, 20, 64, 54, '#1e2028');
    r(c, 10, 58, 64, 16, '#b8bcc4');
    r(c, 12, 46, 40, 12, '#18181c'); r(c, 16, 42, 10, 4, '#18181c');                  // el tren
    r(c, 54, 52, 18, 2, '#c8202a'); r(c, 54, 52, 2, 8, '#2a2a2e');                     // la barrera
    for (let k = 0; k < 5; k++) { r(c, 20 + k * 6, 60, 2, 6, '#2a2622'); r(c, 20 + k * 6, 58, 2, 2, '#c49a7c'); }
    nieve(c, t, { x: 10, y: 20, w: 64, h: 54 }, 0.5);
    r(c, 41, 20, 2, 54, '#0e0f12'); r(c, 10, 46, 64, 2, '#0e0f12');
    // el mapa de la frontera y el cartel de la Orden
    r(c, 86, 18, 40, 30, '#8a8270'); r(c, 88, 20, 36, 26, '#a8a08a');
    linea(c, 92, 40, 120, 24, '#6a1420'); linea(c, 100, 44, 104, 22, '#3a3a3a');
    r(c, 132, 18, 26, 36, '#6e0d1a');
    Pixel.solNegro(c, 145, 32, 6, t * 0.2, '#e8d9b0');
    // estanterías con sellos
    for (let k = 0; k < 3; k++) {
      const ax = 176 + k * 44;
      r(c, ax, 30, 40, 80, '#2e2c26');
      for (let d = 0; d < 6; d++) { r(c, ax + 2, 33 + d * 12, 36, 10, '#3a3830'); r(c, ax + 6, 36 + d * 12, 6, 4, '#8a1a20'); r(c, ax + 16, 36 + d * 12, 6, 4, '#2e5a30'); }
    }
    // quien vigila, de pie detrás de Elías
    if (e && e.brandtDetras && window.PERSONAJES) {
      c.save(); c.translate(124, 38); c.scale(2, 2);
      figura(c, 6, 0, (PERSONAJES[e.vigilante] || PERSONAJES.guardia).retrato);
      c.restore();
    }
    // la mesa y una estufa de petróleo
    r(c, 0, 104, 152, 76, '#3a3226'); r(c, 0, 104, 152, 2, '#4d4232');
    r(c, 120, 92, 8, 12, '#3a3a40'); llama(c, 124, 92, t, 1, 7);
  };

  // ---------- Ostra: la ciudad muerta de la tierra de nadie ----------
  const RUINAS = (() => {
    const g = rng(61), out = [];
    for (let x = -4; x < W + 10;) {
      const w = 14 + Math.floor(g() * 22), h = 30 + Math.floor(g() * 70);
      const huecos = [];
      for (let k = 0; k < 6; k++) huecos.push([Math.floor(g() * (w - 6)), Math.floor(g() * (h - 10)), 3 + Math.floor(g() * 5), 3 + Math.floor(g() * 6)]);
      out.push({ x, w, h, roto: Math.floor(g() * 14), huecos });
      x += w + 2 + Math.floor(g() * 6);
    }
    return out;
  })();
  Pixel.escenas.ostra = function (c, t, e) {
    ['#14141a', '#17171d', '#1b1a20', '#1f1d22'].forEach((col, i) => r(c, 0, i * 30, W, 30, col));
    // edificios destrozados, sin una luz eléctrica
    for (const b of RUINAS) {
      const top = 140 - b.h;
      r(c, b.x, top + b.roto, b.w, b.h - b.roto, '#0e0e12');
      r(c, b.x, top + b.roto, Math.floor(b.w / 2), 2, '#0e0e12');
      for (const [hx, hy, hw, hh] of b.huecos) r(c, b.x + hx, top + b.roto + hy, hw, hh, '#1f1d22');
    }
    // el puente volado y el río helado
    r(c, 0, 140, W, 40, '#bcc0c8');
    r(c, 0, 150, W, 8, '#8a909a');
    r(c, 30, 134, 90, 4, '#26262c'); r(c, 170, 134, 120, 4, '#26262c');
    for (const px of [40, 70, 100, 190, 230, 270]) r(c, px, 138, 4, 14, '#26262c');
    linea(c, 120, 134, 132, 150, '#26262c'); linea(c, 170, 134, 158, 152, '#26262c');
    // hogueras entre las ruinas y gente sin número
    const g = rng(8);
    for (const [bx, n] of [[60, 4], [208, 6], [292, 3]]) {
      llama(c, bx, 128, t, 2, bx);
      for (let k = 0; k < n; k++) persona(c, bx - 12 + k * 6, 140, g(), k, t);
    }
    nieve(c, t, { x: 0, y: 0, w: W, h: H }, 0.8);
    vineta(c, 160, 100, 70, 220, 0.75);
  };

  // ---------- la caseta de la puerta del refugio de Ostra ----------
  Pixel.escenas.puestoOstra = function (c, t, e) {
    r(c, 0, 0, W, H, '#221e1a');
    for (let x = 0; x < W; x += 18) r(c, x, 0, 2, 110, '#1a1714');
    r(c, 0, 110, W, 70, '#181512');
    // ventana: la cola en la nieve, delante de la puerta del refugio
    r(c, 8, 18, 68, 58, '#0e0f12'); r(c, 10, 20, 64, 54, '#1c1c22');
    r(c, 10, 56, 64, 18, '#b8bcc4');
    r(c, 52, 30, 18, 26, '#2a2622'); r(c, 52, 30, 18, 2, '#3a3430');
    const g = rng(19);
    for (let k = 0; k < 7; k++) persona(c, 16 + k * 5, 66, g(), k, t);
    nieve(c, t, { x: 10, y: 20, w: 64, h: 54 }, 0.5);
    r(c, 41, 20, 2, 54, '#0e0f12'); r(c, 10, 46, 64, 2, '#0e0f12');
    // tarros y sacos: lo que hay para comer, contado
    for (let k = 0; k < 3; k++) {
      const ax = 176 + k * 44;
      r(c, ax, 30, 40, 2, '#3a3026'); r(c, ax, 60, 40, 2, '#3a3026'); r(c, ax, 90, 40, 2, '#3a3026');
      for (let j = 0; j < 4; j++) { r(c, ax + 2 + j * 10, 22, 7, 8, '#6a5a40'); r(c, ax + 2 + j * 10, 52, 7, 8, k === 2 && j > 1 ? '#2a2420' : '#5a4a30'); }
      for (let j = 0; j < 3; j++) r(c, ax + 3 + j * 12, 78, 10, 12, '#8a7a5a');
    }
    // un mapa a mano de la ciudad muerta
    r(c, 90, 20, 70, 44, '#a89a7a'); linea(c, 96, 50, 152, 30, '#5a3020'); linea(c, 100, 26, 120, 58, '#3a3a3a');
    r(c, 126, 40, 4, 4, '#a01a20');
    // la mesa y una lámpara de aceite
    r(c, 0, 104, 152, 76, '#3a2e22'); r(c, 0, 104, 152, 2, '#4d3e2e');
    r(c, 120, 94, 6, 10, '#8a6a30'); llama(c, 123, 93, t, 1.2, 5);
  };

  // ---------- la Ciudadela Helios desde fuera ----------
  Pixel.escenas.helios = function (c, t, e) {
    ['#0c0d14', '#10111a', '#15141e', '#1c1820', '#262026', '#33282a'].forEach((col, i) => r(c, 0, i * 22, W, 22, col));
    // el resplandor del núcleo sobre la ceniza
    const g = c.createRadialGradient(160, 60, 4, 160, 60, 150);
    g.addColorStop(0, 'rgba(255,236,190,0.55)'); g.addColorStop(0.35, 'rgba(255,190,110,0.18)'); g.addColorStop(1, 'rgba(255,190,110,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, 140);
    // el haz que sube desde la aguja central
    const pulso = 0.75 + Math.sin(t * 2) * 0.15;
    c.fillStyle = `rgba(255,244,214,${0.18 * pulso})`; c.fillRect(156, 0, 8, 40);
    c.fillStyle = `rgba(255,250,235,${0.5 * pulso})`; c.fillRect(159, 0, 2, 40);
    // líneas de alta tensión hacia el resto del mundo
    for (const [x1, y1] of [[0, 150], [0, 128], [320, 150], [320, 126], [60, 180], [262, 180]]) linea(c, 160, 104, x1, y1, '#3a3036');
    for (const [px, py] of [[34, 141], [96, 122], [226, 122], [290, 140]]) { r(c, px, py - 16, 2, 16, '#2a2228'); r(c, px - 4, py - 16, 10, 2, '#2a2228'); }
    // el núcleo: un zigurat de hormigón y la aguja
    r(c, 128, 70, 64, 30, '#2e2a30'); r(c, 136, 58, 48, 12, '#36313a'); r(c, 146, 48, 28, 10, '#3e3842');
    r(c, 157, 38, 6, 10, '#4a4250'); r(c, 158, 40, 4, 6, '#fff2d0');
    for (let k = 0; k < 8; k++) r(c, 132 + k * 7, 76, 3, 2, Math.sin(t * 3 + k) > -0.2 ? '#ffd890' : '#6a5030');
    // segundo anillo
    r(c, 82, 96, 156, 16, '#26222a'); r(c, 82, 96, 156, 2, '#38323c');
    for (let k = 0; k < 6; k++) { r(c, 90 + k * 28, 88, 6, 10, '#2c2830'); r(c, 92 + k * 28, 89, 2, 2, '#ffcf80'); }
    // anillo exterior: muralla, torres y sus luces rojas
    r(c, 18, 112, 284, 22, '#1c1a20'); r(c, 18, 112, 284, 2, '#2e2a32');
    for (let k = 0; k < 12; k++) {
      const tx = 22 + k * 25;
      r(c, tx, 100, 8, 14, '#201e24');
      if (Math.sin(t * 2.2 + k * 1.7) > 0) r(c, tx + 3, 101, 2, 2, '#ff3344');
    }
    // el lema sobre la puerta, en letras que se leen desde el tren
    r(c, 128, 116, 64, 8, '#3a3236');
    for (let k = 0; k < 14; k++) r(c, 131 + k * 4, 118, 3, 4, '#e8d8b0');
    // la nieve y la vía del río, que entra por la izquierda
    r(c, 0, 150, W, 30, '#b8bcc6'); r(c, 0, 134, W, 16, '#9aa0aa');
    r(c, 0, 146, 150, 2, '#2a2a30'); r(c, 0, 150, 150, 2, '#2a2a30');
    for (let x = 2; x < 150; x += 8) r(c, x, 146, 2, 6, '#3a3038');
    nieve(c, t, { x: 0, y: 0, w: W, h: H }, 0.6);
    vineta(c, 160, 90, 80, 220, 0.7);
  };

  // ---------- la oficina de turnos y pases del anillo interior ----------
  Pixel.escenas.oficinaHelios = function (c, t, e) {
    r(c, 0, 0, W, H, '#2c2e32');
    for (let y = 0; y < 110; y += 10) r(c, 0, y, W, 1, '#26282c');
    r(c, 0, 110, W, 70, '#202226');
    // un fluorescente que parpadea
    r(c, 30, 4, 90, 3, Math.sin(t * 13) > -0.95 ? '#e8f0f0' : '#8a9090');
    c.fillStyle = 'rgba(220,240,240,0.05)'; c.fillRect(0, 0, W, 110);
    // ventana: el núcleo encendido
    r(c, 8, 18, 68, 58, '#0e0f12'); r(c, 10, 20, 64, 54, '#1e1820');
    const g = c.createRadialGradient(42, 40, 2, 42, 40, 40);
    g.addColorStop(0, 'rgba(255,236,190,0.7)'); g.addColorStop(1, 'rgba(255,190,110,0)');
    c.fillStyle = g; c.fillRect(10, 20, 64, 54);
    r(c, 28, 50, 28, 24, '#2e2a30'); r(c, 34, 42, 16, 8, '#36313a'); r(c, 40, 30, 4, 12, '#4a4250'); r(c, 41, 31, 2, 3, '#fff2d0');
    r(c, 41, 20, 2, 54, '#0e0f12'); r(c, 10, 46, 64, 2, '#0e0f12');
    // el mapa de la red: puntos encendidos y uno apagado (Madrid)
    r(c, 88, 16, 74, 52, '#14161a'); r(c, 90, 18, 70, 48, '#1a1e24');
    const gr = rng(41);
    for (let k = 0; k < 34; k++) {
      const x = 92 + Math.floor(gr() * 66), y = 20 + Math.floor(gr() * 44);
      r(c, x, y, 2, 2, Math.sin(t * 1.5 + k) > -0.6 ? '#ffd890' : '#8a6a30');
    }
    r(c, 96, 52, 3, 3, '#4a1a1e');
    // armarios de relés
    for (let k = 0; k < 3; k++) {
      const ax = 176 + k * 44;
      r(c, ax, 26, 40, 84, '#3a3e44'); r(c, ax + 2, 28, 36, 80, '#33363c');
      for (let d = 0; d < 6; d++) for (let j = 0; j < 4; j++)
        r(c, ax + 6 + j * 8, 34 + d * 12, 3, 3, (Math.sin(t * 4 + d * 3 + j + k) > 0.2) ? '#66e08a' : '#2a4a32');
    }
    // quien vigila: el ingeniero jefe o la Inspectora
    if (e && e.brandtDetras && window.PERSONAJES) {
      c.save(); c.translate(124, 38); c.scale(2, 2);
      figura(c, 6, 0, (PERSONAJES[e.vigilante] || PERSONAJES.dorn).retrato);
      c.restore();
    }
    // la mesa de metal y un flexo
    r(c, 0, 104, 152, 76, '#4a4e54'); r(c, 0, 104, 152, 2, '#5e626a');
    r(c, 122, 84, 2, 20, '#2a2c30'); r(c, 116, 82, 12, 4, '#2a2c30');
    c.fillStyle = 'rgba(255,250,220,0.10)'; c.fillRect(100, 86, 44, 18);
  };

  // ---------- los talleres bajo el anillo exterior ----------
  Pixel.escenas.talleres = function (c, t, e) {
    r(c, 0, 0, W, H, '#16141a');
    // tuberías del techo
    for (const [y, col] of [[8, '#3a3236'], [16, '#2e2a30'], [22, '#4a3a30']]) r(c, 0, y, W, 4, col);
    for (let x = 20; x < W; x += 46) r(c, x, 6, 4, 22, '#26222a');
    // la bobina del fondo, que late
    const lat = 0.5 + Math.sin(t * 3) * 0.5;
    const g = c.createRadialGradient(232, 74, 4, 232, 74, 70);
    g.addColorStop(0, `rgba(170,210,255,${0.35 + lat * 0.2})`); g.addColorStop(1, 'rgba(170,210,255,0)');
    c.fillStyle = g; c.fillRect(150, 10, 170, 130);
    r(c, 204, 40, 56, 70, '#22262e');
    for (let k = 0; k < 8; k++) r(c, 206, 44 + k * 8, 52, 4, k % 2 ? '#3a4a5e' : '#2e3a4a');
    r(c, 226, 30, 12, 10, '#2a2e36'); r(c, 229, 32, 6, 6, `rgba(210,235,255,${0.5 + lat * 0.5})`);
    // literas
    for (let k = 0; k < 3; k++) {
      const lx = 10 + k * 46;
      r(c, lx, 60, 40, 3, '#4a3a2e'); r(c, lx, 92, 40, 3, '#4a3a2e');
      r(c, lx, 56, 3, 52, '#3a2e24'); r(c, lx + 37, 56, 3, 52, '#3a2e24');
      r(c, lx + 4, 55, 30, 5, '#5a5048'); r(c, lx + 4, 87, 30, 5, '#5a5048');
    }
    // la gente que hace la luz y nunca la tiene
    const gp = rng(23);
    for (let k = 0; k < 9; k++) persona(c, 30 + k * 22, 150, gp(), k, t, k % 3 ? '#3a3e44' : null);
    // banco de trabajo y una bombilla robada
    r(c, 120, 124, 70, 6, '#4a3a2e'); r(c, 124, 130, 4, 20, '#3a2e24'); r(c, 182, 130, 4, 20, '#3a2e24');
    r(c, 152, 104, 1, 10, '#222'); r(c, 150, 114, 5, 5, '#ffe6a0');
    const b = c.createRadialGradient(152, 116, 1, 152, 116, 30);
    b.addColorStop(0, 'rgba(255,230,160,0.35)'); b.addColorStop(1, 'rgba(255,230,160,0)');
    c.fillStyle = b; c.fillRect(120, 86, 64, 60);
    r(c, 0, 158, W, 22, '#1e1c22');
    vineta(c, 160, 100, 80, 220, 0.6);
  };

  // ---------- la Sala de la Llave ----------
  Pixel.escenas.salaLlave = function (c, t, e) {
    r(c, 0, 0, W, H, '#0a0b10');
    // el anillo de luz suspendido
    const lat = 0.6 + Math.sin(t * 1.6) * 0.4;
    const g = c.createRadialGradient(160, 54, 10, 160, 54, 110);
    g.addColorStop(0, `rgba(255,244,220,${0.25 + lat * 0.15})`); g.addColorStop(1, 'rgba(255,220,170,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, 140);
    c.strokeStyle = `rgba(255,236,200,${0.7 + lat * 0.3})`; c.lineWidth = 3;
    c.beginPath(); c.ellipse(160, 54, 70, 16, 0, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = 'rgba(255,200,140,0.35)'; c.lineWidth = 1;
    c.beginPath(); c.ellipse(160, 54, 78, 20, 0, 0, Math.PI * 2); c.stroke();
    // cables que bajan del anillo
    for (const x of [96, 128, 192, 224]) linea(c, x, 64, x + (x < 160 ? -16 : 16), 132, '#2a2630');
    // el suelo y el círculo
    r(c, 0, 132, W, 48, '#14141a');
    c.strokeStyle = 'rgba(255,220,170,0.25)'; c.beginPath(); c.ellipse(160, 150, 120, 18, 0, 0, Math.PI * 2); c.stroke();
    // los dos pedestales: la voz (azul) y la sangre (rojo)
    for (const [px, col, luz] of [[118, '#9ad0ff', 'rgba(154,208,255,'], [202, '#ff8a7a', 'rgba(255,138,122,']]) {
      c.fillStyle = luz + (0.08 + lat * 0.08) + ')'; c.fillRect(px - 16, 96, 32, 16);
      r(c, px - 10, 112, 20, 30, '#2a2a32'); r(c, px - 12, 108, 24, 5, '#3a3a44');
      r(c, px - 6, 104, 12, 4, col);
    }
    // la rejilla del micrófono (izquierda) y la palma (derecha)
    for (let k = 0; k < 4; k++) r(c, 114 + k * 2, 105, 1, 2, '#1a2a3a');
    r(c, 199, 104, 6, 3, '#4a1a1a'); r(c, 198, 103, 1, 2, '#4a1a1a'); r(c, 205, 103, 1, 2, '#4a1a1a');
    vineta(c, 160, 90, 70, 200, 0.8);
  };

  // ---------- el archivo de la Fundación Lumen (nivel 0) ----------
  Pixel.escenas.archivoLumen = function (c, t, e) {
    r(c, 0, 0, W, H, '#24262a');
    for (let y = 0; y < 110; y += 12) r(c, 0, y, W, 1, '#1e2024');
    r(c, 0, 110, W, 70, '#1a1c20');
    // la puerta a la Sala de la Llave, con su luz por debajo
    r(c, 14, 16, 56, 92, '#1a1a20'); r(c, 18, 20, 48, 86, '#2a2c34');
    r(c, 58, 60, 4, 6, '#8a8a90');
    c.fillStyle = `rgba(255,236,200,${0.25 + Math.sin(t * 1.6) * 0.1})`; c.fillRect(18, 104, 48, 3);
    r(c, 26, 28, 32, 8, '#3a3c44'); for (let k = 0; k < 6; k++) r(c, 29 + k * 5, 31, 3, 2, '#c8c0a0');
    // estanterías con cajas fechadas
    const g = rng(57);
    for (let k = 0; k < 4; k++) {
      const ax = 84 + k * 58;
      r(c, ax, 14, 52, 96, '#3a3e44');
      for (let d = 0; d < 4; d++) {
        r(c, ax + 2, 36 + d * 24, 48, 2, '#2a2e34');
        for (let j = 0; j < 4; j++) {
          const alto = 14 + Math.floor(g() * 6);
          r(c, ax + 3 + j * 12, 36 + d * 24 - alto, 11, alto, ['#8a7a5a', '#7a6a4a', '#9a8a6a'][Math.floor(g() * 3)]);
          r(c, ax + 5 + j * 12, 36 + d * 24 - alto + 3, 7, 2, '#e8e0c8');
        }
      }
    }
    // polvo en la luz del flexo
    c.fillStyle = 'rgba(255,250,220,0.5)';
    for (let k = 0; k < 10; k++) c.fillRect(100 + ((k * 13 + t * 4) % 40), 70 + ((k * 7 + t * 2) % 30), 1, 1);
    // la mesa y el flexo
    r(c, 0, 104, 152, 76, '#4a4e54'); r(c, 0, 104, 152, 2, '#5e626a');
    r(c, 122, 84, 2, 20, '#2a2c30'); r(c, 116, 82, 12, 4, '#2a2c30');
    c.fillStyle = 'rgba(255,250,220,0.12)'; c.fillRect(100, 86, 44, 18);
  };
})();

// ============================================================
//  PIXEL — dibujo de escenas y retratos en pixel art.
//  Lienzo interno de 320x180, escalado sin suavizado.
// ============================================================

const Pixel = (() => {
  const W = 320, H = 180;

  // ---------- utilidades ----------
  function rng(seed) {
    let s = (Math.imul(seed | 0, 2654435761) >>> 0) || 1;
    return () => {
      s ^= s << 13; s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function r(ctx, x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function linea(ctx, x0, y0, x1, y1, c) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    ctx.fillStyle = c;
    const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    const dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (let n = 0; n < 1000; n++) {
      ctx.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  function circulo(ctx, cx, cy, rad, c) {
    ctx.fillStyle = c;
    for (let dy = -rad; dy <= rad; dy++) {
      const dx = Math.floor(Math.sqrt(rad * rad - dy * dy));
      ctx.fillRect(Math.round(cx - dx), Math.round(cy + dy), dx * 2 + 1, 1);
    }
  }

  function oscurecer(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const k = 1 - f;
    const R = Math.round(((n >> 16) & 255) * k);
    const G = Math.round(((n >> 8) & 255) * k);
    const B = Math.round((n & 255) * k);
    return `rgb(${R},${G},${B})`;
  }

  // ---------- elementos comunes ----------
  function solNegro(ctx, cx, cy, rad, t, corona = '#c3142d') {
    const n = 12;
    const largo = rad * (0.5 + 0.08 * Math.sin(t * 2));
    for (let i = 0; i < n; i++) {
      const a = i * Math.PI * 2 / n + t * 0.05;
      const b = a + 0.12;
      linea(ctx, cx + Math.cos(a) * rad, cy + Math.sin(a) * rad,
        cx + Math.cos(a) * (rad + largo), cy + Math.sin(a) * (rad + largo), corona);
      if (rad > 6) {
        linea(ctx, cx + Math.cos(b) * rad, cy + Math.sin(b) * rad,
          cx + Math.cos(a) * (rad + largo), cy + Math.sin(a) * (rad + largo), corona);
      }
    }
    circulo(ctx, cx, cy, rad + 1, corona);
    circulo(ctx, cx, cy, rad, '#050505');
  }

  const gotas = (() => {
    const g = rng(99);
    return Array.from({ length: 180 }, () => ({ x: g() * W, y: g() * H, v: 110 + g() * 90 }));
  })();

  function lluvia(ctx, t, zona = { x: 0, y: 0, w: W, h: H }, densidad = 1, color = 'rgba(150,165,200,0.35)') {
    const n = Math.floor(gotas.length * densidad);
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      const g = gotas[i];
      const y = (g.y + t * g.v) % zona.h;
      const x = (((g.x - (g.y + t * g.v) * 0.25) % zona.w) + zona.w) % zona.w;
      ctx.fillRect(Math.round(zona.x + x), Math.round(zona.y + y), 1, 3);
    }
  }

  function crearSkyline(seed, minH, maxH) {
    const g = rng(seed);
    const edificios = [];
    let x = -6;
    while (x < W + 6) {
      const w = 8 + Math.floor(g() * 18);
      const h = minH + Math.floor(g() * (maxH - minH));
      const ventanas = [];
      for (let wy = 4; wy < h - 4; wy += 5) {
        for (let wx = 2; wx < w - 2; wx += 4) {
          if (g() < 0.1) ventanas.push([wx, wy, g()]);
        }
      }
      const antena = g() < 0.25;
      edificios.push({ x, w, h, ventanas, antena });
      x += w + (g() < 0.3 ? 1 : 0);
    }
    return edificios;
  }

  function dibujarSkyline(ctx, sk, base, color, t, luz) {
    for (const b of sk) {
      r(ctx, b.x, base - b.h, b.w, b.h, color);
      if (b.antena) r(ctx, b.x + (b.w >> 1), base - b.h - 5, 1, 5, color);
      for (const [wx, wy, ph] of b.ventanas) {
        if (Math.sin(t * 0.4 + ph * 60) > -0.7) r(ctx, b.x + wx, base - b.h + wy, 1, 2, luz);
      }
    }
  }

  function aguja(ctx, cx, top, base, t, color = '#08080b') {
    for (let y = top; y < base; y++) {
      const w = 1 + Math.floor((y - top) * 0.11);
      r(ctx, cx - (w >> 1), y, w, 1, color);
    }
    // plataformas
    for (let k = 1; k <= 4; k++) {
      const y = top + Math.floor((base - top) * k / 5);
      const w = 5 + Math.floor((y - top) * 0.11);
      r(ctx, cx - (w >> 1), y, w, 2, color);
      if (Math.sin(t * 3 + k) > 0.2) r(ctx, cx - (w >> 1), y, 1, 1, '#ff3040');
    }
    // luz de la cima
    if (Math.sin(t * 2.5) > 0) {
      r(ctx, cx, top - 2, 1, 2, '#ff2a3a');
      ctx.fillStyle = 'rgba(255,40,60,0.25)';
      ctx.fillRect(cx - 2, top - 4, 5, 5);
    }
    // anillo de luz blanca (única luz constante de la ciudad)
    const ay = top + Math.floor((base - top) * 0.22);
    r(ctx, cx - 3, ay, 7, 1, '#f6e7c1');
    ctx.fillStyle = 'rgba(246,231,193,0.08)';
    ctx.fillRect(cx - 14, ay - 6, 29, 13);
  }

  function dron(ctx, x, y, t, foco = false) {
    r(ctx, x - 2, y, 5, 1, '#2a2a30');
    r(ctx, x - 1, y - 1, 3, 1, '#3a3a42');
    r(ctx, x - 3, y - 1, 1, 1, '#555');
    r(ctx, x + 3, y - 1, 1, 1, '#555');
    if (Math.sin(t * 8) > 0) r(ctx, x, y + 1, 1, 1, '#ff2a3a');
    if (foco) {
      ctx.fillStyle = 'rgba(255,240,210,0.07)';
      ctx.beginPath();
      ctx.moveTo(x, y + 1);
      ctx.lineTo(x - 14, y + 60);
      ctx.lineTo(x + 14, y + 60);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Figura de cuerpo entero (x = centro, y = coronilla)
  function figura(ctx, x, y, p) {
    const piel = p.piel || '#c9a07f', pelo = p.pelo || '#222', ropa = p.ropa || '#333';
    const ropaS = oscurecer(ropa, 0.35);
    // piernas
    r(ctx, x - 4, y + 21, 3, 10, '#121216');
    r(ctx, x + 1, y + 21, 3, 10, '#121216');
    // cuerpo y brazos
    r(ctx, x - 5, y + 7, 10, 15, ropa);
    r(ctx, x + 2, y + 7, 3, 15, ropaS);
    r(ctx, x - 6, y + 8, 1, 11, ropaS);
    r(ctx, x + 5, y + 8, 1, 11, ropaS);
    r(ctx, x - 6, y + 19, 1, 2, piel);
    r(ctx, x + 5, y + 19, 1, 2, piel);
    // cuello y cabeza
    r(ctx, x - 1, y + 6, 2, 1, piel);
    r(ctx, x - 3, y, 6, 6, piel);
    r(ctx, x + 1, y, 2, 6, oscurecer(piel, 0.2));
    // pelo
    r(ctx, x - 3, y - 1, 6, 2, pelo);
    if (p.estilo === 'largo') { r(ctx, x - 4, y, 1, 9, pelo); r(ctx, x + 3, y, 1, 9, pelo); }
    if (p.estilo === 'moño') r(ctx, x - 1, y - 3, 3, 2, pelo);
    if (p.estilo === 'despeinado') { r(ctx, x - 4, y - 2, 1, 2, pelo); r(ctx, x + 2, y - 2, 2, 1, pelo); r(ctx, x - 4, y, 1, 3, pelo); }
    // ojos
    r(ctx, x - 2, y + 3, 1, 1, '#111');
    r(ctx, x + 1, y + 3, 1, 1, '#111');
  }

  function vineta(ctx, cx, cy, r0, r1, alfa = 0.85) {
    const g = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, `rgba(0,0,0,${alfa})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // ---------- escenas ----------
  const skyLejos = crearSkyline(3, 20, 55);
  const skyCerca = crearSkyline(11, 30, 80);
  const ladrillos = (() => {
    const g = rng(5);
    const out = [];
    const cols = ['#3a2520', '#34211c', '#40291f', '#2f1d18'];
    for (let y = 0; y < 130; y += 6) {
      const off = (y / 6) % 2 ? 7 : 0;
      for (let x = -14; x < W; x += 14) out.push([x + off, y, cols[Math.floor(g() * cols.length)]]);
    }
    return out;
  })();
  const polvo = (() => {
    const g = rng(21);
    return Array.from({ length: 30 }, () => ({ x: g() * 120 + 100, y: g() * 90 + 20, v: 0.5 + g(), f: g() * 6 }));
  })();

  const escenas = {
    negro(ctx, t) {
      r(ctx, 0, 0, W, H, '#050507');
      lluvia(ctx, t, undefined, 0.3, 'rgba(120,130,160,0.15)');
    },

    titulo(ctx, t) {
      // cielo por bandas
      const bandas = ['#060609', '#08080d', '#0b0a10', '#0f0c12', '#140d13', '#1a0e14', '#200f16'];
      bandas.forEach((c, i) => r(ctx, 0, i * 18, W, 18, c));
      r(ctx, 0, 126, W, 54, '#200f16');
      // sol negro
      solNegro(ctx, 160, 52, 20, t);
      // focos
      for (const [bx, fase] of [[70, 0], [250, 2]]) {
        const a = -Math.PI / 2 + Math.sin(t * 0.4 + fase) * 0.6;
        ctx.fillStyle = 'rgba(240,230,200,0.05)';
        ctx.beginPath();
        ctx.moveTo(bx, 180);
        ctx.lineTo(bx + Math.cos(a - 0.06) * 260, 180 + Math.sin(a - 0.06) * 260);
        ctx.lineTo(bx + Math.cos(a + 0.06) * 260, 180 + Math.sin(a + 0.06) * 260);
        ctx.closePath();
        ctx.fill();
      }
      dibujarSkyline(ctx, skyLejos, 150, '#120a0f', t, '#3a2a18');
      aguja(ctx, 160, 78, 180, t);
      dibujarSkyline(ctx, skyCerca, 185, '#07060a', t, '#6a5020');
      // drones
      dron(ctx, (t * 14) % 360 - 20, 96, t);
      dron(ctx, 340 - (t * 9) % 380, 70, t);
      lluvia(ctx, t);
    },

    apartamento(ctx, t) {
      r(ctx, 0, 0, W, H, '#16181d');
      // paredes con papel gastado
      for (let x = 0; x < W; x += 16) r(ctx, x, 0, 1, 130, '#1a1d23');
      r(ctx, 0, 130, W, 50, '#101114');
      r(ctx, 0, 129, W, 1, '#24262c');
      // ventana
      r(ctx, 230, 24, 60, 56, '#0a0a0e');
      r(ctx, 232, 26, 56, 52, '#12131a');
      dibujarSkylineRecorte(ctx, t);
      lluvia(ctx, t, { x: 232, y: 26, w: 56, h: 52 }, 0.35);
      r(ctx, 259, 26, 2, 52, '#0a0a0e');
      r(ctx, 232, 51, 56, 2, '#0a0a0e');
      // foco que barre por la ventana
      const fx = 232 + ((t * 20) % 120) - 30;
      if (fx > 232 && fx < 286) {
        ctx.fillStyle = 'rgba(255,245,210,0.12)';
        ctx.fillRect(Math.round(fx), 26, 6, 52);
      }
      // telepantalla
      r(ctx, 118, 30, 70, 46, '#0c0c0c');
      const parpadeo = 0.9 + 0.1 * Math.sin(t * 30);
      r(ctx, 121, 33, 64, 40, '#4a0a12');
      solNegro(ctx, 153, 51, 9, t);
      for (let y = 33; y < 73; y += 2) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(121, y, 64, 1); }
      ctx.fillStyle = `rgba(255,50,70,${0.06 * parpadeo})`;
      ctx.fillRect(60, 20, 190, 110);
      // cama
      r(ctx, 12, 104, 80, 26, '#2a2c33');
      r(ctx, 12, 100, 20, 8, '#8c8a82');
      r(ctx, 12, 128, 80, 4, '#15161a');
      // mesa, taza y silla
      r(ctx, 130, 108, 40, 3, '#3a2b22');
      r(ctx, 132, 111, 2, 19, '#2b2019');
      r(ctx, 166, 111, 2, 19, '#2b2019');
      r(ctx, 146, 104, 4, 4, '#c7c1b5');
      r(ctx, 180, 100, 3, 30, '#2b2019');
      r(ctx, 180, 112, 14, 3, '#3a2b22');
      r(ctx, 191, 112, 3, 18, '#2b2019');
      vineta(ctx, 153, 60, 40, 200, 0.7);
    },

    oficina(ctx, t, e) {
      r(ctx, 0, 0, W, H, '#23252b');
      for (let x = 0; x < W; x += 30) r(ctx, x, 12, 1, 100, '#1d1f24');
      r(ctx, 0, 76, W, 1, '#1b1d22');
      r(ctx, 0, 110, W, 70, '#1a1b1f');
      // ventana
      r(ctx, 8, 18, 68, 58, '#0e0f12');
      r(ctx, 10, 20, 64, 54, '#3a3f48');
      r(ctx, 10, 20, 64, 18, '#30343c');
      r(ctx, 10, 38, 64, 16, '#353941');
      aguja(ctx, 50, 26, 74, t, '#1c1d22');
      for (let i = 0; i < 6; i++) r(ctx, 10 + i * 11, 60 - (i * 7 % 10), 10, 20, '#262930');
      dron(ctx, 10 + ((t * 10) % 80), 34, t);
      lluvia(ctx, t, { x: 10, y: 20, w: 64, h: 54 }, 0.4, 'rgba(200,210,230,0.3)');
      r(ctx, 41, 20, 2, 54, '#0e0f12');
      r(ctx, 10, 46, 64, 2, '#0e0f12');
      // cartel de propaganda
      r(ctx, 86, 20, 36, 50, '#6e0d1a');
      r(ctx, 86, 20, 36, 1, '#8a1424');
      solNegro(ctx, 104, 38, 8, t * 0.2, '#e8d9b0');
      r(ctx, 92, 56, 24, 2, '#e8d9b0');
      r(ctx, 95, 60, 18, 1, '#e8d9b0');
      r(ctx, 97, 63, 14, 1, '#e8d9b0');
      // lámpara de mesa
      r(ctx, 128, 86, 3, 18, '#1b2b20');
      r(ctx, 122, 80, 15, 6, '#2f5a3a');
      ctx.fillStyle = 'rgba(232,193,112,0.10)';
      ctx.beginPath(); ctx.moveTo(122, 86); ctx.lineTo(137, 86); ctx.lineTo(150, 112); ctx.lineTo(108, 112); ctx.fill();
      // archivadores
      for (let k = 0; k < 4; k++) {
        const ax = 170 + k * 36;
        r(ctx, ax, 44, 32, 66, '#2c2f36');
        r(ctx, ax + 30, 44, 2, 66, '#23252b');
        for (let d = 0; d < 4; d++) {
          r(ctx, ax + 2, 47 + d * 16, 26, 13, '#343841');
          r(ctx, ax + 11, 52 + d * 16, 8, 2, '#8a8a90');
          r(ctx, ax + 12, 49 + d * 16, 6, 2, '#b8b0a0');
        }
      }
      // reloj de pared
      circulo(ctx, 190, 26, 7, '#d8d0b8');
      circulo(ctx, 190, 26, 6, '#e8e2d0');
      const hAng = ((e && e.hora) || 8) / 12 * Math.PI * 2 - Math.PI / 2;
      linea(ctx, 190, 26, 190 + Math.cos(hAng) * 3, 26 + Math.sin(hAng) * 3, '#111');
      const mAng = t * 0.5 - Math.PI / 2;
      linea(ctx, 190, 26, 190 + Math.cos(mAng) * 5, 26 + Math.sin(mAng) * 5, '#555');
      // Brandt, de pie detrás de Elías durante la auditoría
      if (e && e.brandtDetras && window.PERSONAJES) {
        ctx.save();
        ctx.translate(124, 38);
        ctx.scale(2, 2);
        figura(ctx, 6, 0, (PERSONAJES[e.vigilante] || PERSONAJES.brandt).retrato);
        ctx.restore();
      }
      // mesa
      r(ctx, 0, 104, 152, 76, '#3a2b22');
      r(ctx, 0, 104, 152, 2, '#4d3a2e');
      // cámara (el Ojo)
      const est = (e && e.ojo) || 'desviado';
      r(ctx, 138, 12, 4, 5, '#3c3c42');
      circulo(ctx, 140, 20, 5, '#2b2b31');
      r(ctx, 135, 18, 11, 1, '#3a3a41');
      let lx = 140, ly = 23, lc = '#553a3a';
      if (est === 'mirando') { lx = 142; ly = 23; lc = '#ff2a3a'; }
      else if (est === 'aviso') { lx = 141; ly = 23; lc = Math.sin(t * 20) > 0 ? '#ffcc33' : '#6a5010'; }
      else { lx = 136; ly = 21; }
      r(ctx, lx - 1, ly - 1, 3, 3, '#111');
      r(ctx, lx, ly, 1, 1, lc);
      if (est === 'mirando') {
        ctx.fillStyle = 'rgba(255,40,60,0.10)';
        ctx.beginPath(); ctx.moveTo(141, 24); ctx.lineTo(320, 150); ctx.lineTo(320, 60); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(255,40,60,0.25)';
        ctx.fillRect(lx - 2, ly - 2, 5, 5);
      } else if (est === 'desviado') {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.beginPath(); ctx.moveTo(135, 22); ctx.lineTo(60, 110); ctx.lineTo(100, 110); ctx.closePath(); ctx.fill();
      }
    },

    calle(ctx, t) {
      r(ctx, 0, 0, W, H, '#07070b');
      dibujarSkyline(ctx, skyLejos, 110, '#0d0b12', t, '#2c2214');
      aguja(ctx, 250, 20, 110, t);
      // fachadas cercanas
      r(ctx, 0, 20, 70, 110, '#0f0f14');
      r(ctx, 250, 30, 70, 100, '#0f0f14');
      for (let y = 30; y < 120; y += 14) {
        r(ctx, 10, y, 8, 9, '#18181f'); r(ctx, 40, y, 8, 9, '#18181f');
        r(ctx, 262, y, 8, 9, '#18181f'); r(ctx, 292, y, 8, 9, '#18181f');
      }
      r(ctx, 40, 72, 8, 9, '#6a5020');
      // cartel
      r(ctx, 272, 60, 26, 36, '#5a0b16');
      solNegro(ctx, 285, 74, 5, t * 0.2, '#e8d9b0');
      // suelo mojado
      r(ctx, 0, 130, W, 50, '#0b0b10');
      for (let y = 132; y < 180; y += 3) r(ctx, 0, y, W, 1, '#0e0e14');
      // farola apagada y una encendida
      r(ctx, 110, 60, 2, 70, '#1a1a20');
      r(ctx, 106, 58, 10, 3, '#1a1a20');
      r(ctx, 190, 60, 2, 70, '#1a1a20');
      r(ctx, 186, 58, 10, 3, '#1a1a20');
      const on = Math.sin(t * 13) > -0.9;
      if (on) {
        r(ctx, 188, 61, 6, 1, '#e8c170');
        ctx.fillStyle = 'rgba(232,193,112,0.09)';
        ctx.beginPath(); ctx.moveTo(188, 62); ctx.lineTo(194, 62); ctx.lineTo(215, 130); ctx.lineTo(167, 130); ctx.fill();
        ctx.fillStyle = 'rgba(232,193,112,0.12)';
        ctx.fillRect(186, 132, 10, 46);
      }
      // dron patrullando con foco
      const dx = 160 + Math.sin(t * 0.35) * 120;
      dron(ctx, dx, 50, t, true);
      ctx.fillStyle = 'rgba(255,240,210,0.08)';
      ctx.fillRect(Math.round(dx) - 14, 132, 28, 3);
      lluvia(ctx, t, undefined, 1, 'rgba(150,165,200,0.4)');
      vineta(ctx, 160, 90, 60, 220, 0.8);
    },

    sotano(ctx, t, e) {
      r(ctx, 0, 0, W, H, '#1a110e');
      for (const [x, y, c] of ladrillos) r(ctx, x + 1, y + 1, 12, 5, c);
      r(ctx, 0, 130, W, 50, '#140e0c');
      r(ctx, 0, 129, W, 1, '#2a1c16');
      // estantería y radio
      r(ctx, 20, 70, 50, 3, '#3b2a1e');
      r(ctx, 26, 58, 22, 12, '#2c2a26');
      r(ctx, 28, 60, 8, 8, '#1a1916');
      for (let i = 0; i < 3; i++) r(ctx, 38 + i * 3, 61, 2, 1, '#555');
      if (Math.sin(t * 5) > 0) r(ctx, 44, 66, 1, 1, '#4f4');
      r(ctx, 52, 62, 12, 8, '#6d6452');
      // imprenta de Ruth
      r(ctx, 244, 96, 44, 34, '#2b2723');
      r(ctx, 248, 90, 36, 8, '#3a342d');
      circulo(ctx, 256, 110, 6, '#1a1714');
      r(ctx, 270, 104, 12, 2, '#d8d0b8');
      // personajes detrás de la mesa
      const P = window.PERSONAJES || {};
      const quien = [['mara', 138], ['ruth', 180]];
      const b = (e && e.banderas) || {};
      if (b.tomasSalvado && !b.capturado_tomas) quien.push(['tomas', 214]);
      const bamboleo = (k) => Math.round(Math.sin(t * 1.2 + k) * 0.6);
      quien.forEach(([id, x], k) => { if (P[id] && !b['fuera_' + id] && !b['capturado_' + id]) figura(ctx, x, 70 + bamboleo(k), P[id].retrato); });
      // mesa y mapa
      r(ctx, 104, 100, 130, 6, '#3b2a1e');
      r(ctx, 108, 106, 4, 24, '#2b1f16');
      r(ctx, 226, 106, 4, 24, '#2b1f16');
      r(ctx, 120, 98, 90, 4, '#b8ad8a');
      r(ctx, 132, 99, 2, 1, '#c3142d'); r(ctx, 170, 99, 3, 1, '#c3142d'); r(ctx, 196, 100, 2, 1, '#c3142d');
      r(ctx, 164, 98, 1, 3, '#111');
      // bombilla
      r(ctx, 170, 0, 1, 34, '#111');
      const fl = 0.85 + 0.15 * Math.sin(t * 17) * Math.sin(t * 3.1);
      r(ctx, 169, 34, 3, 4, `rgba(255,${Math.round(220 * fl)},140,1)`);
      const g = ctx.createRadialGradient(170, 38, 2, 170, 60, 170);
      g.addColorStop(0, `rgba(255,210,130,${0.18 * fl})`);
      g.addColorStop(1, 'rgba(255,210,130,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // polvo en la luz
      ctx.fillStyle = 'rgba(255,230,180,0.35)';
      for (const p of polvo) {
        const y = (p.y + t * p.v * 3) % 110 + 20;
        const x = p.x + Math.sin(t * 0.5 + p.f) * 4;
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      }
      vineta(ctx, 170, 60, 50, 210, 0.9);
    }
  };

  // letras de 3x5 para carteles
  const LETRAS = {
    S: ['111', '100', '111', '001', '111'],
    O: ['111', '101', '101', '101', '111'],
    L: ['100', '100', '100', '100', '111']
  };
  function rotulo(ctx, x, y, texto, esc, color) {
    [...texto].forEach((ch, i) => {
      (LETRAS[ch] || []).forEach((fila, fy) => {
        [...fila].forEach((b, fx) => { if (b === '1') r(ctx, x + (i * 4 + fx) * esc, y + fy * esc, esc, esc, color); });
      });
    });
  }

  escenas.anden = function (ctx, t, e) {
    // andén abandonado de la vieja estación de Sol
    r(ctx, 0, 0, W, H, '#1a1c1c');
    const g = rng(8);
    for (let y = 8; y < 104; y += 6) {
      for (let x = 0; x < W; x += 8) {
        const c = ['#3d4240', '#383d3b', '#424745', '#343836'][Math.floor(g() * 4)];
        r(ctx, x + 1, y + 1, 7, 5, c);
      }
    }
    // bóveda
    r(ctx, 0, 0, W, 10, '#101212');
    // cartel de la estación
    r(ctx, 110, 30, 50, 22, '#e8e2d0');
    r(ctx, 112, 32, 46, 18, '#1f3f8a');
    rotulo(ctx, 124, 36, 'SOL', 2, '#e8e2d0');
    r(ctx, 150, 38, 2, 9, '#c3142d');
    // pintada vieja tachada
    r(ctx, 210, 44, 44, 2, '#6a1b1b'); r(ctx, 210, 50, 30, 2, '#6a1b1b');
    r(ctx, 205, 40, 56, 1, '#222');
    // andén
    r(ctx, 0, 104, W, 34, '#2a2b28');
    r(ctx, 0, 104, W, 2, '#8a7a2a');
    // vías
    r(ctx, 0, 138, W, 42, '#0c0d0d');
    r(ctx, 0, 150, W, 2, '#3a3530'); r(ctx, 0, 168, W, 2, '#3a3530');
    for (let x = 0; x < W; x += 14) r(ctx, x, 146, 6, 28, '#1a1512');
    // personajes
    const P = window.PERSONAJES || {};
    const b = (e && e.banderas) || {};
    const quien = [['mara', 128], ['ruth', 170]];
    if (b.tomasSalvado && !b.capturado_tomas) quien.push(['tomas', 206]);
    if (b.relojeroRescatado) quien.push(['relojero', 90]);
    quien.forEach(([id, x], k) => { if (P[id] && !b['fuera_' + id] && !b['capturado_' + id]) figura(ctx, x, 74 + Math.round(Math.sin(t * 1.2 + k) * 0.6), P[id].retrato); });
    // farol
    r(ctx, 166, 0, 1, 24, '#111');
    const fl = 0.8 + 0.2 * Math.sin(t * 9) * Math.sin(t * 2.3);
    r(ctx, 164, 24, 5, 6, `rgba(255,${Math.round(190 * fl)},110,1)`);
    const luz = ctx.createRadialGradient(166, 30, 2, 166, 60, 190);
    luz.addColorStop(0, `rgba(255,190,110,${0.2 * fl})`);
    luz.addColorStop(1, 'rgba(255,190,110,0)');
    ctx.fillStyle = luz; ctx.fillRect(0, 0, W, H);
    // goteras
    ctx.fillStyle = 'rgba(160,180,190,0.5)';
    for (let i = 0; i < 4; i++) {
      const x = 40 + i * 77, y = 10 + ((t * 60 + i * 37) % 95);
      ctx.fillRect(x, Math.round(y), 1, 2);
    }
    vineta(ctx, 166, 70, 50, 220, 0.92);
  };

  // recorte de ciudad para la ventana del apartamento
  function dibujarSkylineRecorte(ctx, t) {
    ctx.save();
    ctx.beginPath(); ctx.rect(232, 26, 56, 52); ctx.clip();
    ctx.translate(200, -60);
    dibujarSkyline(ctx, skyLejos, 140, '#0a0a0f', t, '#3a2a18');
    aguja(ctx, 60, 90, 140, t);
    ctx.restore();
  }

  // ---------- retratos 32x32 ----------
  function retrato(p) {
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const x = c.getContext('2d');
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, 32, 32, p.fondo || '#222');
    for (let i = 0; i < 32; i += 2) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(0, i, 32, 1); }

    if (p.emblema) {
      solNegro(x, 16, 16, 7, 0, '#ff4455');
      return c;
    }

    const piel = p.piel || '#c9a07f';
    const sombra = oscurecer(piel, 0.22);
    const pelo = p.pelo || '#222';
    const ropa = p.ropa || '#333';

    // hombros
    R(3, 27, 26, 5, ropa);
    R(6, 25, 20, 2, ropa);
    if (p.uniforme) {
      R(12, 25, 8, 2, '#0a0a0a');
      R(4, 28, 4, 3, '#a0101c');
      R(15, 27, 2, 5, '#c0a040');
    } else {
      R(14, 25, 4, 3, oscurecer(ropa, 0.35));
    }

    if (p.visor) {
      // casco de la Guardia Negra
      R(8, 5, 16, 18, '#16161a');
      R(9, 12, 14, 4, '#050505');
      R(10, 13, 12, 1, '#a0101c');
      R(12, 22, 8, 4, '#101012');
      return c;
    }

    // cuello
    R(13, 20, 6, 6, sombra);
    // cabeza
    const ancho = { 6: 4, 7: 5, 8: 6, 19: 6, 20: 5, 21: 4 };
    for (let y = 6; y <= 21; y++) {
      const hw = ancho[y] || 7;
      R(16 - hw, y, hw * 2, 1, piel);
      R(16 + hw - 2, y, 2, 1, sombra);
    }
    // orejas
    R(8, 13, 1, 3, piel);
    R(23, 13, 1, 3, sombra);
    // cejas y ojos
    const ceja = oscurecer(pelo.startsWith('#') ? pelo : '#222222', 0.2);
    R(11, 11, 4, 1, ceja);
    R(17, 11, 4, 1, ceja);
    R(12, 13, 2, 1, '#e8e0d4');
    R(18, 13, 2, 1, '#e8e0d4');
    R(13, 13, 1, 1, p.ojos || '#141414');
    R(19, 13, 1, 1, p.ojos || '#141414');
    // nariz y boca
    R(16, 14, 1, 3, sombra);
    R(15, 17, 2, 1, sombra);
    R(14, 19, 4, 1, oscurecer(piel, 0.42));
    if (p.arrugas) {
      R(11, 15, 1, 1, sombra); R(20, 15, 1, 1, sombra);
      R(13, 20, 1, 1, sombra); R(18, 20, 1, 1, sombra);
      R(12, 9, 8, 1, sombra);
    }
    if (p.cicatriz) {
      x.fillStyle = '#7a3a3a';
      x.fillRect(19, 10, 1, 1); x.fillRect(20, 11, 1, 1); x.fillRect(20, 12, 1, 1); x.fillRect(21, 13, 1, 1);
    }

    // pelo
    const e = p.estilo || 'corto';
    if (e === 'corto' || e === 'largo' || e === 'moño' || e === 'despeinado') {
      R(11, 4, 10, 1, pelo);
      R(9, 5, 14, 1, pelo);
      R(8, 6, 16, 3, pelo);
      R(8, 9, 2, 4, pelo);
      R(22, 9, 2, 3, pelo);
      R(10, 9, 5, 1, pelo);
    }
    if (e === 'largo') {
      R(7, 8, 3, 19, pelo);
      R(22, 8, 3, 19, pelo);
      R(18, 9, 4, 1, pelo);
    }
    if (e === 'moño') {
      R(13, 1, 6, 4, pelo);
      R(14, 0, 4, 1, pelo);
    }
    if (e === 'despeinado') {
      R(9, 3, 2, 2, pelo); R(14, 2, 2, 2, pelo); R(20, 3, 2, 2, pelo); R(23, 6, 2, 2, pelo);
      R(15, 9, 4, 1, pelo);
    }
    if (e === 'rapado') {
      x.fillStyle = pelo; x.globalAlpha = 0.7;
      x.fillRect(10, 5, 12, 2); x.fillRect(9, 7, 14, 1); x.fillRect(9, 8, 1, 4); x.fillRect(22, 8, 1, 4);
      x.globalAlpha = 1;
    }

    if (p.gafas) {
      x.fillStyle = '#1a1a1a';
      x.fillRect(11, 12, 4, 1); x.fillRect(11, 14, 4, 1); x.fillRect(11, 12, 1, 3); x.fillRect(14, 12, 1, 3);
      x.fillRect(17, 12, 4, 1); x.fillRect(17, 14, 4, 1); x.fillRect(17, 12, 1, 3); x.fillRect(20, 12, 1, 3);
      x.fillRect(15, 13, 2, 1);
    }
    return c;
  }

  // Retrato aleatorio pero estable a partir de un nombre
  function retratoDesde(nombre, extra = {}) {
    const g = rng(hash(nombre));
    const pieles = ['#e6c4a8', '#d4ab8c', '#c9a07f', '#b98463', '#a87858', '#8a5d42'];
    const pelos = ['#141414', '#2e2a26', '#5a3a22', '#8a6a40', '#c9c4bd', '#6b2418'];
    const estilos = ['corto', 'largo', 'moño', 'rapado', 'despeinado'];
    const p = {
      piel: pieles[Math.floor(g() * pieles.length)],
      pelo: pelos[Math.floor(g() * pelos.length)],
      estilo: estilos[Math.floor(g() * estilos.length)],
      ropa: ['#3a3a3a', '#46463c', '#3c2f3a', '#2d3a45'][Math.floor(g() * 4)],
      fondo: '#9a9384'
    };
    return retrato(Object.assign(p, extra));
  }

  // ---------- escenas del Día 7 ----------
  const SKY_BAJO = crearSkyline(57, 10, 50);
  const SKY_AMANECER = crearSkyline(41, 30, 95);
  const VENTANAS_AMANECER = (() => {
    const g = rng(88), out = [];
    for (const b of SKY_AMANECER) {
      for (let wy = 4; wy < b.h - 3; wy += 4) {
        for (let wx = 2; wx < b.w - 1; wx += 3) if (g() < 0.5) out.push([b.x + wx, 170 - b.h + wy, g()]);
      }
    }
    return out;
  })();

  // El Canciller Voss, de espaldas o de frente
  function canciller(ctx, x, y, deFrente) {
    const pelo = '#d8d4cc', piel = '#d8b89a', ropa = '#141416';
    r(ctx, x - 4, y + 21, 3, 10, '#0a0a0c'); r(ctx, x + 1, y + 21, 3, 10, '#0a0a0c');
    r(ctx, x - 5, y + 7, 10, 15, ropa); r(ctx, x - 6, y + 8, 1, 12, ropa); r(ctx, x + 5, y + 8, 1, 12, ropa);
    r(ctx, x - 6, y + 7, 2, 1, '#c0a040'); r(ctx, x + 4, y + 7, 2, 1, '#c0a040');
    r(ctx, x - 1, y + 6, 2, 1, piel);
    if (deFrente) {
      r(ctx, x - 3, y, 6, 6, piel); r(ctx, x - 3, y - 1, 6, 2, pelo);
      r(ctx, x - 2, y + 3, 1, 1, '#111'); r(ctx, x + 1, y + 3, 1, 1, '#111');
      r(ctx, x - 1, y + 9, 2, 6, '#a0101c');
    } else {
      r(ctx, x - 2, y + 17, 4, 2, piel);
      r(ctx, x - 3, y, 6, 6, pelo); r(ctx, x - 3, y + 4, 6, 2, '#c9c4bb');
    }
  }

  escenas.despacho = function (ctx, t, e) {
    const b = (e && e.banderas) || {};
    r(ctx, 0, 0, W, H, '#0e0e12');
    for (let x = 0; x < 140; x += 36) r(ctx, x, 0, 1, 150, '#15151a');
    r(ctx, 140, 14, 172, 122, '#07080c');
    r(ctx, 142, 16, 168, 118, b.odinExito ? '#141826' : '#0b0c14');
    ctx.save(); ctx.beginPath(); ctx.rect(142, 16, 168, 118); ctx.clip();
    dibujarSkyline(ctx, SKY_BAJO, 134, '#06070b', t, b.lucesEncendidas ? '#f0c070' : '#6a5020');
    lluvia(ctx, t, { x: 142, y: 16, w: 168, h: 118 }, 0.6, 'rgba(170,180,210,0.3)');
    ctx.restore();
    r(ctx, 197, 14, 2, 122, '#07080c'); r(ctx, 254, 14, 2, 122, '#07080c'); r(ctx, 140, 72, 172, 2, '#07080c');
    r(ctx, 30, 14, 40, 84, '#5a0b16');
    solNegro(ctx, 50, 42, 9, t * 0.2, '#e8d9b0');
    r(ctx, 38, 66, 24, 2, '#e8d9b0'); r(ctx, 41, 70, 18, 1, '#e8d9b0');
    r(ctx, 0, 150, W, 30, '#09090b');
    ctx.fillStyle = 'rgba(120,130,170,0.07)'; ctx.fillRect(140, 151, 172, 10);
    r(ctx, 18, 118, 112, 6, '#2a1c14'); r(ctx, 24, 124, 4, 26, '#1e140e'); r(ctx, 120, 124, 4, 26, '#1e140e');
    r(ctx, 40, 108, 3, 10, '#1b2b20'); r(ctx, 34, 104, 15, 5, '#2f5a3a');
    ctx.fillStyle = 'rgba(232,193,112,0.1)'; ctx.beginPath(); ctx.moveTo(34, 109); ctx.lineTo(49, 109); ctx.lineTo(64, 118); ctx.lineTo(20, 118); ctx.fill();
    r(ctx, 70, 116, 16, 2, '#d8d0b8'); r(ctx, 90, 116, 12, 2, '#cfc8b0');
    // el Canciller junto al ventanal (de frente cuando ya lo han detenido)
    ctx.save(); ctx.translate(224, 90); ctx.scale(2, 2); canciller(ctx, 0, 0, !!b.vossDetenido); ctx.restore();
    // el Relojero, junto a la mesa
    if (b.relojeroEnDespacho && !b.relojeroCaido && window.PERSONAJES) figura(ctx, 150, 118, PERSONAJES.relojero.retrato);
    vineta(ctx, 200, 90, 60, 230, 0.7);
  };

  escenas.aguja = function (ctx, t, e) {
    // vestíbulo de servicio de La Aguja
    r(ctx, 0, 0, W, H, '#101014');
    for (let x = 0; x < W; x += 20) { r(ctx, x, 0, 1, 130, '#18181e'); r(ctx, x + 10, 20, 1, 90, '#141418'); }
    for (const bx of [40, 150, 260]) {
      r(ctx, bx, 10, 24, 70, '#5a0b16');
      solNegro(ctx, bx + 12, 36, 6, t * 0.2, '#e8d9b0');
    }
    r(ctx, 0, 130, W, 50, '#0c0c0e');
    for (let x = 0; x < W; x += 16) r(ctx, x, 130, 1, 50, '#141418');
    // luces de techo
    for (let x = 30; x < W; x += 60) {
      r(ctx, x, 0, 20, 2, '#e8e2d0');
      ctx.fillStyle = 'rgba(232,226,208,0.05)';
      ctx.beginPath(); ctx.moveTo(x, 2); ctx.lineTo(x + 20, 2); ctx.lineTo(x + 40, 130); ctx.lineTo(x - 20, 130); ctx.fill();
    }
    // puerta de personal
    r(ctx, 130, 70, 60, 60, '#1e1e24'); r(ctx, 133, 73, 26, 57, '#26262e'); r(ctx, 161, 73, 26, 57, '#26262e');
    r(ctx, 157, 100, 2, 6, '#8a8a90'); r(ctx, 161, 100, 2, 6, '#8a8a90');
    const abierta = e && e.banderas && e.banderas.puertaExito;
    if (abierta) { r(ctx, 133, 73, 54, 57, '#050506'); ctx.fillStyle = 'rgba(255,200,120,0.08)'; ctx.fillRect(133, 73, 54, 57); }
    // guardias con visor
    if (!abierta) for (const gx of [110, 212]) {
      r(ctx, gx - 4, 100, 8, 22, '#0a0a0c'); r(ctx, gx - 3, 92, 6, 7, '#16161a'); r(ctx, gx - 2, 95, 4, 1, '#a0101c');
      r(ctx, gx - 4, 122, 3, 8, '#0a0a0c'); r(ctx, gx + 1, 122, 3, 8, '#0a0a0c');
    }
    vineta(ctx, 160, 90, 60, 220, 0.8);
  };

  escenas.nucleo = function (ctx, t, e) {
    // nivel -4: el núcleo de ODÍN
    const apagado = e && e.banderas && e.banderas.odinExito;
    r(ctx, 0, 0, W, H, '#050507');
    for (let k = 0; k < 7; k++) {
      const x = 8 + k * 46;
      r(ctx, x, 30, 30, 110, '#111116'); r(ctx, x + 1, 31, 28, 108, '#16161c');
      for (let y = 36; y < 136; y += 6) {
        for (let i = 0; i < 5; i++) {
          const on = !apagado && Math.sin(t * (3 + i) + k * 7 + y) > 0.2;
          r(ctx, x + 4 + i * 5, y, 2, 1, on ? (i % 3 ? '#ff2a3a' : '#40ff80') : '#1a1a1e');
        }
      }
    }
    // el ojo central de ODÍN
    circulo(ctx, 160, 80, 20, '#0a0a0e');
    circulo(ctx, 160, 80, 16, apagado ? '#141418' : '#3a0a10');
    circulo(ctx, 160, 80, 8, apagado ? '#0a0a0c' : '#ff2a3a');
    if (!apagado) {
      const g = ctx.createRadialGradient(160, 80, 2, 160, 80, 90);
      g.addColorStop(0, `rgba(255,40,60,${0.25 + 0.1 * Math.sin(t * 4)})`); g.addColorStop(1, 'rgba(255,40,60,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    r(ctx, 0, 140, W, 40, '#08080a');
    for (let x = 0; x < W; x += 10) r(ctx, x, 140, 6, 1, '#1a1a20');
    vineta(ctx, 160, 80, 40, 200, 0.85);
  };

  escenas.amanecer = function (ctx, t, e) {
    // la primera mañana: el cielo clarea y todas las luces están encendidas
    const cols = ['#1a1c34', '#2a2a48', '#46365a', '#6a4660', '#9a5a5a', '#c8784e', '#e8a060'];
    cols.forEach((c, i) => r(ctx, 0, i * 20, W, 21, c));
    r(ctx, 0, 140, W, 40, '#e8a060');
    // el sol que asoma
    circulo(ctx, 230, 150, 18, '#ffd89a');
    ctx.fillStyle = 'rgba(255,216,154,0.18)'; ctx.fillRect(0, 110, W, 70);
    for (const b of SKY_AMANECER) r(ctx, b.x, 170 - b.h, b.w, b.h, '#1c1a26');
    for (const [x, y, ph] of VENTANAS_AMANECER) if (Math.sin(t * 0.4 + ph * 60) > -0.9) r(ctx, x, y, 1, 2, ph > 0.5 ? '#f8d080' : '#f0b060');
    // La Aguja, apagada y pequeña contra el cielo
    aguja(ctx, 90, 40, 170, t, '#15131c');
    r(ctx, 0, 170, W, 10, '#141220');
    for (let k = 0; k < 5; k++) { const x = ((t * 6 + k * 70) % 360) - 20; r(ctx, x, 30 + k * 7, 2, 1, '#2a2436'); r(ctx, x + 2, 29 + k * 7, 1, 1, '#2a2436'); }
  };

  escenas.tribunal = function (ctx, t, e) {
    r(ctx, 0, 0, W, H, '#1e1a16');
    // ventanales con luz de día
    for (const x of [20, 110, 200, 290]) {
      r(ctx, x - 2, 10, 24, 60, '#2a241e'); r(ctx, x, 12, 20, 56, '#b8c0c8');
      ctx.fillStyle = 'rgba(230,236,240,0.08)';
      ctx.beginPath(); ctx.moveTo(x, 68); ctx.lineTo(x + 20, 68); ctx.lineTo(x + 50, 140); ctx.lineTo(x + 10, 140); ctx.fill();
    }
    for (let x = 0; x < W; x += 8) r(ctx, x, 80, 1, 50, '#241f1a');
    // estrado de los jueces
    r(ctx, 90, 70, 140, 30, '#3a2a1c'); r(ctx, 90, 68, 140, 3, '#4a3624');
    for (const jx of [125, 160, 195]) { r(ctx, jx - 3, 58, 6, 6, '#c9a07f'); r(ctx, jx - 4, 64, 8, 6, '#141414'); r(ctx, jx - 3, 57, 6, 2, '#6a6a6a'); }
    // la cabina de cristal del acusado
    r(ctx, 238, 96, 40, 34, 'rgba(180,200,210,0.18)');
    r(ctx, 238, 96, 40, 1, '#8aa0aa'); r(ctx, 238, 96, 1, 34, '#8aa0aa'); r(ctx, 277, 96, 1, 34, '#8aa0aa');
    canciller(ctx, 258, 100, true);
    // público
    for (let fila = 0; fila < 3; fila++) {
      r(ctx, 0, 140 + fila * 13, W, 3, '#2e2218');
      for (let x = 6 + fila * 5; x < W; x += 11) {
        const g = rng(x * 7 + fila);
        r(ctx, x, 132 + fila * 13, 6, 6, ['#b98463', '#d8b49a', '#8a5d42', '#c9a07f'][Math.floor(g() * 4)]);
        r(ctx, x, 131 + fila * 13, 6, 2, ['#1b1210', '#c9c4bd', '#5a3a22', '#2e2a26'][Math.floor(g() * 4)]);
      }
    }
    vineta(ctx, 160, 90, 80, 230, 0.5);
  };

  escenas.celda = function (ctx, t, e) {
    r(ctx, 0, 0, W, H, '#0a0a0c');
    for (let y = 0; y < 150; y += 8) for (let x = (y / 8) % 2 ? 0 : 10; x < W; x += 20) r(ctx, x, y, 19, 7, '#141418');
    // ventanuco con barrotes
    r(ctx, 140, 20, 40, 24, '#1a1c26');
    if (Math.sin(t * 0.3) > 0.9) { ctx.fillStyle = 'rgba(255,240,210,0.15)'; ctx.fillRect(140, 20, 40, 24); }
    for (let x = 144; x < 180; x += 6) r(ctx, x, 20, 2, 24, '#050506');
    ctx.fillStyle = 'rgba(160,170,200,0.05)';
    ctx.beginPath(); ctx.moveTo(140, 44); ctx.lineTo(180, 44); ctx.lineTo(210, 150); ctx.lineTo(110, 150); ctx.fill();
    r(ctx, 0, 150, W, 30, '#08080a');
    r(ctx, 30, 130, 60, 20, '#1a1a1e');
    vineta(ctx, 160, 60, 30, 180, 0.9);
  };

  // herramientas de dibujo para escenas hechas fuera de este archivo (cinemática)
  const util = { r, linea, circulo, rng, oscurecer, lluvia, crearSkyline, dibujarSkyline, aguja, dron, figura, vineta };

  return { W, H, escenas, retrato, retratoDesde, solNegro, util };
})();

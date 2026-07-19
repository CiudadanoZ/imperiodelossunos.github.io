// utils.js — Utilidades de seguridad para renderizar contenido de usuario.
//
// UNIVERSO pinta posts, comentarios y perfiles con plantillas + innerHTML.
// Todo dato que venga de un usuario DEBE pasar por una de estas funciones
// antes de interpolarse, o cualquiera podría inyectar HTML/JS que se
// ejecutaría en el navegador del resto (XSS almacenado).

/**
 * Escapa texto para insertarlo como contenido HTML o dentro de un atributo.
 * Uso: `<div>${escapeHtml(post.text)}</div>`
 */
export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Convierte texto de usuario en HTML SEGURO con menciones (@handle) y hashtags
 * (#tag) clicables. Escapa por tramos: solo se tratan como token las secuencias
 * de letras/números tras @ o #, así que no puede colarse HTML/JS.
 * Al pulsar, llama a window.openMention / window.openHashtag (definidas abajo por
 * defecto, y sobrescritas en index.html para filtrar sin recargar).
 */
export function linkifyText(rawText) {
    const s = String(rawText ?? '');
    const re = /([@#])([\p{L}\p{N}_]+)/gu;
    let out = '', last = 0, m;
    while ((m = re.exec(s)) !== null) {
        out += escapeHtml(s.slice(last, m.index));
        const word = m[2];
        if (m[1] === '#') {
            out += `<span class="tag-link" style="color:var(--accent-gold); cursor:pointer;" onclick="event.stopPropagation(); window.openHashtag && window.openHashtag('${word.toLowerCase()}')">#${escapeHtml(word)}</span>`;
        } else {
            out += `<span class="mention-link" style="color:var(--accent-gold); cursor:pointer;" onclick="event.stopPropagation(); window.openMention && window.openMention('@${word}')">@${escapeHtml(word)}</span>`;
        }
        last = m.index + m[0].length;
    }
    out += escapeHtml(s.slice(last));
    return out;
}

/**
 * Si el texto contiene un enlace de YouTube o Twitch, devuelve el HTML de un
 * reproductor incrustado (el primero que encuentre); si no, cadena vacía.
 * SEGURIDAD: solo extraemos el ID (caracteres inocuos) y construimos NOSOTROS
 * la URL del iframe; nunca metemos la URL del usuario tal cual.
 */
export function embedHtml(text) {
    const s = String(text ?? '');
    const wrap = (src, ratio = '56.25%') =>
        `<div style="position:relative; padding-bottom:${ratio}; height:0; margin:12px 0; border-radius:12px; overflow:hidden; border:1px solid var(--glass-border);">` +
        `<iframe src="${src}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;

    // YouTube (watch, youtu.be, shorts)
    let m = s.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (m) return wrap(`https://www.youtube.com/embed/${m[1]}`);

    // Twitch necesita el dominio actual como "parent".
    const host = (typeof location !== 'undefined' ? location.hostname : '');
    m = s.match(/twitch\.tv\/videos\/(\d+)/);
    if (m) return wrap(`https://player.twitch.tv/?video=${m[1]}&parent=${encodeURIComponent(host)}&autoplay=false`);
    m = s.match(/clips\.twitch\.tv\/([A-Za-z0-9_-]+)/) || s.match(/twitch\.tv\/\w+\/clip\/([A-Za-z0-9_-]+)/);
    if (m) return wrap(`https://clips.twitch.tv/embed?clip=${m[1]}&parent=${encodeURIComponent(host)}&autoplay=false`);
    m = s.match(/twitch\.tv\/([A-Za-z0-9_]{3,25})(?:[/?#]|$)/);
    if (m && !['videos', 'directory', 'p', 'settings'].includes(m[1].toLowerCase())) {
        return wrap(`https://player.twitch.tv/?channel=${m[1]}&parent=${encodeURIComponent(host)}&autoplay=false`);
    }
    return '';
}

/**
 * HTML de la "leyenda citada" que se muestra dentro de una cita (quote).
 * `quoted` es una instantánea guardada del post original {author,handle,avatar,text}.
 */
export function quotedBoxHtml(quoted) {
    if (!quoted) return '';
    return `<div style="border:1px solid var(--glass-border); border-radius:12px; padding:12px; margin-top:10px; background:rgba(255,255,255,0.02);">` +
        `<div style="display:flex; gap:8px; align-items:center; margin-bottom:6px;">` +
        `<img src="${safeImageUrl(quoted.avatar)}" style="width:24px; height:24px; border-radius:50%; object-fit:contain; background:#000;">` +
        `<span style="font-weight:bold; font-size:0.85rem; color:#fff;">${escapeHtml(quoted.author)}</span>` +
        `<span style="color:#777; font-size:0.8rem;">${escapeHtml(quoted.handle)}</span></div>` +
        `<div style="color:#ccc; font-size:0.9rem; line-height:1.4;">${linkifyText(quoted.text)}</div></div>`;
}

/**
 * Extrae los @handles únicos mencionados en un texto (con la @ incluida).
 */
export function extractMentions(rawText) {
    const found = String(rawText ?? '').match(/@[\p{L}\p{N}_]+/gu) || [];
    return [...new Set(found)];
}

// Comportamiento por defecto al pulsar un #tag o @handle: ir al feed principal
// filtrado. index.html lo sobrescribe para filtrar en el sitio sin recargar.
if (typeof window !== 'undefined') {
    window.openHashtag = function (tag) {
        window.location.href = 'index.html?q=' + encodeURIComponent('#' + tag);
    };
    window.openMention = function (handle) {
        window.location.href = 'index.html?q=' + encodeURIComponent(handle);
    };
}

/**
 * Escapa un valor que va dentro de una cadena JS en un atributo inline,
 * p. ej. onclick="abrir('${escapeJsAttr(handle)}')".
 *
 * Ojo al orden: el navegador primero decodifica las entidades HTML del
 * atributo y DESPUÉS el motor de JS interpreta el resultado. Por eso hay que
 * escapar primero para JS y luego para HTML: así, al decodificarse, queda una
 * cadena JS ya neutralizada. Escapar solo HTML aquí NO protege.
 */
export function escapeJsAttr(value) {
    const forJs = String(value ?? '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n');
    return escapeHtml(forJs);
}

/**
 * Devuelve la URL solo si es segura para un <img src>. Si no, cadena vacía.
 * Permite http(s), rutas relativas simples y data:image/*.
 * Nota: un SVG dentro de <img> no ejecuta scripts, así que aquí es aceptable.
 */
export function safeImageUrl(value) {
    const url = String(value ?? '').trim();
    if (/^https?:\/\//i.test(url)) return escapeHtml(url);
    if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml)[;,]/i.test(url)) return escapeHtml(url);
    if (/^[\w][\w./-]*$/.test(url) && !url.includes('..')) return escapeHtml(url);
    return '';
}

/**
 * Igual que safeImageUrl pero para <a href>, donde SÍ es peligroso navegar a
 * un data: (un SVG o HTML ahí sí ejecutaría scripts). Solo http(s) y data de
 * imagen rasterizada.
 */
export function safeLinkUrl(value) {
    const url = String(value ?? '').trim();
    if (/^https?:\/\//i.test(url)) return escapeHtml(url);
    if (/^data:image\/(png|jpe?g|gif|webp)[;,]/i.test(url)) return escapeHtml(url);
    if (/^[\w][\w./?=&#-]*$/.test(url) && !url.includes('..')) return escapeHtml(url);
    return '#';
}

// Firestore limita cada documento a 1 MB. Como las imágenes (posts, adjuntos)
// se guardan como data URI DENTRO del documento, hay que dejarlas pequeñas para
// no superar ese límite (y así seguir en el plan gratuito, sin Storage).
// Dejamos margen: el data URI no debe pasar de ~700 KB.
const MAX_DATAURL_BYTES = 700 * 1024;

/**
 * Comprime una imagen en el navegador: la reescala a `maxDim` px como máximo y
 * la exporta a JPEG, bajando la calidad hasta que quepa bajo MAX_DATAURL_BYTES.
 * Devuelve una promesa con el data URL resultante.
 * (JPEG no tiene transparencia; una imagen con alfa saldrá con fondo negro.)
 */
export function compressImage(file, { maxDim = 1024, quality = 0.72 } = {}) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type || !file.type.startsWith('image/')) {
            reject(new Error('El archivo no es una imagen.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = () => reject(new Error('La imagen no es válida.'));
            img.onload = () => {
                let { width, height } = img;
                if (width > maxDim || height > maxDim) {
                    const scale = Math.min(maxDim / width, maxDim / height);
                    width = Math.max(1, Math.round(width * scale));
                    height = Math.max(1, Math.round(height * scale));
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                let q = quality;
                let dataUrl = canvas.toDataURL('image/jpeg', q);
                // Si aún es grande, baja calidad; si no basta, reduce tamaño.
                while (dataUrl.length > MAX_DATAURL_BYTES && q > 0.3) {
                    q -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', q);
                }
                if (dataUrl.length > MAX_DATAURL_BYTES && (width > 640 || height > 640)) {
                    const s = 640 / Math.max(width, height);
                    canvas.width = Math.round(width * s);
                    canvas.height = Math.round(height * s);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                }
                if (dataUrl.length > MAX_DATAURL_BYTES) {
                    reject(new Error('La imagen es demasiado grande incluso comprimida.'));
                    return;
                }
                resolve(dataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Lee un archivo NO-imagen (p. ej. PDF) como data URL, rechazando si supera el
 * tope, porque no se puede comprimir y reventaría el límite de Firestore.
 */
export function readFileCapped(file, maxBytes = MAX_DATAURL_BYTES) {
    return new Promise((resolve, reject) => {
        if (!file) { reject(new Error('No hay archivo.')); return; }
        // Estimación rápida: el data URL en base64 pesa ~1.37x el archivo.
        if (file.size * 1.37 > maxBytes) {
            reject(new Error('El archivo es demasiado grande (máx. ~500 KB).'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
        reader.onload = (e) => {
            if (e.target.result.length > maxBytes) {
                reject(new Error('El archivo es demasiado grande.'));
                return;
            }
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

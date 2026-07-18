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

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

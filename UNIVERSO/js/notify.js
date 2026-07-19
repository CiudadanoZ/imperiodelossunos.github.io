// notify.js — Notificaciones del navegador para UNIVERSO.
//
// GRATIS y sin servidor: muestra una notificación del sistema cuando llega una
// proclama NUEVA mientras el usuario tiene una pestaña de UNIVERSO abierta
// (aunque esté en segundo plano). No es push "con la app cerrada": eso
// requeriría un servidor (Cloud Functions/FCM), que no entra en el plan gratis.

let lastMaxTs = null;   // mayor timestamp visto; null en la primera carga.

export function notificationsSupported() {
    return typeof window !== 'undefined' && 'Notification' in window;
}

export function notificationsGranted() {
    return notificationsSupported() && Notification.permission === 'granted';
}

// Pide permiso al usuario (llamar desde un botón, no automáticamente).
export async function requestNotificationPermission() {
    if (!notificationsSupported()) return 'unsupported';
    try {
        return await Notification.requestPermission();
    } catch (e) {
        return 'denied';
    }
}

function textFor(n) {
    const who = n.fromName || 'Alguien';
    switch (n.type) {
        case 'like':    return `A ${who} le gustó tu leyenda`;
        case 'retweet': return `${who} compartió tu leyenda`;
        case 'comment': return `${who} comentó tu leyenda`;
        case 'mention': return `${who} te mencionó`;
        case 'follow':  return `${who} ahora es tu aliado`;
        case 'message': return `Nuevo mensaje de ${who}`;
        default:        return 'Tienes una nueva proclama';
    }
}

// Llamar desde el callback de onNotificationsUpdate. Muestra una notificación
// del navegador por cada proclama nueva (posterior a la última vista y sin leer).
export function handleNotifications(notifs) {
    if (!Array.isArray(notifs) || notifs.length === 0) return;
    const maxTs = Math.max(...notifs.map(n => n.timestamp || 0));

    // Primera carga de la página: registramos el punto de partida, sin avisar
    // del histórico.
    if (lastMaxTs === null) { lastMaxTs = maxTs; return; }
    if (maxTs <= lastMaxTs) return;

    const nuevas = notifs.filter(n => (n.timestamp || 0) > lastMaxTs && !n.read);
    lastMaxTs = maxTs;

    if (!notificationsGranted()) return;
    for (const n of nuevas.slice(0, 3)) { // como mucho 3 de golpe
        try {
            const notif = new Notification('UNIVERSO', {
                body: textFor(n),
                tag: n.id,           // evita duplicados de la misma proclama
                icon: '../img/Imperio_de_los_sueños.png'
            });
            notif.onclick = () => {
                window.focus();
                window.location.href = 'proclamas.html';
            };
        } catch (e) { /* algunos navegadores lanzan si no hay gesto de usuario */ }
    }
}

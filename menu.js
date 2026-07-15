// menu.js — Menú hamburguesa para móvil (compartido por index.html y launcher/index.html)
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    const icon = toggle.querySelector('i');

    const setOpen = (open) => {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
        // Bloquea el scroll del fondo mientras el panel está abierto
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!nav.classList.contains('open'));
    });

    // Cerrar al pulsar cualquier enlace del menú
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

    // Cerrar al pulsar fuera del panel
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
            setOpen(false);
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
    });

    // Al volver a escritorio, reiniciar el estado
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('open')) setOpen(false);
    });
});

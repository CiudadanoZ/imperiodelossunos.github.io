/* =====================================================================
   UNIVERSO · comportamiento compartido de la interfaz

   Lo que faltaba para que la red se comportase como una aplicación y no
   como una página. Va aparte y se engancha solo a lo que encuentra, así
   que no hay que tocar la plantilla de cada página:

     · Contador de caracteres en el redactor, con el botón de publicar
       apagado mientras no haya nada que publicar.
     · Tarjetas fantasma mientras llega el feed, en vez de un hueco negro.
     · Un aviso decente cuando el feed se queda vacío.
     · Las acciones de cada publicación pasan a ser alcanzables con el
       teclado: antes eran <div onclick> y con Tab no se llegaba.
     · Avisos flotantes (window.uAviso) para sustituir a los alert().

   Si se quita este archivo, todo lo demás sigue funcionando igual.
   ===================================================================== */
(function () {
    'use strict';

    const LIMITE = 500;          // caracteres por publicación
    const AVISO_DESDE = 420;     // a partir de aquí se enseña el número

    // =============================================================== avisos
    function cajaAvisos() {
        let c = document.querySelector('.u-avisos');
        if (!c) {
            c = document.createElement('div');
            c.className = 'u-avisos';
            c.setAttribute('role', 'status');
            c.setAttribute('aria-live', 'polite');
            document.body.appendChild(c);
        }
        return c;
    }

    window.uAviso = function (texto, tipo) {
        const a = document.createElement('div');
        a.className = 'u-aviso' + (tipo === 'error' ? ' error' : '');
        a.innerHTML = '<i class="fas fa-' + (tipo === 'error' ? 'circle-exclamation' : 'circle-check') +
            '"></i><span></span>';
        a.querySelector('span').textContent = texto;
        cajaAvisos().appendChild(a);
        setTimeout(() => {
            a.classList.add('saliendo');
            setTimeout(() => a.remove(), 320);
        }, tipo === 'error' ? 5200 : 3400);
    };

    // ========================================================== redactor
    function montarRedactor() {
        const caja = document.querySelector('.compose-input-area');
        const texto = document.getElementById('postText');
        const publicar = document.getElementById('publishBtn');
        if (!caja || !texto || !publicar) return;
        if (caja.querySelector('.u-contador')) return;

        // El contador va junto al botón, dentro de la fila de acciones
        const fila = caja.querySelector('.compose-actions');
        if (!fila) return;

        const meta = document.createElement('div');
        meta.className = 'u-compose-meta';

        const R = 11, C = 2 * Math.PI * R;
        const cont = document.createElement('div');
        cont.className = 'u-contador';
        cont.innerHTML =
            '<svg viewBox="0 0 26 26" aria-hidden="true">' +
            '<circle class="pista" cx="13" cy="13" r="' + R + '"></circle>' +
            '<circle class="avance" cx="13" cy="13" r="' + R + '" ' +
            'stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + C.toFixed(2) + '"></circle>' +
            '</svg><span class="quedan"></span>';

        meta.appendChild(cont);
        fila.insertBefore(meta, publicar);
        meta.appendChild(publicar);     // el botón se va dentro del grupo

        const avance = cont.querySelector('.avance');
        const quedan = cont.querySelector('.quedan');

        function repintar() {
            const n = texto.value.length;
            const frac = Math.min(1, n / LIMITE);
            avance.setAttribute('stroke-dashoffset', (C * (1 - frac)).toFixed(2));
            cont.classList.toggle('visible', n > 0);
            cont.classList.toggle('cerca', n >= AVISO_DESDE && n <= LIMITE);
            cont.classList.toggle('pasado', n > LIMITE);
            quedan.textContent = String(LIMITE - n);

            const vacio = texto.value.trim().length === 0;
            const pasado = n > LIMITE;
            publicar.disabled = vacio || pasado;
            publicar.setAttribute('aria-disabled', String(vacio || pasado));
            texto.setAttribute('aria-describedby', 'u-limite');
        }

        texto.addEventListener('input', repintar);
        repintar();

        // Ctrl/Cmd + Enter publica, como en cualquier red
        texto.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !publicar.disabled) {
                e.preventDefault();
                publicar.click();
            }
        });
    }

    // =================================================== tarjetas fantasma
    function esqueleto(n) {
        let html = '';
        for (let i = 0; i < n; i++) {
            html += '<div class="u-skeleton-post" aria-hidden="true">' +
                '<div class="u-sk-avatar"></div>' +
                '<div class="u-sk-body">' +
                '<div class="u-sk-line corta"></div>' +
                '<div class="u-sk-line larga"></div>' +
                '<div class="u-sk-line media"></div>' +
                '</div></div>';
        }
        return html;
    }

    function pintarCarga() {
        const feed = document.getElementById('legendsFeed') ||
                     document.getElementById('savedFeed') ||
                     document.querySelector('.social-feed .feed-list');
        if (!feed || feed.children.length) return;
        feed.innerHTML = '<div class="u-cargando">' + esqueleto(3) + '</div>';
        feed.setAttribute('aria-busy', 'true');

        // En cuanto la página pinte algo de verdad, el esqueleto se va solo
        const obs = new MutationObserver(() => {
            if (feed.querySelector('.post, .u-vacio')) {
                const sk = feed.querySelector('.u-cargando');
                if (sk) sk.remove();
                feed.removeAttribute('aria-busy');
                obs.disconnect();
            }
        });
        obs.observe(feed, { childList: true });

        // Red de seguridad: si a los 8 s no hay nada, se quita igualmente
        setTimeout(() => {
            const sk = feed.querySelector('.u-cargando');
            if (sk && !feed.querySelector('.post')) {
                sk.remove();
                feed.removeAttribute('aria-busy');
                if (!feed.children.length) pintarVacio(feed);
            }
        }, 8000);
    }

    function pintarVacio(feed) {
        if (feed.querySelector('.u-vacio')) return;
        feed.insertAdjacentHTML('beforeend',
            '<div class="u-vacio">' +
            '<i class="fas fa-feather-pointed"></i>' +
            '<h3>Aquí no hay leyendas todavía</h3>' +
            '<p>Cuando alguien escriba la primera, aparecerá en este lugar. ' +
            'Puedes empezar tú: la caja de arriba está esperando.</p>' +
            '</div>');
    }

    // ============================== acciones alcanzables con el teclado
    /* Las acciones de cada publicación son <div onclick>: con Tab no se
       llegaba a ellas y un lector de pantalla no las anunciaba. Como se
       pintan desde JavaScript cada vez que cambia el feed, se vigilan y
       se arreglan según aparecen. */
    const ETIQUETAS = {
        'fa-comment': 'Comentar',
        'fa-retweet': 'Hacer eco',
        'fa-quote-right': 'Citar',
        'fa-heart': 'Me gusta',
        'fa-bookmark': 'Guardar',
        'fa-share-square': 'Compartir'
    };

    function accesible(raiz) {
        const acciones = (raiz || document).querySelectorAll('.interaction:not([data-u-ok])');
        acciones.forEach((a) => {
            a.setAttribute('data-u-ok', '1');
            a.setAttribute('role', 'button');
            a.setAttribute('tabindex', '0');

            if (!a.getAttribute('aria-label')) {
                const icono = a.querySelector('i');
                let etiqueta = 'Acción';
                if (icono) {
                    for (const clase in ETIQUETAS) {
                        if (icono.classList.contains(clase)) { etiqueta = ETIQUETAS[clase]; break; }
                    }
                }
                const n = (a.textContent || '').trim();
                a.setAttribute('aria-label', n ? etiqueta + ' (' + n + ')' : etiqueta);
            }

            if (a.classList.contains('like') || a.classList.contains('retweet') ||
                a.classList.contains('save')) {
                a.setAttribute('aria-pressed', String(a.classList.contains('active')));
            }

            a.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    a.click();
                }
            });
        });
    }

    function vigilarFeed() {
        const feed = document.getElementById('legendsFeed') ||
                     document.getElementById('savedFeed') ||
                     document.querySelector('.social-feed');
        if (!feed) return;
        accesible(feed);
        new MutationObserver(() => accesible(feed))
            .observe(feed, { childList: true, subtree: true });
    }

    // ========================================= altura real de la barra
    /* Los anclajes pegajosos cuelgan de --u-barra. En vez de fijarla a
       ojo se mide la barra de verdad, que cambia de alto con el ancho
       de la ventana y con el tamano de letra del navegador. */
    function medirBarra() {
        const nav = document.querySelector('.navbar');
        if (!nav) return;
        const alto = Math.round(nav.getBoundingClientRect().height);
        if (alto > 0) document.documentElement.style.setProperty('--u-barra', alto + 'px');
    }

    // ===================================================== arranque
    function arrancar() {
        medirBarra();
        addEventListener('resize', medirBarra, { passive: true });
        montarRedactor();
        pintarCarga();
        vigilarFeed();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', arrancar);
    } else {
        arrancar();
    }
})();

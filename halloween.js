/* =====================================================================
   DECORACIÓN DE HALLOWEEN · Imperio de los Sueños

   Se enciende sola del 24 de octubre al 2 de noviembre y se apaga sola
   el día 3. Nadie tiene que acordarse de quitarla.

       ?halloween=1   la fuerza encendida (para probarla cualquier día)
       ?halloween=0   la fuerza apagada

   Lo que hace:
     · Pone la clase .halloween en <body> (de ahí cuelga halloween.css).
     · Dibuja telarañas en las esquinas de las tarjetas.
     · Suelta murciélagos cruzando la portada.
     · Esconde UNA calabaza por página. Hay cinco repartidas por la web
       y el progreso se guarda en el navegador de cada visitante.

   Para quitarlo todo: borra el <link> y el <script> de las páginas.
   ===================================================================== */
(function () {
    'use strict';

    // ---------------------------------------------------------- Fechas
    var DESDE = { mes: 9, dia: 24 };   // 24 de octubre (mes 9 = octubre)
    var HASTA = { mes: 10, dia: 2 };   // 2 de noviembre, incluido

    function esTemporada(hoy) {
        var m = hoy.getMonth(), d = hoy.getDate();
        if (m === DESDE.mes && d >= DESDE.dia) return true;
        if (m === HASTA.mes && d <= HASTA.dia) return true;
        return false;
    }

    var forzado = null;
    try {
        var q = new URLSearchParams(location.search).get('halloween');
        if (q === '1') forzado = true;
        if (q === '0') forzado = false;
    } catch (e) { /* navegador antiguo: seguimos con la fecha */ }

    if (forzado === false || (forzado === null && !esTemporada(new Date()))) return;

    // ------------------------------------------------- Las cinco calabazas
    // id -> en qué página está. El id es lo que se guarda, así que no lo
    // cambies una vez publicado o la gente perderá su progreso.
    var TOTAL = 5;
    var CLAVE = 'is_halloween_2026';

    function leidas() {
        try {
            var v = JSON.parse(localStorage.getItem(CLAVE) || '[]');
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    }

    function guardar(lista) {
        try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) { /* modo privado */ }
    }

    // ------------------------------------------------------------ Dibujos
    function svgCalabaza() {
        return '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<path d="M16 7c-1 0-1.6.4-2.2 1C12 6.6 9.6 6.4 7.6 7.6 4.6 9.4 3 13 3 17s1.6 7.6 4.6 9.4c2 1.2 4.4 1 6.2-.4.6.6 1.2 1 2.2 1s1.6-.4 2.2-1c1.8 1.4 4.2 1.6 6.2.4C27.4 24.6 29 21 29 17s-1.6-7.6-4.6-9.4c-2-1.2-4.4-1-6.2.4C17.6 7.4 17 7 16 7z" fill="%23f08a24"/>' +
            '<path d="M16 7c-.7 0-1.2.4-1.7 1 .6 2.4.9 5.4.9 9s-.3 6.6-.9 9c.5.6 1 1 1.7 1s1.2-.4 1.7-1c-.6-2.4-.9-5.4-.9-9s.3-6.6.9-9c-.5-.6-1-1-1.7-1z" fill="%23d4731a"/>' +
            '<path d="M15 7V4.5c0-1.4 1.3-2.5 3-2.5" fill="none" stroke="%234e7a2a" stroke-width="2.2" stroke-linecap="round"/>' +
            '<path d="M9.5 14.5l3.5 3-3.5 3z" fill="%23231000"/>' +
            '<path d="M22.5 14.5l-3.5 3 3.5 3z" fill="%23231000"/>' +
            '<path d="M10.5 22.5c1.8.8 3.5 1.2 5.5 1.2s3.7-.4 5.5-1.2c-.8 1.8-2.9 3-5.5 3s-4.7-1.2-5.5-3z" fill="%23231000"/>' +
            '</svg>';
    }

    function svgMurcielago() {
        return '<svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<g fill="%230a0a12">' +
            '<ellipse cx="32" cy="22" rx="5" ry="7"/>' +
            '<path d="M30 11c-1-3-3-5-5-5 .5 1.5.3 2.8-.4 3.6z"/>' +
            '<path d="M34 11c1-3 3-5 5-5-.5 1.5-.3 2.8.4 3.6z"/>' +
            '<g class="hw-wing"><path d="M28 18C22 12 14 10 4 12c4 2 6 5 6 9 3-2 6-2 8 0 2-2 5-3 8-1z"/></g>' +
            '<g class="hw-wing"><path d="M36 18c6-6 14-8 24-6-4 2-6 5-6 9-3-2-6-2-8 0-2-2-5-3-8-1z"/></g>' +
            '</g></svg>';
    }

    // ------------------------------------------------------------ Montaje
    function arrancar() {
        var body = document.body;
        if (!body || body.classList.contains('halloween')) return;
        body.classList.add('halloween');
        if (document.querySelector('.top-bar')) body.classList.add('tsw-page');

        telaranas();
        murcielagos();
        contador();
        calabaza();
    }

    // Telarañas en las esquinas de las tarjetas que ya existen
    function telaranas() {
        var selectores = [
            '.game-card', '.title-card', '.feature-card', '.vd-card',
            '.origin-feature', '.ne-panel', '.gacha-slide', '.character-card',
            '.universe-card', '.post-card', '.class-card', '.vd-shot'
        ];
        var tarjetas = document.querySelectorAll(selectores.join(','));
        for (var i = 0; i < tarjetas.length; i++) {
            // Alterna izquierda y derecha para que no queden todas iguales
            tarjetas[i].classList.add('hw-web-corner');
            if (i % 2 === 1) tarjetas[i].classList.add('hw-web-corner--right');
        }
    }

    // Murciélagos cruzando la zona de portada
    function murcielagos() {
        var hero = document.querySelector(
            '.hero, .launcher-hero, .vd-hero, .ne-hero, .game-hero, .blog-hero');
        if (!hero) return;
        if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';

        var capa = document.createElement('div');
        capa.className = 'hw-bats';
        capa.setAttribute('aria-hidden', 'true');

        var alturas = ['12%', '26%', '44%'];
        var duraciones = [19, 26, 32];
        var esperas = [0, 7, 15];
        for (var i = 0; i < 3; i++) {
            var b = document.createElement('div');
            b.className = 'hw-bat';
            b.style.top = alturas[i];
            b.style.animationDuration = duraciones[i] + 's';
            b.style.animationDelay = esperas[i] + 's';
            b.innerHTML = svgMurcielago().replace(/%23/g, '#');
            capa.appendChild(b);
        }
        hero.appendChild(capa);
    }

    // El marcador de la búsqueda
    var cajaContador = null;

    function contador() {
        cajaContador = document.createElement('div');
        cajaContador.className = 'hw-counter';
        cajaContador.setAttribute('role', 'status');
        cajaContador.innerHTML = svgCalabaza().replace(/%23/g, '#') +
            '<span>Calabazas <b class="hw-n">0</b>/' + TOTAL + '</span>';
        document.body.appendChild(cajaContador);
        pintarContador(false);
    }

    function pintarContador(animar) {
        if (!cajaContador) return;
        var n = leidas().length;
        cajaContador.querySelector('.hw-n').textContent = n;
        if (n > 0) cajaContador.classList.add('hw-show');
        if (animar) {
            cajaContador.classList.remove('hw-ping');
            void cajaContador.offsetWidth;   // reinicia la animación
            cajaContador.classList.add('hw-ping');
        }
    }

    // La calabaza de esta página
    function calabaza() {
        var sitio = document.querySelector('[data-calabaza]');
        if (!sitio) return;
        var id = sitio.getAttribute('data-calabaza');
        if (leidas().indexOf(id) !== -1) return;   // ya la encontró

        if (getComputedStyle(sitio).position === 'static') sitio.style.position = 'relative';

        var b = document.createElement('button');
        b.className = 'hw-pumpkin';
        b.type = 'button';
        b.setAttribute('aria-label', 'Calabaza escondida: haz clic para recogerla');
        b.style.top = sitio.getAttribute('data-calabaza-top') || '14px';
        b.style.left = sitio.getAttribute('data-calabaza-left') || 'auto';
        b.style.right = sitio.getAttribute('data-calabaza-right') || '14px';
        b.innerHTML = svgCalabaza().replace(/%23/g, '#');

        b.addEventListener('click', function () {
            var lista = leidas();
            if (lista.indexOf(id) !== -1) return;
            lista.push(id);
            guardar(lista);
            b.classList.add('hw-found');
            pintarContador(true);
            setTimeout(function () { b.remove(); }, 520);
            if (lista.length >= TOTAL) setTimeout(premio, 700);
        });

        sitio.appendChild(b);
    }

    // El premio por encontrar las cinco
    function premio() {
        if (document.querySelector('.hw-prize')) return;
        var raiz = document.querySelector('[data-raiz]');
        var base = raiz ? raiz.getAttribute('data-raiz') : '';

        var caja = document.createElement('div');
        caja.className = 'hw-prize hw-open';
        caja.innerHTML =
            '<div class="hw-prize-box" role="dialog" aria-modal="true" aria-label="Has encontrado las cinco calabazas">' +
            '<button class="hw-prize-close" aria-label="Cerrar">✕</button>' +
            '<div class="hw-big">' + svgCalabaza().replace(/%23/g, '#') + '</div>' +
            '<h3>¡Las cinco calabazas!</h3>' +
            '<p>Has recorrido el Imperio entero y no se te ha escapado ni una. ' +
            'Enséñanos tu hazaña en el Discord del estudio: ' +
            'este año <b>la noche no termina</b>.</p>' +
            '<a class="hw-prize-btn" href="https://discord.gg/WygZEc54A8" target="_blank" rel="noopener">' +
            'Entrar en el Discord</a>' +
            '<button class="hw-reset" type="button">Volver a esconderlas</button>' +
            '</div>';

        caja.querySelector('.hw-prize-close').addEventListener('click', function () { caja.remove(); });
        caja.addEventListener('click', function (e) { if (e.target === caja) caja.remove(); });
        caja.querySelector('.hw-reset').addEventListener('click', function () {
            guardar([]);
            caja.remove();
            location.reload();
        });
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') { caja.remove(); document.removeEventListener('keydown', esc); }
        });

        document.body.appendChild(caja);
        void base;   // reservado por si algún día el premio enlaza dentro de la web
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', arrancar);
    } else {
        arrancar();
    }
})();

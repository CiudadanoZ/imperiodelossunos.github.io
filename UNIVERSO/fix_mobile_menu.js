const fs = require('fs');

const socialQuery = `
        @media (max-width: 600px) {
            .social-layout {
                grid-template-columns: 1fr;
                padding-top: 60px;
                padding-bottom: 60px;
            }

            .social-sidebar-left {
                position: fixed;
                bottom: 0;
                top: auto;
                height: 60px;
                width: 100%;
                flex-direction: row;
                justify-content: space-around;
                background: rgba(10, 10, 15, 0.95);
                border-top: 1px solid var(--glass-border);
                padding: 5px;
                z-index: 100;
            }

            .social-feed {
                border-left: none;
                border-right: none;
            }

            .btn-post {
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 101;
            }

            .user-profile-widget {
                display: none;
            }
        }
    </style>
`;

// PROCLAMAS
let proc = fs.readFileSync('proclamas.html', 'utf8');
if (!proc.includes('@media (max-width: 600px)')) {
    proc = proc.replace('    </style>', socialQuery);
    fs.writeFileSync('proclamas.html', proc);
}

// GUARDADOS
let guar = fs.readFileSync('guardados.html', 'utf8');
if (!guar.includes('@media (max-width: 600px)')) {
    guar = guar.replace('    </style>', socialQuery);
    fs.writeFileSync('guardados.html', guar);
}

// MENSAJEROS
let mens = fs.readFileSync('mensajeros.html', 'utf8');
const mensRegex = /@media\s*\(max-width:\s*600px\)\s*\{[\s\S]*?\}(?=\s*<\/style>)/;
const mensNew = `@media (max-width: 600px) {
            .messaging-layout {
                grid-template-columns: 1fr;
                padding-top: 60px;
                padding-bottom: 60px;
            }
            .social-sidebar-left {
                position: fixed;
                bottom: 0;
                top: auto;
                height: 60px;
                width: 100%;
                flex-direction: row;
                justify-content: space-around;
                background: rgba(10, 10, 15, 0.95);
                border-top: 1px solid var(--glass-border);
                padding: 5px;
                z-index: 100;
            }
            .btn-post {
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 101;
            }
            .user-profile-widget {
                display: none;
            }
        }`;
mens = mens.replace(mensRegex, mensNew);
fs.writeFileSync('mensajeros.html', mens);

console.log("Media queries fixed!");

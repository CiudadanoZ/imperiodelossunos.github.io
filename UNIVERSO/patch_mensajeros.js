const fs = require('fs');
let html = fs.readFileSync('mensajeros.html', 'utf8');

// 1. Modificar el header del chat para añadir el botón de volver
const headerRegex = /<div class="chat-user-profile">/;
if (!html.includes('id="btnBackMobile"')) {
    html = html.replace(headerRegex, `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <i class="fas fa-arrow-left" id="btnBackMobile" style="display: none; color: var(--accent-gold); cursor: pointer; font-size: 1.2rem;" onclick="window.closeMobileChat()"></i>
                        <div class="chat-user-profile">
`);
    // Close the new wrapper div
    html = html.replace(/<i class="fas fa-info-circle"/, '</div>\n                    <i class="fas fa-info-circle"');
}

// 2. CSS Media Query para 600px
const cssRegex = /@media\s*\(max-width:\s*600px\)\s*\{[\s\S]*?\}(?=\s*<\/style>)/;
const newCss = `@media (max-width: 600px) {
            .messaging-layout {
                grid-template-columns: 1fr;
                padding-top: 60px;
                padding-bottom: 60px;
            }
            .social-sidebar-left {
                position: fixed; bottom: 0; top: auto; height: 60px; width: 100%;
                flex-direction: row; justify-content: space-around;
                background: rgba(10, 10, 15, 0.95); border-top: 1px solid var(--glass-border);
                padding: 5px; z-index: 100;
            }
            .btn-post {
                position: fixed; bottom: 80px; right: 20px; z-index: 101;
            }
            .user-profile-widget { display: none; }
            
            /* Ajustes para móviles: Ocultar chat por defecto, mostrar lista completa */
            .messages-container {
                grid-template-columns: 1fr;
            }
            .chats-sidebar {
                width: 100%;
                display: flex; /* Mostrar lista */
            }
            .chat-info, .chats-header h2, .chats-header i { display: block; }
            .chat-window {
                display: none; /* Ocultar chat activo */
            }

            /* Cuando un chat está activo en móvil */
            .messages-container.mobile-chat-active .chats-sidebar {
                display: none;
            }
            .messages-container.mobile-chat-active .chat-window {
                display: flex;
            }
            #btnBackMobile {
                display: block !important;
            }
        }`;
html = html.replace(cssRegex, newCss);

// 3. Modificar switchChat en JS para que añada la clase
const switchChatRegex = /window\.switchChat = function\(chatId, element\) \{([\s\S]*?)renderMessages\(\);\s*\}/;
const switchChatReplacement = `window.switchChat = function(chatId, element) {
            currentChatId = chatId;
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            if (element) element.classList.add('active');
            
            // Activar vista de chat en móviles
            document.querySelector('.messages-container').classList.add('mobile-chat-active');
            
            renderMessages();
        }`;
html = html.replace(switchChatRegex, switchChatReplacement);

// 4. Modificar startNewChat para que también abra la vista móvil
const startNewRegex = /window\.startNewChat = function\(handle\) \{([\s\S]*?)renderMessages\(\);\s*\}/;
const startNewReplacement = `window.startNewChat = function(handle) {
            currentChatId = handle;
            document.getElementById('searchResults').style.display = 'none';
            document.getElementById('userSearch').value = '';
            
            // Activar vista de chat en móviles
            document.querySelector('.messages-container').classList.add('mobile-chat-active');
            
            renderMessages();
        }`;
html = html.replace(startNewRegex, startNewReplacement);

// 5. Añadir closeMobileChat al script
if (!html.includes('window.closeMobileChat')) {
    const renderMsgEnd = /renderMessages\(\);\s*\}/;
    html = html.replace(renderMsgEnd, `renderMessages();\n        }\n\n        window.closeMobileChat = function() {\n            document.querySelector('.messages-container').classList.remove('mobile-chat-active');\n            currentChatId = null;\n        };`);
}

fs.writeFileSync('mensajeros.html', html);
console.log("mensajeros.html patched for mobile view.");

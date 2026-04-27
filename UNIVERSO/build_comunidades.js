const fs = require('fs');
const path = require('path');

// ======================= COMUNIDADES.HTML =======================
let com = fs.readFileSync('comunidades.html', 'utf8');

// Title
com = com.replace(/<title>.*?<\/title>/, '<title>Gremios | Imperio de los Sueños</title>');

// Active nav item
com = com.replace(/<a href="index\.html" class="social-nav-item active">/, '<a href="index.html" class="social-nav-item">');
com = com.replace(/<a href="comunidades\.html" class="social-nav-item">/, '<a href="comunidades.html" class="social-nav-item active">');

// Reemplazar main social-feed
const mainRegex = /<main class="social-feed">[\s\S]*?<\/main>/;
const newMain = `
        <main class="social-feed">
            <div class="feed-header">
                <h2>Explorar Gremios</h2>
                <i class="fas fa-users"></i>
            </div>

            <div style="padding: 20px; border-bottom: 1px solid var(--glass-border); text-align: center;">
                <button class="btn-post" id="btnCreateCommunity" style="width: 100%; max-width: 300px; border-radius: 10px;">Fundar Gremio</button>
            </div>

            <div id="communitiesList" style="padding: 10px;">
                <!-- Lista de comunidades -->
            </div>
        </main>
`;
com = com.replace(mainRegex, newMain);

// Add Modal for Community Creation just before <script type="module">
const scriptModuleRegex = /<script type="module">/;
const modalHTML = `
    <!-- Modal Crear Gremio -->
    <div class="comment-modal" id="createCommunityModal">
        <div class="comment-modal-content" style="padding: 20px; max-width: 400px;">
            <div class="comment-modal-header" style="padding: 0 0 15px 0;">
                <h3>Fundar Gremio</h3>
                <i class="fas fa-times close-modal" id="closeCreateModal" style="cursor:pointer; color:#777;"></i>
            </div>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
                <input type="text" id="comName" placeholder="Nombre del Gremio" style="background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 10px; border-radius: 5px; color: white;">
                <textarea id="comDesc" placeholder="Descripción de tu Gremio..." style="background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 10px; border-radius: 5px; color: white; height: 100px; resize: none;"></textarea>
                <button class="btn-post" id="submitCreateCommunity">Crear Gremio</button>
            </div>
        </div>
    </div>
    <script type="module">
`;
com = com.replace(scriptModuleRegex, modalHTML);

// Rewrite script logic
const scriptLogicRegex = /<script type="module">[\s\S]*?<\/script>/;
const newScript = `
<script type="module">
    import { SocialFirebase } from './js/social-firebase.js';

    // --- CARGAR PERFIL SIDEBAR ---
    async function loadUserInfo() {
        const user = await SocialFirebase.getCurrentUserProfile();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        document.querySelectorAll('.user-avatar-img').forEach(img => img.src = user.avatar);
        document.querySelectorAll('.user-name-text').forEach(el => el.textContent = user.name);
        document.querySelectorAll('.user-handle-text').forEach(el => el.textContent = user.handle);
    }

    // --- CARGAR COMUNIDADES ---
    async function renderCommunities() {
        const list = document.getElementById('communitiesList');
        list.innerHTML = '<div style="text-align:center; padding: 20px; color: #777;">Buscando gremios en los confines...</div>';
        try {
            const communities = await SocialFirebase.getCommunities();
            if (communities.length === 0) {
                list.innerHTML = '<div style="text-align:center; padding: 40px; color: #555;">No hay gremios fundados todavía. ¡Sé el primero!</div>';
                return;
            }

            list.innerHTML = '';
            communities.forEach(com => {
                const isMember = com.members && com.members.includes(SocialFirebase.auth.currentUser.uid);
                const html = \`
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); padding: 20px; border-radius: 12px; margin-bottom: 15px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: background 0.2s;" onclick="window.location.href='gremio.html?id=\${com.id}'">
                        <div>
                            <h3 style="margin: 0 0 5px 0; color: var(--accent-gold); font-family: Cinzel;">\${com.name}</h3>
                            <div style="color: #ccc; font-size: 0.9rem; margin-bottom: 8px;">\${com.description}</div>
                            <div style="color: #777; font-size: 0.8rem;"><i class="fas fa-users"></i> \${com.membersCount} miembros</div>
                        </div>
                        <div>
                            \${isMember ? 
                                '<span style="background: rgba(23, 191, 99, 0.2); color: #17bf63; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem;">Miembro</span>' : 
                                '<button style="background: transparent; border: 1px solid var(--accent-gold); color: var(--accent-gold); padding: 5px 15px; border-radius: 20px; cursor: pointer;" onclick="event.stopPropagation(); window.joinCommunity(\\'\${com.id}\\')">Unirse</button>'}
                        </div>
                    </div>
                \`;
                list.insertAdjacentHTML('beforeend', html);
            });
        } catch (e) {
            console.error(e);
            list.innerHTML = '<div style="color: red; text-align:center;">Error al cargar gremios.</div>';
        }
    }

    window.joinCommunity = async (id) => {
        await SocialFirebase.joinCommunity(id);
        renderCommunities();
    };

    // --- MODAL CREAR ---
    document.getElementById('btnCreateCommunity').addEventListener('click', () => {
        document.getElementById('createCommunityModal').style.display = 'flex';
    });
    document.getElementById('closeCreateModal').addEventListener('click', () => {
        document.getElementById('createCommunityModal').style.display = 'none';
    });
    document.getElementById('submitCreateCommunity').addEventListener('click', async () => {
        const name = document.getElementById('comName').value.trim();
        const desc = document.getElementById('comDesc').value.trim();
        if (name && desc) {
            try {
                await SocialFirebase.createCommunity(name, desc);
                document.getElementById('createCommunityModal').style.display = 'none';
                document.getElementById('comName').value = '';
                document.getElementById('comDesc').value = '';
                renderCommunities();
            } catch (e) {
                alert("Error al fundar el gremio: " + e.message);
            }
        }
    });

    // --- INIT ---
    SocialFirebase.auth.onAuthStateChanged(user => {
        if (user) {
            loadUserInfo();
            renderCommunities();
        } else {
            window.location.href = 'login.html';
        }
    });

    window.logoutLegacy = async () => {
        await SocialFirebase.logout();
        window.location.href = 'login.html';
    };
</script>
`;
com = com.replace(scriptLogicRegex, newScript);

// Remove the old compose box logic that we don't need in comunidades.html
fs.writeFileSync('comunidades.html', com, 'utf8');


// ======================= GREMIO.HTML =======================
let grem = fs.readFileSync('gremio.html', 'utf8');

grem = grem.replace(/<title>.*?<\/title>/, '<title>Gremio | Imperio de los Sueños</title>');
grem = grem.replace(/<a href="index\.html" class="social-nav-item active">/, '<a href="index.html" class="social-nav-item">');
grem = grem.replace(/<a href="comunidades\.html" class="social-nav-item">/, '<a href="comunidades.html" class="social-nav-item active">');

const gremMainRegex = /<main class="social-feed">[\s\S]*?<\/main>/;
const gremNewMain = `
        <main class="social-feed">
            <div class="feed-header" style="display: flex; gap: 10px; align-items: center;">
                <a href="comunidades.html" style="color: var(--text-light);"><i class="fas fa-arrow-left"></i></a>
                <h2 id="gremioName">Cargando Gremio...</h2>
            </div>

            <!-- Cabecera del Gremio -->
            <div style="padding: 20px; border-bottom: 1px solid var(--glass-border); text-align: center; background: rgba(0,0,0,0.2);">
                <div id="gremioDesc" style="color: #ccc; margin-bottom: 15px; font-style: italic;"></div>
                <div style="display: flex; justify-content: center; gap: 15px; align-items: center;">
                    <span style="color: #777; font-size: 0.9rem;"><i class="fas fa-users"></i> <span id="gremioMembers">0</span> miembros</span>
                    <button id="btnJoinLeave" class="btn-follow" style="display: none;">Unirse</button>
                </div>
            </div>

            <!-- Caja para publicar en Gremio -->
            <div class="compose-box" id="gremioCompose" style="display: none;">
                <img src="" alt="Avatar" class="avatar user-avatar-img">
                <div class="compose-input-area">
                    <textarea class="compose-input" id="postText" placeholder="Aporta tu sabiduría al Gremio..."></textarea>
                    <div class="compose-actions">
                        <div class="action-icons">
                            <i class="fas fa-image" id="imgBtn"></i>
                        </div>
                        <button class="btn-small-post" id="publishBtn">Publicar</button>
                    </div>
                    <div id="imagePreviewArea" style="display: none; margin-top: 10px; position: relative;">
                        <img id="imgPreview" src="" style="max-width: 100%; border-radius: 10px;">
                        <i class="fas fa-times-circle" id="removeImg" style="position: absolute; top: 10px; right: 10px; color: var(--accent-gold); cursor: pointer;"></i>
                    </div>
                    <input type="file" id="imgInput" accept="image/*" style="display: none;">
                </div>
            </div>

            <div id="legendsFeed"></div>
        </main>
`;
grem = grem.replace(gremMainRegex, gremNewMain);

const gremScriptRegex = /<script type="module">[\s\S]*?<\/script>/;
const gremNewScript = `
<script type="module">
    import { SocialFirebase } from './js/social-firebase.js';

    let currentCommunityId = null;
    let currentCommunityName = null;
    let postImageData = null;

    // --- CARGAR PERFIL ---
    async function loadUserInfo() {
        const user = await SocialFirebase.getCurrentUserProfile();
        if (!user) return;
        document.querySelectorAll('.user-avatar-img').forEach(img => img.src = user.avatar);
        document.querySelectorAll('.user-name-text').forEach(el => el.textContent = user.name);
        document.querySelectorAll('.user-handle-text').forEach(el => el.textContent = user.handle);
    }

    // --- CARGAR GREMIO ---
    async function loadCommunity() {
        const urlParams = new URLSearchParams(window.location.search);
        currentCommunityId = urlParams.get('id');
        
        if (!currentCommunityId) {
            window.location.href = 'comunidades.html';
            return;
        }

        const com = await SocialFirebase.getCommunity(currentCommunityId);
        if (!com) {
            alert("Gremio no encontrado o destruido.");
            window.location.href = 'comunidades.html';
            return;
        }

        currentCommunityName = com.name;
        document.getElementById('gremioName').textContent = com.name;
        document.getElementById('gremioDesc').textContent = com.description;
        document.getElementById('gremioMembers').textContent = com.membersCount;

        const isMember = com.members && com.members.includes(SocialFirebase.auth.currentUser.uid);
        const btn = document.getElementById('btnJoinLeave');
        btn.style.display = 'inline-block';
        
        if (isMember) {
            btn.textContent = 'Abandonar Gremio';
            btn.style.borderColor = '#e0245e';
            btn.style.color = '#e0245e';
            document.getElementById('gremioCompose').style.display = 'flex'; // Solo los miembros publican
        } else {
            btn.textContent = 'Unirse al Gremio';
            btn.style.borderColor = 'var(--accent-gold)';
            btn.style.color = 'var(--accent-gold)';
            document.getElementById('gremioCompose').style.display = 'none';
        }

        btn.onclick = async () => {
            if (isMember) {
                await SocialFirebase.leaveCommunity(currentCommunityId);
            } else {
                await SocialFirebase.joinCommunity(currentCommunityId);
            }
            loadCommunity(); // Recargar datos
        };

        // Suscribirse al feed específico del gremio
        SocialFirebase.onFeedUpdate(posts => {
            renderFeed(posts);
            updateTrends(posts);
        }, currentCommunityId);
    }

    // --- PUBLICAR EN GREMIO ---
    document.getElementById('imgBtn').addEventListener('click', () => document.getElementById('imgInput').click());
    document.getElementById('imgInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                postImageData = event.target.result;
                document.getElementById('imgPreview').src = postImageData;
                document.getElementById('imagePreviewArea').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('removeImg').addEventListener('click', () => {
        postImageData = null;
        document.getElementById('imagePreviewArea').style.display = 'none';
        document.getElementById('imgInput').value = '';
    });

    document.getElementById('publishBtn').addEventListener('click', async () => {
        const text = document.getElementById('postText').value;
        const image = postImageData;

        if (text.trim() || image) {
            try {
                // Publicar con el ID de comunidad
                await SocialFirebase.addPost(text, image, currentCommunityId, currentCommunityName);
                document.getElementById('postText').value = '';
                postImageData = null;
                document.getElementById('imagePreviewArea').style.display = 'none';
                document.getElementById('imgInput').value = '';
            } catch (error) {
                alert("Error al sellar la leyenda: " + error.message);
            }
        }
    });

    // --- RENDER FEED (Igual que index) ---
    function renderFeed(posts) {
        const feedContainer = document.getElementById('legendsFeed');
        if (posts.length === 0) {
            feedContainer.innerHTML = '<div style="padding:40px; text-align:center; color:#555;">No hay leyendas en este gremio todavía.</div>';
            return;
        }
        
        feedContainer.innerHTML = '';
        posts.forEach(post => {
            const postHTML = \`
                <article class="post" data-id="\${post.id}">
                    <img src="\${post.avatar}" alt="Avatar" class="avatar" style="object-fit: contain; background: #000;">
                    <div class="post-content">
                        <div class="post-header">
                            <span class="post-author">\${post.author}</span>
                            <span class="post-handle">\${post.handle}</span>
                            <span class="post-time">\${new Date(post.timestamp).toLocaleString()}</span>
                        </div>
                        <div class="post-text">\${post.text}</div>
                        \${(post.image && post.image.includes('data:image')) ? \`<img src="\${post.image}" alt="Media" class="post-image">\` : ''}
                        <div class="post-interactions">
                            <div class="interaction" onclick="event.stopPropagation(); window.openCommentModal('\${post.id}')">
                                <i class="far fa-comment"></i> \${post.commentsCount || 0}
                            </div>
                            <div class="interaction retweet \${post.retweeted ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleRetweet('\${post.id}')">
                                <i class="fas fa-retweet"></i> \${post.retweets}
                            </div>
                            <div class="interaction like \${post.liked ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleLike('\${post.id}')">
                                <i class="\${post.liked ? 'fas' : 'far'} fa-heart"></i> \${post.likes}
                            </div>
                            <div class="interaction save \${post.saved ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleSave('\${post.id}')">
                                <i class="\${post.saved ? 'fas' : 'far'} fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </article>
            \`;
            feedContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }

    // Funciones globales para interacciones
    window.toggleLike = async (id) => await SocialFirebase.toggleLike(id);
    window.toggleRetweet = async (id) => await SocialFirebase.toggleRetweet(id);
    window.toggleSave = async (id) => await SocialFirebase.toggleSave(id);
    
    // (Modal de comentarios se maneja en el HTML, necesitaría las funciones, 
    // lo simplificaremos por ahora omitiendo el modal aquí o implementándolo resumido)
    window.openCommentModal = (id) => alert("Ecos deshabilitados temporalmente en Gremios.");

    // --- TENDENCIAS (Igual) ---
    function updateTrends(posts) {
        const container = document.getElementById('trendsContainer');
        if (!container) return;
        container.innerHTML = '';
        const hashtagCounts = {};
        posts.forEach(p => {
            const tags = p.text.match(/#\\w+/g) || [];
            tags.forEach(t => {
                const lower = t.toLowerCase();
                hashtagCounts[lower] = (hashtagCounts[lower] || 0) + 1;
            });
        });
        const sorted = Object.entries(hashtagCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
        if(sorted.length===0) {
            container.innerHTML = '<div style="padding:10px; color:#555; text-align:center;">Sin tendencias locales.</div>';
            return;
        }
        sorted.forEach(([tag, c]) => {
            container.innerHTML += \`<div class="trend-item"><div class="trend-title">\${tag}</div></div>\`;
        });
    }

    // --- INIT ---
    SocialFirebase.auth.onAuthStateChanged(user => {
        if (user) {
            loadUserInfo();
            loadCommunity();
        } else {
            window.location.href = 'login.html';
        }
    });

</script>
`;
grem = grem.replace(gremScriptRegex, gremNewScript);

fs.writeFileSync('gremio.html', grem, 'utf8');

console.log("Comunidades and Gremio HTML built successfully.");

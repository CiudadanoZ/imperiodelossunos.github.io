/**
 * UNIVERSO - Social Database Layer
 * Maneja la persistencia de datos en localStorage para simulacion de red social.
 */

const SocialDB = {
    // Claves para localStorage
    KEYS: {
        POSTS: 'universo_posts',
        MESSAGES: 'universo_messages',
        USERS: 'universo_users',
        SESSION: 'universo_current_session'
    },

    // Datos por defecto
    DEFAULTS: {
        USERS: [
            {
                name: "Aventurero",
                handle: "@noble_errante",
                password: "123",
                avatar: "https://via.placeholder.com/150/1a1a24/d4af37?text=A",
                bio: "Explorador de las sombras. Buscando la redención en los Reinos de Athermoor.",
                location: "Ciudad Esperanza",
                joined: "Marzo 2026",
                following: 12,
                followers: 3
            }
        ],
        POSTS: [
            {
                id: 1,
                author: "El Anciano Erudito",
                handle: "@creador_grimorio",
                avatar: "../img/personaje-protagonista.png",
                time: "2h",
                text: "Siento la corrupción extenderse más allá del límite de Ciudad Esperanza. El sello que colocamos hace ciclos se está debilitando... Necesitamos reunir a la vanguardia antes del próximo solsticio rojo. ¿Quién se une a la cruzada? ⚔️🌑 #TheShadowWorld #JRPG",
                likes: 523,
                comments: 142,
                retweets: 89,
                liked: false
            },
            {
                id: 2,
                author: "Imperio Devs",
                handle: "@imperio_sueños",
                avatar: "../img/TSW_logo.png",
                time: "5h",
                text: "Hemos estado trabajando en los nuevos bocetos para las ruinas de Athermoor. Echad un vistazo a la oscuridad que se esconde detrás de la cascada. 👇✨",
                image: "../img/media-1.png",
                likes: 1200,
                comments: 56,
                retweets: 112,
                liked: false
            }
        ],
        MESSAGES: {
            "@creador_grimorio_@noble_errante": [
                { id: 1, sender: "@creador_grimorio", text: "Saludos, joven aventurero. He estado analizando los últimos informes de Ciudad Esperanza.", time: "14:05" }
            ]
        }
    },

    init() {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(this.DEFAULTS.USERS));
        }
        if (!localStorage.getItem(this.KEYS.POSTS)) {
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(this.DEFAULTS.POSTS));
        }
        if (!localStorage.getItem(this.KEYS.MESSAGES)) {
            localStorage.setItem(this.KEYS.MESSAGES, JSON.stringify(this.DEFAULTS.MESSAGES));
        }
    },

    // --- SESION ---
    isAuthenticated() {
        return !!localStorage.getItem(this.KEYS.SESSION);
    },

    getCurrentUser() {
        const handle = localStorage.getItem(this.KEYS.SESSION);
        if (!handle) return null;
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        return users.find(u => u.handle === handle);
    },

    login(handle, password) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        const user = users.find(u => u.handle === handle && u.password === password);
        if (user) {
            localStorage.setItem(this.KEYS.SESSION, handle);
            return true;
        }
        return false;
    },

    register(userData) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        if (users.find(u => u.handle === userData.handle)) {
            return { success: false, message: "Este nombre de bardo ya está en uso." };
        }

        const newUser = {
            ...userData,
            avatar: `https://via.placeholder.com/150/1a1a24/d4af37?text=${userData.name[0]}`,
            joined: "Marzo 2026",
            following: 0,
            followers: 0
        };

        users.push(newUser);
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        localStorage.setItem(this.KEYS.SESSION, newUser.handle);
        return { success: true };
    },

    logout() {
        localStorage.removeItem(this.KEYS.SESSION);
        window.location.href = 'login.html';
    },

    // --- PUBLICACIONES ---
    getPosts() {
        return JSON.parse(localStorage.getItem(this.KEYS.POSTS));
    },

    addPost(text, options = {}) {
        const posts = this.getPosts();
        const user = this.getCurrentUser();

        const newPost = {
            id: Date.now(),
            author: user.name,
            handle: user.handle,
            avatar: user.avatar,
            time: "Hoy",
            text: text,
            likes: 0,
            comments: 0,
            retweets: 0,
            liked: false,
            // Nuevos campos opcionales
            image: options.image || null,
            poll: options.poll || null, // { options: ["Si", "No"], votes: [0, 0] }
            scheduled: options.scheduled || null // "Fecha"
        };

        posts.unshift(newPost);
        localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts));
        return newPost;
    },

    toggleLike(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id == postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts));
        }
        return post;
    },

    getTrendData() {
        const posts = this.getPosts();
        const trends = {
            hashtags: {},
            topPosts: []
        };

        posts.forEach(post => {
            // Extraer Hashtags
            const tags = post.text.match(/#[a-z0-9_]+/gi);
            if (tags) {
                tags.forEach(tag => {
                    const cleanTag = tag.toLowerCase();
                    trends.hashtags[cleanTag] = (trends.hashtags[cleanTag] || 0) + 1;
                });
            }
        });

        // Convertir y ordenar hashtags
        trends.hashtags = Object.entries(trends.hashtags)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Top posts por likes
        trends.topPosts = [...posts]
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, 3);

        return trends;
    },

    toggleRetweet(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id == postId);
        if (post) {
            post.retweeted = !post.retweeted;
            post.retweets += post.retweeted ? 1 : -1;
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts));
        }
        return post;
    },

    getComments(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id == postId);
        return post ? (post.replies || []) : [];
    },

    addComment(postId, text) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id == postId);
        const user = this.getCurrentUser();
        
        if (post && user) {
            if (!post.replies) post.replies = [];
            
            const newComment = {
                id: Date.now(),
                author: user.name,
                handle: user.handle,
                avatar: user.avatar,
                time: "Ahora mismo",
                text: text
            };
            
            post.replies.push(newComment);
            post.comments = post.replies.length;
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(posts));
            return newComment;
        }
        return null;
    },

    // --- MENSAJES ---
    _getChatKey(h1, h2) {
        // Normalizar handles si no tienen @
        const h1n = h1.startsWith('@') ? h1 : '@' + h1;
        const h2n = h2.startsWith('@') ? h2 : '@' + h2;
        return [h1n, h2n].sort().join('_');
    },

    getMessages(targetHandle) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return [];

        const allMessages = JSON.parse(localStorage.getItem(this.KEYS.MESSAGES));
        const key = this._getChatKey(currentUser.handle, targetHandle);
        return allMessages[key] || [];
    },

    getFollowers(handle) {
        const allUsers = this.getAllUsers();
        return allUsers.filter(u => u.followingList && u.followingList.includes(handle));
    },

    getFollowing(handle) {
        const allUsers = this.getAllUsers();
        const user = allUsers.find(u => u.handle === handle);
        if (!user || !user.followingList) return [];
        return allUsers.filter(u => user.followingList.includes(u.handle));
    },

    // --- USUARIOS ---
    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.KEYS.USERS));
    },

    toggleFollow(handle) {
        const currentUser = this.getCurrentUser();
        const allUsers = this.getAllUsers();
        const targetUser = allUsers.find(u => u.handle === handle);

        if (!targetUser || handle === currentUser.handle) return;

        if (!currentUser.followingList) currentUser.followingList = [];

        const index = currentUser.followingList.indexOf(handle);
        if (index === -1) {
            currentUser.followingList.push(handle);
            currentUser.following++;
            targetUser.followers++;
        } else {
            currentUser.followingList.splice(index, 1);
            currentUser.following--;
            targetUser.followers--;
        }

        this.saveUser(currentUser);
        this.saveUser(targetUser);
        return currentUser.followingList.includes(handle);
    },

    // --- MENSAJES Y CHATS ---
    getChatList() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return [];

        const allMessages = JSON.parse(localStorage.getItem(this.KEYS.MESSAGES));
        const allUsers = this.getAllUsers();

        // Un chat existe si el currentUser está en la clave (ej: "@userA_@userB")
        return Object.keys(allMessages)
            .filter(key => key.includes(currentUser.handle))
            .map(key => {
                const handles = key.split('_');
                const targetHandle = handles.find(h => h !== currentUser.handle);
                // Caso especial si es chat con uno mismo (aunque se evite en UI)
                const finalTarget = targetHandle || currentUser.handle;

                const user = allUsers.find(u => u.handle === finalTarget);
                if (!user) return null;

                const msgs = allMessages[key];
                const lastMsg = msgs[msgs.length - 1];

                return {
                    ...user,
                    chatId: finalTarget, // Usamos el handle del otro como ID para la UI
                    lastMsg: lastMsg ? lastMsg.text : "Empezar leyenda...",
                    time: lastMsg ? lastMsg.time : ""
                };
            }).filter(item => item !== null);
    },

    sendMessage(targetHandle, text, options = {}) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return null;

        const allMessages = JSON.parse(localStorage.getItem(this.KEYS.MESSAGES));
        const key = this._getChatKey(currentUser.handle, targetHandle);

        if (!allMessages[key]) allMessages[key] = [];

        const now = new Date();
        const timeStr = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

        const newMsg = {
            id: Date.now(),
            sender: options.sender || currentUser.handle, // Por defecto soy yo, o se puede simular
            text: text,
            time: timeStr,
            attachment: options.attachment || null
        };

        allMessages[key].push(newMsg);
        localStorage.setItem(this.KEYS.MESSAGES, JSON.stringify(allMessages));
        return newMsg;
    },

    saveUser(userData) {
        const users = JSON.parse(localStorage.getItem(this.KEYS.USERS));
        const index = users.findIndex(u => u.handle === userData.handle);
        if (index !== -1) {
            users[index] = userData;
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
        }
    }
};

SocialDB.init();
window.SocialDB = SocialDB;

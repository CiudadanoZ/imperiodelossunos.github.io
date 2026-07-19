// social-firebase.js
// Configuración de Firebase para UNIVERSO
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc, where, deleteDoc, runTransaction, limit, increment } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser, sendPasswordResetEmail, updateEmail } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Configuración obtenida del usuario
const firebaseConfig = {
  apiKey: "AIzaSyCUfioQuLPJpByrDn8cJIVpyIk80M2FfXI",
  authDomain: "universo-260ce.firebaseapp.com",
  projectId: "universo-260ce",
  storageBucket: "universo-260ce.firebasestorage.app",
  messagingSenderId: "123164621968",
  appId: "1:123164621968:web:72ffa4e9dbe4d70e19ec15"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const SocialFirebase = {
    auth,
    db,

    // Genera un avatar aleatorio tipo emoji (fondo de color + emoji temático).
    // Los usuarios NO suben fotos: siempre se asigna uno de estos. El resultado
    // es una imagen pequeña que se guarda en el propio documento de Firestore,
    // así que funciona en el plan gratuito (no hace falta Firebase Storage).
    generateRandomAvatar() {
        const colors = [
            "#4a148c", "#311b92", "#1a237e", "#0d47a1", "#01579b", "#006064", "#004d40",
            "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c",
            "#3e2723", "#212121", "#263238", "#b71c1c", "#880e4f"
        ];
        const emojis = [
            "🐉", "🗡️", "🛡️", "🔮", "👑", "⚔️", "🏰", "🦉", "🐺", "🔥", "🌙", "⭐",
            "🍄", "🗝️", "📜", "⚗️", "🏹", "💀", "🧙", "🐲", "🦅", "🕷️", "🦇", "🐍",
            "👁️", "🎭", "🧝", "🧪", "🌟", "🪄"
        ];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Renderizamos a PNG en un canvas: los emojis dentro de un SVG-como-imagen
        // no siempre se pintan en color en todos los navegadores; el PNG sí.
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, 100, 100);
            ctx.font = '58px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(emoji, 50, 56);
            return canvas.toDataURL('image/png');
        } catch (e) {
            // Reserva por si canvas no está disponible.
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bgColor}"/><text x="50" y="54" font-size="56" text-anchor="middle" dominant-baseline="central">${emoji}</text></svg>`;
            return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
        }
    },

    // --- AUTENTICACIÓN ---
    // Normaliza un handle a su clave única (sin @, en minúsculas, sin espacios).
    _handleKey(handle) {
        return String(handle || '').replace(/^@/, '').trim().toLowerCase();
    },

    async register(name, email, password, handle, bio, location) {
        // Asegurarse de que el handle tenga @
        const finalHandle = handle.startsWith('@') ? handle : "@" + handle;
        const handleKey = this._handleKey(finalHandle);
        if (!handleKey) throw new Error("Ese @handle no es válido.");

        // Comprobación rápida antes de crear la cuenta (sin sesión). La unicidad
        // real la garantiza la transacción de más abajo.
        const handleRef = doc(db, "handles", handleKey);
        const pre = await getDoc(handleRef);
        if (pre.exists()) throw new Error("Ese @handle ya está en uso. Elige otro.");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Reclamar el handle de forma atómica: si otro lo tomó entre medias, la
        // transacción falla y deshacemos la cuenta recién creada.
        try {
            await runTransaction(db, async (tx) => {
                const snap = await tx.get(handleRef);
                if (snap.exists()) throw new Error("Ese @handle ya está en uso. Elige otro.");
                tx.set(handleRef, { uid: user.uid, handle: finalHandle });
            });
        } catch (e) {
            await deleteUser(user).catch(() => {});
            throw e;
        }

        const randomAvatar = this.generateRandomAvatar();

        // Guardar perfil extendido en Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            handle: finalHandle,
            avatar: randomAvatar,
            bio: bio || "Un nuevo héroe ha llegado a Narak'Thul.",
            location: location || "Tierras Desconocidas",
            joined: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            following: [],
            followers: 0,
            uid: user.uid
        });
        return user;
    },

    async login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
        return await signOut(auth);
    },

    // Envía el correo de restablecimiento de contraseña (solo sirve si el email
    // de la cuenta es real; las cuentas antiguas usan handle@universo.com).
    async resetPassword(email) {
        return await sendPasswordResetEmail(auth, email);
    },

    // ¿La cuenta actual usa un email real o el sintético heredado?
    hasRealEmail() {
        const user = auth.currentUser;
        return !!(user && user.email && !user.email.endsWith('@universo.com'));
    },

    // Vincula un email real a una cuenta existente (para habilitar la
    // recuperación). Cambia el email de autenticación: a partir de ahí el
    // usuario inicia sesión con ese email, no con @handle.
    async updateAuthEmail(newEmail) {
        const user = auth.currentUser;
        if (!user) throw new Error("No hay sesión activa.");
        await updateEmail(user, newEmail);
    },

    // Cache de UIDs bloqueados por el usuario actual (para filtrar feeds/comentarios).
    _blockedUids: [],

    async getCurrentUserProfile() {
        const user = auth.currentUser;
        if (!user) return null;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : null;
        if (data) this._blockedUids = Array.isArray(data.blocked) ? data.blocked : [];
        return data;
    },

    // --- BLOQUEO DE USUARIOS ---
    isBlocked(targetUid) {
        return this._blockedUids.includes(targetUid);
    },

    async toggleBlock(targetUid) {
        const user = auth.currentUser;
        if (!user || !targetUid || user.uid === targetUid) return;
        const userRef = doc(db, "users", user.uid);
        if (this._blockedUids.includes(targetUid)) {
            await updateDoc(userRef, { blocked: arrayRemove(targetUid) });
            this._blockedUids = this._blockedUids.filter(u => u !== targetUid);
        } else {
            await updateDoc(userRef, { blocked: arrayUnion(targetUid) });
            this._blockedUids = [...this._blockedUids, targetUid];
        }
    },

    async getBlockedUsers() {
        const out = [];
        for (const uid of this._blockedUids) {
            const snap = await getDoc(doc(db, "users", uid));
            if (snap.exists()) out.push({ ...snap.data(), uid });
        }
        return out;
    },

    // --- LEYENDAS (POSTS) ---
    async addPost(text, image = null, poll = null, communityId = null, communityName = null) {
        const profile = await this.getCurrentUserProfile();
        if (!profile) throw new Error("No hay sesión activa");

        return await addDoc(collection(db, "posts"), {
            author: profile.name,
            handle: profile.handle,
            avatar: profile.avatar,
            authorUid: auth.currentUser.uid, // Guardamos el UID del autor para notificaciones
            text: text,
            image: image,
            poll: poll,
            communityId: communityId,
            communityName: communityName,
            timestamp: Date.now(),
            likes: [], 
            retweets: [], 
            commentsCount: 0
        });
    },

    // limitCount: si se indica, solo trae las N leyendas más recientes (paginación).
    // El callback recibe (posts, rawCount) donde rawCount es cuántos documentos
    // devolvió la consulta ANTES de filtrar por comunidad, para saber si hay más.
    onFeedUpdate(callback, filterCommunityId = undefined, limitCount = null) {
        const q = limitCount
            ? query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(limitCount))
            : query(collection(db, "posts"), orderBy("timestamp", "desc"));
        return onSnapshot(q, (snapshot) => {
            const rawCount = snapshot.docs.length;
            let posts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Adaptar arrays de likes/retweets/saves a contadores para la UI vieja
                likes: (doc.data().likes || []).length,
                retweets: (doc.data().retweets || []).length,
                liked: (doc.data().likes || []).includes(auth.currentUser?.uid),
                retweeted: (doc.data().retweets || []).includes(auth.currentUser?.uid),
                saved: (doc.data().savedBy || []).includes(auth.currentUser?.uid)
            }));

            if (filterCommunityId !== undefined) {
                if (filterCommunityId === null) {
                    posts = posts.filter(p => !p.communityId); // Solo feed global
                } else {
                    posts = posts.filter(p => p.communityId === filterCommunityId); // Solo esta comunidad
                }
            }
            // Ocultar leyendas de usuarios bloqueados.
            posts = posts.filter(p => !this._blockedUids.includes(p.authorUid));
            callback(posts, rawCount);
        });
    },

    async deletePost(postId) {
        try {
            const user = auth.currentUser;
            if (!user) return;
            const postRef = doc(db, "posts", postId);
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const data = postSnap.data();
                const profile = await this.getCurrentUserProfile();
                if (data.authorUid === user.uid || (profile && data.handle === profile.handle)) {
                    await deleteDoc(postRef);
                } else {
                    console.error("No tienes permiso para borrar esta leyenda.");
                }
            }
        } catch (e) {
            console.error("Error al borrar post:", e);
        }
    },

    async votePoll(postId, optionIndex) {
        const user = auth.currentUser;
        if (!user) return;
        const postRef = doc(db, "posts", postId);
        // Transacción: evita que dos votos simultáneos se pisen (condición de carrera).
        await runTransaction(db, async (tx) => {
            const snap = await tx.get(postRef);
            if (!snap.exists()) return;
            const data = snap.data();
            if (!data.poll) return;

            const voters = data.poll.voters || {};
            if (voters[user.uid] !== undefined) return; // ya votó

            voters[user.uid] = optionIndex;
            const votes = Array.isArray(data.poll.votes) ? data.poll.votes.slice() : [];
            votes[optionIndex] = (votes[optionIndex] || 0) + 1;

            tx.update(postRef, { poll: { ...data.poll, votes, voters } });
        });
    },

    async toggleLike(postId) {
        const user = auth.currentUser;
        if (!user) return;
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) return;

        const data = postSnap.data();
        const likes = data.likes || [];
        if (likes.includes(user.uid)) {
            await updateDoc(postRef, { likes: arrayRemove(user.uid) });
        } else {
            await updateDoc(postRef, { likes: arrayUnion(user.uid) });
            // Notificar al autor si no es el mismo usuario
            let targetUid = data.authorUid;
            if (!targetUid && data.handle) {
                const uq = query(collection(db, "users"), where("handle", "==", data.handle));
                const usnap = await getDocs(uq);
                if (!usnap.empty) targetUid = usnap.docs[0].id;
            }
            if (targetUid && targetUid !== user.uid) {
                const profile = await this.getCurrentUserProfile();
                await this.addNotification(targetUid, 'like', profile.name, profile.handle, postId);
            }
        }
    },

    async toggleRetweet(postId) {
        const user = auth.currentUser;
        if (!user) return;
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) return;

        const data = postSnap.data();
        const retweets = data.retweets || [];
        if (retweets.includes(user.uid)) {
            await updateDoc(postRef, { retweets: arrayRemove(user.uid) });
        } else {
            await updateDoc(postRef, { retweets: arrayUnion(user.uid) });
            // Notificar al autor de la leyenda
            let targetUid = data.authorUid;
            if (!targetUid && data.handle) {
                const uq = query(collection(db, "users"), where("handle", "==", data.handle));
                const usnap = await getDocs(uq);
                if (!usnap.empty) targetUid = usnap.docs[0].id;
            }
            if (targetUid && targetUid !== user.uid) {
                const profile = await this.getCurrentUserProfile();
                await this.addNotification(targetUid, 'retweet', profile.name, profile.handle, postId);
            }
        }
    },

    async toggleSave(postId) {
        const user = auth.currentUser;
        if (!user) return;
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) return;

        const savedBy = postSnap.data().savedBy || [];
        if (savedBy.includes(user.uid)) {
            await updateDoc(postRef, { savedBy: arrayRemove(user.uid) });
        } else {
            await updateDoc(postRef, { savedBy: arrayUnion(user.uid) });
        }
    },

    onSavedFeedUpdate(callback) {
        const user = auth.currentUser;
        if (!user) return;
        // Búscamos posts donde el UID del usuario esté en savedBy
        const q = query(collection(db, "posts"), 
                        where("savedBy", "array-contains", user.uid));
        
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                likes: (doc.data().likes || []).length,
                retweets: (doc.data().retweets || []).length,
                liked: (doc.data().likes || []).includes(user.uid),
                retweeted: (doc.data().retweets || []).includes(user.uid),
                saved: true
            }));
            
            posts.sort((a, b) => b.timestamp - a.timestamp);
            callback(posts.filter(p => !this._blockedUids.includes(p.authorUid)));
        }, (error) => {
            console.error("Error en onSavedFeedUpdate:", error);
        });
    },

    async updateUserProfile(data) {
        const user = auth.currentUser;
        if (!user) throw new Error("No hay sesión");
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, data);
    },

    // --- AVATAR ---
    async updateUserAvatar(newAvatarData) {
        const user = auth.currentUser;
        if (!user) throw new Error("No hay sesión");
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { avatar: newAvatarData });
    },

    // --- COMENTARIOS (ECOS) ---
    async addComment(postId, text) {
        const profile = await this.getCurrentUserProfile();
        if (!profile) return;

        const commentRef = collection(db, "posts", postId, "comments");
        await addDoc(commentRef, {
            author: profile.name,
            handle: profile.handle,
            avatar: profile.avatar,
            authorUid: auth.currentUser.uid, // para poder editar/borrar solo los propios
            text: text,
            timestamp: Date.now()
        });

        // Incremento atómico del contador (evita perder comentarios simultáneos).
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        const postData = postSnap.data();
        await updateDoc(postRef, { commentsCount: increment(1) });

        // Notificar al autor
        let targetUid = postData.authorUid;
        if (!targetUid && postData.handle) {
            const uq = query(collection(db, "users"), where("handle", "==", postData.handle));
            const usnap = await getDocs(uq);
            if (!usnap.empty) targetUid = usnap.docs[0].id;
        }
        if (targetUid && targetUid !== auth.currentUser.uid) {
            await this.addNotification(targetUid, 'comment', profile.name, profile.handle, postId);
        }
    },

    letCommentsUnsubscribe: null,
    onCommentsUpdate(postId, callback) {
        const q = query(collection(db, "posts", postId, "comments"), orderBy("timestamp", "asc"));
        this.letCommentsUnsubscribe = onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(c => !this._blockedUids.includes(c.authorUid)); // ocultar bloqueados
            callback(comments);
        });
    },

    stopCommentsUpdate() {
        if (this.letCommentsUnsubscribe) {
            this.letCommentsUnsubscribe();
            this.letCommentsUnsubscribe = null;
        }
    },

    async editComment(postId, commentId, newText) {
        const user = auth.currentUser;
        if (!user) return;
        const ref = doc(db, "posts", postId, "comments", commentId);
        await updateDoc(ref, { text: newText, editedAt: Date.now() });
    },

    async deleteComment(postId, commentId) {
        const user = auth.currentUser;
        if (!user) return;
        const ref = doc(db, "posts", postId, "comments", commentId);
        await deleteDoc(ref);
        // Mantener el contador al día (nunca por debajo de 0 lo controla la UI/consulta).
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, { commentsCount: increment(-1) });
    },

    async getPost(postId) {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        return postSnap.exists() ? { id: postSnap.id, ...postSnap.data() } : null;
    },

    // --- COMUNIDADES (GREMIOS) ---
    async createCommunity(name, description) {
        const profile = await this.getCurrentUserProfile();
        if (!profile) throw new Error("No hay sesión activa");

        const docRef = await addDoc(collection(db, "communities"), {
            name: name,
            description: description,
            creatorUid: auth.currentUser.uid,
            members: [auth.currentUser.uid], // El creador se une automáticamente
            timestamp: Date.now()
        });
        return docRef.id;
    },

    async getCommunities() {
        const q = query(collection(db, "communities"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), membersCount: (doc.data().members || []).length }));
    },

    async getCommunity(communityId) {
        const docRef = doc(db, "communities", communityId);
        const snap = await getDoc(docRef);
        return snap.exists() ? { id: snap.id, ...snap.data(), membersCount: (snap.data().members || []).length } : null;
    },

    async joinCommunity(communityId) {
        const user = auth.currentUser;
        if (!user) return;
        const comRef = doc(db, "communities", communityId);
        await updateDoc(comRef, { members: arrayUnion(user.uid) });
    },

    async leaveCommunity(communityId) {
        const user = auth.currentUser;
        if (!user) return;
        const comRef = doc(db, "communities", communityId);
        await updateDoc(comRef, { members: arrayRemove(user.uid) });
    },

    // --- MENSAJEROS (DIRECT MESSAGES) ---
    _getChatKey(h1, h2) {
        return [h1, h2].sort().join('_');
    },

    async sendMessage(targetHandle, text, options = {}) {
        const profile = await this.getCurrentUserProfile();
        if (!profile) return;
        const senderUid = auth.currentUser.uid;

        // Necesitamos el UID del destinatario para participants (privacidad) y
        // para la notificación.
        const q = query(collection(db, "users"), where("handle", "==", targetHandle));
        const snap = await getDocs(q);
        if (snap.empty) throw new Error("No existe ningún héroe con ese nombre.");
        const recipientUid = snap.docs[0].id;

        // No permitir mensajes si hay bloqueo en cualquier sentido.
        if (this._blockedUids.includes(recipientUid)) {
            throw new Error("Has bloqueado a este usuario. Desbloquéalo para escribirle.");
        }
        if ((snap.docs[0].data().blocked || []).includes(senderUid)) {
            throw new Error("No puedes enviar mensajes a este usuario.");
        }

        const chatKey = this._getChatKey(profile.handle, targetHandle);
        await addDoc(collection(db, "messages"), {
            chatKey: chatKey,
            participants: [senderUid, recipientUid], // clave para que solo los dos puedan leer
            senderUid: senderUid,
            recipientUid: recipientUid,
            sender: profile.handle,
            recipient: targetHandle,
            text: text,
            timestamp: Date.now(),
            attachment: options.attachment || null
        });

        await this.addNotification(recipientUid, 'message', profile.name, profile.handle);
    },

    onMessagesUpdate(targetHandle, callback) {
        const user = auth.currentUser;
        if (!user) return () => {};
        
        let unsubscribe = () => {};
        
        // Obtenemos el perfil y luego iniciamos el snapshot
        this.getCurrentUserProfile().then(profile => {
            if (!profile) return;
            const chatKey = this._getChatKey(profile.handle, targetHandle);
            // Consultamos por participants (uid) para respetar las reglas de
            // privacidad, y filtramos el chat concreto en memoria.
            const q = query(collection(db, "messages"),
                        where("participants", "array-contains", user.uid));

            const sub = onSnapshot(q, (snapshot) => {
                const msgs = snapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(m => m.chatKey === chatKey);
                // Ordenamos por fecha ascendente en memoria
                msgs.sort((a,b) => a.timestamp - b.timestamp);
                callback(msgs);
            }, (error) => {
                console.error("Error en onMessagesUpdate:", error);
            });
            unsubscribe = sub;
        });

        // Retornamos una función que llamará al unsubscribe real cuando esté listo
        return () => unsubscribe();
    },

    onRecentChatsUpdate(callback) {
        const user = auth.currentUser;
        if (!user) return () => {};

        return this.getCurrentUserProfile().then(profile => {
            if (!profile) return () => {};

            // Un único listener por participants (uid): trae solo mis chats y
            // respeta las reglas de privacidad. Sustituye a las dos consultas
            // por handle de antes.
            const q = query(collection(db, "messages"),
                        where("participants", "array-contains", user.uid));

            const unsub = onSnapshot(q, (snapshot) => {
                const chatsMap = new Map();
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    const otherHandle = data.sender === profile.handle ? data.recipient : data.sender;
                    const existing = chatsMap.get(otherHandle);
                    if (!existing || data.timestamp > existing.timestamp) {
                        chatsMap.set(otherHandle, { ...data, id: doc.id, handle: otherHandle });
                    }
                });

                // Convertir el Map a array y ordenar por el más reciente
                const sortedChats = Array.from(chatsMap.values()).sort((a, b) => b.timestamp - a.timestamp);

                // Buscar perfiles de los interlocutores para el avatar/nombre
                this._fillChatProfiles(sortedChats).then(callback);
            }, (error) => {
                console.error("Error en onRecentChatsUpdate:", error);
            });

            return () => unsub();
        });
    },

    async _fillChatProfiles(chats) {
        for (const chat of chats) {
            const q = query(collection(db, "users"), where("handle", "==", chat.handle));
            const snap = await getDocs(q);
            if (!snap.empty) {
                const userData = snap.docs[0].data();
                chat.name = userData.name;
                chat.avatar = userData.avatar;
            }
        }
        return chats;
    },

    async searchUsers(queryText) {
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);
        const term = queryText.toLowerCase();
        return snapshot.docs
            .map(doc => ({ ...doc.data(), uid: doc.id }))
            .filter(u => u.handle.toLowerCase().includes(term) || u.name.toLowerCase().includes(term));
    },

    // --- SEGUIDORES (ALIADOS) ---
    async toggleFollow(targetUid) {
        const user = auth.currentUser;
        if (!user || user.uid === targetUid) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const following = userSnap.data().following || [];
        
        if (following.includes(targetUid)) {
            await updateDoc(userRef, { following: arrayRemove(targetUid) });
        } else {
            await updateDoc(userRef, { following: arrayUnion(targetUid) });
            // Notificar al seguido
            const profile = userSnap.data();
            await this.addNotification(targetUid, 'follow', profile.name, profile.handle);
        }
    },

    async isFollowing(targetUid) {
        const user = auth.currentUser;
        if (!user) return false;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return false;
        const following = userSnap.data().following || [];
        return Array.isArray(following) ? following.includes(targetUid) : false;
    },

    async getSuggestedUsers(limitCount = 2) {
        const user = auth.currentUser;
        if (!user) return [];
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }))
                                    .filter(u => u.uid !== user.uid);
        users.sort(() => 0.5 - Math.random());
        return users.slice(0, limitCount);
    },

    async getFollowersCount(uid) {
        const q = query(collection(db, "users"), where("following", "array-contains", uid));
        const snap = await getDocs(q);
        return snap.size;
    },

    async getFollowingCount(uid) {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) return 0;
        return (snap.data().following || []).length;
    },

    async getFollowerUsers(uid) {
        const q = query(collection(db, "users"), where("following", "array-contains", uid));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ ...d.data(), uid: d.id }));
    },

    async getFollowingUsers(uid) {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) return [];
        const following = snap.data().following || [];
        if (following.length === 0) return [];
        
        // Firestore IN query limited to 10 elements. To be robust we should fetch individually or in chunks.
        // For now let's do a simple approach since users probably don't follow many at once.
        const users = [];
        for (const fUid of following) {
            const uSnap = await getDoc(doc(db, "users", fUid));
            if (uSnap.exists()) users.push({ ...uSnap.data(), uid: uSnap.id });
        }
        return users;
    },

    // --- NOTIFICACIONES (PROCLAMAS) ---
    async addNotification(recipientUid, type, fromName, fromHandle, postId = null) {
        return await addDoc(collection(db, "notifications"), {
            recipientUid: recipientUid,
            type: type, // 'like', 'retweet', 'comment', 'message', 'follow'
            fromName: fromName,
            fromHandle: fromHandle,
            postId: postId,
            timestamp: Date.now(),
            read: false
        });
    },

    onNotificationsUpdate(callback) {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(collection(db, "notifications"), 
                        where("recipientUid", "==", user.uid));
        
        return onSnapshot(q, (snapshot) => {
            const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Ordenar por fecha descendente
            notifs.sort((a,b) => b.timestamp - a.timestamp);
            callback(notifs);
        }, (error) => {
            console.error("Error en onNotificationsUpdate:", error);
        });
    },

    async markNotificationsAsRead() {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(collection(db, "notifications"), 
                        where("recipientUid", "==", user.uid),
                        where("read", "==", false));
        const snap = await getDocs(q);
        const batch = []; 
        snap.forEach(d => batch.push(updateDoc(doc(db, "notifications", d.id), { read: true })));
        await Promise.all(batch);
    }
};

window.SocialFirebase = SocialFirebase;

const fs = require('fs');
const path = require('path');

const files = ['index.html', 'guardados.html', 'mensajeros.html', 'perfil.html', 'proclamas.html'];

const linkToInject = `
            <a href="comunidades.html" class="social-nav-item">
                <i class="fas fa-users"></i>
                <span>Gremios</span>
            </a>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Si ya existe, no duplicar
    if (content.includes('href="comunidades.html"')) return;

    // Buscar el bloque de "Universo" y poner "Gremios" debajo
    const regex = /(<a href="index\.html" class="social-nav-item[^>]*>[\s\S]*?<\/a>)/;
    
    content = content.replace(regex, `$1${linkToInject}`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected into ${file}`);
});

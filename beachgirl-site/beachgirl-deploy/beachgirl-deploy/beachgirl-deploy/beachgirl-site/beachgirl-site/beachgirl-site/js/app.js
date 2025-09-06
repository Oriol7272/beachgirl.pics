// BeachGirl.pics - Aplicación Principal
const BASE_URL = "https://raw.githubusercontent.com/Oriol7272/beachgirl.pics/main/";

function loadImages() {
    // Verificar que content-data2.js esté cargado
    if (typeof FULL_IMAGES_POOL === 'undefined') {
        document.getElementById('carousel').innerHTML = '<div class="error">Error: No se pudo cargar content-data2.js</div>';
        console.error('FULL_IMAGES_POOL no está definido');
        return;
    }
    
    console.log(`✅ Cargadas ${FULL_IMAGES_POOL.length} imágenes desde content-data2.js`);
    
    // Mezclar array
    const shuffled = [...FULL_IMAGES_POOL].sort(() => Math.random() - 0.5);
    
    // Carrusel: primeras 40 imágenes
    const carousel = document.getElementById('carousel');
    shuffled.slice(0, 40).forEach((img, i) => {
        const div = document.createElement('div');
        div.className = 'img-box';
        div.innerHTML = `<img src="${BASE_URL}${img}" alt="Beach ${i+1}" loading="lazy">`;
        carousel.appendChild(div);
    });
    
    // Galería: siguientes 40 imágenes
    const gallery = document.getElementById('gallery');
    shuffled.slice(40, 80).forEach((img, i) => {
        const div = document.createElement('div');
        div.className = 'img-box';
        div.innerHTML = `<img src="${BASE_URL}${img}" alt="Paradise ${i+1}" loading="lazy">`;
        gallery.appendChild(div);
    });
    
    console.log('🎨 40 imágenes en carrusel + 40 en galería');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadImages);
} else {
    loadImages();
}

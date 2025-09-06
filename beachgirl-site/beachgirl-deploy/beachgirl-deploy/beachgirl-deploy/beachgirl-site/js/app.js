// USA FULL_IMAGES_POOL de content-data2.js
const BASE_URL = "https://raw.githubusercontent.com/Oriol7272/beachgirl.pics/main/";

function init() {
    if (typeof FULL_IMAGES_POOL === 'undefined') {
        console.error('ERROR: content-data2.js no cargado');
        return;
    }
    
    // Mezclar y tomar 40 para carrusel
    const shuffled = [...FULL_IMAGES_POOL].sort(() => Math.random() - 0.5);
    const carousel = document.getElementById('carousel');
    const gallery = document.getElementById('gallery');
    
    // Carrusel: primeras 40
    shuffled.slice(0, 40).forEach(img => {
        carousel.innerHTML += `<div class="img-box"><img src="${BASE_URL}${img}" alt=""></div>`;
    });
    
    // Galería: siguientes 40
    shuffled.slice(40, 80).forEach(img => {
        gallery.innerHTML += `<div class="img-box"><img src="${BASE_URL}${img}" alt=""></div>`;
    });
}

document.addEventListener('DOMContentLoaded', init);

// BeachGirl.pics - JavaScript Principal
console.log('🌴 BeachGirl.pics - Cargando contenido...');

// Configuración
const CAROUSEL_SIZE = 40;
const GALLERY_SIZE = 40;
const TOTAL_IMAGES = 127;

// Generar URLs de imágenes (usando Picsum para demo)
function generateImageUrls(count) {
    const urls = [];
    for (let i = 1; i <= count; i++) {
        urls.push(`https://picsum.photos/400/500?beach&random=${i}`);
    }
    return urls;
}

// Mezclar array aleatoriamente
function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// Inicializar Carrusel
let carouselPosition = 0;
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const images = shuffleArray(generateImageUrls(TOTAL_IMAGES)).slice(0, CAROUSEL_SIZE);
    
    carousel.innerHTML = images.map((url, i) => `
        <div class="carousel-item">
            <img src="${url}" alt="Beach Paradise ${i + 1}" loading="lazy">
            <span class="number">${i + 1}</span>
        </div>
    `).join('');
    
    console.log(`🎠 Carrusel: ${CAROUSEL_SIZE} imágenes cargadas`);
}

// Mover Carrusel
window.moveCarousel = function(direction) {
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + 20;
    const containerWidth = carousel.parentElement.offsetWidth;
    const maxScroll = Math.max(0, (items.length * itemWidth) - containerWidth);
    
    carouselPosition += direction * itemWidth * 4;
    carouselPosition = Math.max(0, Math.min(carouselPosition, maxScroll));
    
    carousel.style.transform = `translateX(-${carouselPosition}px)`;
}

// Inicializar Galería
function initGallery() {
    const gallery = document.getElementById('mainGallery');
    const images = shuffleArray(generateImageUrls(TOTAL_IMAGES)).slice(0, GALLERY_SIZE);
    
    gallery.innerHTML = images.map((url, i) => `
        <div class="gallery-item">
            <img src="${url}" alt="Beach Gallery ${i + 1}" loading="lazy">
            <span class="number">${i + 1}</span>
        </div>
    `).join('');
    
    console.log(`🖼️ Galería: ${GALLERY_SIZE} imágenes cargadas`);
}

// Rotar imágenes del banner
function initBannerRotation() {
    const banner = document.getElementById('bannerRotator');
    const bannerImages = [
        'https://picsum.photos/1920/500?beach&random=1',
        'https://picsum.photos/1920/500?ocean&random=2',
        'https://picsum.photos/1920/500?sunset&random=3',
        'https://picsum.photos/1920/500?paradise&random=4',
        'https://picsum.photos/1920/500?tropical&random=5'
    ];
    
    let currentIndex = 0;
    
    function rotateBanner() {
        banner.style.backgroundImage = `url('${bannerImages[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % bannerImages.length;
    }
    
    rotateBanner();
    setInterval(rotateBanner, 5000);
    console.log('🔄 Rotación de banner iniciada');
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏖️ Inicializando BeachGirl.pics...');
    initBannerRotation();
    initCarousel();
    initGallery();
    
    // Actualizar contenido cada 60 segundos
    setInterval(() => {
        console.log('🔄 Actualizando contenido...');
        initCarousel();
        initGallery();
    }, 60000);
    
    console.log('✨ BeachGirl.pics cargado completamente!');
});

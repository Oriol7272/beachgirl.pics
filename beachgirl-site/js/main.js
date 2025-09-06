// BeachGirl.pics - JavaScript Principal
console.log('🌴 BeachGirl.pics - Loading...');

const IMAGES_PER_LOAD = 40;
const CAROUSEL_IMAGES = 40;
const ROTATION_INTERVAL = 5000;

// Pool de imágenes
let fullImagesPool = [];
let decorativeImages = [];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏖️ BeachGirl.pics - Initializing...');
    loadContentData();
    initializeBannerRotation();
    initializeCarousel();
    initializeGallery();
});

// Cargar datos de contenido
function loadContentData() {
    // Intentar cargar desde content-data2.js si existe
    if (typeof FULL_IMAGES_POOL !== 'undefined') {
        fullImagesPool = FULL_IMAGES_POOL;
        console.log(`✅ Loaded ${fullImagesPool.length} images from content-data2.js`);
    } else {
        // Usar placeholders para demostración
        console.log('📸 Using placeholder images for demo');
        fullImagesPool = generatePlaceholderImages(127);
    }
    
    // Imágenes decorativas para el banner rotatorio
    decorativeImages = [
        'https://picsum.photos/1920/1080?beach&random=1',
        'https://picsum.photos/1920/1080?beach&random=2',
        'https://picsum.photos/1920/1080?beach&random=3',
        'https://picsum.photos/1920/1080?beach&random=4',
        'https://picsum.photos/1920/1080?beach&random=5',
        'https://picsum.photos/1920/1080?beach&random=6'
    ];
}

// Generar imágenes placeholder
function generatePlaceholderImages(count) {
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push(`https://picsum.photos/400/500?beach&random=${i}`);
    }
    return images;
}

// Obtener imágenes aleatorias
function getRandomImages(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

// Inicializar rotación del banner
function initializeBannerRotation() {
    const bannerRotator = document.getElementById('banner-rotator');
    if (!bannerRotator || decorativeImages.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateBanner() {
        bannerRotator.style.backgroundImage = `url('${decorativeImages[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % decorativeImages.length;
    }
    
    rotateBanner();
    setInterval(rotateBanner, ROTATION_INTERVAL);
    console.log('🔄 Banner rotation started');
}

// Inicializar carrusel
let carouselPosition = 0;
function initializeCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const images = getRandomImages(fullImagesPool, CAROUSEL_IMAGES);
    
    carousel.innerHTML = images.map((img, index) => `
        <div class="carousel-item" data-index="${index}">
            <img src="${img}" alt="BeachGirl Paradise ${index + 1}" loading="lazy">
        </div>
    `).join('');
    
    console.log(`🎠 Carousel initialized with ${images.length} images`);
}

// Mover carrusel
window.moveCarousel = function(direction) {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    
    const itemWidth = items[0].offsetWidth + 15;
    const containerWidth = carousel.parentElement.offsetWidth;
    const maxScroll = Math.max(0, (items.length * itemWidth) - containerWidth);
    
    carouselPosition += direction * itemWidth * 4;
    carouselPosition = Math.max(0, Math.min(carouselPosition, maxScroll));
    
    carousel.style.transform = `translateX(-${carouselPosition}px)`;
}

// Inicializar galería
function initializeGallery() {
    const gallery = document.getElementById('gallery') || 
                    document.getElementById('premium-gallery') || 
                    document.getElementById('videos-gallery');
    
    if (!gallery) return;
    
    const images = getRandomImages(fullImagesPool, IMAGES_PER_LOAD);
    
    gallery.innerHTML = images.map((img, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${img}" alt="BeachGirl Gallery ${index + 1}" loading="lazy">
        </div>
    `).join('');
    
    console.log(`🖼️ Gallery initialized with ${images.length} images`);
}

// Actualizar contenido periódicamente
setInterval(() => {
    console.log('🔄 Refreshing content...');
    initializeCarousel();
    initializeGallery();
}, 60000);

console.log('✨ BeachGirl.pics - Ready!');

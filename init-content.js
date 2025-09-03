document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing BeachGirl.pics content...');
    
    const galleryContainer = document.getElementById('gallery-container');
    const contentGrid = document.getElementById('content-grid');
    
    // Las imágenes están definidas en content-data2.js en window.G.publicImages
    if (window.G && window.G.publicImages && window.G.publicImages.length > 0) {
        console.log('Found', window.G.publicImages.length, 'public images');
        
        // Mostrar las primeras 12 imágenes en la galería
        if (galleryContainer) {
            const galleryImages = window.G.publicImages.slice(0, 12);
            galleryContainer.innerHTML = galleryImages.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Beach Girl" loading="lazy">
                </div>
            `).join('');
        }
        
        // Crear carousel con algunas imágenes
        const carouselContainer = document.getElementById('carousel-container');
        if (carouselContainer) {
            const carouselImages = window.G.publicImages.slice(12, 17);
            carouselContainer.innerHTML = `
                <div class="carousel-track">
                    ${carouselImages.map(img => `
                        <div class="carousel-slide">
                            <img src="${img}" alt="Featured">
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
});

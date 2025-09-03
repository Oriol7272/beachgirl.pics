document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading BeachGirl.pics content...');
    
    const galleryContainer = document.getElementById('gallery-container');
    const carouselContainer = document.getElementById('carousel-container');
    
    // Usar las imágenes de window.G.publicImages que ya están cargadas
    if (window.G && window.G.publicImages && window.G.publicImages.length > 0) {
        const allImages = window.G.publicImages;
        console.log(`Found ${allImages.length} images from content-data2.js`);
        
        // Carousel con TODAS las imágenes de full
        if (carouselContainer) {
            carouselContainer.innerHTML = `
                <div class="carousel-track">
                    ${allImages.map(img => `
                        <div class="carousel-slide">
                            <img src="${img}" alt="Beach Girl" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Gallery con 40 imágenes aleatorias
        if (galleryContainer) {
            // Mezclar array y tomar 40
            const shuffled = [...allImages].sort(() => Math.random() - 0.5);
            const galleryImages = shuffled.slice(0, 40);
            
            galleryContainer.innerHTML = galleryImages.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Beach Girl Gallery" loading="lazy">
                </div>
            `).join('');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing BeachGirl.pics...');
    
    // Esperar a que content-data2.js cargue y exponga window.G.publicImages
    setTimeout(function() {
        const galleryContainer = document.getElementById('gallery-container');
        const carouselContainer = document.getElementById('carousel-container');
        
        let allImages = [];
        
        // Los datos están en window.G.publicImages (cargados por content-data2.js)
        if (window.G && window.G.publicImages) {
            allImages = window.G.publicImages;
            console.log(`Found ${allImages.length} images from content-data2.js`);
        } else {
            console.error('window.G.publicImages not available yet');
            return;
        }
        
        // Carousel con TODAS las imágenes de window.G.publicImages
        if (carouselContainer && allImages.length > 0) {
            carouselContainer.innerHTML = `
                <h2 style="padding: 0 2rem; margin-bottom: 1rem; font-family: 'Sexy Beachy', cursive; font-size: 3rem;">Featured Content</h2>
                <div class="carousel-track">
                    ${allImages.map(img => `
                        <div class="carousel-slide">
                            <img src="${img}" alt="Beach Content" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            `;
            console.log('Carousel loaded with all', allImages.length, 'images');
        }
        
        // Gallery con 40 imágenes aleatorias
        if (galleryContainer && allImages.length > 0) {
            const shuffled = [...allImages].sort(() => Math.random() - 0.5);
            const galleryImages = shuffled.slice(0, 40);
            
            galleryContainer.innerHTML = galleryImages.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Gallery" loading="lazy">
                </div>
            `).join('');
            console.log('Gallery loaded with', galleryImages.length, 'random images');
        }
    }, 2000); // Esperar 2 segundos para asegurar que todo esté cargado
});

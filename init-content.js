document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading BeachGirl.pics content...');
    
    // Esperar un momento para que todos los scripts carguen
    setTimeout(function() {
        const galleryContainer = document.getElementById('gallery-container');
        const carouselContainer = document.getElementById('carousel-container');
        
        // Debug: ver qué hay disponible
        console.log('Window.G exists?', typeof window.G !== 'undefined');
        console.log('PublicImages?', window.G?.publicImages?.length);
        
        if (window.G && window.G.publicImages && window.G.publicImages.length > 0) {
            const allImages = window.G.publicImages;
            console.log(`Using ${allImages.length} images from G.publicImages`);
            
            // Carousel con TODAS las imágenes
            if (carouselContainer) {
                carouselContainer.innerHTML = `
                    <h2 style="padding: 0 2rem; margin-bottom: 1rem;">Featured Content</h2>
                    <div class="carousel-track">
                        ${allImages.map(img => `
                            <div class="carousel-slide">
                                <img src="${img}" alt="Beach Girl" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                `;
                console.log('Carousel loaded with', allImages.length, 'images');
            }
            
            // Gallery con 40 imágenes aleatorias
            if (galleryContainer) {
                const shuffled = [...allImages].sort(() => Math.random() - 0.5);
                const galleryImages = shuffled.slice(0, 40);
                
                galleryContainer.innerHTML = galleryImages.map(img => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Gallery" loading="lazy">
                    </div>
                `).join('');
                console.log('Gallery loaded with', galleryImages.length, 'images');
            }
        } else {
            console.error('No images found in window.G.publicImages');
        }
    }, 500); // Esperar 500ms para que todo cargue
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing BeachGirl.pics...');
    
    let attempts = 0;
    const maxAttempts = 10;
    
    const loadContent = function() {
        attempts++;
        console.log(`Attempt ${attempts} to load content...`);
        
        const galleryContainer = document.getElementById('gallery-container');
        const carouselContainer = document.getElementById('carousel-container');
        
        let allImages = [];
        
        // Verificar si window.G existe y tiene publicImages
        if (window.G && window.G.publicImages) {
            allImages = window.G.publicImages;
            console.log(`Found ${allImages.length} images in window.G.publicImages`);
            
            // Si las rutas no empiezan con /, añadirlo
            allImages = allImages.map(img => img.startsWith('/') ? img : '/' + img);
        } else {
            console.log('G not ready. Available:', typeof window.G);
            
            if (attempts < maxAttempts) {
                setTimeout(loadContent, 500);
                return;
            } else {
                console.error('Could not load images after', maxAttempts, 'attempts');
                return;
            }
        }
        
        console.log(`Displaying ${allImages.length} images`);
        
        // Carousel
        if (carouselContainer && allImages.length > 0) {
            carouselContainer.innerHTML = `
                <h2 style="padding: 0 2rem; font-family: 'Sexy Beachy', cursive; font-size: 3rem;">Featured Content</h2>
                <div class="carousel-track">
                    ${allImages.map(img => `
                        <div class="carousel-slide">
                            <img src="${img}" alt="Beach" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            `;
            console.log('Carousel loaded');
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
            console.log('Gallery loaded with', galleryImages.length, 'images');
        }
    };
    
    // Empezar después de un delay
    setTimeout(loadContent, 1500);
});

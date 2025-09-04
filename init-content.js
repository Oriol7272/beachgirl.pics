document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing BeachGirl.pics...');
    
    // Intentar varias veces hasta que los datos estén disponibles
    let attempts = 0;
    const maxAttempts = 10;
    
    const loadContent = function() {
        attempts++;
        console.log(`Attempt ${attempts} to load content...`);
        
        const galleryContainer = document.getElementById('gallery-container');
        const carouselContainer = document.getElementById('carousel-container');
        
        let allImages = [];
        
        // Verificar diferentes posibles ubicaciones
        if (window.G && window.G.publicImages) {
            allImages = window.G.publicImages;
            console.log('Found images in window.G.publicImages');
        } else if (window.publicImages) {
            allImages = window.publicImages;
            console.log('Found images in window.publicImages');
        } else if (window.contentData2 && window.contentData2.images) {
            allImages = window.contentData2.images;
            console.log('Found images in window.contentData2.images');
        } else {
            console.log('Images not available yet. Available objects:', Object.keys(window).filter(k => k.includes('content') || k === 'G'));
            
            if (attempts < maxAttempts) {
                setTimeout(loadContent, 500);
                return;
            } else {
                console.error('Could not find images after', maxAttempts, 'attempts');
                return;
            }
        }
        
        console.log(`Loading ${allImages.length} images`);
        
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
        }
        
        // Gallery
        if (galleryContainer && allImages.length > 0) {
            const shuffled = [...allImages].sort(() => Math.random() - 0.5);
            const galleryImages = shuffled.slice(0, 40);
            
            galleryContainer.innerHTML = galleryImages.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Gallery" loading="lazy">
                </div>
            `).join('');
        }
    };
    
    // Empezar a intentar cargar
    setTimeout(loadContent, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading BeachGirl.pics content...');
    
    // Esperar a que todos los scripts carguen
    setTimeout(function() {
        const galleryContainer = document.getElementById('gallery-container');
        const carouselContainer = document.getElementById('carousel-container');
        
        // Los datos están en window (global) pero no en window.G
        // content-data2.js los expone directamente
        let allImages = [];
        
        // Intentar obtener las imágenes de diferentes formas
        if (window.contentData2 && window.contentData2.publicImages) {
            allImages = window.contentData2.publicImages;
            console.log('Found images in contentData2');
        } else {
            // Si no están disponibles, usar un conjunto hardcodeado temporal
            console.log('Using hardcoded images as fallback');
            // Listar todos los archivos webp de /full/
            const files = ['0456996c-b56e-42ef-9049-56b1a1ae2646.webp','0lySugcO4Pp4pEZKvz9U.webp','0nSaCJQxbVw4BDrhnhHO.webp','0Tc8Vtd0mEIvNHZwYGBq.webp','13TXvyRVZ7LtvAOx7kme.webp','18VQaczW5kdfdiqUVasH.webp','1dEu25K0mS3zxRlXRjHR.webp','1qEBcg9QbkZRRdLt0Chc.webp','1tt8H4fX3XzyV90HjNG3.webp','27bGIzFFpej5ubUkvykD.webp','2gjqH68H586TKLDK9lh9.webp','2yw4sowPh3Tyln5oxRdw.webp','39GYGt3bticS0Mjbud0p.webp','3IWka3fnP9b8yz6j5l91.webp','3ZYL4GCUOs3rfq3iTPJ7.webp','4GN6i0Db2hl4Ck9vf0LE.webp','4YhoIAWSbVaOqBhAOGqR.webp'];
            allImages = files.map(f => `/full/${f}`);
        }
        
        console.log(`Found ${allImages.length} images total`);
        
        if (allImages.length > 0) {
            // Carousel con todas las imágenes
            if (carouselContainer) {
                carouselContainer.innerHTML = `
                    <h2 style="padding: 0 2rem; margin-bottom: 1rem; font-family: 'Sexy Beachy', cursive; font-size: 2.5rem;">Featured Content</h2>
                    <div class="carousel-track">
                        ${allImages.map(img => `
                            <div class="carousel-slide">
                                <img src="${img}" alt="Beach Girl" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                `;
                console.log('Carousel populated');
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
                console.log('Gallery populated with', galleryImages.length, 'images');
            }
        }
    }, 1000); // Aumentar el delay a 1 segundo
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading BeachGirl.pics content...');
    
    const galleryContainer = document.getElementById('gallery-container');
    const carouselContainer = document.getElementById('carousel-container');
    
    // Imágenes de muestra desde /full/ (todas son .webp)
    const sampleImages = [
        '/full/0456996c-b56e-42ef-9049-56b1a1ae2646.webp',
        '/full/0lySugcO4Pp4pEZKvz9U.webp',
        '/full/13TXvyRVZ7LtvAOx7kme.webp',
        '/full/18VQaczW5kdfdiqUVasH.webp',
        '/full/1qEBcg9QbkZRRdLt0Chc.webp',
        '/full/1tt8H4fX3XzyV90HjNG3.webp',
        '/full/39GYGt3bticS0Mjbud0p.webp',
        '/full/3IWka3fnP9b8yz6j5l91.webp',
        '/full/3ZYL4GCUOs3rfq3iTPJ7.webp',
        '/full/4YhoIAWSbVaOqBhAOGqR.webp'
    ];
    
    // Cargar galería
    if (galleryContainer) {
        galleryContainer.innerHTML = sampleImages.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="Beach Girl" loading="lazy">
            </div>
        `).join('');
    }
    
    // Cargar carousel con imágenes decorativas
    if (carouselContainer) {
        const carouselImages = [
            '/decorative-images/1115ae7d-909f-4760-a3a1-037a05ad9931.jpg',
            '/decorative-images/1618cbb2-8dd1-4127-99d9-d9f30536de72.jpg',
            '/decorative-images/49830c0a-2fd8-439c-a583-029a0b39c4d6.jpg',
            '/decorative-images/4bfb7a8b-b81e-49d7-a160-90b834d0b751.jpg'
        ];
        
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
});

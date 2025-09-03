// Initialize content when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing content display...');
    
    // Get containers
    const galleryContainer = document.getElementById('gallery-container');
    const contentGrid = document.getElementById('content-grid');
    
    // Check if we have public images
    if (window.G && window.G.publicImages) {
        console.log('Loading public images:', window.G.publicImages.length);
        
        // Display first 12 images in gallery
        const images = window.G.publicImages.slice(0, 12);
        
        if (galleryContainer) {
            galleryContainer.innerHTML = images.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="Beach content" loading="lazy">
                </div>
            `).join('');
        }
    }
    
    // Initialize ads if needed
    if (window.AdsManager) {
        console.log('Ads manager is available');
    }
});

// Wrapper para hacer la API accesible correctamente
(function() {
    // Esperar a que todo esté cargado
    window.addEventListener('load', function() {
        // La API está en window pero no es directamente instanciable
        if (window.UnifiedContentAPI && typeof window.UnifiedContentAPI === 'object') {
            // Ya está instanciada, usar directamente
            window.contentAPI = window.UnifiedContentAPI;
        } else if (window.ContentSystemManager) {
            // Usar el manager
            window.contentAPI = window.ContentSystemManager;
        } else {
            // Crear una API simple de respaldo
            window.contentAPI = {
                getMixedContent: function(count) {
                    const results = [];
                    if (window.PUBLIC_IMAGES_POOL) {
                        for (let i = 0; i < Math.min(count, window.PUBLIC_IMAGES_POOL.length); i++) {
                            results.push({
                                url: window.PUBLIC_IMAGES_POOL[i],
                                type: 'image',
                                isPremium: false
                            });
                        }
                    }
                    return results;
                },
                getPremiumContent: function(count) {
                    const results = [];
                    if (window.PREMIUM_IMAGES_POOL_1) {
                        for (let i = 0; i < Math.min(count, window.PREMIUM_IMAGES_POOL_1.length); i++) {
                            results.push({
                                url: window.PREMIUM_IMAGES_POOL_1[i],
                                type: 'image',
                                isPremium: true
                            });
                        }
                    }
                    return results;
                },
                getVideoContent: function(count) {
                    const results = [];
                    if (window.PREMIUM_VIDEOS_POOL) {
                        for (let i = 0; i < Math.min(count, window.PREMIUM_VIDEOS_POOL.length); i++) {
                            results.push({
                                url: window.PREMIUM_VIDEOS_POOL[i],
                                type: 'video',
                                isPremium: true
                            });
                        }
                    }
                    return results;
                }
            };
        }
        
        // Ahora cargar el contenido
        loadGalleryContent();
    });
    
    function loadGalleryContent() {
        console.log('Cargando contenido de galería...');
        
        const gallery = document.getElementById('gallery');
        const premiumGrid = document.getElementById('premium-grid');
        const videosGrid = document.getElementById('videos-grid');
        
        if (!window.contentAPI) {
            console.error('API no disponible');
            return;
        }
        
        // Cargar galería principal
        if (gallery) {
            const content = window.contentAPI.getMixedContent(20);
            content.forEach(function(item) {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                if (item.type === 'video') {
                    div.innerHTML = '<video src="' + item.url + '" controls muted preload="none" style="width:100%"></video>';
                } else {
                    div.innerHTML = '<img src="' + item.url + '" loading="lazy" style="width:100%">';
                }
                gallery.appendChild(div);
            });
            console.log('Galería cargada: ' + content.length + ' items');
        }
        
        // Cargar premium
        if (premiumGrid) {
            const premium = window.contentAPI.getPremiumContent(10);
            premium.forEach(function(item) {
                const div = document.createElement('div');
                div.className = 'premium-item';
                div.innerHTML = '<img src="' + item.url + '" loading="lazy" style="width:100%">';
                premiumGrid.appendChild(div);
            });
        }
        
        // Cargar videos
        if (videosGrid) {
            const videos = window.contentAPI.getVideoContent(6);
            videos.forEach(function(item) {
                const div = document.createElement('div');
                div.className = 'video-item';
                div.innerHTML = '<video src="' + item.url + '" controls muted preload="none" style="width:100%"></video>';
                videosGrid.appendChild(div);
            });
        }
        
        console.log('✅ Todo el contenido cargado');
    }
})();

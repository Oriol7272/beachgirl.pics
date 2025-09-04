// Cargar contenido cuando la página esté lista
window.addEventListener('load', function() {
    console.log('Cargando contenido visual...');
    
    // Obtener contenedores
    const gallery = document.getElementById('gallery');
    const premiumSection = document.getElementById('premium-grid');
    const videosSection = document.getElementById('videos-grid');
    
    // Cargar imágenes públicas en galería principal
    if (gallery && window.PUBLIC_IMAGES_POOL) {
        gallery.innerHTML = '';
        const images = window.PUBLIC_IMAGES_POOL.slice(0, 20);
        images.forEach(function(img) {
            const div = document.createElement('div');
            div.style.cssText = 'display:inline-block;margin:5px;';
            div.innerHTML = '<img src="/' + img + '" style="width:200px;height:auto;border-radius:8px;" loading="lazy">';
            gallery.appendChild(div);
        });
        console.log('Galería cargada: ' + images.length + ' imágenes');
    }
    
    // Cargar contenido premium
    if (premiumSection && window.PREMIUM_IMAGES_POOL_1) {
        premiumSection.innerHTML = '';
        const premium = window.PREMIUM_IMAGES_POOL_1.slice(0, 10);
        premium.forEach(function(img) {
            const div = document.createElement('div');
            div.style.cssText = 'display:inline-block;margin:5px;position:relative;';
            div.innerHTML = '<img src="/' + img + '" style="width:200px;height:auto;border-radius:8px;filter:blur(3px);" loading="lazy">' +
                          '<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:white;padding:10px;border-radius:5px;">PREMIUM</span>';
            premiumSection.appendChild(div);
        });
        console.log('Premium cargado: ' + premium.length + ' imágenes');
    }
    
    // Cargar videos
    if (videosSection && window.PREMIUM_VIDEOS_POOL) {
        videosSection.innerHTML = '';
        const videos = window.PREMIUM_VIDEOS_POOL.slice(0, 6);
        videos.forEach(function(video) {
            const div = document.createElement('div');
            div.style.cssText = 'display:inline-block;margin:5px;';
            div.innerHTML = '<video src="/' + video + '" style="width:300px;height:auto;border-radius:8px;" controls muted preload="none"></video>';
            videosSection.appendChild(div);
        });
        console.log('Videos cargados: ' + videos.length);
    }
    
    // Si no hay secciones específicas, cargar todo en gallery
    if (gallery && gallery.children.length === 0) {
        gallery.innerHTML = '<h2>Galería de Contenido</h2>';
        
        // Agregar algunas imágenes públicas
        if (window.PUBLIC_IMAGES_POOL) {
            const grid = document.createElement('div');
            grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;padding:20px;';
            
            window.PUBLIC_IMAGES_POOL.slice(0, 30).forEach(function(img) {
                const item = document.createElement('div');
                item.innerHTML = '<img src="/' + img + '" style="width:100%;border-radius:8px;cursor:pointer;" loading="lazy">';
                grid.appendChild(item);
            });
            
            gallery.appendChild(grid);
        }
    }
    
    console.log('✅ Contenido visual cargado completamente');
});

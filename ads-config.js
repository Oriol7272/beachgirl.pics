// ads-config.js - Configuración de anuncios
window.ADS_CONFIG = {
    // EroAdvertising
    eroadvertising: {
        zoneId: 8179717,
        bannerId: 2309173,
        siteName: 'beachgirl.pics'
    },
    
    // ExoClick
    exoclick: {
        siteId: 1071780,
        zoneId: 5702700,
        size: '300x250',
        type: 'banner'
    },
    
    // JuicyAds
    juicyads: {
        zoneId: 1099077,
        adId: 2093063,
        size: '728x90',
        type: 'leaderboard'
    },
    
    // PopAds - Necesitas tu ID específico
    popads: {
        enabled: false // Actívalo cuando tengas el ID
    }
};

// Función para cargar los anuncios
function loadAds() {
    console.log('🎯 Cargando anuncios...');
    
    // EroAdvertising
    if (window.ADS_CONFIG.eroadvertising) {
        loadEroAdvertising();
    }
    
    // ExoClick
    if (window.ADS_CONFIG.exoclick) {
        loadExoClick();
    }
    
    // JuicyAds
    if (window.ADS_CONFIG.juicyads) {
        loadJuicyAds();
    }
}

function loadEroAdvertising() {
    // Crear el script para EroAdvertising
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
        var ero_ads_zone = ${window.ADS_CONFIG.eroadvertising.zoneId};
        var ero_ads_width = 468;
        var ero_ads_height = 80;
    `;
    document.head.appendChild(script);
    
    const eroScript = document.createElement('script');
    eroScript.src = 'https://www.eroadvertising.com/show_ads.js';
    eroScript.async = true;
    document.head.appendChild(eroScript);
    
    console.log('✅ EroAdvertising cargado');
}

function loadExoClick() {
    // Script para ExoClick
    const script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'https://a.magsrv.com/ad-provider.js';
    script.async = true;
    document.head.appendChild(script);
    
    // Configurar zona
    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({"serve": {
        "zone": window.ADS_CONFIG.exoclick.zoneId
    }});
    
    console.log('✅ ExoClick cargado');
}

function loadJuicyAds() {
    // Configurar JuicyAds
    window.adsbyjuicy = window.adsbyjuicy || {};
    window.adsbyjuicy.cmd = window.adsbyjuicy.cmd || [];
    
    const script = document.createElement('script');
    script.src = 'https://poweredby.jads.co/js/jads.js';
    script.async = true;
    script.onload = function() {
        console.log('✅ JuicyAds cargado');
    };
    document.head.appendChild(script);
}

// Cargar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAds);
} else {
    loadAds();
}

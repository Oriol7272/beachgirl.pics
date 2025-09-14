// Configuración de anuncios para BeachGirl.pics
window.BeachGirlAds = {
    config: {
        enabled: true,
        networks: {
            juicyads: {
                enabled: true,
                zones: {
                    sidebar: window.__ENV?.JUICYADS_ZONE || '',
                }
            },
            exoclick: {
                enabled: true,
                zones: {
                    sidebar: window.__ENV?.EXOCLICK_ZONE || '5696328',
                    bottom: window.__ENV?.EXOCLICK_ZONE || '5696328'
                }
            },
            eroadvertising: {
                enabled: true,
                spaceId: window.__ENV?.EROADVERTISING_ZONE || '8182057',
                pid: window.__ENV?.ERO_PID || '152716',
                ctrl: window.__ENV?.ERO_CTRLID || '798544'
            },
            popads: {
                enabled: true,
                siteId: window.__ENV?.POPADS_SITE_ID || '5226758'
            }
        }
    },
    
    init() {
        if (!this.config.enabled) return;
        
        console.log('🎯 Inicializando anuncios BeachGirl...');
        
        // Inicializar cada red de anuncios
        this.initJuicyAds();
        this.initExoClick();
        this.initEroAdvertising();
        this.initPopAds();
    },
    
    initJuicyAds() {
        if (!this.config.networks.juicyads.enabled) return;
        console.log('📺 Inicializando JuicyAds...');
        // Lógica de JuicyAds aquí
    },
    
    initExoClick() {
        if (!this.config.networks.exoclick.enabled) return;
        console.log('📺 Inicializando ExoClick...');
        // Lógica de ExoClick aquí
    },
    
    initEroAdvertising() {
        if (!this.config.networks.eroadvertising.enabled) return;
        console.log('📺 Inicializando EroAdvertising...');
        // Lógica de EroAdvertising aquí
    },
    
    initPopAds() {
        if (!this.config.networks.popads.enabled) return;
        console.log('📺 Inicializando PopAds...');
        // Lógica de PopAds aquí
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.BeachGirlAds.init());
} else {
    window.BeachGirlAds.init();
}

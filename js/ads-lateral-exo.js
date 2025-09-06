(function() {
    'use strict';
    
    console.log('🌴 BeachGirl Lateral Ads - Iniciando...');
    
    // Configuración de zonas ExoClick
    const CONFIG = {
        EXOCLICK_ZONES: ['5696328', '5705186'], // Tus zonas laterales
        POSITIONS: ['ad-left', 'ad-right']
    };
    
    // Esperar a que el DOM esté listo
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    // Limpiar cualquier anuncio central existente
    function cleanCenterAds() {
        const centerSelectors = [
            '.ad-sponsor', '.ad-top', '.ad-header',
            '#ad-sponsor', '#ad-ero', '#ad-bottom-row',
            '.slot-bottom', '.slot-center'
        ];
        
        centerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.height = '0';
            });
        });
    }
    
    // Asegurar contenedores laterales
    function ensureLateralContainers() {
        // Verificar/crear contenedor izquierdo
        if (!document.getElementById('ad-left')) {
            const leftAd = document.createElement('div');
            leftAd.id = 'ad-left';
            leftAd.className = 'ad-lateral left';
            document.body.appendChild(leftAd);
        }
        
        // Verificar/crear contenedor derecho
        if (!document.getElementById('ad-right')) {
            const rightAd = document.createElement('div');
            rightAd.id = 'ad-right';
            rightAd.className = 'ad-lateral right';
            document.body.appendChild(rightAd);
        }
    }
    
    // Cargar ExoClick AdProvider
    function loadAdProvider(callback) {
        if (window.AdProvider) {
            callback();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://a.magsrv.com/ad-provider.js';
        script.async = true;
        script.onload = callback;
        script.onerror = () => console.error('❌ Error cargando AdProvider');
        document.head.appendChild(script);
    }
    
    // Montar anuncio ExoClick en contenedor
    function mountExoAd(containerId, zoneId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        // Crear elemento ins para ExoClick
        const ins = document.createElement('ins');
        ins.className = 'eas6a97888e17';
        ins.setAttribute('data-zoneid', zoneId);
        ins.setAttribute('data-block-ad-types', '0');
        ins.style.display = 'block';
        ins.style.width = '300px';
        ins.style.height = '250px';
        
        container.appendChild(ins);
        
        // Activar AdProvider
        (window.AdProvider = window.AdProvider || []).push({ serve: {} });
        
        console.log(`✅ Anuncio lateral montado: ${containerId} con zona ${zoneId}`);
    }
    
    // Inicializar todo
    function initialize() {
        console.log('🚀 Inicializando anuncios laterales...');
        
        // 1. Limpiar anuncios del centro
        cleanCenterAds();
        
        // 2. Asegurar contenedores laterales
        ensureLateralContainers();
        
        // 3. Cargar y montar anuncios ExoClick
        loadAdProvider(() => {
            mountExoAd('ad-left', CONFIG.EXOCLICK_ZONES[0]);
            mountExoAd('ad-right', CONFIG.EXOCLICK_ZONES[1]);
            
            // Repetir montaje cada 30 segundos para refrescar
            setInterval(() => {
                mountExoAd('ad-left', CONFIG.EXOCLICK_ZONES[0]);
                mountExoAd('ad-right', CONFIG.EXOCLICK_ZONES[1]);
            }, 30000);
        });
    }
    
    // Ejecutar cuando el DOM esté listo
    ready(initialize);
})();

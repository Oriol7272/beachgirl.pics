/**
 * ads-manager.js - Sistema de anuncios unificado
 * Gestiona JuicyAds, ExoClick, EroAdvertising y PopAds
 */

'use strict';

class AdsManager {
    constructor() {
        this.config = {
            // EroAdvertising
            eroAdvertising: {
                zoneId: '8179717',
                bannerId: '2309173',
                enabled: true
            },
            
            // ExoClick
            exoClick: {
                zoneId: '5702700',
                enabled: true
            },
            
            // JuicyAds
            juicyAds: {
                zoneId: '1099077',
                adId: '2093063',
                enabled: true
            },
            
            // PopAds - agregar tu Site ID cuando lo tengas
            popAds: {
                enabled: false, // Activar cuando tengas el Site ID
                siteId: null
            }
        };
        
        this.initialized = false;
        this.vipUser = false;
    }

    // Inicializar sistema de anuncios
    initialize() {
        console.log('🎯 Inicializando AdsManager...');
        
        // Verificar estado VIP
        this.checkVIPStatus();
        
        if (this.vipUser) {
            console.log('👑 Usuario VIP - anuncios deshabilitados');
            this.hideAllAds();
            return;
        }
        
        // Cargar anuncios según configuración
        this.loadAds();
        
        this.initialized = true;
        console.log('✅ AdsManager inicializado');
    }

    // Verificar estado VIP
    checkVIPStatus() {
        this.vipUser = localStorage.getItem('vipAccess') === 'true';
        
        if (this.vipUser) {
            document.body.classList.add('vip-active');
        }
    }

    // Cargar todos los anuncios
    loadAds() {
        if (this.config.eroAdvertising.enabled) {
            this.loadEroAdvertising();
        }
        
        if (this.config.exoClick.enabled) {
            this.loadExoClick();
        }
        
        if (this.config.juicyAds.enabled) {
            this.loadJuicyAds();
        }
        
        if (this.config.popAds.enabled && this.config.popAds.siteId) {
            this.loadPopAds();
        }
    }

    // Cargar EroAdvertising
    loadEroAdvertising() {
        console.log('💎 Cargando EroAdvertising...');
        
        // Crear contenedores para EroAdvertising
        this.createAdContainer('ero-ad-1', 'EroAdvertising Premium Space');
        
        // Script de EroAdvertising
        const script = document.createElement('script');
        script.innerHTML = `
            var ero_ads_zone = ${this.config.eroAdvertising.zoneId};
            var ero_ads_width = 468;
            var ero_ads_height = 80;
        `;
        document.head.appendChild(script);
        
        // Cargar script principal
        const eroScript = document.createElement('script');
        eroScript.src = 'https://www.eroadvertising.com/show_ads.js';
        eroScript.async = true;
        eroScript.onload = () => {
            console.log('✅ EroAdvertising cargado');
        };
        document.head.appendChild(eroScript);
    }

    // Cargar ExoClick
    loadExoClick() {
        console.log('🎯 Cargando ExoClick...');
        
        // Crear contenedores para ExoClick
        this.createAdContainer('exoclick-ad-1', 'ExoClick Premium Space');
        
        // Script de ExoClick
        const script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = 'https://a.exdynsrv.com/ad-provider.js';
        script.async = true;
        script.onload = () => {
            console.log('✅ ExoClick script cargado');
            
            // Configurar zona
            if (window.AdProvider) {
                window.AdProvider.push({
                    "serve": {
                        "zone": parseInt(this.config.exoClick.zoneId)
                    }
                });
            }
        };
        document.head.appendChild(script);
        
        // Crear elemento de anuncio
        setTimeout(() => {
            const adElement = document.createElement('ins');
            adElement.className = 'eas6a97888e2';
            adElement.setAttribute('data-zoneid', this.config.exoClick.zoneId);
            adElement.style.cssText = 'display: block; width: 300px; height: 250px; margin: 0 auto;';
            
            const container = document.getElementById('exoclick-ad-1');
            if (container) {
                container.appendChild(adElement);
            }
        }, 1000);
    }

    // Cargar JuicyAds
    loadJuicyAds() {
        console.log('🍊 Cargando JuicyAds...');
        
        // Crear contenedores para JuicyAds
        this.createAdContainer('juicy-ad-1', 'JuicyAds Premium Space');
        
        // Inicializar namespace
        window.adsbyjuicy = window.adsbyjuicy || {};
        window.adsbyjuicy.cmd = window.adsbyjuicy.cmd || [];
        
        // Cargar script principal
        const script = document.createElement('script');
        script.src = 'https://poweredby.jads.co/js/jads.js';
        script.async = true;
        script.onload = () => {
            console.log('✅ JuicyAds script cargado');
            
            // Configurar zona
            window.adsbyjuicy.cmd.push(() => {
                window.adsbyjuicy.display(this.config.juicyAds.zoneId);
            });
        };
        document.head.appendChild(script);
        
        // Crear elemento de anuncio
        setTimeout(() => {
            const adElement = document.createElement('ins');
            adElement.id = this.config.juicyAds.zoneId;
            adElement.setAttribute('data-width', '728');
            adElement.setAttribute('data-height', '90');
            adElement.style.cssText = 'display: block; width: 728px; height: 90px; margin: 0 auto;';
            
            const container = document.getElementById('juicy-ad-1');
            if (container) {
                container.appendChild(adElement);
            }
        }, 1500);
    }

    // Cargar PopAds (cuando tengas el Site ID)
    loadPopAds() {
        console.log('🎪 Cargando PopAds...');
        
        // Script para PopAds - agregar cuando tengas el Site ID
        const script = document.createElement('script');
        script.innerHTML = `
            var _paq = window._paq = window._paq || [];
            _paq.push(['setSiteId', '${this.config.popAds.siteId}']);
            _paq.push(['trackPageView']);
        `;
        document.head.appendChild(script);
    }

    // Crear contenedor de anuncio
    createAdContainer(id, label) {
        const container = document.getElementById(id);
        if (!container) {
            console.warn(`⚠️ Contenedor ${id} no encontrado`);
            return;
        }
        
        container.innerHTML = `
            <div style="
                background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 10px;
                padding: 20px;
                text-align: center;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9em;
                color: rgba(255,255,255,0.7);
            ">
                ${label}
            </div>
        `;
    }

    // Ocultar todos los anuncios para usuarios VIP
    hideAllAds() {
        const adElements = document.querySelectorAll('.ad-zone, [data-zoneid], [id*="ad"]');
        adElements.forEach(element => {
            element.style.display = 'none';
        });
        
        // Mostrar badge VIP en su lugar
        this.showVIPBadges();
    }

    // Mostrar badges VIP
    showVIPBadges() {
        const adZones = document.querySelectorAll('.ad-zone');
        adZones.forEach(zone => {
            zone.innerHTML = `
                <div style="
                    background: linear-gradient(45deg, #ffd700, #ffed4e);
                    color: #333;
                    padding: 20px;
                    border-radius: 15px;
                    text-align: center;
                    font-weight: bold;
                    box-shadow: 0 4px 15px rgba(255,215,0,0.3);
                ">
                    👑 VIP Premium - Sin Anuncios
                    <div style="font-size: 0.9em; margin-top: 8px;">
                        Disfruta de la experiencia completa
                    </div>
                </div>
            `;
        });
    }

    // Tracking de clics en anuncios
    trackAdClick(network, zone) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ad_click', {
                event_category: 'Advertising',
                event_label: `${network} - Zone: ${zone}`,
                value: 1
            });
        }
        
        console.log(`📊 Ad click tracked: ${network} - ${zone}`);
    }

    // Actualizar estado VIP
    updateVIPStatus() {
        this.checkVIPStatus();
        
        if (this.vipUser) {
            this.hideAllAds();
        } else {
            // Recargar anuncios si perdió estado VIP
            location.reload();
        }
    }
}

// Exportar globalmente
window.AdsManager = AdsManager;

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.adsManager = new AdsManager();
    
    // Esperar un poco para que carguen otros scripts
    setTimeout(() => {
        window.adsManager.initialize();
    }, 2000);
});

console.log('🎯 AdsManager loaded');

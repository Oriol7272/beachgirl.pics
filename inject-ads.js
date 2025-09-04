// Sistema de anuncios para BeachGirl.pics
(function() {
    'use strict';
    
    console.log('🎯 Iniciando sistema de anuncios...');
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }
    
    function initAds() {
        // Crear estilos
        const style = document.createElement('style');
        style.textContent = `
            .ad-container-left {
                position: fixed;
                left: 10px;
                top: 100px;
                width: 160px;
                height: 600px;
                background: rgba(255,255,255,0.9);
                border: 1px solid #ddd;
                border-radius: 8px;
                z-index: 1000;
                padding: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .ad-container-right {
                position: fixed;
                right: 10px;
                top: 100px;
                width: 160px;
                height: 600px;
                background: rgba(255,255,255,0.9);
                border: 1px solid #ddd;
                border-radius: 8px;
                z-index: 1000;
                padding: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .ad-container-bottom {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100px;
                background: rgba(255,255,255,0.95);
                border-top: 1px solid #ddd;
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px;
            }
            @media (max-width: 1200px) {
                .ad-container-left, .ad-container-right {
                    display: none;
                }
            }
            @media (max-width: 768px) {
                .ad-container-bottom {
                    height: 60px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Contenedor izquierdo - ExoClick
        const leftContainer = document.createElement('div');
        leftContainer.className = 'ad-container-left';
        leftContainer.id = 'ad-left';
        leftContainer.innerHTML = '<ins class="eas6a97888e2" data-zoneid="5696328" style="display:inline-block;width:160px;height:600px"></ins>';
        document.body.appendChild(leftContainer);
        
        // Contenedor derecho - JuicyAds  
        const rightContainer = document.createElement('div');
        rightContainer.className = 'ad-container-right';
        rightContainer.id = 'ad-right';
        rightContainer.innerHTML = '<ins id="1021557" data-width="160" data-height="600"></ins>';
        document.body.appendChild(rightContainer);
        
        // Contenedor inferior - ExoClick
        const bottomContainer = document.createElement('div');
        bottomContainer.className = 'ad-container-bottom';
        bottomContainer.id = 'ad-bottom';
        bottomContainer.innerHTML = '<ins class="eas6a97888e2" data-zoneid="5696330" style="display:inline-block;width:728px;height:90px"></ins>';
        document.body.appendChild(bottomContainer);
        
        // Cargar scripts de anuncios
        loadAdScripts();
    }
    
    function loadAdScripts() {
        // ExoClick
        if (!document.querySelector('script[src*="magsrv.com"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.type = 'application/javascript';
            script.src = 'https://a.magsrv.com/ad-provider.js';
            document.head.appendChild(script);
            script.onload = function() {
                (window.AdProvider = window.AdProvider || []).push({"serve": {}});
                console.log('✅ ExoClick cargado');
            };
        }
        
        // JuicyAds
        if (!document.querySelector('script[src*="jads.co"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.type = 'text/javascript';
            script.src = 'https://poweredby.jads.co/js/jads.js';
            document.head.appendChild(script);
            script.onload = function() {
                (window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1021557});
                console.log('✅ JuicyAds cargado');
            };
        }
        
        // EroAdvertising
        if (typeof window.eaCtrl === 'undefined') {
            window.eaCtrlRecs = [];
            window.eaCtrl = {
                add: function(ag) {
                    window.eaCtrlRecs.push(ag);
                }
            };
            const script = document.createElement('script');
            script.src = '//go.easrv.cl/loadeactrl.go?pid=152716&spaceid=8177575&ctrlid=798544';
            document.head.appendChild(script);
            console.log('✅ EroAdvertising iniciado');
        }
        
        console.log('🎯 Todos los scripts de anuncios cargados');
    }
})();

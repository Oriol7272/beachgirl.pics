// Sistema de anuncios BeachGirl - Version corregida
(function() {
    'use strict';
    
    console.log('🎯 Iniciando sistema de anuncios v2...');
    
    // Esperar DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }
    
    function initAds() {
        // Verificar que no estemos bloqueando la página
        try {
            // Estilos mínimos para no interferir
            const style = document.createElement('style');
            style.textContent = `
                .ad-left-sidebar {
                    position: fixed;
                    left: 10px;
                    top: 100px;
                    width: 160px;
                    height: 600px;
                    z-index: 100;
                    background: white;
                    border: 1px solid #ddd;
                    padding: 2px;
                }
                .ad-right-sidebar {
                    position: fixed;
                    right: 10px;
                    top: 100px;
                    width: 160px;
                    height: 600px;
                    z-index: 100;
                    background: white;
                    border: 1px solid #ddd;
                    padding: 2px;
                }
                .ad-bottom-banner {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 728px;
                    height: 90px;
                    z-index: 100;
                    background: white;
                    border: 1px solid #ddd;
                    padding: 2px;
                }
                @media (max-width: 1200px) {
                    .ad-left-sidebar, .ad-right-sidebar { display: none; }
                }
                @media (max-width: 768px) {
                    .ad-bottom-banner { width: 100%; }
                }
            `;
            document.head.appendChild(style);
            
            // Solo crear contenedores, no bloquear
            createAdContainers();
            
            // Cargar scripts después de un delay
            setTimeout(loadAdScripts, 1000);
            
        } catch (e) {
            console.error('Error en initAds:', e);
        }
    }
    
    function createAdContainers() {
        // Izquierda - ExoClick
        if (!document.getElementById('ad-left')) {
            const left = document.createElement('div');
            left.className = 'ad-left-sidebar';
            left.id = 'ad-left';
            left.innerHTML = '<ins class="eas6a97888e2" data-zoneid="5696328" style="display:block;width:160px;height:600px"></ins>';
            document.body.appendChild(left);
        }
        
        // Derecha - JuicyAds
        if (!document.getElementById('ad-right')) {
            const right = document.createElement('div');
            right.className = 'ad-right-sidebar';
            right.id = 'ad-right';
            right.innerHTML = '<ins id="1021557" data-width="160" data-height="600"></ins>';
            document.body.appendChild(right);
        }
        
        // Inferior - ExoClick alternativo
        if (!document.getElementById('ad-bottom')) {
            const bottom = document.createElement('div');
            bottom.className = 'ad-bottom-banner';
            bottom.id = 'ad-bottom';
            // Usar el mismo zone ID que funciona (5696328)
            bottom.innerHTML = '<ins class="eas6a97888e2" data-zoneid="5696328" style="display:block;width:728px;height:90px"></ins>';
            document.body.appendChild(bottom);
        }
    }
    
    function loadAdScripts() {
        // ExoClick
        if (!window.AdProvider) {
            const exo = document.createElement('script');
            exo.async = true;
            exo.src = 'https://a.magsrv.com/ad-provider.js';
            document.head.appendChild(exo);
            exo.onload = function() {
                (window.AdProvider = window.AdProvider || []).push({"serve": {}});
                console.log('✅ ExoClick cargado');
            };
        }
        
        // JuicyAds (si no está bloqueado)
        if (!window.adsbyjuicy && !document.querySelector('script[src*="jads.co"]')) {
            const juicy = document.createElement('script');
            juicy.async = true;
            juicy.src = 'https://poweredby.jads.co/js/jads.js';
            document.head.appendChild(juicy);
            juicy.onload = function() {
                (window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1021557});
                console.log('✅ JuicyAds cargado');
            };
            juicy.onerror = function() {
                console.log('⚠️ JuicyAds bloqueado por el navegador');
            };
        }
        
        console.log('✅ Scripts de anuncios procesados');
    }
})();

// Asegurar que la página principal funcione
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('Syntax')) {
        console.error('Error de sintaxis detectado:', e);
        e.preventDefault();
    }
});

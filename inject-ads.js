// Inyectar anuncios directamente
(function() {
    console.log('🎯 Iniciando inyección de anuncios...');
    
    // Crear estilos para los anuncios
    const style = document.createElement('style');
    style.textContent = `
        .ad-sidebar {
            position: fixed;
            top: 100px;
            width: 160px;
            z-index: 9999;
            background: rgba(255,255,255,0.95);
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .ad-sidebar.left {
            left: 10px;
        }
        .ad-sidebar.right {
            right: 10px;
        }
        .ad-banner-bottom {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 728px;
            height: 90px;
            background: rgba(255,255,255,0.95);
            z-index: 9999;
            padding: 5px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.15);
        }
        @media (max-width: 1200px) {
            .ad-sidebar { display: none; }
            .ad-banner-bottom { width: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    // Crear sidebar izquierdo (ExoClick)
    const leftAd = document.createElement('div');
    leftAd.className = 'ad-sidebar left';
    leftAd.innerHTML = `
        <ins class="eas6a97888e2" 
             data-zoneid="5696328"
             style="display:inline-block;width:160px;height:600px"></ins>
    `;
    document.body.appendChild(leftAd);
    
    // Crear sidebar derecho (JuicyAds)
    const rightAd = document.createElement('div');
    rightAd.className = 'ad-sidebar right';
    rightAd.innerHTML = `
        <ins id="1021557" 
             data-width="160" 
             data-height="600"></ins>
    `;
    document.body.appendChild(rightAd);
    
    // Crear banner inferior (ExoClick)
    const bottomAd = document.createElement('div');
    bottomAd.className = 'ad-banner-bottom';
    bottomAd.innerHTML = `
        <ins class="eas6a97888e2" 
             data-zoneid="5696330"
             style="display:inline-block;width:728px;height:90px"></ins>
    `;
    document.body.appendChild(bottomAd);
    
    // Cargar ExoClick
    if (!document.querySelector('script[src*="magsrv.com"]')) {
        const exo = document.createElement('script');
        exo.async = true;
        exo.src = 'https://a.magsrv.com/ad-provider.js';
        document.head.appendChild(exo);
        exo.onload = () => {
            (window.AdProvider = window.AdProvider || []).push({"serve": {}});
            console.log('✅ ExoClick cargado');
        };
    }
    
    // Cargar JuicyAds
    if (!document.querySelector('script[src*="jads.co"]')) {
        const juicy = document.createElement('script');
        juicy.async = true;
        juicy.src = 'https://poweredby.jads.co/js/jads.js';
        document.head.appendChild(juicy);
        juicy.onload = () => {
            (window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1021557});
            console.log('✅ JuicyAds cargado');
        };
    }
    
    // EroAdvertising
    if (!window.eaCtrl) {
        window.eaCtrlRecs = [];
        window.eaCtrl = {
            add: function(ag) { window.eaCtrlRecs.push(ag); }
        };
        const ero = document.createElement('script');
        ero.src = '//go.easrv.cl/loadeactrl.go?pid=152716&spaceid=8177575&ctrlid=798544';
        document.head.appendChild(ero);
        console.log('✅ EroAdvertising cargado');
    }
    
    // PopAds
    if (!window.e494ffb82839a29122608e933394c091) {
        const popCode = `(function(){var p=window,j="e494ffb82839a29122608e933394c091",d=[["siteId",4601234],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],v=[],e=-1,a,y,m=function(){clearTimeout(y);e++;a=p.document.createElement("script");a.type="text/javascript";a.async=!0;var s=p.document.getElementsByTagName("script")[0];a.src="https://www.premiumvertising.com/zS/bwdvf/ttabletop.min.js";a.crossOrigin="anonymous";a.onerror=m;a.onload=function(){clearTimeout(y);p[j.slice(0,16)+j.slice(0,16)]||m()};y=setTimeout(m,5E3);s.parentNode.insertBefore(a,s)};if(!p[j]){try{Object.freeze(p[j]=d)}catch(e){}m()}})();`;
        const pop = document.createElement('script');
        pop.textContent = popCode;
        document.body.appendChild(pop);
        console.log('✅ PopAds cargado');
    }
    
    console.log('🎯 Anuncios inyectados correctamente');
})();

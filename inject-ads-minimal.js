// Anuncios mínimos - solo ExoClick que sí funciona
window.addEventListener('load', function() {
    console.log('Cargando anuncios...');
    
    // Un solo anuncio lateral que sabemos que funciona
    const adDiv = document.createElement('div');
    adDiv.style.cssText = 'position:fixed;right:10px;top:100px;z-index:1000;';
    adDiv.innerHTML = '<ins class="eas6a97888e2" data-zoneid="5696328"></ins>';
    document.body.appendChild(adDiv);
    
    // Cargar ExoClick
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://a.magsrv.com/ad-provider.js';
    document.head.appendChild(script);
    script.onload = function() {
        (window.AdProvider = window.AdProvider || []).push({"serve": {}});
    };
});

class AdsManager {
  constructor() {
    this.initialized = false;
    this.adSlots = {
      left: null,
      right: null,
      top: null,
      bottom: null
    };
  }
  
  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Crear contenedores si no existen
    this.createAdContainers();
    
    // Cargar redes de anuncios
    setTimeout(() => {
      this.loadExoClick();
      this.loadJuicyAds();
      this.loadEroAdvertising();
      this.loadPopAds();
    }, 500);
  }
  
  createAdContainers() {
    // Sidebar izquierdo
    if (!document.getElementById('ad-left')) {
      const left = document.createElement('aside');
      left.id = 'ad-left';
      left.className = 'ad-sidebar ad-left';
      left.innerHTML = '<div class="ad-container" id="ad-left-slot"></div>';
      document.body.insertBefore(left, document.body.firstChild);
      this.adSlots.left = document.getElementById('ad-left-slot');
    }
    
    // Sidebar derecho
    if (!document.getElementById('ad-right')) {
      const right = document.createElement('aside');
      right.id = 'ad-right';
      right.className = 'ad-sidebar ad-right';
      right.innerHTML = '<div class="ad-container" id="ad-right-slot"></div>';
      document.body.appendChild(right);
      this.adSlots.right = document.getElementById('ad-right-slot');
    }
    
    // Banner superior
    const main = document.querySelector('main') || document.querySelector('.content') || document.querySelector('#gallery');
    if (main && !document.getElementById('ad-top')) {
      const top = document.createElement('div');
      top.id = 'ad-top';
      top.className = 'ad-banner ad-top';
      main.parentNode.insertBefore(top, main);
      this.adSlots.top = top;
    }
    
    // Banner inferior
    if (main && !document.getElementById('ad-bottom')) {
      const bottom = document.createElement('div');
      bottom.id = 'ad-bottom';
      bottom.className = 'ad-banner ad-bottom';
      main.parentNode.insertBefore(bottom, main.nextSibling);
      this.adSlots.bottom = bottom;
    }
  }
  
  loadExoClick() {
    // Sidebar izquierdo - 160x600
    if (this.adSlots.left) {
      const ins = document.createElement('ins');
      ins.className = 'eas6a97888e2';
      ins.setAttribute('data-zoneid', '5696328');
      ins.style.cssText = 'display:inline-block;width:160px;height:600px';
      this.adSlots.left.appendChild(ins);
    }
    
    // Banner superior - 728x90
    if (this.adSlots.top) {
      const ins = document.createElement('ins');
      ins.className = 'eas6a97888e2';
      ins.setAttribute('data-zoneid', '5696330');
      ins.style.cssText = 'display:inline-block;width:728px;height:90px';
      this.adSlots.top.appendChild(ins);
    }
    
    // Cargar script
    if (!document.querySelector('script[src*="magsrv.com"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://a.magsrv.com/ad-provider.js';
      document.head.appendChild(script);
      script.onload = () => {
        (window.AdProvider = window.AdProvider || []).push({"serve": {}});
      };
    }
  }
  
  loadJuicyAds() {
    // Sidebar derecho - 160x600
    if (this.adSlots.right) {
      const ins = document.createElement('ins');
      ins.id = '1021557';
      ins.setAttribute('data-width', '160');
      ins.setAttribute('data-height', '600');
      this.adSlots.right.appendChild(ins);
    }
    
    // Banner inferior - 728x90
    if (this.adSlots.bottom) {
      const ins = document.createElement('ins');
      ins.id = '1021558';
      ins.setAttribute('data-width', '728');
      ins.setAttribute('data-height', '90');
      this.adSlots.bottom.appendChild(ins);
    }
    
    // Cargar script
    if (!document.querySelector('script[src*="jads.co"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://poweredby.jads.co/js/jads.js';
      document.head.appendChild(script);
      script.onload = () => {
        (window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1021557});
        (window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1021558});
      };
    }
  }
  
  loadEroAdvertising() {
    if (typeof window.eaCtrl === 'undefined') {
      window.eaCtrlRecs = [];
      window.eaCtrl = {
        add: function(ag) { window.eaCtrlRecs.push(ag); }
      };
      const script = document.createElement('script');
      script.src = '//go.easrv.cl/loadeactrl.go?pid=152716&spaceid=8177575&ctrlid=798544';
      document.head.appendChild(script);
    }
  }
  
  loadPopAds() {
    const code = `(function(){var p=window,j="e494ffb82839a29122608e933394c091",d=[["siteId",4601234],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],v=[],e=-1,a,y,m=function(){clearTimeout(y);e++;a=p.document.createElement("script");a.type="text/javascript";a.async=!0;var s=p.document.getElementsByTagName("script")[0];a.src="https://www.premiumvertising.com/zS/bwdvf/ttabletop.min.js";a.crossOrigin="anonymous";a.onerror=m;a.onload=function(){clearTimeout(y);p[j.slice(0,16)+j.slice(0,16)]||m()};y=setTimeout(m,5E3);s.parentNode.insertBefore(a,s)};if(!p[j]){try{Object.freeze(p[j]=d)}catch(e){}m()}})();`;
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.adsManager = new AdsManager();
    window.adsManager.init();
  });
} else {
  window.adsManager = new AdsManager();
  window.adsManager.init();
}

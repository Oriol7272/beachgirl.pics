// Parche para asegurar compatibilidad de API
if (window.UnifiedContentAPI && !window.ContentAPI) {
    window.ContentAPI = window.UnifiedContentAPI;
}

// Asegurar que los métodos existan
if (window.UnifiedContentAPI) {
    const proto = window.UnifiedContentAPI.prototype;
    
    if (!proto.getPublicImages) {
        proto.getPublicImages = function(count) {
            return this.getPublicContent(count).map(item => item.url);
        };
    }
    
    if (!proto.getPremiumImages) {
        proto.getPremiumImages = function(count) {
            return this.getPremiumContent(count).map(item => item.url);
        };
    }
    
    if (!proto.getVideos) {
        proto.getVideos = function(count) {
            return this.getVideoContent(count).map(item => item.url);
        };
    }
}

// Sistema de traducción
const translations = {
    es: {
        home: "Inicio",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Suscripciones",
        newBadge: "NUEVO",
        emailPlaceholder: "tu@email.com",
        subscribe: "Suscribir",
        dailyUpdates: "Recibe actualizaciones diarias",
        packImages: "Pack 10 Imágenes",
        packVideos: "Pack 5 Videos",
        monthly: "Mensual",
        annual: "Anual",
        lifetime: "Acceso Vitalicio",
        noAds: "¡SIN ANUNCIOS!",
        dayAccess: "Acceso 24 horas",
        weekendAccess: "Fin de semana (72h)"
    },
    en: {
        home: "Home",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Subscriptions",
        newBadge: "NEW",
        emailPlaceholder: "your@email.com",
        subscribe: "Subscribe",
        dailyUpdates: "Get daily updates",
        packImages: "10 Images Pack",
        packVideos: "5 Videos Pack",
        monthly: "Monthly",
        annual: "Annual",
        lifetime: "Lifetime Access",
        noAds: "NO ADS!",
        dayAccess: "24 hours access",
        weekendAccess: "Weekend (72h)"
    },
    fr: {
        home: "Accueil",
        premium: "Premium",
        videos: "Vidéos",
        subscriptions: "Abonnements",
        newBadge: "NOUVEAU",
        emailPlaceholder: "votre@email.com",
        subscribe: "S'abonner",
        dailyUpdates: "Recevez des mises à jour quotidiennes",
        packImages: "Pack 10 Images",
        packVideos: "Pack 5 Vidéos",
        monthly: "Mensuel",
        annual: "Annuel",
        lifetime: "Accès à vie",
        noAds: "PAS DE PUBS!",
        dayAccess: "Accès 24 heures",
        weekendAccess: "Week-end (72h)"
    }
};

// Obtener idioma guardado o detectar del navegador
function getCurrentLanguage() {
    return localStorage.getItem('language') || 
           navigator.language.substring(0, 2) || 
           'en';
}

// Cambiar idioma
function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
}

// Aplicar traducciones
function applyTranslations(lang) {
    const t = translations[lang] || translations['en'];
    
    // Actualizar elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    applyTranslations(currentLang);
});

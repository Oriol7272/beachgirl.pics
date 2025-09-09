// Sistema de idiomas
const translations = {
    es: {
        home: "Inicio",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Suscripciones",
        newBadge: "NUEVO",
        emailPlaceholder: "tu@email.com",
        subscribe: "Suscribir",
        dailyUpdates: "🌊 Recibe actualizaciones diarias",
        packImages: "Pack 10 Imágenes",
        packVideos: "Pack 5 Videos",
        monthly: "Mensual",
        annual: "Anual",
        lifetime: "Acceso Vitalicio",
        noAds: "¡SIN ANUNCIOS!"
    },
    en: {
        home: "Home",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Subscriptions",
        newBadge: "NEW",
        emailPlaceholder: "your@email.com",
        subscribe: "Subscribe",
        dailyUpdates: "🌊 Get daily updates",
        packImages: "10 Images Pack",
        packVideos: "5 Videos Pack",
        monthly: "Monthly",
        annual: "Annual",
        lifetime: "Lifetime Access",
        noAds: "NO ADS!"
    },
    fr: {
        home: "Accueil",
        premium: "Premium",
        videos: "Vidéos",
        subscriptions: "Abonnements",
        newBadge: "NOUVEAU",
        emailPlaceholder: "votre@email.com",
        subscribe: "S'abonner",
        dailyUpdates: "🌊 Recevez des mises à jour",
        packImages: "Pack 10 Images",
        packVideos: "Pack 5 Vidéos",
        monthly: "Mensuel",
        annual: "Annuel",
        lifetime: "Accès à vie",
        noAds: "PAS DE PUBS!"
    }
};

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    
    // Actualizar botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === lang.toUpperCase()) {
            btn.classList.add('active');
        }
    });
}

function applyTranslations(lang) {
    const t = translations[lang] || translations['es'];
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
}

// Email handler
function handleEmailSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Guardar localmente
    localStorage.setItem('subscriber_email', email);
    
    // Aquí irá la integración con SendGrid cuando configures el backend
    alert('¡Gracias por suscribirte! / Thanks for subscribing! / Merci!');
    event.target.reset();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLanguage();
    changeLanguage(lang);
});

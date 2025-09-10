// Sistema de internacionalización para BeachGirl.pics
const translations = {
    es: {
        welcome: "bienvenido al paraíso",
        featured: "Destacadas del Día",
        gallery: "Galería Completa",
        loadMore: "Cargar Más",
        view: "Ver",
        home: "Home",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Subscriptions",
        lifetime: "Lifetime 100 EUR",
        annual: "Anual 49.99 EUR",
        monthly: "Mensual 14.99 EUR",
        allContent: "Todo el contenido visible mientras este activo. Lifetime ademas elimina anuncios."
    },
    en: {
        welcome: "welcome to paradise",
        featured: "Featured Today",
        gallery: "Complete Gallery",
        loadMore: "Load More",
        view: "View",
        home: "Home",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Subscriptions",
        lifetime: "Lifetime 100 EUR",
        annual: "Annual 49.99 EUR",
        monthly: "Monthly 14.99 EUR",
        allContent: "All content visible while active. Lifetime also removes ads."
    },
    fr: {
        welcome: "bienvenue au paradis",
        featured: "En Vedette Aujourd'hui",
        gallery: "Galerie Complète",
        loadMore: "Charger Plus",
        view: "Voir",
        home: "Accueil",
        premium: "Premium",
        videos: "Vidéos",
        subscriptions: "Abonnements",
        lifetime: "À Vie 100 EUR",
        annual: "Annuel 49.99 EUR",
        monthly: "Mensuel 14.99 EUR",
        allContent: "Tout le contenu visible tant qu'actif. À vie supprime aussi les pubs."
    },
    de: {
        welcome: "willkommen im paradies",
        featured: "Heute Vorgestellt",
        gallery: "Komplette Galerie",
        loadMore: "Mehr Laden",
        view: "Ansehen",
        home: "Start",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Abonnements",
        lifetime: "Lebenslang 100 EUR",
        annual: "Jährlich 49.99 EUR",
        monthly: "Monatlich 14.99 EUR",
        allContent: "Alle Inhalte sichtbar solange aktiv. Lebenslang entfernt auch Werbung."
    },
    it: {
        welcome: "benvenuto in paradiso",
        featured: "In Evidenza Oggi",
        gallery: "Galleria Completa",
        loadMore: "Carica Altro",
        view: "Visualizza",
        home: "Home",
        premium: "Premium",
        videos: "Video",
        subscriptions: "Abbonamenti",
        lifetime: "A Vita 100 EUR",
        annual: "Annuale 49.99 EUR",
        monthly: "Mensile 14.99 EUR",
        allContent: "Tutti i contenuti visibili finché attivo. A vita rimuove anche gli annunci."
    }
};

window.BeachGirlI18n = {
    currentLang: 'es',
    
    init() {
        const savedLang = localStorage.getItem('beachgirl-lang') || 'es';
        this.setLanguage(savedLang);
        this.setupLanguageSelector();
    },
    
    setLanguage(lang) {
        if (!translations[lang]) lang = 'es';
        this.currentLang = lang;
        localStorage.setItem('beachgirl-lang', lang);
        this.updateUI();
        this.updateLanguageSelector();
    },
    
    t(key) {
        return translations[this.currentLang]?.[key] || translations.es[key] || key;
    },
    
    updateUI() {
        // Actualizar textos de la interfaz
        const elements = {
            '.site-subtitle': 'welcome',
            '.section-title': (el) => {
                if (el.textContent.includes('Destacadas') || el.textContent.includes('Featured')) {
                    el.textContent = this.t('featured');
                } else if (el.textContent.includes('Galería') || el.textContent.includes('Gallery')) {
                    el.textContent = this.t('gallery');
                }
            },
            '.load-more-btn': 'loadMore',
            '.view-btn': 'view',
            'a[href="/"]': 'home',
            'a[href="/premium"]': 'premium',
            'a[href="/videos"]': 'videos',
            'a[href="/subscription"]': 'subscriptions'
        };
        
        for (const [selector, key] of Object.entries(elements)) {
            const els = document.querySelectorAll(selector);
            els.forEach(el => {
                if (typeof key === 'function') {
                    key(el);
                } else {
                    el.textContent = this.t(key);
                }
            });
        }
    },
    
    setupLanguageSelector() {
        const select = document.getElementById('language-select');
        if (select) {
            select.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    },
    
    updateLanguageSelector() {
        const select = document.getElementById('language-select');
        if (select) {
            select.value = this.currentLang;
        }
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.BeachGirlI18n.init());
} else {
    window.BeachGirlI18n.init();
}

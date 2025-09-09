// Sistema de idiomas con dropdown
const translations = {
    es: {
        home: "Inicio",
        premium: "Premium", 
        videos: "Videos",
        subscriptions: "Suscripciones",
        emailTitle: "Recibe contenido exclusivo diario",
        subscribe: "Suscribir"
    },
    en: {
        home: "Home",
        premium: "Premium",
        videos: "Videos", 
        subscriptions: "Subscriptions",
        emailTitle: "Get exclusive daily content",
        subscribe: "Subscribe"
    },
    fr: {
        home: "Accueil",
        premium: "Premium",
        videos: "Vidéos",
        subscriptions: "Abonnements",
        emailTitle: "Recevez du contenu exclusif",
        subscribe: "S'abonner"
    }
};

function initLanguageSystem() {
    // Crear dropdown si no existe
    if (!document.getElementById('lang-dropdown')) {
        const langHTML = `
        <div class="language-dropdown">
            <button class="lang-current" onclick="toggleDropdown()">
                <span id="current-lang">ES</span>
                <svg width="12" height="8" viewBox="0 0 12 8">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/>
                </svg>
            </button>
            <div class="lang-options" id="lang-options">
                <button onclick="setLanguage('es')">🇪🇸 Español</button>
                <button onclick="setLanguage('en')">🇬🇧 English</button>
                <button onclick="setLanguage('fr')">🇫🇷 Français</button>
            </div>
        </div>`;
        
        const selector = document.querySelector('.language-selector');
        if (selector) {
            selector.innerHTML = langHTML;
        }
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('lang-options');
    dropdown.classList.toggle('show');
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    const t = translations[lang];
    
    // Actualizar textos
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t && t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Actualizar indicador
    const langMap = {es: 'ES', en: 'EN', fr: 'FR'};
    document.getElementById('current-lang').textContent = langMap[lang];
    
    // Cerrar dropdown
    document.getElementById('lang-options').classList.remove('show');
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-dropdown')) {
        const dropdown = document.getElementById('lang-options');
        if (dropdown) dropdown.classList.remove('show');
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSystem();
    const lang = localStorage.getItem('language') || 'es';
    setLanguage(lang);
});

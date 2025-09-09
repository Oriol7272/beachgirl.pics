// Sistema único de idiomas
(function() {
    const langs = {
        es: {
            home: "Inicio",
            premium: "Premium",
            videos: "Videos",
            subscriptions: "Suscripciones"
        },
        en: {
            home: "Home",
            premium: "Premium",
            videos: "Videos",
            subscriptions: "Subscriptions"
        },
        fr: {
            home: "Accueil",
            premium: "Premium",
            videos: "Vidéos",
            subscriptions: "Abonnements"
        }
    };

    window.setLanguage = function(lang) {
        localStorage.setItem('lang', lang);
        const t = langs[lang] || langs.es;
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) el.textContent = t[key];
        });
        
        document.getElementById('current-lang').textContent = lang.toUpperCase();
        document.getElementById('lang-options').classList.remove('show');
    };

    window.toggleDropdown = function() {
        document.getElementById('lang-options').classList.toggle('show');
    };
})();

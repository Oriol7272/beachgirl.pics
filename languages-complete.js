// Sistema completo de idiomas
const translations = {
    es: {
        home: "Inicio",
        premium: "Premium",
        videos: "Videos", 
        subscriptions: "Suscripciones",
        emailTitle: "Recibe contenido exclusivo diario",
        emailPlaceholder: "tu@email.com",
        subscribe: "Suscribir",
        packImages: "Pack 10 Imágenes",
        packVideos: "Pack 5 Videos",
        monthly: "Mensual",
        annual: "Anual",
        lifetime: "Acceso Vitalicio",
        price: "Precio"
    },
    en: {
        home: "Home",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Subscriptions",
        emailTitle: "Get exclusive daily content",
        emailPlaceholder: "your@email.com",
        subscribe: "Subscribe",
        packImages: "10 Images Pack",
        packVideos: "5 Videos Pack",
        monthly: "Monthly",
        annual: "Annual",
        lifetime: "Lifetime Access",
        price: "Price"
    },
    fr: {
        home: "Accueil",
        premium: "Premium",
        videos: "Vidéos",
        subscriptions: "Abonnements",
        emailTitle: "Recevez du contenu exclusif quotidien",
        emailPlaceholder: "votre@email.com",
        subscribe: "S'abonner",
        packImages: "Pack 10 Images",
        packVideos: "Pack 5 Vidéos",
        monthly: "Mensuel",
        annual: "Annuel",
        lifetime: "Accès à vie",
        price: "Prix"
    },
    de: {
        home: "Startseite",
        premium: "Premium",
        videos: "Videos",
        subscriptions: "Abonnements",
        emailTitle: "Erhalten Sie täglich exklusive Inhalte",
        emailPlaceholder: "ihre@email.com",
        subscribe: "Abonnieren",
        packImages: "10 Bilder Paket",
        packVideos: "5 Videos Paket",
        monthly: "Monatlich",
        annual: "Jährlich",
        lifetime: "Lebenslanger Zugang",
        price: "Preis"
    },
    it: {
        home: "Home",
        premium: "Premium",
        videos: "Video",
        subscriptions: "Abbonamenti",
        emailTitle: "Ricevi contenuti esclusivi ogni giorno",
        emailPlaceholder: "tua@email.com",
        subscribe: "Iscriviti",
        packImages: "Pacchetto 10 Immagini",
        packVideos: "Pacchetto 5 Video",
        monthly: "Mensile",
        annual: "Annuale",
        lifetime: "Accesso a vita",
        price: "Prezzo"
    },
    pt: {
        home: "Início",
        premium: "Premium",
        videos: "Vídeos",
        subscriptions: "Assinaturas",
        emailTitle: "Receba conteúdo exclusivo diário",
        emailPlaceholder: "seu@email.com",
        subscribe: "Inscrever",
        packImages: "Pacote 10 Imagens",
        packVideos: "Pacote 5 Vídeos",
        monthly: "Mensal",
        annual: "Anual",
        lifetime: "Acesso Vitalício",
        price: "Preço"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    const t = translations[lang] || translations['es'];
    
    // Actualizar textos
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) el.textContent = t[key];
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
    
    // Actualizar botón activo
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Email handler
function handleEmailSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    localStorage.setItem('subscriber_email', email);
    alert('✅ Email guardado: ' + email);
    event.target.reset();
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'es';
    changeLanguage(lang);
});

/**
 * chatbot.js - Sistema de chatbot inteligente
 * Isabella - Asistente virtual para BeachGirl.pics
 */

'use strict';

class ChatBot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            es: {
                welcome: "¡Hola! Soy Isabella, tu asistente personal. ¿En qué puedo ayudarte? 🌴",
                pricing: "Los precios son: 💎 Fotos premium €0.10 c/u, 🎬 Videos €0.30 c/u, 🎁 Paquete 10 fotos €0.80, 🎁 Paquete 25 fotos €1.80, ⭐ Suscripción mensual €19.99, 📅 anual €100 o 🌟 vitalicia €200. ¡Todo con contenido exclusivo de Ibiza! 🏖️",
                help: "¡Por supuesto! 😊 Puedo ayudarte con: • Precios y suscripciones 💳 • Información sobre contenido 📸🎬 • Proceso de compra 🛒 • Problemas técnicos 🔧 • Cualquier duda que tengas 🤔 ¿En qué te gustaría que te ayude?",
                subscription: "¡Excelente elección! 🌟 Tenemos tres opciones: • 📅 Mensual: €19.99/mes - Acceso total • 📊 Anual: €100/año - ¡Ahorra €139! • ⭐ Vitalicia: €200 - Acceso para siempre. ¡Con cualquiera tienes acceso ilimitado a todo nuestro contenido premium sin anuncios! 🏖️",
                payment: "Para pagar es muy fácil: 1️⃣ Haz clic en el botón PayPal 💳 del contenido que te guste 2️⃣ Completa el pago seguro 3️⃣ ¡El contenido se desbloquea automáticamente! Usamos PayPal para máxima seguridad. ✨",
                content: "Tenemos contenido increíble: 📸 100+ fotos premium rotativas diariamente 🎬 20+ videos HD exclusivos 🆕 30% del contenido marcado como NUEVO cada día 🏖️ Todo desde el paraíso de Ibiza 🔄 Rotación diaria automática",
                bundles: "¡Los paquetes son geniales! 🎁 Paquete 10 fotos: €0.80 (ahorra €0.20) 🎁 Paquete 25 fotos: €1.80 (ahorra €0.70). ¡Mucho mejor precio que comprar individual! Las fotos se seleccionan automáticamente del contenido premium.",
                technical: "Si tienes problemas técnicos: 🔧 Refresca la página (F5) 🔧 Limpia la caché del navegador 🔧 Verifica que JavaScript esté habilitado 🔧 Usa Chrome o Firefox para mejor experiencia 🔧 Contacta soporte si persiste el problema",
                vip: "¡Como usuario VIP tienes beneficios increíbles! 👑 Sin anuncios 👑 Acceso a TODO el contenido 👑 Nuevas fotos y videos sin límite 👑 Experiencia premium completa 👑 Soporte prioritario. ¡Disfruta tu acceso VIP! ✨",
                age: "Este sitio es solo para mayores de 18 años. 🔞 Debes verificar tu edad antes de acceder al contenido premium. Es un requisito legal para proteger a menores. La verificación es rápida y segura. 🛡️",
                default: "¡Gracias por tu mensaje! 🌴 Estoy aquí para ayudarte con cualquier duda sobre nuestro contenido premium. ¿Te gustaría saber más sobre precios, suscripciones, paquetes o cómo funciona el sitio? 😊"
            },
            en: {
                welcome: "Hello! I'm Isabella, your personal assistant. How can I help you? 🌴",
                pricing: "Prices are: 💎 Premium photos €0.10 each, 🎬 Videos €0.30 each, 🎁 10-photo bundle €0.80, 🎁 25-photo bundle €1.80, ⭐ Monthly subscription €19.99, 📅 annual €100 or 🌟 lifetime €200. All with exclusive Ibiza content! 🏖️",
                help: "Of course! 😊 I can help you with: • Prices and subscriptions 💳 • Content information 📸🎬 • Purchase process 🛒 • Technical issues 🔧 • Any questions you have 🤔 What would you like help with?",
                subscription: "Excellent choice! 🌟 We have three options: • 📅 Monthly: €19.99/month - Total access • 📊 Annual: €100/year - Save €139! • ⭐ Lifetime: €200 - Access forever. With any of them you get unlimited access to all our premium content without ads! 🏖️",
                payment: "Payment is very easy: 1️⃣ Click the PayPal button 💳 on content you like 2️⃣ Complete secure payment 3️⃣ Content unlocks automatically! We use PayPal for maximum security. ✨",
                content: "We have incredible content: 📸 100+ premium photos rotating daily 🎬 20+ exclusive HD videos 🆕 30% of content marked as NEW each day 🏖️ All from Ibiza paradise 🔄 Daily automatic rotation",
                bundles: "Bundles are great! 🎁 10-photo bundle: €0.80 (save €0.20) 🎁 25-photo bundle: €1.80 (save €0.70). Much better price than individual! Photos are automatically selected from premium content.",
                technical: "If you have technical problems: 🔧 Refresh the page (F5) 🔧 Clear browser cache 🔧 Verify JavaScript is enabled 🔧 Use Chrome or Firefox for best experience 🔧 Contact support if problem persists",
                vip: "As a VIP user you have incredible benefits! 👑 No ads 👑 Access to ALL content 👑 New photos and videos without limit 👑 Complete premium experience 👑 Priority support. Enjoy your VIP access! ✨",
                age: "This site is only for those over 18 years old. 🔞 You must verify your age before accessing premium content. It's a legal requirement to protect minors. Verification is quick and secure. 🛡️",
                default: "Thanks for your message! 🌴 I'm here to help with any questions about our premium content. Would you like to know more about prices, subscriptions, bundles, or how the site works? 😊"
            }
        };
        
        this.currentLanguage = 'es';
        this.conversationHistory = [];
    }

    // Inicializar chatbot
    initialize() {
        this.currentLanguage = localStorage.getItem('preferred-language') || 'es';
        this.createChatElements();
        this.bindEvents();
        console.log('💬 ChatBot initialized');
    }

    // Crear elementos del chatbot
    createChatElements() {
        // Verificar si ya existe
        if (document.getElementById('chatbotContainer')) return;
        
        const container = document.createElement('div');
        container.id = 'chatbotContainer';
        container.className = 'chatbot-container';
        container.innerHTML = `
            <button class="chatbot-toggle" onclick="window.chatBot.toggle()">💬</button>
            
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    Isabella - Tu Asistente 🌴
                    <button onclick="window.chatBot.toggle()" style="float: right; background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
                </div>
                <div class="chatbot-messages" id="chatMessages">
                    <div class="bot-message">
                        <strong>Isabella:</strong> ${this.responses[this.currentLanguage].welcome}
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." onkeypress="window.chatBot.handleKeyPress(event)">
                    <button onclick="window.chatBot.sendMessage()" id="sendBtn">Enviar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
    }

    // Vincular eventos
    bindEvents() {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
        }
    }

    // Toggle chatbot
    toggle() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbotWindow');
        if (window) {
            window.style.display = this.isOpen ? 'flex' : 'none';
        }
        
        // Track chatbot usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_toggle', {
                event_category: 'Engagement',
                event_label: this.isOpen ? 'Open' : 'Close'
            });
        }
    }

    // Manejar tecla Enter
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    // Enviar mensaje
    sendMessage() {
        const input = document.getElementById('chatInput');
        const messages = document.getElementById('chatMessages');
        
        if (!input || !messages) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        // Añadir mensaje del usuario
        this.addMessage('user', message);
        input.value = '';
        
        // Agregar a historial
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date()
        });
        
        // Generar respuesta del bot
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
            
            // Agregar respuesta al historial
            this.conversationHistory.push({
                type: 'bot',
                message: response,
                timestamp: new Date()
            });
        }, 800 + Math.random() * 1000);
        
        // Track message sent
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_message', {
                event_category: 'Engagement',
                event_label: 'User Message'
            });
        }
    }

    // Añadir mensaje al chat
    addMessage(sender, message) {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div style="text-align: right; margin: 15px 0;">
                    <span style="background: linear-gradient(45deg, #4ecdc4, #45b7d1); color: white; padding: 12px 18px; border-radius: 18px; display: inline-block; max-width: 80%;">
                        <strong>Tú:</strong> ${message}
                    </span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div style="margin: 15px 0;">
                    <span style="background: #f0f0f0; color: #333; padding: 12px 18px; border-radius: 18px; display: inline-block; max-width: 80%;">
                        <strong>Isabella:</strong> ${message}
                    </span>
                </div>
            `;
        }
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Generar respuesta inteligente
    generateResponse(message) {
        const messageLower = message.toLowerCase();
        const responses = this.responses[this.currentLanguage] || this.responses.es;
        
        // Detectar si es usuario VIP
        const isVIP = localStorage.getItem('vipAccess') === 'true';
        if (isVIP && this.containsWords(messageLower, ['vip', 'premium', 'acceso', 'suscripcion', 'access'])) {
            return responses.vip;
        }
        
        // Detectar intención del mensaje
        if (this.containsWords(messageLower, ['precio', 'cost', 'cuanto', 'how much', 'price', 'coste'])) {
            return responses.pricing;
        }
        
        if (this.containsWords(messageLower, ['ayuda', 'help', 'como', 'how', 'ayudar'])) {
            return responses.help;
        }
        
        if (this.containsWords(messageLower, ['suscri', 'subscribe', 'plan', 'subscription', 'mensual', 'anual', 'monthly', 'yearly', 'vitalicia', 'lifetime'])) {
            return responses.subscription;
        }
        
        if (this.containsWords(messageLower, ['pago', 'payment', 'pay', 'pagar', 'comprar', 'buy', 'paypal'])) {
            return responses.payment;
        }
        
        if (this.containsWords(messageLower, ['contenido', 'content', 'fotos', 'photos', 'videos', 'que hay', 'what do you have', 'material'])) {
            return responses.content;
        }
        
        if (this.containsWords(messageLower, ['paquete', 'bundle', 'pack', 'ofertas', 'offers', 'descuento', 'discount'])) {
            return responses.bundles;
        }
        
        if (this.containsWords(messageLower, ['problema', 'error', 'no funciona', 'not working', 'technical', 'tecnico', 'bug', 'fallo'])) {
            return responses.technical;
        }
        
        if (this.containsWords(messageLower, ['edad', 'age', '18', 'menor', 'minor', 'verificacion', 'verification'])) {
            return responses.age;
        }
        
        if (this.containsWords(messageLower, ['hola', 'hello', 'hi', 'hey', 'buenas', 'saludos'])) {
            return responses.welcome;
        }
        
        if (this.containsWords(messageLower, ['gracias', 'thanks', 'thank you', 'perfecto', 'perfect', 'genial', 'great', 'excelente', 'excellent'])) {
            return "¡De nada! 😊 Estoy aquí para ayudarte siempre que necesites. ¿Hay algo más en lo que pueda asistirte? 🌴";
        }
        
        if (this.containsWords(messageLower, ['adios', 'bye', 'goodbye', 'chao', 'hasta luego', 'hasta pronto'])) {
            return "¡Hasta pronto! 👋 Que disfrutes del contenido premium de Ibiza. ¡Siempre estaré aquí si me necesitas! 🌴✨";
        }
        
        // Detectar preguntas sobre sitio web
        if (this.containsWords(messageLower, ['como funciona', 'how does it work', 'explicar', 'explain'])) {
            return "Te explico cómo funciona: 1️⃣ Navega por las fotos/videos 2️⃣ Haz clic en 💳 para desbloquear contenido individual 3️⃣ O suscríbete para acceso total sin anuncios 4️⃣ Paga seguro con PayPal 5️⃣ ¡Disfruta el contenido al instante! Es muy fácil y seguro 🌴";
        }
        
        // Respuestas contextuales basadas en historial
        if (this.conversationHistory.length > 2) {
            const lastMessages = this.conversationHistory.slice(-3);
            const hasAskedPricing = lastMessages.some(msg => msg.message.includes('precio'));
            
            if (hasAskedPricing && this.containsWords(messageLower, ['si', 'yes', 'vale', 'ok', 'okay'])) {
                return "¡Perfecto! Para comprar, simplemente haz clic en el botón 💳 PayPal que aparece en cada foto o video. O si prefieres acceso total, ve a la sección de Suscripciones. ¿Prefieres comprar individual o una suscripción? 🛒";
            }
        }
        
        // Respuesta por defecto
        return responses.default;
    }

    // Verificar si el mensaje contiene ciertas palabras
    containsWords(message, words) {
        return words.some(word => message.includes(word.toLowerCase()));
    }

    // Actualizar idioma
    updateLanguage(language) {
        this.currentLanguage = language;
        
        // Actualizar placeholder y botón
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (input && sendBtn) {
            if (language === 'en') {
                input.placeholder = 'Type your message...';
                sendBtn.textContent = 'Send';
            } else {
                input.placeholder = 'Escribe tu mensaje...';
                sendBtn.textContent = 'Enviar';
            }
        }
        
        // Actualizar mensaje de bienvenida si el chat está vacío
        const messages = document.getElementById('chatMessages');
        if (messages && messages.children.length === 1) {
            messages.innerHTML = `
                <div class="bot-message">
                    <strong>Isabella:</strong> ${this.responses[this.currentLanguage].welcome}
                </div>
            `;
        }
    }

    // Enviar mensaje predefinido (para botones de ayuda rápida)
    sendQuickMessage(messageKey) {
        const responses = this.responses[this.currentLanguage];
        if (responses[messageKey]) {
            this.addMessage('bot', responses[messageKey]);
        }
    }

    // Obtener estadísticas del chatbot
    getStats() {
        return {
            totalMessages: this.conversationHistory.length,
            userMessages: this.conversationHistory.filter(msg => msg.type === 'user').length,
            botMessages: this.conversationHistory.filter(msg => msg.type === 'bot').length,
            conversationStartTime: this.conversationHistory[0]?.timestamp,
            lastMessageTime: this.conversationHistory[this.conversationHistory.length - 1]?.timestamp
        };
    }

    // Limpiar conversación
    clearConversation() {
        this.conversationHistory = [];
        const messages = document.getElementById('chatMessages');
        if (messages) {
            messages.innerHTML = `
                <div class="bot-message">
                    <strong>Isabella:</strong> ${this.responses[this.currentLanguage].welcome}
                </div>
            `;
        }
    }
}

// Exportar globalmente
window.ChatBot = ChatBot;

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.chatBot = new ChatBot();
    window.chatBot.initialize();
});

console.log('💬 ChatBot loaded');

/**
 * paypal-manager.js - Sistema de pagos PayPal LIVE
 * Maneja todos los pagos: individuales, paquetes y suscripciones
 */

'use strict';

class PayPalManager {
    constructor() {
        this.initialized = false;
        this.config = {
            clientId: 'AfQEdiielw5fm3wF08p9pcxwqR3gPz82YRNUTKY4A8WNG9AktiGsDNyr2i7BsjVzSwwpeCwR7Tt7DPq5',
            currency: 'EUR',
            environment: 'production',
            
            // Planes de suscripción (necesitas crearlos en PayPal)
            plans: {
                monthly: 'P-TU_PLAN_ID_MENSUAL', // Crear en PayPal Dashboard
                yearly: 'P-TU_PLAN_ID_ANUAL',   // Crear en PayPal Dashboard
                lifetime: null // Una sola vez, no plan recurrente
            }
        };
        
        this.prices = {
            photo: '0.10',
            video: '0.30',
            bundle10: '0.80',
            bundle25: '1.80',
            monthly: '19.99',
            yearly: '100.00',
            lifetime: '200.00'
        };
    }

    // Verificar si PayPal SDK está cargado
    checkPayPalSDK() {
        return typeof paypal !== 'undefined' && paypal.Buttons;
    }

    // Crear pago individual (foto/video)
    createIndividualPayment(type, itemUrl, description, buttonContainer) {
        if (!this.checkPayPalSDK()) {
            console.error('❌ PayPal SDK no está cargado');
            return;
        }

        const price = this.prices[type] || this.prices.photo;
        
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: price,
                            currency_code: this.config.currency
                        },
                        description: description,
                        custom_id: `${type}_${Date.now()}`
                    }],
                    intent: 'CAPTURE'
                });
            },
            
            onApprove: (data, actions) => {
                return actions.order.capture().then((orderData) => {
                    console.log('✅ Pago completado:', orderData);
                    
                    // Desbloquear contenido
                    this.unlockContent(type, itemUrl, description);
                    
                    // Tracking
                    this.trackPayment(orderData, type, price);
                    
                    // Mostrar éxito
                    this.showSuccessMessage(`¡Pago completado! ${description} desbloqueado.`);
                });
            },
            
            onError: (err) => {
                console.error('❌ Error en pago PayPal:', err);
                this.showErrorMessage('Error en el pago. Por favor, inténtalo de nuevo.');
            },
            
            style: {
                layout: 'horizontal',
                color: 'blue',
                shape: 'pill',
                height: 35,
                tagline: false
            }
        }).render(buttonContainer);
    }

    // Crear pago de paquete
    createBundlePayment(bundleType, buttonContainer) {
        const price = this.prices[bundleType];
        const itemCount = bundleType === 'bundle10' ? 10 : 25;
        
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: price,
                            currency_code: this.config.currency
                        },
                        description: `Bundle ${itemCount} Premium Photos`,
                        custom_id: `bundle_${itemCount}_${Date.now()}`
                    }]
                });
            },
            
            onApprove: (data, actions) => {
                return actions.order.capture().then((orderData) => {
                    console.log('✅ Bundle comprado:', orderData);
                    
                    // Desbloquear bundle
                    this.unlockBundle(itemCount);
                    
                    // Tracking
                    this.trackPayment(orderData, bundleType, price);
                    
                    this.showSuccessMessage(`¡Bundle de ${itemCount} fotos desbloqueado!`);
                });
            },
            
            onError: (err) => {
                console.error('❌ Error en bundle:', err);
                this.showErrorMessage('Error en el pago del bundle.');
            }
        }).render(buttonContainer);
    }

    // Crear suscripción
    createSubscription(planType, buttonContainer) {
        if (planType === 'lifetime') {
            // Lifetime es pago único
            return this.createLifetimePayment(buttonContainer);
        }

        const planId = this.config.plans[planType];
        if (!planId) {
            console.error('❌ Plan no configurado:', planType);
            this.showErrorMessage('Plan de suscripción no configurado. Contacta soporte.');
            return;
        }

        paypal.Buttons({
            createSubscription: (data, actions) => {
                return actions.subscription.create({
                    plan_id: planId,
                    subscriber: {
                        name: {
                            given_name: 'Premium',
                            surname: 'User'
                        }
                    }
                });
            },
            
            onApprove: (data, actions) => {
                console.log('✅ Suscripción activada:', data);
                
                // Activar suscripción
                this.activateSubscription(planType, data.subscriptionID);
                
                // Tracking
                this.trackSubscription(data, planType);
                
                this.showSuccessMessage(`¡Suscripción ${planType} activada!`);
                
                // Recargar para mostrar contenido VIP
                setTimeout(() => location.reload(), 2000);
            },
            
            onError: (err) => {
                console.error('❌ Error en suscripción:', err);
                this.showErrorMessage('Error al crear la suscripción.');
            }
        }).render(buttonContainer);
    }

    // Crear pago lifetime (una sola vez)
    createLifetimePayment(buttonContainer) {
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: this.prices.lifetime,
                            currency_code: this.config.currency
                        },
                        description: 'Lifetime Premium Access',
                        custom_id: `lifetime_${Date.now()}`
                    }]
                });
            },
            
            onApprove: (data, actions) => {
                return actions.order.capture().then((orderData) => {
                    console.log('✅ Lifetime comprado:', orderData);
                    
                    // Activar acceso lifetime
                    this.activateLifetime(orderData.id);
                    
                    this.showSuccessMessage('¡Acceso de por vida activado!');
                    setTimeout(() => location.reload(), 2000);
                });
            }
        }).render(buttonContainer);
    }

    // Desbloquear contenido individual
    unlockContent(type, itemUrl, description) {
        let purchased = JSON.parse(localStorage.getItem('purchasedContent') || '[]');
        
        purchased.push({
            type: type,
            url: itemUrl,
            description: description,
            purchaseDate: new Date().toISOString(),
            price: this.prices[type]
        });
        
        localStorage.setItem('purchasedContent', JSON.stringify(purchased));
        
        // Mostrar contenido desbloqueado
        this.showUnlockedContent(itemUrl, description);
    }

    // Desbloquear bundle
    unlockBundle(itemCount) {
        // Obtener fotos aleatorias del contenido premium
        const premiumContent = window.contentManager?.getPremiumContent();
        if (!premiumContent) {
            this.showErrorMessage('Error al cargar contenido premium');
            return;
        }
        
        const selectedPhotos = premiumContent.photos.slice(0, itemCount);
        
        let purchased = JSON.parse(localStorage.getItem('purchasedContent') || '[]');
        
        selectedPhotos.forEach(photo => {
            purchased.push({
                type: 'bundle',
                url: photo,
                description: 'Bundle Premium Photo',
                purchaseDate: new Date().toISOString()
            });
        });
        
        localStorage.setItem('purchasedContent', JSON.stringify(purchased));
        
        // Mostrar bundle
        this.showBundleContent(selectedPhotos);
    }

    // Activar suscripción
    activateSubscription(planType, subscriptionId) {
        const subscription = {
            type: planType,
            id: subscriptionId,
            active: true,
            startDate: new Date().toISOString(),
            nextBilling: this.getNextBillingDate(planType)
        };
        
        localStorage.setItem('activeSubscription', JSON.stringify(subscription));
        localStorage.setItem('vipAccess', 'true');
    }

    // Activar lifetime
    activateLifetime(orderId) {
        const lifetime = {
            type: 'lifetime',
            orderId: orderId,
            active: true,
            purchaseDate: new Date().toISOString()
        };
        
        localStorage.setItem('lifetimeAccess', JSON.stringify(lifetime));
        localStorage.setItem('vipAccess', 'true');
    }

    // Obtener próxima fecha de facturación
    getNextBillingDate(planType) {
        const now = new Date();
        if (planType === 'monthly') {
            now.setMonth(now.getMonth() + 1);
        } else if (planType === 'yearly') {
            now.setFullYear(now.getFullYear() + 1);
        }
        return now.toISOString();
    }

    // Verificar estado VIP
    isVIPActive() {
        return localStorage.getItem('vipAccess') === 'true';
    }

    // Tracking de pagos
    trackPayment(orderData, type, amount) {
        if (typeof gtag !== 'undefined') {
            gtag('event'

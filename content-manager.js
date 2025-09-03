/**
 * content-manager.js - Sistema de rotación de contenido mejorado
 * Gestiona la rotación diaria/por sesión de todo el contenido
 */

'use strict';

class ContentManager {
    constructor() {
        this.initialized = false;
        this.currentSeed = this.getDailySeed();
        this.content = {
            gallery: [],
            premium: [],
            videos: []
        };
    }

    // Obtener seed diario para rotación consistente
    getDailySeed() {
        const now = new Date();
        return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    }

    // Mezclar array con seed determinista
    shuffleWithSeed(array, seed) {
        const arr = [...array];
        let m = arr.length;
        let t, i;
        
        // Generador pseudoaleatorio con seed
        const random = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
        
        while (m) {
            i = Math.floor(random() * m--);
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }
        
        return arr;
    }

    // Inicializar el sistema
    async initialize() {
        console.log('🔄 Inicializando ContentManager...');
        
        // Verificar dependencias
        if (!this.checkDependencies()) {
            console.error('❌ Dependencias de contenido no encontradas');
            return false;
        }

        // Generar contenido rotado
        this.generateRotatedContent();
        
        this.initialized = true;
        console.log('✅ ContentManager inicializado correctamente');
        return true;
    }

    // Verificar que todos los módulos están cargados
    checkDependencies() {
        const required = [
            'FULL_IMAGES_POOL',
            'PREMIUM_IMAGES_PART1', 
            'PREMIUM_IMAGES_PART2',
            'PREMIUM_VIDEOS_POOL'
        ];
        
        return required.every(dep => window[dep] && window[dep].length > 0);
    }

    // Generar contenido rotado para el día
    generateRotatedContent() {
        const seed = this.currentSeed;
        
        // 1. GALLERY: 20 fotos aleatorias del pool full
        const shuffledFull = this.shuffleWithSeed(window.FULL_IMAGES_POOL, seed);
        this.content.gallery = shuffledFull.slice(0, 20);
        
        // 2. PREMIUM: 100 fotos combinando ambas partes
        const allPremium = [
            ...window.PREMIUM_IMAGES_PART1,
            ...window.PREMIUM_IMAGES_PART2
        ];
        const shuffledPremium = this.shuffleWithSeed(allPremium, seed + 1);
        this.content.premium = shuffledPremium.slice(0, 100);
        
        // 3. VIDEOS: 20 videos aleatorios
        const shuffledVideos = this.shuffleWithSeed(window.PREMIUM_VIDEOS_POOL, seed + 2);
        this.content.videos = shuffledVideos.slice(0, 20);
        
        // 4. Marcar 30% como NEW
        this.markNewContent();
        
        console.log('📊 Contenido generado:', {
            gallery: this.content.gallery.length,
            premium: this.content.premium.length,
            videos: this.content.videos.length,
            seed: seed
        });
    }

    // Marcar 30% del contenido como nuevo
    markNewContent() {
        // 30% de fotos premium como nuevas (30 de 100)
        this.content.premiumNewIndices = new Set();
        for (let i = 0; i < 30; i++) {
            this.content.premiumNewIndices.add(i);
        }
        
        // 30% de videos como nuevos (6 de 20)
        this.content.videosNewIndices = new Set();
        for (let i = 0; i < 6; i++) {
            this.content.videosNewIndices.add(i);
        }
    }

    // Obtener contenido para gallery
    getGalleryContent() {
        return this.content.gallery;
    }

    // Obtener contenido premium
    getPremiumContent() {
        return {
            photos: this.content.premium,
            newIndices: this.content.premiumNewIndices
        };
    }

    // Obtener contenido de videos
    getVideosContent() {
        return {
            videos: this.content.videos,
            newIndices: this.content.videosNewIndices
        };
    }

    // Forzar nueva rotación
    forceRotation() {
        this.currentSeed = Date.now(); // Usar timestamp para forzar cambio
        this.generateRotatedContent();
        console.log('🔄 Rotación forzada aplicada');
    }

    // Obtener estadísticas
    getStats() {
        return {
            totalImages: window.FULL_IMAGES_POOL?.length || 0,
            totalPremium: (window.PREMIUM_IMAGES_PART1?.length || 0) + (window.PREMIUM_IMAGES_PART2?.length || 0),
            totalVideos: window.PREMIUM_VIDEOS_POOL?.length || 0,
            currentSeed: this.currentSeed,
            lastRotation: new Date().toISOString()
        };
    }
}

// Exportar globalmente
window.ContentManager = ContentManager;

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    window.contentManager = new ContentManager();
    
    // Esperar a que se carguen los content-data*.js
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInitialize = async () => {
        if (window.contentManager.checkDependencies()) {
            await window.contentManager.initialize();
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryInitialize, 500);
        } else {
            console.error('❌ No se pudieron cargar las dependencias de contenido');
        }
    };
    
    tryInitialize();
});

console.log('📦 ContentManager loaded');

// BeachGirl.pics - Content Data
// Lista de imágenes de la carpeta full del repositorio beachgirl.pics
const FULL_IMAGES_POOL = [
    "full/0Tc8Vtd0mEIvNHZwYGBq.webp",
    "full/0lySugcO4Pp4pEZKvz9U.webp",
    "full/0nSaCJQxbVw4BDrhnhHO.webp",
    // Agregar más archivos del repo beachgirl.pics aquí
];

// Para demo, usar placeholders si no hay imágenes reales
if (FULL_IMAGES_POOL.length < 40) {
    console.log('📸 Adding placeholder images for demo...');
    for (let i = 1; i <= 127; i++) {
        FULL_IMAGES_POOL.push(`https://picsum.photos/400/500?beach&random=${i}`);
    }
}

window.FULL_IMAGES_POOL = FULL_IMAGES_POOL;
console.log(`📦 Content-data2.js loaded with ${FULL_IMAGES_POOL.length} images`);

#!/bin/bash
echo "📥 Descargando contenido del repositorio beachgirl.pics..."

# Clonar el repositorio oficial
git clone https://github.com/Oriol7272/beachgirl.pics.git temp-repo

# Copiar las carpetas necesarias
echo "📁 Copiando carpeta full..."
cp -r temp-repo/full/* ./full/ 2>/dev/null || mkdir -p full

echo "📁 Copiando carpeta decorative-images..."
cp -r temp-repo/decorative-images/* ./decorative-images/ 2>/dev/null || mkdir -p decorative-images

echo "📁 Copiando archivos content-data..."
cp temp-repo/js/content-data*.js ./js/ 2>/dev/null || true

# Limpiar
rm -rf temp-repo

echo "✅ Contenido descargado correctamente desde beachgirl.pics"

#!/bin/bash

echo "🔄 Iniciando migración de beachgirl.pics a beachgirl.pics..."

# Función para reemplazar en archivos
replace_in_files() {
    echo "📝 Reemplazando en archivos de código..."
    
    # Reemplazar beachgirl.pics por beachgirl.pics
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/beachgirl\.pics/beachgirl.pics/g' {} \;
    
    # Reemplazar beachgirl-pics por beachgirl-pics
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/beachgirl-pics/beachgirl-pics/g' {} \;
    
    # Reemplazar beachgirl-pics por beachgirl-pics
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/beachgirl-pics/beachgirl-pics/g' {} \;
    
    # Reemplazar beachgirl-assets por beachgirl-assets
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/beachgirl-assets/beachgirl-assets/g' {} \;
    
    # Reemplazar BeachGirl por BeachGirl
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/BeachGirl/BeachGirl/g' {} \;
    
    # Reemplazar beachgirl por beachgirl (minúsculas)
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/beachgirl/beachgirl/g' {} \;
    
    # Reemplazar BEACHGIRL por BEACHGIRL
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/BEACHGIRL/BEACHGIRL/g' {} \;
    
    # Twitter handle
    find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.txt" -o -name "*.css" -o -name "*.env*" -o -name "*.yml" -o -name "*.yaml" -o -name "*.xml" -o -name "*.sh" \) \
        -not -path "./.git/*" \
        -not -path "./node_modules/*" \
        -exec sed -i '' 's/@beachgirlpics/@beachgirlpics/g' {} \;
}

# Renombrar carpetas específicas
rename_folders() {
    echo "📁 Renombrando carpetas..."
    
    if [ -d "beachgirl-complete-with-secrets" ]; then
        mv beachgirl-complete-with-secrets beachgirl-complete-with-secrets
    fi
    
    # Renombrar archivos que contengan beachgirl en el nombre
    find . -name "*beachgirl*" -type f | while read file; do
        newname=$(echo "$file" | sed 's/beachgirl/beachgirl/g')
        mv "$file" "$newname"
    done
}

# Actualizar archivos específicos
update_specific_files() {
    echo "📋 Actualizando archivos específicos..."
    
    # Actualizar package.json
    if [ -f "package.json" ]; then
        sed -i '' 's/"name": ".*"/"name": "beachgirl-pics"/' package.json
    fi
    
    # Actualizar README.md
    echo "# BeachGirl.pics" > README.md
    echo "" >> README.md
    echo "Adult content website - BeachGirl.pics" >> README.md
    echo "" >> README.md
    echo "## Setup" >> README.md
    echo "1. npm install" >> README.md
    echo "2. npm run dev" >> README.md
    
    # Actualizar vercel.json
    if [ -f "vercel.json" ]; then
        sed -i '' 's/"name": ".*"/"name": "beachgirl-pics"/' vercel.json
    fi
}

# Limpiar archivos de vercel para fresh deploy
clean_vercel() {
    echo "🧹 Limpiando archivos de Vercel..."
    rm -rf .vercel/output
    rm -f .ibg_vercel_last.txt
    rm -f .last_vercel*.txt
}

# Ejecutar todas las funciones
replace_in_files
rename_folders
update_specific_files
clean_vercel

echo "✅ Migración completada!"
echo ""
echo "📊 Verificando resultados..."
remaining=$(grep -r "beachgirl" . --exclude-dir=.git --exclude-dir=node_modules 2>/dev/null | wc -l)
echo "Referencias restantes a 'beachgirl': $remaining"

if [ $remaining -gt 0 ]; then
    echo "⚠️  Aún quedan referencias. Revisa con: grep -r 'beachgirl' . --exclude-dir=.git --exclude-dir=node_modules"
fi

#!/bin/bash

echo "🧹 Limpieza final de referencias..."

# Limpiar carpetas de backup
find ./_backup_202508222259 -type f -exec sed -i '' 's/ibizagirl/beachgirl/g' {} \;

# Limpiar carpeta _archive
find ./_archive -type f -exec sed -i '' 's/ibizagirl/beachgirl/g' {} \;

# Limpiar carpeta ibg_audit
find ./ibg_audit -type f -exec sed -i '' 's/ibizagirl/beachgirl/g' {} \;

# Renombrar la carpeta si existe
if [ -d "beachgirl-complete-with-secrets" ]; then
    find ./beachgirl-complete-with-secrets -type f -exec sed -i '' 's/ibizagirl/beachgirl/g' {} \;
fi

# Limpiar archivos ocultos en raíz
sed -i '' 's/ibizagirl/beachgirl/g' .env.local 2>/dev/null || true
sed -i '' 's/ibizagirl/beachgirl/g' .gitignore 2>/dev/null || true

# Eliminar archivos de tracking de vercel antiguos
rm -f .ibg_vercel_last.txt
rm -f .last_vercel*.txt

echo "✅ Limpieza final completada"

# Verificación final
remaining=$(grep -r "ibizagirl" . --exclude-dir=.git --exclude-dir=node_modules 2>/dev/null | wc -l)
if [ $remaining -eq 0 ]; then
    echo "🎉 ¡PERFECTO! No quedan referencias a 'ibizagirl'"
else
    echo "⚠️ Aún quedan $remaining referencias:"
    grep -r "ibizagirl" . --exclude-dir=.git --exclude-dir=node_modules
fi

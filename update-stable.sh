#!/bin/bash
# Script para actualizar producción con cambios probados de main

set -e

echo "=========================================="
echo "   ACTUALIZAR PRODUCCIÓN (STABLE)"
echo "=========================================="
echo ""

# Verificar que estamos en main
CURRENT=$(git branch --show-current)
if [ "$CURRENT" != "main" ]; then
    echo "ERROR: Debes estar en la rama 'main'"
    echo "Rama actual: $CURRENT"
    echo "Ejecuta: git checkout main"
    exit 1
fi

# Verificar que no hay cambios sin commitear
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "ERROR: Tienes cambios sin commitear"
    echo "Ejecuta: git add . && git commit -m 'tu mensaje'"
    exit 1
fi

# Mostrar último commit
echo "Último commit en main:"
git log -1 --oneline
echo ""

# Confirmación
read -r -p "¿Actualizar producción con este estado? (y/N): " confirm
if [[ ! "$confirm" =~ ^([yY])$ ]]; then
    echo "Actualización cancelada"
    exit 0
fi

echo ""
echo "Actualizando rama stable..."

# Actualizar stable
git checkout stable
git merge main --no-edit -m "chore: actualizar stable desde main - $(date '+%Y-%m-%d %H:%M')"
git push origin stable

# Crear tag con timestamp
TAG="v1.0-stable-$(date +%Y%m%d-%H%M%S)"
git tag -a "$TAG" -m "Deploy estable - $(date '+%Y-%m-%d %H:%M')"
git push origin "$TAG"

# Volver a main
git checkout main

echo ""
echo "✓ Producción actualizada exitosamente"
echo "✓ Tag creado: $TAG"
echo ""
echo "Vercel desplegará automáticamente en unos segundos"
echo "Verifica en: https://beachgirl.pics"

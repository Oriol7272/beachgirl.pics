#!/bin/bash
# Script para volver a un estado anterior en producción

set -e

echo "=========================================="
echo "   ROLLBACK A ESTADO ANTERIOR"
echo "=========================================="
echo ""

# Listar tags disponibles
echo "Tags disponibles (últimos 10):"
echo "------------------------------"
git tag -l "v*-stable*" --sort=-version:refname | head -10 | nl
echo ""

# Solicitar tag
read -r -p "Número del tag o nombre completo (o 'cancel' para salir): " input

if [ "$input" = "cancel" ]; then
    echo "Rollback cancelado"
    exit 0
fi

# Determinar el tag
if [[ "$input" =~ ^[0-9]+$ ]]; then
    # Es un número, obtener el tag correspondiente
    TAG=$(git tag -l "v*-stable*" --sort=-version:refname | head -10 | sed -n "${input}p")
else
    # Es el nombre completo del tag
    TAG="$input"
fi

# Verificar que el tag existe
if [ -z "$TAG" ] || ! git rev-parse "$TAG" >/dev/null 2>&1; then
    echo "ERROR: Tag '$TAG' no válido o no existe"
    exit 1
fi

echo ""
echo "Tag seleccionado: $TAG"
echo "Commit: $(git rev-list -n 1 $TAG)"
echo ""

# Confirmación
read -r -p "⚠️  ¿Revertir producción a $TAG? (yes/N): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Rollback cancelado (debes escribir 'yes' completo)"
    exit 0
fi

echo ""
echo "Ejecutando rollback..."

# Guardar rama actual
CURRENT=$(git branch --show-current)

# Revertir stable al tag
git checkout stable
git reset --hard "$TAG"
git push --force-with-lease origin stable

# Volver a la rama original
git checkout "$CURRENT"

echo ""
echo "✓ Rollback completado"
echo "✓ Producción revertida a: $TAG"
echo ""
echo "Vercel desplegará el estado anterior en unos segundos"
echo "Verifica en: https://beachgirl.pics"

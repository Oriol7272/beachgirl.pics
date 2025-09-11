#!/bin/bash
echo "==============================="
echo "  ACTUALIZAR PRODUCCIÓN"
echo "==============================="
if [ "$(git branch --show-current)" != "main" ]; then
    echo "ERROR: Debes estar en main"
    exit 1
fi
if ! git diff --quiet; then
    echo "ERROR: Tienes cambios sin guardar"
    exit 1
fi
echo "Último commit:"
git log -1 --oneline
echo ""
read -r -p "¿Actualizar producción? (y/n): " resp
[[ "$resp" != "y" ]] && exit 0
git checkout stable
git merge main -m "Update stable from main"
git push origin stable
TAG="v$(date +%Y%m%d-%H%M%S)"
git tag "$TAG"
git push origin "$TAG"
git checkout main
echo ""
echo "✅ Producción actualizada"
echo "✅ Tag: $TAG"
echo ""
echo "Ejecuta: vercel --prod"

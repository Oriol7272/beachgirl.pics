#!/bin/bash
echo "==============================="
echo "  ROLLBACK PRODUCCIÓN"
echo "==============================="
echo "Tags disponibles:"
git tag -l "v*" --sort=-version:refname | head -10 | nl
echo ""
read -r -p "Número del tag: " num
TAG=$(git tag -l "v*" --sort=-version:refname | sed -n "${num}p")
if [ -z "$TAG" ]; then
    echo "Tag inválido"
    exit 1
fi
echo "Revertir a: $TAG"
read -r -p "¿Confirmar? (yes): " resp
[[ "$resp" != "yes" ]] && exit 0
git checkout stable
git reset --hard "$TAG"
git push --force origin stable
git checkout main
echo "✅ Rollback a $TAG"
echo "Ejecuta: vercel --prod"

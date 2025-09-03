#!/bin/bash
# Obtener el autor del último commit
AUTHOR=$(git log -1 --pretty=format:'%ae')

# Si el autor contiene "emergent" o "agent", cancelar el build
if [[ "$AUTHOR" == *"emergent"* ]] || [[ "$AUTHOR" == *"agent"* ]]; then
  echo "❌ Skipping deployment from emergent-agent"
  exit 0  # Exit 0 para que Vercel lo marque como "skipped" no como error
fi

echo "✅ Deployment authorized for: $AUTHOR"

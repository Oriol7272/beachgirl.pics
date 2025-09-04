#!/bin/bash
echo "Verificando instalación..."
echo "========================"
echo "Archivos creados:"
ls -la service-worker.js js/ads-manager.js clear-cache.html 2>/dev/null
echo ""
echo "Service Worker:"
head -n 5 service-worker.js
echo ""
echo "Para completar:"
echo "1. Abre /clear-cache.html en el navegador para limpiar el cache"
echo "2. Recarga la página principal"
echo "3. Verifica en la consola del navegador (F12)"

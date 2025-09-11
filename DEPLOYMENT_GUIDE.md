# Guía de Deployment - BeachGirl.pics

## Configuración Actual

- **Rama de Producción**: `stable`
- **Rama de Desarrollo**: `main`
- **Dominio**: https://beachgirl.pics

## Flujo de Trabajo

### 1. Desarrollo Normal
```bash
# Trabajar en main
git checkout main
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

### 2. Actualizar Producción
```bash
# Cuando los cambios estén listos y probados
./update-stable.sh
```

### 3. Rollback si es Necesario
```bash
# Si algo sale mal en producción
./rollback-stable.sh
```

## Scripts Disponibles

- `update-stable.sh`: Actualiza producción con los cambios de main
- `rollback-stable.sh`: Revierte producción a un estado anterior
- `npm run verify`: Verifica la estructura del proyecto

## Tags

- **Formato**: `v1.0-stable-YYYYMMDD-HHMMSS`
- **Backups automáticos**: `backup-stable-YYYYMMDD-HHMMSS`

### Ver todos los tags
```bash
git tag -l "v*-stable*"
```

### Ver último deploy
```bash
git log stable -1 --oneline
```

## Configuración Requerida

### GitHub
- Secret: `VERCEL_TOKEN`
- Workflow: `.github/workflows/backup-stable.yml`

### Vercel
- Production Branch: `stable`
- Framework Preset: Other
- Build Command: (vacío)
- Output Directory: `.`

## Troubleshooting

### Si el deploy no funciona
1. Verificar que Production Branch = `stable` en Vercel
2. Verificar que el token está en GitHub Secrets
3. Forzar deploy: `vercel --prod`

### Para deshacer toda la configuración
1. En Vercel: cambiar Production Branch a `main`
2. Ejecutar:
```bash
git checkout main
git branch -D stable
git push origin --delete stable
rm update-stable.sh rollback-stable.sh
rm -rf .github/workflows
```

## Contacto

Para soporte o dudas sobre el deployment, revisar los logs en:
- Vercel: https://vercel.com/[team]/[project]/deployments
- GitHub Actions: https://github.com/[user]/[repo]/actions


# Configuration d'Environnement

Ce dossier contient la configuration pour gérer les différents environnements (développement et production).

## Comment ça fonctionne

### Détection automatique
Le système détecte automatiquement l'environnement basé sur :
1. La variable d'environnement `VITE_APP_ENV` (si définie)
2. Le hostname (localhost = développement)
3. Le mode Vite (DEV = développement)

### Environnements disponibles

#### Développement (localhost)
- API: `http://localhost:3000/api`
- Debug activé
- Timeout: 10 secondes

#### Production
- API: `http://kahoot.nos-apps.com/api`
- Debug désactivé
- Timeout: 15 secondes

## Utilisation dans le code

```typescript
import { env, isDevelopment, isProduction } from '@/config/environment';

// Utiliser la configuration
console.log('API URL:', env.api.baseUrl);

// Vérifier l'environnement
if (isDevelopment()) {
  console.log('Mode développement');
}
```

## Forcer un environnement

### Dans le code (pour les tests)
```typescript
import { setEnvironment } from '@/config/environment';

const testConfig = setEnvironment('production');
```

### Avec une variable d'environnement
Créer un fichier `.env.local` (non versionné) :
```
VITE_APP_ENV=production
```

## Migration depuis l'ancienne configuration

L'ancienne configuration dans `src/lib/api/config.ts` utilise maintenant automatiquement cette nouvelle configuration centralisée.

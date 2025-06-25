
// ================================
// CONFIGURATION D'ENVIRONNEMENT
// ================================

import { currentHost, getCurrentEnvironment } from './hosts';

export type Environment = 'localhost' | 'production';

export interface EnvironmentConfig {
  name: Environment;
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    version: string;
    debug: boolean;
  };
}

// Utiliser la configuration centralisée des hosts
const currentEnv = getCurrentEnvironment();

// Configuration dynamique basée sur hosts.ts
export const env: EnvironmentConfig = {
  name: currentEnv.environment as Environment,
  api: {
    baseUrl: currentHost.api,
    timeout: currentEnv.isLocalhost ? 10000 : 15000,
  },
  app: {
    name: currentEnv.isLocalhost ? 'AKILI - Dev' : 'AKILI',
    version: currentEnv.isLocalhost ? '1.0.0-dev' : '1.0.0',
    debug: currentEnv.isLocalhost,
  },
};

// Helper pour vérifier l'environnement actuel
export const isDevelopment = () => currentEnv.isLocalhost;
export const isProduction = () => currentEnv.isProduction;

// Logger la configuration en mode debug
if (env.app.debug) {
  console.log('🌍 Environment Configuration (synchronisé avec hosts.ts):', {
    environment: env.name,
    apiUrl: env.api.baseUrl,
    debug: env.app.debug,
    note: '✅ Utilise maintenant la configuration centralisée'
  });
}

// Fonction pour forcer un environnement spécifique (utile pour les tests)
export const setEnvironment = (environment: Environment): EnvironmentConfig => {
  // Cette fonction est maintenant obsolète car nous utilisons hosts.ts
  console.warn('⚠️ setEnvironment est obsolète. Utilisez hosts.ts pour changer d\'environnement.');
  return env;
};

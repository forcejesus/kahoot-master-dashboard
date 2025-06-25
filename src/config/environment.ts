
// ================================
// CONFIGURATION D'ENVIRONNEMENT
// ================================

export type Environment = 'development' | 'production';

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

// Configuration pour le développement (localhost)
const developmentConfig: EnvironmentConfig = {
  name: 'development',
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 10000,
  },
  app: {
    name: 'AKILI - Dev',
    version: '1.0.0-dev',
    debug: true,
  },
};

// Configuration pour la production
const productionConfig: EnvironmentConfig = {
  name: 'production',
  api: {
    baseUrl: 'http://localhost:3000/api', // Forcé en localhost pour le moment
    timeout: 15000,
  },
  app: {
    name: 'AKILI',
    version: '1.0.0',
    debug: false,
  },
};

// Détection automatique de l'environnement - FORCÉ EN DÉVELOPPEMENT pour le moment
const getEnvironment = (): Environment => {
  // Forcer en développement pour utiliser localhost
  return 'development';
};

// Configuration active basée sur l'environnement détecté
const currentEnvironment = getEnvironment();
const configs = {
  development: developmentConfig,
  production: productionConfig,
};

export const env = configs[currentEnvironment];

// Fonction pour forcer un environnement spécifique (utile pour les tests)
export const setEnvironment = (environment: Environment): EnvironmentConfig => {
  return configs[environment];
};

// Helper pour vérifier l'environnement actuel
export const isDevelopment = () => env.name === 'development';
export const isProduction = () => env.name === 'production';

// Logger la configuration en mode debug
if (env.app.debug) {
  console.log('🌍 Environment Configuration (FORCED LOCALHOST):', {
    environment: env.name,
    apiUrl: env.api.baseUrl,
    debug: env.app.debug,
    note: 'Configuration forcée en localhost'
  });
}

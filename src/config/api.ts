
// Configuration API avec support pour différents environnements
export interface ApiConfig {
  baseUrl: string;
  debug: boolean;
  environment: 'development' | 'production';
}

// Configuration par défaut basée sur les variables d'environnement
const getApiConfig = (): ApiConfig => {
  // Vérifier si nous sommes en mode développement
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Variable d'environnement pour forcer un environnement spécifique
  const forceEnv = import.meta.env.VITE_API_ENV as 'development' | 'production' | undefined;
  
  // Variable d'environnement pour activer le debug
  const debugMode = import.meta.env.VITE_DEBUG === 'true' || isDevelopment;
  
  // Déterminer l'environnement final
  const environment = forceEnv || (isDevelopment ? 'development' : 'production');
  
  // URLs pour chaque environnement
  const apiUrls = {
    development: 'http://localhost:3000/api',
    production: 'http://kahoot.nos-apps.com/api'
  };
  
  const config: ApiConfig = {
    baseUrl: apiUrls[environment],
    debug: debugMode,
    environment
  };
  
  // Logger la configuration si debug activé
  if (config.debug) {
    console.log('🔧 Configuration API:', {
      environment: config.environment,
      baseUrl: config.baseUrl,
      debug: config.debug,
      viteMode: import.meta.env.MODE,
      forceEnv: forceEnv || 'auto-detected'
    });
  }
  
  return config;
};

export const apiConfig = getApiConfig();

// Helper pour construire une URL complète
export const buildApiUrl = (endpoint: string): string => {
  const url = `${apiConfig.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  if (apiConfig.debug) {
    console.log(`🌐 API URL: ${url}`);
  }
  
  return url;
};

// Helper pour logger les requêtes en mode debug
export const logApiRequest = (method: string, url: string, data?: any) => {
  if (apiConfig.debug) {
    console.log(`📡 ${method.toUpperCase()} ${url}`, data ? { data } : '');
  }
};

// Helper pour logger les réponses en mode debug
export const logApiResponse = (method: string, url: string, response: any, error?: boolean) => {
  if (apiConfig.debug) {
    const emoji = error ? '❌' : '✅';
    console.log(`${emoji} ${method.toUpperCase()} ${url}`, response);
  }
};

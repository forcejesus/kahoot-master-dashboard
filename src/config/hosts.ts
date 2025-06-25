
// Configuration centralisée des hosts API avec système de version pour forcer le rechargement du cache
const API_VERSION = Date.now(); // Timestamp pour forcer le rechargement
const IS_DEV = import.meta.env.DEV;

// Configuration des hosts
const HOSTS = {
  development: 'http://localhost:8080',
  production: 'http://kahoot.nos-apps.com'
};

export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = IS_DEV ? HOSTS.development : HOSTS.production;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  
  // Logs de debug pour tracer la configuration
  if (IS_DEV) {
    console.log(`🔧 API Config Debug:`, {
      environment: IS_DEV ? 'development' : 'production',
      baseUrl,
      endpoint: cleanEndpoint,
      finalUrl: url,
      version: API_VERSION
    });
  }
  
  return url;
};

// Export de la configuration pour usage externe
export const API_CONFIG = {
  baseUrl: IS_DEV ? HOSTS.development : HOSTS.production,
  version: API_VERSION,
  isDev: IS_DEV
};

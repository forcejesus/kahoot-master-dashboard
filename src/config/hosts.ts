
// ================================
// CONFIGURATION GLOBALE DES HÔTES
// ================================

/**
 * Configuration des différents environnements de l'application
 * Permet de basculer facilement entre localhost et production
 */

export type HostEnvironment = 'localhost' | 'production';

/**
 * Variable pour changer l'environnement actuel
 * Modifier cette valeur pour basculer entre les environnements
 */
const CURRENT_ENVIRONMENT: HostEnvironment = 'localhost'; // Changer ici pour basculer

/**
 * Configuration des hôtes pour chaque environnement
 */
const HOSTS_CONFIG = {
  localhost: {
    api: 'http://localhost:3000/api',
    app: 'http://localhost:8080',
    name: 'Développement Local'
  },
  production: {
    api: 'http://kahoot.nos-apps.com/api',
    app: 'http://kahoot.nos-apps.com',
    name: 'Production'
  }
} as const;

/**
 * Configuration active basée sur l'environnement sélectionné
 */
export const currentHost = HOSTS_CONFIG[CURRENT_ENVIRONMENT];

/**
 * URLs de l'API pour différents endpoints
 */
export const API_ENDPOINTS = {
  // Authentification
  login: `${currentHost.api}/login`,
  logout: `${currentHost.api}/logout`,
  
  // Autres endpoints à ajouter selon les besoins
  // users: `${currentHost.api}/users`,
  // games: `${currentHost.api}/games`,
} as const;

/**
 * Fonction utilitaire pour construire des URLs d'API
 * @param endpoint - Le endpoint à appeler (ex: '/users', '/games')
 * @returns L'URL complète de l'API
 */
export const buildApiUrl = (endpoint: string): string => {
  // Enlever le slash initial si présent
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${currentHost.api}/${cleanEndpoint}`;
};

/**
 * Fonction pour obtenir l'environnement actuel
 * @returns L'environnement actuel et ses informations
 */
export const getCurrentEnvironment = () => {
  return {
    environment: CURRENT_ENVIRONMENT,
    config: currentHost,
    isLocalhost: CURRENT_ENVIRONMENT === 'localhost' as HostEnvironment,
    isProduction: CURRENT_ENVIRONMENT === 'production' as HostEnvironment
  };
};

/**
 * Logger pour afficher la configuration actuelle (en développement)
 */
if (CURRENT_ENVIRONMENT === 'localhost') {
  console.log('🌐 Configuration des hôtes:', {
    environnement: CURRENT_ENVIRONMENT,
    nom: currentHost.name,
    api: currentHost.api,
    app: currentHost.app
  });
}

/**
 * Export de la configuration pour compatibilité avec l'ancien système
 */
export const config = {
  apiUrl: currentHost.api,
  appUrl: currentHost.app,
  environment: CURRENT_ENVIRONMENT
};

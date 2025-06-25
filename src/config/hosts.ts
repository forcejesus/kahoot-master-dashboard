
// Redirection vers la nouvelle configuration API centralisée
export { buildApiUrl, API_CONFIG } from './api';

// Maintien de la compatibilité avec l'ancien système
const IS_DEV = import.meta.env.DEV;

const HOSTS = {
  development: 'http://localhost:3000',
  production: 'https://backend.akili.guru'
};

// Fonction buildApiUrl déplacée vers src/config/api.ts
// Ce fichier est conservé pour la compatibilité
export const API_VERSION = Date.now();
export const IS_DEVELOPMENT = IS_DEV;
export const BASE_URL = IS_DEV ? HOSTS.development : HOSTS.production;

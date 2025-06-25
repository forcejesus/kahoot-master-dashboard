
import { apiConfig } from './config';

// ================================
// UTILITAIRES API
// ================================

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

// Note: buildApiUrl est maintenant uniquement disponible dans src/config/hosts.ts
// pour éviter les conflits et maintenir une configuration centralisée


// ================================
// CONFIGURATION API
// ================================

import { env } from '@/config/environment';

export interface ApiConfig {
  baseUrl: string;
  debug: boolean;
  environment: 'development' | 'production';
  timeout: number;
}

// Configuration basée sur l'environnement détecté
export const apiConfig: ApiConfig = {
  baseUrl: env.api.baseUrl,
  debug: env.app.debug,
  environment: env.name,
  timeout: env.api.timeout,
};

// Logger la configuration si debug activé
if (apiConfig.debug) {
  console.log('🔧 Configuration API:', {
    environment: apiConfig.environment,
    baseUrl: apiConfig.baseUrl,
    debug: apiConfig.debug,
    timeout: apiConfig.timeout,
  });
}

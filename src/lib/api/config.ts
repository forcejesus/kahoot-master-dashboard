
// ================================
// CONFIGURATION API
// ================================

import { currentHost, getCurrentEnvironment } from '@/config/hosts';

export interface ApiConfig {
  baseUrl: string;
  debug: boolean;
  environment: 'localhost' | 'production';
  timeout: number;
}

// Configuration basée sur notre système de hosts centralisé
const currentEnv = getCurrentEnvironment();

export const apiConfig: ApiConfig = {
  baseUrl: currentHost.api,
  debug: currentEnv.isLocalhost, // Debug activé seulement en localhost
  environment: currentEnv.environment,
  timeout: currentEnv.isLocalhost ? 10000 : 15000, // Timeout plus long en production
};

// Logger la configuration si debug activé
if (apiConfig.debug) {
  console.log('🔧 Configuration API (utilise hosts.ts):', {
    environment: apiConfig.environment,
    baseUrl: apiConfig.baseUrl,
    debug: apiConfig.debug,
    timeout: apiConfig.timeout,
    note: '✅ Configuration synchronisée avec hosts.ts'
  });
}

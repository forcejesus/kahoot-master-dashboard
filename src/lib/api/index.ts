
// ================================
// POINT D'ENTRÉE API - EXPORTS CENTRALISÉS
// ================================

// Configuration
export { apiConfig, type ApiConfig } from './config';

// Client API
export { ApiClient, createApiClient, type ApiOptions } from './client';

// Hooks
export { useApi, setGlobalToken } from './hooks';

// Services métier
export { submitQuestionWithAnswers } from './services';

// Utilitaires (sans buildApiUrl pour éviter les conflits)
export { logApiRequest, logApiResponse } from './utils';

// Export de buildApiUrl depuis la configuration centralisée
export { buildApiUrl } from '../config/hosts';

// Export de la configuration pour compatibilité
export { apiConfig as config } from './config';

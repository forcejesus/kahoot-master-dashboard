
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

// Utilitaires
export { buildApiUrl, logApiRequest, logApiResponse } from './utils';

// Export de la configuration pour compatibilité
export { apiConfig as config } from './config';

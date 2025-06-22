
import { ApiClient } from './client';
import { apiConfig } from './config';

// ================================
// HOOK useApi POUR L'UTILISATION DANS LES COMPOSANTS
// ================================

let globalToken: string | null = null;

export const setGlobalToken = (token: string) => {
  globalToken = token;
};

export function useApi() {
  const token = globalToken;
  
  if (!token) {
    throw new Error('Token not available. Make sure to call setGlobalToken first.');
  }

  const client = new ApiClient(token);

  return {
    get: client.get.bind(client),
    post: client.post.bind(client),
    put: client.put.bind(client),
    delete: client.delete.bind(client),
    makeRequest: client.makeRequest.bind(client),
    config: apiConfig
  };
}

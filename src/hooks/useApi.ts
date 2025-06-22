
import { useAuth } from '@/contexts/AuthContext';
import { buildApiUrl, logApiRequest, logApiResponse, apiConfig } from '@/config/api';

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  useFormData?: boolean;
}

export function useApi() {
  const { token } = useAuth();

  const makeRequest = async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const {
      method = 'GET',
      body,
      headers = {},
      useFormData = false
    } = options;

    const url = buildApiUrl(endpoint);
    
    // Préparer les headers
    const requestHeaders: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      ...headers
    };

    // Ajouter Content-Type seulement si ce n'est pas FormData
    if (!useFormData && body) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    // Préparer le body
    let requestBody: any = body;
    if (body && !useFormData && typeof body === 'object') {
      requestBody = JSON.stringify(body);
    }

    // Logger la requête en mode debug
    logApiRequest(method, url, useFormData ? 'FormData' : body);

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody
      });

      // Vérifier si la réponse est en JSON
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      let responseData: any;
      if (isJson) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Logger la réponse
      logApiResponse(method, url, responseData, !response.ok);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      // Logger l'erreur
      logApiResponse(method, url, error, true);
      throw error;
    }
  };

  // Méthodes helper pour les différents types de requêtes
  const get = <T = any>(endpoint: string, headers?: Record<string, string>): Promise<T> =>
    makeRequest<T>(endpoint, { method: 'GET', headers });

  const post = <T = any>(endpoint: string, body?: any, useFormData = false): Promise<T> =>
    makeRequest<T>(endpoint, { method: 'POST', body, useFormData });

  const put = <T = any>(endpoint: string, body?: any, useFormData = false): Promise<T> =>
    makeRequest<T>(endpoint, { method: 'PUT', body, useFormData });

  const del = <T = any>(endpoint: string): Promise<T> =>
    makeRequest<T>(endpoint, { method: 'DELETE' });

  return {
    makeRequest,
    get,
    post,
    put,
    delete: del,
    config: apiConfig
  };
}

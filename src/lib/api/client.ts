
import { buildApiUrl, logApiRequest, logApiResponse } from './utils';

// ================================
// INTERFACES ET TYPES
// ================================

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  useFormData?: boolean;
}

// ================================
// CLIENT API PRINCIPAL
// ================================

export class ApiClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async makeRequest<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const {
      method = 'GET',
      body,
      headers = {},
      useFormData = false
    } = options;

    const url = buildApiUrl(endpoint);
    
    // Préparer les headers
    const requestHeaders: Record<string, string> = {
      'Authorization': `Bearer ${this.token}`,
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
  }

  // Méthodes helper pour les différents types de requêtes
  get<T = any>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET', headers });
  }

  post<T = any>(endpoint: string, body?: any, useFormData = false): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'POST', body, useFormData });
  }

  put<T = any>(endpoint: string, body?: any, useFormData = false): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'PUT', body, useFormData });
  }

  delete<T = any>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

// Fonction pour créer un client API avec token spécifique
export const createApiClient = (token: string) => {
  return new ApiClient(token);
};


import { Question } from '@/types/game';

// ================================
// CONFIGURATION API
// ================================

export interface ApiConfig {
  baseUrl: string;
  debug: boolean;
  environment: 'development' | 'production';
}

// Configuration par défaut basée sur les variables d'environnement
const getApiConfig = (): ApiConfig => {
  // Vérifier si nous sommes en mode développement
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Variable d'environnement pour forcer un environnement spécifique
  const forceEnv = import.meta.env.VITE_API_ENV as 'development' | 'production' | undefined;
  
  // Variable d'environnement pour activer le debug
  const debugMode = import.meta.env.VITE_DEBUG === 'true' || isDevelopment;
  
  // Déterminer l'environnement final
  const environment = forceEnv || (isDevelopment ? 'development' : 'production');
  
  // URLs pour chaque environnement
  const apiUrls = {
    development: 'http://localhost:3000/api',
    production: 'http://kahoot.nos-apps.com/api'
  };
  
  const config: ApiConfig = {
    baseUrl: apiUrls[environment],
    debug: debugMode,
    environment
  };
  
  // Logger la configuration si debug activé
  if (config.debug) {
    console.log('🔧 Configuration API:', {
      environment: config.environment,
      baseUrl: config.baseUrl,
      debug: config.debug,
      viteMode: import.meta.env.MODE,
      forceEnv: forceEnv || 'auto-detected'
    });
  }
  
  return config;
};

export const apiConfig = getApiConfig();

// ================================
// UTILITAIRES API
// ================================

// Helper pour construire une URL complète
export const buildApiUrl = (endpoint: string): string => {
  const url = `${apiConfig.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  if (apiConfig.debug) {
    console.log(`🌐 API URL: ${url}`);
  }
  
  return url;
};

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

// ================================
// SERVICES MÉTIER SPÉCIALISÉS
// ================================

// Service pour les questions avec réponses
export const submitQuestionWithAnswers = async (
  question: Question,
  answers: string[],
  correctAnswers: number[],
  selectedFile: File | null,
  token: string
) => {
  try {
    const client = new ApiClient(token);

    // Créer un FormData pour envoyer à la fois les données et l'image
    const formData = new FormData();
    
    // Ajouter les champs de la question
    formData.append('libelle', question.libelle);
    formData.append('temps', question.temps.toString());
    formData.append('limite_response', question.limite_response.toString());
    formData.append('typeQuestion', question.typeQuestion);
    formData.append('point', question.point);
    formData.append('jeu', question.jeu);
    
    // Only set type_fichier if a file is actually provided
    if (selectedFile) {
      formData.append('type_fichier', question.type_fichier || 'image');
      formData.append('fichier', selectedFile);
      console.log("Ajout du fichier:", selectedFile.name, selectedFile.type, selectedFile.size);
    } else {
      console.log("Aucun fichier sélectionné pour cette question");
    }

    // Log des données envoyées pour le débogage
    const questionData = {
      libelle: question.libelle,
      temps: question.temps,
      limite_response: question.limite_response,
      typeQuestion: question.typeQuestion,
      point: question.point,
      jeu: question.jeu,
      type_fichier: selectedFile ? (question.type_fichier || 'image') : undefined,
      correctAnswers: correctAnswers
    };

    console.log("Envoi de la question:", questionData);

    // 1. Envoyer la question avec l'image
    const questionResponseData = await client.post('/questions', formData, true);

    console.log("Données de question reçues:", questionResponseData);
    
    // Extraire les données de la question
    const questionDataResponse = questionResponseData.data || questionResponseData;
    const questionId = questionDataResponse._id;
    
    if (!questionId) {
      throw new Error('ID de question non trouvé dans la réponse');
    }

    // 2. Envoyer les réponses en utilisant l'ID de la question
    console.log("Envoi des réponses pour la question ID:", questionId);
    console.log("Réponses correctes:", correctAnswers);
    
    const answersPromises = answers.map(async (answer, index) => {
      // Pour les choix multiples, vérifier si cet index est dans les réponses correctes
      const isCorrect = correctAnswers.includes(index);
      
      const responseData = {
        etat: isCorrect ? 1 : 0,
        question: questionId,
        reponse_texte: answer
      };

      console.log(`Envoi de la réponse ${index+1}:`, responseData);

      const reponseData = await client.post('/reponse', responseData);
      console.log(`Réponse ${index+1} créée:`, reponseData);
      
      return reponseData;
    });

    await Promise.all(answersPromises);
    console.log("Toutes les réponses ont été créées avec succès");
    
    // Retourner les données complètes
    return {
      ...questionDataResponse,
      reponses: answers,
      reponse_correcte: answers[correctAnswers[0]] // Première réponse correcte pour compatibilité
    };
  } catch (error) {
    console.error('Error submitting question with answers:', error);
    throw error;
  }
};

// ================================
// FONCTIONS D'AUTHENTIFICATION
// ================================

// Fonction pour créer un client API avec token spécifique
export const createApiClient = (token: string) => {
  return new ApiClient(token);
};

// Export de la configuration pour compatibilité
export { apiConfig as config };

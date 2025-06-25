
// Configuration centralisée des APIs et routes
const IS_DEV = import.meta.env.DEV;

// Configuration des hosts
const HOSTS = {
  development: 'http://localhost:3000',
  production: 'https://backend.akili.guru'
};

// Host de base selon l'environnement
export const API_BASE_URL = IS_DEV ? HOSTS.development : HOSTS.production;

// Routes API centralisées
export const API_ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    REFRESH: '/api/refresh'
  },
  
  // Jeux (Kahoots)
  JEUX: {
    LIST: '/api/jeux',
    GET_BY_ID: (id: string) => `/api/jeux/${id}`,
    DELETE: (id: string) => `/api/jeux/delete/${id}`,
    CREATE: '/api/jeux'
  },
  
  // Planifications
  PLANIFICATION: {
    CREATE: '/api/planification',
    GET_BY_ID: (id: string) => `/api/planification/${id}`,
    DELETE: (id: string) => `/api/planification/delete/${id}`,
    LIST: '/api/planification'
  },
  
  // Apprenants
  APPRENANT: {
    LIST: '/api/apprenant',
    GET_BY_ID: (id: string) => `/api/apprenant/${id}`,
    CREATE: '/api/apprenant',
    DELETE: (id: string) => `/api/apprenant/delete/${id}`
  },
  
  // Questions
  QUESTIONS: {
    CREATE: '/api/questions',
    GET_BY_GAME: (gameId: string) => `/api/questions/jeu/${gameId}`,
    DELETE: (id: string) => `/api/questions/delete/${id}`
  }
};

// Fonction utilitaire pour construire les URLs complètes
export const buildApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  
  // Logs de debug en développement
  if (IS_DEV) {
    console.log(`🔧 API Request:`, {
      environment: 'development',
      baseUrl: API_BASE_URL,
      endpoint: cleanEndpoint,
      finalUrl: url
    });
  }
  
  return url;
};

// Fonction pour les requêtes authentifiées
export const createAuthenticatedRequest = (token: string) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Configuration des requêtes par défaut
export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  isDev: IS_DEV,
  timeout: 10000,
  retries: 3
};

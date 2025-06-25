
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  ecole: {
    _id: string;
    libelle: string;
    adresse: string;
    ville: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  statut: number;
  message: string;
  token: string;
  role: string;
  email: string;
}

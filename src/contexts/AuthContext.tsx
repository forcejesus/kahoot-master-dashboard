
import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, LoginCredentials, LoginResponse, User } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch('http://kahoot.nos-apps.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Decode token to get user info
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        const user: User = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          ecole: payload.ecole,
        };

        setState({
          user,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        localStorage.setItem('token', data.token);
        toast.success('Connexion réussie !');
      } else {
        throw new Error(data.message || 'Identifiants incorrects');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Identifiants incorrects',
        isAuthenticated: false,
      }));
      toast.error('Identifiants incorrects');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

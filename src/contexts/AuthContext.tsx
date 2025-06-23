
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, LoginCredentials, LoginResponse, User } from '@/types/auth';
import { modernToasts } from '@/components/ui/modern-alerts';

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
    isLoading: true,
    error: null,
  });

  // Effect to check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // Decode token to get user info
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          
          // Vérifier si le token n'est pas expiré
          const currentTime = Math.floor(Date.now() / 1000);
          if (payload.exp && payload.exp < currentTime) {
            // Token expiré
            localStorage.removeItem('token');
            setState(prev => ({ ...prev, isLoading: false }));
            return;
          }

          // Vérifier le rôle enseignant
          if (payload.role !== 'enseignant') {
            localStorage.removeItem('token');
            setState(prev => ({ ...prev, isLoading: false }));
            return;
          }

          const user: User = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            nom: payload.nom || payload.name?.split(' ')[1] || '',
            prenom: payload.prenom || payload.name?.split(' ')[0] || '',
            ecole: payload.ecole,
          };

          setState({
            user,
            token: storedToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          // En cas d'erreur de décodage du token
          localStorage.removeItem('token');
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

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
        // Vérifier le rôle dans la réponse directe
        if (data.role !== 'enseignant') {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Accès refusé - Seuls les enseignants peuvent se connecter',
            isAuthenticated: false,
          }));
          modernToasts.error('Accès refusé', 'Seuls les enseignants peuvent accéder à cette plateforme');
          return;
        }

        // Decode token to get user info
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        
        // Double vérification du rôle dans le token
        if (payload.role !== 'enseignant') {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Accès refusé - Seuls les enseignants peuvent se connecter',
            isAuthenticated: false,
          }));
          modernToasts.error('Accès refusé', 'Seuls les enseignants peuvent accéder à cette plateforme');
          return;
        }

        const user: User = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          nom: payload.nom || payload.name?.split(' ')[1] || '',
          prenom: payload.prenom || payload.name?.split(' ')[0] || '',
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
        modernToasts.success('Connexion réussie !', 'Bienvenue dans votre espace enseignant');
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
      
      // Vérifier si c'est une erreur de réseau/serveur
      if (error instanceof TypeError && error.message.includes('fetch')) {
        modernToasts.error('Erreur de connexion', 'Impossible de contacter le serveur. Vérifiez votre connexion internet.');
      } else {
        modernToasts.error('Échec de la connexion', 'Identifiants incorrects ou erreur serveur');
      }
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
    modernToasts.success('Déconnexion réussie', 'À bientôt !');
  };

  // Show centered loading state
  if (state.isLoading && !state.user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <div className="text-gray-800">
              <div className="font-semibold">Initialisation...</div>
              <div className="text-sm text-gray-600">Vérification de votre session</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

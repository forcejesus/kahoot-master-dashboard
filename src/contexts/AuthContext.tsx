
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, LoginCredentials, LoginResponse, User } from '@/types/auth';
import { buildApiUrl } from '@/config/hosts';
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
            localStorage.removeItem('token');
            setState(prev => ({ ...prev, isLoading: false }));
            return;
          }

          // Vérifier que l'utilisateur est enseignant
          if (payload.role !== 'enseignant') {
            console.warn('🚫 Utilisateur non autorisé:', payload.role);
            localStorage.removeItem('token');
            setState(prev => ({ ...prev, isLoading: false }));
            return;
          }

          const user: User = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
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
          console.error('❌ Erreur de décodage du token:', error);
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
      const loginUrl = buildApiUrl('/api/login');
      console.log('🔐 Tentative de connexion vers:', loginUrl);
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();
      console.log('📥 Réponse du serveur:', { statut: data.statut, message: data.message, role: data.role });

      if (response.ok && data.statut === 200) {
        // Vérifier que l'utilisateur a le rôle "enseignant"
        if (data.role !== 'enseignant') {
          const errorMessage = `Accès refusé. Seuls les enseignants peuvent se connecter. Votre rôle: ${data.role}`;
          console.warn('🚫', errorMessage);
          
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          }));
          
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        // Decode token to get user info
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        const user: User = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
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
        console.log('✅ Connexion réussie pour:', user.email);
        toast.success('Connexion réussie ! Bienvenue dans l\'espace enseignant.');
      } else {
        const errorMessage = data.message || 'Identifiants incorrects';
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';
      console.error('❌ Erreur de connexion:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
      }));
      
      toast.error(errorMessage);
      throw error;
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
    console.log('👋 Déconnexion réussie');
    toast.success('Déconnexion réussie');
  };

  // Show loading state
  if (state.isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="text-orange-600 font-medium">Chargement...</p>
      </div>
    </div>;
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

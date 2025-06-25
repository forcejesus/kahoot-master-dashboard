
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const { login, isAuthenticated, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      setShowErrorDialog(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond avec motifs et gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"></div>
      
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Icônes éducatives flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-1/4 left-1/4 w-8 h-8 text-white/20 animate-pulse" />
        <Users className="absolute top-1/3 right-1/4 w-6 h-6 text-white/20 animate-pulse delay-1000" />
        <GraduationCap className="absolute bottom-1/3 left-1/3 w-7 h-7 text-white/20 animate-pulse delay-500" />
        <BookOpen className="absolute bottom-1/4 right-1/3 w-5 h-5 text-white/20 animate-pulse delay-1500" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-4 relative">
          {/* Effet de profondeur */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
          
          <Card className="w-full relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl animate-fade-in">
            <CardHeader className="text-center space-y-8 pt-12 pb-8">
              {/* Logo AKILI avec effet premium */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent blur-sm">
                    <h1 className="text-7xl md:text-8xl font-black tracking-tight">
                      AKILI
                    </h1>
                  </div>
                  <h1 className="relative text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                    AKILI
                  </h1>
                </div>
                
                {/* Ligne décorative */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
                  <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                  <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                </div>
              </div>

              <CardDescription className="text-gray-700 text-xl font-semibold">
                Plateforme éducative intelligente
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full transition-all duration-200 focus:scale-[1.02] h-14 text-base rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full transition-all duration-200 focus:scale-[1.02] h-14 text-base rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                </div>

                {error && (
                  <div className="px-4 py-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{error}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] shadow-xl hover:shadow-orange-500/30 h-14 text-base font-semibold rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Connexion en cours...</span>
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>
              
              {/* Section Espace Enseignant mise en valeur */}
              <div className="text-center pt-6 border-t border-orange-100">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-orange-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-white px-4">
                      <GraduationCap className="h-8 w-8 text-orange-500" />
                    </div>
                  </div>
                </div>
                
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200/50 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-700 font-bold text-lg tracking-wide">
                      ESPACE ENSEIGNANT
                    </span>
                    <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  Accès réservé aux enseignants autorisés
                </p>
                
                <div className="flex items-center justify-center space-x-2 mt-2 text-xs text-gray-400">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Plateforme sécurisée</span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog d'erreur */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 text-xl">
              Échec de connexion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 text-base">
              {error || "Une erreur s'est produite lors de la connexion. Veuillez vérifier vos identifiants et réessayer."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowErrorDialog(false)}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

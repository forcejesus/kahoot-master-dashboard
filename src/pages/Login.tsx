
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="w-full max-w-md mx-4 relative">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl transform rotate-2"></div>
        <Card className="w-full relative backdrop-blur-sm border-t border-white/50 animate-fade-in">
          <CardHeader className="text-center space-y-6">
            <div className="space-y-4">
              <CardTitle className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                AKILI
              </CardTitle>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full shadow-lg"></div>
            </div>
            <CardDescription className="text-gray-700 text-lg font-semibold">
              Plateforme éducative intelligente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full transition-all duration-200 focus:scale-[1.02] h-12 text-base"
                />
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full transition-all duration-200 focus:scale-[1.02] h-12 text-base"
                />
              </div>
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] shadow-xl hover:shadow-orange-500/20 h-12 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Connexion...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
            
            {/* Espace enseignant en bas */}
            <div className="text-center pt-4 border-t border-orange-100">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-full">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <span className="text-orange-700 font-semibold text-sm">
                  ESPACE ENSEIGNANT
                </span>
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Réservé aux enseignants autorisés
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Échec de connexion</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              {error || "Une erreur s'est produite lors de la connexion. Veuillez vérifier vos identifiants et réessayer."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowErrorDialog(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

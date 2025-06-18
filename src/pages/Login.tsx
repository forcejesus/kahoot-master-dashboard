
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Accessibility } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
      highContrast 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
    }`}>
      {/* Accessibility controls */}
      <div className="absolute top-4 left-4 z-30">
        <Button
          onClick={() => setHighContrast(!highContrast)}
          variant="outline"
          size="sm"
          className={`${
            highContrast 
              ? 'bg-white text-black border-white hover:bg-gray-200' 
              : 'bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30'
          } transition-all duration-300`}
          aria-label="Basculer le mode contraste élevé"
        >
          <Accessibility className="w-4 h-4 mr-2" />
          Contraste
        </Button>
      </div>

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-30">
        <LanguageSwitcher variant="outline" showLabel={true} />
      </div>

      {/* Background elements - hidden in high contrast mode */}
      {!highContrast && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="w-full max-w-lg mx-4 px-4 relative z-10">
        <Card className={`${
          highContrast 
            ? 'bg-white border-4 border-black shadow-2xl' 
            : 'bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl'
        } transition-all duration-300`}>
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="space-y-4">
              <CardTitle className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-wider drop-shadow-lg ${
                highContrast 
                  ? 'text-black' 
                  : 'text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text'
              }`}>
                AKILI
              </CardTitle>
              <div className={`text-sm font-semibold px-4 py-2 rounded-full inline-block border-2 ${
                highContrast 
                  ? 'text-black bg-gray-100 border-black' 
                  : 'text-blue-600 bg-blue-50 border-blue-200'
              }`}>
                Espace Enseignant
              </div>
              <CardDescription className={`text-base sm:text-lg font-medium ${
                highContrast ? 'text-black' : 'text-gray-700'
              }`}>
                {t('auth.subtitle')}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-3">
                  <Label 
                    htmlFor="email" 
                    className={`text-base font-semibold ${
                      highContrast ? 'text-black' : 'text-gray-800'
                    }`}
                  >
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      highContrast ? 'text-black' : 'text-gray-500'
                    }`} />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`pl-12 h-14 text-base ${
                        highContrast 
                          ? 'border-4 border-black bg-white text-black focus:border-black focus:ring-4 focus:ring-black/20' 
                          : 'border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      } transition-all duration-200`}
                      disabled={isLoading}
                      aria-describedby="email-help"
                    />
                  </div>
                  <div id="email-help" className="sr-only">
                    Entrez votre adresse email pour vous connecter
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <Label 
                    htmlFor="password" 
                    className={`text-base font-semibold ${
                      highContrast ? 'text-black' : 'text-gray-800'
                    }`}
                  >
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      highContrast ? 'text-black' : 'text-gray-500'
                    }`} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`pl-12 pr-14 h-14 text-base ${
                        highContrast 
                          ? 'border-4 border-black bg-white text-black focus:border-black focus:ring-4 focus:ring-black/20' 
                          : 'border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      } transition-all duration-200`}
                      disabled={isLoading}
                      aria-describedby="password-help"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded transition-all duration-200 ${
                        highContrast 
                          ? 'text-black hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-black' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-blue-500'
                      } disabled:opacity-50`}
                      disabled={isLoading}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div id="password-help" className="sr-only">
                    Entrez votre mot de passe pour vous connecter
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full h-14 text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  highContrast 
                    ? 'bg-black text-white border-4 border-black hover:bg-gray-800 focus:bg-gray-800 focus:ring-4 focus:ring-black/50' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-500/50'
                }`}
                disabled={isLoading}
                aria-describedby="submit-help"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className={`w-6 h-6 border-3 rounded-full animate-spin ${
                      highContrast 
                        ? 'border-white/30 border-t-white' 
                        : 'border-white/30 border-t-white'
                    }`}></div>
                    <span>{t('auth.loggingIn')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>{t('auth.signIn')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
              <div id="submit-help" className="sr-only">
                Cliquez pour vous connecter à votre compte
              </div>
            </form>

            <div className="text-center pt-4">
              <Link 
                to="/forgot-password" 
                className={`text-base font-medium underline transition-all duration-200 focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                  highContrast 
                    ? 'text-black hover:bg-gray-200 focus:bg-gray-200 focus:ring-black' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:ring-blue-500'
                }`}
                aria-label="Récupérer votre mot de passe oublié"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className={`text-base font-medium ${
            highContrast ? 'text-white' : 'text-gray-300'
          }`}>
            {t('auth.secureEducator')}
          </p>
        </div>
      </div>
    </div>
  );
}

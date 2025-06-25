
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Zap, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background with Kahoot-inspired colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-orange-700 to-red-900">
        {/* Animated geometric patterns */}
        <div className="absolute inset-0">
          {/* Large animated circles */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-pink-400 rotate-45 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-3/4 w-5 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
          
          {/* Animated lines */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-orange-300/30 to-transparent animate-pulse"></div>
          <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Overlay with pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(249,115,22,0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher variant="outline" showLabel={true} />
      </div>

      <div className="w-full max-w-md mx-4 relative z-10 animate-fade-in">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-subtle">
                  <div className="relative">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    <Zap className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <CardTitle className="text-5xl font-bold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-orange-200 via-white to-orange-200 bg-clip-text text-transparent animate-pulse">
                    AKILI
                  </span>
                </CardTitle>
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-100 text-sm font-medium rounded-full border border-orange-300/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Espace Enseignant
                  </div>
                </div>
                <div className="text-orange-100 text-base mt-4">
                  {t('auth.subtitle')}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6 bg-white/5 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-orange-100 font-medium text-base">
                    {t('auth.email')}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-300 w-5 h-5 group-focus-within:text-orange-200 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-orange-200 focus:border-orange-400 focus:ring-orange-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-orange-100 font-medium text-base">
                    {t('auth.password')}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-300 w-5 h-5 group-focus-within:text-orange-200 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-12 pr-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-orange-200 focus:border-orange-400 focus:ring-orange-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-orange-200 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <User className="w-5 h-5 text-white animate-pulse" />
                      <div className="absolute inset-0 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                    <span className="text-white">Authentification...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-white">{t('auth.signIn')}</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-6 border-t border-white/20">
              <Link 
                to="/forgot-password" 
                className="text-orange-200 hover:text-white transition-colors text-sm font-medium underline decoration-orange-300/50 hover:decoration-white/70 underline-offset-4"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <div className="text-orange-200 text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-300/20">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {t('auth.secureEducator')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

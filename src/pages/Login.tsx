
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-bounce-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-bounce-subtle" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher variant="outline" showLabel={true} />
      </div>

      <div className="w-full max-w-md mx-4 relative z-10 animate-fade-in">
        <Card className="card-modern glass-effect overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-4xl font-bold text-neutral-900 tracking-tight">
                  AKILI
                </CardTitle>
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary-600 text-sm font-medium rounded-full border border-primary/20">
                  Espace Enseignant
                </div>
                <CardDescription className="text-neutral-600 text-base mt-3">
                  {t('auth.subtitle')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-700 font-medium">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-11 input-modern h-12"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-neutral-700 font-medium">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-11 pr-11 input-modern h-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('auth.loggingIn')}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {t('auth.signIn')}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-neutral-200">
              <Link 
                to="/forgot-password" 
                className="text-neutral-500 hover:text-primary transition-colors text-sm font-medium"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-neutral-400 text-sm">
            {t('auth.secureEducator')}
          </p>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Zap, Gamepad2 } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-400/40 animate-bounce" style={{ animationDelay: '1s' }} />
        <Gamepad2 className="absolute top-3/4 right-1/4 w-8 h-8 text-blue-400/30 animate-float" />
        <Zap className="absolute top-1/2 left-3/4 w-5 h-5 text-pink-400/50 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-30">
        <LanguageSwitcher variant="outline" showLabel={true} />
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="space-y-4">
              {/* Logo with gradient */}
              <div className="relative">
                <CardTitle className="text-6xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wider">
                  AKILI
                </CardTitle>
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-lg -z-10"></div>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 px-4 py-2 rounded-full">
                <Gamepad2 className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">
                  Espace Enseignant
                </span>
              </div>
              
              <CardDescription className="text-lg font-medium text-gray-600">
                {t('auth.subtitle')}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-800">
                  {t('auth.email')}
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 bg-white/70"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold text-gray-800">
                  {t('auth.password')}
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 h-12 text-base border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 bg-white/70"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t('auth.loggingIn')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>{t('auth.signIn')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center pt-4">
              <Link 
                to="/forgot-password" 
                className="text-violet-600 hover:text-violet-700 font-medium underline transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/80 font-medium">
          {t('auth.secureEducator')}
        </p>
      </div>
    </div>
  );
}

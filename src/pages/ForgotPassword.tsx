
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/I18nContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulation d'appel API - à remplacer par l'API réelle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast.success(t('auth.resetLinkSent'), {
        description: t('auth.resetLinkSentDescription'),
        duration: 4000,
      });
    } catch (err) {
      toast.error(t('auth.resetLinkError'), {
        description: t('auth.resetLinkErrorDescription'),
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuccessStep = () => (
    <>
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="space-y-2">
          <CardTitle className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text tracking-wider drop-shadow-lg">
            AKILI
          </CardTitle>
          <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block border border-blue-200">
            Espace Enseignant
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl font-semibold text-gray-800">
                {t('auth.resetLinkSent')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {t('auth.resetLinkSentDescription')}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button 
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
        >
          <Link to="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('auth.backToLogin')}
          </Link>
        </Button>
      </CardContent>
    </>
  );

  const renderEmailStep = () => (
    <>
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="space-y-2">
          <CardTitle className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text tracking-wider drop-shadow-lg">
            AKILI
          </CardTitle>
          <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block border border-blue-200">
            Espace Enseignant
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {t('auth.resetPasswordTitle')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('auth.resetPasswordSubtitle')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              {t('auth.email')}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('auth.sendingResetLink')}
              </div>
            ) : (
              t('auth.sendResetLink')
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('auth.backToLogin')}
          </Link>
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Language switcher in top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher variant="outline" showLabel={true} />
      </div>

      {/* Professional background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        <Card className="bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
          {isSuccess ? renderSuccessStep() : renderEmailStep()}
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm">
            {t('auth.secureEducator')}
          </p>
        </div>
      </div>
    </div>
  );
}

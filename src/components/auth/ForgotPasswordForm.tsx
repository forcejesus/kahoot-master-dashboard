
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ForgotPasswordFormProps {
  onSuccess: () => void;
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulation d'appel API - à remplacer par l'API réelle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSuccess();
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

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
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
    </Card>
  );
}

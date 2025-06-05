
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export function ForgotPasswordSuccess() {
  const { t } = useTranslation();

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
    </Card>
  );
}

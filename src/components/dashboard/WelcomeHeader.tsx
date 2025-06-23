
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { BookOpen, Zap, GraduationCap, Sparkles } from 'lucide-react';

export function WelcomeHeader() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 18) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  const getFirstName = () => {
    if (user?.prenom) {
      return user.prenom.split(' ')[0];
    }
    return user?.name?.split(' ')[0] || t('dashboard.user');
  };

  return (
    <Card className="card-modern p-6 bg-gradient-to-r from-primary to-primary-600 text-white border-0 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-18 -translate-x-18 blur-xl"></div>
      
      {/* Floating icons */}
      <div className="absolute top-4 right-6 opacity-20">
        <GraduationCap className="w-16 h-16 animate-bounce-subtle" />
      </div>
      <div className="absolute bottom-4 right-12 opacity-15">
        <BookOpen className="w-12 h-12 animate-bounce-subtle" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-6 h-6 text-secondary-300" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-1 text-white">
                  {getGreeting()}
                </h1>
                <p className="text-primary-100 text-lg font-medium">
                  Bon retour {getFirstName()}
                </p>
              </div>
            </div>
            
            <div className="max-w-2xl">
              <p className="text-primary-100 text-base leading-relaxed">
                {t('dashboard.welcomeDescription')}
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center">
            <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <p className="text-primary-200 text-xs font-medium mb-1">{t('auth.title')}</p>
              <p className="text-white text-2xl font-bold tracking-wider">AKILI</p>
              <div className="mt-2 w-full h-1 bg-gradient-to-r from-secondary-400 to-secondary-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

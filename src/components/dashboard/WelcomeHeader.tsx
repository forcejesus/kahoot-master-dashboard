
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { BookOpen, Zap, GraduationCap, Sparkles, TrendingUp, Award } from 'lucide-react';

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
    <Card className="card-modern p-8 bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white border-0 overflow-hidden relative shadow-2xl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full translate-y-24 -translate-x-24 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      
      {/* Floating icons */}
      <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <GraduationCap className="w-20 h-20 animate-bounce-subtle" />
      </div>
      <div className="absolute bottom-6 right-16 opacity-15 group-hover:opacity-25 transition-opacity duration-700">
        <BookOpen className="w-14 h-14 animate-bounce-subtle" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 right-1/3 opacity-10 group-hover:opacity-20 transition-opacity duration-600">
        <Award className="w-10 h-10 animate-bounce-subtle" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex-1 space-y-6">
            {/* Main greeting section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-600 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white tracking-tight">
                  {getGreeting()}
                </h1>
                <p className="text-primary-100 text-xl font-semibold">
                  {t('dashboard.welcomeBack', { name: getFirstName() })}
                </p>
              </div>
            </div>
            
            {/* Enhanced description */}
            <div className="max-w-3xl space-y-3">
              <p className="text-primary-100 text-lg leading-relaxed font-medium">
                {t('dashboard.welcomeDescription')}
              </p>
              <div className="flex items-center gap-4 text-primary-200 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t('dashboard.trackProgress')}</span>
                </div>
                <div className="w-1 h-1 bg-primary-200 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('dashboard.engageLearners')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced brand section */}
          <div className="hidden lg:flex items-center">
            <div className="text-right bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl min-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <p className="text-primary-200 text-sm font-semibold">{t('auth.title')}</p>
              </div>
              <p className="text-white text-3xl font-bold tracking-wider mb-3">AKILI</p>
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-gradient-to-r from-secondary to-secondary-300 rounded-full shadow-sm"></div>
                <p className="text-primary-200 text-xs font-medium">{t('auth.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

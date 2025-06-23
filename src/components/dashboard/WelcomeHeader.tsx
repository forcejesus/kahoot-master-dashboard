
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { BookOpen, Zap, GraduationCap, Sparkles, TrendingUp, Award, Users, Target } from 'lucide-react';

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
    <Card className="card-modern p-8 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white border-0 overflow-hidden relative shadow-2xl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-40 translate-x-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400/20 rounded-full translate-y-30 -translate-x-30 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      
      {/* Floating icons */}
      <div className="absolute top-8 right-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <GraduationCap className="w-24 h-24 animate-bounce-subtle" />
      </div>
      <div className="absolute bottom-8 right-20 opacity-15 group-hover:opacity-25 transition-opacity duration-700">
        <BookOpen className="w-16 h-16 animate-bounce-subtle" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 right-1/3 opacity-10 group-hover:opacity-20 transition-opacity duration-600">
        <Award className="w-12 h-12 animate-bounce-subtle" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute top-20 left-20 opacity-15 group-hover:opacity-25 transition-opacity duration-800">
        <Users className="w-14 h-14 animate-bounce-subtle" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="absolute bottom-20 left-32 opacity-10 group-hover:opacity-20 transition-opacity duration-600">
        <Target className="w-10 h-10 animate-bounce-subtle" style={{ animationDelay: '2.5s' }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="flex-1 space-y-8">
            {/* Main greeting section */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl font-black mb-3 text-white tracking-tight leading-tight">
                  {getGreeting()}
                </h1>
                <p className="text-slate-200 text-2xl font-bold">
                  {t('dashboard.welcomeBack', { name: getFirstName() })}
                </p>
              </div>
            </div>
            
            {/* Enhanced description */}
            <div className="max-w-4xl space-y-4">
              <p className="text-slate-100 text-xl leading-relaxed font-medium">
                {t('dashboard.welcomeDescription')}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-slate-200 text-base">
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">{t('dashboard.trackProgress')}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">{t('dashboard.engageLearners')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced brand section */}
          <div className="hidden lg:flex items-center">
            <div className="text-right bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl min-w-[280px] transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <p className="text-slate-200 text-lg font-bold">{t('auth.title')}</p>
              </div>
              <p className="text-white text-4xl font-black tracking-wider mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                AKILI
              </p>
              <div className="space-y-3">
                <div className="w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg"></div>
                <p className="text-slate-200 text-sm font-semibold">{t('auth.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

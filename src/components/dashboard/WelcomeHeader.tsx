
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
    <Card className="mb-10 p-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-none shadow-2xl overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-36 -translate-x-36 blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
      
      {/* Decorative floating icons */}
      <div className="absolute top-8 right-8 opacity-20 animate-float">
        <GraduationCap className="w-24 h-24" />
      </div>
      <div className="absolute bottom-8 right-24 opacity-15 animate-pulse-slow">
        <BookOpen className="w-20 h-20" />
      </div>
      <div className="absolute top-1/2 right-12 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-16 h-16" />
      </div>
      
      <div className="relative z-10 p-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/10 shadow-lg">
                <Zap className="w-10 h-10 text-yellow-300" />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  {getGreeting()}
                </h1>
                <p className="text-indigo-100 text-2xl font-semibold tracking-wide">
                  Bon retour {getFirstName()}
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl">
              <p className="text-white/90 text-lg leading-relaxed font-medium">
                {t('dashboard.welcomeDescription')}
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center">
            <div className="text-right p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
              <p className="text-indigo-200 text-sm font-semibold mb-1">{t('auth.title')}</p>
              <p className="text-white text-4xl font-black tracking-wider drop-shadow-lg">AKILI</p>
              <div className="mt-2 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

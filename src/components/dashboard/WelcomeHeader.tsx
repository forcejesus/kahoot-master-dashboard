
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { BookOpen, Zap, GraduationCap } from 'lucide-react';

export function WelcomeHeader() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 18) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  return (
    <Card className="mb-8 p-8 bg-gradient-to-r from-slate-600 via-teal-600 to-blue-600 text-white border-none shadow-xl overflow-hidden relative">
      {/* Effets de fond paisibles */}
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 blur-2xl"></div>
      
      {/* Icônes décoratives douces */}
      <div className="absolute top-6 right-6 opacity-15">
        <GraduationCap className="w-20 h-20" />
      </div>
      <div className="absolute bottom-6 right-20 opacity-10">
        <BookOpen className="w-16 h-16" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
            <p className="text-teal-100 text-xl font-medium">
              {t('dashboard.welcomeBack', { name: user?.name || t('dashboard.user') })}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-slate-100 text-lg leading-relaxed max-w-2xl">
            {t('dashboard.welcomeDescription')}
          </p>
          
          <div className="hidden md:flex items-center justify-end">
            <div className="text-right">
              <p className="text-teal-200 text-sm font-medium">{t('auth.title')}</p>
              <p className="text-white text-2xl font-bold">AKILI</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

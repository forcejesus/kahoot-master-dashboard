
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { Sparkles, BookOpen } from 'lucide-react';

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
    <Card className="mb-8 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-none shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <BookOpen className="w-32 h-32" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{getGreeting()}</h1>
            <p className="text-blue-100 text-lg">
              {t('dashboard.welcomeBack', { name: user?.nom || t('dashboard.user') })}
            </p>
          </div>
        </div>
        <p className="text-blue-100 max-w-2xl">
          {t('dashboard.welcomeDescription')}
        </p>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    </Card>
  );
}

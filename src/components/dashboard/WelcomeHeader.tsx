
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

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
    <Card className="p-8 bg-white border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {getGreeting()}
              </h1>
              <p className="text-gray-600 text-lg">
                Bon retour {getFirstName()}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 text-base max-w-2xl">
            {t('dashboard.welcomeDescription')}
          </p>
        </div>
        
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Performance</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">AKILI</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

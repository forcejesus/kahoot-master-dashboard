
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { CreateGameCard } from './CreateGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { BookOpen, Users, Clock } from 'lucide-react';

interface StatsSectionProps {
  onKahootCreated: () => void;
  kahoots?: any[];
}

export function StatsSection({ onKahootCreated, kahoots = [] }: StatsSectionProps) {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalKahoots = kahoots.length;
  const sessionsFromKahoots = kahoots.reduce((total: number, kahoot: any) => 
    total + (kahoot.planifications?.length || 0), 0
  );

  const fetchApprenants = async () => {
    try {
      const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);
    } catch (error) {
      console.error("Error fetching apprenants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprenants();
  }, [token]);

  useEffect(() => {
    setTotalSessions(sessionsFromKahoots);
  }, [sessionsFromKahoots]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title={t('dashboard.totalKahoots')} 
        value={totalKahoots} 
        icon={BookOpen}
        isLoading={false}
        gradient="from-emerald-500 to-teal-600"
      />
      
      <StatCard 
        title={t('dashboard.totalLearners')} 
        value={totalApprenants} 
        icon={Users}
        isLoading={isLoading}
        gradient="from-blue-500 to-cyan-600"
      />

      <StatCard 
        title={t('dashboard.totalSessions')} 
        value={totalSessions} 
        icon={Clock}
        isLoading={false}
        gradient="from-orange-500 to-red-500"
      />

      <CreateGameCard />
    </div>
  );
}

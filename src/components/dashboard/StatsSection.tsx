import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { CreateGameCard } from './CreateGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { BookOpen, Users, Clock } from 'lucide-react';

interface StatsSectionProps {
  onKahootCreated: () => void;
}

export function StatsSection({ onKahootCreated }: StatsSectionProps) {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [kahoots, setKahoots] = useState([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const kahootsResponse = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();
      setKahoots(kahootsData.data);

      // Calculate additional stats
      const sessions = kahootsData.data.reduce((total: number, kahoot: any) => 
        total + (kahoot.planifications?.length || 0), 0
      );
      setTotalSessions(sessions);

      const participants = kahootsData.data.reduce((total: number, kahoot: any) => 
        total + (kahoot.planifications?.reduce((sum: number, p: any) => 
          sum + (p.participants?.length || 0), 0) || 0), 0
      );
      setTotalParticipants(participants);

      const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard 
        title={t('dashboard.totalKahoots')} 
        value={kahoots.length} 
        icon={BookOpen}
        isLoading={isLoading}
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
        isLoading={isLoading}
        gradient="from-orange-500 to-red-500"
      />

      <CreateGameCard />
    </div>
  );
}

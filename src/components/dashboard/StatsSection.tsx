
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, TrendingUp, Clock } from 'lucide-react';

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
        gradient="from-blue-500 to-blue-600"
      />
      
      <StatCard 
        title={t('dashboard.totalLearners')} 
        value={totalApprenants} 
        icon={Users}
        isLoading={isLoading}
        gradient="from-emerald-500 to-emerald-600"
      />

      <StatCard 
        title={t('dashboard.totalSessions')} 
        value={totalSessions} 
        icon={Clock}
        isLoading={isLoading}
        gradient="from-purple-500 to-purple-600"
      />

      <Card className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white border-none shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/10"></div>
        <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="mb-4 p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-8 h-8" />
          </div>
          <CreateKahootDialog onSuccess={onKahootCreated} />
        </CardContent>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      </Card>
    </div>
  );
}

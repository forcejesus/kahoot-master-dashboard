
import { useState, useEffect } from 'react';
import { TeacherStatsCard } from './TeacherStatsCard';
import { CreateGameCard } from './CreateGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { BookOpen, Users, Clock, Trophy, Target, Calendar } from 'lucide-react';

interface EnhancedStatsSectionProps {
  onKahootCreated: () => void;
  kahoots?: any[];
}

export function EnhancedStatsSection({ onKahootCreated, kahoots = [] }: EnhancedStatsSectionProps) {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [activeGames, setActiveGames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalKahoots = kahoots.length;
  const sessionsFromKahoots = kahoots.reduce((total: number, kahoot: any) => 
    total + (kahoot.planifications?.length || 0), 0
  );

  const fetchStats = async () => {
    try {
      const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);

      // Calculer les autres statistiques
      const activeGamesCount = kahoots.filter(game => 
        game.planifications && game.planifications.length > 0
      ).length;
      setActiveGames(activeGamesCount);

      // Simuler un score moyen (à remplacer par de vraies données)
      setAverageScore(Math.floor(Math.random() * 20) + 75);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token, kahoots]);

  useEffect(() => {
    setTotalSessions(sessionsFromKahoots);
  }, [sessionsFromKahoots]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <TeacherStatsCard 
        title="Mes Quiz" 
        value={totalKahoots} 
        icon={BookOpen}
        isLoading={false}
        gradient="from-emerald-500 to-teal-600"
        change="+12%"
        changeType="positive"
      />
      
      <TeacherStatsCard 
        title="Apprenants Actifs" 
        value={totalApprenants} 
        icon={Users}
        isLoading={isLoading}
        gradient="from-blue-500 to-cyan-600"
        change="+8%"
        changeType="positive"
      />

      <TeacherStatsCard 
        title="Sessions Programmées" 
        value={totalSessions} 
        icon={Clock}
        isLoading={false}
        gradient="from-orange-500 to-red-500"
        change="+5%"
        changeType="positive"
      />

      <TeacherStatsCard 
        title="Quiz Actifs" 
        value={activeGames} 
        icon={Target}
        isLoading={false}
        gradient="from-purple-500 to-pink-500"
        change="+15%"
        changeType="positive"
      />

      <TeacherStatsCard 
        title="Score Moyen" 
        value={`${averageScore}%`} 
        icon={Trophy}
        isLoading={isLoading}
        gradient="from-yellow-500 to-orange-500"
        change="+3%"
        changeType="positive"
      />

      <CreateGameCard />
    </div>
  );
}

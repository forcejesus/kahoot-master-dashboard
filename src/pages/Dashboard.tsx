
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ModernStatsCard } from '@/components/dashboard/ModernStatsCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Users, GraduationCap, Gamepad, Calendar } from 'lucide-react';
import { buildApiUrl } from '@/config/hosts';

interface StatsData {
  total_apprenants: number;
  total_enseignants: number;
  total_jeux: number;
  total_planifications: number;
}

export default function Dashboard() {
  const { token } = useAuth();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [stats, setStats] = useState<StatsData>({
    total_apprenants: 0,
    total_enseignants: 0,
    total_jeux: 0,
    total_planifications: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/jeux'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setKahoots(data.data);
    } catch (error) {
      console.error('Error fetching kahoots:', error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch kahoots count
      const kahootsResponse = await fetch(buildApiUrl('/api/jeux'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();

      // Fetch apprenants count
      const apprenantsResponse = await fetch(buildApiUrl('/api/apprenant'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantsData = await apprenantsResponse.json();

      setStats({
        total_jeux: kahootsData.data?.length || 0,
        total_apprenants: apprenantsData.data?.length || 0,
        total_enseignants: 1, // Current user
        total_planifications: 0 // Placeholder
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [token]);

  const handleDeleteKahoots = async (kahootIds: string[]) => {
    try {
      for (const id of kahootIds) {
        await fetch(buildApiUrl(`/api/jeux/delete/${id}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      toast.success(`${kahootIds.length} kahoot(s) supprimé(s)`);
      fetchData();
      fetchStats();
    } catch (error) {
      console.error('Error deleting kahoots:', error);
      toast.error("Erreur lors de la suppression");
      throw error;
    }
  };

  const statsConfig = [
    {
      title: "Jeux créés",
      value: stats.total_jeux,
      icon: Gamepad,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      change: "+12%"
    },
    {
      title: "Planifications",
      value: stats.total_planifications,
      icon: Calendar,
      bgColor: "bg-violet-100", 
      textColor: "text-violet-600",
      change: "+8%"
    },
    {
      title: "Enseignants",
      value: stats.total_enseignants,
      icon: GraduationCap,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      change: "Stable"
    },
    {
      title: "Apprenants",
      value: stats.total_apprenants,
      icon: Users,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      change: "+25%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statsConfig.map((stat, index) => (
            <ModernStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              bgColor={stat.bgColor}
              textColor={stat.textColor}
              change={stat.change}
              isLoading={statsLoading}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Actions rapides
          </h2>
          <QuickActions />
        </div>

        {/* Kahoots List */}
        <KahootList 
          kahoots={kahoots} 
          isLoading={isLoading} 
          onDelete={handleDeleteKahoots} 
        />
      </main>
    </div>
  );
}

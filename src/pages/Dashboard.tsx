import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { ModernStatsCard } from '@/components/dashboard/ModernStatsCard';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Users, Gamepad, Calendar } from 'lucide-react';
import { buildApiUrl } from '@/config/api';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

interface StatsData {
  total_apprenants: number;
  total_jeux: number;
  total_planifications: number;
}

export default function Dashboard() {
  const { token } = useAuth();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [stats, setStats] = useState<StatsData>({
    total_apprenants: 0,
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

      // Fetch planifications count
      const planificationsResponse = await fetch(buildApiUrl('/api/planification'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const planificationsData = await planificationsResponse.json();

      setStats({
        total_jeux: kahootsData.data?.length || 0,
        total_apprenants: apprenantsData.data?.length || 0,
        total_planifications: planificationsData.data?.length || 0
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
        console.log(`Attempting to delete kahoot with ID: ${id}`);
        
        const response = await fetch(buildApiUrl(`/api/jeux/delete/${id}`), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`Delete response status: ${response.status}`);
        console.log(`Delete response ok: ${response.ok}`);
        
        // Lire la réponse pour déboguer
        const responseText = await response.text();
        console.log(`Delete response body: ${responseText}`);
        
        if (!response.ok) {
          // Essayer de parser la réponse pour obtenir plus d'informations
          let errorMessage = `HTTP ${response.status}`;
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (e) {
            errorMessage = responseText || errorMessage;
          }
          throw new Error(`Failed to delete kahoot ${id}: ${errorMessage}`);
        }
      }
      toast.success(`${kahootIds.length} kahoot(s) supprimé(s)`);
      fetchData();
      fetchStats();
    } catch (error) {
      console.error('Error deleting kahoots:', error);
      toast.error(`Erreur lors de la suppression: ${error.message || error}`);
      throw error;
    }
  };

  const handleGameCreated = () => {
    fetchData();
    fetchStats();
  };

  const handlePlanificationCreated = () => {
    fetchStats();
  };

  const statsConfig = [
    {
      title: "Total Jeux",
      value: stats.total_jeux,
      icon: Gamepad,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      change: "+12%"
    },
    {
      title: "Total Planifications",
      value: stats.total_planifications,
      icon: Calendar,
      bgColor: "bg-violet-100", 
      textColor: "text-violet-600",
      change: "+8%"
    },
    {
      title: "Total Apprenants",
      value: stats.total_apprenants,
      icon: Users,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      change: "+25%"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50/30 via-white to-green-50/20">
        <div className="flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <AppHeader 
              kahoots={kahoots}
              onGameCreated={handleGameCreated}
              onPlanificationCreated={handlePlanificationCreated}
            />
            
            <main className="flex-1 p-6 space-y-8">
              {/* Greeting Card */}
              <div className="bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white p-8 rounded-3xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Gamepad className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Bienvenue sur AKILI! 👋
                    </h2>
                    <p className="text-orange-100 text-lg">
                      Créez, gérez et analysez vos expériences éducatives interactives
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Kahoots List */}
              <KahootList 
                kahoots={kahoots} 
                isLoading={isLoading} 
                onDelete={handleDeleteKahoots} 
              />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

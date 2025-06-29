import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { ModernStatsCard } from '@/components/dashboard/ModernStatsCard';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Users, Gamepad, Calendar, Sparkles, Star, BookOpen } from 'lucide-react';
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

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [token]);

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
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      textColor: "text-purple-700",
      change: "+12%"
    },
    {
      title: "Total Planifications",
      value: stats.total_planifications,
      icon: Calendar,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200", 
      textColor: "text-blue-700",
      change: "+8%"
    },
    {
      title: "Total Apprenants",
      value: stats.total_apprenants,
      icon: Users,
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      textColor: "text-green-700",
      change: "+25%"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-cyan-50/40 relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-32 w-48 h-48 bg-blue-200/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <Star className="absolute top-1/4 right-1/4 w-8 h-8 text-yellow-300/40 animate-pulse" />
          <Sparkles className="absolute bottom-1/4 left-1/4 w-6 h-6 text-pink-300/40 animate-pulse delay-700" />
          <BookOpen className="absolute top-1/2 left-1/5 w-7 h-7 text-purple-300/30 animate-pulse delay-300" />
        </div>

        <div className="flex w-full relative z-10">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <AppHeader 
              kahoots={kahoots}
              onGameCreated={handleGameCreated}
              onPlanificationCreated={handlePlanificationCreated}
            />
            
            <main className="flex-1 p-8 space-y-8">
              {/* Greeting Card améliorée */}
              <div className="relative animate-slide-down">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90 rounded-3xl transform rotate-1 scale-105 opacity-20"></div>
                <div className="relative bg-gradient-to-r from-purple-500/95 to-blue-500/95 text-white p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                        <Gamepad className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <Sparkles className="h-4 w-4 text-yellow-800" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white mb-3 flex items-center space-x-3">
                        <span>Bienvenue sur AKILI!</span>
                        <span className="text-3xl animate-bounce">👋</span>
                      </h2>
                      <p className="text-blue-100 text-xl font-medium">
                        🎯 Créez, gérez et analysez vos expériences éducatives interactives
                      </p>
                    </div>
                  </div>
                  
                  {/* Éléments décoratifs */}
                  <div className="absolute top-4 right-8 opacity-30">
                    <Star className="h-6 w-6 text-yellow-200 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 right-12 opacity-40">
                    <BookOpen className="h-5 w-5 text-cyan-200 animate-pulse delay-500" />
                  </div>
                </div>
              </div>

              {/* Statistics Cards avec animation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                {statsConfig.map((stat, index) => (
                  <div key={index} className="transform hover:scale-105 transition-all duration-300">
                    <ModernStatsCard
                      title={stat.title}
                      value={stat.value}
                      icon={stat.icon}
                      bgColor={stat.bgColor}
                      textColor={stat.textColor}
                      change={stat.change}
                      isLoading={statsLoading}
                    />
                  </div>
                ))}
              </div>

              {/* Kahoots List avec animation */}
              <div className="animate-slide-up">
                <KahootList 
                  kahoots={kahoots} 
                  isLoading={isLoading} 
                  onDelete={handleDeleteKahoots} 
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

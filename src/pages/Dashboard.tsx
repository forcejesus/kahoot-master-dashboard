import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { ModernStatsCard } from '@/components/dashboard/ModernStatsCard';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Users, Gamepad, Calendar, Sparkles, Star, BookOpen, Plus, Eye, Play } from 'lucide-react';
import { buildApiUrl } from '@/config/api';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreateGameModal } from '@/components/dashboard/CreateGameModal';
import { ScheduleGameModal } from '@/components/dashboard/ScheduleGameModal';
import { useNavigate } from 'react-router-dom';

interface StatsData {
  total_apprenants: number;
  total_jeux: number;
  total_planifications: number;
}

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [stats, setStats] = useState<StatsData>({
    total_apprenants: 0,
    total_jeux: 0,
    total_planifications: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [isScheduleGameOpen, setIsScheduleGameOpen] = useState(false);

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
    setIsCreateGameOpen(false);
  };

  const handlePlanificationCreated = () => {
    fetchStats();
    setIsScheduleGameOpen(false);
  };

  // Quick actions configuration
  const quickActions = [
    {
      title: "Voir les résultats d'une session de jeux",
      icon: Eye,
      onClick: () => navigate('/planifications'),
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Créer une session de jeux",
      icon: Plus,
      onClick: () => setIsScheduleGameOpen(true),
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Créer un nouveau jeu",
      icon: Gamepad,
      onClick: () => setIsCreateGameOpen(true),
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-cyan-50/40 relative overflow-hidden">
        {/* Background decorative elements */}
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
              {/* Navigation Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-down">
                <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Gamepad className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">{stats.total_jeux}</h3>
                    <p className="text-purple-600 font-semibold">Mes Jeux</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-700 mb-2">{stats.total_planifications}</h3>
                    <p className="text-blue-600 font-semibold">Planifications</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">{stats.total_apprenants}</h3>
                    <p className="text-green-600 font-semibold">Apprenants</p>
                  </CardContent>
                </Card>
              </div>

              {/* Actions rapides */}
              <div className="animate-slide-up">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                    <span>Actions rapides</span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.onClick}
                      className={`${action.bgColor} ${action.hoverColor} text-white p-6 h-auto flex flex-col items-center space-y-3 shadow-lg rounded-2xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    >
                      <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-center font-semibold text-sm leading-tight">
                        {action.title}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Section des jeux récemment créés */}
              <div className="animate-slide-up delay-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                      <Star className="h-6 w-6 text-orange-500" />
                      <span>Jeux récemment créés</span>
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">Filtre et barre de recherche</h3>
                    <p className="text-sm text-gray-500">Recherchez et filtrez vos jeux</p>
                  </div>
                </div>

                <KahootList 
                  kahoots={kahoots} 
                  isLoading={isLoading} 
                  onDelete={handleDeleteKahoots} 
                />
              </div>
            </main>
          </div>
        </div>

        {/* Modals */}
        <CreateGameModal 
          isOpen={isCreateGameOpen}
          onOpenChange={setIsCreateGameOpen}
          onSuccess={handleGameCreated}
        />
        <ScheduleGameModal 
          kahoots={kahoots}
          isOpen={isScheduleGameOpen}
          onOpenChange={setIsScheduleGameOpen}
          onSuccess={handlePlanificationCreated}
        />
      </div>
    </SidebarProvider>
  );
}

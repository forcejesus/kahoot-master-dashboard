import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Plus, Eye, Gamepad2, Calendar, Sparkles } from 'lucide-react';
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

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <div className="flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <AppHeader 
              kahoots={kahoots}
              onGameCreated={handleGameCreated}
              onPlanificationCreated={handlePlanificationCreated}
            />
            
            <main className="flex-1 p-6 space-y-8">
              {/* Hero Section avec actions principales */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <Plus className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Créer un nouveau jeu</h2>
                      <p className="text-gray-600">Concevez vos expériences éducatives</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Planifier une session</h2>
                    <p className="text-gray-600">Organisez vos sessions de jeu</p>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => navigate('/planifications')}
                    className="h-20 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center space-x-3 text-base font-semibold"
                  >
                    <Eye className="w-6 h-6" />
                    <span>Voir les résultats d'une session de jeux</span>
                  </Button>
                  
                  <Button
                    onClick={() => setIsScheduleGameOpen(true)}
                    className="h-20 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center space-x-3 text-base font-semibold"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Créer une session de jeux</span>
                  </Button>
                  
                  <Button
                    onClick={() => setIsCreateGameOpen(true)}
                    className="h-20 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl flex items-center justify-center space-x-3 text-base font-semibold"
                  >
                    <Gamepad2 className="w-6 h-6" />
                    <span>Créer un nouveau jeu</span>
                  </Button>
                </div>
              </div>

              {/* Section des jeux récemment créés */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Jeux récemment créés</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Filtre et barre de recherche</p>
                    <p className="text-xs text-gray-500">Recherchez et filtrez vos jeux</p>
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

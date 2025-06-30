import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { KahootList } from '@/components/dashboard/KahootList';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { Plus, Eye, Gamepad2, Calendar, Sparkles, Users, BookOpen, Trophy, Star } from 'lucide-react';
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
      const kahootsResponse = await fetch(buildApiUrl('/api/jeux'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();

      const apprenantsResponse = await fetch(buildApiUrl('/api/apprenant'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantsData = await apprenantsResponse.json();

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
        
        const responseText = await response.text();
        console.log(`Delete response body: ${responseText}`);
        
        if (!response.ok) {
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
              {/* Section Bannière principale */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/30 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Créez des expériences extraordinaires</h1>
                      <p className="text-orange-100 text-lg">avec AKILI</p>
                      <p className="text-orange-50 text-sm mt-2">Transformez l'apprentissage en aventure interactive</p>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setIsCreateGameOpen(true)}
                    className="mt-6 bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl"
                  >
                    Commencer maintenant
                  </Button>
                </div>
              </div>

              {/* Section Démarrage rapide */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Démarrage rapide</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Créer avec IA */}
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-0" onClick={() => setIsCreateGameOpen(true)}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Créer avec IA</h3>
                      <p className="text-sm text-gray-600">Créez des jeux en un clin d'œil grâce au générateur de questions assisté par IA.</p>
                    </CardContent>
                  </Card>

                  {/* Fête d'anniversaire */}
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-0">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fête d'anniversaire</h3>
                      <p className="text-sm text-gray-600">Rendez les anniversaires encore plus amusants et mémorables avec un modèle prêt à l'emploi.</p>
                    </CardContent>
                  </Card>

                  {/* Jeux de soirée en famille */}
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-0">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Jeux de soirée en famille</h3>
                      <p className="text-sm text-gray-600">Organisez une soirée quiz avec des jeux prêts à l'emploi pour toute la famille.</p>
                    </CardContent>
                  </Card>

                  {/* Jeux pour enfants */}
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Jeux pour enfants</h3>
                      <p className="text-sm text-gray-600">Surprenez vos élèves avec du contenu éducatif engageant pour les jeunes apprenants.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Section Actions principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Créer */}
                <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setIsCreateGameOpen(true)}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Plus className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Créer</h3>
                        <p className="text-red-100">Créez rapidement du contenu engageant</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Découvrir */}
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => navigate('/library')}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Découvrir</h3>
                        <p className="text-green-100">Trouvez de l'inspiration instantanément</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section Mes jeux récents */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Mes jeux récents</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/games')}
                    className="hover:bg-orange-50 hover:border-orange-300"
                  >
                    Voir tous mes jeux
                  </Button>
                </div>

                <KahootList 
                  kahoots={kahoots.slice(0, 6)} 
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

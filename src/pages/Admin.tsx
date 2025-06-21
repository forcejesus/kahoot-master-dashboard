
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Users, 
  GamepadIcon, 
  Calendar, 
  TrendingUp, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminGamesList } from '@/components/admin/AdminGamesList';
import { AdminUsersList } from '@/components/admin/AdminUsersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Admin() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalUsers: 0,
    activeSessions: 0,
    totalParticipants: 0,
    growthRate: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      // Simuler des données d'administration - à remplacer par de vrais appels API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalGames: 45,
        totalUsers: 1250,
        activeSessions: 12,
        totalParticipants: 3500,
        growthRate: 15.3
      });
      
      toast.success('Données administrateur chargées avec succès');
    } catch (error) {
      console.error('Erreur lors du chargement des données admin:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    toast.success('Export des données en cours...');
    // Logique d'export ici
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du tableau de bord...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header avec actions */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Tableau de Bord Administrateur
              </h1>
              <p className="text-slate-600">
                Gérez votre plateforme et surveillez les performances
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={fetchAdminData}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </Button>
              <Button
                onClick={handleExportData}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Exporter les données
              </Button>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher des jeux, utilisateurs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Statistiques principales */}
        <AdminStats stats={stats} />

        {/* Contenu principal avec onglets */}
        <div className="mt-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="games" className="gap-2">
                <GamepadIcon className="w-4 h-4" />
                Jeux
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <PieChart className="w-4 h-4" />
                Analytiques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Activité récente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">Nouveau jeu créé</p>
                          <p className="text-sm text-gray-600">Quiz JavaScript - il y a 2h</p>
                        </div>
                        <Badge variant="outline">Nouveau</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">Session terminée</p>
                          <p className="text-sm text-gray-600">Quiz React - 25 participants</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Terminé</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Tendances
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Participation moyenne</span>
                        <span className="font-bold text-green-600">+23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Nouveaux utilisateurs</span>
                        <span className="font-bold text-blue-600">+15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Jeux créés</span>
                        <span className="font-bold text-purple-600">+8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="games" className="mt-6">
              <AdminGamesList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <AdminUsersList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyses détaillées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-gray-500">
                    Graphiques et analyses détaillées à venir...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

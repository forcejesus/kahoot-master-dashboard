
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';

interface Kahoot {
  _id: string;
  titre: string;
  questions?: {
    libelle: string;
    reponses: string[];
    reponse_correcte: string;
  }[];
  planifications?: {
    _id: string;
    pin: string;
    participants: {
      apprenant: string;
      score: number;
    }[];
  }[];
}

interface StatsResponse {
  success: boolean;
  message: string;
  data: any[];
}

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const kahootsResponse = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();
      setKahoots(kahootsData.data);

      const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);
    } catch (error) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleKahootClick = (kahoot: Kahoot) => {
    navigate(`/game/${kahoot._id}`, { state: { jeu: kahoot } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 border-t border-white/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Total des Kahoots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">
                {isLoading ? "..." : kahoots.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 border-t border-white/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Total des Apprenants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">
                {isLoading ? "..." : totalApprenants}
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-none">
            <CardContent className="flex items-center justify-center h-full p-8">
              <CreateKahootDialog onSuccess={fetchData} />
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mes Kahoots
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Chargement...</div>
            ) : kahoots.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Aucun kahoot créé pour le moment
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 text-primary font-bold">Titre</th>
                      <th className="text-center py-4 px-6 text-primary font-bold">Questions</th>
                      <th className="text-center py-4 px-6 text-primary font-bold">Sessions</th>
                      <th className="text-center py-4 px-6 text-primary font-bold">Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kahoots.map((kahoot) => (
                      <tr 
                        key={kahoot._id} 
                        className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        onClick={() => handleKahootClick(kahoot)}
                      >
                        <td className="py-4 px-6">
                          <div className="font-medium text-left flex items-center text-primary">
                            {kahoot.titre}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {kahoot.questions?.length || 0}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {kahoot.planifications?.length || 0}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Jeu {
  _id: string;
  titre: string;
}

interface StatsResponse {
  success: boolean;
  message: string;
  data: any[];
}

export default function Dashboard() {
  const { token } = useAuth();
  const [jeux, setJeux] = useState<Jeu[]>([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch games
        const jeuxResponse = await fetch('http://kahoot.nos-apps.com/api/jeux', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const jeuxData: StatsResponse = await jeuxResponse.json();
        setJeux(jeuxData.data);

        // Fetch students
        const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const apprenantData: StatsResponse = await apprenantResponse.json();
        setTotalApprenants(apprenantData.data.length);
      } catch (error) {
        toast.error("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Total des Jeux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {isLoading ? "..." : jeux.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Total des Apprenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {isLoading ? "..." : totalApprenants}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-white">
            <CardContent className="flex items-center justify-center h-full">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full text-lg h-16"
                onClick={() => toast.info("Fonctionnalité à venir")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Créer un Kahoot
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-slide">
          <CardHeader>
            <CardTitle>Mes Jeux</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : jeux.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun jeu créé pour le moment
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Titre</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jeux.map((jeu) => (
                      <tr key={jeu._id} className="border-b last:border-0">
                        <td className="py-3 px-4">{jeu.titre}</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-2"
                            onClick={() => toast.info("Fonctionnalité à venir")}
                          >
                            Planifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-2"
                            onClick={() => toast.info("Fonctionnalité à venir")}
                          >
                            Modifier
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => toast.info("Fonctionnalité à venir")}
                          >
                            Supprimer
                          </Button>
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

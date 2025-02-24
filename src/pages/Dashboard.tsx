
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
        const jeuxResponse = await fetch('http://kahoot.nos-apps.com/api/jeux', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const jeuxData: StatsResponse = await jeuxResponse.json();
        setJeux(jeuxData.data);

        const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
          headers: { 'Authorization': `Bearer ${token}` }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 border-t border-white/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Total des Jeux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">
                {isLoading ? "..." : jeux.length}
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
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full text-lg h-20 bg-white text-primary hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] shadow-xl"
                onClick={() => toast.info("Fonctionnalité à venir")}
              >
                <Plus className="mr-2 h-6 w-6" />
                Créer un Kahoot
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mes Jeux
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Chargement...</div>
            ) : jeux.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Aucun jeu créé pour le moment
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 text-primary font-bold">Titre</th>
                      <th className="text-right py-4 px-6 text-primary font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jeux.map((jeu) => (
                      <tr key={jeu._id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium">{jeu.titre}</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="hover:bg-primary hover:text-white transition-all duration-200"
                            onClick={() => toast.info("Fonctionnalité à venir")}
                          >
                            Planifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="hover:bg-secondary hover:text-white transition-all duration-200"
                            onClick={() => toast.info("Fonctionnalité à venir")}
                          >
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-red-500 hover:text-white transition-all duration-200 border-red-500/20"
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

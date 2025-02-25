
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Jeu {
  _id: string;
  titre: string;
  questions?: {
    libelle: string;
    reponses: string[];
    reponse_correcte: string;
  }[];
}

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [jeu, setJeu] = useState<Jeu | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setJeu(data.data);
        } else {
          toast.error("Impossible de charger les détails du jeu");
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des détails");
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-white/50"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au tableau de bord
        </Button>

        {isLoading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : jeu ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {jeu.titre}
              </h1>
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  className="hover:bg-primary hover:text-white transition-all duration-200"
                  onClick={() => toast.info("Fonctionnalité à venir")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Planifier une session
                </Button>
                <Button 
                  variant="outline"
                  className="hover:bg-secondary hover:text-white transition-all duration-200"
                  onClick={() => toast.info("Fonctionnalité à venir")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Voir les résultats
                </Button>
              </div>
            </div>

            <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                {jeu.questions && jeu.questions.length > 0 ? (
                  <div className="space-y-6">
                    {jeu.questions.map((question, index) => (
                      <Card key={index} className="border border-gray-100">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Question {index + 1}: {question.libelle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {question.reponses.map((reponse, rIndex) => (
                              <div
                                key={rIndex}
                                className={`p-4 rounded-lg ${
                                  reponse === question.reponse_correcte
                                    ? 'bg-green-100 border-green-200'
                                    : 'bg-gray-50 border-gray-100'
                                } border transition-colors`}
                              >
                                {reponse}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune question n'a encore été ajoutée à ce jeu.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Jeu non trouvé
          </div>
        )}
      </main>
    </div>
  );
}

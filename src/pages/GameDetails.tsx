
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Users, Copy, Trophy, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Planification {
  _id: string;
  pin: string;
  date_fin: string;
  limite_participation: number;
  total_participants: number;
  participants_actifs: number;
  meilleur_score?: {
    apprenant: string;
    score: number;
  };
}

interface Jeu {
  _id: string;
  titre: string;
  planifications?: Planification[];
  questions?: {
    libelle: string;
    reponses: string[];
    reponse_correcte: string;
  }[];
  stats?: {
    total_planifications: number;
    planifications_en_cours: number;
    total_apprenants: number;
    apprenants_actifs: number;
  };
}

export default function GameDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const jeu = location.state?.jeu as Jeu;

  if (!jeu) {
    navigate('/dashboard');
    return null;
  }

  const planificationsEnCours = jeu.planifications?.filter(p => 
    new Date(p.date_fin) > new Date()
  ) || [];

  const handleCopyPin = (pin: string) => {
    navigator.clipboard.writeText(pin);
    toast.success("PIN copié !");
  };

  const handleDeleteGame = async () => {
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${jeu._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      toast.success("Jeu supprimé avec succès");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Erreur lors de la suppression du jeu");
    }
  };

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Cela supprimera définitivement le jeu
                      et toutes ses données associées.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteGame}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Planifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{jeu.stats?.total_planifications || 0}</div>
                  <div className="text-sm text-muted-foreground">
                    {jeu.stats?.planifications_en_cours || 0} en cours
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Apprenants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{jeu.stats?.total_apprenants || 0}</div>
                  <div className="text-sm text-muted-foreground">
                    {jeu.stats?.apprenants_actifs || 0} ont participé
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Sessions en cours</CardTitle>
              </CardHeader>
              <CardContent>
                {planificationsEnCours.length > 0 ? (
                  <div className="space-y-4">
                    {planificationsEnCours.map((planif) => (
                      <div key={planif._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">PIN:</span>
                            <code className="bg-gray-100 px-2 py-1 rounded">{planif.pin}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyPin(planif.pin)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations
                          </div>
                          {planif.meilleur_score && (
                            <div className="flex items-center text-sm text-yellow-600">
                              <Trophy className="h-4 w-4 mr-1" />
                              Meilleur score: {planif.meilleur_score.apprenant} ({planif.meilleur_score.score} pts)
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {planif.participants_actifs}/{planif.total_participants} participants
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Fin le {new Date(planif.date_fin).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    Aucune session en cours
                  </div>
                )}
              </CardContent>
            </Card>
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
      </main>
    </div>
  );
}

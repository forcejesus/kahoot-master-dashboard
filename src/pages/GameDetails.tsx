
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, List, PlayCircle, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { GameHeader } from '@/components/game/details/GameHeader';
import { GameStats } from '@/components/game/details/GameStats';
import { QuestionsDisplay } from '@/components/game/details/QuestionsDisplay';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GameDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const initialJeu = location.state?.jeu as Kahoot;
  const [jeu, setJeu] = useState<Kahoot | null>(initialJeu);

  // Fonction pour rafraîchir les détails du jeu
  const refreshGameDetails = async () => {
    if (!jeu) return;
    
    try {
      // Utilisation de l'endpoint direct avec l'ID du jeu
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${jeu._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des détails du jeu');
      }

      const data = await response.json();
      
      if (data.data) {
        setJeu(data.data);
      } else {
        toast.error("Jeu non trouvé");
      }
    } catch (error) {
      toast.error("Erreur lors du rafraîchissement des données");
    }
  };

  // Récupérer les détails initiaux si nous n'avons pas de state
  useEffect(() => {
    if (!jeu) {
      navigate('/dashboard');
    }
  }, [jeu, navigate]);

  if (!jeu) {
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
      
      <div className="relative">
        {/* Background Image Section */}
        <div className="absolute inset-0 h-[400px] overflow-hidden">
          {jeu.image ? (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ 
                  backgroundImage: `url(http://kahoot.nos-apps.com/${jeu.image})`,
                  filter: 'blur(2px)',
                  transform: 'scale(1.1)' 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50 z-1" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-50" />
          )}
        </div>

        {/* Content Section */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="navigation"
            className="mb-6"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>

          <div className="space-y-8 animate-fade-in">
            <GameHeader 
              jeu={jeu} 
              token={token} 
              onDelete={handleDeleteGame} 
              onRefresh={refreshGameDetails} 
            />

            {/* Tabbed interface for game statistics */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-6 bg-white/80 backdrop-blur-sm w-full justify-start">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="planifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifications ({jeu.planifications?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="questions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <List className="w-4 h-4 mr-2" />
                  Questions ({jeu.questions?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="sessions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Sessions actives ({planificationsEnCours.length})
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab Content */}
              <TabsContent value="dashboard" className="mt-0">
                <GameStats 
                  jeu={jeu} 
                  planificationsEnCours={planificationsEnCours} 
                  onCopyPin={handleCopyPin} 
                />
              </TabsContent>

              {/* Planifications Tab Content */}
              <TabsContent value="planifications" className="mt-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-primary mb-4">Toutes les planifications</h2>
                  
                  {jeu.planifications && jeu.planifications.length > 0 ? (
                    <div className="space-y-4">
                      {jeu.planifications.map((planif) => (
                        <div key={planif._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">PIN:</span>
                                <code className="bg-gray-100 px-2 py-1 rounded">{planif.pin}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyPin(planif.pin)}
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Copier le PIN</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div><span className="font-medium">Début:</span> {new Date(planif.date_debut || planif.date_fin).toLocaleDateString()} {planif.heure_debut || ""}</div>
                                <div><span className="font-medium">Fin:</span> {new Date(planif.date_fin).toLocaleDateString()} {planif.heure_fin || ""}</div>
                                <div><span className="font-medium">Type:</span> {planif.type || "Standard"}</div>
                                <div><span className="font-medium">Statut:</span> {planif.statut || "Non défini"}</div>
                                <div><span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations</div>
                                <div><span className="font-medium">Participants:</span> {planif.participants_actifs || 0}/{planif.total_participants || 0}</div>
                              </div>
                            </div>
                            
                            {/* Meilleur score */}
                            {planif.meilleur_score && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
                                <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur score</div>
                                <div className="font-bold text-lg">{planif.meilleur_score.apprenant}</div>
                                <div className="text-yellow-600 font-medium">{planif.meilleur_score.score} points</div>
                              </div>
                            )}
                          </div>
                          
                          {/* Date de la session */}
                          <div className="mt-3 text-xs text-gray-500">
                            {new Date(planif.date_fin) > new Date() ? (
                              <span className="text-green-600 font-medium">Session active jusqu'au {new Date(planif.date_fin).toLocaleString()}</span>
                            ) : (
                              <span>Session terminée le {new Date(planif.date_fin).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Aucune planification n'a encore été créée pour ce jeu.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Questions Tab Content */}
              <TabsContent value="questions" className="mt-0">
                <QuestionsDisplay questions={jeu.questions} />
              </TabsContent>

              {/* Active Sessions Tab Content */}
              <TabsContent value="sessions" className="mt-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-primary mb-4">Sessions en cours</h2>
                  
                  {planificationsEnCours.length > 0 ? (
                    <div className="space-y-4">
                      {planificationsEnCours.map((planif) => (
                        <div key={planif._id} className="bg-green-50 rounded-lg shadow-sm p-4 border border-green-100">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">PIN:</span>
                                <code className="bg-white px-2 py-1 rounded font-bold">{planif.pin}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyPin(planif.pin)}
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Copier le PIN</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div><span className="font-medium">Début:</span> {new Date(planif.date_debut || planif.date_fin).toLocaleDateString()} {planif.heure_debut || ""}</div>
                                <div><span className="font-medium">Fin:</span> {new Date(planif.date_fin).toLocaleDateString()} {planif.heure_fin || ""}</div>
                                <div><span className="font-medium">Type:</span> {planif.type || "Standard"}</div>
                                <div><span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations</div>
                                <div colSpan={2}><span className="font-medium">Participants actifs:</span> {planif.participants_actifs || 0}/{planif.total_participants || 0}</div>
                              </div>
                            </div>
                            
                            {/* Meilleur score */}
                            {planif.meilleur_score && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
                                <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur score</div>
                                <div className="font-bold text-lg">{planif.meilleur_score.apprenant}</div>
                                <div className="text-yellow-600 font-medium">{planif.meilleur_score.score} points</div>
                              </div>
                            )}
                          </div>
                          
                          {/* Temps restant */}
                          <div className="mt-3 text-xs text-green-600 font-medium">
                            Session active jusqu'au {new Date(planif.date_fin).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Aucune session n'est actuellement en cours.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}


import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { GameHeader } from '@/components/game/details/GameHeader';
import { GameStats } from '@/components/game/details/GameStats';
import { ActiveSessions } from '@/components/game/details/ActiveSessions';
import { QuestionsDisplay } from '@/components/game/details/QuestionsDisplay';

export default function GameDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const jeu = location.state?.jeu as Kahoot;

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
              onDeleteSuccess={handleDeleteGame} 
            />

            <GameStats 
              jeu={jeu} 
              planificationsEnCours={planificationsEnCours} 
              onCopyPin={handleCopyPin} 
            />
          </div>

          <ActiveSessions 
            planificationsEnCours={planificationsEnCours} 
            onCopyPin={handleCopyPin}
            gameId={jeu._id}
          />

          <QuestionsDisplay questions={jeu.questions} />
        </main>
      </div>
    </div>
  );
}

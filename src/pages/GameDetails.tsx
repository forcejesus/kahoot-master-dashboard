
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { GameHeader } from '@/components/game/details/GameHeader';
import { useEffect, useState } from 'react';
import { GameBackgroundImage } from '@/components/game/details/GameBackgroundImage';
import { GameDetailsTabs } from '@/components/game/details/GameDetailsTabs';

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
        <GameBackgroundImage jeu={jeu} />

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
            <GameDetailsTabs 
              jeu={jeu} 
              planificationsEnCours={planificationsEnCours} 
              onCopyPin={handleCopyPin} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}

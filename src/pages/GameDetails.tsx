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
import { buildApiUrl } from '@/config/api';

export default function GameDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const initialJeu = location.state?.jeu as Kahoot;
  const [jeu, setJeu] = useState<Kahoot | null>(initialJeu);

  const refreshGameDetails = async () => {
    if (!jeu) return;
    
    try {
      const response = await fetch(buildApiUrl(`/api/jeux/${jeu._id}`), {
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
      const response = await fetch(buildApiUrl(`/api/jeux/delete/${jeu._id}`), {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />
      
      <div className="relative">
        {/* Background Image Section */}
        <GameBackgroundImage jeu={jeu} />

        {/* Content Section */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="navigation"
            className="mb-6 bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-200"
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

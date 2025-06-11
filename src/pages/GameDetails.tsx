
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
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
  const { t } = useTranslation();
  const initialJeu = location.state?.jeu as Kahoot;
  const [jeu, setJeu] = useState<Kahoot | null>(initialJeu);

  const refreshGameDetails = async () => {
    if (!jeu) return;
    
    try {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Motifs de fond plus subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/8 to-indigo-100/8 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100/12 to-blue-100/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-50/10 to-slate-50/10 rounded-full blur-2xl"></div>
      </div>

      {/* Motif géométrique très subtil */}
      <div className="absolute inset-0 opacity-[0.005]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(71, 85, 105) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>
      
      <Navbar />
      
      <div className="relative">
        <GameBackgroundImage jeu={jeu} />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="navigation"
            className="mb-6 bg-white/90 hover:bg-white/95 backdrop-blur-sm shadow-md border border-white/20"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('details.backToDashboard')}
          </Button>

          <div className="space-y-8 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <GameHeader 
                jeu={jeu} 
                token={token} 
                onDelete={handleDeleteGame} 
                onRefresh={refreshGameDetails} 
              />
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <GameDetailsTabs 
                jeu={jeu} 
                planificationsEnCours={planificationsEnCours} 
                onCopyPin={handleCopyPin} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

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
        throw new Error(t('error.loadingFailed'));
      }

      const data = await response.json();
      
      if (data.data) {
        setJeu(data.data);
      } else {
        toast.error(t('error.loadingFailed'));
      }
    } catch (error) {
      toast.error(t('error.loadingFailedDescription'));
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
    toast.success(t('planification.copyPin') + " !");
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
        throw new Error(t('error.deleteFailed'));
      }

      toast.success(t('success.deleteSuccess'));
      navigate('/dashboard');
    } catch (error) {
      toast.error(t('error.deleteFailedDescription'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <Navbar />
      
      <div className="relative">
        <GameBackgroundImage jeu={jeu} />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header responsive avec bouton retour */}
          <div className="mb-6 sm:mb-8">
            <Button
              variant="default"
              className="mb-4 sm:mb-6 bg-white text-slate-700 hover:bg-slate-50 shadow-lg border border-slate-200 text-sm sm:text-base font-semibold px-6 py-3"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('details.backToDashboard')}
            </Button>
          </div>

          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header du jeu - responsive */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
              <GameHeader 
                jeu={jeu} 
                token={token} 
                onDelete={handleDeleteGame} 
                onRefresh={refreshGameDetails} 
              />
            </div>

            {/* Contenu principal avec tabs - responsive */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <GameDetailsTabs 
                jeu={jeu} 
                planificationsEnCours={planificationsEnCours} 
                onCopyPin={handleCopyPin}
                onRefresh={refreshGameDetails}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


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
import { ModernBackground } from '@/components/shared/ModernBackground';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Modern Background */}
      <ModernBackground />
      
      <Navbar />
      
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header responsive avec bouton retour */}
          <div className="mb-6 sm:mb-8">
            <Button
              variant="default"
              className="mb-4 sm:mb-6 bg-white/90 text-slate-700 hover:bg-white border border-white/30 shadow-2xl backdrop-blur-sm text-sm sm:text-base font-semibold px-6 py-3 transition-all duration-300 hover:shadow-xl"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('details.backToDashboard')}
            </Button>
          </div>

          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Header du jeu - responsive */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 hover:bg-white/15 transition-all duration-300">
              <GameHeader 
                jeu={jeu} 
                token={token} 
                onDelete={handleDeleteGame} 
                onRefresh={refreshGameDetails} 
              />
            </div>

            {/* Contenu principal avec tabs - responsive */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
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

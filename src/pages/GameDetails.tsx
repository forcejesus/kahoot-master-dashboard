
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Layout } from '@/components/Layout';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { GameHeader } from '@/components/game/details/GameHeader';
import { useEffect, useState } from 'react';
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
    <Layout showBackButton={true} backTo="/dashboard" title={jeu.titre}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border-0 p-6 hover:bg-white transition-all duration-300">
            <GameHeader 
              jeu={jeu} 
              token={token} 
              onDelete={handleDeleteGame} 
              onRefresh={refreshGameDetails} 
            />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border-0 overflow-hidden hover:bg-white transition-all duration-300">
            <GameDetailsTabs 
              jeu={jeu} 
              planificationsEnCours={planificationsEnCours} 
              onCopyPin={handleCopyPin} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

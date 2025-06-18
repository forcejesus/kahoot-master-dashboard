
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    <Layout>
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('details.backToDashboard')}
            </Button>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-0 p-6 hover:bg-white/90 transition-all duration-300">
              <GameHeader 
                jeu={jeu} 
                token={token} 
                onDelete={handleDeleteGame} 
                onRefresh={refreshGameDetails} 
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-0 overflow-hidden hover:bg-white/90 transition-all duration-300">
              <GameDetailsTabs 
                jeu={jeu} 
                planificationsEnCours={planificationsEnCours} 
                onCopyPin={handleCopyPin} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

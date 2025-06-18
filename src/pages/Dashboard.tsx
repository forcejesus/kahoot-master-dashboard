
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Layout } from '@/components/Layout';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { CreateKahootSection } from '@/components/dashboard/CreateKahootSection';
import { KahootList } from '@/components/dashboard/KahootList';
import { Kahoot } from '@/types/game-details';
import { toast } from 'sonner';

export default function Dashboard() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKahoots = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(t('error.loadingFailed'));
      }

      const data = await response.json();
      setKahoots(data.data || []);
    } catch (error) {
      console.error("Error fetching kahoots:", error);
      toast.error(t('error.loadingFailedDescription'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKahoots();
    }
  }, [token]);

  const handleKahootCreated = () => {
    fetchKahoots();
  };

  const handleDeleteKahoots = async (kahootIds: string[]) => {
    try {
      await Promise.all(
        kahootIds.map(id =>
          fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        )
      );
      
      toast.success(t('success.deleteSuccess'));
      await fetchKahoots();
    } catch (error) {
      console.error("Error deleting kahoots:", error);
      toast.error(t('error.deleteFailedDescription'));
      throw error;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <WelcomeHeader />
          <StatsSection onKahootCreated={handleKahootCreated} kahoots={kahoots} />
          <CreateKahootSection gamesLoading={isLoading} />
          <KahootList 
            kahoots={kahoots} 
            isLoading={isLoading} 
            onDelete={handleDeleteKahoots} 
          />
        </div>
      </div>
    </Layout>
  );
}

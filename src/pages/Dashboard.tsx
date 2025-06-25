
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { KahootList } from '@/components/dashboard/KahootList';
import { Kahoot } from '@/types/game-details';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const loadingToastId = toast.loading(
      t('loading.data'), 
      {
        description: t('loading.dataDescription'),
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        duration: Infinity,
      }
    );

    try {
      const response = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setKahoots(data.data);
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToastId);
      toast.success(
        t('success.dataLoaded'),
        {
          description: t('success.dataLoadedDescription', { count: data.data.length }),
          icon: <CheckCircle className="w-4 h-4" />,
          duration: 4000,
        }
      );
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(
        t('error.loadingFailed'),
        {
          description: t('error.loadingFailedDescription'),
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteKahoots = async (kahootIds: string[]) => {
    const loadingToastId = toast.loading(
      t('loading.deleting'),
      {
        description: t('loading.deletingDescription', { count: kahootIds.length }),
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        duration: Infinity,
      }
    );

    try {
      for (const id of kahootIds) {
        await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      toast.dismiss(loadingToastId);
      toast.success(
        t('success.deleteSuccess'),
        {
          description: t('success.deleteSuccessDescription', { count: kahootIds.length }),
          icon: <CheckCircle className="w-4 h-4" />,
          duration: 4000,
        }
      );
      fetchData();
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(
        t('error.deleteFailed'),
        {
          description: t('error.deleteFailedDescription'),
          icon: <XCircle className="w-4 h-4" />,
          duration: 5000,
        }
      );
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsSection onKahootCreated={fetchData} />
        <KahootList 
          kahoots={kahoots} 
          isLoading={isLoading} 
          onDelete={handleDeleteKahoots} 
        />
      </main>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { KahootList } from '@/components/dashboard/KahootList';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
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
      
      // Rafraîchir immédiatement les données après suppression
      await fetchData();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
      {/* Motifs de fond plus subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercles très subtils */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100/15 to-blue-100/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-50/15 to-slate-50/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 rounded-full blur-2xl"></div>
      </div>

      {/* Motif géométrique très subtil */}
      <div className="absolute inset-0 opacity-[0.008]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(71, 85, 105) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader />
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

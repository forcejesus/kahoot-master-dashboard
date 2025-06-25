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
    <div className="min-h-screen relative overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-800/80" />
      
      {/* Motifs géométriques décoratifs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-56 h-56 bg-purple-300/20 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-indigo-300/20 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Motif de grille */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Formes géométriques décoratives */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-8 h-8 border-2 border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-32 w-12 h-12 border-2 border-blue-300/40 rotate-45 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-purple-300/40 rotate-12 animate-pulse delay-1500"></div>
        <div className="absolute top-60 left-60 w-14 h-14 border-2 border-indigo-300/40 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-80 right-80 w-8 h-8 bg-blue-300/30 rotate-45 animate-pulse delay-2500"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader />
        <StatsSection onKahootCreated={fetchData} kahoots={kahoots} />
        <KahootList 
          kahoots={kahoots} 
          isLoading={isLoading} 
          onDelete={handleDeleteKahoots} 
        />
      </main>
    </div>
  );
}

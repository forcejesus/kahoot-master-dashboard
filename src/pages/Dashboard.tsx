
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { KahootList } from '@/components/dashboard/KahootList';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { Kahoot } from '@/types/game-details';
import { CheckCircle, XCircle, Loader2, Sparkles, Zap, Gamepad2, Stars } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Main gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_50%)]"></div>
        
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/5 w-8 h-8 text-yellow-400/30 animate-bounce" style={{ animationDelay: '1s' }} />
        <Gamepad2 className="absolute top-3/4 right-1/5 w-10 h-10 text-blue-400/25 animate-float" />
        <Zap className="absolute top-1/2 left-3/4 w-6 h-6 text-pink-400/40 animate-pulse" style={{ animationDelay: '3s' }} />
        <Stars className="absolute top-1/3 right-1/3 w-7 h-7 text-purple-400/30 animate-bounce" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-1/3 left-2/3 w-5 h-5 text-cyan-400/35 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }}></div>

      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-slide-in">
          <WelcomeHeader />
        </div>
        
        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <StatsSection onKahootCreated={fetchData} kahoots={kahoots} />
        </div>
        
        <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <KahootList 
            kahoots={kahoots} 
            isLoading={isLoading} 
            onDelete={handleDeleteKahoots} 
          />
        </div>
      </main>
    </div>
  );
}

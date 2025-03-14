
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sparkles, Loader } from 'lucide-react';
import { LoadingScreen } from '@/components/dashboard/LoadingScreen';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CreateKahootSection } from '@/components/dashboard/CreateKahootSection';
import { LoadingCard } from '@/components/ui/loading-card';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset all loading states and progress
    setLoading(true);
    setStatsLoading(true);
    setGamesLoading(true);
    setProgress(0);
    
    // Create a more dynamic loading effect with proper animation sequence
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Ajout d'une progression non-linéaire pour simuler un chargement réel
        const increment = Math.random() * 2 + (prevProgress < 50 ? 1.5 : 0.5);
        const newProgress = Math.min(prevProgress + increment, 100);
        
        // Déclenchement des états de chargement à des seuils spécifiques
        if (newProgress >= 60 && prevProgress < 60) {
          setStatsLoading(false);
        }
        
        if (newProgress >= 85 && prevProgress < 85) {
          setGamesLoading(false);
        }
        
        if (newProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
        }
        
        return newProgress;
      });
    }, 100); // Vitesse adaptée pour une progression plus réaliste

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2 transition-all duration-500">
            Tableau de bord
            {loading && (
              <span className="inline-flex">
                <Sparkles className="h-6 w-6 text-primary animate-ping" />
                <Loader className="h-6 w-6 text-secondary animate-spin ml-2" />
              </span>
            )}
          </h1>

          {loading ? (
            <LoadingScreen progress={progress} />
          ) : (
            <DashboardStats statsLoading={statsLoading} />
          )}
        </div>

        <CreateKahootSection gamesLoading={gamesLoading} />
      </main>
    </div>
  );
}

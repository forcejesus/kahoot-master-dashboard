
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
        const newProgress = Math.min(prevProgress + 1, 100);
        
        // When progress reaches specific thresholds, trigger loading state changes
        if (newProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          setTimeout(() => setStatsLoading(false), 800);
          setTimeout(() => setGamesLoading(false), 1300);
        }
        
        return newProgress;
      });
    }, 25); // Faster speed for smoother progress

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Tableau de bord
            {loading && <Sparkles className="h-6 w-6 text-primary animate-ping" />}
          </h1>

          {loading ? (
            <>
              <LoadingScreen progress={progress} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingCard key={index} delayIndex={index} />
                ))}
              </div>
            </>
          ) : (
            <DashboardStats statsLoading={statsLoading} />
          )}
        </div>

        <CreateKahootSection gamesLoading={gamesLoading} />
      </main>
    </div>
  );
}

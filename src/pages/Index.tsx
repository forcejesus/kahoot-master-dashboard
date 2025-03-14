
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Trophy, BookOpen, Sparkles, GamepadIcon, Zap, Stars } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LoadingCard } from '@/components/ui/loading-card';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Force loading to true initially
    setLoading(true);
    
    // Simulation d'un chargement progressif avec une animation fluide
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Ensure we don't exceed 100%
        const newProgress = Math.min(prevProgress + 2, 100);
        
        // When we reach 100%, schedule the loading state change
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
        }
        
        return newProgress;
      });
    }, 80);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures this runs only once

  // Icônes animées qui apparaissent pendant le chargement
  const icons = [
    <GamepadIcon key="gamepad" className="text-primary/60 animate-pulse" size={40} />,
    <Zap key="zap" className="text-secondary/60 animate-pulse" size={40} />,
    <Stars key="stars" className="text-primary/60 animate-pulse" size={40} />
  ];

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
              <div className="mb-6 relative overflow-hidden bg-white/50 p-6 rounded-lg shadow-sm">
                <div className="text-center mb-6 text-primary font-medium flex items-center justify-center">
                  <GamepadIcon className="mr-2 h-5 w-5 animate-bounce" />
                  <span className="animate-pulse">Chargement de vos Kahoots...</span>
                </div>
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 opacity-20">
                  {icons[0]}
                </div>
                <div className="absolute top-1/3 right-1/4 transform -translate-y-1/2 opacity-20">
                  {icons[1]}
                </div>
                <div className="absolute bottom-1/4 right-1/3 transform -translate-y-1/2 opacity-20">
                  {icons[2]}
                </div>
                <Progress 
                  value={progress} 
                  className="h-3 w-full max-w-md mx-auto rounded-full overflow-hidden" 
                />
                <div className="text-sm text-center mt-3 font-medium text-primary">
                  {Math.round(progress)}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingCard key={index} delayIndex={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Total des Kahoots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Kahoots créés
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Sessions actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Sessions en cours
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Participants totaux
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Meilleur score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">
                      Points maximums
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateKahootDialog />
        </div>
      </main>
    </div>
  );
}

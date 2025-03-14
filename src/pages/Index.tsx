
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Trophy, BookOpen, Sparkles, GamepadIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simuler un chargement progressif
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

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
            {loading && <Sparkles className="h-6 w-6 text-primary animate-pulse" />}
          </h1>

          {loading ? (
            <>
              <div className="mb-6">
                <div className="text-center mb-2 text-primary font-medium flex items-center justify-center">
                  <GamepadIcon className="mr-2 h-5 w-5 animate-bounce" />
                  Chargement de vos Kahoots...
                </div>
                <Progress value={progress} className="h-2 w-full max-w-md mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-16 rounded-md animate-pulse" style={{
                          animationDelay: `${index * 0.1}s`
                        }} />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </CardContent>
                  </Card>
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

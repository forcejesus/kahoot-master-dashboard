
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Trophy, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatsProps {
  statsLoading: boolean;
}

export function DashboardStats({ statsLoading }: DashboardStatsProps) {
  if (statsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700">
        {/* Cartes en état de chargement avec des animations */}
        {[
          { icon: <BookOpen className="h-5 w-5 animate-pulse" />, title: "Total des Kahoots" },
          { icon: <Clock className="h-5 w-5 animate-pulse" />, title: "Sessions actives" },
          { icon: <Users className="h-5 w-5 animate-pulse" />, title: "Participants" },
          { icon: <Trophy className="h-5 w-5 animate-pulse" />, title: "Meilleur score" }
        ].map((item, index) => (
          <Card 
            key={index} 
            className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                {item.icon}
                <Skeleton className="h-4 w-32 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="relative">
                  <Skeleton className="h-8 w-16 rounded-md animate-pulse" />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                    style={{
                      transform: "translateX(-100%)",
                      animation: `shimmer 2s infinite linear`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
                <Skeleton className="h-4 w-28 animate-pulse" style={{ animationDelay: `${index * 0.15}s` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-100 translate-y-0 transition-all duration-700">
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
  );
}

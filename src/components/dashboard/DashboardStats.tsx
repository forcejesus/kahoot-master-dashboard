
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Trophy, BookOpen } from 'lucide-react';

interface DashboardStatsProps {
  statsLoading: boolean;
}

export function DashboardStats({ statsLoading }: DashboardStatsProps) {
  if (statsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 translate-y-4 transition-all duration-700">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
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

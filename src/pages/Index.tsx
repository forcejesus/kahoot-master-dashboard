
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Trophy, BookOpen } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tableau de bord
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
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

            <Card className="bg-white/80 backdrop-blur-sm">
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

            <Card className="bg-white/80 backdrop-blur-sm">
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

            <Card className="bg-white/80 backdrop-blur-sm">
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
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateKahootDialog />
        </div>
      </main>
    </div>
  );
}

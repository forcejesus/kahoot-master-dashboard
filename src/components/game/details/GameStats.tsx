
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Copy, Trophy, Calendar, Users, Clock } from "lucide-react";
import { Kahoot, Planification } from "@/types/game-details";
import { Button } from "@/components/ui/button";

interface GameStatsProps {
  jeu: Kahoot;
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function GameStats({ jeu, planificationsEnCours, onCopyPin }: GameStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Planifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{jeu.stats?.total_planifications || 0}</div>
            <div className="text-sm text-muted-foreground">
              {jeu.stats?.planifications_en_cours || 0} en cours
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Users className="h-5 w-5" />
            Apprenants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{jeu.stats?.total_apprenants || 0}</div>
            <div className="text-sm text-muted-foreground">
              {jeu.stats?.apprenants_actifs || 0} ont participé
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {jeu.stats?.sessions_completees || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Sessions complétées
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Meilleur Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {jeu.stats?.meilleur_score?.score || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              {jeu.stats?.meilleur_score?.apprenant || "Aucun"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Sessions en cours</CardTitle>
        </CardHeader>
        <CardContent>
          {planificationsEnCours.length > 0 ? (
            <div className="space-y-4">
              {planificationsEnCours.map((planif) => (
                <div key={planif._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">PIN:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded">{planif.pin}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopyPin(planif.pin)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations
                    </div>
                    {planif.meilleur_score && (
                      <div className="flex items-center text-sm text-yellow-600">
                        <Trophy className="h-4 w-4 mr-1" />
                        Meilleur score: {planif.meilleur_score.apprenant} ({planif.meilleur_score.score} pts)
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {planif.participants_actifs}/{planif.total_participants} participants
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Fin le {new Date(planif.date_fin).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 flex flex-col items-center">
              <AlertCircle className="h-8 w-8 mb-2" />
              Aucune session en cours
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

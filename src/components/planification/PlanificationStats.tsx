
import { StatisticsData } from "@/types/planification-details";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingDown, Users } from "lucide-react";

interface PlanificationStatsProps {
  stats: StatisticsData;
}

export function PlanificationStats({ stats }: PlanificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Meilleur Score */}
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-yellow-700">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Meilleur Score
          </CardTitle>
          <CardDescription>Participant avec le score le plus élevé</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.bestScore ? (
            <div className="space-y-2">
              <div className="text-xl font-bold">{stats.bestScore.participant.score} points</div>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Nom:</span> {stats.bestScore.participant.apprenant.prenom} {stats.bestScore.participant.apprenant.nom}</div>
                <div><span className="font-medium">Matricule:</span> {stats.bestScore.participant.apprenant.matricule}</div>
                <div><span className="font-medium">Téléphone:</span> {stats.bestScore.participant.apprenant.phone}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">Aucun participant</div>
          )}
        </CardContent>
      </Card>

      {/* Score le plus faible */}
      <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-gray-700">
            <TrendingDown className="h-5 w-5 mr-2 text-gray-500" />
            Score le plus faible
          </CardTitle>
          <CardDescription>Participant avec le score le plus bas</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.worstScore ? (
            <div className="space-y-2">
              <div className="text-xl font-bold">{stats.worstScore.participant.score} points</div>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Nom:</span> {stats.worstScore.participant.apprenant.prenom} {stats.worstScore.participant.apprenant.nom}</div>
                <div><span className="font-medium">Matricule:</span> {stats.worstScore.participant.apprenant.matricule}</div>
                <div><span className="font-medium">Téléphone:</span> {stats.worstScore.participant.apprenant.phone}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">
              {stats.totalParticipants > 0 
                ? "Score unique ou identique au meilleur score" 
                : "Aucun participant"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Total des participants */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Total des participants
          </CardTitle>
          <CardDescription>Nombre d'apprenants ayant joué</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalParticipants}</div>
          <div className="text-sm text-gray-500 mt-2">
            {stats.totalParticipants === 0 
              ? "Aucun apprenant n'a encore participé"
              : stats.totalParticipants === 1
                ? "1 apprenant a participé à cette session"
                : `${stats.totalParticipants} apprenants ont participé à cette session`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

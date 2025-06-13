
import { StatisticsData } from "@/types/planification-details";
import { Trophy, TrendingDown, Users, Medal, Crown, Target } from "lucide-react";
import { useTranslation } from "@/contexts/I18nContext";
import { useApiTranslation } from "@/hooks/useApiTranslation";

interface PlanificationStatsProps {
  stats: StatisticsData;
}

export function PlanificationStats({ stats }: PlanificationStatsProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();

  if (stats.totalParticipants === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <Target className="h-16 w-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-lg">Aucune statistique disponible</p>
          <p className="text-white/40 text-sm mt-2">Les statistiques apparaîtront une fois que des participants auront rejoint la session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Participants */}
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 border border-blue-300/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wide">Total Participants</h3>
          </div>
        </div>
        <div className="text-4xl font-black text-white mb-2">
          {stats.totalParticipants}
        </div>
        <p className="text-blue-200 text-sm">
          {stats.totalParticipants === 1 ? 'Participant actif' : 'Participants actifs'}
        </p>
      </div>

      {/* Best Score */}
      {stats.bestScore && (
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-300/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wide">Meilleur Score</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {translateField(stats.bestScore.participant.apprenant, 'prenom')} {translateField(stats.bestScore.participant.apprenant, 'nom')}
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-300" />
            <span className="text-3xl font-black text-yellow-100">
              {stats.bestScore.participant.score}
            </span>
            <span className="text-yellow-200 text-sm">points</span>
          </div>
        </div>
      )}

      {/* Worst Score */}
      {stats.worstScore && (
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-300/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
              <Medal className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wide">Score le Plus Bas</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {translateField(stats.worstScore.participant.apprenant, 'prenom')} {translateField(stats.worstScore.participant.apprenant, 'nom')}
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-300" />
            <span className="text-3xl font-black text-red-100">
              {stats.worstScore.participant.score}
            </span>
            <span className="text-red-200 text-sm">points</span>
          </div>
        </div>
      )}
    </div>
  );
}

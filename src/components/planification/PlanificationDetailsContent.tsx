
import { PlanificationDetail, StatisticsData } from "@/types/planification-details";
import { PlanificationHeader } from "@/components/planification/PlanificationHeader";
import { PlanificationStats } from "@/components/planification/PlanificationStats";
import { ParticipantsList } from "@/components/planification/ParticipantsList";
import { useTranslation } from "@/contexts/I18nContext";
import { Users, BarChart3, Sparkles } from "lucide-react";

interface PlanificationDetailsContentProps {
  planification: PlanificationDetail;
  stats: StatisticsData;
  onCopyPin: (pin: string) => void;
}

export function PlanificationDetailsContent({ 
  planification, 
  stats, 
  onCopyPin 
}: PlanificationDetailsContentProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête de la planification */}
      <PlanificationHeader 
        planification={planification} 
        onCopyPin={onCopyPin} 
      />

      {/* Statistiques de la planification */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {t('planDetails.sessionStats')}
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
          </h2>
        </div>
        <PlanificationStats stats={stats} />
      </div>

      {/* Liste des participants */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {t('planDetails.participants')}
            <span className="text-lg font-normal text-white/70">
              ({planification.participants?.length || 0})
            </span>
          </h2>
        </div>
        
        {planification.participants && planification.participants.length > 0 ? (
          <ParticipantsList participants={planification.participants} />
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 text-lg">{t('planDetails.noParticipants')}</p>
              <p className="text-white/40 text-sm mt-2">Aucun participant n'a encore rejoint cette session</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

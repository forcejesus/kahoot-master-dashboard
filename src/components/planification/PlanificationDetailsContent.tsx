
import { PlanificationDetail, StatisticsData } from "@/types/planification-details";
import { PlanificationHeader } from "@/components/planification/PlanificationHeader";
import { PlanificationStats } from "@/components/planification/PlanificationStats";
import { ParticipantsList } from "@/components/planification/ParticipantsList";
import { useTranslation } from "@/contexts/I18nContext";

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
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4">{t('planDetails.sessionStats')}</h2>
        <PlanificationStats stats={stats} />
      </div>

      {/* Liste des participants */}
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-slate-200/50">
        <h2 className="text-xl font-bold text-slate-700 mb-4">{t('planDetails.participants')}</h2>
        {planification.participants && planification.participants.length > 0 ? (
          <ParticipantsList participants={planification.participants} />
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>{t('planDetails.noParticipants')}</p>
          </div>
        )}
      </div>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { Planification } from "@/types/game-details";
import { useTranslation } from "@/contexts/I18nContext";
import { useApiTranslation } from "@/hooks/useApiTranslation";

interface PlanificationCardProps {
  planification: Planification;
  onCopyPin: (pin: string) => void;
  onViewPlanification: (id: string) => void;
}

export function PlanificationCard({ planification, onCopyPin, onViewPlanification }: PlanificationCardProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t('planification.accessPin')}:</span>
            <code className="bg-gray-100 px-2 py-1 rounded">{planification.pin}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyPin(planification.pin)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">{t('planification.copyPin')}</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="font-medium">{t('planification.from')}:</span> {new Date(planification.date_debut || planification.date_fin).toLocaleDateString()} {planification.heure_debut || ""}</div>
            <div><span className="font-medium">{t('planification.to')}:</span> {new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin || ""}</div>
            <div><span className="font-medium">{t('planification.type')}:</span> {translateField(planification, 'type') || planification.type || t('planification.standard')}</div>
            <div><span className="font-medium">{t('planification.status')}:</span> {translateField(planification, 'statut') || planification.statut || t('planification.pending')}</div>
            <div><span className="font-medium">{t('planification.limit')}:</span> {planification.limite_participation || "∞"} {t('planification.participants')}</div>
            <div><span className="font-medium">{t('planification.participants')}:</span> {planification.participants?.length || 0}</div>
          </div>
        </div>
        
        {planification.meilleur_score && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
            <div className="text-xs text-yellow-600 uppercase font-semibold">{t('planification.bestScore') || "Best Score"}</div>
            <div className="font-bold text-lg">{translateField(planification.meilleur_score, 'apprenant') || planification.meilleur_score.apprenant}</div>
            <div className="text-yellow-600 font-medium">{planification.meilleur_score.score} {t('question.points').toLowerCase()}</div>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {new Date(planification.date_fin) > new Date() ? (
            <span className="text-green-600 font-medium">
              {t('planification.activeUntil') || "Active session until"} {new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin}
            </span>
          ) : (
            <span>
              {t('planification.sessionEnded') || "Session ended on"} {new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin}
            </span>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs" 
          onClick={() => onViewPlanification(planification._id)}
        >
          <ExternalLink className="mr-1 h-3 w-3" />
          {t('planification.viewPlanification') || "View planification"}
        </Button>
      </div>
    </div>
  );
}

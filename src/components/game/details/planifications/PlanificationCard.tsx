
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Calendar, Users, Clock, Trophy } from "lucide-react";
import { Planification } from "@/types/game-details";
import { useTranslation } from "@/contexts/I18nContext";
import { useApiTranslation } from "@/hooks/useApiTranslation";
import { Badge } from "@/components/ui/badge";

interface PlanificationCardProps {
  planification: Planification;
  onCopyPin: (pin: string) => void;
  onViewPlanification: (id: string) => void;
}

export function PlanificationCard({ planification, onCopyPin, onViewPlanification }: PlanificationCardProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();

  const isActive = new Date(planification.date_fin) > new Date();

  return (
    <div className={`bg-gradient-to-br ${isActive ? 'from-green-50 via-white to-green-50/30 border-green-200 shadow-green-100' : 'from-gray-50 via-white to-gray-50/30 border-gray-200'} rounded-xl shadow-lg p-6 border-2 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Section principale */}
        <div className="flex-1 space-y-4">
          {/* PIN en évidence */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-600">{t('planification.accessPin')}:</span>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md font-bold text-lg border border-blue-200">
                  {planification.pin}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopyPin(planification.pin)}
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Copy className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Informations de la planification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{t('planification.from')}:</span> 
              <span>{new Date(planification.date_debut || planification.date_fin).toLocaleDateString()} {planification.heure_debut || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{t('planification.to')}:</span> 
              <span>{new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {translateField(planification, 'type') || planification.type || t('planification.standard')}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{t('planification.participants')}:</span> 
              <span className="font-semibold">{planification.participants?.length || 0}</span>
              {planification.limite_participation && (
                <span className="text-gray-500">/ {planification.limite_participation}</span>
              )}
            </div>
          </div>

          {/* Statut */}
          <div className="flex items-center gap-2">
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={isActive ? "bg-green-100 text-green-800 border-green-300" : ""}
            >
              {isActive 
                ? `${t('planification.activeUntil')} ${new Date(planification.date_fin).toLocaleDateString()} ${planification.heure_fin}`
                : `${t('planification.sessionEnded')} ${new Date(planification.date_fin).toLocaleDateString()} ${planification.heure_fin}`
              }
            </Badge>
          </div>
        </div>
        
        {/* Section meilleur score et actions */}
        <div className="flex flex-col items-center gap-4 min-w-[200px]">
          {planification.meilleur_score && (
            <div className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 text-center w-full shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div className="text-xs text-yellow-700 uppercase font-bold">{t('planification.bestScore')}</div>
              </div>
              <div className="font-bold text-lg text-yellow-800 mb-1">
                {translateField(planification.meilleur_score, 'apprenant') || planification.meilleur_score.apprenant}
              </div>
              <div className="text-yellow-700 font-semibold text-lg">
                {planification.meilleur_score.score} {t('question.points').toLowerCase()}
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-sm font-medium hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all" 
            onClick={() => onViewPlanification(planification._id)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {t('planification.viewPlanification')}
          </Button>
        </div>
      </div>
    </div>
  );
}

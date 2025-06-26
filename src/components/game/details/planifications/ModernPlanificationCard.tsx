
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Users, Calendar, Clock, Trophy } from "lucide-react";
import { Planification } from "@/types/game-details";

interface ModernPlanificationCardProps {
  planification: Planification;
  onCopyPin: (pin: string) => void;
  onViewPlanification: (id: string) => void;
}

export function ModernPlanificationCard({ planification, onCopyPin, onViewPlanification }: ModernPlanificationCardProps) {
  const isActive = new Date(planification.date_fin) > new Date();

  return (
    <div className="relative group">
      {/* Effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-orange-200/30 rounded-2xl transform rotate-1 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-orange-50/30 rounded-2xl transform -rotate-1 scale-102 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl shadow-lg border border-orange-100/50 p-6 hover:shadow-xl transition-all duration-300">
        {/* Header avec PIN en vedette */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
          <div className="flex-1 space-y-4">
            {/* PIN Section - Mise en valeur */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider opacity-90 mb-1">PIN d'accès</div>
                  <div className="text-2xl font-black tracking-wider">{planification.pin}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopyPin(planification.pin)}
                  className="h-10 w-10 p-0 bg-white/20 hover:bg-white/30 text-white border-white/20 rounded-xl"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Informations de la planification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Calendar className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium">Début</div>
                  <div className="text-sm font-semibold truncate">
                    {new Date(planification.date_debut || planification.date_fin).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-600">{planification.heure_debut || ""}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium">Fin</div>
                  <div className="text-sm font-semibold truncate">
                    {new Date(planification.date_fin).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-600">{planification.heure_fin || ""}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Users className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium">Participants</div>
                  <div className="text-sm font-semibold">
                    {planification.participants?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600">
                    Limite: {planification.limite_participation || "∞"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className={`h-3 w-3 rounded-full flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 font-medium">Statut</div>
                  <div className={`text-sm font-semibold ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
                    {isActive ? 'Active' : 'Terminée'}
                  </div>
                  <div className="text-xs text-gray-600">{planification.type || "Standard"}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Meilleur score */}
          {planification.meilleur_score && (
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-4 min-w-[200px]">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div className="text-xs text-yellow-700 uppercase font-bold tracking-wider">Meilleur score</div>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-lg text-yellow-800">{planification.meilleur_score.apprenant}</div>
                <div className="text-yellow-700 font-semibold text-xl">{planification.meilleur_score.score} pts</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer avec statut et bouton d'action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-xs">
            {isActive ? (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">
                  Session active jusqu'au {new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin}
                </span>
              </div>
            ) : (
              <span className="text-gray-500">
                Session terminée le {new Date(planification.date_fin).toLocaleDateString()} {planification.heure_fin}
              </span>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 text-orange-600 hover:from-orange-100 hover:to-orange-200 hover:border-orange-300 shadow-sm" 
            onClick={() => onViewPlanification(planification._id)}
          >
            <ExternalLink className="mr-2 h-3 w-3" />
            Voir détails
          </Button>
        </div>
      </div>
    </div>
  );
}

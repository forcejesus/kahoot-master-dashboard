
import { Planification } from "@/types/game-details";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SessionsTabContentProps {
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function SessionsTabContent({ planificationsEnCours, onCopyPin }: SessionsTabContentProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPlanifications = planificationsEnCours.filter((planif) => {
    const searchableText = [
      planif.pin,
      planif.meilleur_score?.apprenant,
      planif.type,
      planif.statut
    ].filter(Boolean).join(" ").toLowerCase();
    
    return searchableText.includes(searchQuery.toLowerCase());
  });

  const handleViewPlanification = (planificationId: string) => {
    navigate(`/planification/${planificationId}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-primary mb-4">Sessions en cours</h2>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Rechercher par PIN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>
      
      {filteredPlanifications.length > 0 ? (
        <div className="space-y-4">
          {filteredPlanifications.map((planif) => (
            <div key={planif._id} className="bg-green-50 rounded-lg shadow-sm p-4 border border-green-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">PIN:</span>
                    <code className="bg-white px-2 py-1 rounded font-bold">{planif.pin}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyPin(planif.pin)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Copier le PIN</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div><span className="font-medium">Début:</span> {new Date(planif.date_debut || planif.date_fin).toLocaleDateString()} {planif.heure_debut || ""}</div>
                    <div><span className="font-medium">Fin:</span> {new Date(planif.date_fin).toLocaleDateString()} {planif.heure_fin || ""}</div>
                    <div><span className="font-medium">Type:</span> {planif.type || "Standard"}</div>
                    <div><span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations</div>
                    <div className="md:col-span-2"><span className="font-medium">Participants actifs:</span> {planif.participants_actifs || 0}/{planif.total_participants || 0}</div>
                  </div>
                </div>
                
                {/* Meilleur score */}
                {planif.meilleur_score && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
                    <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur score</div>
                    <div className="font-bold text-lg">{planif.meilleur_score.apprenant}</div>
                    <div className="text-yellow-600 font-medium">{planif.meilleur_score.score} points</div>
                  </div>
                )}
              </div>
              
              {/* Temps restant et bouton consulter */}
              <div className="mt-3 flex justify-between items-center">
                <div className="text-xs text-green-600 font-medium">
                  Session active jusqu'au {new Date(planif.date_fin).toLocaleString()}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs" 
                  onClick={() => handleViewPlanification(planif._id)}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Consulter la planification
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? (
            <p>Aucune session en cours ne correspond à votre recherche.</p>
          ) : (
            <p>Aucune session n'est actuellement en cours.</p>
          )}
        </div>
      )}
    </div>
  );
}

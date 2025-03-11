
import { Planification } from "@/types/game-details";
import { Button } from "@/components/ui/button";

interface PlanificationCardProps {
  planification: Planification;
  onCopyPin: (pin: string) => void;
}

export function PlanificationCard({ planification, onCopyPin }: PlanificationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">PIN:</span>
            <code className="bg-gray-100 px-2 py-1 rounded">{planification.pin}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyPin(planification.pin)}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Copier le PIN</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><span className="font-medium">Début:</span> {planification.date_debut} {planification.heure_debut}</div>
            <div><span className="font-medium">Fin:</span> {planification.date_fin} {planification.heure_fin}</div>
            <div><span className="font-medium">Type:</span> {planification.type}</div>
            <div><span className="font-medium">Statut:</span> {planification.statut}</div>
            <div><span className="font-medium">Limite:</span> {planification.limite_participation || planification.limite_participant || 0} participations</div>
            <div><span className="font-medium">Participants:</span> {planification.participants?.length || 0}</div>
          </div>
        </div>
        
        {/* Meilleur score */}
        {planification.participants && planification.participants.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
            <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur participant</div>
            <div className="font-bold text-lg">{planification.participants[0]?.apprenant?.nom || 'N/A'}</div>
            <div className="text-yellow-600 font-medium">{planification.participants[0]?.score || 0} points</div>
          </div>
        )}
      </div>
      
      {/* Date de la session */}
      <div className="mt-3 text-xs text-gray-500">
        {new Date(planification.date_fin) > new Date() ? (
          <span className="text-green-600 font-medium">Session active jusqu'au {planification.date_fin} {planification.heure_fin}</span>
        ) : (
          <span>Session terminée le {planification.date_fin} {planification.heure_fin}</span>
        )}
      </div>
    </div>
  );
}

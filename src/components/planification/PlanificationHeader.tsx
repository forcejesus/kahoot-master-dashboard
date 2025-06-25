
import { PlanificationDetail } from "@/types/planification-details";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlanificationHeaderProps {
  planification: PlanificationDetail;
  onCopyPin: (pin: string) => void;
}

export function PlanificationHeader({ planification, onCopyPin }: PlanificationHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{planification.jeu.titre}</h1>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4" />
              <span>
                Du {planification.date_debut} à {planification.heure_debut} au {planification.date_fin} à {planification.heure_fin}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-4 w-4" />
              <span>Type: <span className="font-medium">{planification.type || "Standard"}</span></span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-4 w-4" />
              <span>Limite: <span className="font-medium">{planification.limite_participant || "∞"} participants</span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <span className="text-xs text-blue-600 uppercase font-semibold mb-1">PIN d'accès</span>
          <code className="bg-white px-4 py-2 rounded-md text-xl font-bold">{planification.pin}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopyPin(planification.pin)}
            className="mt-2"
          >
            <span>Copier le PIN</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

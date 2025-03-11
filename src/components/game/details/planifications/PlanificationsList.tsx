
import { Planification } from "@/types/game-details";
import { PlanificationCard } from "./PlanificationCard";
import { Loader2 } from "lucide-react";

interface PlanificationsListProps {
  planifications: Planification[];
  isLoading: boolean;
  onCopyPin: (pin: string) => void;
  hasFilters: boolean;
}

export function PlanificationsList({ planifications, isLoading, onCopyPin, hasFilters }: PlanificationsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-primary">Chargement des planifications...</span>
      </div>
    );
  }

  if (planifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {hasFilters ? (
          <p>Aucune planification ne correspond à vos critères de recherche.</p>
        ) : (
          <p>Aucune planification n'a encore été créée pour ce jeu.</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {planifications.map((planification) => (
        <PlanificationCard 
          key={planification._id} 
          planification={planification} 
          onCopyPin={onCopyPin} 
        />
      ))}
    </div>
  );
}

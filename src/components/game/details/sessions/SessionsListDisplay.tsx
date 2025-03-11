
import { Planification } from "@/types/game-details";
import { SessionCard } from "./SessionCard";

interface SessionsListDisplayProps {
  planifications: Planification[];
  onCopyPin: (pin: string) => void;
}

export function SessionsListDisplay({ planifications, onCopyPin }: SessionsListDisplayProps) {
  if (planifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucune session n'est actuellement en cours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {planifications.map((planif) => (
        <SessionCard 
          key={planif._id} 
          planification={planif}
          onCopyPin={onCopyPin}
        />
      ))}
    </div>
  );
}

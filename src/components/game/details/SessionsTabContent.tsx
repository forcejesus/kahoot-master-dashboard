
import { Planification } from "@/types/game-details";
import { SessionsHeader } from "./sessions/SessionsHeader";
import { SessionsListDisplay } from "./sessions/SessionsListDisplay";

interface SessionsTabContentProps {
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function SessionsTabContent({ planificationsEnCours, onCopyPin }: SessionsTabContentProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <SessionsHeader />
      <SessionsListDisplay 
        planifications={planificationsEnCours} 
        onCopyPin={onCopyPin}
      />
    </div>
  );
}

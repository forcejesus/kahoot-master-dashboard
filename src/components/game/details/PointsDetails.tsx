
import { QuestionPoint } from "@/types/game-details";

interface PointsDetailsProps {
  point: QuestionPoint | undefined;
}

export function PointsDetails({ point }: PointsDetailsProps) {
  if (!point) return null;
  
  return (
    <div className="col-span-2">
      <span className="font-medium">Points:</span> {point.valeur || 0}
      {point.nature && (
        <span className="ml-2 text-xs">({point.nature})</span>
      )}
      {point.description && (
        <div className="text-xs text-gray-500 mt-1">{point.description}</div>
      )}
    </div>
  );
}

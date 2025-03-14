
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface OldFormatResponseItemProps {
  reponse: string;
  isCorrect: boolean;
  rIndex: number;
}

export function OldFormatResponseItem({ reponse, isCorrect, rIndex }: OldFormatResponseItemProps) {
  return (
    <div
      key={rIndex}
      className={`p-4 rounded-lg ${
        isCorrect
          ? 'bg-green-100 border-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors flex items-center justify-between`}
    >
      <span className={`${isCorrect ? 'text-green-700 font-medium' : ''}`}>
        {reponse}
      </span>
      {isCorrect ? (
        <Badge variant="success" className="flex items-center gap-1">
          <Check className="w-3 h-3" />
          <span>Correcte</span>
        </Badge>
      ) : (
        <Badge variant="outline" className="flex items-center gap-1">
          <X className="w-3 h-3" />
          <span>Incorrecte</span>
        </Badge>
      )}
    </div>
  );
}

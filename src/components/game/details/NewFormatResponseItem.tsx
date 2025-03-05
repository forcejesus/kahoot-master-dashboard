
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Calendar, Hash, ToggleLeft, ToggleRight, Clock } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  if (!reponse) return null;
  
  return (
    <div
      key={rIndex}
      className={`p-4 rounded-lg ${
        reponse.etat
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`${reponse.etat ? 'text-green-700 font-medium' : 'font-medium'} text-lg`}>
          {reponse.reponse_texte || "Réponse sans texte"}
        </span>
        {reponse.etat ? (
          <Badge variant="success" className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Correcte</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <ToggleLeft className="w-3 h-3" />
            <span>Incorrecte</span>
          </Badge>
        )}
      </div>
      
      {/* Simplify the details display to focus on the response text */}
      <div className="mt-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <ToggleRight className="w-3 h-3" /> 
          <span className="font-medium">État:</span> {reponse.etat ? "Correcte" : "Incorrecte"}
        </div>
      </div>
    </div>
  );
}

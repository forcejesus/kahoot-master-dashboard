
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  if (!reponse) return null;
  
  // S'assurer que nous avons le texte de la réponse, pas seulement un ID
  const responseText = typeof reponse === 'object' && reponse.reponse_texte 
    ? reponse.reponse_texte 
    : typeof reponse === 'string' 
      ? reponse 
      : "Réponse sans texte";
  
  // Déterminer si la réponse est correcte
  const isCorrect = typeof reponse === 'object' && reponse.etat === true;
  
  return (
    <div
      className={`p-4 rounded-lg ${
        isCorrect
          ? 'bg-green-100 border-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className={`${isCorrect ? 'text-green-700 font-medium' : ''} text-base`}>
          {responseText}
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
    </div>
  );
}

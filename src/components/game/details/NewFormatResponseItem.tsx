
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  if (!reponse) return null;
  
  console.log("Response item:", reponse);
  
  return (
    <div
      className={`p-4 rounded-lg ${
        reponse.etat
          ? 'bg-green-100 border-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className={`${reponse.etat ? 'text-green-700 font-medium' : ''} text-base`}>
          {typeof reponse.reponse_texte === 'string' ? reponse.reponse_texte : 'Réponse indisponible'}
        </span>
        {reponse.etat ? (
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

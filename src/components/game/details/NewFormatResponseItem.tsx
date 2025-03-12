
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: any; // Using any to handle different formats
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  console.log("Response item in component:", reponse);
  
  // If response is not an object or is null, handle as string
  if (!reponse) return null;
  
  // Handle string response format (old format)
  if (typeof reponse === 'string') {
    return (
      <div className="p-4 rounded-lg bg-gray-50 border-gray-100 border transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-base">{reponse}</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <X className="w-3 h-3" />
            <span>Incorrecte</span>
          </Badge>
        </div>
      </div>
    );
  }
  
  // Handle object response format (new format)
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
          {reponse.reponse_texte || 'Réponse sans texte'}
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

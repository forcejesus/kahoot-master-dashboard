
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, ToggleLeft, ToggleRight, Clock } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  // Ajouter un log pour vérifier l'objet de réponse
  console.log(`Rendering response ${rIndex}:`, reponse);
  
  if (!reponse) return null;
  
  return (
    <div
      className={`p-4 rounded-lg ${
        reponse.etat
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      {/* En-tête de la réponse avec texte et badge */}
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
      
      {/* Détails de la réponse */}
      <div className="mt-3 text-sm text-gray-600 space-y-2">
        <div className="flex items-center gap-1">
          <ToggleRight className="w-3 h-3" /> 
          <span className="font-medium">État:</span> {reponse.etat ? "Correcte" : "Incorrecte"}
        </div>
        
        {reponse._id && (
          <div className="flex items-center gap-1">
            <span className="font-medium">ID:</span> {reponse._id}
          </div>
        )}
        
        {reponse.date && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="font-medium">Date de création:</span> {new Date(reponse.date).toLocaleString()}
          </div>
        )}
        
        {reponse.question && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Question ID:</span> {reponse.question}
          </div>
        )}
      </div>
    </div>
  );
}

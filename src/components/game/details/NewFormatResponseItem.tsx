
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: any; // Using any to handle different formats
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  console.log(`Détail de la réponse ${rIndex}:`, reponse);
  
  // Si la réponse est null ou undefined, ne rien afficher
  if (!reponse) return null;
  
  // Gestion du format de réponse en string (ancien format ou ID)
  if (typeof reponse === 'string') {
    return (
      <div className="p-4 rounded-lg bg-gray-50 border-gray-100 border transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-base">ID: {reponse}</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <X className="w-3 h-3" />
            <span>Format inconnu</span>
          </Badge>
        </div>
      </div>
    );
  }
  
  // Extraction du texte de réponse, avec plusieurs façons possibles de le stocker
  let responseText = '';
  
  if (typeof reponse === 'object' && reponse !== null) {
    // Essayer différentes propriétés pour trouver le texte de la réponse
    if (reponse.reponse_texte) {
      responseText = reponse.reponse_texte;
    } else if (reponse.texte) {
      responseText = reponse.texte;
    } else if (reponse.text) {
      responseText = reponse.text;
    } else if (reponse._id) {
      // Si nous avons un ID mais pas de texte visible, afficher l'ID temporairement
      // pour aider au débogage
      responseText = `ID: ${reponse._id}`;
      console.warn(`Réponse ${rIndex} a un ID mais pas de texte visible:`, reponse);
    }
  }
  
  // Déterminer si la réponse est correcte
  const isCorrect = typeof reponse === 'object' && reponse !== null 
    ? (reponse.etat === true || reponse.etat === 1 || reponse.etat === "1") 
    : false;
  
  console.log(`Réponse ${rIndex} - Texte: "${responseText}", Correcte: ${isCorrect}`);
  
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
          {responseText || 'Réponse sans texte'}
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

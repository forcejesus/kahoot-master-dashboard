
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";
import { MessageCircle } from "lucide-react";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  // Accéder en toute sécurité au nombre de réponses
  const responseCount = Array.isArray(question.reponses) ? question.reponses.length : 0;
  
  // Préparer les réponses pour l'affichage
  const prepareResponses = (): QuestionReponse[] => {
    if (!Array.isArray(question.reponses)) return [];
    
    return question.reponses.map((reponse: any) => {
      // Si la réponse est déjà un objet
      if (typeof reponse === 'object' && reponse !== null) {
        // Si nous avons déjà les détails complets
        if ('reponse_texte' in reponse && reponse.reponse_texte) {
          return reponse as QuestionReponse;
        }
        
        // Sinon, retourner l'objet avec l'ID pour récupération ultérieure
        return {
          _id: reponse._id || "",
          etat: reponse.etat === true || reponse.etat === 1,
          reponse_texte: reponse.reponse_texte || ""
        };
      }
      
      // Si c'est une chaîne (ancien format), c'est probablement un ID ou le texte directement
      return {
        _id: typeof reponse === 'string' ? reponse : "",
        etat: reponse === question.reponse_correcte,
        reponse_texte: typeof reponse === 'string' ? reponse : ""
      };
    });
  };
  
  const formattedResponses = prepareResponses();

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {responseCount}
      </h3>
      
      {isNewResponseFormat ? (
        <div className="space-y-3">
          {formattedResponses.map((reponse, rIndex) => (
            <NewFormatResponseItem 
              key={reponse._id || `response-${rIndex}`} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
            <OldFormatResponseItem
              key={`old-response-${rIndex}`}
              reponse={reponse}
              isCorrect={reponse === question.reponse_correcte}
              rIndex={rIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

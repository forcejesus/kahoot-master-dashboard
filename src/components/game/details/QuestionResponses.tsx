
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  // Debug pour vérifier le format des réponses
  console.log('Question responses format check:', {
    isArray: Array.isArray(question.reponses),
    length: question.reponses?.length,
    firstItem: question.reponses?.[0],
    isNewFormat: isNewResponseFormat
  });
  
  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base">Réponses possibles:</h3>
      {isNewResponseFormat ? (
        // Nouveau format - reponses est un tableau d'objets avec propriété reponse_texte
        <div className="space-y-3">
          {(question.reponses as QuestionReponse[]).map((reponse, rIndex) => (
            <NewFormatResponseItem 
              key={rIndex} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          ))}
        </div>
      ) : (
        // Ancien format - reponses est un tableau de chaînes
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
            <OldFormatResponseItem
              key={rIndex}
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

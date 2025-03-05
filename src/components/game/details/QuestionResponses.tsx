
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  // Debug to console to verify response format
  console.log('Question responses:', question.reponses);
  
  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base">Réponses possibles:</h3>
      {isNewResponseFormat ? (
        // New response format - reponses is an array of objects with reponse_texte property
        <div className="space-y-3">
          {(question.reponses as QuestionReponse[]).map((reponse, rIndex) => (
            <NewFormatResponseItem 
              key={reponse._id || rIndex} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          ))}
        </div>
      ) : (
        // Old response format - reponses is an array of strings
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

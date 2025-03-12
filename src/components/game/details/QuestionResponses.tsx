
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";
import { MessageCircle } from "lucide-react";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  // Safely access the response count
  const responseCount = Array.isArray(question.reponses) ? question.reponses.length : 0;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {responseCount}
      </h3>
      
      {isNewResponseFormat ? (
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

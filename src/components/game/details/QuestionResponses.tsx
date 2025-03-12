
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";
import { MessageCircle } from "lucide-react";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  console.log("Responses data:", question.reponses);
  
  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {Array.isArray(question.reponses) ? question.reponses.length : 0}
      </h3>
      
      <div className="space-y-3">
        {Array.isArray(question.reponses) && question.reponses.map((reponse, rIndex) => {
          console.log(`Réponse ${rIndex}:`, reponse);
          return (
            <NewFormatResponseItem 
              key={rIndex} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          );
        })}
      </div>
    </div>
  );
}

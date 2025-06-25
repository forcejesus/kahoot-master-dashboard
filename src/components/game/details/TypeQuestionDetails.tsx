
import { QuestionType } from "@/types/game-details";

interface TypeQuestionDetailsProps {
  typeQuestion: QuestionType | undefined;
}

export function TypeQuestionDetails({ typeQuestion }: TypeQuestionDetailsProps) {
  if (!typeQuestion) return null;
  
  return (
    <div className="col-span-2">
      <span className="font-medium">Type de question:</span> {typeQuestion.libelle}
      {typeQuestion.description && (
        <div className="text-xs text-gray-500 mt-1">{typeQuestion.description}</div>
      )}
    </div>
  );
}

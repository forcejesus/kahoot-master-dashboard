
import { Question } from "@/types/game-details";
import { EditGameQuestionCard } from "./EditGameQuestionCard";

interface EditGameQuestionsListProps {
  questions: Question[];
  onQuestionUpdate: () => void;
}

export function EditGameQuestionsList({ questions, onQuestionUpdate }: EditGameQuestionsListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune question trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <EditGameQuestionCard
          key={question._id || index}
          question={question}
          index={index}
          onUpdate={onQuestionUpdate}
        />
      ))}
    </div>
  );
}

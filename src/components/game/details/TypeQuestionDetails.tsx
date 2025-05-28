
import { QuestionType } from "@/types/game-details";
import { useTranslation } from "@/contexts/I18nContext";
import { useApiTranslation } from "@/hooks/useApiTranslation";

interface TypeQuestionDetailsProps {
  typeQuestion: QuestionType | undefined;
}

export function TypeQuestionDetails({ typeQuestion }: TypeQuestionDetailsProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();
  
  if (!typeQuestion) return null;
  
  return (
    <div className="col-span-2">
      <span className="font-medium">{t('question.type')}:</span> {translateField(typeQuestion, 'libelle') || typeQuestion.libelle}
      {typeQuestion.description && (
        <div className="text-xs text-gray-500 mt-1">
          {translateField(typeQuestion, 'description') || typeQuestion.description}
        </div>
      )}
    </div>
  );
}

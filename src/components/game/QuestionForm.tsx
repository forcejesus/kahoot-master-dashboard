
import { Question, QuestionType, Point } from '@/types/game';
import { useTranslation } from '@/contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileUploadField } from './form/FileUploadField';
import { DurationSelect } from './form/DurationSelect';
import { PointsSelect } from './form/PointsSelect';
import { QuestionTypeSelect } from './form/QuestionTypeSelect';
import { AnswersInput } from './form/AnswersInput';
import { SubmitQuestionButton } from './form/SubmitQuestionButton';
import { LabelledQuestionField } from './form/LabelledQuestionField';
import { useQuestionForm } from './form/useQuestionForm';
import { useState } from 'react';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const { t } = useTranslation();
  const {
    formQuestion,
    updateFormQuestion,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleFormSubmit,
    isSubmitting,
    resetForm
  } = useQuestionForm(gameId, token);

  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correctAnswer && correctAnswer !== 0) {
      return;
    }

    await handleFormSubmit(
      (question) => {
        onQuestionAdded(question);
        setAnswers(['', '']);
        setCorrectAnswer(null);
      },
      answers,
      correctAnswer
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.questionForm')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddQuestion} className="space-y-6">
          <LabelledQuestionField 
            value={formQuestion.libelle}
            onChange={(value) => updateFormQuestion({
              libelle: value
            })}
          />

          <FileUploadField 
            onFileChange={handleFileChange}
            currentFileType={formQuestion.type_fichier}
          />

          <DurationSelect 
            value={formQuestion.temps}
            onChange={(duration) => updateFormQuestion({
              temps: duration
            })}
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="limite_response"
              checked={formQuestion.limite_response}
              onCheckedChange={(checked) => updateFormQuestion({
                limite_response: checked
              })}
            />
            <Label htmlFor="limite_response">{t('form.enableTimer')}</Label>
          </div>

          <QuestionTypeSelect 
            questionTypes={questionTypes}
            value={formQuestion.typeQuestion}
            onChange={(typeId) => updateFormQuestion({
              typeQuestion: typeId
            })}
          />

          <PointsSelect 
            points={points}
            value={formQuestion.point}
            onChange={(pointId) => updateFormQuestion({
              point: pointId
            })}
          />

          <AnswersInput
            answers={answers}
            correctAnswer={correctAnswer}
            onAnswersChange={setAnswers}
            onCorrectAnswerChange={setCorrectAnswer}
          />

          <SubmitQuestionButton isLoading={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
}


import { Question, QuestionType, Point } from '@/types/game';
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
import { useState, useEffect } from 'react';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
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

  // Local state for answers and correct answer(s)
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  const selectedQuestionType = questionTypes.find(qt => qt._id === formQuestion.typeQuestion);
  const questionTypeLabel = selectedQuestionType?.libelle || '';

  // Reset answers when question type changes
  useEffect(() => {
    if (questionTypeLabel === 'REPONSE_COURTE') {
      setAnswers(['']);
      setCorrectAnswer(null);
      setCorrectAnswers([]);
    } else if (questionTypeLabel && (questionTypeLabel === 'CHOIX_UNIQUE' || questionTypeLabel === 'CHOIX_MULTIPLE')) {
      if (answers.length < 2) {
        setAnswers(['', '']);
      }
      setCorrectAnswer(null);
      setCorrectAnswers([]);
    }
  }, [questionTypeLabel]);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation based on question type
    if (questionTypeLabel === 'CHOIX_UNIQUE') {
      if (correctAnswer === null || answers.some(answer => answer.trim() === '')) {
        return;
      }
    }
    if (questionTypeLabel === 'CHOIX_MULTIPLE') {
      if (correctAnswers.length === 0 || answers.some(answer => answer.trim() === '')) {
        return;
      }
    }
    if (questionTypeLabel === 'REPONSE_COURTE') {
      if (answers.length === 0 || answers[0].trim() === '') {
        return;
      }
    }

    // Determine correct answer index for submission
    let finalCorrectAnswer = 0;
    if (questionTypeLabel === 'CHOIX_UNIQUE') {
      finalCorrectAnswer = correctAnswer || 0;
    } else if (questionTypeLabel === 'CHOIX_MULTIPLE') {
      finalCorrectAnswer = correctAnswers[0] || 0;
    }

    await handleFormSubmit(
      (question) => {
        onQuestionAdded(question);
        if (questionTypeLabel === 'REPONSE_COURTE') {
          setAnswers(['']);
        } else {
          setAnswers(['', '']);
        }
        setCorrectAnswer(null);
        setCorrectAnswers([]);
      },
      answers,
      finalCorrectAnswer
    );
  };

  return (
    <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-600 flex items-center gap-2">
          📝 Créer une nouvelle question
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Configurez tous les paramètres de votre question pour créer une expérience d'apprentissage optimale
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddQuestion} className="space-y-8">
          <LabelledQuestionField 
            value={formQuestion.libelle}
            onChange={(value) => updateFormQuestion({
              libelle: value
            })}
          />

          <QuestionTypeSelect 
            questionTypes={questionTypes}
            value={formQuestion.typeQuestion}
            onChange={(typeId) => updateFormQuestion({
              typeQuestion: typeId
            })}
          />

          {/* Render answers input only if question type is selected */}
          {formQuestion.typeQuestion && (
            <AnswersInput
              answers={answers}
              correctAnswer={correctAnswer}
              correctAnswers={correctAnswers}
              questionType={questionTypeLabel}
              onAnswersChange={setAnswers}
              onCorrectAnswerChange={setCorrectAnswer}
              onCorrectAnswersChange={setCorrectAnswers}
            />
          )}

          <FileUploadField 
            onFileChange={handleFileChange}
            currentFileType={formQuestion.type_fichier}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DurationSelect 
              value={formQuestion.temps}
              onChange={(duration) => updateFormQuestion({
                temps: duration
              })}
            />

            <PointsSelect 
              points={points}
              value={formQuestion.point}
              onChange={(pointId) => updateFormQuestion({
                point: pointId
              })}
            />
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Switch
              id="limite_response"
              checked={formQuestion.limite_response}
              onCheckedChange={(checked) => updateFormQuestion({
                limite_response: checked
              })}
            />
            <div className="space-y-1">
              <Label htmlFor="limite_response" className="text-base font-medium">
                ⏱️ Activer le chronomètre
              </Label>
              <p className="text-sm text-gray-500">
                Les apprenants auront une limite de temps pour répondre à cette question
              </p>
            </div>
          </div>

          <SubmitQuestionButton isLoading={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
}


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
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [shortAnswer, setShortAnswer] = useState<string>('');

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    // Déterminer le type de question
    const selectedQuestionType = questionTypes.find(type => type._id === formQuestion.typeQuestion);
    const questionTypeLibelle = selectedQuestionType?.libelle;

    let finalAnswers: string[] = [];
    let finalCorrectAnswer: number | string = 0;

    switch (questionTypeLibelle) {
      case 'CHOIX_MULTIPLE':
        if (correctAnswers.length === 0) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswers[0]; // Pour compatibilité, on prend le premier
        break;
      
      case 'CHOIX_UNIQUE':
        if (correctAnswer === null) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswer;
        break;
      
      case 'REPONSE_COURTE':
        if (!shortAnswer.trim()) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = [shortAnswer];
        finalCorrectAnswer = 0;
        break;
      
      default:
        return;
    }

    await handleFormSubmit(
      (question) => {
        onQuestionAdded(question);
        setAnswers(['', '']);
        setCorrectAnswer(null);
        setCorrectAnswers([]);
        setShortAnswer('');
      },
      finalAnswers,
      typeof finalCorrectAnswer === 'number' ? finalCorrectAnswer : 0
    );
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {t('game.questionForm')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleAddQuestion} className="space-y-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DurationSelect 
              value={formQuestion.temps}
              onChange={(duration) => updateFormQuestion({
                temps: duration
              })}
            />

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Switch
                id="limite_response"
                checked={formQuestion.limite_response}
                onCheckedChange={(checked) => updateFormQuestion({
                  limite_response: checked
                })}
              />
              <Label htmlFor="limite_response" className="text-base font-medium">
                {t('form.enableTimer')}
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuestionTypeSelect 
              questionTypes={questionTypes}
              value={formQuestion.typeQuestion}
              onChange={(typeId) => {
                updateFormQuestion({ typeQuestion: typeId });
                // Reset des réponses quand on change de type
                setAnswers(['', '']);
                setCorrectAnswer(null);
                setCorrectAnswers([]);
                setShortAnswer('');
              }}
            />

            <PointsSelect 
              points={points}
              value={formQuestion.point}
              onChange={(pointId) => updateFormQuestion({
                point: pointId
              })}
            />
          </div>

          <div className="border-t pt-6">
            <AnswersInput
              questionType={formQuestion.typeQuestion}
              questionTypes={questionTypes}
              answers={answers}
              correctAnswer={correctAnswer}
              correctAnswers={correctAnswers}
              shortAnswer={shortAnswer}
              onAnswersChange={setAnswers}
              onCorrectAnswerChange={setCorrectAnswer}
              onCorrectAnswersChange={setCorrectAnswers}
              onShortAnswerChange={setShortAnswer}
            />
          </div>

          <div className="pt-6 border-t">
            <SubmitQuestionButton isLoading={isSubmitting} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

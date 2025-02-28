
import { Question, QuestionType, Point } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileUploadField } from './form/FileUploadField';
import { DurationSelect } from './form/DurationSelect';
import { PointsSelect } from './form/PointsSelect';
import { QuestionTypeSelect } from './form/QuestionTypeSelect';
import { AnswersInput } from './form/AnswersInput';
import { SubmitQuestionButton } from './form/SubmitQuestionButton';
import { useQuestionForm } from './form/useQuestionForm';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const {
    isLoading,
    currentQuestion,
    setCurrentQuestion,
    selectedFile,
    handleFileChange,
    answers,
    setAnswers,
    correctAnswer,
    setCorrectAnswer,
    handleAddQuestion
  } = useQuestionForm({ gameId, token, onQuestionAdded });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une question</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddQuestion} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="libelle">Question</Label>
            <Input
              id="libelle"
              value={currentQuestion.libelle}
              onChange={(e) => setCurrentQuestion({
                ...currentQuestion,
                libelle: e.target.value
              })}
              placeholder="Entrez votre question"
              required
            />
          </div>

          <FileUploadField 
            onFileChange={handleFileChange}
            currentFileType={currentQuestion.type_fichier}
          />

          <DurationSelect 
            value={currentQuestion.temps}
            onChange={(duration) => setCurrentQuestion({
              ...currentQuestion,
              temps: duration
            })}
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="limite_response"
              checked={currentQuestion.limite_response}
              onCheckedChange={(checked) => setCurrentQuestion({
                ...currentQuestion,
                limite_response: checked
              })}
            />
            <Label htmlFor="limite_response">Activer le chrono</Label>
          </div>

          <QuestionTypeSelect 
            questionTypes={questionTypes}
            value={currentQuestion.typeQuestion}
            onChange={(typeId) => setCurrentQuestion({
              ...currentQuestion,
              typeQuestion: typeId
            })}
          />

          <PointsSelect 
            points={points}
            value={currentQuestion.point}
            onChange={(pointId) => setCurrentQuestion({
              ...currentQuestion,
              point: pointId
            })}
          />

          <AnswersInput
            answers={answers}
            correctAnswer={correctAnswer}
            onAnswersChange={setAnswers}
            onCorrectAnswerChange={setCorrectAnswer}
          />

          <SubmitQuestionButton isLoading={isLoading} />
        </form>
      </CardContent>
    </Card>
  );
}

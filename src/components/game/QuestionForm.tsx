
import { useState } from 'react';
import { Question, QuestionType, Point } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { FileUploadField } from './form/FileUploadField';
import { DurationSelect } from './form/DurationSelect';
import { PointsSelect } from './form/PointsSelect';
import { QuestionTypeSelect } from './form/QuestionTypeSelect';
import { AnswersInput } from './form/AnswersInput';
import { SubmitQuestionButton } from './form/SubmitQuestionButton';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    libelle: '',
    temps: 30,
    limite_response: true,
    typeQuestion: '',
    point: '',
    jeu: gameId,
    type_fichier: ''
  });

  // State for answers management
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleFileChange = (file: File | null, fileType: string) => {
    setSelectedFile(file);
    setCurrentQuestion(prev => ({
      ...prev,
      type_fichier: fileType
    }));
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!currentQuestion.libelle.trim()) {
      toast.error("Veuillez saisir une question");
      return;
    }

    // Validate answers (now handled by AnswersInput component)
    if (answers.some(answer => !answer.trim())) {
      toast.error("Toutes les réponses doivent être remplies");
      return;
    }

    if (correctAnswer === null) {
      toast.error("Veuillez sélectionner une réponse correcte");
      return;
    }

    if (!currentQuestion.typeQuestion) {
      toast.error("Veuillez sélectionner un type de question");
      return;
    }

    if (!currentQuestion.point) {
      toast.error("Veuillez sélectionner les points");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(currentQuestion).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // Add answers and correct answer to form data
      formData.append('reponses', JSON.stringify(answers));
      formData.append('reponse_correcte', answers[correctAnswer]);

      if (selectedFile) {
        formData.append('fichier', selectedFile);
      }

      const response = await fetch('http://kahoot.nos-apps.com/api/questions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la question');
      }

      const data = await response.json();
      onQuestionAdded(data);
      
      // Reset form
      setCurrentQuestion({
        libelle: '',
        temps: 30,
        limite_response: true,
        typeQuestion: '',
        point: '',
        jeu: gameId,
        type_fichier: ''
      });
      setSelectedFile(null);
      setAnswers(['', '']);
      setCorrectAnswer(null);
      
      toast.success("Question ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la question");
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* Using the new AnswersInput component */}
          <AnswersInput
            answers={answers}
            correctAnswer={correctAnswer}
            onAnswersChange={setAnswers}
            onCorrectAnswerChange={setCorrectAnswer}
          />

          {/* Using the new SubmitQuestionButton component */}
          <SubmitQuestionButton isLoading={isLoading} />
        </form>
      </CardContent>
    </Card>
  );
}

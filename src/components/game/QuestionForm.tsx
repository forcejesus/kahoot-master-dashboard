
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

    // Validate answers
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

      // Ajouter le fichier si présent
      if (selectedFile) {
        formData.append('fichier', selectedFile);
      }

      // 1. Envoyer d'abord la question pour obtenir son ID
      const questionResponse = await fetch('http://kahoot.nos-apps.com/api/questions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!questionResponse.ok) {
        throw new Error('Erreur lors de l\'ajout de la question');
      }

      const questionData = await questionResponse.json();
      const questionId = questionData._id || questionData.data?._id;

      if (!questionId) {
        throw new Error('ID de question non trouvé dans la réponse');
      }

      // 2. Envoyer les réponses en utilisant l'ID de la question
      const answersPromises = answers.map(async (answer, index) => {
        const isCorrect = index === correctAnswer;
        
        const responseData = {
          file: "Image vers le fichier image", // Format demandé
          etat: isCorrect ? 1 : 0,
          question: questionId,
          reponse_texte: answer
        };

        return fetch('http://kahoot.nos-apps.com/api/reponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(responseData)
        });
      });

      await Promise.all(answersPromises);
      
      // Mise à jour de la question avec les nouvelles réponses
      onQuestionAdded({
        ...questionData,
        reponses: answers,
        reponse_correcte: answers[correctAnswer]
      });
      
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
      
      toast.success("Question et réponses ajoutées avec succès");
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de l'ajout de la question et des réponses");
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

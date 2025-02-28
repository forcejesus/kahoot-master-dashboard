
import { useState } from 'react';
import { Question, QuestionType, Point } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { FileUploadField } from './form/FileUploadField';
import { DurationSelect } from './form/DurationSelect';
import { PointsSelect } from './form/PointsSelect';
import { QuestionTypeSelect } from './form/QuestionTypeSelect';

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

  // New state for answers management
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleFileChange = (file: File | null, fileType: string) => {
    setSelectedFile(file);
    setCurrentQuestion(prev => ({
      ...prev,
      type_fichier: fileType
    }));
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    if (correctAnswer === index) {
      setCorrectAnswer(null);
    } else if (correctAnswer !== null && correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSetCorrectAnswer = (index: number) => {
    setCorrectAnswer(index);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate answers
    if (answers.some(answer => !answer.trim())) {
      toast.error("Toutes les réponses doivent être remplies");
      return;
    }

    if (correctAnswer === null) {
      toast.error("Veuillez sélectionner une réponse correcte");
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

          {/* Answers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Réponses</Label>
              {answers.length < 4 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddAnswer}
                >
                  <Plus className="h-4 w-4 mr-1" /> Ajouter une réponse
                </Button>
              )}
            </div>
            
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className={`flex-grow flex items-center p-3 rounded-md border ${
                    correctAnswer === index ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <Input
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Réponse ${index + 1}`}
                    className="border-0 focus-visible:ring-0 p-0"
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant={correctAnswer === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleSetCorrectAnswer(index)}
                  className={correctAnswer === index ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  <Check className="h-4 w-4" />
                </Button>
                {answers.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveAnswer(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ajout en cours...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter la question
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

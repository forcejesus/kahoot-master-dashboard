
import { useState, useRef } from 'react';
import { Question, QuestionType, Point } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Détecter automatiquement le type de fichier
      const fileType = file.type.split('/')[1]?.toLowerCase();
      setCurrentQuestion(prev => ({
        ...prev,
        type_fichier: fileType === 'jpeg' ? 'jpg' : fileType
      }));
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(currentQuestion).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
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

          <div className="space-y-2">
            <Label htmlFor="fichier">Fichier média (optionnel)</Label>
            <Input
              id="fichier"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.gif"
              className="cursor-pointer"
            />
            {currentQuestion.type_fichier && (
              <div className="text-sm text-muted-foreground">
                Type de fichier détecté : {currentQuestion.type_fichier}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="temps">Durée (secondes)</Label>
            <Select
              value={currentQuestion.temps.toString()}
              onValueChange={(value) => setCurrentQuestion({
                ...currentQuestion,
                temps: parseInt(value)
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la durée" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 12}, (_, i) => (i + 1) * 5).map(seconds => (
                  <SelectItem key={seconds} value={seconds.toString()}>
                    {seconds} secondes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="typeQuestion">Type de question</Label>
            <Select
              value={currentQuestion.typeQuestion}
              onValueChange={(value) => setCurrentQuestion({
                ...currentQuestion,
                typeQuestion: value
              })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map(type => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.libelle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="point">Points accordés</Label>
            <Select
              value={currentQuestion.point}
              onValueChange={(value) => setCurrentQuestion({
                ...currentQuestion,
                point: value
              })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez les points" />
              </SelectTrigger>
              <SelectContent>
                {points.map(point => (
                  <SelectItem key={point._id} value={point._id}>
                    {point.valeur} points
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

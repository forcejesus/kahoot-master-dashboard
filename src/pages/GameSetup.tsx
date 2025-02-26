
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

interface Question {
  libelle: string;
  type_fichier?: string;
  temps: number;
  limite_response: boolean;
  typeQuestion: string;
  point: string;
  jeu: string;
}

interface QuestionType {
  _id: string;
  libelle: string;
}

interface Point {
  _id: string;
  valeur: number;
}

export default function GameSetup() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = location.state?.gameId;
  const gameTitle = location.state?.gameTitle;
  const gameImage = location.state?.gameImage;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    libelle: '',
    temps: 30,
    limite_response: true,
    typeQuestion: '',
    point: '',
    jeu: gameId || ''
  });

  useEffect(() => {
    if (!gameId) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [typesResponse, pointsResponse] = await Promise.all([
          fetch('http://kahoot.nos-apps.com/api/questions', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://kahoot.nos-apps.com/api/points', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const typesData = await typesResponse.json();
        const pointsData = await pointsResponse.json();

        setQuestionTypes(typesData.data);
        setPoints(pointsData.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, [gameId, token, navigate]);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://kahoot.nos-apps.com/api/questions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentQuestion)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la question');
      }

      const data = await response.json();
      setQuestions([...questions, data]);
      
      // Reset form for next question
      setCurrentQuestion({
        libelle: '',
        temps: 30,
        limite_response: true,
        typeQuestion: '',
        point: '',
        jeu: gameId
      });
      
      toast.success("Question ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Configuration du jeu : {gameTitle}
            </CardTitle>
          </CardHeader>
          {gameImage && (
            <CardContent>
              <img 
                src={gameImage} 
                alt={gameTitle} 
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </CardContent>
          )}
        </Card>

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
                <Label htmlFor="type_fichier">Type de fichier (optionnel)</Label>
                <Select
                  value={currentQuestion.type_fichier}
                  onValueChange={(value) => setCurrentQuestion({
                    ...currentQuestion,
                    type_fichier: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="gif">GIF</SelectItem>
                  </SelectContent>
                </Select>
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

        {questions.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Questions ajoutées ({questions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-white">
                    <p className="font-medium">{question.libelle}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Durée : {question.temps} secondes | 
                      Chrono : {question.limite_response ? "Oui" : "Non"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}


import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Question, QuestionType, Point } from '@/types/game';
import { QuestionForm } from '@/components/game/QuestionForm';
import { QuestionsList } from '@/components/game/QuestionsList';
import { Clock, Users, Trophy, BookOpen } from 'lucide-react';

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

  useEffect(() => {
    if (!gameId) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [typesResponse, pointsResponse] = await Promise.all([
          fetch('http://kahoot.nos-apps.com/api/type-question', {
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

  const handleQuestionAdded = (question: Question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Game Title and Image Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Configuration du jeu : {gameTitle}
            </CardTitle>
          </CardHeader>
          {gameImage && (
            <CardContent>
              <img 
                src={`http://kahoot.nos-apps.com/${gameImage}`}
                alt={gameTitle} 
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </CardContent>
          )}
        </Card>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{questions.length}</div>
                <div className="text-sm text-muted-foreground">
                  Questions créées
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Temps total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {questions.reduce((acc, q) => acc + (q.temps || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Secondes au total
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Points totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {points.length > 0 ? Math.max(...points.map(p => p.valeur)) * questions.length : 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Points maximum possibles
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Users className="h-5 w-5" />
                Types de questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{questionTypes.length}</div>
                <div className="text-sm text-muted-foreground">
                  Types disponibles
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <QuestionForm 
          gameId={gameId}
          token={token}
          questionTypes={questionTypes}
          points={points}
          onQuestionAdded={handleQuestionAdded}
        />

        <QuestionsList questions={questions} />
      </main>
    </div>
  );
}

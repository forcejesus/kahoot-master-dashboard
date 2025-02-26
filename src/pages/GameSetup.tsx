
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Question, QuestionType, Point } from '@/types/game';
import { QuestionForm } from '@/components/game/QuestionForm';
import { QuestionsList } from '@/components/game/QuestionsList';

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

  const handleQuestionAdded = (question: Question) => {
    setQuestions([...questions, question]);
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

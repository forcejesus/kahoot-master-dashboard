
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionsView } from '@/components/game/QuestionsView';
import { QuestionForm } from '@/components/game/QuestionForm';
import { buildApiUrl } from '@/config/api';
import { QuestionType, Point } from '@/types/game';

interface GameCreationStep2Props {
  gameId: string | null;
  gameTitle: string;
  onNext: () => void;
  onPrevious: () => void;
  token: string | null;
}

export function GameCreationStep2({ gameId, gameTitle, onNext, onPrevious, token }: GameCreationStep2Props) {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [questionsRefreshTrigger, setQuestionsRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, pointsResponse] = await Promise.all([
          fetch(buildApiUrl('/api/type-question'), {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(buildApiUrl('/api/points'), {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const typesData = await typesResponse.json();
        const pointsData = await pointsResponse.json();

        setQuestionTypes(typesData.data || []);
        setPoints(pointsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleQuestionAdded = () => {
    setQuestionsRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Questions & Réponses
        </h2>
        <p className="text-gray-600">
          Ajoutez les questions pour votre jeu "{gameTitle}"
        </p>
      </div>

      {/* Questions existantes */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Questions ajoutées</h3>
        <QuestionsView 
          gameId={gameId}
          token={token}
          refreshTrigger={questionsRefreshTrigger}
        />
      </div>

      {/* Formulaire d'ajout de question */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Ajouter une nouvelle question</h3>
        <QuestionForm 
          gameId={gameId}
          token={token}
          questionTypes={questionTypes}
          points={points}
          onQuestionAdded={handleQuestionAdded}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="px-6 h-12 border-2 border-orange-200 hover:bg-orange-50 text-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Précédent
        </Button>
        
        <Button 
          onClick={onNext}
          className="px-6 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continuer
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

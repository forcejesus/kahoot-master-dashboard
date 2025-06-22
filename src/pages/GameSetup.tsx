import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Question, QuestionType, Point } from '@/types/game';
import { QuestionForm } from '@/components/game/QuestionForm';
import { QuestionsList } from '@/components/game/QuestionsList';
import { ArrowLeft, Settings, Image as ImageIcon } from 'lucide-react';
import { createApiClient } from '@/lib/api';

export default function GameSetup() {
  const { token } = useAuth();
  const { t } = useTranslation();
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
        const api = createApiClient(token);
        
        const [typesData, pointsData] = await Promise.all([
          api.get('/type-question'),
          api.get('/points')
        ]);

        setQuestionTypes(typesData.data);
        setPoints(pointsData.data);
      } catch (error) {
        toast.error(t('error.loadingFailed'));
      }
    };

    fetchData();
  }, [gameId, token, navigate, t]);

  const handleQuestionAdded = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm"
            onClick={handleBackToDashboard}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('game.backToDashboard')}
          </Button>
        </div>
        
        {/* En-tête du jeu */}
        <Card className="mb-8 overflow-hidden shadow-xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {t('game.configuration')} 
                </CardTitle>
                <p className="text-xl font-semibold text-blue-100 mt-1">
                  {gameTitle}
                </p>
              </div>
            </div>
          </CardHeader>
          {gameImage && (
            <CardContent className="p-6">
              <div className="flex justify-center">
                <div className="relative group">
                  <img 
                    src={`http://kahoot.nos-apps.com/${gameImage}`}
                    alt={gameTitle} 
                    className="max-w-md w-full h-48 object-cover rounded-xl shadow-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-white/0 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Grille principale */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Formulaire de création de question */}
          <div className="xl:col-span-2">
            <QuestionForm 
              gameId={gameId}
              token={token}
              questionTypes={questionTypes}
              points={points}
              onQuestionAdded={handleQuestionAdded}
            />
          </div>

          {/* Liste des questions (sidebar sur desktop) */}
          <div className="xl:col-span-1">
            <QuestionsList questions={questions} />
          </div>
        </div>
      </main>
    </div>
  );
}

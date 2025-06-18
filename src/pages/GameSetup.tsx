
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Question, QuestionType, Point } from '@/types/game';
import { QuestionForm } from '@/components/game/QuestionForm';
import { QuestionsList } from '@/components/game/QuestionsList';
import { ArrowLeft, Settings, Image as ImageIcon } from 'lucide-react';

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
    <Layout>
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button 
            variant="outline" 
            className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300"
            onClick={handleBackToDashboard}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('game.backToDashboard')}
          </Button>
          
          <Card className="mb-8 overflow-hidden shadow-sm border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {t('game.configuration')} 
                  </CardTitle>
                  <p className="text-xl font-semibold text-blue-600 mt-1">
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
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-0 p-6 hover:bg-white/90 transition-all duration-300 h-fit">
              <QuestionForm 
                gameId={gameId}
                token={token}
                questionTypes={questionTypes}
                points={points}
                onQuestionAdded={handleQuestionAdded}
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-0 p-6 hover:bg-white/90 transition-all duration-300 h-fit">
              <QuestionsList questions={questions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

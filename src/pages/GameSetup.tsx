
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
import { ModernBackground } from '@/components/shared/ModernBackground';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <ModernBackground />
      <Navbar />
      
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white hover:border-white/50 transition-all duration-300 shadow-2xl text-slate-700"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('game.backToDashboard')}
            </Button>
            
            {/* Game Info Header */}
            <Card className="mb-8 overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/15 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white backdrop-blur-sm">
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
                <CardContent className="p-6 bg-white/5">
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
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              
              {/* Left Column - Question Form */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 h-full overflow-y-auto">
                  <QuestionForm 
                    gameId={gameId}
                    token={token}
                    questionTypes={questionTypes}
                    points={points}
                    onQuestionAdded={handleQuestionAdded}
                  />
                </div>
              </div>

              {/* Right Column - Questions List */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 h-full overflow-y-auto">
                  <QuestionsList questions={questions} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

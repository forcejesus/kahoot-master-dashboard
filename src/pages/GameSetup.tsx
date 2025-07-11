import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Question, QuestionType, Point } from '@/types/game';
import { QuestionForm } from '@/components/game/QuestionForm';
import { QuestionsList } from '@/components/game/QuestionsList';
import { GameDetailsEditor } from '@/components/game/GameDetailsEditor';
import { ArrowLeft, BookOpen, Users, GraduationCap } from 'lucide-react';
import { buildApiUrl } from '@/config/api';
import { QuestionsView } from '@/components/game/QuestionsView';

export default function GameSetup() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log('GameSetup - location.state:', location.state);
  
  const gameId = location.state?.gameId;
  const [gameTitle, setGameTitle] = useState(location.state?.gameTitle || '');
  const [gameImage, setGameImage] = useState(location.state?.gameImage);

  console.log('GameSetup - gameId:', gameId, 'gameTitle:', gameTitle);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [questionsRefreshTrigger, setQuestionsRefreshTrigger] = useState(0);

  useEffect(() => {
    console.log('GameSetup useEffect - gameId:', gameId);
    
    if (!gameId) {
      console.log('No gameId found, redirecting to dashboard');
      toast.error("Aucun jeu sélectionné");
      navigate('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching question types and points...');
        
        const [typesResponse, pointsResponse] = await Promise.all([
          fetch(buildApiUrl('/api/type-question'), {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(buildApiUrl('/api/points'), {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        console.log('Types response status:', typesResponse.status);
        console.log('Points response status:', pointsResponse.status);

        const typesData = await typesResponse.json();
        const pointsData = await pointsResponse.json();

        console.log('Types data:', typesData);
        console.log('Points data:', pointsData);

        setQuestionTypes(typesData.data || []);
        setPoints(pointsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, [gameId, token, navigate]);

  const handleQuestionAdded = (question: Question) => {
    setQuestions([...questions, question]);
    // Trigger refresh of the questions view
    setQuestionsRefreshTrigger(prev => prev + 1);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGameDetailsUpdate = (newTitle: string, newImage?: string) => {
    setGameTitle(newTitle);
    if (newImage) {
      setGameImage(newImage);
    }
  };

  if (!gameId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p>Redirection vers le tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond avec motifs et gradients - même style que Login */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"></div>
      
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Icônes éducatives flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-1/4 left-1/4 w-8 h-8 text-white/20 animate-pulse" />
        <Users className="absolute top-1/3 right-1/4 w-6 h-6 text-white/20 animate-pulse delay-1000" />
        <GraduationCap className="absolute bottom-1/3 left-1/3 w-7 h-7 text-white/20 animate-pulse delay-500" />
        <BookOpen className="absolute bottom-1/4 right-1/3 w-5 h-5 text-white/20 animate-pulse delay-1500" />
      </div>

      <Navbar />
      
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            variant="outline" 
            className="mb-6 bg-white/90 hover:bg-white border-white/50 text-orange-600 hover:text-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            onClick={handleBackToDashboard}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
          
          {/* Game Title and Image Card */}
          <div className="relative mb-8">
            {/* Effet de profondeur */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
            
            <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl">
              <CardHeader className="text-center">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent blur-sm">
                      <CardTitle className="text-4xl md:text-5xl font-black tracking-tight">
                        Configuration du jeu
                      </CardTitle>
                    </div>
                    <CardTitle className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                      Configuration du jeu
                    </CardTitle>
                  </div>
                  
                  {/* Ligne décorative */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                    <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
                  </div>
                  
                  <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200/50 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-orange-700 font-bold text-xl tracking-wide">
                        {gameTitle || 'Nouveau jeu'}
                      </span>
                      <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              {gameImage && (
                <CardContent className="text-center pb-8">
                  <img 
                    src={`${buildApiUrl('')}/${gameImage}`}
                    alt={gameTitle || 'Image du jeu'} 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                </CardContent>
              )}
            </Card>
          </div>

          <div className="space-y-8">
            {/* Game Details Editor */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
              
              <div className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl p-8">
                <GameDetailsEditor
                  gameId={gameId}
                  currentTitle={gameTitle}
                  currentImage={gameImage}
                  token={token}
                  onUpdate={handleGameDetailsUpdate}
                />
              </div>
            </div>

            {/* Questions View */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
              
              <div className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl p-8">
                <QuestionsView 
                  gameId={gameId}
                  token={token}
                  refreshTrigger={questionsRefreshTrigger}
                />
              </div>
            </div>

            {/* Question Form */}
            <div className="relative">
              {/* Effet de profondeur pour le formulaire */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
              
              <div className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl p-8">
                <QuestionForm 
                  gameId={gameId}
                  token={token}
                  questionTypes={questionTypes}
                  points={points}
                  onQuestionAdded={handleQuestionAdded}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

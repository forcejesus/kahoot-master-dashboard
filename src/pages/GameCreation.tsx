
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, GamepadIcon, BookOpen, Users, GraduationCap, Sparkles, Star } from 'lucide-react';
import { GameCreationStep1 } from '@/components/game/creation/GameCreationStep1';
import { GameCreationStep2 } from '@/components/game/creation/GameCreationStep2';
import { GameCreationStep3 } from '@/components/game/creation/GameCreationStep3';

export default function GameCreation() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [gameData, setGameData] = useState({
    id: null,
    titre: '',
    description: '',
    niveau: '',
    theme: '',
    image: null as File | null,
  });

  const steps = [
    { number: 1, title: 'Création du jeu', description: 'Définissez les informations de base', icon: GamepadIcon },
    { number: 2, title: 'Questions & Réponses', description: 'Ajoutez vos questions', icon: BookOpen },
    { number: 3, title: 'Planification', description: 'Planifiez votre session (optionnel)', icon: Users },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGameCreated = (gameId: string, gameTitle: string) => {
    setGameData(prev => ({ ...prev, id: gameId, titre: gameTitle }));
    handleNext();
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden animate-slide-down">
      {/* Fond avec motifs ludiques */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-500"></div>
      
      {/* Motifs décoratifs enfantins */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-green-300 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-300 rounded-full blur-xl animate-bounce delay-1000"></div>
      </div>

      {/* Étoiles flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-300/40 animate-pulse" />
        <Sparkles className="absolute top-1/3 right-1/4 w-5 h-5 text-pink-300/40 animate-pulse delay-1000" />
        <Star className="absolute bottom-1/3 left-1/3 w-7 h-7 text-blue-300/40 animate-pulse delay-500" />
        <Sparkles className="absolute bottom-1/4 right-1/3 w-4 h-4 text-green-300/40 animate-pulse delay-1500" />
        <BookOpen className="absolute top-1/5 right-1/5 w-8 h-8 text-purple-300/30 animate-pulse delay-700" />
        <GraduationCap className="absolute bottom-1/5 left-1/5 w-6 h-6 text-cyan-300/30 animate-pulse delay-300" />
      </div>

      <div className="relative z-10 min-h-screen p-6">
        {/* Header avec bouton retour animé */}
        <div className="mb-8 animate-slide-in">
          <Button 
            variant="outline" 
            className="bg-white/95 hover:bg-white border-white/70 text-purple-700 hover:text-purple-800 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm transform hover:scale-105 font-semibold"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>

        {/* Container principal */}
        <div className="max-w-5xl mx-auto">
          {/* Titre principal avec animation */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent blur-sm">
                <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                  🎮 Création de jeu
                </h1>
              </div>
              <h1 className="relative text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                🎮 Création de jeu
              </h1>
            </div>
            
            <p className="text-xl text-white/90 font-medium bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-lg">
              ✨ Donnez vie à vos idées pédagogiques ! ✨
            </p>
            
            {/* Ligne décorative animée */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="h-2 w-8 bg-gradient-to-r from-transparent to-purple-400 rounded-full animate-pulse"></div>
              <div className="h-2 w-16 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full shadow-lg animate-pulse delay-300"></div>
              <div className="h-2 w-8 bg-gradient-to-r from-cyan-400 to-transparent rounded-full animate-pulse delay-600"></div>
            </div>
          </div>

          {/* Stepper moderne */}
          <div className="relative mb-8 animate-slide-up">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105 shadow-2xl"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102 shadow-xl"></div>
            
            <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-purple-900/30 rounded-3xl p-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="mb-8">
                <Progress value={progressPercentage} className="h-4 bg-gray-200/50" />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Étape {currentStep} sur 3</span>
                  <span>{Math.round(progressPercentage)}% terminé</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center flex-1 relative">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-3 mb-4 transition-all duration-500 transform ${
                      step.number < currentStep 
                        ? 'bg-green-500 border-green-400 text-white shadow-lg scale-110' 
                        : step.number === currentStep 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400 text-white shadow-xl scale-125 animate-pulse' 
                          : 'bg-white border-gray-300 text-gray-400 hover:border-purple-300 hover:scale-105'
                    }`}>
                      {step.number < currentStep ? (
                        <Check className="h-8 w-8" />
                      ) : (
                        <step.icon className="h-8 w-8" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`font-bold text-lg ${
                        step.number <= currentStep ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    </div>
                    
                    {/* Ligne de connexion entre les étapes */}
                    {step.number < 3 && (
                      <div className={`absolute top-8 left-full w-full h-1 -ml-8 ${
                        step.number < currentStep ? 'bg-green-400' : 'bg-gray-300'
                      } transition-all duration-500`} style={{ zIndex: -1 }}></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Contenu des étapes avec animation */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105 shadow-2xl"></div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102 shadow-xl"></div>
            
            <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-purple-900/30 rounded-3xl transform hover:scale-[1.01] transition-all duration-300">
              <CardContent className="p-10">
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <GameCreationStep1 
                      gameData={gameData}
                      setGameData={setGameData}
                      onNext={handleGameCreated}
                      token={token}
                    />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="animate-slide-in">
                    <GameCreationStep2 
                      gameId={gameData.id}
                      gameTitle={gameData.titre}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      token={token}
                    />
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="animate-scale-in">
                    <GameCreationStep3 
                      gameId={gameData.id}
                      gameTitle={gameData.titre}
                      onFinish={handleFinish}
                      onPrevious={handlePrevious}
                      token={token}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Clock, CheckCircle } from 'lucide-react';
import { buildApiUrl } from '@/config/api';
import { toast } from 'sonner';

interface QuestionDetail {
  _id: string;
  libelle: string;
  temps: number;
  limite_response: boolean;
  typeQuestion: {
    _id: string;
    libelle: string;
  };
  point: {
    _id: string;
    valeur: number;
  };
  fichier?: string;
  type_fichier?: string;
  reponses: Array<{
    _id: string;
    etat: number;
    reponse_texte: string;
  }>;
}

interface QuestionsViewProps {
  gameId: string;
  token: string;
  refreshTrigger: number;
}

export function QuestionsView({ gameId, token, refreshTrigger }: QuestionsViewProps) {
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const fetchQuestions = async () => {
    try {
      const response = await fetch(buildApiUrl(`/api/questions/jeu/${gameId}/detailles`), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      setQuestions(data.data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error("Erreur lors du chargement des questions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameId && token) {
      fetchQuestions();
    }
  }, [gameId, token, refreshTrigger]);

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getQuestionTypeDisplayName = (libelle: string) => {
    switch (libelle) {
      case 'CHOIX_UNIQUE':
        return 'Choix unique';
      case 'CHOIX_MULTIPLE':
        return 'Choix multiples';
      case 'REPONSE_COURTE':
        return 'Réponse courte';
      default:
        return libelle;
    }
  };

  if (isLoading) {
    return (
      <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-orange-600">
            Questions du jeu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-600">Chargement des questions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-orange-600 flex items-center gap-2">
          Questions du jeu
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            {questions.length} question{questions.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">Aucune question n'a encore été ajoutée</p>
            <p className="text-sm">Utilisez le formulaire ci-dessus pour créer votre première question.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isExpanded = expandedQuestions.has(question._id);
              const correctAnswers = question.reponses.filter(r => r.etat === 1);
              
              return (
                <div key={question._id} className="border rounded-lg p-4 bg-white/80 hover:bg-white/90 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Question {index + 1}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          {getQuestionTypeDisplayName(question.typeQuestion.libelle)}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {question.point.valeur} points
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {question.libelle}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {question.temps}s
                        </div>
                        {question.limite_response && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Chrono activé
                          </div>
                        )}
                        {correctAnswers.length > 0 && (
                          <div className="text-green-600">
                            {correctAnswers.length} bonne{correctAnswers.length !== 1 ? 's' : ''} réponse{correctAnswers.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(question._id)}
                      className="shrink-0"
                    >
                      {isExpanded ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {question.fichier && (
                        <div className="mb-4">
                          <img 
                            src={`${buildApiUrl('')}/${question.fichier}`}
                            alt="Image de la question"
                            className="max-w-xs rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                      
                      {question.reponses.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Réponses :</h5>
                          <div className="space-y-2">
                            {question.reponses.map((reponse, rIndex) => (
                              <div 
                                key={reponse._id}
                                className={`p-3 rounded-md text-sm ${
                                  reponse.etat === 1 
                                    ? 'bg-green-50 border border-green-200 text-green-800' 
                                    : 'bg-gray-50 border border-gray-200 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {reponse.etat === 1 && (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  )}
                                  <span>{reponse.reponse_texte}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

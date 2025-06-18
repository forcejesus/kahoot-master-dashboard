
import { Question } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface QuestionsListProps {
  questions: Question[];
}

export function QuestionsList({ questions }: QuestionsListProps) {
  if (questions.length === 0) return null;

  const isResponseCorrect = (response: string, question: Question) => {
    return response === question.reponse_correcte;
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Questions ajoutées ({questions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="p-4 rounded-lg border bg-white">
              <p className="font-medium">{question.libelle}</p>
              
              {/* Display answers if available */}
              {question.reponses && question.reponses.length > 0 && (
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {question.reponses.map((reponse, rIndex) => {
                    const isCorrect = isResponseCorrect(reponse, question);
                    return (
                      <div 
                        key={rIndex}
                        className={`text-sm p-3 rounded-lg border transition-colors ${
                          isCorrect
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{reponse}</span>
                          {isCorrect && (
                            <Badge variant="outline" className="bg-green-200 text-green-800 border-green-300">
                              <Check className="w-3 h-3 mr-1" />
                              Correcte
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                Durée : {question.temps} secondes | 
                Chrono : {question.limite_response ? "Oui" : "Non"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

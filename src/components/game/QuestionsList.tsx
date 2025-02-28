
import { Question } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionsListProps {
  questions: Question[];
}

export function QuestionsList({ questions }: QuestionsListProps) {
  if (questions.length === 0) return null;

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
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {question.reponses.map((reponse, rIndex) => (
                    <div 
                      key={rIndex}
                      className={`text-sm p-2 rounded ${
                        reponse === question.reponse_correcte
                          ? 'bg-green-100 border-green-200 border'
                          : 'bg-gray-50 border-gray-100 border'
                      }`}
                    >
                      {reponse}
                      {reponse === question.reponse_correcte && (
                        <span className="ml-2 text-green-600 font-medium">✓</span>
                      )}
                    </div>
                  ))}
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

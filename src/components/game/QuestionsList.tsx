
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
              <p className="text-sm text-gray-500 mt-1">
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

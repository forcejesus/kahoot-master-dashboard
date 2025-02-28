
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/game-details";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionCard } from "./QuestionCard";

interface QuestionsDisplayProps {
  questions?: Question[];
}

export function QuestionsDisplay({ questions }: QuestionsDisplayProps) {
  const { token } = useAuth();

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {questions && questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <QuestionCard 
                key={question._id || index}
                question={question}
                index={index}
                token={token}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucune question n'a encore été ajoutée à ce jeu.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

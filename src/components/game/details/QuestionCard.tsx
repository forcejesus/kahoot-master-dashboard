
import { Question } from "@/types/game-details";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionImage } from "./QuestionImage";
import { QuestionResponses } from "./QuestionResponses";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
}

export function QuestionCard({ question, index, token }: QuestionCardProps) {
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  console.log("Question complète:", question);
  console.log("Structure des réponses:", question.reponses);
  
  if (Array.isArray(question.reponses) && question.reponses.length > 0) {
    console.log("Premier élément de réponse:", question.reponses[0]);
    if (typeof question.reponses[0] === 'object') {
      console.log("Propriétés de la réponse:", Object.keys(question.reponses[0]));
    }
  }

  // Toujours utiliser le nouveau format de réponse
  const isNewResponseFormat = true;

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <QuestionHeader question={question} index={index} />
      
      <CardContent className="space-y-4 pt-4">
        <QuestionImage imageUrl={imageUrl} index={index} />
        <QuestionResponses 
          question={question} 
          isNewResponseFormat={isNewResponseFormat} 
        />
      </CardContent>
    </Card>
  );
}

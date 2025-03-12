
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
  // Get the image URL
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  // Check if responses is an array of complete objects (with properties like etat, reponse_texte)
  const isNewResponseFormat = 
    question.reponses && 
    Array.isArray(question.reponses) &&
    question.reponses.length > 0 && 
    typeof question.reponses[0] === 'object' &&
    (question.reponses[0] as any).reponse_texte !== undefined;

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <QuestionHeader question={question} index={index} />
      
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        <QuestionImage imageUrl={imageUrl} index={index} />
        
        {/* Question Answers with Expanded Details */}
        <QuestionResponses 
          question={question} 
          isNewResponseFormat={isNewResponseFormat} 
        />
      </CardContent>
    </Card>
  );
}

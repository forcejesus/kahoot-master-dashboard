
import { Question } from "@/types/game-details";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionImage } from "./QuestionImage";
import { QuestionResponses } from "./QuestionResponses";
import { QuestionDetails } from "./QuestionDetails";

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

  // Check if reponses is an array of objects (new format) or array of strings (old format)
  const isNewResponseFormat = question.reponses && 
    question.reponses.length > 0 && 
    typeof question.reponses[0] !== 'string';

  // Debug the response format to console
  useEffect(() => {
    console.log(`Question ${index + 1} responses:`, question.reponses);
    console.log(`Question ${index + 1} format:`, isNewResponseFormat ? "New Object Format" : "Old String Format");
  }, [question, index, isNewResponseFormat]);

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
        
        {/* Question details */}
        <QuestionDetails question={question} />
      </CardContent>
    </Card>
  );
}

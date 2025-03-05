
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

  // Vérifier si reponses est un tableau d'objets (nouveau format) ou un tableau de chaînes (ancien format)
  const isNewResponseFormat = question.reponses && 
    question.reponses.length > 0 && 
    typeof question.reponses[0] !== 'string' &&
    typeof question.reponses[0] === 'object';

  // Debug le format de réponse dans la console
  useEffect(() => {
    console.log(`Question ${index + 1} - Question complète:`, question);
    console.log(`Question ${index + 1} - Réponses:`, question.reponses);
    console.log(`Question ${index + 1} - Format:`, isNewResponseFormat ? "Nouveau format" : "Ancien format");
    
    // Vérifier la première réponse pour voir si elle a reponse_texte
    if (question.reponses && question.reponses.length > 0) {
      console.log(`Première réponse:`, question.reponses[0]);
      if (isNewResponseFormat) {
        // @ts-ignore - Nous savons que c'est un objet à ce stade
        console.log(`Texte de la première réponse:`, question.reponses[0].reponse_texte);
      }
    }
  }, [question, index, isNewResponseFormat]);

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <QuestionHeader question={question} index={index} />
      
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        <QuestionImage imageUrl={imageUrl} index={index} />
        
        {/* Question Details */}
        <QuestionDetails question={question} />
        
        {/* Question Answers with Expanded Details */}
        <QuestionResponses 
          question={question} 
          isNewResponseFormat={isNewResponseFormat} 
        />
      </CardContent>
    </Card>
  );
}

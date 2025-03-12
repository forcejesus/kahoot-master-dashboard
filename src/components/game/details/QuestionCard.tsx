
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
  // Obtenir l'URL de l'image
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  // Vérifier si les réponses sont dans le nouveau format (tableau d'objets avec propriétés)
  const determineResponseFormat = () => {
    if (!question.reponses || !Array.isArray(question.reponses) || question.reponses.length === 0) {
      return false;
    }
    
    const firstResponse = question.reponses[0];
    
    // Vérifier si c'est un objet avec la propriété etat ou reponse_texte
    if (typeof firstResponse === 'object' && firstResponse !== null) {
      return true; // C'est un nouveau format si c'est un objet
    }
    
    return false;
  };
  
  const isNewResponseFormat = determineResponseFormat();

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

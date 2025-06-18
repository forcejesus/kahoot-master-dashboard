
import { Question } from "@/types/game-details";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionImage } from "./QuestionImage";
import { QuestionResponses } from "./QuestionResponses";
import { EditQuestionDialog } from "../edit/EditQuestionDialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
  onRefresh?: () => void;
}

export function QuestionCard({ question, index, token, onRefresh }: QuestionCardProps) {
  // Obtenir l'URL de l'image
  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  // Vérifier si les réponses sont dans le nouveau format (tableau d'objets avec propriétés)
  // Ou si ce sont des IDs MongoDB (chaînes longues)
  const determineResponseFormat = (): boolean => {
    if (!question.reponses || !Array.isArray(question.reponses) || question.reponses.length === 0) {
      return false;
    }
    
    const firstResponse = question.reponses[0];
    
    // Si c'est un objet avec propriétés spécifiques, c'est le nouveau format
    if (typeof firstResponse === 'object' && firstResponse !== null) {
      return true;
    }
    
    // Si c'est un ID MongoDB (chaîne de plus de 20 caractères), considérer comme nouveau format
    if (typeof firstResponse === 'string' && firstResponse.length > 20) {
      return true;
    }
    
    // Sinon c'est l'ancien format (tableau de chaînes courtes)
    return false;
  };
  
  const isNewResponseFormat = determineResponseFormat();

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between p-4 border-b">
        <QuestionHeader question={question} index={index} />
        <EditQuestionDialog
          question={question}
          onSuccess={() => onRefresh?.()}
          trigger={
            <Button variant="outline" size="sm">
              <Edit className="w-3 h-3 mr-1" />
              Modifier
            </Button>
          }
        />
      </div>
      
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        <QuestionImage imageUrl={imageUrl} index={index} />
        
        {/* Question Answers with Expanded Details */}
        <QuestionResponses 
          question={question} 
          isNewResponseFormat={isNewResponseFormat}
          onRefresh={() => onRefresh?.()}
        />
      </CardContent>
    </Card>
  );
}

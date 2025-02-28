
import { Question } from "@/types/game-details";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponseInput } from "./ResponseInput";
import { UserResponses } from "./UserResponses";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
}

export function QuestionCard({ question, index, token }: QuestionCardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<boolean>(false);
  const [refreshResponsesKey, setRefreshResponsesKey] = useState<number>(0);

  const handleResponseSubmitted = () => {
    setSelectedQuestion(false);
    // Force refresh of user responses by changing the key
    setRefreshResponsesKey(prev => prev + 1);
  };

  return (
    <Card key={index} className="border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg">
          Question {index + 1}: {question.libelle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.image ? (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
            <img
              src={`http://kahoot.nos-apps.com/${question.image}`}
              alt={`Image question ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[100px] bg-gray-100 rounded-lg">
            <div className="text-gray-400 flex flex-col items-center">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-sm">Aucune image</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {question.reponses.map((reponse, rIndex) => (
            <div
              key={rIndex}
              className={`p-4 rounded-lg ${
                reponse === question.reponse_correcte
                  ? 'bg-green-100 border-green-200'
                  : 'bg-gray-50 border-gray-100'
              } border transition-colors cursor-pointer hover:bg-gray-100`}
              onClick={() => {
                setSelectedQuestion(true);
              }}
            >
              {reponse}
              {reponse === question.reponse_correcte && (
                <span className="ml-2 text-green-600 font-medium">✓</span>
              )}
            </div>
          ))}
        </div>
        
        {selectedQuestion ? (
          <ResponseInput 
            question={question} 
            token={token} 
            onResponseSubmitted={handleResponseSubmitted}
          />
        ) : (
          question._id && (
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => setSelectedQuestion(true)}
            >
              Répondre à cette question
            </Button>
          )
        )}

        {question._id && (
          <UserResponses 
            key={refreshResponsesKey} 
            questionId={question._id} 
            token={token} 
          />
        )}
      </CardContent>
    </Card>
  );
}

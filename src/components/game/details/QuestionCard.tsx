
import { Question, QuestionReponse } from "@/types/game-details";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, TimerIcon, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponseInput } from "./ResponseInput";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  index: number;
  token: string;
}

export function QuestionCard({ question, index, token }: QuestionCardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<boolean>(false);

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

  return (
    <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Question {index + 1}: {question.libelle}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{question.temps || "30"} sec</span>
            </Badge>
            {question.limite_response ? (
              <Badge variant="success" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Chrono activé</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <TimerIcon className="h-3 w-3" />
                <span>Sans chrono</span>
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Question Image */}
        {imageUrl ? (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
            <img
              src={imageUrl}
              alt={`Image question ${index + 1}`}
              className="object-contain w-full h-full"
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
        
        {/* Question Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {isNewResponseFormat ? (
            // New response format (array of objects)
            (question.reponses as QuestionReponse[]).map((reponse, rIndex) => (
              <div
                key={rIndex}
                className={`p-4 rounded-lg ${
                  reponse.etat
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-100'
                } border transition-colors flex items-center justify-between`}
              >
                <span className={`${reponse.etat ? 'text-green-700 font-medium' : ''}`}>
                  {reponse.reponse_texte}
                </span>
                {reponse.etat && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))
          ) : (
            // Old response format (array of strings)
            Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
              <div
                key={rIndex}
                className={`p-4 rounded-lg ${
                  reponse === question.reponse_correcte
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-100'
                } border transition-colors flex items-center justify-between`}
              >
                <span className={`${reponse === question.reponse_correcte ? 'text-green-700 font-medium' : ''}`}>
                  {reponse}
                </span>
                {reponse === question.reponse_correcte && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Point value if available */}
        {question.point && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {question.point.valeur || 0} points
            </Badge>
          </div>
        )}
        
        {/* Response input */}
        {selectedQuestion ? (
          <ResponseInput 
            question={question} 
            token={token} 
            onResponseSubmitted={() => setSelectedQuestion(false)}
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
      </CardContent>
    </Card>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { Question } from "@/types/game-details";

interface QuestionsDisplayProps {
  questions?: Question[];
}

export function QuestionsDisplay({ questions }: QuestionsDisplayProps) {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {questions && questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((question, index) => (
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
                        } border transition-colors`}
                      >
                        {reponse}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Send } from "lucide-react";
import { Question, QuestionResponse } from "@/types/game-details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface QuestionsDisplayProps {
  questions?: Question[];
}

export function QuestionsDisplay({ questions }: QuestionsDisplayProps) {
  const { token } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>("");
  const [submittingQuestion, setSubmittingQuestion] = useState<string | null>(null);

  const handleSubmitResponse = async (question: Question) => {
    if (!question._id) {
      toast.error("ID de question invalide");
      return;
    }

    if (!responseText.trim()) {
      toast.error("Veuillez entrer une réponse");
      return;
    }

    setSubmittingQuestion(question._id);

    try {
      // Determine if the response is correct
      const isCorrect = question.reponses.includes(responseText) && 
                        responseText === question.reponse_correcte;
      
      const responseData: QuestionResponse = {
        file: "Image vers le fichier image", // As specified
        etat: isCorrect ? 1 : 0,
        question: question._id,
        reponse_texte: responseText
      };

      const response = await fetch("http://kahoot.nos-apps.com/api/reponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(responseData)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réponse");
      }

      toast.success(isCorrect ? "Réponse correcte !" : "Réponse incorrecte");
      setResponseText("");
      setSelectedQuestion(null);
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la réponse");
      console.error(error);
    } finally {
      setSubmittingQuestion(null);
    }
  };

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
                        } border transition-colors cursor-pointer hover:bg-gray-100`}
                        onClick={() => {
                          setSelectedQuestion(question._id || null);
                          setResponseText(reponse);
                        }}
                      >
                        {reponse}
                        {reponse === question.reponse_correcte && (
                          <span className="ml-2 text-green-600 font-medium">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {selectedQuestion === question._id && (
                    <div className="mt-4 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder="Entrez votre réponse"
                          className="flex-1"
                        />
                        <Button 
                          onClick={() => handleSubmitResponse(question)}
                          disabled={submittingQuestion === question._id}
                        >
                          {submittingQuestion === question._id ? (
                            "Envoi..."
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Envoyer
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {!selectedQuestion && question._id && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => setSelectedQuestion(question._id)}
                    >
                      Répondre à cette question
                    </Button>
                  )}
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


import { Question, QuestionResponse } from "@/types/game-details";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface ResponseInputProps {
  question: Question;
  token: string;
  onResponseSubmitted: (questionId: string) => void;
}

export function ResponseInput({ question, token, onResponseSubmitted }: ResponseInputProps) {
  const [responseText, setResponseText] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const handleSubmitResponse = async () => {
    if (!question._id) {
      toast.error("ID de question invalide");
      return;
    }

    if (!responseText.trim()) {
      toast.error("Veuillez entrer une réponse");
      return;
    }

    setSubmitting(true);

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
      
      // Notify parent to refresh responses
      onResponseSubmitted(question._id);
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la réponse");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex gap-2">
        <Input
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Entrez votre réponse"
          className="flex-1"
        />
        <Button 
          onClick={handleSubmitResponse}
          disabled={submitting}
        >
          {submitting ? (
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
  );
}

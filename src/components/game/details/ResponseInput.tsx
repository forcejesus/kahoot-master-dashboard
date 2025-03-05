
import { Question, QuestionResponse, QuestionReponse } from "@/types/game-details";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Check, X } from "lucide-react";
import { toast } from "sonner";

interface ResponseInputProps {
  question: Question;
  token: string;
  onResponseSubmitted: (questionId: string) => void;
}

export function ResponseInput({ question, token, onResponseSubmitted }: ResponseInputProps) {
  const [responseText, setResponseText] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<{isCorrect: boolean | null, submitted: boolean}>({
    isCorrect: null,
    submitted: false
  });
  
  // Check if reponses is an array of objects (new format) or array of strings (old format)
  const isNewResponseFormat = question.reponses && 
    question.reponses.length > 0 && 
    typeof question.reponses[0] !== 'string';
  
  // Get the correct answer based on response format
  const getCorrectAnswer = (): string => {
    // New format (array of objects with reponse_texte)
    if (isNewResponseFormat) {
      const correctResponse = (question.reponses as QuestionReponse[]).find(r => r.etat);
      return correctResponse?.reponse_texte || "";
    }
    
    // Old format (string array + reponse_correcte string)
    return question.reponse_correcte || "";
  };
  
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
      // Determine if the response is correct based on format
      let isCorrect = false;
      
      if (isNewResponseFormat) {
        // New format (array of objects with reponse_texte)
        const correctAnswer = (question.reponses as QuestionReponse[]).find(r => r.etat);
        isCorrect = correctAnswer?.reponse_texte.toLowerCase() === responseText.toLowerCase();
      } else {
        // Old format (string array + reponse_correcte)
        isCorrect = question.reponse_correcte?.toLowerCase() === responseText.toLowerCase();
      }
      
      console.log("Submitting response:", {
        questionId: question._id,
        responseText,
        isCorrect
      });
      
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

      // Show the response status
      setResponseStatus({
        isCorrect: isCorrect,
        submitted: true
      });
      
      toast.success(isCorrect ? "Réponse correcte !" : "Réponse incorrecte");
      
      // Reset the form after a delay
      setTimeout(() => {
        setResponseText("");
        onResponseSubmitted(question._id as string);
      }, 3000);
      
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la réponse");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const correctAnswer = getCorrectAnswer();

  // Debug info
  useEffect(() => {
    console.log("Question data:", question);
    console.log("Correct answer:", correctAnswer);
    console.log("Response format:", isNewResponseFormat ? "New (Object with reponse_texte)" : "Old (String array)");
  }, [question, correctAnswer, isNewResponseFormat]);

  return (
    <div className="mt-4 space-y-2">
      {responseStatus.submitted ? (
        <div className={`p-4 rounded-lg border ${
          responseStatus.isCorrect 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        } flex items-center justify-between mb-4`}>
          <div>
            <p className="font-medium">Votre réponse: {responseText}</p>
            <p className="text-sm mt-1">
              {responseStatus.isCorrect 
                ? 'Correcte !' 
                : `Incorrect. La bonne réponse est: ${correctAnswer}`}
            </p>
          </div>
          {responseStatus.isCorrect 
            ? <Check className="w-6 h-6 text-green-600" /> 
            : <X className="w-6 h-6 text-red-600" />}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Entrez votre réponse"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitResponse();
              }
            }}
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
      )}
    </div>
  );
}

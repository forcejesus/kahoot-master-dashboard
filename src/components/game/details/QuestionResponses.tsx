
import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
}

export function QuestionResponses({ question, isNewResponseFormat }: QuestionResponsesProps) {
  const { token } = useAuth();
  const [detailedResponses, setDetailedResponses] = useState<QuestionReponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si le format est nouveau mais que nous n'avons que des IDs (strings) dans le tableau reponses
    const needsToFetchDetails = isNewResponseFormat && 
      Array.isArray(question.reponses) && 
      question.reponses.length > 0 &&
      typeof question.reponses[0] === 'string';

    const fetchResponseDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (needsToFetchDetails) {
          console.log("Récupération des détails des réponses...");
          
          const responseIds = question.reponses as string[];
          const responseDetailsPromises = responseIds.map(id => 
            fetch(`http://kahoot.nos-apps.com/api/reponse/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(res => {
              if (!res.ok) {
                throw new Error(`Erreur ${res.status} pour l'ID ${id}`);
              }
              return res.json();
            })
            .then(data => data.data || data)
          );
          
          const responsesData = await Promise.all(responseDetailsPromises);
          console.log("Réponses récupérées:", responsesData);
          setDetailedResponses(responsesData);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des réponses:", err);
        setError(`Erreur lors du chargement des réponses: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (needsToFetchDetails) {
      fetchResponseDetails();
    } else if (isNewResponseFormat && Array.isArray(question.reponses)) {
      // Si les réponses sont déjà au format complet
      setDetailedResponses(question.reponses as QuestionReponse[]);
    }
  }, [question.reponses, isNewResponseFormat, token]);

  // Afficher un message de chargement pendant la récupération des données
  if (isLoading) {
    return <div className="py-4 text-center text-gray-500">Chargement des réponses...</div>;
  }

  // Afficher un message d'erreur si la récupération a échoué
  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {Array.isArray(question.reponses) ? question.reponses.length : 0}
      </h3>
      
      {isNewResponseFormat ? (
        // Nouveau format - utiliser les réponses détaillées si elles ont été récupérées
        <div className="space-y-3">
          {(detailedResponses.length > 0 ? detailedResponses : question.reponses as QuestionReponse[]).map((reponse, rIndex) => (
            <NewFormatResponseItem 
              key={reponse._id || rIndex} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          ))}
        </div>
      ) : (
        // Ancien format - reponses est un tableau de chaînes
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
            <OldFormatResponseItem
              key={rIndex}
              reponse={reponse}
              isCorrect={reponse === question.reponse_correcte}
              rIndex={rIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

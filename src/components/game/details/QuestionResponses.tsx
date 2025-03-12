
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
  const [loadedResponses, setLoadedResponses] = useState<QuestionReponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Vérifier si nous avons un tableau d'IDs au lieu d'objets de réponse
    const hasOnlyIds = Array.isArray(question.reponses) && 
      question.reponses.length > 0 && 
      (typeof question.reponses[0] === 'string' || 
       (typeof question.reponses[0] === 'object' && !question.reponses[0].reponse_texte));
    
    console.log("Est-ce un tableau d'IDs?", hasOnlyIds);
    
    // Si nous avons un tableau d'IDs, charger les vraies réponses depuis l'API
    if (hasOnlyIds && question._id) {
      const fetchResponses = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          // Essayons de charger les réponses pour cette question
          const url = `http://kahoot.nos-apps.com/api/reponse/question/${question._id}`;
          console.log("Chargement des réponses depuis:", url);
          
          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error(`Erreur de chargement des réponses (${response.status})`);
          }
          
          const data = await response.json();
          console.log("Réponses chargées:", data);
          
          if (data.success && data.data) {
            setLoadedResponses(data.data);
          } else {
            setError("Format de réponse invalide");
          }
        } catch (err) {
          console.error("Erreur lors du chargement des réponses:", err);
          setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchResponses();
    }
  }, [question._id, question.reponses, token]);
  
  // Utiliser les réponses chargées si disponibles, sinon utiliser celles de la question
  const responsesToDisplay = loadedResponses.length > 0 ? loadedResponses : 
    (Array.isArray(question.reponses) ? question.reponses : []);
  
  console.log("Réponses à afficher:", responsesToDisplay);
  
  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {responsesToDisplay.length}
      </h3>
      
      {isLoading && (
        <div className="text-center py-4 text-gray-500">
          Chargement des réponses...
        </div>
      )}
      
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
          Erreur: {error}
        </div>
      )}
      
      <div className="space-y-3">
        {responsesToDisplay.map((reponse, rIndex) => {
          console.log(`Réponse ${rIndex}:`, reponse);
          return (
            <NewFormatResponseItem 
              key={rIndex} 
              reponse={reponse} 
              rIndex={rIndex} 
            />
          );
        })}
      </div>
    </div>
  );
}

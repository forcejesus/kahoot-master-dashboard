
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
    console.log("Question._id:", question._id);
    console.log("Contenu de reponses:", question.reponses);
    
    // Si nous avons un tableau d'IDs, charger les vraies réponses depuis l'API
    if (hasOnlyIds && question._id) {
      const fetchResponses = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          // Utilisons l'API correcte pour récupérer les réponses
          // Format l'API : /api/reponses/id-question au lieu de /api/reponse/question/id-question
          if (Array.isArray(question.reponses) && question.reponses.length > 0 && typeof question.reponses[0] === 'string') {
            console.log("Chargement des réponses individuelles à partir des IDs");
            
            const responsePromises = question.reponses.map(async (reponseId) => {
              // Correction de l'URL pour récupérer une réponse spécifique
              const url = `http://kahoot.nos-apps.com/api/reponses/${reponseId}`;
              console.log("Chargement de la réponse:", url);
              
              const response = await fetch(url, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              if (!response.ok) {
                console.error(`Erreur HTTP ${response.status} pour l'URL: ${url}`);
                return null; // Retourner null pour les réponses qui échouent
              }
              
              const responseText = await response.text();
              console.log(`Réponse brute pour ${reponseId}:`, responseText);
              
              try {
                const data = JSON.parse(responseText);
                return data.data || data;
              } catch (e) {
                console.error("Erreur de parsing JSON:", e);
                return null;
              }
            });
            
            const responses = await Promise.all(responsePromises);
            console.log("Toutes les réponses chargées:", responses);
            // Filtrer les réponses null (échecs)
            const validResponses = responses.filter(r => r !== null);
            if (validResponses.length > 0) {
              setLoadedResponses(validResponses);
            } else {
              // Si toutes les réponses ont échoué, essayons l'autre méthode
              throw new Error("Aucune réponse valide n'a pu être chargée individuellement");
            }
          } else {
            // Essayons l'autre méthode pour obtenir toutes les réponses d'une question
            // Correction de l'URL : /api/reponses/question/id-question
            const url = `http://kahoot.nos-apps.com/api/reponses/question/${question._id}`;
            console.log("Chargement des réponses depuis:", url);
            
            const response = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (!response.ok) {
              // Afficher plus de détails sur l'erreur
              console.error(`Erreur HTTP ${response.status} pour l'URL: ${url}`);
              throw new Error(`Erreur de chargement des réponses (${response.status})`);
            }
            
            const responseText = await response.text();
            console.log("Réponse brute:", responseText);
            
            try {
              const data = JSON.parse(responseText);
              console.log("Réponses chargées:", data);
              
              if (data.success && data.data) {
                setLoadedResponses(data.data);
              } else {
                setError("Format de réponse invalide");
              }
            } catch (e) {
              console.error("Erreur de parsing JSON:", e);
              setError("Format de réponse invalide");
            }
          }
        } catch (err) {
          console.error("Erreur lors du chargement des réponses:", err);
          setError(err instanceof Error ? err.message : "Erreur inconnue");
          
          // Plan B : si les deux méthodes ont échoué, utiliser les réponses brutes si possible
          if (Array.isArray(question.reponses) && typeof question.reponses[0] === 'object') {
            console.log("Utilisation des réponses brutes comme solution de secours");
            setLoadedResponses(question.reponses as QuestionReponse[]);
          }
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

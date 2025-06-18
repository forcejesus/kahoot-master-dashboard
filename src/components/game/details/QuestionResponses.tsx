import { Question, QuestionReponse } from "@/types/game-details";
import { NewFormatResponseItem } from "./NewFormatResponseItem";
import { OldFormatResponseItem } from "./OldFormatResponseItem";
import { MessageCircle } from "lucide-react";

interface QuestionResponsesProps {
  question: Question;
  isNewResponseFormat: boolean;
  onRefresh?: () => void;
}

export function QuestionResponses({ question, isNewResponseFormat, onRefresh }: QuestionResponsesProps) {
  // Accéder en toute sécurité au nombre de réponses
  const responseCount = Array.isArray(question.reponses) ? question.reponses.length : 0;
  
  // Préparer les réponses pour l'affichage
  const prepareResponses = (): QuestionReponse[] => {
    if (!Array.isArray(question.reponses)) return [];
    
    // Vérifier si toutes les réponses sont des chaînes qui ressemblent à des IDs MongoDB
    const allResponsesAreMongoDB = question.reponses.every(
      (response) => typeof response === 'string' && response.length > 20
    );
    
    // Si toutes les réponses semblent être des IDs MongoDB, convertissons-les en objets
    // avec seulement l'ID, et laissons le composant NewFormatResponseItem faire le fetch
    if (allResponsesAreMongoDB) {
      console.log("Détecté des réponses au format ID seul:", question.reponses);
      return (question.reponses as string[]).map((id: string) => ({
        _id: id,
        etat: false, // Sera actualisé lors du chargement des détails
        reponse_texte: "" // Sera actualisé lors du chargement des détails
      }));
    }
    
    return (question.reponses as (QuestionReponse | string)[]).map((reponse: QuestionReponse | string) => {
      // Si la réponse est déjà un objet
      if (typeof reponse === 'object' && reponse !== null) {
        // Si c'est un objet complet
        return {
          _id: reponse._id || "",
          etat: reponse.etat === true || reponse.etat === 1,
          reponse_texte: reponse.reponse_texte || "",
          question: reponse.question || question._id || "",
          date: reponse.date || "",
          __v: reponse.__v
        };
      } 
      
      // S'il s'agit simplement d'un ID
      if (typeof reponse === 'string' && reponse.length > 20) {  // C'est probablement un ID MongoDB
        return {
          _id: reponse,
          etat: false,  // Sera actualisé lors du chargement des détails
          reponse_texte: ""  // Sera actualisé lors du chargement des détails
        };
      }
      
      // Si c'est une chaîne (ancien format)
      return {
        _id: typeof reponse === 'string' ? reponse : "",
        etat: reponse === question.reponse_correcte,
        reponse_texte: typeof reponse === 'string' ? reponse : ""
      };
    });
  };
  
  const formattedResponses = prepareResponses();

  // Forcer l'utilisation du nouveau format pour les IDs MongoDB
  const shouldUseNewFormat = isNewResponseFormat || 
    (Array.isArray(question.reponses) && question.reponses.some(r => typeof r === 'string' && r.length > 20));

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium text-base flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Réponses possibles: {responseCount}
      </h3>
      
      {shouldUseNewFormat ? (
        <div className="space-y-3">
          {formattedResponses.map((reponse, rIndex) => (
            <NewFormatResponseItem 
              key={reponse._id || `response-${rIndex}`} 
              reponse={reponse} 
              rIndex={rIndex}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(question.reponses) && (question.reponses as string[]).map((reponse, rIndex) => (
            <OldFormatResponseItem
              key={`old-response-${rIndex}`}
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

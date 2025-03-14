
import { useState, useEffect } from "react";
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X, Info } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from "@/components/ui/card";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  const { token } = useAuth();
  const [responseDetail, setResponseDetail] = useState<QuestionReponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si nous avons déjà le texte de la réponse
    if (typeof reponse === 'object' && reponse.reponse_texte) {
      setResponseDetail(reponse);
      return;
    }

    // Si nous n'avons qu'un ID, récupérer les détails
    if (reponse && typeof reponse === 'object' && reponse._id) {
      setLoading(true);
      fetch(`http://kahoot.nos-apps.com/api/reponse/${reponse._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.success && result.data) {
            setResponseDetail(result.data);
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des détails de la réponse:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [reponse, token]);

  if (!reponse) return null;
  if (loading) return <div className="p-4 rounded-lg bg-gray-50 border-gray-100 border">Chargement...</div>;
  
  // Utiliser les détails récupérés s'ils sont disponibles, sinon utiliser les données existantes
  const responseData = responseDetail || reponse;
  
  // S'assurer que nous avons le texte de la réponse, pas seulement un ID
  const responseText = typeof responseData === 'object' && responseData.reponse_texte 
    ? responseData.reponse_texte 
    : typeof responseData === 'string' 
      ? responseData 
      : "Réponse sans texte";
  
  // Déterminer si la réponse est correcte
  const isCorrect = typeof responseData === 'object' && (responseData.etat === true || responseData.etat === 1);
  
  return (
    <div
      className={`p-4 rounded-lg ${
        isCorrect
          ? 'bg-green-100 border-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className={`${isCorrect ? 'text-green-700 font-medium' : ''} text-base`}>
          {responseText}
        </span>
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <Badge variant="success" className="flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Correcte</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1">
              <X className="w-3 h-3" />
              <span>Incorrecte</span>
            </Badge>
          )}
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Afficher tous les détails de la réponse */}
      {showDetails && responseDetail && (
        <Card className="mt-3 bg-white/60 border-gray-200">
          <CardContent className="text-xs p-3 space-y-1">
            <p><strong>ID:</strong> {responseDetail._id}</p>
            <p><strong>État:</strong> {responseDetail.etat === true || responseDetail.etat === 1 ? 'Correcte' : 'Incorrecte'}</p>
            <p><strong>Texte:</strong> {responseDetail.reponse_texte}</p>
            {responseDetail.question && <p><strong>Question ID:</strong> {responseDetail.question}</p>}
            {responseDetail.date && <p><strong>Date:</strong> {new Date(responseDetail.date).toLocaleString()}</p>}
            {responseDetail.__v !== undefined && <p><strong>Version:</strong> {responseDetail.__v}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

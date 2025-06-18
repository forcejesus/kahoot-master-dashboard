
import { useState, useEffect } from "react";
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, X, Info } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EditResponseDialog } from "../edit/EditResponseDialog";
import { Button } from "@/components/ui/button";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
  onRefresh?: () => void;
}

export function NewFormatResponseItem({ reponse, rIndex, onRefresh }: NewFormatResponseItemProps) {
  const { token } = useAuth();
  const [responseDetail, setResponseDetail] = useState<QuestionReponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si nous avons seulement un ID MongoDB (une chaîne de plus de 20 caractères)
    const hasOnlyId = typeof reponse === 'object' && 
                      reponse._id && 
                      (!reponse.reponse_texte || reponse.reponse_texte === "");
                      
    const isIdString = typeof reponse._id === 'string' && reponse._id.length > 20;
    
    if (hasOnlyId || isIdString) {
      setLoading(true);
      
      // Déterminer l'ID à utiliser pour la requête
      const idToFetch = hasOnlyId ? reponse._id : reponse;
      
      // Fetch les détails de la réponse depuis l'API
      fetch(`http://kahoot.nos-apps.com/api/reponse/${idToFetch}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          return response.json();
        })
        .then(result => {
          if (result.success && result.data) {
            console.log("Détails de réponse récupérés:", result.data);
            setResponseDetail(result.data);
          } else {
            console.error("Pas de données dans la réponse:", result);
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des détails de la réponse:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (reponse && typeof reponse === 'object') {
      // Si nous avons déjà le texte de la réponse
      setResponseDetail(reponse);
    }
  }, [reponse, token]);

  if (!reponse) return null;
  
  // Afficher un squelette de chargement pendant le fetch
  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-gray-50 border-gray-100 border">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    );
  }
  
  // Utiliser les détails récupérés s'ils sont disponibles, sinon utiliser les données existantes
  const responseData = responseDetail || reponse;
  
  // S'assurer que nous avons le texte de la réponse, pas seulement un ID
  const responseText = typeof responseData === 'object' && responseData.reponse_texte 
    ? responseData.reponse_texte 
    : typeof responseData._id === 'string' 
      ? (responseData._id.length > 20 ? "Chargement..." : responseData._id) 
      : "Chargement...";
  
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
      <div className="flex items-center justify-between mb-2">
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
      
      {responseDetail && (
        <div className="flex justify-end">
          <EditResponseDialog
            response={responseDetail}
            onSuccess={() => onRefresh?.()}
          />
        </div>
      )}
      
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

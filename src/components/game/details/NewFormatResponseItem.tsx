
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, ToggleLeft, ToggleRight, Clock, Hash, FileText, Calendar } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  if (!reponse) return null;
  
  return (
    <div
      className={`p-4 rounded-lg ${
        reponse.etat
          ? 'bg-green-100 border-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      {/* En-tête de la réponse avec texte et badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`${reponse.etat ? 'text-green-700 font-medium' : 'font-medium'} text-lg`}>
          {reponse.reponse_texte || "Réponse sans texte"}
        </span>
        {reponse.etat ? (
          <Badge variant="success" className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Correcte</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <ToggleLeft className="w-3 h-3" />
            <span>Incorrecte</span>
          </Badge>
        )}
      </div>
      
      {/* Détails complets de la réponse */}
      <div className="mt-3 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2 border-t pt-2 border-gray-200">
        {reponse._id && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" /> 
            <span className="font-medium">ID:</span> {reponse._id}
          </div>
        )}

        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-blue-500" /> 
          <span className="font-medium">Texte:</span> {reponse.reponse_texte}
        </div>
        
        <div className="flex items-center gap-1">
          <ToggleRight className="w-3 h-3 text-blue-500" /> 
          <span className="font-medium">État:</span> {reponse.etat ? "Correcte" : "Incorrecte"}
        </div>
        
        {reponse.question && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Question ID:</span> {reponse.question}
          </div>
        )}
        
        {reponse.date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Date de création:</span> {new Date(reponse.date).toLocaleString()}
          </div>
        )}
        
        {reponse.__v !== undefined && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Version:</span> {reponse.__v}
          </div>
        )}
      </div>
    </div>
  );
}

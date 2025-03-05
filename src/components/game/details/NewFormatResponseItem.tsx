
import { QuestionReponse } from "@/types/game-details";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Calendar, Hash, ToggleLeft, ToggleRight, Clock } from "lucide-react";

interface NewFormatResponseItemProps {
  reponse: QuestionReponse;
  rIndex: number;
}

export function NewFormatResponseItem({ reponse, rIndex }: NewFormatResponseItemProps) {
  if (!reponse) return null;
  
  return (
    <div
      key={rIndex}
      className={`p-4 rounded-lg ${
        reponse.etat
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-100'
      } border transition-colors`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`${reponse.etat ? 'text-green-700 font-medium' : 'font-medium'}`}>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Hash className="w-3 h-3" /> 
          <span className="font-medium">ID:</span> {reponse._id}
        </div>
        <div className="flex items-center gap-1">
          <ToggleRight className="w-3 h-3" /> 
          <span className="font-medium">État:</span> {reponse.etat ? "Correcte" : "Incorrecte"}
        </div>
        <div className="flex items-center gap-1">
          <Info className="w-3 h-3" /> 
          <span className="font-medium">Question ID:</span> {reponse.question}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" /> 
          <span className="font-medium">Créée le:</span> {new Date(reponse.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> 
          <span className="font-medium">Heure:</span> {new Date(reponse.date).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        {reponse.__v !== undefined && (
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3" /> 
            <span className="font-medium">Version:</span> {reponse.__v}
          </div>
        )}
      </div>
    </div>
  );
}


import { Question } from "@/types/game-details";
import { Calendar, Clock, FileText, Hash, HelpCircle, FileType, Timer, Award } from "lucide-react";

interface QuestionDetailsProps {
  question: Question;
}

export function QuestionDetails({ question }: QuestionDetailsProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h3 className="font-medium text-base mb-3 flex items-center gap-2">
        <HelpCircle className="w-4 h-4" />
        Détails de la question
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {question._id && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <span className="font-medium">ID:</span> {question._id}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-blue-500" />
          <span className="font-medium">Libellé:</span> {question.libelle}
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-500" />
          <span className="font-medium">Temps:</span> {question.temps || "30"} secondes
        </div>
        
        <div className="flex items-center gap-1">
          <Timer className="w-3 h-3 text-blue-500" />
          <span className="font-medium">Chrono actif:</span> {question.limite_response ? "Oui" : "Non"}
        </div>
        
        {question.date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Date:</span> {new Date(question.date).toLocaleString()}
          </div>
        )}
        
        {question.typeQuestion && (
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Type:</span> {question.typeQuestion.libelle}
            {question.typeQuestion.description && (
              <span className="text-xs text-gray-500 ml-1">({question.typeQuestion.description})</span>
            )}
          </div>
        )}
        
        {question.point && (
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Points:</span> {question.point.valeur}
            {question.point.nature && (
              <span className="text-xs text-gray-500 ml-1">({question.point.nature})</span>
            )}
          </div>
        )}
        
        {question.type_fichier && (
          <div className="flex items-center gap-1">
            <FileType className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Type de fichier:</span> {question.type_fichier}
          </div>
        )}
        
        {question.jeu && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <span className="font-medium">Jeu ID:</span> {question.jeu}
          </div>
        )}
      </div>
    </div>
  );
}

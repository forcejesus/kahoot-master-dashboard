
import { Question } from "@/types/game-details";

interface QuestionDetailsProps {
  question: Question;
}

export function QuestionDetails({ question }: QuestionDetailsProps) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <h3 className="font-medium text-base mb-2">Détails de la question:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div><span className="font-medium">ID:</span> {question._id}</div>
        {question.type_fichier && (
          <div><span className="font-medium">Type de fichier:</span> {question.type_fichier}</div>
        )}
        <div><span className="font-medium">Temps:</span> {question.temps || "30"} secondes</div>
        <div><span className="font-medium">Limite de réponse:</span> {question.limite_response ? "Oui" : "Non"}</div>
        
        {question.typeQuestion && (
          <div className="col-span-2">
            <span className="font-medium">Type de question:</span> {question.typeQuestion.libelle}
            {question.typeQuestion.description && (
              <div className="text-xs text-gray-500 mt-1">{question.typeQuestion.description}</div>
            )}
          </div>
        )}
        
        {question.point && (
          <div className="col-span-2">
            <span className="font-medium">Points:</span> {question.point.valeur || 0}
            {question.point.nature && (
              <span className="ml-2 text-xs">({question.point.nature})</span>
            )}
            {question.point.description && (
              <div className="text-xs text-gray-500 mt-1">{question.point.description}</div>
            )}
          </div>
        )}
        
        {question.date && (
          <div className="col-span-2">
            <span className="font-medium">Date de création:</span> {new Date(question.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )}
      </div>
    </div>
  );
}

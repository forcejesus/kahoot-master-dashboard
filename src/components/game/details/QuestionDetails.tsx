
import { Question } from "@/types/game-details";
import { Calendar, Clock, FileText, Hash, HelpCircle, FileType, Timer, Award } from "lucide-react";
import { useTranslation } from "@/contexts/I18nContext";
import { useApiTranslation } from "@/hooks/useApiTranslation";

interface QuestionDetailsProps {
  question: Question;
}

export function QuestionDetails({ question }: QuestionDetailsProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h3 className="font-medium text-base mb-3 flex items-center gap-2">
        <HelpCircle className="w-4 h-4" />
        {t('question.details')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {question._id && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.id')}:</span> {question._id}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-blue-500" />
          <span className="font-medium">{t('question.label')}:</span> {translateField(question, 'libelle') || question.libelle}
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-500" />
          <span className="font-medium">{t('question.time')}:</span> {question.temps || "30"} {t('question.seconds')}
        </div>
        
        <div className="flex items-center gap-1">
          <Timer className="w-3 h-3 text-blue-500" />
          <span className="font-medium">{t('question.chronoActive')}:</span> {question.limite_response ? t('question.yes') : t('question.no')}
        </div>
        
        {question.date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.date')}:</span> {new Date(question.date).toLocaleString()}
          </div>
        )}
        
        {question.typeQuestion && (
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.type')}:</span> {translateField(question.typeQuestion, 'libelle') || question.typeQuestion.libelle}
            {question.typeQuestion.description && (
              <span className="text-xs text-gray-500 ml-1">({translateField(question.typeQuestion, 'description') || question.typeQuestion.description})</span>
            )}
          </div>
        )}
        
        {question.point && (
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.points')}:</span> {question.point.valeur}
            {question.point.nature && (
              <span className="text-xs text-gray-500 ml-1">({translateField(question.point, 'nature') || question.point.nature})</span>
            )}
          </div>
        )}
        
        {question.type_fichier && (
          <div className="flex items-center gap-1">
            <FileType className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.fileType')}:</span> {question.type_fichier}
          </div>
        )}
        
        {question.jeu && (
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-blue-500" />
            <span className="font-medium">{t('question.gameId')}:</span> {question.jeu}
          </div>
        )}
      </div>
    </div>
  );
}

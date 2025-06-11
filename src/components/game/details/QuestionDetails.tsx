
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-800">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        {t('question.details')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        {question._id && (
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">{t('question.id')}:</span> 
            <span className="text-slate-600">{question._id}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-slate-700">{t('question.label')}:</span> 
          <span className="text-slate-600">{translateField(question, 'libelle') || question.libelle}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-slate-700">{t('question.time')}:</span> 
          <span className="text-slate-600">{question.temps || "30"} {t('question.seconds')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-slate-700">{t('question.chronoActive')}:</span> 
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            question.limite_response 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {question.limite_response ? t('question.yes') : t('question.no')}
          </span>
        </div>
        
        {question.date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">{t('question.date')}:</span> 
            <span className="text-slate-600">{new Date(question.date).toLocaleString()}</span>
          </div>
        )}
        
        {question.typeQuestion && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-700">{t('question.type')}:</span> 
              <span className="text-slate-600">{translateField(question.typeQuestion, 'libelle') || question.typeQuestion.libelle}</span>
            </div>
            {question.typeQuestion.description && (
              <span className="text-xs text-slate-500 ml-6">
                {translateField(question.typeQuestion, 'description') || question.typeQuestion.description}
              </span>
            )}
          </div>
        )}
        
        {question.point && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-700">{t('question.points')}:</span> 
              <span className="text-slate-600 font-semibold">{question.point.valeur}</span>
            </div>
            {question.point.nature && (
              <span className="text-xs text-slate-500 ml-6">
                {translateField(question.point, 'nature') || question.point.nature}
              </span>
            )}
          </div>
        )}
        
        {question.type_fichier && (
          <div className="flex items-center gap-2">
            <FileType className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">{t('question.fileType')}:</span> 
            <span className="text-slate-600">{question.type_fichier}</span>
          </div>
        )}
        
        {question.jeu && (
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-700">{t('question.gameId')}:</span> 
            <span className="text-slate-600">{question.jeu}</span>
          </div>
        )}
      </div>
    </div>
  );
}

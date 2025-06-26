
import { QuestionType } from '@/types/game';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionTypeSelectProps {
  questionTypes: QuestionType[];
  value: string;
  onChange: (typeId: string) => void;
}

// Mapping des types de questions avec de meilleurs noms
const getQuestionTypeDisplayName = (libelle: string) => {
  switch (libelle) {
    case 'CHOIX_UNIQUE':
      return 'Question à choix unique';
    case 'CHOIX_MULTIPLE':
      return 'Question à choix multiples';
    case 'REPONSE_COURTE':
      return 'Question à réponse libre';
    default:
      return libelle;
  }
};

const getQuestionTypeDescription = (libelle: string) => {
  switch (libelle) {
    case 'CHOIX_UNIQUE':
      return 'Les apprenants sélectionnent UNE seule bonne réponse parmi plusieurs options';
    case 'CHOIX_MULTIPLE':
      return 'Les apprenants peuvent sélectionner PLUSIEURS bonnes réponses parmi les options';
    case 'REPONSE_COURTE':
      return 'Les apprenants saisissent librement leur réponse dans un champ texte';
    default:
      return '';
  }
};

const getQuestionTypeIcon = (libelle: string) => {
  switch (libelle) {
    case 'CHOIX_UNIQUE':
      return '🔘';
    case 'CHOIX_MULTIPLE':
      return '☑️';
    case 'REPONSE_COURTE':
      return '✏️';
    default:
      return '❓';
  }
};

export function QuestionTypeSelect({ questionTypes, value, onChange }: QuestionTypeSelectProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="typeQuestion" className="text-base font-semibold text-gray-700">
          Type de question *
        </Label>
        <p className="text-sm text-gray-500">
          Choisissez le format de question qui correspond le mieux à votre objectif pédagogique
        </p>
      </div>
      
      <Select
        value={value}
        onValueChange={onChange}
        required
      >
        <SelectTrigger className="h-14 text-base">
          <SelectValue placeholder="👆 Sélectionnez le type de question que vous souhaitez créer" />
        </SelectTrigger>
        <SelectContent>
          {questionTypes.map(type => (
            <SelectItem key={type._id} value={type._id} className="py-4 cursor-pointer">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getQuestionTypeIcon(type.libelle)}</span>
                  <span className="font-semibold text-base">{getQuestionTypeDisplayName(type.libelle)}</span>
                </div>
                <span className="text-sm text-gray-500 leading-relaxed">
                  {getQuestionTypeDescription(type.libelle)}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Information contextuelle selon le type sélectionné */}
      {value && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 text-lg mt-0.5">
              {getQuestionTypeIcon(
                questionTypes.find(t => t._id === value)?.libelle || ''
              )}
            </span>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">
                {getQuestionTypeDisplayName(
                  questionTypes.find(t => t._id === value)?.libelle || ''
                )}
              </h4>
              <p className="text-sm text-blue-700">
                {getQuestionTypeDescription(
                  questionTypes.find(t => t._id === value)?.libelle || ''
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

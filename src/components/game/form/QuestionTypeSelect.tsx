
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
      return 'Question à réponse courte';
    default:
      return libelle;
  }
};

const getQuestionTypeDescription = (libelle: string) => {
  switch (libelle) {
    case 'CHOIX_UNIQUE':
      return 'Une seule bonne réponse possible';
    case 'CHOIX_MULTIPLE':
      return 'Plusieurs bonnes réponses possibles';
    case 'REPONSE_COURTE':
      return 'Réponse libre à saisir';
    default:
      return '';
  }
};

export function QuestionTypeSelect({ questionTypes, value, onChange }: QuestionTypeSelectProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="typeQuestion" className="text-base font-semibold text-gray-700">
        Type de question *
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        required
      >
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder="Choisissez le type de question que vous souhaitez créer" />
        </SelectTrigger>
        <SelectContent>
          {questionTypes.map(type => (
            <SelectItem key={type._id} value={type._id} className="py-3">
              <div className="flex flex-col">
                <span className="font-medium">{getQuestionTypeDisplayName(type.libelle)}</span>
                <span className="text-sm text-gray-500">{getQuestionTypeDescription(type.libelle)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

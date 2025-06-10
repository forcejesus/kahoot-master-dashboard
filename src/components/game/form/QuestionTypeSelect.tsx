
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

const getQuestionTypeLabel = (libelle: string) => {
  switch (libelle) {
    case 'CHOIX_MULTIPLE':
      return 'Question à choix multiple';
    case 'CHOIX_UNIQUE':
      return 'Question à choix unique';
    case 'REPONSE_COURTE':
      return 'Question à réponse courte';
    default:
      return libelle;
  }
};

export function QuestionTypeSelect({ questionTypes, value, onChange }: QuestionTypeSelectProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="typeQuestion" className="text-base font-semibold text-gray-800">
        Type de question
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        required
      >
        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors">
          <SelectValue placeholder="Sélectionnez le type" />
        </SelectTrigger>
        <SelectContent>
          {questionTypes.map(type => (
            <SelectItem key={type._id} value={type._id} className="py-3">
              {getQuestionTypeLabel(type.libelle)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

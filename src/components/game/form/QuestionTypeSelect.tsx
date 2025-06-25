
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

export function QuestionTypeSelect({ questionTypes, value, onChange }: QuestionTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="typeQuestion">Type de question</Label>
      <Select
        value={value}
        onValueChange={onChange}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez le type" />
        </SelectTrigger>
        <SelectContent>
          {questionTypes.map(type => (
            <SelectItem key={type._id} value={type._id}>
              {type.libelle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

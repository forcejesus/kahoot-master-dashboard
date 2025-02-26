
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DurationSelectProps {
  value: number;
  onChange: (duration: number) => void;
}

export function DurationSelect({ value, onChange }: DurationSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="temps">Durée (secondes)</Label>
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez la durée" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({length: 12}, (_, i) => (i + 1) * 5).map(seconds => (
            <SelectItem key={seconds} value={seconds.toString()}>
              {seconds} secondes
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

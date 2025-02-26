
import { Point } from '@/types/game';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PointsSelectProps {
  points: Point[];
  value: string;
  onChange: (pointId: string) => void;
}

export function PointsSelect({ points, value, onChange }: PointsSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="point">Points accordés</Label>
      <Select
        value={value}
        onValueChange={onChange}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez les points" />
        </SelectTrigger>
        <SelectContent>
          {points.map(point => (
            <SelectItem key={point._id} value={point._id}>
              {point.valeur} points
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

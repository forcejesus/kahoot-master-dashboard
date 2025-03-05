
import { Checkbox } from '@/components/ui/checkbox';

interface TableHeaderProps {
  hasKahoots: boolean;
  areAllSelected: boolean;
  onSelectAll: () => void;
}

export function TableHeader({ 
  hasKahoots, 
  areAllSelected, 
  onSelectAll 
}: TableHeaderProps) {
  return (
    <thead>
      <tr className="border-b">
        <th className="py-4 px-6 text-left">
          {hasKahoots && (
            <Checkbox 
              checked={areAllSelected}
              onCheckedChange={onSelectAll}
            />
          )}
        </th>
        <th className="text-left py-4 px-6 text-primary font-bold">Titre</th>
        <th className="text-center py-4 px-6 text-primary font-bold">Questions</th>
        <th className="text-center py-4 px-6 text-primary font-bold">Sessions</th>
        <th className="text-center py-4 px-6 text-primary font-bold">Participants</th>
      </tr>
    </thead>
  );
}

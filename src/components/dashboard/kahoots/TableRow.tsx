
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink } from 'lucide-react';
import { Kahoot } from '@/types/game-details';

interface TableRowProps {
  kahoot: Kahoot;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: (kahoot: Kahoot, e: React.MouseEvent) => void;
}

export function TableRow({
  kahoot,
  isSelected,
  onSelect,
  onClick
}: TableRowProps) {
  return (
    <tr 
      key={kahoot._id} 
      className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
      onClick={(e) => onClick(kahoot, e)}
    >
      <td className="py-4 px-6 checkbox-cell">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={() => onSelect(kahoot._id)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="py-4 px-6">
        <div className="font-medium text-left flex items-center text-primary">
          {kahoot.titre}
          <ExternalLink className="ml-2 h-4 w-4" />
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        {kahoot.questions?.length || 0}
      </td>
      <td className="py-4 px-6 text-center">
        {kahoot.planifications?.length || 0}
      </td>
      <td className="py-4 px-6 text-center">
        {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
      </td>
    </tr>
  );
}

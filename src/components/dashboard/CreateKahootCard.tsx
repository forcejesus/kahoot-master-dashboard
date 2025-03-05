
import { Card, CardContent } from '@/components/ui/card';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';

interface CreateKahootCardProps {
  onSuccess: () => void;
}

export function CreateKahootCard({ onSuccess }: CreateKahootCardProps) {
  return (
    <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-none">
      <CardContent className="flex items-center justify-center h-full p-8">
        <CreateKahootDialog onSuccess={onSuccess} />
      </CardContent>
    </Card>
  );
}

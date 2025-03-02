
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateKahootDialog } from "@/components/CreateKahootDialog";
import { Loader2 } from "lucide-react";

interface StatsCardsProps {
  isLoading: boolean;
  kahootsCount: number;
  totalApprenants: number;
  onSuccess: () => Promise<void>;
}

export const StatsCards = ({ 
  isLoading, 
  kahootsCount, 
  totalApprenants,
  onSuccess 
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 border-t border-white/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Total des Kahoots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-primary">
            {isLoading ? "..." : kahootsCount}
          </div>
        </CardContent>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 border-t border-white/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Total des Apprenants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-primary">
            {isLoading ? "..." : totalApprenants}
          </div>
        </CardContent>
      </Card>

      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-none">
        <CardContent className="flex items-center justify-center h-full p-8">
          <CreateKahootDialog onSuccess={onSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

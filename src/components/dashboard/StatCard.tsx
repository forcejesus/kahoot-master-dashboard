
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  isLoading: boolean;
  isHighlighted?: boolean;
}

export function StatCard({ title, value, isLoading, isHighlighted = false }: StatCardProps) {
  return (
    <Card 
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isHighlighted 
          ? "bg-gradient-to-r from-primary to-secondary text-white border-none" 
          : "bg-gradient-to-br from-white to-gray-50 border-t border-white/50"
      }`}
    >
      <CardHeader className="space-y-1">
        <CardTitle 
          className={`text-2xl font-bold ${
            !isHighlighted 
              ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" 
              : ""
          }`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-5xl font-bold ${!isHighlighted ? "text-primary" : ""}`}>
          {isLoading ? "..." : value}
        </div>
      </CardContent>
    </Card>
  );
}

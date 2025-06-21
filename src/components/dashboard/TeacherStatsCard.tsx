
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TeacherStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  isLoading?: boolean;
}

export function TeacherStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  gradient,
  change,
  changeType = 'positive',
  isLoading = false 
}: TeacherStatsCardProps) {
  if (isLoading) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-10`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {change && (
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 ${
                changeType === 'positive' 
                  ? 'text-green-600 border-green-200 bg-green-50' 
                  : 'text-red-600 border-red-200 bg-red-50'
              }`}
            >
              {changeType === 'positive' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

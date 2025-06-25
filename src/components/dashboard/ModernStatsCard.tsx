
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModernStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
  change?: string;
  isLoading?: boolean;
}

export function ModernStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  bgColor, 
  textColor,
  change,
  isLoading = false 
}: ModernStatsCardProps) {
  return (
    <Card className="bg-white border-orange-200 hover-lift group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`h-12 w-12 rounded-lg ${bgColor} flex items-center justify-center shadow-soft`}>
            <Icon className={`h-6 w-6 ${textColor} icon-scale`} />
          </div>
          {change && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {change}
            </span>
          )}
        </div>
        <CardTitle className="text-sm font-medium text-gray-600 mt-3">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          {isLoading ? "..." : value}
        </div>
        <p className="text-xs text-gray-500">
          Total actuel
        </p>
      </CardContent>
    </Card>
  );
}

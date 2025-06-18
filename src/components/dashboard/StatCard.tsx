
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  isLoading?: boolean;
  color?: string;
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, isLoading = false, color = "blue", trend }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200", 
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              {title}
            </h3>
          </div>
          
          <div className="space-y-1">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-gray-900">
                {value}
              </div>
            )}
            {trend && (
              <p className="text-xs text-gray-500">{trend}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

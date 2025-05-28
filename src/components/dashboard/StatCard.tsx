
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  isLoading?: boolean;
  gradient?: string;
}

export function StatCard({ title, value, icon: Icon, isLoading = false, gradient = "from-gray-100 to-gray-200" }: StatCardProps) {
  return (
    <Card className={`group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${gradient} text-white border-none shadow-lg overflow-hidden relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/10"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <Icon className="w-16 h-16" />
      </div>
      
      <CardHeader className="relative z-10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Icon className="w-5 h-5" />
          </div>
          <CardTitle className="text-lg font-semibold text-white/90">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-6">
        <div className="text-4xl font-bold mb-2">
          {isLoading ? (
            <Skeleton className="h-12 w-20 bg-white/20" />
          ) : (
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {value}
            </span>
          )}
        </div>
        {!isLoading && (
          <div className="text-white/70 text-sm">
            {typeof value === 'number' && value > 0 ? '↗ Active' : 'Getting started'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

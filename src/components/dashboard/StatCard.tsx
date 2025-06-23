
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  isLoading?: boolean;
  gradient?: string;
  isAction?: boolean;
  onAction?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  isLoading = false, 
  gradient = "from-gray-100 to-gray-200",
  isAction = false,
  onAction
}: StatCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAction) {
      navigate('/create-game');
    }
  };

  return (
    <Card 
      className={`group transform transition-all duration-300 hover:scale-105 hover:shadow-strong bg-gradient-to-br ${gradient} text-white border-none shadow-medium overflow-hidden relative min-h-[120px] ${isAction ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/10"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
      
      {/* Icon background */}
      <div className="absolute top-2 right-2 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
        <Icon className="w-8 h-8" />
      </div>
      
      <CardHeader className="relative z-10 pb-1 pt-3 px-3">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
            <Icon className="w-3 h-3" />
          </div>
          <CardTitle className="text-xs font-semibold text-white/90 leading-tight">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-3 px-3 pt-0">
        <div className="space-y-1">
          <div className="text-xl font-bold">
            {isLoading ? (
              <Skeleton className="h-6 w-12 bg-white/20" />
            ) : (
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                {value}
              </span>
            )}
          </div>
          {!isLoading && !isAction && (
            <div className="text-white/70 text-xs font-medium">
              {typeof value === 'number' && value > 0 ? '↗ Actif' : 'En cours'}
            </div>
          )}
          {isAction && (
            <div className="text-white/70 text-xs font-medium">
              Créer un nouveau jeu
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

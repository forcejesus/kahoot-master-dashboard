
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoadingCardProps {
  delayIndex?: number;
}

export function LoadingCard({ delayIndex = 0 }: LoadingCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm overflow-hidden relative">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
        style={{
          transform: "translateX(-100%)",
          animation: `shimmer 2s infinite`,
          animationDelay: `${delayIndex * 0.2}s`
        }}
      />
      <CardHeader>
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-8 w-16 rounded-md animate-pulse" 
            style={{ animationDelay: `${delayIndex * 0.1}s` }} 
          />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Card>
  );
}

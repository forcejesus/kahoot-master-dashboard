
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Zap, BookOpen, Users, Trophy, Clock, Star } from 'lucide-react';

interface AdvancedLoadingProps {
  progress: number;
  title?: string;
  description?: string;
  showIcons?: boolean;
}

export function AdvancedLoading({ 
  progress, 
  title = "Chargement en cours...", 
  description,
  showIcons = true 
}: AdvancedLoadingProps) {
  const icons = [
    { Icon: BookOpen, color: "text-blue-500", delay: "0s" },
    { Icon: Users, color: "text-green-500", delay: "0.2s" },
    { Icon: Trophy, color: "text-yellow-500", delay: "0.4s" },
    { Icon: Clock, color: "text-purple-500", delay: "0.6s" },
    { Icon: Star, color: "text-pink-500", delay: "0.8s" },
    { Icon: Zap, color: "text-orange-500", delay: "1s" }
  ];

  const positions = [
    "top-4 left-4",
    "top-4 right-4", 
    "bottom-4 left-4",
    "bottom-4 right-4",
    "top-1/2 left-4 -translate-y-1/2",
    "top-1/2 right-4 -translate-y-1/2"
  ];

  return (
    <div className="relative w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl opacity-50"></div>
      
      {/* Floating icons */}
      {showIcons && icons.map((item, index) => (
        <div 
          key={index}
          className={`absolute ${positions[index]} opacity-20 transition-all duration-1000`}
          style={{ 
            animationDelay: item.delay,
            animation: `float 3s ease-in-out infinite`
          }}
        >
          <item.Icon 
            className={`w-6 h-6 ${item.color} animate-pulse`}
            style={{ animationDelay: item.delay }}
          />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Loading spinner and title */}
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}

        {/* Progress section */}
        <div className="space-y-4">
          {/* Animated progress bar */}
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-4 bg-gray-200 overflow-hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>

          {/* Percentage display */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Progression</span>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {Math.round(progress)}%
              </div>
              {progress > 90 && (
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              )}
            </div>
          </div>

          {/* Status indicator */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

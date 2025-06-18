
import { Navbar } from "@/components/Navbar";
import { CreateGameInterface } from "@/components/create-game/CreateGameInterface";
import { Sparkles, Gamepad2, Zap, Stars, Wand2 } from "lucide-react";

export default function CreateGame() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Main gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.3),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.25),transparent_60%)]"></div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Floating creative icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-1/5 left-1/4 w-7 h-7 text-yellow-400/25 animate-bounce" style={{ animationDelay: '1s' }} />
        <Gamepad2 className="absolute top-2/3 right-1/4 w-9 h-9 text-blue-400/20 animate-float" />
        <Wand2 className="absolute top-1/2 left-4/5 w-6 h-6 text-pink-400/30 animate-pulse" style={{ animationDelay: '2s' }} />
        <Stars className="absolute top-1/3 right-1/2 w-8 h-8 text-purple-400/25 animate-bounce" style={{ animationDelay: '4s' }} />
        <Zap className="absolute bottom-1/3 left-1/3 w-5 h-5 text-cyan-400/30 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <Navbar />
      
      <main className="h-screen flex flex-col pt-16 relative z-10">
        <CreateGameInterface />
      </main>
    </div>
  );
}

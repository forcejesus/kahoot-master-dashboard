
import { Navbar } from "@/components/Navbar";
import { CreateGameHeader } from "@/components/create-game/CreateGameHeader";
import { CreateGameForm } from "@/components/create-game/CreateGameForm";
import { ModernBackground } from "@/components/shared/ModernBackground";

export default function CreateGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Modern Background */}
      <ModernBackground />

      <Navbar />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          <CreateGameHeader />
          
          {/* Form Container with modern styling */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 hover:bg-white/15 transition-all duration-300">
            <CreateGameForm />
          </div>
        </div>
      </main>
    </div>
  );
}

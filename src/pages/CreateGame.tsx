
import { Navbar } from "@/components/Navbar";
import { CreateGameHeader } from "@/components/create-game/CreateGameHeader";
import { CreateGameForm } from "@/components/create-game/CreateGameForm";
import { ModernBackground } from "@/components/shared/ModernBackground";

export default function CreateGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <ModernBackground />
      <Navbar />
      
      <main className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto h-full">
            <CreateGameHeader />
            
            {/* Full-page form container */}
            <div className="h-full min-h-[calc(100vh-200px)]">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 h-full p-6 sm:p-8 lg:p-12 hover:bg-white/15 transition-all duration-300">
                <CreateGameForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

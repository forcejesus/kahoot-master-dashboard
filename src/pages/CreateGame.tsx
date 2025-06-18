
import { Navbar } from "@/components/Navbar";
import { CreateGameInterface } from "@/components/create-game/CreateGameInterface";
import { ModernBackground } from "@/components/shared/ModernBackground";

export default function CreateGame() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <ModernBackground />
      <Navbar />
      
      <main className="relative z-10 h-screen flex flex-col pt-16">
        <CreateGameInterface />
      </main>
    </div>
  );
}

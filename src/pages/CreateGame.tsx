
import { Navbar } from "@/components/Navbar";
import { CreateGameBackground } from "@/components/create-game/CreateGameBackground";
import { CreateGameHeader } from "@/components/create-game/CreateGameHeader";
import { CreateGameForm } from "@/components/create-game/CreateGameForm";

export default function CreateGame() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CreateGameBackground />

      <Navbar />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          <CreateGameHeader />
          <CreateGameForm />
        </div>
      </main>
    </div>
  );
}

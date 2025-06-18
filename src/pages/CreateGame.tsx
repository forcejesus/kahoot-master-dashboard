
import { Navbar } from "@/components/Navbar";
import { CreateGameInterface } from "@/components/create-game/CreateGameInterface";

export default function CreateGame() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      
      <main className="h-screen flex flex-col pt-16">
        <CreateGameInterface />
      </main>
    </div>
  );
}

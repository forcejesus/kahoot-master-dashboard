
import { Layout } from "@/components/Layout";
import { CreateGameInterface } from "@/components/create-game/CreateGameInterface";

export default function CreateGame() {
  return (
    <Layout>
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <CreateGameInterface />
      </div>
    </Layout>
  );
}

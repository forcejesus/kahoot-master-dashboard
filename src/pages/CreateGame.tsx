
import { Layout } from "@/components/Layout";
import { CreateGameInterface } from "@/components/create-game/CreateGameInterface";

export default function CreateGame() {
  return (
    <Layout showBackButton={true} backTo="/dashboard">
      <div className="h-full">
        <CreateGameInterface />
      </div>
    </Layout>
  );
}

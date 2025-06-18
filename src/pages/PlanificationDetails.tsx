
import { Layout } from "@/components/Layout";
import { PlanificationDetailsPage } from "@/components/planification/PlanificationDetailsPage";

export default function PlanificationDetails() {
  return (
    <Layout showBackButton={true} backTo="/dashboard">
      <div className="h-full">
        <PlanificationDetailsPage />
      </div>
    </Layout>
  );
}

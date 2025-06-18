
import { Layout } from "@/components/Layout";
import { PlanificationDetailsPage } from "@/components/planification/PlanificationDetailsPage";

export default function PlanificationDetails() {
  return (
    <Layout>
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <PlanificationDetailsPage />
      </div>
    </Layout>
  );
}

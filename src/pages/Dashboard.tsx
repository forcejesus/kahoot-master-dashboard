import { Layout } from '@/components/Layout';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { CreateKahootSection } from '@/components/dashboard/CreateKahootSection';
import { KahootList } from '@/components/dashboard/KahootList';

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <WelcomeHeader />
          <StatsSection />
          <CreateKahootSection />
          <KahootList />
        </div>
      </div>
    </Layout>
  );
}

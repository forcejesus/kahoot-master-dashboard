
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/contexts/I18nContext';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  backTo?: string;
  title?: string;
}

export function Layout({ children, showBackButton = false, backTo = '/dashboard', title }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path === '/dashboard') return 'Tableau de bord';
    if (path === '/create-game') return 'Créer un jeu';
    if (path === '/settings') return 'Paramètres';
    if (path.includes('/game/') && path.includes('/schedule')) return 'Planifier une session';
    if (path.includes('/game/')) return 'Détails du jeu';
    if (path.includes('/planification/')) return 'Détails de la planification';
    return '';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-8 w-8 hover:bg-blue-50" />
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(backTo)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              )}
              {getPageTitle() && (
                <h1 className="text-xl font-semibold text-gray-900 ml-2">
                  {getPageTitle()}
                </h1>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

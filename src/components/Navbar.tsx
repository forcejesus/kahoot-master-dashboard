
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  LogOut, 
  User, 
  Settings, 
  Menu, 
  X,
  Sparkles,
  Home,
  Plus
} from 'lucide-react';

export function Navbar() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      variant: 'ghost' as const
    },
    {
      label: 'Nouveau Kahoot',
      icon: Plus,
      path: '/create-game',
      variant: 'secondary' as const
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-neutral-200/50 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">AKILI</h1>
              <p className="text-xs text-neutral-500 font-medium">Espace Enseignant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={item.variant}
                  onClick={() => navigate(item.path)}
                  className="gap-2 font-medium transition-all duration-200 hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher variant="ghost" showLabel={false} />
            
            <div className="flex items-center gap-3 px-3 py-2 bg-neutral-100 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-neutral-900">
                  {user?.prenom || user?.name || 'Utilisateur'}
                </p>
                <p className="text-neutral-500">{user?.email}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-neutral-600 hover:text-red-600 transition-colors"
              title={t('nav.logout')}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 animate-slide-in">
            <div className="space-y-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 h-12"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
              
              <div className="border-t border-neutral-200 pt-3 mt-3">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {user?.prenom || user?.name || 'Utilisateur'}
                    </p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <LanguageSwitcher variant="outline" showLabel={true} />
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="flex-1 gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

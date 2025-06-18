
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home, Plus, Settings, LogOut, User, BarChart3, Calendar, Gamepad2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    title: 'Tableau de bord',
    url: '/dashboard',
    icon: Home,
    description: 'Vue d\'ensemble'
  },
  {
    title: 'Créer un jeu',
    url: '/create-game',
    icon: Plus,
    description: 'Nouveau Kahoot'
  },
  {
    title: 'Paramètres',
    url: '/settings',
    icon: Settings,
    description: 'Configuration'
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getUserInitials = () => {
    if (!user?.nom || !user?.prenom) return 'U';
    return `${user.prenom[0]}${user.nom[0]}`.toUpperCase();
  };

  return (
    <Sidebar className="border-r border-gray-200/50 bg-white/95 backdrop-blur-md">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              AKILI
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Plateforme éducative
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`w-full justify-start gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100' 
                          : 'hover:bg-gray-50 hover:text-gray-700 text-gray-600'
                      }`}
                    >
                      <button onClick={() => navigate(item.url)}>
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-xs text-gray-500">{item.description}</span>
                        </div>
                        {isActive && (
                          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 text-xs">
                            •
                          </Badge>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 h-auto rounded-xl hover:bg-gray-50">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-gray-900 text-sm">{user?.prenom} {user?.nom}</span>
                <span className="text-gray-500 text-xs truncate max-w-[120px]">{user?.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl shadow-lg border-gray-200" align="end" forceMount>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="rounded-lg">
              <User className="mr-3 h-4 w-4" />
              <span>Mon profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="rounded-lg">
              <Settings className="mr-3 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-600 focus:text-red-600 rounded-lg"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>{isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

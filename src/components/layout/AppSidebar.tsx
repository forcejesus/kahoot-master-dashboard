
import { Home, Gamepad2, Calendar, Users, Settings, BookOpen, Star, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Tableau de bord", url: "/dashboard", icon: Home, emoji: "🏠" },
  { title: "Mes Jeux", url: "/games", icon: Gamepad2, emoji: "🎮" },
  { title: "Planifications", url: "/planifications", icon: Calendar, emoji: "📅" },
  { title: "Apprenants", url: "/students", icon: Users, emoji: "👥" },
  { title: "Bibliothèque", url: "/library", icon: BookOpen, emoji: "📚" },
  { title: "Paramètres", url: "/settings", icon: Settings, emoji: "⚙️" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  return (
    <Sidebar className="border-r border-purple-200/50 bg-gradient-to-b from-purple-50/80 via-blue-50/60 to-cyan-50/40 backdrop-blur-sm relative overflow-hidden">
      {/* Éléments décoratifs dans la sidebar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-4 w-12 h-12 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-4 w-8 h-8 bg-blue-200/20 rounded-full blur-lg animate-pulse delay-500"></div>
        <Star className="absolute top-1/3 left-1/2 w-3 h-3 text-purple-300/30 animate-pulse" />
        <Sparkles className="absolute bottom-1/4 right-1/3 w-2 h-2 text-blue-300/40 animate-pulse delay-700" />
      </div>

      <SidebarHeader className="p-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300">
              <Gamepad2 className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs">✨</span>
            </div>
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AKILI
              </h2>
              <p className="text-sm text-purple-600/80 font-semibold flex items-center space-x-1">
                <span>🎯 Éducation interactive</span>
                <Sparkles className="h-3 w-3 text-purple-500 animate-pulse" />
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 relative z-10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700/80 font-bold text-xs uppercase tracking-wider flex items-center space-x-2">
            <span>🚀 Navigation</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`h-14 rounded-2xl transition-all duration-300 group ${
                      isActive(item.url)
                        ? "bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 text-purple-800 font-bold shadow-lg border-2 border-purple-200/60 transform scale-105"
                        : "hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 text-gray-700 hover:text-purple-700 hover:scale-102 hover:shadow-md"
                    }`}
                  >
                    <NavLink to={item.url} className="flex items-center space-x-4 w-full">
                      <div className="relative">
                        <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                        {isActive(item.url) && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      {state === "expanded" && (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{item.emoji}</span>
                          <span className="font-semibold">{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Section inspirante */}
        {state === "expanded" && (
          <div className="mt-8 p-4 bg-gradient-to-br from-purple-100/60 to-blue-100/60 rounded-2xl border border-purple-200/40 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <div className="text-2xl">🌟</div>
              <p className="text-sm font-semibold text-purple-700">
                Inspirez vos élèves !
              </p>
              <p className="text-xs text-purple-600/80">
                Chaque jeu créé est une nouvelle aventure d'apprentissage
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

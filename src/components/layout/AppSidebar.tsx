
import { Home, Gamepad2, Calendar, Users, Settings, BookOpen } from "lucide-react";
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
  { title: "Tableau de bord", url: "/dashboard", icon: Home },
  { title: "Mes Jeux", url: "/games", icon: Gamepad2 },
  { title: "Planifications", url: "/planifications", icon: Calendar },
  { title: "Apprenants", url: "/students", icon: Users },
  { title: "Bibliothèque", url: "/library", icon: BookOpen },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  return (
    <Sidebar className="border-r border-orange-200/50 bg-gradient-to-b from-orange-50/50 to-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                AKILI
              </h2>
              <p className="text-sm text-orange-600/70 font-medium">Éducation interactive</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-700/80 font-semibold text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`h-12 rounded-xl transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 font-semibold shadow-sm border border-orange-200/50"
                        : "hover:bg-orange-50/50 text-gray-700 hover:text-orange-600"
                    }`}
                  >
                    <NavLink to={item.url} className="flex items-center space-x-3 w-full">
                      <item.icon className="h-5 w-5" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

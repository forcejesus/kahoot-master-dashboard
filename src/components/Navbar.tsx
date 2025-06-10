
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogOut, User, Sparkles } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo et nom d'utilisateur */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Bienvenue,</p>
                  <p className="font-semibold text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {user?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions à droite */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher showLabel={false} />
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 rounded-xl px-4 py-2 backdrop-blur-sm"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">{t('nav.logout')}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

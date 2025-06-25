
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo et nom de la plateforme */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                AKILI
              </div>
              <div className="h-6 w-0.5 bg-slate-300"></div>
              <div className="text-lg font-medium text-slate-600">
                Espace Enseignant
              </div>
            </div>
            
            <div className="hidden sm:block ml-8">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-sm">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Bienvenue,</p>
                  <p className="font-semibold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
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
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-200 rounded-xl px-4 py-2 backdrop-blur-sm"
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


import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="font-medium text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user?.name}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher showLabel={true} />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {t('nav.logout')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

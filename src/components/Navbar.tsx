
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-soft border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-soft">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                AKILI
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {user?.name}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </nav>
  );
}

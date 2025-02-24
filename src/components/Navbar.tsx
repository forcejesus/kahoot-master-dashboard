
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-primary" />
            <span className="font-medium">{user?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
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

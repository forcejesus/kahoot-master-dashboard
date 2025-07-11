
import { Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 md:p-8 rounded-2xl shadow-lg mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-soft">
          <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              AKILI
            </h1>
            <div className="h-8 w-1 bg-white/50 rounded-full"></div>
            <span className="text-xl md:text-2xl font-medium text-orange-100">
              Bonjour, {user?.name || 'Enseignant'}! 👋
            </span>
          </div>
          <p className="text-orange-100 text-sm md:text-base leading-relaxed">
            Bienvenue sur votre tableau de bord AKILI. Gérez vos jeux éducatifs, 
            suivez vos planifications et analysez les performances de vos étudiants.
          </p>
        </div>
      </div>
    </div>
  );
}

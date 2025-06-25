
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Gamepad, Calendar } from 'lucide-react';

interface ActionCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  iconColor: string;
  route: string;
}

export function QuickActions() {
  const navigate = useNavigate();

  const actions: ActionCard[] = [
    {
      title: "Créer un nouveau jeu",
      description: "Concevez un nouveau Kahoot interactif avec des questions personnalisées",
      icon: Gamepad,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      route: "/game/setup"
    },
    {
      title: "Planifier une session",
      description: "Organisez une session de jeu avec vos étudiants à une date spécifique",
      icon: Calendar,
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
      route: "/game/schedule"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {actions.map((action, index) => (
        <Card 
          key={index}
          className="bg-white border-orange-200 hover-lift group cursor-pointer"
          onClick={() => navigate(action.route)}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-lg ${action.bgColor} flex items-center justify-center shadow-soft`}>
                <action.icon className={`h-6 w-6 ${action.iconColor} icon-scale`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 arrow-slide" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

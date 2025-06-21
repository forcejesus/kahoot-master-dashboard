
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Plus,
  Clock,
  Target,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeacherToolsSectionProps {
  recentActivities: any[];
  upcomingSessions: any[];
}

export function TeacherToolsSection({ recentActivities, upcomingSessions }: TeacherToolsSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Actions rapides */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => navigate('/create-game')}
            className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <BookOpen className="w-4 h-4" />
            Créer un nouveau quiz
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <Users className="w-4 h-4" />
            Gérer les participants
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Voir les statistiques
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
          >
            <Settings className="w-4 h-4" />
            Paramètres des quiz
          </Button>
        </CardContent>
      </Card>

      {/* Activités récentes */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Activités Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.participants} participants
                </Badge>
              </div>
            )) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Aucune activité récente</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate('/create-game')}
                >
                  Créer votre premier quiz
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sessions à venir */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            Prochaines Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{session.title}</p>
                    <p className="text-xs text-gray-500">{session.scheduledDate}</p>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-700 text-xs">
                  {session.duration}min
                </Badge>
              </div>
            )) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Aucune session programmée</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                >
                  Programmer une session
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GamepadIcon, Calendar, TrendingUp, Activity, Target } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    totalGames: number;
    totalUsers: number;
    activeSessions: number;
    totalParticipants: number;
    growthRate: number;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: 'Total Jeux',
      value: stats.totalGames.toLocaleString(),
      icon: GamepadIcon,
      color: 'blue',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Utilisateurs',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'green',
      change: `+${stats.growthRate}%`,
      changeType: 'positive' as const
    },
    {
      title: 'Sessions Actives',
      value: stats.activeSessions.toString(),
      icon: Activity,
      color: 'orange',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Participants',
      value: stats.totalParticipants.toLocaleString(),
      icon: Target,
      color: 'purple',
      change: '+28%',
      changeType: 'positive' as const
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className={`h-3 w-3 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">vs mois dernier</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

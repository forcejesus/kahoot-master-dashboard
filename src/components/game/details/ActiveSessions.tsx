
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Planification } from "@/types/game-details";

interface ActiveSessionsProps {
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function ActiveSessions({ planificationsEnCours, onCopyPin }: ActiveSessionsProps) {
  if (planificationsEnCours.length === 0) {
    return null;
  }
  
  return (
    <Card className="mb-8 backdrop-blur-sm bg-white/80 border-t border-white/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Sessions actives
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {planificationsEnCours.map((planif) => (
          <div key={planif._id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 px-4 py-2 rounded-lg">
                  <span className="text-primary font-mono font-bold">{planif.pin}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyPin(planif.pin)}
                  className="flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copier le PIN</span>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Expire le {new Date(planif.date_fin).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">Participants ({planif.participants?.length || 0})</h4>
              {planif.participants && planif.participants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {planif.participants.map((participant, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span>{participant.apprenant}</span>
                      <span className="font-mono font-bold text-primary">
                        {participant.score} pts
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Aucun participant pour le moment
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

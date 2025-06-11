
import { ParticipantDetail } from "@/types/planification-details";
import { EnhancedTable, EnhancedTableHeader, EnhancedTableRow, EnhancedTableCell } from "@/components/ui/enhanced-table";
import { TableBody, TableHead } from "@/components/ui/table";
import { UserRoundCheck, Trophy, Medal, Award, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ParticipantsListProps {
  participants: ParticipantDetail[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 1: return <Medal className="h-4 w-4 text-gray-400" />;
      case 2: return <Award className="h-4 w-4 text-amber-600" />;
      default: return null;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return <Badge className="bg-yellow-100 text-yellow-800">1er</Badge>;
      case 1: return <Badge className="bg-gray-100 text-gray-800">2ème</Badge>;
      case 2: return <Badge className="bg-amber-100 text-amber-800">3ème</Badge>;
      default: return <Badge variant="outline">{index + 1}ème</Badge>;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserRoundCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Liste des participants</h2>
            <p className="text-sm text-gray-600">Classement par score décroissant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="h-4 w-4" />
          <span>{participants.length} participant{participants.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {participants.length > 0 ? (
        <EnhancedTable priority="medium" className="w-full">
          <EnhancedTableHeader priority="medium">
            <EnhancedTableRow priority="medium">
              <TableHead className="w-20">Rang</TableHead>
              <TableHead>Apprenant</TableHead>
              <TableHead>Matricule</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center">Réponses correctes</TableHead>
              <TableHead className="text-center">Taux de réussite</TableHead>
            </EnhancedTableRow>
          </EnhancedTableHeader>
          <TableBody>
            {sortedParticipants.map((participant, index) => {
              const correctResponses = participant.reponses.filter(r => r.etat).length;
              const totalResponses = participant.reponses.length;
              const successRate = totalResponses > 0 ? Math.round((correctResponses/totalResponses) * 100) : 0;
              
              return (
                <EnhancedTableRow key={participant._id} priority="medium">
                  <EnhancedTableCell priority="medium" className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getRankIcon(index)}
                      {getRankBadge(index)}
                    </div>
                  </EnhancedTableCell>
                  
                  <EnhancedTableCell priority="medium" highlight={index < 3}>
                    <div className="font-medium">
                      {participant.apprenant.prenom} {participant.apprenant.nom}
                    </div>
                  </EnhancedTableCell>
                  
                  <EnhancedTableCell priority="medium">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {participant.apprenant.matricule}
                    </code>
                  </EnhancedTableCell>
                  
                  <EnhancedTableCell priority="medium" className="text-center">
                    <div className="font-bold text-lg text-purple-600">
                      {participant.score}
                    </div>
                  </EnhancedTableCell>
                  
                  <EnhancedTableCell priority="medium" className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{correctResponses}/{totalResponses}</span>
                      <span className="text-xs text-gray-500">réponses</span>
                    </div>
                  </EnhancedTableCell>
                  
                  <EnhancedTableCell priority="medium" className="text-center">
                    <Badge 
                      variant={successRate >= 80 ? "default" : successRate >= 60 ? "secondary" : "destructive"}
                      className={`${successRate >= 80 ? 'bg-green-100 text-green-800' : 
                                  successRate >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}`}
                    >
                      {successRate}%
                    </Badge>
                  </EnhancedTableCell>
                </EnhancedTableRow>
              );
            })}
          </TableBody>
        </EnhancedTable>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserRoundCheck className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun participant</h3>
          <p className="text-gray-500">Aucun participant n'a encore joué à cette session.</p>
        </div>
      )}
    </div>
  );
}


import { ParticipantDetail } from "@/types/planification-details";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserRoundCheck, Trophy, Medal } from "lucide-react";

interface ParticipantsListProps {
  participants: ParticipantDetail[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  // Trier les participants par score (décroissant)
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <UserRoundCheck className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-bold text-primary">Liste des participants</h2>
      </div>

      {participants.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rang</TableHead>
                <TableHead>Apprenant</TableHead>
                <TableHead>Matricule</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Réponses correctes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedParticipants.map((participant, index) => {
                // Calculer le nombre de réponses correctes
                const correctResponses = participant.reponses.filter(r => r.etat).length;
                const totalResponses = participant.reponses.length;
                
                return (
                  <TableRow key={participant._id}>
                    <TableCell className="font-medium">
                      {index === 0 ? (
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                          <span>1er</span>
                        </div>
                      ) : index === 1 ? (
                        <div className="flex items-center">
                          <Medal className="h-5 w-5 text-gray-400 mr-1" />
                          <span>2e</span>
                        </div>
                      ) : index === 2 ? (
                        <div className="flex items-center">
                          <Medal className="h-5 w-5 text-amber-700 mr-1" />
                          <span>3e</span>
                        </div>
                      ) : (
                        <span>{index + 1}e</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {participant.apprenant.prenom} {participant.apprenant.nom}
                    </TableCell>
                    <TableCell>{participant.apprenant.matricule}</TableCell>
                    <TableCell className="font-bold">{participant.score}</TableCell>
                    <TableCell className="text-right">
                      {correctResponses}/{totalResponses} ({Math.round((correctResponses/totalResponses) * 100)}%)
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun participant n'a encore joué à cette session.</p>
        </div>
      )}
    </div>
  );
}

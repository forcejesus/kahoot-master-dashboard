
import { UserResponse } from "@/types/game-details";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UserResponsesProps {
  questionId: string;
  token: string;
}

export function UserResponses({ questionId, token }: UserResponsesProps) {
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserResponses = async () => {
    if (!questionId || loading) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/reponse?question=${questionId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des réponses");
      }
      
      const data = await response.json();
      setUserResponses(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réponses:", error);
      toast.error("Impossible de charger les réponses des apprenants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="responses">
        <AccordionTrigger 
          onClick={fetchUserResponses}
          className="flex items-center justify-between py-2"
        >
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>Réponses des apprenants</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {loading ? (
            <div className="space-y-3 mt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-md border">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-2/3 mb-1" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))}
            </div>
          ) : userResponses?.length ? (
            <div className="space-y-2 mt-2">
              {userResponses.map((response, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-md border ${
                    response.etat === 1 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{response.apprenant.name}</span>
                    <Badge 
                      variant={response.etat === 1 ? "success" : "destructive"}
                      className={response.etat === 1 ? "bg-green-500" : "bg-red-500"}
                    >
                      {response.etat === 1 ? "Correcte" : "Incorrecte"}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">
                    Réponse: {response.reponse_texte}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(response.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              Aucune réponse pour cette question
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

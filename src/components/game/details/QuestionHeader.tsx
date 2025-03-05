
import { Question } from "@/types/game-details";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TimerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuestionHeaderProps {
  question: Question;
  index: number;
}

export function QuestionHeader({ question, index }: QuestionHeaderProps) {
  return (
    <CardHeader className="bg-gray-50 rounded-t-lg">
      <CardTitle className="text-lg flex justify-between items-center">
        <span>Question {index + 1}: {question.libelle}</span>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{question.temps || "30"} sec</span>
          </Badge>
          {question.limite_response ? (
            <Badge variant="success" className="flex items-center gap-1">
              <TimerIcon className="h-3 w-3" />
              <span>Chrono activé</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1">
              <TimerIcon className="h-3 w-3" />
              <span>Sans chrono</span>
            </Badge>
          )}
        </div>
      </CardTitle>
    </CardHeader>
  );
}

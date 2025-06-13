
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/game-details";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionCard } from "./QuestionCard";
import { useTranslation } from "@/contexts/I18nContext";
import { HelpCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionsDisplayProps {
  questions?: Question[];
}

export function QuestionsDisplay({ questions }: QuestionsDisplayProps) {
  const { token } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header avec titre et actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{t('details.questions')}</h2>
            <p className="text-sm text-slate-600">
              {questions?.length ? 
                t('question.responses', { count: questions.length }) : 
                t('details.noQuestions')
              }
            </p>
          </div>
        </div>
        
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {t('game.addQuestion')}
        </Button>
      </div>

      {/* Liste des questions */}
      {questions && questions.length > 0 ? (
        <div className="grid gap-6">
          {questions.map((question, index) => (
            <QuestionCard 
              key={question._id || index}
              question={question}
              index={index}
              token={token}
            />
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t('details.noQuestions')}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Commencez par ajouter des questions à votre jeu pour créer une expérience d'apprentissage engageante.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {t('game.addQuestion')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Calendar, Users } from 'lucide-react';
import { ScheduleFormProvider } from '@/components/game/schedule/ScheduleFormContext';
import { ScheduleFormInputs } from '@/components/game/schedule/ScheduleFormInputs';
import { ScheduleSubmitButton } from '@/components/game/schedule/ScheduleSubmitButton';
import { ScheduleSuccess } from '@/components/game/schedule/ScheduleSuccess';

interface GameCreationStep3Props {
  gameId: string | null;
  gameTitle: string;
  onFinish: () => void;
  onPrevious: () => void;
  token: string | null;
}

export function GameCreationStep3({ gameId, gameTitle, onFinish, onPrevious, token }: GameCreationStep3Props) {
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Planification (Optionnelle)
        </h2>
        <p className="text-gray-600">
          Voulez-vous planifier une session pour votre jeu "{gameTitle}" ?
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {!showScheduleForm ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <div 
                className="p-6 border-2 border-violet-200 rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setShowScheduleForm(true)}
              >
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-violet-700">
                    Planifier maintenant
                  </h3>
                  <p className="text-violet-600">
                    Définissez une date et invitez vos apprenants
                  </p>
                </div>
              </div>

              <div 
                className="p-6 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={onFinish}
              >
                <div className="text-center space-y-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">
                    Terminer plus tard
                  </h3>
                  <p className="text-gray-600">
                    Planifiez depuis le tableau de bord
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full">
            <ScheduleFormProvider gameId={gameId || ""}>
              <div className="space-y-4">
                <ScheduleFormInputs />
                <ScheduleSubmitButton />
                <ScheduleSuccess gameId={gameId || ""} onClose={onFinish} />
              </div>
            </ScheduleFormProvider>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="px-6 h-12 border-2 border-orange-200 hover:bg-orange-50 text-lg"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Précédent
        </Button>
        
        {!showScheduleForm && (
          <Button 
            onClick={onFinish}
            className="px-6 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Check className="mr-2 h-5 w-5" />
            Terminer la création
          </Button>
        )}
      </div>
    </div>
  );
}

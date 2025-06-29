
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Sparkles, CalendarPlus } from "lucide-react";
import { Kahoot } from "@/types/game-details";
import { ScheduleFormProvider } from "@/components/game/schedule/ScheduleFormContext";
import { ScheduleFormInputs } from "@/components/game/schedule/ScheduleFormInputs";
import { ScheduleSubmitButton } from "@/components/game/schedule/ScheduleSubmitButton";
import { ScheduleSuccess } from "@/components/game/schedule/ScheduleSuccess";

interface ScheduleGameModalProps {
  kahoots: Kahoot[];
  onSuccess?: () => void;
}

export function ScheduleGameModal({ kahoots, onSuccess }: ScheduleGameModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  const handleClose = () => {
    setSelectedGameId("");
    setIsOpen(false);
  };

  const handleSuccess = () => {
    onSuccess?.();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          {/* Effet de profondeur */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-700 rounded-3xl transform rotate-1 scale-105 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-600 rounded-3xl transform -rotate-1 scale-102 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-violet-50 via-white to-violet-100 border-2 border-violet-200/50 rounded-3xl p-8 shadow-2xl shadow-violet-900/20 hover:shadow-3xl hover:shadow-violet-900/30 transition-all duration-300 transform hover:scale-[1.02] h-32 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="h-6 w-6 text-violet-500 animate-pulse" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-violet-700 to-violet-800 bg-clip-text text-transparent">
                  Planifier une session
                </h3>
                <p className="text-sm text-violet-600/80 font-medium">
                  Organisez vos sessions de jeu
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[700px] bg-gradient-to-br from-violet-50 via-white to-violet-100 border-2 border-violet-200/50 rounded-3xl shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
            <CalendarPlus className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-violet-600 via-violet-700 to-violet-800 bg-clip-text text-transparent">
              Planifier une session de jeu
            </DialogTitle>
            <p className="text-violet-600/70 mt-2 text-lg">
              Configurez les détails de votre session éducative
            </p>
          </div>
          
          {/* Ligne décorative */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-1 w-8 bg-gradient-to-r from-transparent to-violet-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full shadow-lg"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-violet-500 to-transparent rounded-full"></div>
          </div>
        </DialogHeader>

        {kahoots.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun jeu disponible</h3>
              <p className="text-gray-600">
                Vous devez d'abord créer un jeu avant de pouvoir planifier une session.
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="mt-4">
              Fermer
            </Button>
          </div>
        ) : (
          <ScheduleFormProvider gameId={selectedGameId}>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <span>Sélectionner un jeu</span>
                  <span className="text-violet-500">*</span>
                </label>
                <select
                  value={selectedGameId}
                  onChange={(e) => setSelectedGameId(e.target.value)}
                  className="w-full h-14 text-lg border-2 border-violet-200 focus:border-violet-400 focus:ring-violet-200 bg-white/80 rounded-xl px-4"
                  required
                >
                  <option value="">Choisissez un jeu à planifier</option>
                  {kahoots.map((kahoot) => (
                    <option key={kahoot._id} value={kahoot._id}>
                      {kahoot.titre}
                    </option>
                  ))}
                </select>
              </div>

              {selectedGameId && (
                <div className="space-y-6">
                  <ScheduleFormInputs />
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-14 border-2 border-violet-200 hover:bg-violet-50 text-lg font-semibold rounded-xl"
                      onClick={handleClose}
                    >
                      Annuler
                    </Button>
                    <ScheduleSubmitButton />
                  </div>
                </div>
              )}
              
              <ScheduleSuccess gameId={selectedGameId} onClose={handleSuccess} />
            </div>
          </ScheduleFormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
}


import { createContext, ReactNode, useContext, useState } from "react";
import { format } from "date-fns";
import { PlanificationFormData } from "@/types/game-details";

interface ScheduleFormContextType {
  formData: PlanificationFormData;
  setFormData: React.Dispatch<React.SetStateAction<PlanificationFormData>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  createdPin: string | null;
  setCreatedPin: React.Dispatch<React.SetStateAction<string | null>>;
}

const ScheduleFormContext = createContext<ScheduleFormContextType | undefined>(undefined);

export function ScheduleFormProvider({ 
  children, 
  gameId 
}: { 
  children: ReactNode;
  gameId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPin, setCreatedPin] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<PlanificationFormData>({
    statut: "en attente",
    date_debut: format(new Date(), "yyyy/MM/dd"),
    date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"), // 7 jours plus tard
    heure_debut: "08h00",
    heure_fin: "18h00",
    limite_participant: 10,
    type: "attribuer",
    jeu: gameId || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ScheduleFormContext.Provider 
      value={{ 
        formData, 
        setFormData, 
        handleInputChange, 
        handleSelectChange,
        isSubmitting,
        setIsSubmitting,
        createdPin,
        setCreatedPin
      }}
    >
      {children}
    </ScheduleFormContext.Provider>
  );
}

export function useScheduleForm() {
  const context = useContext(ScheduleFormContext);
  if (context === undefined) {
    throw new Error("useScheduleForm must be used within a ScheduleFormProvider");
  }
  return context;
}

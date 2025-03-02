
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SchedulePinDialogProps {
  pin: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function SchedulePinDialog({ pin, open, onOpenChange, onClose }: SchedulePinDialogProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyPin = () => {
    navigator.clipboard.writeText(pin);
    setCopied(true);
    toast.success("PIN copié dans le presse-papier");
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Session planifiée avec succès</AlertDialogTitle>
          <AlertDialogDescription>
            Partagez ce code PIN avec vos participants pour qu'ils puissent rejoindre la session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex items-center justify-center py-6">
          <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-4">
            <span className="text-3xl font-mono font-bold tracking-wider text-primary">{pin}</span>
            <Button 
              size="sm" 
              variant={copied ? "outline" : "default"}
              onClick={handleCopyPin}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copier
                </>
              )}
            </Button>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Fermer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

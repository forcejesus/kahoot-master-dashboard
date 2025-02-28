
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileUploadFieldProps {
  onFileChange: (file: File | null) => void;
  currentFileType: string;
}

export function FileUploadField({ onFileChange, currentFileType }: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Fichier sélectionné:", file.name, file.type, file.size);
    }
    onFileChange(file || null);
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="fichier">Fichier média (optionnel)</Label>
      <div className="flex flex-col gap-2">
        <Input
          id="fichier"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg,.gif,.mp3,.mp4"
          className="cursor-pointer"
        />
        {currentFileType && (
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Type de fichier détecté : {currentFileType}</span>
            <button 
              type="button" 
              onClick={handleClearFile}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Effacer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileUploadFieldProps {
  onFileChange: (file: File | null, fileType: string) => void;
  currentFileType: string;
}

export function FileUploadField({ onFileChange, currentFileType }: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[1]?.toLowerCase();
      onFileChange(file, fileType === 'jpeg' ? 'jpg' : fileType);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="fichier">Fichier média (optionnel)</Label>
      <Input
        id="fichier"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.gif"
        className="cursor-pointer"
      />
      {currentFileType && (
        <div className="text-sm text-muted-foreground">
          Type de fichier détecté : {currentFileType}
        </div>
      )}
    </div>
  );
}


import { Sparkles } from 'lucide-react';
import { FileUploadField } from './FileUploadField';

interface MediaSectionProps {
  onFileChange: (file: File | null) => void;
  currentFileType?: string;
}

export function MediaSection({ onFileChange, currentFileType }: MediaSectionProps) {
  return (
    <div className="p-8 border-b">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-xl">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Média (Optionnel)</h3>
        <span className="text-sm text-gray-500">Ajoutez une image ou vidéo pour enrichir votre question</span>
      </div>
      <FileUploadField 
        onFileChange={onFileChange}
        currentFileType={currentFileType}
      />
    </div>
  );
}

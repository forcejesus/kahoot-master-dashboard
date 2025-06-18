
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";

interface CreateGameImageUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
  disabled?: boolean;
}

export function CreateGameImageUpload({ image, onImageChange, disabled }: CreateGameImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    image ? URL.createObjectURL(image) : null
  );

  const handleImageChange = (file: File) => {
    onImageChange(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    onImageChange(null);
    setPreviewUrl(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-blue-600" />
        Image du jeu
        <span className="text-sm font-normal text-gray-500">(Optionnel)</span>
      </Label>
      
      {!previewUrl ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("image")?.click()}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2 font-heading">
                {dragActive ? "Déposez votre image ici" : "Ajoutez une image à votre jeu"}
              </p>
              <p className="text-gray-500 font-medium">
                Glissez-déposez ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-400 mt-2">
                PNG, JPG jusqu'à 10MB
              </p>
            </div>
          </div>
          
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <img 
            src={previewUrl}
            alt="Aperçu" 
            className="w-full h-64 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <p className="font-semibold text-sm">Image sélectionnée</p>
            <p className="text-xs opacity-90">{image?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

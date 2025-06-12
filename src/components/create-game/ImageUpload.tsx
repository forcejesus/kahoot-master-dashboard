
import { useState } from "react";
import { useTranslation } from "@/contexts/I18nContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
  isLoading: boolean;
}

export function ImageUpload({ image, onImageChange, isLoading }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { t } = useTranslation();

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
      <Label className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-purple-600" />
        {t('create.imageLabel')} 
        <span className="text-sm font-normal text-gray-500">({t('create.optional') || "optionnel"})</span>
      </Label>
      
      {!previewUrl ? (
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive 
              ? 'border-purple-400 bg-purple-50 scale-105' 
              : 'border-gray-300 bg-gray-50/50 hover:border-purple-300 hover:bg-purple-50/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("image")?.click()}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {dragActive ? "Déposez votre image ici" : "Ajoutez une image à votre jeu"}
              </p>
              <p className="text-gray-500">
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
            disabled={isLoading}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={previewUrl}
            alt="Aperçu" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-semibold">Image sélectionnée</p>
            <p className="text-sm opacity-80">{image?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

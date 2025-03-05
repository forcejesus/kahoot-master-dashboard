
import { ImageIcon } from "lucide-react";

interface QuestionImageProps {
  imageUrl: string | null;
  index: number;
}

export function QuestionImage({ imageUrl, index }: QuestionImageProps) {
  if (imageUrl) {
    return (
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-100">
        <img
          src={imageUrl}
          alt={`Image question ${index + 1}`}
          className="object-contain w-full h-full"
        />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center w-full h-[100px] bg-gray-100 rounded-lg">
      <div className="text-gray-400 flex flex-col items-center">
        <ImageIcon className="w-8 h-8 mb-1" />
        <span className="text-sm">Aucune image</span>
      </div>
    </div>
  );
}

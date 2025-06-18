
import { useState } from "react";
import { CreateGameHeader } from "./CreateGameHeader";
import { CreateGameForm } from "./CreateGameForm";
import { CreateGamePreview } from "./CreateGamePreview";

export function CreateGameInterface() {
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full bg-white">
      {/* Configuration Panel - Left Side */}
      <div className="flex flex-col h-full border-r border-gray-200">
        <CreateGameHeader />
        <CreateGameForm 
          titre={titre}
          onTitreChange={setTitre}
          image={image}
          onImageChange={setImage}
        />
      </div>

      {/* Preview Panel - Right Side */}
      <div className="bg-gray-50 h-full">
        <CreateGamePreview 
          title={titre}
          image={image}
        />
      </div>
    </div>
  );
}

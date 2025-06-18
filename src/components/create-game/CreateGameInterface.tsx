
import { useState } from "react";
import { CreateGameHeader } from "./CreateGameHeader";
import { CreateGameForm } from "./CreateGameForm";
import { CreateGamePreview } from "./CreateGamePreview";

export function CreateGameInterface() {
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
      {/* Configuration Panel - Left Side */}
      <div className="flex flex-col h-full bg-white/10 backdrop-blur-xl border-r border-white/20">
        <CreateGameHeader />
        <CreateGameForm 
          titre={titre}
          onTitreChange={setTitre}
          image={image}
          onImageChange={setImage}
        />
      </div>

      {/* Preview Panel - Right Side */}
      <div className="bg-white/5 backdrop-blur-xl h-full border-l border-white/10">
        <CreateGamePreview 
          title={titre}
          image={image}
        />
      </div>
    </div>
  );
}

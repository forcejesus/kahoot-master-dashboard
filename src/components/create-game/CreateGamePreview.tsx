
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Image as ImageIcon, Type, Clock, Users } from "lucide-react";

interface CreateGamePreviewProps {
  title: string;
  image: File | null;
}

export function CreateGamePreview({ title, image }: CreateGamePreviewProps) {
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="h-full flex flex-col p-4 lg:p-8 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-6 h-6 text-white/80" />
          <h2 className="text-2xl font-bold text-white">Aperçu en temps réel</h2>
        </div>
        <p className="text-white/60">
          Voici comment votre Kahoot apparaîtra aux participants
        </p>
      </div>

      {/* Game Preview Card */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
        <CardHeader className="relative">
          {previewUrl ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
              <img 
                src={previewUrl}
                alt="Aperçu du jeu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Aucune image sélectionnée</p>
              </div>
            </div>
          )}
          
          <CardTitle className="text-2xl lg:text-3xl font-black text-gray-800 min-h-[1.2em] flex items-center">
            {title ? (
              <span className="flex items-center gap-2">
                <Type className="w-6 h-6 text-purple-600" />
                {title}
              </span>
            ) : (
              <span className="text-gray-400 italic text-xl">Votre titre apparaîtra ici...</span>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Game Stats Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-xl font-bold text-gray-800">0</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Participants</p>
              <p className="text-xl font-bold text-gray-800">∞</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 px-4 py-2">
              🚧 En cours de création
            </Badge>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-2">Prochaines étapes :</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Donner un titre à votre Kahoot</li>
              <li className="opacity-50">📝 Ajouter des questions interactives</li>
              <li className="opacity-50">🎯 Configurer les réponses et points</li>
              <li className="opacity-50">🚀 Publier et partager avec vos participants</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

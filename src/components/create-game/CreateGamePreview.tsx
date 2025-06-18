
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Image as ImageIcon, Type, Clock, Users, Gamepad2 } from "lucide-react";

interface CreateGamePreviewProps {
  title: string;
  image: File | null;
}

export function CreateGamePreview({ title, image }: CreateGamePreviewProps) {
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Eye className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-heading">Aperçu en temps réel</h2>
            <p className="text-gray-600 font-medium">
              Voici comment votre Kahoot apparaîtra aux participants
            </p>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Game Image Section - Full Width */}
        {previewUrl ? (
          <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8 shadow-xl border border-gray-200">
            <img 
              src={previewUrl}
              alt="Aperçu du jeu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Kahoot Game</span>
              </div>
              {title && (
                <h3 className="text-2xl font-bold mb-1">{title}</h3>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-8 border border-gray-200">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">Aucune image sélectionnée</p>
              <p className="text-gray-400 text-sm">L'image de votre jeu apparaîtra ici</p>
            </div>
          </div>
        )}

        {/* Game Info Card */}
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-3">
              {title ? (
                <>
                  <Type className="w-6 h-6 text-blue-600" />
                  {title}
                </>
              ) : (
                <span className="text-gray-400 italic text-xl font-normal">Votre titre apparaîtra ici...</span>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Game Stats Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600 mb-1">Questions</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600 mb-1">Participants</p>
                <p className="text-2xl font-bold text-gray-900">∞</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 px-4 py-2 font-medium">
                🚧 En cours de création
              </Badge>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-4 font-heading">Prochaines étapes :</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Donner un titre à votre Kahoot</span>
                </li>
                <li className="flex items-center gap-3 text-sm opacity-60">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Ajouter des questions interactives</span>
                </li>
                <li className="flex items-center gap-3 text-sm opacity-60">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Configurer les réponses et points</span>
                </li>
                <li className="flex items-center gap-3 text-sm opacity-60">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Publier et partager avec vos participants</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

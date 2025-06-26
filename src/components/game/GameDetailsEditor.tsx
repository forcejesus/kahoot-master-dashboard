
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Edit2, Save, X } from 'lucide-react';
import { buildApiUrl } from '@/config/api';

interface GameDetailsEditorProps {
  gameId: string;
  currentTitle: string;
  currentImage?: string;
  token: string | null;
  onUpdate: (newTitle: string, newImage?: string) => void;
}

export function GameDetailsEditor({ 
  gameId, 
  currentTitle, 
  currentImage, 
  token, 
  onUpdate 
}: GameDetailsEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('titre', title);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(buildApiUrl(`/api/jeux/update/${gameId}`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update game');
      }

      const data = await response.json();
      toast.success("Jeu mis à jour avec succès");
      onUpdate(title, data.data?.image || currentImage);
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setTitle(currentTitle);
    setImageFile(null);
    setIsEditing(false);
  };

  return (
    <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-orange-600">
          Détails du jeu
        </CardTitle>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Modifier
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Titre du jeu</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter le titre du jeu"
                className="bg-white/80"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image du jeu (optionnel)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="bg-white/80"
              />
              {imageFile && (
                <p className="text-sm text-green-600">
                  Nouvelle image sélectionnée: {imageFile.name}
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Sauvegarder
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Annuler
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-600">Titre</Label>
              <p className="text-lg font-semibold text-gray-900">{currentTitle}</p>
            </div>
            {currentImage && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Image actuelle</Label>
                <img 
                  src={`${buildApiUrl('')}/${currentImage}`}
                  alt={currentTitle}
                  className="mt-2 w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

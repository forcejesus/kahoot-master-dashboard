
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/I18nContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditGameQuestionsList } from '@/components/game/edit/EditGameQuestionsList';

export default function EditGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { token } = useAuth();
  const { t } = useTranslation();
  const initialJeu = location.state?.jeu as Kahoot;
  
  const [jeu, setJeu] = useState<Kahoot | null>(initialJeu);
  const [isLoading, setIsLoading] = useState(!initialJeu);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [titre, setTitre] = useState(initialJeu?.titre || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadGameDetails = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const data = await response.json();
      
      if (data.data) {
        setJeu(data.data);
        setTitre(data.data.titre);
      } else {
        toast.error('Erreur lors du chargement des détails du jeu');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des détails du jeu');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!jeu && id) {
      loadGameDetails();
    }
  }, [id, jeu, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGame = async () => {
    if (!jeu || !titre.trim()) {
      toast.error('Le titre est requis');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('titre', titre);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/update/${jeu._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      toast.success('Jeu mis à jour avec succès !');
      // Recharger les détails complets du jeu
      await loadGameDetails();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour du jeu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuestionUpdate = async () => {
    // Recharger les détails complets après modification d'une question
    await loadGameDetails();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!jeu) {
    return null;
  }

  const currentImageUrl = imagePreview || (jeu.image ? `http://kahoot.nos-apps.com/${jeu.image}` : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="default"
            className="mb-4 sm:mb-6 bg-white text-slate-700 hover:bg-slate-50 shadow-lg border border-slate-200"
            onClick={() => navigate(`/game/${jeu._id}`, { state: { jeu } })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux détails
          </Button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Modifier le jeu
              </h1>
              <p className="text-slate-600 mt-1">
                Modifiez tous les détails de votre jeu en une seule fois
              </p>
            </div>
            
            <Button
              onClick={handleSaveGame}
              disabled={isSaving || !titre.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titre">Titre du jeu</Label>
                    <Input
                      id="titre"
                      value={titre}
                      onChange={(e) => setTitre(e.target.value)}
                      placeholder="Titre du jeu"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image">Image du jeu</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1"
                    />
                  </div>
                  
                  {currentImageUrl && (
                    <div className="mt-4">
                      <img
                        src={currentImageUrl}
                        alt="Aperçu"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Questions ({jeu.questions?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <EditGameQuestionsList 
                questions={jeu.questions || []} 
                onQuestionUpdate={handleQuestionUpdate}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

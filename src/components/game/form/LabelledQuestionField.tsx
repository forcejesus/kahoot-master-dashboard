
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface LabelledQuestionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LabelledQuestionField({ value, onChange }: LabelledQuestionFieldProps) {
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="libelle" className="text-base font-semibold text-gray-700">
          Énoncé de la question *
        </Label>
        <p className="text-sm text-gray-500">
          Rédigez clairement votre question pour que les apprenants comprennent parfaitement ce qui est attendu
        </p>
      </div>
      
      <div className="relative">
        <Textarea
          id="libelle"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="📝 Exemple : « Quelle est la capitale de la France ? » ou « Expliquez brièvement le concept de photosynthèse... »

💡 Conseils pour une bonne question :
• Utilisez un vocabulaire adapté au niveau de vos apprenants
• Soyez précis et évitez les ambiguïtés
• Vérifiez que la question est en lien avec vos objectifs pédagogiques"
          required
          className="min-h-[120px] text-base resize-none pr-20"
          rows={5}
        />
        
        {/* Compteur de caractères */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded border">
          {charCount} car.
        </div>
      </div>
      
      {/* Indicateurs de qualité */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1 ${wordCount >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
            {wordCount >= 5 ? '✅' : '⚪'} Longueur ({wordCount} mots)
          </span>
          <span className={`flex items-center gap-1 ${value.includes('?') || value.includes('Expliquez') || value.includes('Décrivez') || value.includes('Comment') || value.includes('Pourquoi') || value.includes('Quelle') || value.includes('Quel') ? 'text-green-600' : 'text-gray-400'}`}>
            {value.includes('?') || value.includes('Expliquez') || value.includes('Décrivez') || value.includes('Comment') || value.includes('Pourquoi') || value.includes('Quelle') || value.includes('Quel') ? '✅' : '⚪'} Forme interrogative
          </span>
        </div>
        
        <div className="text-gray-500">
          Recommandé : 5-30 mots
        </div>
      </div>

      {/* Conseils contextuels */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>💡 Astuce :</strong> Une bonne question est claire, précise et permet d'évaluer efficacement 
          les connaissances ou compétences visées. Relisez-vous pour éliminer toute ambiguïté !
        </p>
      </div>
    </div>
  );
}

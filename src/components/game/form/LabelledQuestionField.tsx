
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface LabelledQuestionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LabelledQuestionField({ value, onChange }: LabelledQuestionFieldProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="libelle" className="text-base font-semibold text-gray-700">
        Énoncé de la question *
      </Label>
      <Textarea
        id="libelle"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Saisissez ici l'énoncé complet de votre question. Soyez précis et clair pour que les apprenants comprennent bien ce qui est attendu."
        required
        className="min-h-[100px] text-base resize-none"
        rows={4}
      />
      <p className="text-sm text-gray-500">
        Conseil : Formulez votre question de manière claire et précise pour faciliter la compréhension.
      </p>
    </div>
  );
}

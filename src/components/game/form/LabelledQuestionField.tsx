
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LabelledQuestionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LabelledQuestionField({ value, onChange }: LabelledQuestionFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="libelle">Question</Label>
      <Input
        id="libelle"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez votre question"
        required
      />
    </div>
  );
}

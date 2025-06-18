
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HelpCircle } from 'lucide-react';

interface LabelledQuestionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LabelledQuestionField({ value, onChange }: LabelledQuestionFieldProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor="libelle" className="text-lg font-bold text-gray-900 flex items-center gap-2 font-heading">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        Question *
      </Label>
      <div className="relative">
        <Input
          id="libelle"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Posez votre question ici... Soyez créatif et engageant !"
          className="h-16 text-lg font-medium border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl px-6 shadow-sm hover:border-gray-300 transition-all duration-200 placeholder:text-gray-400"
          required
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <span className="text-sm font-medium">{value.length}/200</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 flex items-center gap-1 font-medium">
        💡 <span>Une bonne question est claire, concise et stimulante pour vos apprenants</span>
      </p>
    </div>
  );
}

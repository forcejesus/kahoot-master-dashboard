
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ShortAnswerInputProps {
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export function ShortAnswerInput({ answer, onAnswerChange }: ShortAnswerInputProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold text-gray-800">
        Réponse attendue
      </Label>
      <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
        <CardContent className="p-4">
          <Input
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Entrez la réponse correcte..."
            className="border-0 focus-visible:ring-0 text-base"
            required
          />
        </CardContent>
      </Card>
      <p className="text-sm text-gray-600">
        Les participants devront saisir cette réponse exacte (la casse sera ignorée)
      </p>
    </div>
  );
}

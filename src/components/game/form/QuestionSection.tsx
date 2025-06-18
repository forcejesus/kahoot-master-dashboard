
import { FileText } from 'lucide-react';
import { LabelledQuestionField } from './LabelledQuestionField';

interface QuestionSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuestionSection({ value, onChange }: QuestionSectionProps) {
  return (
    <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-xl">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Votre Question</h3>
      </div>
      <LabelledQuestionField 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

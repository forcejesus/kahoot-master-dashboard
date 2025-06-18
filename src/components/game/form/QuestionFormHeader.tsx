
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/I18nContext';
import { HelpCircle } from 'lucide-react';

export function QuestionFormHeader() {
  const { t } = useTranslation();
  
  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
      <CardHeader className="relative z-10 pb-6">
        <CardTitle className="text-3xl font-bold flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <span>{t('game.questionForm')}</span>
            <p className="text-indigo-100 text-lg font-normal mt-1">
              Créez une question engageante pour vos apprenants
            </p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

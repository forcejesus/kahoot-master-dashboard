
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DurationSelect } from './DurationSelect';
import { PointsSelect } from './PointsSelect';
import { QuestionTypeSelect } from './QuestionTypeSelect';
import { Timer, Award, HelpCircle, Settings2 } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';
import { Question, QuestionType, Point } from '@/types/game';

interface SettingsSectionProps {
  formQuestion: Question;
  questionTypes: QuestionType[];
  points: Point[];
  updateFormQuestion: (updates: Partial<Question>) => void;
  onTypeChange: (typeId: string) => void;
}

export function SettingsSection({ 
  formQuestion, 
  questionTypes, 
  points, 
  updateFormQuestion,
  onTypeChange
}: SettingsSectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="p-8 bg-gradient-to-r from-emerald-50/30 to-teal-50/50 border-b">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <Settings2 className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Paramètres de la Question</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-700">Durée</span>
          </div>
          <DurationSelect 
            value={formQuestion.temps}
            onChange={(duration) => updateFormQuestion({
              temps: duration
            })}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-gray-700">Points</span>
          </div>
          <PointsSelect 
            points={points}
            value={formQuestion.point}
            onChange={(pointId) => updateFormQuestion({
              point: pointId
            })}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-gray-700">Type</span>
          </div>
          <QuestionTypeSelect 
            questionTypes={questionTypes}
            value={formQuestion.typeQuestion}
            onChange={onTypeChange}
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-indigo-600" />
            <div>
              <Label htmlFor="limite_response" className="text-base font-semibold text-gray-800">
                {t('form.enableTimer')}
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Active le minuteur pour cette question
              </p>
            </div>
          </div>
          <Switch
            id="limite_response"
            checked={formQuestion.limite_response}
            onCheckedChange={(checked) => updateFormQuestion({
              limite_response: checked
            })}
          />
        </div>
      </div>
    </div>
  );
}

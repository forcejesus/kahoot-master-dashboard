
import { Question, QuestionType, Point } from '@/types/game';
import { useTranslation } from '@/contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileUploadField } from './form/FileUploadField';
import { DurationSelect } from './form/DurationSelect';
import { PointsSelect } from './form/PointsSelect';
import { QuestionTypeSelect } from './form/QuestionTypeSelect';
import { AnswersInput } from './form/AnswersInput';
import { SubmitQuestionButton } from './form/SubmitQuestionButton';
import { LabelledQuestionField } from './form/LabelledQuestionField';
import { useQuestionForm } from './form/useQuestionForm';
import { useState } from 'react';
import { HelpCircle, Timer, Award, FileText, Settings2, Sparkles } from 'lucide-react';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const { t } = useTranslation();
  const {
    formQuestion,
    updateFormQuestion,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleFormSubmit,
    isSubmitting,
    resetForm
  } = useQuestionForm(gameId, token);

  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [shortAnswer, setShortAnswer] = useState<string>('');

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    // Déterminer le type de question
    const selectedQuestionType = questionTypes.find(type => type._id === formQuestion.typeQuestion);
    const questionTypeLibelle = selectedQuestionType?.libelle;

    let finalAnswers: string[] = [];
    let finalCorrectAnswer: number | string = 0;

    switch (questionTypeLibelle) {
      case 'CHOIX_MULTIPLE':
        if (correctAnswers.length === 0) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswers[0]; // Pour compatibilité, on prend le premier
        break;
      
      case 'CHOIX_UNIQUE':
        if (correctAnswer === null) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswer;
        break;
      
      case 'REPONSE_COURTE':
        if (!shortAnswer.trim()) {
          return; // La validation est gérée dans le composant
        }
        finalAnswers = [shortAnswer];
        finalCorrectAnswer = 0;
        break;
      
      default:
        return;
    }

    await handleFormSubmit(
      (question) => {
        onQuestionAdded(question);
        setAnswers(['', '']);
        setCorrectAnswer(null);
        setCorrectAnswers([]);
        setShortAnswer('');
      },
      finalAnswers,
      typeof finalCorrectAnswer === 'number' ? finalCorrectAnswer : 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
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

      {/* Main Form Card */}
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleAddQuestion} className="space-y-0">
            {/* Question Section */}
            <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Votre Question</h3>
              </div>
              <LabelledQuestionField 
                value={formQuestion.libelle}
                onChange={(value) => updateFormQuestion({
                  libelle: value
                })}
              />
            </div>

            {/* Media Section */}
            <div className="p-8 border-b">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Média (Optionnel)</h3>
                <span className="text-sm text-gray-500">Ajoutez une image ou vidéo pour enrichir votre question</span>
              </div>
              <FileUploadField 
                onFileChange={handleFileChange}
                currentFileType={formQuestion.type_fichier}
              />
            </div>

            {/* Settings Section */}
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
                    onChange={(typeId) => {
                      updateFormQuestion({ typeQuestion: typeId });
                      // Reset des réponses quand on change de type
                      setAnswers(['', '']);
                      setCorrectAnswer(null);
                      setCorrectAnswers([]);
                      setShortAnswer('');
                    }}
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

            {/* Answers Section */}
            <div className="p-8 bg-gradient-to-r from-orange-50/30 to-red-50/30 border-b">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Réponses</h3>
                <span className="text-sm text-gray-500">Configurez les options de réponse</span>
              </div>
              
              <AnswersInput
                questionType={formQuestion.typeQuestion}
                questionTypes={questionTypes}
                answers={answers}
                correctAnswer={correctAnswer}
                correctAnswers={correctAnswers}
                shortAnswer={shortAnswer}
                onAnswersChange={setAnswers}
                onCorrectAnswerChange={setCorrectAnswer}
                onCorrectAnswersChange={setCorrectAnswers}
                onShortAnswerChange={setShortAnswer}
              />
            </div>

            {/* Submit Section */}
            <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <SubmitQuestionButton isLoading={isSubmitting} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


import { Question, QuestionType, Point } from '@/types/game';
import { Card, CardContent } from '@/components/ui/card';
import { useQuestionForm } from './form/useQuestionForm';
import { useQuestionValidation } from './form/useQuestionValidation';
import { QuestionFormHeader } from './form/QuestionFormHeader';
import { QuestionSection } from './form/QuestionSection';
import { MediaSection } from './form/MediaSection';
import { SettingsSection } from './form/SettingsSection';
import { AnswersSection } from './form/AnswersSection';
import { SubmitQuestionButton } from './form/SubmitQuestionButton';
import { submitQuestionWithAnswers } from './form/questionService';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuestionFormProps {
  gameId: string;
  token: string;
  questionTypes: QuestionType[];
  points: Point[];
  onQuestionAdded: (question: Question) => void;
}

export function QuestionForm({ gameId, token, questionTypes, points, onQuestionAdded }: QuestionFormProps) {
  const {
    formQuestion,
    updateFormQuestion,
    selectedFile,
    previewUrl,
    handleFileChange,
    isSubmitting,
    setIsSubmitting,
    resetForm
  } = useQuestionForm(gameId, token);

  const { validateAndPrepareQuestion } = useQuestionValidation();

  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [shortAnswer, setShortAnswer] = useState<string>('');

  const resetAnswers = () => {
    setAnswers(['', '']);
    setCorrectAnswer(null);
    setCorrectAnswers([]);
    setShortAnswer('');
  };

  const handleTypeChange = (typeId: string) => {
    updateFormQuestion({ typeQuestion: typeId });
    resetAnswers();
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAndPrepareQuestion(
      questionTypes,
      formQuestion.typeQuestion,
      answers,
      correctAnswer,
      correctAnswers,
      shortAnswer
    );

    if (!validation.isValid) {
      return;
    }

    console.log('Soumission de question:', {
      type: questionTypes.find(type => type._id === formQuestion.typeQuestion)?.libelle,
      answers: validation.finalAnswers,
      correctAnswers: validation.finalCorrectAnswers
    });

    setIsSubmitting(true);

    try {
      // Construct the complete question object
      const questionToSubmit: Question = {
        ...formQuestion,
        reponses: validation.finalAnswers,
        reponse_correcte: validation.finalAnswers[validation.finalCorrectAnswer] || validation.finalAnswers[0] || ''
      };

      const questionData = await submitQuestionWithAnswers(
        questionToSubmit,
        validation.finalAnswers,
        validation.finalCorrectAnswers,
        selectedFile,
        token
      );

      onQuestionAdded(questionData);
      resetForm();
      resetAnswers();
      toast.success("Question ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la question:", error);
      toast.error("Erreur lors de l'ajout de la question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <QuestionFormHeader />

      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleAddQuestion} className="space-y-0">
            <QuestionSection
              value={formQuestion.libelle}
              onChange={(value) => updateFormQuestion({ libelle: value })}
            />

            <MediaSection
              onFileChange={handleFileChange}
              currentFileType={formQuestion.type_fichier}
            />

            <SettingsSection
              formQuestion={formQuestion}
              questionTypes={questionTypes}
              points={points}
              updateFormQuestion={updateFormQuestion}
              onTypeChange={handleTypeChange}
            />

            <AnswersSection
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

            <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <SubmitQuestionButton isLoading={isSubmitting} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

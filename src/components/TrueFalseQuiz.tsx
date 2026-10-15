import React, { useState } from 'react';
import { Check, X, Volume2, ArrowRight, RotateCcw, Award, Sparkles, Filter } from 'lucide-react';
import { OFFICIAL_QUIZ_QUESTIONS, DISTRACTOR_CHALLENGE_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion } from '../types';
import { speechService } from '../utils/speech';

interface TrueFalseQuizProps {
  onCompleteItem: () => void;
}

type FilterMode = 'all' | 'zero' | 'first' | 'challenge';

export const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ onCompleteItem }) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Filter questions according to mode
  const getQuestions = (): QuizQuestion[] => {
    switch (filterMode) {
      case 'zero':
        return OFFICIAL_QUIZ_QUESTIONS.filter((q) => q.type === 'zero');
      case 'first':
        return OFFICIAL_QUIZ_QUESTIONS.filter((q) => q.type === 'first');
      case 'challenge':
        return [...OFFICIAL_QUIZ_QUESTIONS, ...DISTRACTOR_CHALLENGE_QUESTIONS];
      case 'all':
      default:
        return OFFICIAL_QUIZ_QUESTIONS; // Default 20 official sentences from prompt
    }
  };

  const questions = getQuestions();
  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];

  const handleSelectFilter = (mode: FilterMode) => {
    setFilterMode(mode);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setIsQuizCompleted(false);
  };

  const handleAnswer = (answer: boolean) => {
    if (showFeedback || !currentQuestion) return;

    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      onCompleteItem();
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setShowFeedback(false);
    setIsQuizCompleted(false);
    setStreak(0);
  };

  const handleSpeak = (text: string) => {
    setIsAudioPlaying(true);
    speechService.speak(text, () => setIsAudioPlaying(false));
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / questions.length) * 100) || 0;

  if (isQuizCompleted) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Quiz Completed!
          </h3>
          <p className="text-slate-600 text-sm">
            You evaluated all <span className="font-mono font-bold text-slate-900">{questions.length}</span> statements in this category.
          </p>
        </div>

        {/* Score Summary Metrics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl font-mono font-bold text-slate-900 tabular-nums">
              {correctCount}/{questions.length}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Accuracy</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl font-mono font-bold text-emerald-600 tabular-nums">
              {scorePercentage}%
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Score</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-2xl font-mono font-bold text-amber-600 tabular-nums">
              {maxStreak}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Best Streak</div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Review Your Responses
          </h4>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {idx + 1}. {q.sentence}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-xs shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Needs Review'}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs">
                    Your answer: <strong className="uppercase">{String(userAnswer)}</strong> · Correct answer:{' '}
                    <strong className="uppercase text-indigo-700">{String(q.correctAnswer)}</strong>
                  </div>
                  <div className="text-slate-500 text-xs italic">
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <button
            onClick={() => handleSelectFilter('challenge')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Try Challenge Mode (with Distractors)</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentAnswer = userAnswers[currentQuestion.id];
  const isAnswered = showFeedback && currentAnswer !== undefined;
  const isCorrect = currentAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Mode Selector / Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Quiz Selection Mode
          </div>
          <div className="text-xs text-slate-500">
            Choose which category of conditional statements to test.
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => handleSelectFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 20 Sentences
          </button>
          <button
            onClick={() => handleSelectFilter('zero')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'zero'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Zero (10)
          </button>
          <button
            onClick={() => handleSelectFilter('first')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'first'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            First (10)
          </button>
          <button
            onClick={() => handleSelectFilter('challenge')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'challenge'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Challenge + Errors
          </button>
        </div>
      </div>

      {/* Progress & Streak Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
        <div>
          Statement <span className="font-mono font-bold text-slate-900">{currentIndex + 1}</span> of{' '}
          <span className="font-mono font-bold text-slate-900">{questions.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            Current streak: <strong className="font-mono text-amber-600">{streak}</strong>
          </span>
          <span>·</span>
          <span>
            Score: <strong className="font-mono text-indigo-600">{correctCount}</strong>
          </span>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Interactive Flashcard / Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs relative">
        
        {/* Card Header Tags */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[11px] ${
                currentQuestion.type === 'zero'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {currentQuestion.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
            </span>
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
              {currentQuestion.tenseFormula}
            </span>
          </div>

          <button
            onClick={() => handleSpeak(currentQuestion.sentence)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors text-xs"
            title="Listen to native English audio"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-indigo-600 animate-pulse' : ''}`} />
            <span>Pronounce</span>
          </button>
        </div>

        {/* Prompt Instruction */}
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Grammatical & Conceptual Verification
        </div>

        {/* The Sentence Under Test */}
        <div className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit'] leading-relaxed">
            "{currentQuestion.sentence}"
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {currentQuestion.promptQuestion}
          </p>
        </div>

        {/* Interactive Answer Buttons */}
        {!isAnswered ? (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleAnswer(true)}
              className="py-4 px-6 rounded-xl font-bold text-base text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.01]"
            >
              <Check className="w-5 h-5 text-emerald-600" />
              <span>TRUE</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="py-4 px-6 rounded-xl font-bold text-base text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.01]"
            >
              <X className="w-5 h-5 text-rose-600" />
              <span>FALSE</span>
            </button>
          </div>
        ) : (
          /* Detailed Educational Feedback */
          <div className="space-y-4 pt-2">
            <div
              className={`p-5 rounded-xl border space-y-2 ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Correct! Excellent grammar comprehension.</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-600" />
                    <span>Incorrect. Let's analyze the rule:</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {currentQuestion.explanation}
              </p>

              <div className="pt-2 text-xs text-slate-500 border-t border-slate-200/60 font-mono">
                Official Answer Key: <strong className="uppercase">{String(currentQuestion.correctAnswer)}</strong>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>
                {currentIndex + 1 < questions.length ? 'Next Sentence' : 'View Results'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Clear Guidance Callout */}
      <div className="p-4 bg-slate-100/80 rounded-xl text-xs text-slate-600 space-y-1">
        <span className="font-bold text-slate-800">Learner Note:</span>
        <p>
          In the official Answer Key, all 20 curriculum sentences are <strong>True</strong> because they describe valid, grammatically well-formed cause-and-effect rules. When you switch to <strong>Challenge Mode</strong>, intentionally incorrect grammar distractors are added to test your proofreading skills!
        </p>
      </div>
    </div>
  );
};

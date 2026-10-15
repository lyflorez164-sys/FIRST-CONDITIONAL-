import React, { useState } from 'react';
import { Check, X, RotateCcw, Volume2, ArrowRight, Award } from 'lucide-react';
import { VERB_LAB_ITEMS } from '../data/conditionalsData';
import { VerbLabQuestion } from '../types';
import { speechService } from '../utils/speech';

interface VerbTenseLabProps {
  onCompleteItem: () => void;
}

export const VerbTenseLab: React.FC<VerbTenseLabProps> = ({ onCompleteItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blank1Choice, setBlank1Choice] = useState<string | null>(null);
  const [blank2Choice, setBlank2Choice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isCompletedAll, setIsCompletedAll] = useState(false);

  const currentItem: VerbLabQuestion | undefined = VERB_LAB_ITEMS[currentIndex];

  const handleSelectBlank1 = (option: string) => {
    if (isSubmitted) return;
    setBlank1Choice(option);
  };

  const handleSelectBlank2 = (option: string) => {
    if (isSubmitted) return;
    setBlank2Choice(option);
  };

  const handleSubmit = () => {
    if (!blank1Choice || !blank2Choice || !currentItem) return;
    setIsSubmitted(true);

    const isCorrect =
      blank1Choice === currentItem.blank1Correct &&
      blank2Choice === currentItem.blank2Correct;

    if (isCorrect) {
      setCompletedCount((prev) => prev + 1);
      onCompleteItem();
      speechService.speak(currentItem.fullSentence);
    }
  };

  const handleNext = () => {
    setBlank1Choice(null);
    setBlank2Choice(null);
    setIsSubmitted(false);

    if (currentIndex + 1 < VERB_LAB_ITEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompletedAll(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setBlank1Choice(null);
    setBlank2Choice(null);
    setIsSubmitted(false);
    setIsCompletedAll(false);
    setCompletedCount(0);
  };

  if (isCompletedAll) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-6 shadow-xs">
        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
          Verb Tense Lab Mastered!
        </h3>
        <p className="text-slate-600 text-sm">
          You worked through all 10 fill-in-the-blank verb tense challenges and learned where "will" belongs and where Present Simple is required.
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>
      </div>
    );
  }

  if (!currentItem) return null;

  const isBlank1Correct = blank1Choice === currentItem.blank1Correct;
  const isBlank2Correct = blank2Choice === currentItem.blank2Correct;
  const isAllCorrect = isBlank1Correct && isBlank2Correct;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Verb Tense Conjugation Lab
          </div>
          <div className="text-xs text-slate-500">
            Exercise <span className="font-mono font-bold text-slate-900">{currentIndex + 1}</span> of{' '}
            <span className="font-mono font-bold text-slate-900">{VERB_LAB_ITEMS.length}</span>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wider ${
            currentItem.type === 'zero'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-indigo-100 text-indigo-800'
          }`}
        >
          {currentItem.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
        </span>
      </div>

      {/* Main Interactive Exercise Box */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Task: Choose the correct verb form for each blank
        </div>

        {/* Display Sentence with Visual Blanks */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-['Outfit']">
          <span>If {currentItem.sentenceTemplate.split('[blank1]')[0].replace('If ', '')}</span>
          
          {/* Blank 1 Tag */}
          <span
            className={`inline-block px-2.5 py-0.5 mx-1.5 rounded-md border text-sm font-mono font-bold ${
              !blank1Choice
                ? 'bg-white border-dashed border-slate-400 text-slate-400'
                : isSubmitted
                ? isBlank1Correct
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-rose-100 border-rose-400 text-rose-900'
                : 'bg-indigo-50 border-indigo-400 text-indigo-900'
            }`}
          >
            {blank1Choice || '[Verb 1]'}
          </span>

          <span>{currentItem.sentenceTemplate.split('[blank1]')[1].split('[blank2]')[0]}</span>

          {/* Blank 2 Tag */}
          <span
            className={`inline-block px-2.5 py-0.5 mx-1.5 rounded-md border text-sm font-mono font-bold ${
              !blank2Choice
                ? 'bg-white border-dashed border-slate-400 text-slate-400'
                : isSubmitted
                ? isBlank2Correct
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-rose-100 border-rose-400 text-rose-900'
                : 'bg-indigo-50 border-indigo-400 text-indigo-900'
            }`}
          >
            {blank2Choice || '[Verb 2]'}
          </span>

          <span>{currentItem.sentenceTemplate.split('[blank2]')[1]}</span>
        </div>

        {/* Interactive Selection Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Blank 1 Options (If-clause) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              1. If-Clause Verb:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {currentItem.blank1Options.map((opt) => (
                <button
                  key={`b1-${opt}`}
                  disabled={isSubmitted}
                  onClick={() => handleSelectBlank1(opt)}
                  className={`py-2 px-3 rounded-lg border text-xs font-mono font-semibold transition-colors ${
                    blank1Choice === opt
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Blank 2 Options (Result clause) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              2. Result Clause Verb:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {currentItem.blank2Options.map((opt) => (
                <button
                  key={`b2-${opt}`}
                  disabled={isSubmitted}
                  onClick={() => handleSelectBlank2(opt)}
                  className={`py-2 px-3 rounded-lg border text-xs font-mono font-semibold transition-colors ${
                    blank2Choice === opt
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action & Feedback */}
        {!isSubmitted ? (
          <button
            disabled={!blank1Choice || !blank2Choice}
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
          >
            Check Verb Selection
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isAllCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isAllCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Exact match! Correct conjugations.</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-600" />
                    <span>Not quite right. Let's inspect the rule:</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                {currentItem.ruleExplanation}
              </p>

              <div className="text-xs text-slate-500 pt-1 font-mono">
                Full Target Sentence: <strong>"{currentItem.fullSentence}"</strong>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{currentIndex + 1 < VERB_LAB_ITEMS.length ? 'Next Verb Challenge' : 'Complete Lab'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Shuffle, Check, Volume2, RotateCcw, Award } from 'lucide-react';
import { MATCHING_PAIRS } from '../data/conditionalsData';
import { MatchingPair } from '../types';
import { speechService } from '../utils/speech';

interface ClauseMatcherProps {
  onCompleteItem: () => void;
}

export const ClauseMatcher: React.FC<ClauseMatcherProps> = ({ onCompleteItem }) => {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledResults, setShuffledResults] = useState<{ id: string; result: string }[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize and shuffle
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setSelectedCondition(null);
    setSelectedResult(null);
    setMatchedIds([]);
    setFeedbackMessage(null);
    setIsCompleted(false);
    setMoves(0);

    // Shuffle the result clauses on the right
    const shuffled = [...MATCHING_PAIRS]
      .map((p) => ({ id: p.id, result: p.result }))
      .sort(() => Math.random() - 0.5);
    setShuffledResults(shuffled);
  };

  const handleSelectCondition = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedCondition(id);
    setFeedbackMessage(null);

    // If result was already selected, evaluate match
    if (selectedResult) {
      evaluateMatch(id, selectedResult);
    }
  };

  const handleSelectResult = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedResult(id);
    setFeedbackMessage(null);

    // If condition was already selected, evaluate match
    if (selectedCondition) {
      evaluateMatch(selectedCondition, id);
    }
  };

  const evaluateMatch = (condId: string, resId: string) => {
    setMoves((prev) => prev + 1);

    if (condId === resId) {
      // Correct match!
      const nextMatched = [...matchedIds, condId];
      setMatchedIds(nextMatched);
      setSelectedCondition(null);
      setSelectedResult(null);

      const matchedPair = MATCHING_PAIRS.find((p) => p.id === condId);
      if (matchedPair) {
        setFeedbackMessage(`Correct Match: "${matchedPair.fullSentence}"`);
        speechService.speak(matchedPair.fullSentence);
      }
      onCompleteItem();

      if (nextMatched.length === MATCHING_PAIRS.length) {
        setIsCompleted(true);
      }
    } else {
      // Mismatch
      setFeedbackMessage('Mismatch! Try another combination.');
      setTimeout(() => {
        setSelectedCondition(null);
        setSelectedResult(null);
        setFeedbackMessage(null);
      }, 1000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Instructions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
            Clause Connector Lab
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Pair each dependent <strong>If-clause (Condition)</strong> with its logical <strong>Main clause (Result)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            Matched: <strong className="font-mono text-emerald-600">{matchedIds.length}</strong>/{MATCHING_PAIRS.length}
          </div>
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset & Shuffle</span>
          </button>
        </div>
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-bold text-emerald-950 font-['Outfit']">
            All 10 Matching Pairs Connected!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            You successfully linked every If-clause with its correct Result clause in {moves} attempts!
          </p>
          <button
            onClick={resetGame}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Feedback Alert */}
      {feedbackMessage && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs sm:text-sm text-indigo-900 text-center font-medium animate-fadeIn">
          {feedbackMessage}
        </div>
      )}

      {/* Two Column Matching Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: If-Clauses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200">
            <span>1. Condition Clause (If...)</span>
            <span className="text-slate-400 font-normal">Select One</span>
          </div>

          <div className="space-y-2.5">
            {MATCHING_PAIRS.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedCondition === pair.id;

              return (
                <button
                  key={`cond-${pair.id}`}
                  disabled={isMatched}
                  onClick={() => handleSelectCondition(pair.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-3 ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-slate-400 cursor-default opacity-80'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-950 font-semibold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-600">
                      {pair.topic} · {pair.type === 'zero' ? 'Zero' : 'First'}
                    </span>
                    <p className="font-medium text-slate-900 leading-snug">
                      {pair.condition}
                    </p>
                  </div>

                  {isMatched && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Result Clauses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200">
            <span>2. Result Clause</span>
            <span className="text-slate-400 font-normal">Connect Here</span>
          </div>

          <div className="space-y-2.5">
            {shuffledResults.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedResult === item.id;

              return (
                <button
                  key={`res-${item.id}`}
                  disabled={isMatched}
                  onClick={() => handleSelectResult(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-3 ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-slate-400 cursor-default opacity-80'
                      : isSelected
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-950 font-semibold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs'
                  }`}
                >
                  <p className="font-medium text-slate-900 leading-snug">
                    {item.result}
                  </p>

                  {isMatched && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

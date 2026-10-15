import React from 'react';
import { X, Award, CheckCircle2, RotateCcw, Flame, Sparkles } from 'lucide-react';

interface LearnerStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  totalItems: number;
  onResetProgress: () => void;
}

export const LearnerStatsModal: React.FC<LearnerStatsModalProps> = ({
  isOpen,
  onClose,
  completedCount,
  totalItems,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const percentage = Math.min(100, Math.round((completedCount / totalItems) * 100));

  const badges = [
    {
      id: 'b-1',
      title: 'Academy Explorer',
      desc: 'Completed your first interactive exercise.',
      unlocked: completedCount >= 1,
    },
    {
      id: 'b-2',
      title: 'Scientific Thinker',
      desc: 'Mastered 5 Zero Conditional statements.',
      unlocked: completedCount >= 5,
    },
    {
      id: 'b-3',
      title: 'Future Forecaster',
      desc: 'Mastered 10 First Conditional predictions.',
      unlocked: completedCount >= 10,
    },
    {
      id: 'b-4',
      title: 'Conditionals Champion',
      desc: 'Analyzed all 20 curriculum sentences!',
      unlocked: completedCount >= 20,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Learner Progress & Badges
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Progress Circle / Bar */}
        <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Overall Unit Completion</span>
            <span className="font-mono text-indigo-700 font-bold tabular-nums">
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-indigo-200/60 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Completed: <strong className="text-slate-900 font-mono">{completedCount}</strong> items</span>
            <span>Target: <strong className="text-slate-900 font-mono">{totalItems}</strong> items</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Achievement Badges
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                  badge.unlocked
                    ? 'bg-amber-50/60 border-amber-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles
                    className={`w-3.5 h-3.5 ${
                      badge.unlocked ? 'text-amber-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{badge.title}</span>
                </div>
                <p className="text-[11px] leading-snug">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Reset your practice progress to 0?')) {
                onResetProgress();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

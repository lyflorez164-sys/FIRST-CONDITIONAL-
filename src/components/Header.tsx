import React from 'react';
import { BookOpen, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenStats: () => void;
  completedCount: number;
  totalItems: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenStats,
  completedCount,
  totalItems,
}) => {
  const navItems = [
    { id: 'theory', label: 'Lessons & Rules' },
    { id: 'quiz', label: 'True / False Quiz' },
    { id: 'matcher', label: 'Clause Matcher' },
    { id: 'verblab', label: 'Verb Tense Lab' },
    { id: 'explorer', label: 'Sentence Catalog' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('theory')}
            className="text-left font-['Outfit'] text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
          >
            Conditionals Academy
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors relative ${
                  activeTab === item.id
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenStats}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="View your learning progress and achievements"
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Progress:</span>
              <span className="font-mono tabular-nums font-bold text-indigo-700">
                {completedCount}/{totalItems}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 text-xs font-medium scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

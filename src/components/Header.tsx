
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
    <header className="sticky top-0 z-40 bg-[#fffaf4]/95 backdrop-blur-sm border-b border-[#eadffb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 min-h-16 py-2">
          <button
            onClick={() => setActiveTab('theory')}
            className="flex items-center gap-2 text-left shrink-0 group"
            aria-label="Conditionals Academy home"
          >
            <span
              className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#e9e1ff] text-2xl shadow-sm group-hover:rotate-6 transition-transform"
              aria-hidden="true"
            >
              🦉
            </span>
            <span className="flex flex-col">
              <span className="font-['Outfit'] text-lg sm:text-xl font-extrabold tracking-tight text-[#34205c]">
                Conditionals
              </span>
              <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#7655e8]">
                Academy
              </span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap py-2 transition-colors ${
                  activeTab === item.id
                    ? 'text-[#7655e8] font-bold border-b-2 border-[#7655e8]'
                    : 'text-slate-600 hover:text-[#7655e8]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenStats}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#34205c] bg-[#e9e1ff] hover:bg-[#ddd0ff] rounded-xl transition-colors"
              title="View your learning progress and achievements"
            >
              <Award className="w-4 h-4 text-[#7655e8]" />
              <span className="hidden sm:inline">Progress</span>
              <span className="font-mono tabular-nums">
                {completedCount}/{totalItems}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-bold text-[#34205c] bg-[#b9f4d2] hover:bg-[#a3eac2] rounded-xl transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Start Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-[#eadffb] text-xs font-semibold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-3 py-2 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-[#7655e8] text-white'
                  : 'text-slate-600 bg-white hover:bg-[#e9e1ff]'
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


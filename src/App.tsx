import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GrammarTheory } from './components/GrammarTheory';
import { TrueFalseQuiz } from './components/TrueFalseQuiz';
import { ClauseMatcher } from './components/ClauseMatcher';
import { VerbTenseLab } from './components/VerbTenseLab';
import { SentenceExplorer } from './components/SentenceExplorer';
import { LearnerStatsModal } from './components/LearnerStatsModal';
import { BookOpen, CheckCircle, HelpCircle, Layers, Shuffle, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('conditionals_progress_v1');
      if (saved) {
        setCompletedCount(parseInt(saved, 10) || 0);
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const handleCompleteItem = () => {
    setCompletedCount((prev) => {
      const updated = Math.min(prev + 1, 30);
      try {
        localStorage.setItem('conditionals_progress_v1', updated.toString());
      } catch {
        // Safe fallback
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    setCompletedCount(0);
    try {
      localStorage.removeItem('conditionals_progress_v1');
    } catch {
      // Safe fallback
    }
    setIsStatsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Bar Contract Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStats={() => setIsStatsModalOpen(true)}
        completedCount={completedCount}
        totalItems={20}
      />

      {/* Hero Section with Thematic Image and Independent Learning Guide */}
      <HeroSection onSelectTab={setActiveTab} />

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl mb-10 overflow-x-auto shadow-inner max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'theory'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Grammar Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>True/False Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'matcher'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shuffle className="w-4 h-4 shrink-0" />
            <span>Clause Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('verblab')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'verblab'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Verb Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'explorer'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>All 20 Sentences</span>
          </button>
        </div>

        {/* Dynamic Interactive Stage Component */}
        <div className="transition-opacity duration-300">
          {activeTab === 'theory' && <GrammarTheory />}
          {activeTab === 'quiz' && <TrueFalseQuiz onCompleteItem={handleCompleteItem} />}
          {activeTab === 'matcher' && <ClauseMatcher onCompleteItem={handleCompleteItem} />}
          {activeTab === 'verblab' && <VerbTenseLab onCompleteItem={handleCompleteItem} />}
          {activeTab === 'explorer' && <SentenceExplorer />}
        </div>
      </main>

      {/* Progress & Badge Modal */}
      <LearnerStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        completedCount={completedCount}
        totalItems={20}
        onResetProgress={handleResetProgress}
      />

      {/* Quiet, Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-['Outfit']">Conditionals Academy</span>
            <span aria-hidden="true">·</span>
            <span>Educational English Grammar Practice</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Zero Conditional (Universal Facts)</span>
            <span aria-hidden="true">·</span>
            <span>First Conditional (Real Future Outcomes)</span>
            <span aria-hidden="true">·</span>
            <span>Full English Immersion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

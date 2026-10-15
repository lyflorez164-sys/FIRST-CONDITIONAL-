import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Shuffle, Layers } from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <section className="bg-gradient-to-b from-slate-100/70 to-slate-50 border-b border-slate-200 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Context & Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              <span>English Grammar Mastery</span>
              <span aria-hidden="true">·</span>
              <span>Academic & Scientific Focus</span>
              <span aria-hidden="true">·</span>
              <span>CEFR B1–B2</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] leading-tight text-balance">
              Master Zero & First Conditional Sentences
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Understand the clear difference between general facts and future possibilities.
              Explore 20 authentic educational sentences, analyze clause structures, practice with the
              interactive True/False quiz, and master verb conjugations.
            </p>

            {/* Clear Independent Learning Guide */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                How to Study This Unit Independently
              </div>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-none">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 shrink-0">1.</span>
                  <span><strong>Review the Rules:</strong> Learn the formulas for Zero (Present + Present) and First (Present + Will).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 shrink-0">2.</span>
                  <span><strong>Test the 20 Statements:</strong> Verify the True/False status of each sentence and read the pedagogical notes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 shrink-0">3.</span>
                  <span><strong>Practice Active Skills:</strong> Connect separated clauses in the Matcher and fill in verb tenses in the Lab.</span>
                </li>
              </ul>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('quiz')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
              >
                <span>Take the 20-Sentence Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('matcher')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                <Shuffle className="w-4 h-4 text-slate-500" />
                <span>Clause Matcher</span>
              </button>

              <button
                onClick={() => onSelectTab('theory')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Grammar Guide</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Educational Visual & Rule Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
              <img
                src="/src/assets/images/grammar_academy_hero_1792102981925.jpg"
                alt="University students collaborating in a modern educational library"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">
                  Educational Context
                </span>
                <p className="text-sm font-medium text-slate-100">
                  "If students collaborate on projects, they develop teamwork skills."
                </p>
                <span className="text-xs text-slate-300 mt-1 font-mono">
                  Zero Conditional · Universal Classroom Truth
                </span>
              </div>
            </div>

            {/* Quick Grammar Overview Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-bold text-emerald-700 mb-1">Zero Conditional</div>
                <div className="font-mono text-slate-600 mb-1">If + Present, Present</div>
                <div className="text-slate-500">General scientific facts & constant classroom truths.</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-bold text-indigo-700 mb-1">First Conditional</div>
                <div className="font-mono text-slate-600 mb-1">If + Present, will + Verb</div>
                <div className="text-slate-500">Realistic predictions & future academic plans.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

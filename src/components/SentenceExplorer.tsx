import React, { useState } from 'react';
import { Volume2, Search, ArrowRightLeft, Check, Sparkles, BookOpen } from 'lucide-react';
import { ALL_SENTENCES } from '../data/conditionalsData';
import { ConditionalSentence } from '../types';
import { speechService } from '../utils/speech';

interface SentenceExplorerProps {
  onStartQuizWithSentence?: (sentenceId: string) => void;
}

export const SentenceExplorer: React.FC<SentenceExplorerProps> = ({ onStartQuizWithSentence }) => {
  const [filterType, setFilterType] = useState<'all' | 'zero' | 'first'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [invertedMap, setInvertedMap] = useState<Record<string, boolean>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleInverted = (id: string) => {
    setInvertedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (text: string, id: string) => {
    setPlayingId(id);
    speechService.speak(text, () => setPlayingId(null));
  };

  const filteredSentences = ALL_SENTENCES.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.fullSentence.toLowerCase().includes(q) ||
        item.educationalTopic.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sentences by word or topic..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-900"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterType === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All (20)
          </button>
          <button
            onClick={() => setFilterType('zero')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterType === 'zero'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Zero Conditional (10)
          </button>
          <button
            onClick={() => setFilterType('first')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filterType === 'first'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            First Conditional (10)
          </button>
        </div>
      </div>

      {/* Results Count & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 px-1">
        <div>
          Showing <span className="font-mono font-bold text-slate-900">{filteredSentences.length}</span> sentences
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Condition (If...)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
            <span>Result Clause</span>
          </span>
        </div>
      </div>

      {/* Sentence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSentences.map((item, index) => {
          const isInverted = Boolean(invertedMap[item.id]);
          const currentText = isInverted ? item.invertedSentence : item.fullSentence;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                        item.type === 'zero'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {item.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      #{index + 1}
                    </span>
                  </div>

                  <span className="text-slate-500 text-[11px] font-medium">
                    {item.educationalTopic}
                  </span>
                </div>

                {/* Sentence Display with Interactive Clause Coloring */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-sm leading-relaxed">
                  {!isInverted ? (
                    <p className="text-slate-900 font-medium">
                      <span className="text-emerald-800 bg-emerald-100/50 px-1 py-0.5 rounded">
                        {item.conditionClause}
                      </span>{' '}
                      <span className="text-indigo-800 bg-indigo-100/50 px-1 py-0.5 rounded">
                        {item.resultClause}
                      </span>
                    </p>
                  ) : (
                    <p className="text-slate-900 font-medium">
                      <span className="text-indigo-800 bg-indigo-100/50 px-1 py-0.5 rounded">
                        {item.resultClause.replace('.', '')}
                      </span>{' '}
                      <span className="text-emerald-800 bg-emerald-100/50 px-1 py-0.5 rounded">
                        {item.conditionClause.toLowerCase().replace(',', '')}.
                      </span>
                    </p>
                  )}

                  {isInverted && (
                    <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200/60">
                      <strong>Punctuation Note:</strong> When the result clause leads, no comma is needed!
                    </div>
                  )}
                </div>

                {/* Verb Anatomy Chips */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="p-1 px-2 bg-slate-100 rounded text-slate-700 font-mono">
                    Condition: <strong>{item.conditionVerb}</strong> ({item.conditionTense})
                  </span>
                  <span className="p-1 px-2 bg-slate-100 rounded text-slate-700 font-mono">
                    Result: <strong>{item.resultVerb}</strong> ({item.resultTense})
                  </span>
                </div>

                {/* Pedagogical Explanation */}
                <p className="text-xs text-slate-600 leading-normal">
                  {item.explanation}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(currentText, item.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    title="Pronounce sentence"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingId === item.id ? 'text-indigo-600 animate-pulse' : ''}`} />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => toggleInverted(item.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    title="Invert clause order"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>{isInverted ? 'Show If-First' : 'Invert Order'}</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono font-bold text-emerald-700">
                  Key: TRUE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

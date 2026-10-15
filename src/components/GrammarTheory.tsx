import React, { useState } from 'react';
import { Volume2, RefreshCw, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { speechService } from '../utils/speech';

export const GrammarTheory: React.FC = () => {
  const [swappedZero, setSwappedZero] = useState(false);
  const [swappedFirst, setSwappedFirst] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handlePlayAudio = (text: string, id: string) => {
    setPlayingVoice(id);
    speechService.speak(text, () => setPlayingVoice(null));
  };

  return (
    <div className="space-y-12">
      {/* Title & Introduction */}
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] tracking-tight">
          Grammar Foundations: Zero vs. First Conditional
        </h2>
        <p className="mt-2 text-slate-600 text-base max-w-3xl">
          Conditionals describe the result of something that might happen or will happen.
          In English, the difference between Zero and First conditional lies in whether the event is an
          <strong> immutable general fact</strong> or a <strong>specific future possibility</strong>.
        </p>
      </div>

      {/* Side-by-Side Architectural Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Zero Conditional Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                Type 0 · Universal Truths
              </span>
              <span className="text-xs text-slate-500 font-medium">Certainty: 100%</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Zero Conditional
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Used for scientific laws, general truths, physical reactions, and constant school routines.
              Whenever condition X occurs, result Y <em>always</em> happens.
            </p>

            {/* Formula Block */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <div className="text-slate-500 text-[11px] uppercase tracking-wider font-sans font-bold">
                Grammatical Formula
              </div>
              <div className="font-semibold text-emerald-900">
                If + Present Simple, ... Present Simple
              </div>
              <div className="text-slate-500 text-xs font-sans">
                Notice: We <strong>never</strong> use "will" in a Zero Conditional.
              </div>
            </div>

            {/* Interactive Clause Demonstration */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Interactive Clause Anatomy
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-3">
                <div className="text-sm text-slate-800 font-medium leading-relaxed">
                  {swappedZero ? (
                    <>
                      <span className="text-emerald-700 font-semibold underline decoration-emerald-300">
                        Water boils
                      </span>{' '}
                      <span className="text-slate-500 font-sans italic">[no comma]</span>{' '}
                      <span className="text-indigo-700 font-semibold underline decoration-indigo-300">
                        if you heat it to 100 degrees Celsius.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-indigo-700 font-semibold underline decoration-indigo-300">
                        If you heat water to 100 degrees Celsius,
                      </span>{' '}
                      <span className="text-slate-500 font-sans italic">[comma required]</span>{' '}
                      <span className="text-emerald-700 font-semibold underline decoration-emerald-300">
                        it boils.
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>
                      Condition verb: <strong>heat</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Result verb: <strong>boils</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAudio(
                        swappedZero
                          ? 'Water boils if you heat it to 100 degrees Celsius.'
                          : 'If you heat water to 100 degrees Celsius, it boils.',
                        'audio-zero-demo'
                      )}
                      className="p-1.5 text-slate-600 hover:text-slate-900 bg-white rounded-md border border-slate-200 hover:bg-slate-50"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingVoice === 'audio-zero-demo' ? 'text-indigo-600 animate-pulse' : ''}`} />
                    </button>

                    <button
                      onClick={() => setSwappedZero(!swappedZero)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md font-medium"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{swappedZero ? 'Show If-First' : 'Swap Clauses'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Typical Use Cases */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-800">When to use:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Physical & chemical facts (<em>heat water → boils</em>)</li>
                <li>Art rules (<em>mix red & blue → purple</em>)</li>
                <li>Recurring study rules (<em>study regularly → understand better</em>)</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Always true every time the condition happens.</span>
          </div>
        </div>

        {/* First Conditional Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded">
                Type 1 · Real Future Outcomes
              </span>
              <span className="text-xs text-slate-500 font-medium">Likelihood: Probable</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              First Conditional
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Used for realistic future situations, specific academic plans, promises, warnings, and predictions.
              If condition X happens in the present, result Y will likely happen in the future.
            </p>

            {/* Formula Block */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-2">
              <div className="text-slate-500 text-[11px] uppercase tracking-wider font-sans font-bold">
                Grammatical Formula
              </div>
              <div className="font-semibold text-indigo-900">
                If + Present Simple, ... will / won't + Base Verb
              </div>
              <div className="text-slate-500 text-xs font-sans">
                Key Rule: <strong>Never</strong> put "will" inside the if-clause!
              </div>
            </div>

            {/* Interactive Clause Demonstration */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Interactive Clause Anatomy
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200/80 space-y-3">
                <div className="text-sm text-slate-800 font-medium leading-relaxed">
                  {swappedFirst ? (
                    <>
                      <span className="text-indigo-700 font-semibold underline decoration-indigo-300">
                        You will pass the exam
                      </span>{' '}
                      <span className="text-slate-500 font-sans italic">[no comma]</span>{' '}
                      <span className="text-emerald-700 font-semibold underline decoration-emerald-300">
                        if you study hard.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-700 font-semibold underline decoration-emerald-300">
                        If you study hard,
                      </span>{' '}
                      <span className="text-slate-500 font-sans italic">[comma required]</span>{' '}
                      <span className="text-indigo-700 font-semibold underline decoration-indigo-300">
                        you will pass the exam.
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-indigo-200/60 text-xs">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span>
                      Condition verb: <strong>study</strong> (Present)
                    </span>
                    <span>·</span>
                    <span>
                      Result verb: <strong>will pass</strong> (Future)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAudio(
                        swappedFirst
                          ? 'You will pass the exam if you study hard.'
                          : 'If you study hard, you will pass the exam.',
                        'audio-first-demo'
                      )}
                      className="p-1.5 text-slate-600 hover:text-slate-900 bg-white rounded-md border border-slate-200 hover:bg-slate-50"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingVoice === 'audio-first-demo' ? 'text-indigo-600 animate-pulse' : ''}`} />
                    </button>

                    <button
                      onClick={() => setSwappedFirst(!swappedFirst)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md font-medium"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{swappedFirst ? 'Show If-First' : 'Swap Clauses'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Typical Use Cases */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-800">When to use:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Specific future exams (<em>study hard → will pass</em>)</li>
                <li>Weather dependent activities (<em>weather is good → will have class outside</em>)</li>
                <li>Warnings & advice (<em>don't ask questions → won't clarify doubts</em>)</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Refers to a real, possible condition and its future result.</span>
          </div>
        </div>

      </div>

      {/* Comma & Punctuation Rules Guide */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Crucial Punctuation Rule: The Comma Test</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Outfit']">
            When Do You Need a Comma in Conditional Sentences?
          </h3>
          <p className="text-slate-300 text-sm max-w-3xl">
            In English grammar, conditional clauses can be placed in either order.
            The presence of a comma depends solely on which clause appears first:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">
              1. If-Clause First = COMMA NEEDED
            </div>
            <p className="text-xs text-slate-300 font-mono">
              [If you finish your assignment early], [you will have time to review].
            </p>
            <p className="text-xs text-slate-400">
              When the sentence opens with the dependent condition ("If..."), place a comma before the main clause.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="text-amber-300 font-bold text-sm">
              2. Main Result First = NO COMMA
            </div>
            <p className="text-xs text-slate-300 font-mono">
              [You will have time to review] [if you finish your assignment early].
            </p>
            <p className="text-xs text-slate-400">
              When the main clause leads, the subordinating conjunction "if" acts as the natural boundary; no comma is required.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Common Error Alert:</strong> Never say <em>"If you will study hard, you will pass."</em> In English, "will" is not placed directly after the conjunction "if" in standard first conditional clauses.
          </span>
        </div>
      </div>

      {/* Comparison Reference Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
            Quick Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500">Summary table for rapid reference and study.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 text-emerald-800">Zero Conditional</th>
                <th className="py-3 px-4 text-indigo-800">First Conditional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Grammar Formula</td>
                <td className="py-3 px-4 font-mono text-emerald-700">If + Present Simple, Present Simple</td>
                <td className="py-3 px-4 font-mono text-indigo-700">If + Present Simple, will + Base Verb</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">What It Describes</td>
                <td className="py-3 px-4 text-slate-700">General truth, scientific law, universal classroom habit</td>
                <td className="py-3 px-4 text-slate-700">Specific realistic situation in the future</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Time Reference</td>
                <td className="py-3 px-4 text-slate-700">All the time / timeless / universal</td>
                <td className="py-3 px-4 text-slate-700">Specific future time (tomorrow, next exam)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Example from Unit</td>
                <td className="py-3 px-4 italic text-slate-600">"If you heat water to 100°C, it boils."</td>
                <td className="py-3 px-4 italic text-slate-600">"If you study hard, you will pass the exam."</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Can 'When' Replace 'If'?</td>
                <td className="py-3 px-4 text-slate-700">Yes (often identical in meaning)</td>
                <td className="py-3 px-4 text-slate-700">Changes meaning (implies certainty vs possibility)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ReflectionQuestion } from '../types/decision';
import { MessageSquareQuote, CheckCircle2, Bookmark, Sparkles, Copy, Check } from 'lucide-react';

interface QuestionsWorthAskingCardProps {
  questions: ReflectionQuestion[];
}

export const QuestionsWorthAskingCard: React.FC<QuestionsWorthAskingCardProps> = ({ questions }) => {
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyQuestion = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>💭 Questions Worth Asking</span>
            </h3>
            <p className="text-xs text-slate-400">
              High-leverage reflective inquiries to challenge your decision calculus
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          {questions.length} Reflective Inquiries
        </span>
      </div>

      {/* Questions Grid */}
      <div className="space-y-3.5">
        {questions.map((q, idx) => {
          const isPinned = pinnedIds.has(q.id || `q-${idx}`);
          const qId = q.id || `q-${idx}`;

          return (
            <div
              key={qId}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                isPinned
                  ? 'bg-brand-950/40 border-brand-500/50 shadow-glow-sm'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    Q0{idx + 1}
                  </span>
                  {q.category && (
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-medium text-slate-300">
                      {q.category}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                  "{q.question}"
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed italic">
                  💡 {q.reflectionPrompt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                <button
                  onClick={() => copyQuestion(qId, q.question)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                  title="Copy question text"
                >
                  {copiedId === qId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => togglePin(qId)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    isPinned
                      ? 'bg-brand-500/20 border-brand-500/40 text-brand-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Bookmark for reflection worksheet"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isPinned ? 'fill-brand-400 text-brand-400' : ''}`} />
                  <span>{isPinned ? 'Focused' : 'Focus'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

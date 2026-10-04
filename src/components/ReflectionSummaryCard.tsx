import React from 'react';
import { Compass, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

interface ReflectionSummaryCardProps {
  summary: string;
  closingPrompt: string;
  onOpenWorksheet?: () => void;
}

export const ReflectionSummaryCard: React.FC<ReflectionSummaryCardProps> = ({
  summary,
  closingPrompt,
  onOpenWorksheet,
}) => {
  return (
    <div className="glass-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-brand-950/40 border-brand-500/30">
      
      {/* Background radial glow */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🧭 Reflection Summary & Cognitive Horizon</span>
          </h3>
          <p className="text-xs text-slate-400">
            A synthesis of your expanded decision landscape
          </p>
        </div>
      </div>

      {/* Main summary text */}
      <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6">
        <p>{summary}</p>
      </div>

      {/* Non-prescriptive closing callout */}
      <div className="p-5 rounded-xl bg-brand-950/30 border border-brand-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-brand-400 font-bold block mb-1">
              Your Next Step
            </span>
            <p className="text-sm font-semibold text-slate-100">
              "{closingPrompt}"
            </p>
          </div>
        </div>

        {onOpenWorksheet && (
          <button
            onClick={onOpenWorksheet}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-glow-sm hover:shadow-glow-md flex-shrink-0"
          >
            Open Reflection Worksheet
          </button>
        )}
      </div>

      {/* Non-prescriptive footer note */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>The decision remains entirely yours. Use this clarity to choose with intention.</span>
        </div>
      </div>

    </div>
  );
};

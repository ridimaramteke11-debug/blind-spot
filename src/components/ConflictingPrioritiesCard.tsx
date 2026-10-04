import React from 'react';
import { PriorityConflict } from '../types/decision';
import { Scale, ArrowLeftRight, AlertCircle, Info } from 'lucide-react';

interface ConflictingPrioritiesCardProps {
  conflicts: PriorityConflict[];
}

export const ConflictingPrioritiesCard: React.FC<ConflictingPrioritiesCardProps> = ({ conflicts }) => {
  if (!conflicts || conflicts.length === 0) return null;

  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>⚖️ Conflicting Priorities & Inherent Tensions</span>
            </h3>
            <p className="text-xs text-slate-400">
              Competing desires pulling in opposite directions in this specific scenario
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
          {conflicts.length} Tensions Detected
        </span>
      </div>

      {/* Tension Cards */}
      <div className="space-y-4">
        {conflicts.map((conflict, idx) => (
          <div
            key={conflict.id || idx}
            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 transition-all space-y-4"
          >
            {/* Visual Opposing Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center relative">
              
              {/* Side A */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">
                  Stated Desire A
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-100">
                  {conflict.sideA}
                </p>
              </div>

              {/* Center VS Indicator */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-950 border border-amber-500/40 items-center justify-center text-amber-400 shadow-md">
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>

              {/* Side B */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-1">
                  Competing Reality B
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-100">
                  {conflict.sideB}
                </p>
              </div>

            </div>

            {/* Neutral Tension Analysis */}
            <div className="text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60 space-y-2">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold block mb-0.5">
                  Tension Dynamics:
                </span>
                <p className="leading-relaxed">{conflict.tensionAnalysis}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-0.5">
                  Neutral Framing:
                </span>
                <p className="italic text-slate-300 text-xs">
                  "{conflict.neutralObservation}"
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

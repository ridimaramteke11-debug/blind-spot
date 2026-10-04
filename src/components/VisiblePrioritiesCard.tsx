import React from 'react';
import { VisiblePriority } from '../types/decision';
import { Target, ArrowRight, Sparkles, Sliders } from 'lucide-react';

interface VisiblePrioritiesCardProps {
  priorities: VisiblePriority[];
}

export const VisiblePrioritiesCard: React.FC<VisiblePrioritiesCardProps> = ({ priorities }) => {
  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>🎯 Your Visible Priorities</span>
            </h3>
            <p className="text-xs text-slate-400">
              What you are currently optimizing for based on your stated reasoning
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
          {priorities.length} Priorities Mapped
        </span>
      </div>

      {/* Priority Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {priorities.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-500">
                  Priority 0{idx + 1}
                </span>
                {item.category && (
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-medium">
                    {item.category}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-100 mb-2">
                {item.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {item.description}
              </p>
            </div>

            {item.impliedTradeoff && (
              <div className="pt-2.5 border-t border-slate-800/80 mt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-0.5">
                  Implied Trade-off
                </span>
                <p className="text-[11px] text-purple-300/90 leading-normal italic">
                  "{item.impliedTradeoff}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

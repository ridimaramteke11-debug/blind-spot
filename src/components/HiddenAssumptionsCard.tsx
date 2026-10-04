import React from 'react';
import { HiddenAssumption, SeverityLevel } from '../types/decision';
import { Brain, HelpCircle, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

interface HiddenAssumptionsCardProps {
  assumptions: HiddenAssumption[];
}

export const HiddenAssumptionsCard: React.FC<HiddenAssumptionsCardProps> = ({ assumptions }) => {
  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'Potentially important':
        return <span className="badge-important">Potentially important</span>;
      case 'Needs investigation':
        return <span className="badge-investigate">Needs investigation</span>;
      case 'Worth questioning':
      default:
        return <span className="badge-question">Worth questioning</span>;
    }
  };

  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>🧠 Hidden Assumptions</span>
            </h3>
            <p className="text-xs text-slate-400">
              Unstated premises you appear to be treating as settled facts
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          {assumptions.length} Assumptions Detected
        </span>
      </div>

      {/* Assumptions List */}
      <div className="space-y-4">
        {assumptions.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-brand-500/40 transition-all space-y-3"
          >
            {/* Top row: badge + premise */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-0.5">
                    Unstated Assumption
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                    "{item.assumption}"
                  </h4>
                </div>
              </div>

              <div className="self-start sm:self-auto">
                {getSeverityBadge(item.severity)}
              </div>
            </div>

            {/* Why It Matters */}
            <div className="pl-7 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
              <span className="font-semibold text-slate-200 block mb-1">
                Why this matters:
              </span>
              <p>{item.whyItMatters}</p>
            </div>

            {/* Stress Test Question */}
            <div className="pl-7 pt-1 flex items-start gap-2 text-xs text-brand-300">
              <HelpCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase text-brand-400 block font-semibold">
                  Test This Assumption:
                </span>
                <p className="italic text-slate-200 mt-0.5">
                  "{item.testingQuestion}"
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

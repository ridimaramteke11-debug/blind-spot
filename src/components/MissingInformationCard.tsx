import React from 'react';
import { MissingInformation } from '../types/decision';
import { HelpCircle, FileSearch, ArrowRight, CheckSquare, Sparkles } from 'lucide-react';

interface MissingInformationCardProps {
  missingInfo: MissingInformation[];
}

export const MissingInformationCard: React.FC<MissingInformationCardProps> = ({ missingInfo }) => {
  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>❓ Missing Information & Pre-Commitment Diligence</span>
            </h3>
            <p className="text-xs text-slate-400">
              Crucial facts and data points to acquire before finalizing your choice
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
          {missingInfo.length} Items To Verify
        </span>
      </div>

      {/* Grid of Missing Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missingInfo.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-500">
                  Data Gap 0{idx + 1}
                </span>
                <span className="p-1 rounded bg-blue-500/10 text-blue-400">
                  <CheckSquare className="w-3.5 h-3.5" />
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 mb-2">
                {item.missingDataPoint}
              </h4>

              <div className="text-xs text-slate-300 mb-4 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold mb-0.5">
                  Why this changes calculus:
                </span>
                <p>{item.whyCrucial}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-mono text-blue-400 block font-semibold mb-1">
                How to acquire / test:
              </span>
              <p className="text-xs text-slate-300 italic">
                "{item.howToAcquire}"
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

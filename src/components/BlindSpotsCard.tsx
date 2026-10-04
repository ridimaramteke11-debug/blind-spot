import React, { useState } from 'react';
import { BlindSpotItem, FactorDistinction, SeverityLevel } from '../types/decision';
import { Eye, ShieldAlert, HelpCircle, Filter, Sparkles, AlertCircle } from 'lucide-react';

interface BlindSpotsCardProps {
  blindSpots: BlindSpotItem[];
}

export const BlindSpotsCard: React.FC<BlindSpotsCardProps> = ({ blindSpots }) => {
  const [filterDistinction, setFilterDistinction] = useState<string>('all');

  const getDistinctionBadge = (distinction: FactorDistinction) => {
    switch (distinction) {
      case 'User Stated':
        return <span className="badge-user-stated">● User Provided Fact</span>;
      case 'Reasonable Question':
        return <span className="badge-reasonable">◆ Analytical Question</span>;
      case 'Uncertain Possibility':
      default:
        return <span className="badge-uncertain">▲ Uncertain Possibility</span>;
    }
  };

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

  const filteredItems = filterDistinction === 'all'
    ? blindSpots
    : blindSpots.filter(item => item.distinction === filterDistinction);

  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>👁 Potential Blind Spots & Overlooked Dimensions</span>
            </h3>
            <p className="text-xs text-slate-400">
              Crucial second-order factors, opportunity costs, and hidden risks
            </p>
          </div>
        </div>

        {/* Epistemological Distinction Filter */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterDistinction('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterDistinction === 'all'
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({blindSpots.length})
          </button>
          <button
            onClick={() => setFilterDistinction('Reasonable Question')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterDistinction === 'Reasonable Question'
                ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setFilterDistinction('Uncertain Possibility')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterDistinction === 'Uncertain Possibility'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Uncertainties
          </button>
        </div>
      </div>

      {/* Distinction Transparency Note */}
      <div className="mb-4 px-3.5 py-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-cyan-400">Epistemic Clarity:</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400">● User Provided</span>
          <span className="text-indigo-400">◆ Reasonable Question</span>
          <span className="text-amber-400">▲ Uncertain Possibility</span>
        </div>
      </div>

      {/* Grid of Blind Spot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  {item.category}
                </span>

                <div className="flex items-center gap-1.5">
                  {getDistinctionBadge(item.distinction)}
                  {getSeverityBadge(item.severity)}
                </div>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-100 mb-2">
                {item.factor}
              </h4>

              {/* Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.explanation}
              </p>
            </div>

            {/* Diagnostic Question */}
            <div className="pt-3 border-t border-slate-800/80 bg-slate-900/40 -mx-5 -mb-5 p-4 rounded-b-xl">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400 block font-semibold">
                    Diagnostic Inquiry:
                  </span>
                  <p className="text-xs text-slate-200 italic mt-0.5">
                    "{item.diagnosticQuestion}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

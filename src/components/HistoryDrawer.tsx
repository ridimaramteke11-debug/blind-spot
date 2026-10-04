import React from 'react';
import { BlindSpotAnalysis } from '../types/decision';
import { X, History, Trash2, ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedAnalyses: BlindSpotAnalysis[];
  onSelectAnalysis: (analysis: BlindSpotAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedAnalyses,
  onSelectAnalysis,
  onDeleteAnalysis,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Saved Reflections</h3>
              <p className="text-xs text-slate-400">{savedAnalyses.length} decision analyses in storage</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="my-4 flex-grow overflow-y-auto space-y-3 pr-1">
          {savedAnalyses.length === 0 ? (
            <div className="text-center py-16 px-4 text-slate-500 space-y-3">
              <History className="w-8 h-8 mx-auto text-slate-700" />
              <p className="text-sm">No saved reflections yet.</p>
              <p className="text-xs text-slate-600">
                Run an analysis and it will automatically be saved to your local browser session.
              </p>
            </div>
          ) : (
            savedAnalyses.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectAnalysis(item);
                  onClose();
                }}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400 mb-1.5 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-400" /> {item.timestamp}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.coverage?.overallScore || 85}% Coverage
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-brand-300 line-clamp-2 leading-snug">
                    {item.decisionTitle}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-brand-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px] font-semibold">
                    Restore Analysis <ArrowRight className="w-3 h-3" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAnalysis(item.id);
                    }}
                    className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete this analysis"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedAnalyses.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
            >
              Clear All History
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

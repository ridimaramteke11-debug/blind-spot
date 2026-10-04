import React, { useRef } from 'react';
import { BlindSpotAnalysis } from '../types/decision';
import { ReasoningCoverageMeter } from './ReasoningCoverageMeter';
import { DecisionMap } from './DecisionMap';
import { VisiblePrioritiesCard } from './VisiblePrioritiesCard';
import { HiddenAssumptionsCard } from './HiddenAssumptionsCard';
import { BlindSpotsCard } from './BlindSpotsCard';
import { ConflictingPrioritiesCard } from './ConflictingPrioritiesCard';
import { MissingInformationCard } from './MissingInformationCard';
import { PerspectiveShiftsCard } from './PerspectiveShiftsCard';
import { QuestionsWorthAskingCard } from './QuestionsWorthAskingCard';
import { ReflectionSummaryCard } from './ReflectionSummaryCard';
import { InteractiveWorksheet } from './InteractiveWorksheet';
import { 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Download, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  CheckCheck,
  ListChecks
} from 'lucide-react';

interface AnalysisDashboardProps {
  analysis: BlindSpotAnalysis;
  onReset: () => void;
  onExport: () => void;
  onOpenSettings: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  onReset,
  onExport,
  onOpenSettings,
}) => {
  const worksheetRef = useRef<HTMLDivElement>(null);

  const scrollToWorksheet = () => {
    worksheetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner / Analysis Header */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden border-brand-500/30">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-600/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-mono font-semibold">
                Reasoning Architecture
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {analysis.timestamp}
              </span>
              {analysis.isDemo ? (
                <button
                  onClick={onOpenSettings}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1"
                  title="Click to configure live LLM key"
                >
                  <span>⚡ Demo analysis — connect an AI provider for live analysis</span>
                </button>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Analysis ({analysis.provider})</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              "{analysis.decisionTitle}"
            </h2>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto flex-shrink-0">
            <button
              onClick={scrollToWorksheet}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
            >
              <ListChecks className="w-4 h-4 text-emerald-400" />
              <span>Action Worksheet</span>
            </button>

            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export / Share</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-sm transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Decision</span>
            </button>
          </div>

        </div>

        {/* User Context Review Snippet */}
        {analysis.originalInput && (
          <div className="mt-4 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {analysis.originalInput.priorities && (
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">Your Priorities</span>
                <span className="text-slate-300 line-clamp-1">{analysis.originalInput.priorities}</span>
              </div>
            )}
            {analysis.originalInput.constraints && (
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">Your Constraints</span>
                <span className="text-slate-300 line-clamp-1">{analysis.originalInput.constraints}</span>
              </div>
            )}
            {analysis.originalInput.leaning && (
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">Initial Leaning</span>
                <span className="text-slate-300 line-clamp-1">{analysis.originalInput.leaning}</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 1. Reasoning Coverage Index */}
      {analysis.coverage && (
        <ReasoningCoverageMeter coverage={analysis.coverage} />
      )}

      {/* 2. Visual Decision Map */}
      {analysis.decisionMap && analysis.decisionMap.length > 0 && (
        <DecisionMap nodes={analysis.decisionMap} />
      )}

      {/* 3. Visible Priorities (What You're Optimizing For) */}
      {analysis.visiblePriorities && analysis.visiblePriorities.length > 0 && (
        <VisiblePrioritiesCard priorities={analysis.visiblePriorities} />
      )}

      {/* 4. Hidden Assumptions */}
      {analysis.assumptions && analysis.assumptions.length > 0 && (
        <HiddenAssumptionsCard assumptions={analysis.assumptions} />
      )}

      {/* 5. Potential Blind Spots */}
      {analysis.blindSpots && analysis.blindSpots.length > 0 && (
        <BlindSpotsCard blindSpots={analysis.blindSpots} />
      )}

      {/* 6. Conflicting Priorities */}
      {analysis.conflicts && analysis.conflicts.length > 0 && (
        <ConflictingPrioritiesCard conflicts={analysis.conflicts} />
      )}

      {/* 7. Missing Information */}
      {analysis.missingInformation && analysis.missingInformation.length > 0 && (
        <MissingInformationCard missingInfo={analysis.missingInformation} />
      )}

      {/* 8. Perspective Shifts & Cognitive Models */}
      {analysis.perspectives && analysis.perspectives.length > 0 && (
        <PerspectiveShiftsCard perspectives={analysis.perspectives} />
      )}

      {/* 9. Questions Worth Asking */}
      {analysis.questions && analysis.questions.length > 0 && (
        <QuestionsWorthAskingCard questions={analysis.questions} />
      )}

      {/* 10. Reflection Summary */}
      <ReflectionSummaryCard
        summary={analysis.reflectionSummary}
        closingPrompt={analysis.reflectionClosingPrompt}
        onOpenWorksheet={scrollToWorksheet}
      />

      {/* 11. Interactive Worksheet Section */}
      <div ref={worksheetRef}>
        <InteractiveWorksheet analysis={analysis} />
      </div>

    </div>
  );
};

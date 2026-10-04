import React from 'react';
import { ReasoningCoverage } from '../types/decision';
import { Activity, Info, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ReasoningCoverageMeterProps {
  coverage: ReasoningCoverage;
}

export const ReasoningCoverageMeter: React.FC<ReasoningCoverageMeterProps> = ({ coverage }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-cyan-400 stroke-cyan-400';
    if (score >= 65) return 'text-brand-400 stroke-brand-400';
    return 'text-amber-400 stroke-amber-400';
  };

  const getDimensionBadge = (status: string) => {
    if (status === 'Thoroughly Explored') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          <span>Thorough</span>
        </span>
      );
    }
    if (status === 'Moderately Mapped') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-300 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md">
          <Activity className="w-3 h-3" />
          <span>Mapped</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
        <AlertTriangle className="w-3 h-3" />
        <span>Gaps Identified</span>
      </span>
    );
  };

  const strokeDash = `${(coverage.overallScore / 100) * 226} 226`;

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Reasoning Coverage Index</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                ({coverage.overallScore}%)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Measures breadth of cognitive exploration across strategic pillars
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exploratory Breadth Metric</span>
        </div>
      </div>

      {/* Main Grid: Meter + Pillar Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                className={`transition-all duration-1000 ease-out ${getScoreColor(coverage.overallScore)}`}
                strokeWidth="6"
                strokeDasharray={strokeDash}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black tracking-tight text-white">
                {coverage.overallScore}%
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Coverage
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-semibold text-slate-200 block">
              {coverage.label}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Multi-angle perspective mapping
            </span>
          </div>
        </div>

        {/* Right: Dimension Bars */}
        <div className="lg:col-span-8 space-y-3">
          {coverage.dimensions.map((dim, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  {dim.dimension}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    {dim.score}%
                  </span>
                  {getDimensionBadge(dim.status)}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${dim.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                {dim.summary}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Mandatory Disclaimer Callout */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="italic">
          {coverage.disclaimer || 'This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable.'}
        </p>
      </div>

    </div>
  );
};

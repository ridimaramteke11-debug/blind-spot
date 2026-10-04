import React, { useState } from 'react';
import { BlindSpotAnalysis } from '../types/decision';
import confetti from 'canvas-confetti';
import { CheckCircle2, ListChecks, Sparkles, Send, Copy, Check, Download, BookmarkCheck } from 'lucide-react';

interface InteractiveWorksheetProps {
  analysis: BlindSpotAnalysis;
  onClose?: () => void;
}

export const InteractiveWorksheet: React.FC<InteractiveWorksheetProps> = ({ analysis, onClose }) => {
  const [selectedAssumptions, setSelectedAssumptions] = useState<Set<string>>(new Set());
  const [selectedBlindSpots, setSelectedBlindSpots] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleAssumption = (id: string) => {
    setSelectedAssumptions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBlindSpot = (id: string) => {
    setSelectedBlindSpots(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFinishPlan = () => {
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
    });
  };

  const copyActionPlan = () => {
    const chosenAssumptions = analysis.assumptions
      .filter(a => selectedAssumptions.has(a.id))
      .map(a => `- Assumption: ${a.assumption}\n  Test Question: ${a.testingQuestion}`)
      .join('\n');

    const chosenBlindSpots = analysis.blindSpots
      .filter(b => selectedBlindSpots.has(b.id))
      .map(b => `- Blind Spot: ${b.factor} (${b.category})\n  Diagnostic: ${b.diagnosticQuestion}`)
      .join('\n');

    const planText = `# BLIND SPOT — Reflection Action Plan
Decision: ${analysis.decisionTitle}
Date: ${new Date().toLocaleDateString()}

## Priority Assumptions to Test:
${chosenAssumptions || 'None selected'}

## Overlooked Factors to Investigate:
${chosenBlindSpots || 'None selected'}

## My Personal Next Steps / Notes:
${notes || 'None entered'}

---
Generated with BLIND SPOT (AI Decision Reflection Tool)
`;

    navigator.clipboard.writeText(planText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="reflection-worksheet" className="glass-card p-6 sm:p-8 relative border-brand-500/30">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>📝 Interactive Reflection Worksheet</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                Action Builder
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Select the high-leverage premises you will actively investigate before choosing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyActionPlan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Plan Copied!' : 'Copy Plan'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Step 1: Pick Assumptions to stress test */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-brand-300 block mb-2">
            1. Select Assumptions You Want to Stress-Test:
          </label>
          <div className="space-y-2">
            {analysis.assumptions.map(a => {
              const isSelected = selectedAssumptions.has(a.id);
              return (
                <div
                  key={a.id}
                  onClick={() => toggleAssumption(a.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-brand-950/50 border-brand-500/60 text-slate-100 shadow-glow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-700 text-brand-500 focus:ring-brand-500 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">"{a.assumption}"</span>
                    <span className="text-[11px] text-brand-400 italic">Test: {a.testingQuestion}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Pick Blind Spots to investigate */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
            2. Select Overlooked Factors to Investigate:
          </label>
          <div className="space-y-2">
            {analysis.blindSpots.map(b => {
              const isSelected = selectedBlindSpots.has(b.id);
              return (
                <div
                  key={b.id}
                  onClick={() => toggleBlindSpot(b.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-slate-100 shadow-glow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-slate-200 block mb-0.5">{b.factor} ({b.category})</span>
                    <span className="text-[11px] text-cyan-400 italic">Diagnostic: {b.diagnosticQuestion}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Personal Notes & Next Action */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
            3. Your Personal Next Actions / Inquiries:
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Tomorrow at 2 PM I will email the academic advisor about capstone policy, and schedule a call with Sarah to talk through the tax implications..."
            className="w-full glass-input text-xs leading-relaxed resize-none"
          />
        </div>

        {/* Completion Trigger */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {selectedAssumptions.size + selectedBlindSpots.size} items prioritized for investigation
          </span>

          <button
            onClick={handleFinishPlan}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-glow-sm flex items-center justify-center gap-2"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Lock In My Reflection Plan</span>
          </button>
        </div>

        {isCompleted && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-bold block mb-0.5">Reflection Plan Ready!</span>
              <span>You have turned hidden blind spots into concrete due diligence tasks. Proceed with deliberate clarity.</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

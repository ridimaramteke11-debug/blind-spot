import React, { useState, useEffect } from 'react';
import { DecisionInput } from '../types/decision';
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, HelpCircle, Check, Compass, Layers, Clock, ShieldAlert } from 'lucide-react';

interface DecisionFormProps {
  input: DecisionInput;
  onChange: (input: DecisionInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
  loadingStep: string;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({
  input,
  onChange,
  onSubmit,
  isLoading,
  loadingStep,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Keyboard shortcut Ctrl+Enter or Cmd+Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (input.decision.trim().length >= 5 && !isLoading) {
          onSubmit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, isLoading, onSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.decision || input.decision.trim().length < 5) {
      setValidationError('Please state the decision you are considering (minimum 5 characters).');
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  const handleFieldChange = (field: keyof DecisionInput, value: string) => {
    if (validationError) setValidationError(null);
    onChange({
      ...input,
      [field]: value,
    });
  };

  return (
    <div id="decision-form-section" className="glass-card p-6 sm:p-8 relative">
      
      {/* Subtle glowing header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-400" />
            <span>Map Your Decision</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Articulate your thinking. The AI will detect what's hidden between your stated lines.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="hidden sm:inline">Shortcut:</span>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
            Ctrl + Enter
          </kbd>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core Decision Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="decision-input" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span>What decision are you currently considering?</span>
              <span className="text-brand-400 font-bold">*</span>
            </label>
            <span className="text-xs text-slate-500 font-mono">
              {input.decision.length} chars
            </span>
          </div>

          <textarea
            id="decision-input"
            rows={3}
            value={input.decision}
            onChange={(e) => handleFieldChange('decision', e.target.value)}
            placeholder="e.g., I want to accept a 6-month corporate internship instead of attending my regular on-campus college semester..."
            className="w-full glass-input text-sm sm:text-base leading-relaxed resize-none focus:ring-brand-500"
            disabled={isLoading}
          />

          {validationError && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </div>

        {/* Expandable / Structured Context Sections */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-brand-400" />
              <span>Decision Context & Variables (Optional but Recommended)</span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <span className="text-[11px] text-slate-500">
              More context yields deeper blind spots
            </span>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 transition-all">
              
              {/* Context */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Context & Background</span>
                  <span className="text-[10px] text-slate-500">What led to this?</span>
                </label>
                <textarea
                  rows={2}
                  value={input.context || ''}
                  onChange={(e) => handleFieldChange('context', e.target.value)}
                  placeholder="e.g. Current situation, timeline, team, finances, location..."
                  className="w-full glass-input text-xs leading-relaxed resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* Why you're leaning one way */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Why you're leaning one way</span>
                  <span className="text-[10px] text-slate-500">Your current intuition / gut pull</span>
                </label>
                <textarea
                  rows={2}
                  value={input.leaning || ''}
                  onChange={(e) => handleFieldChange('leaning', e.target.value)}
                  placeholder="e.g. It pays well, saves on rent, or seems like the most exciting path..."
                  className="w-full glass-input text-xs leading-relaxed resize-none"
                  disabled={isLoading}
                />
              </div>

              {/* What matters most to you */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>What matters most to you</span>
                  <span className="text-[10px] text-slate-500">Visible priorities</span>
                </label>
                <input
                  type="text"
                  value={input.priorities || ''}
                  onChange={(e) => handleFieldChange('priorities', e.target.value)}
                  placeholder="e.g. Financial savings, career pedigree, staying close to family..."
                  className="w-full glass-input text-xs"
                  disabled={isLoading}
                />
              </div>

              {/* Constraints & Non-negotiables */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Constraints & Non-negotiables</span>
                  <span className="text-[10px] text-slate-500">Fixed rules or deadlines</span>
                </label>
                <input
                  type="text"
                  value={input.constraints || ''}
                  onChange={(e) => handleFieldChange('constraints', e.target.value)}
                  placeholder="e.g. Graduation policy, budget ceiling, 30-day offer deadline..."
                  className="w-full glass-input text-xs"
                  disabled={isLoading}
                />
              </div>

              {/* Alternatives considered */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Alternatives you are considering</span>
                  <span className="text-[10px] text-slate-500">Plan B, middle ground, status quo</span>
                </label>
                <input
                  type="text"
                  value={input.alternatives || ''}
                  onChange={(e) => handleFieldChange('alternatives', e.target.value)}
                  placeholder="e.g. Summer internship, part-time 20h hybrid, staying at current job..."
                  className="w-full glass-input text-xs"
                  disabled={isLoading}
                />
              </div>

            </div>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldAlert className="w-4 h-4 text-brand-400 flex-shrink-0" />
            <span>AI will diagnose reasoning structure without making the final choice.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.decision.trim()}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 ${
              isLoading || !input.decision.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 shadow-glow-md hover:shadow-glow-lg active:scale-98'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{loadingStep || 'Analyzing Reasoning Architecture...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-brand-200" />
                <span>Reveal My Blind Spots</span>
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

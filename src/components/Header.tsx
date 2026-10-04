import React from 'react';
import { Eye, Settings, History, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onReset: () => void;
  onScrollToForm: () => void;
  savedCount: number;
  serverStatus: {
    status: string;
    hasOpenAI: boolean;
    hasGemini: boolean;
    hasGroq: boolean;
    mode: 'live' | 'demo';
  } | null;
  hasActiveAnalysis: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenHistory,
  onReset,
  onScrollToForm,
  savedCount,
  serverStatus,
  hasActiveAnalysis,
}) => {
  const isLive = serverStatus?.mode === 'live';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 p-0.5 shadow-glow-sm group-hover:shadow-glow-md transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Eye className="w-5 h-5 text-brand-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-lg bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                BLIND SPOT
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-brand-500/10 text-brand-300 border border-brand-500/20 rounded-full">
                AI Cognitive Reflection
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium tracking-wide">
              See beyond the obvious.
            </p>
          </div>
        </div>

        {/* Right Navigation & Status Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Provider status indicator */}
          <button
            onClick={onOpenSettings}
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isLive
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
            }`}
            title="Configure OpenAI, Gemini or Groq API Keys"
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isLive ? 'Live AI Connected' : 'Demo Mode Active'}</span>
          </button>

          {/* Reset / New Analysis button */}
          {hasActiveAnalysis && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-medium transition-all"
              title="Start New Decision Analysis"
            >
              <RotateCcw className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">New Decision</span>
            </button>
          )}

          {/* Saved History */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-medium transition-all"
            title="View saved reflection logs"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">History</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-brand-500/20 text-brand-300 text-[10px] font-mono rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Settings / API Key modal */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
            title="AI Engine Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Main CTA */}
          <button
            onClick={onScrollToForm}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze a Decision</span>
          </button>
        </div>

      </div>
    </header>
  );
};

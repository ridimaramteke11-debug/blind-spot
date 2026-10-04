import React from 'react';
import { Eye, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
              <Eye className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-base tracking-wider">
              BLIND SPOT
            </span>
            <span className="text-xs font-mono text-slate-500">|</span>
            <span className="text-xs text-brand-400 font-medium tracking-wide">
              "See beyond the obvious."
            </span>
          </div>

          <p className="text-xs text-slate-400 max-w-md">
            Blind Spot doesn't make decisions for you. It helps you see more of the decision.
          </p>
        </div>

        {/* Mandatory Hackathon & AI Disclosure */}
        <div className="space-y-1.5 text-xs text-slate-500 max-w-md md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Generated Cognitive Reflection Analysis</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Built for The Blind Spot Hackathon. Designed to encourage critical thinking, epistemological honesty, and self-reflection.
          </p>
        </div>

      </div>
    </footer>
  );
};

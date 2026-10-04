import React from 'react';
import { Eye, ShieldAlert, Compass, Lightbulb, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onSelectExamplePreset: (exampleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToForm,
  onSelectExamplePreset,
}) => {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      
      {/* Top Banner Tag */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/30 text-brand-300 shadow-glow-sm text-xs font-medium backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-ping" />
          <span>The Blind Spot Hackathon MVP</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Intellectual Honesty & Cognitive Reflection</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          See what your decision <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            might be missing.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-4">
          Blind Spot uses AI to challenge your assumptions, surface overlooked factors, and ask the questions you haven't considered — without deciding for you.
        </p>

        {/* Philosophy Callout Card */}
        <div className="inline-block mt-3 px-5 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-sm max-w-2xl text-center backdrop-blur-sm">
          <p className="italic text-slate-300 font-serif">
            "The decision isn't always the problem. Sometimes it's what you're not seeing."
          </p>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Good decisions aren't just about having more information. They're about noticing the information you might be missing.
          </p>
        </div>

        {/* Hero CTA & Quick Presets */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToForm}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-3 group active:scale-98"
          >
            <Sparkles className="w-5 h-5 text-brand-200 group-hover:rotate-12 transition-transform" />
            <span>Analyze a Decision</span>
            <ArrowDown className="w-4 h-4 text-brand-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Or try:</span>
            <button
              onClick={() => onSelectExamplePreset('internship-vs-college')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:text-white transition-all text-slate-300"
            >
              🎓 College Internship
            </button>
            <button
              onClick={() => onSelectExamplePreset('relocation-job-offer')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-white transition-all text-slate-300"
            >
              ✈️ London Offer
            </button>
          </div>
        </div>

        {/* Non-prescriptive guarantee badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Never tells you what to choose</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
            <span>Uncovers unstated assumptions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Visual interactive Decision Map</span>
          </div>
        </div>
      </div>

      {/* 3 Core Pillar Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        
        {/* Card 1: Challenge Assumptions */}
        <div className="glass-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
            Challenge Assumptions
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Spot the unverified premises you are treating as facts. Stress-test every belief with targeted diagnostic questions before committing time or capital.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs text-brand-400 font-mono">
            <span>Hidden premises → Stress tests</span>
          </div>
        </div>

        {/* Card 2: Surface Blind Spots */}
        <div className="glass-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            Surface Blind Spots
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unpack second-order effects, opportunity costs, reversibility, and subtle contradictions between your stated goals and chosen execution.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs text-cyan-400 font-mono">
            <span>Opportunity cost & reversibility</span>
          </div>
        </div>

        {/* Card 3: Ask Better Questions */}
        <div className="glass-card-hover p-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
            Ask Better Questions
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Examine your dilemma through powerful cognitive mental models (10/10/10 Rule, Inversion Pre-Mortem, Regret Minimization) to gain ultimate clarity.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs text-indigo-400 font-mono">
            <span>Multi-angle cognitive lenses</span>
          </div>
        </div>

      </div>

    </section>
  );
};

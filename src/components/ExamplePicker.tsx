import React from 'react';
import { EXAMPLE_PRESETS } from '../data/examples';
import { ExamplePreset } from '../types/decision';
import { Sparkles, ArrowRight, BookOpen, GraduationCap, Plane, Rocket } from 'lucide-react';

interface ExamplePickerProps {
  onSelectExample: (preset: ExamplePreset, autoRun?: boolean) => void;
  selectedId?: string;
}

export const ExamplePicker: React.FC<ExamplePickerProps> = ({
  onSelectExample,
  selectedId,
}) => {
  const getIcon = (id: string) => {
    if (id.includes('internship')) return <GraduationCap className="w-5 h-5 text-purple-400" />;
    if (id.includes('relocation')) return <Plane className="w-5 h-5 text-cyan-400" />;
    return <Rocket className="w-5 h-5 text-amber-400" />;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Try a Realistic Hackathon Example
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">1-Click Demo Pre-loaders</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EXAMPLE_PRESETS.map((preset) => {
          const isSelected = selectedId === preset.id;
          return (
            <div
              key={preset.id}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-brand-950/40 border-brand-500/60 shadow-glow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
              onClick={() => onSelectExample(preset, false)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    {getIcon(preset.id)}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {preset.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-brand-300 transition-colors line-clamp-1 mb-1.5">
                  {preset.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {preset.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 group-hover:text-slate-200 flex items-center gap-1">
                  Load into Form <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectExample(preset, true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-brand-600/30 hover:bg-brand-600/50 text-brand-200 border border-brand-500/30 text-[11px] font-medium transition-colors flex items-center gap-1"
                  title="Load and analyze immediately"
                >
                  <Sparkles className="w-3 h-3 text-brand-300" />
                  <span>Instant Run</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

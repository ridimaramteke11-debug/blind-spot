import React, { useState } from 'react';
import { PerspectiveShift } from '../types/decision';
import { RotateCw, Compass, Clock, ShieldCheck, DoorClosed, HeartHandshake, Sparkles } from 'lucide-react';

interface PerspectiveShiftsCardProps {
  perspectives: PerspectiveShift[];
}

export const PerspectiveShiftsCard: React.FC<PerspectiveShiftsCardProps> = ({ perspectives }) => {
  const [selectedLensIndex, setSelectedLensIndex] = useState<number>(0);

  const getLensIcon = (name: string) => {
    if (name.includes('10/10/10')) return <Clock className="w-5 h-5 text-indigo-400" />;
    if (name.includes('Inversion') || name.includes('Pre-Mortem')) return <RotateCw className="w-5 h-5 text-rose-400" />;
    if (name.includes('Door') || name.includes('Reversible')) return <DoorClosed className="w-5 h-5 text-cyan-400" />;
    return <HeartHandshake className="w-5 h-5 text-amber-400" />;
  };

  const activeLens = perspectives[selectedLensIndex] || perspectives[0];

  return (
    <div className="glass-card p-6 sm:p-7 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>🔄 Alternative Cognitive Lenses & Perspective Shifts</span>
            </h3>
            <p className="text-xs text-slate-400">
              Reframing the problem through proven mental models to reveal counter-intuitive insights
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          {perspectives.length} Cognitive Models
        </span>
      </div>

      {/* Lens Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {perspectives.map((lens, index) => (
          <button
            key={lens.id || index}
            onClick={() => setSelectedLensIndex(index)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selectedLensIndex === index
                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 shadow-glow-sm ring-1 ring-indigo-500/30'
                : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {getLensIcon(lens.lensName)}
            <span>{lens.lensName}</span>
          </button>
        ))}
      </div>

      {/* Active Lens Content Card */}
      {activeLens && (
        <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase font-mono text-indigo-400 font-semibold block mb-0.5">
                Mental Model
              </span>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                {activeLens.lensName}
              </h4>
            </div>

            <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
              {activeLens.tagline}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block font-semibold mb-1">
              Alternative Viewpoint:
            </span>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/60">
              {activeLens.alternativeViewpoint}
            </p>
          </div>

          <div className="pt-2 flex items-start gap-2 text-xs text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-400 block font-semibold">
                Reframing Prompt:
              </span>
              <p className="italic text-slate-100 font-medium text-xs sm:text-sm mt-0.5">
                "{activeLens.reframingQuestion}"
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { DecisionMapNode } from '../types/decision';
import { Network, ArrowDown, ArrowRight, CheckCircle2, HelpCircle, Eye, Search, Sparkles } from 'lucide-react';

interface DecisionMapProps {
  nodes: DecisionMapNode[];
  onFocusSection?: (sectionId: string) => void;
}

export const DecisionMap: React.FC<DecisionMapProps> = ({ nodes, onFocusSection }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(nodes[0]?.id || null);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'What You Know':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          accent: 'emerald',
        };
      case 'What You Are Assuming':
        return {
          bg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
          dot: 'bg-purple-400',
          icon: <HelpCircle className="w-4 h-4 text-purple-400" />,
          accent: 'purple',
        };
      case 'What May Be Missing':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400',
          icon: <Eye className="w-4 h-4 text-amber-400" />,
          accent: 'amber',
        };
      case 'What To Investigate':
        return {
          bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
          dot: 'bg-cyan-400',
          icon: <Search className="w-4 h-4 text-cyan-400" />,
          accent: 'cyan',
        };
      case 'Questions To Reflect On':
      default:
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
          dot: 'bg-indigo-400',
          icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
          accent: 'indigo',
        };
    }
  };

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Your Decision Map</span>
            </h3>
            <p className="text-xs text-slate-400">
              Visual reasoning pipeline from stated baseline to deep reflection
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 self-start sm:self-auto">
          5-Stage Cognitive Architecture
        </span>
      </div>

      {/* Interactive Horizontal Pipeline (Desktop) / Vertical (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative mb-6">
        {nodes.map((node, index) => {
          const config = getStageColor(node.stage);
          const isActive = activeNode?.id === node.id;

          return (
            <div key={node.id} className="relative flex flex-col">
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 h-full flex flex-col justify-between group ${
                  isActive
                    ? 'bg-slate-900 border-brand-500 shadow-glow-sm ring-1 ring-brand-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Stage 0{index + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${config.dot} ${isActive ? 'animate-ping' : ''}`} />
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold mb-2 border ${config.bg}`}>
                    {config.icon}
                    <span>{node.stage}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                    {node.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="line-clamp-1">{node.tags?.[0] || 'Explore'}</span>
                  <span className="text-brand-400 font-bold">{isActive ? 'Active' : 'Inspect'}</span>
                </div>
              </button>

              {/* Arrow divider for desktop */}
              {index < nodes.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Card */}
      {activeNode && (
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-brand-400">
                STAGE INSPECTOR
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-bold text-white">
                {activeNode.stage}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeNode.tags?.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-medium text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-100 mb-2">
            {activeNode.title}
          </h4>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeNode.summary}
          </p>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { BlindSpotAnalysis } from '../types/decision';
import { X, Copy, Check, Download, Printer, FileText } from 'lucide-react';

interface ExportModalProps {
  analysis: BlindSpotAnalysis;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ analysis, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const generateMarkdown = () => {
    return `# BLIND SPOT — AI Decision Reflection Report

**Decision:** ${analysis.decisionTitle}
**Analysis Generated:** ${analysis.timestamp}
**Provider Mode:** ${analysis.provider}
**Reasoning Coverage:** ${analysis.coverage?.overallScore}% (${analysis.coverage?.label})

---

## 🎯 1. What You're Optimizing For (Visible Priorities)
${analysis.visiblePriorities.map((p, i) => `### ${i + 1}. ${p.title} (${p.category || 'General'})
- **Description:** ${p.description}
${p.impliedTradeoff ? `- **Implied Trade-off:** ${p.impliedTradeoff}` : ''}
`).join('\n')}

---

## 🧠 2. Hidden Assumptions
${analysis.assumptions.map((a, i) => `### ${i + 1}. "${a.assumption}"
- **Severity Level:** ${a.severity}
- **Why It Matters:** ${a.whyItMatters}
- **Testing Question:** ${a.testingQuestion}
`).join('\n')}

---

## 👁️ 3. Potential Blind Spots & Overlooked Dimensions
${analysis.blindSpots.map((b, i) => `### ${i + 1}. ${b.factor} (${b.category})
- **Epistemic Type:** ${b.distinction}
- **Severity:** ${b.severity}
- **Explanation:** ${b.explanation}
- **Diagnostic Question:** ${b.diagnosticQuestion}
`).join('\n')}

---

## ⚖️ 4. Conflicting Priorities & Inherent Tensions
${analysis.conflicts.map((c, i) => `### ${i + 1}. Tension: ${c.sideA} vs ${c.sideB}
- **Analysis:** ${c.tensionAnalysis}
- **Neutral Observation:** ${c.neutralObservation}
`).join('\n')}

---

## ❓ 5. Missing Information & Pre-Commitment Diligence
${analysis.missingInformation.map((m, i) => `### ${i + 1}. ${m.missingDataPoint}
- **Why Crucial:** ${m.whyCrucial}
- **How to Acquire / Test:** ${m.howToAcquire}
`).join('\n')}

---

## 🔄 6. Perspective Shifts & Cognitive Models
${analysis.perspectives.map((p, i) => `### ${i + 1}. ${p.lensName} — ${p.tagline}
- **Alternative Viewpoint:** ${p.alternativeViewpoint}
- **Reframing Prompt:** ${p.reframingQuestion}
`).join('\n')}

---

## 💭 7. Questions Worth Asking
${analysis.questions.map((q, i) => `${i + 1}. **"${q.question}"** (${q.category})\n   *Reflective Prompt: ${q.reflectionPrompt}*`).join('\n\n')}

---

## 🧭 8. Reflection Summary
${analysis.reflectionSummary}

> **Reflective Inquiry:** ${analysis.reflectionClosingPrompt}

---
*Disclaimer: Blind Spot does not make decisions for you. It serves solely to expand your cognitive reasoning field.*
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `blind-spot-reflection-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Reflection Report</h3>
              <p className="text-xs text-slate-400">Share or archive your decision analysis</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview snippet */}
        <div className="my-5 flex-grow overflow-y-auto max-h-60 p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
          {generateMarkdown()}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print to PDF</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download .md</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-glow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

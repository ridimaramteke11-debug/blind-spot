import React, { useState } from 'react';
import { X, Key, Cpu, ShieldCheck, Check, Sparkles, Server } from 'lucide-react';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverStatus: {
    status: string;
    hasOpenAI: boolean;
    hasGemini: boolean;
    hasAnthropic: boolean;
    hasGroq: boolean;
    mode: 'live' | 'demo';
  } | null;
  customApiKey: string;
  onSaveCustomKey: (key: string, provider: string, model: string) => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  serverStatus,
  customApiKey,
  onSaveCustomKey,
}) => {
  const [keyInput, setKeyInput] = useState<string>(customApiKey || '');
  const [provider, setProvider] = useState<string>('auto');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCustomKey(keyInput.trim(), provider, model);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Engine & API Settings</h3>
              <p className="text-xs text-slate-400">Configure LLM providers or use Demo Fallback Mode</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Server status alert */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-brand-400" /> Server Environment Status:
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              serverStatus?.mode === 'live'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              {serverStatus?.mode === 'live' ? 'Live AI Key Loaded' : 'Demo Fallback Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {serverStatus?.mode === 'live'
              ? 'Server has an active AI API key in its environment variables. Live reasoning will be prioritized.'
              : 'No server-side key configured. The application seamlessly generates high-quality deterministic reflection models without failing.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          
          <div>
            <label className="text-xs font-semibold text-slate-200 block mb-1.5">
              Custom Client-Side API Key (Optional)
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="sk-proj-... or Gemini AI key"
              className="w-full glass-input text-xs font-mono"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Stored locally in browser session memory. Never hardcoded or logged.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1.5">
                Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full glass-input text-xs bg-slate-900 cursor-pointer"
              >
                <option value="auto">Auto-Detect</option>
                <option value="openai">OpenAI</option>
                <option value="gemini">Google Gemini</option>
                <option value="groq">Groq (Llama 3.3)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1.5">
                Model Name
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gpt-4o-mini / gemini-1.5-flash"
                className="w-full glass-input text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setKeyInput('');
                onSaveCustomKey('', 'auto', 'gpt-4o-mini');
              }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Reset to Demo Mode
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-glow-sm flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{savedSuccess ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

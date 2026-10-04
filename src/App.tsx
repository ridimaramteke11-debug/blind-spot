import React, { useState, useEffect, useRef } from 'react';
import { DecisionInput, BlindSpotAnalysis, ExamplePreset } from './types/decision';
import { EXAMPLE_PRESETS } from './data/examples';
import { analyzeDecision, checkServerStatus } from './services/aiService';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ExamplePicker } from './components/ExamplePicker';
import { DecisionForm } from './components/DecisionForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { ExportModal } from './components/ExportModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'blind_spot_saved_analyses_v1';
const API_SETTINGS_KEY = 'blind_spot_api_settings_v1';

export const App: React.FC = () => {
  // Input state
  const [input, setInput] = useState<DecisionInput>({
    decision: '',
    context: '',
    leaning: '',
    priorities: '',
    constraints: '',
    alternatives: '',
  });

  // Analysis state
  const [analysis, setAnalysis] = useState<BlindSpotAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [selectedExampleId, setSelectedExampleId] = useState<string | undefined>();

  // Saved reflections & history
  const [savedAnalyses, setSavedAnalyses] = useState<BlindSpotAnalysis[]>([]);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Server & API Key
  const [serverStatus, setServerStatus] = useState<{
    status: string;
    hasOpenAI: boolean;
    hasGemini: boolean;
    hasAnthropic: boolean;
    hasGroq: boolean;
    mode: 'live' | 'demo';
  } | null>(null);

  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [customProvider, setCustomProvider] = useState<string>('auto');
  const [customModel, setCustomModel] = useState<string>('gpt-4o-mini');

  const formSectionRef = useRef<HTMLDivElement>(null);
  const analysisSectionRef = useRef<HTMLDivElement>(null);

  // Initialize on mount
  useEffect(() => {
    // Check server status
    checkServerStatus().then(status => setServerStatus(status));

    // Load saved history
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedAnalyses(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse saved history:', e);
    }

    // Load custom API key if previously entered
    try {
      const storedSettings = localStorage.getItem(API_SETTINGS_KEY);
      if (storedSettings) {
        const { key, provider, model } = JSON.parse(storedSettings);
        if (key) setCustomApiKey(key);
        if (provider) setCustomProvider(provider);
        if (model) setCustomModel(model);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const saveAnalysisToHistory = (newAnalysis: BlindSpotAnalysis) => {
    setSavedAnalyses(prev => {
      const filtered = prev.filter(item => item.id !== newAnalysis.id && item.decisionTitle !== newAnalysis.decisionTitle);
      const updated = [newAnalysis, ...filtered].slice(0, 15);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // quota exceeded or private mode
      }
      return updated;
    });
  };

  const handleSaveCustomKey = (key: string, provider: string, model: string) => {
    setCustomApiKey(key);
    setCustomProvider(provider);
    setCustomModel(model);
    try {
      localStorage.setItem(API_SETTINGS_KEY, JSON.stringify({ key, provider, model }));
    } catch (e) {
      // ignore
    }
  };

  const handleScrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectExample = (preset: ExamplePreset, autoRun = false) => {
    setInput(preset.input);
    setSelectedExampleId(preset.id);
    handleScrollToForm();

    if (autoRun) {
      triggerAnalysis(preset.input);
    }
  };

  const triggerAnalysis = async (targetInput: DecisionInput) => {
    if (!targetInput.decision || targetInput.decision.trim().length < 5) return;

    setIsLoading(true);
    setLoadingStep('Mapping stated decision parameters...');

    const stepTimers: NodeJS.Timeout[] = [];
    stepTimers.push(setTimeout(() => setLoadingStep('Detecting hidden assumptions & unstated premises...'), 450));
    stepTimers.push(setTimeout(() => setLoadingStep('Identifying second-order blind spots & trade-offs...'), 900));
    stepTimers.push(setTimeout(() => setLoadingStep('Synthesizing cognitive mental models & reflection queries...'), 1350));

    try {
      const result = await analyzeDecision(targetInput, {
        apiKey: customApiKey || undefined,
        provider: customProvider as any,
        model: customModel || undefined,
      });

      stepTimers.forEach(clearTimeout);
      setAnalysis(result);
      saveAnalysisToHistory(result);

      // Scroll to analysis
      setTimeout(() => {
        analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      stepTimers.forEach(clearTimeout);
      console.error('Analysis execution error:', err);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setInput({
      decision: '',
      context: '',
      leaning: '',
      priorities: '',
      constraints: '',
      alternatives: '',
    });
    setSelectedExampleId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setSavedAnalyses(prev => {
      const next = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleClearAllHistory = () => {
    setSavedAnalyses([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        onScrollToForm={handleScrollToForm}
        savedCount={savedAnalyses.length}
        serverStatus={serverStatus}
        hasActiveAnalysis={Boolean(analysis)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        {!analysis && (
          <HeroSection
            onScrollToForm={handleScrollToForm}
            onSelectExamplePreset={(presetId) => {
              const p = EXAMPLE_PRESETS.find(e => e.id === presetId);
              if (p) handleSelectExample(p, false);
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Example Picker */}
          {!analysis && (
            <ExamplePicker
              onSelectExample={handleSelectExample}
              selectedId={selectedExampleId}
            />
          )}

          {/* Decision Form Container */}
          <div ref={formSectionRef}>
            <DecisionForm
              input={input}
              onChange={setInput}
              onSubmit={() => triggerAnalysis(input)}
              isLoading={isLoading}
              loadingStep={loadingStep}
            />
          </div>

          {/* Active Analysis Dashboard */}
          {analysis && (
            <div ref={analysisSectionRef} className="pt-4">
              <AnalysisDashboard
                analysis={analysis}
                onReset={handleReset}
                onExport={() => setIsExportOpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        serverStatus={serverStatus}
        customApiKey={customApiKey}
        onSaveCustomKey={handleSaveCustomKey}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedAnalyses={savedAnalyses}
        onSelectAnalysis={(saved) => {
          setAnalysis(saved);
          setInput(saved.originalInput);
          setTimeout(() => {
            analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onDeleteAnalysis={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />

      {analysis && isExportOpen && (
        <ExportModal
          analysis={analysis}
          onClose={() => setIsExportOpen(false)}
        />
      )}

    </div>
  );
};

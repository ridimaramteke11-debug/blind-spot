import { BlindSpotAnalysis, DecisionInput } from '../types/decision';
import { generateFallbackAnalysis } from './fallbackAnalyzer';

export interface AnalysisRequestOptions {
  apiKey?: string;
  provider?: 'openai' | 'gemini' | 'anthropic' | 'groq' | 'auto';
  model?: string;
}

export async function analyzeDecision(
  input: DecisionInput,
  options?: AnalysisRequestOptions
): Promise<BlindSpotAnalysis> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.apiKey ? { 'X-Custom-API-Key': options.apiKey } : {}),
        ...(options?.provider ? { 'X-Provider': options.provider } : {}),
        ...(options?.model ? { 'X-Model': options.model } : {}),
      },
      body: JSON.stringify({ input, options }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('API returned non-OK status, falling back to local reasoning engine:', errData);
      return generateFallbackAnalysis(input);
    }

    const data = await response.json();
    if (data && data.analysis && data.analysis.visiblePriorities) {
      return data.analysis;
    }

    console.warn('API returned unexpected format, falling back to deterministic analyzer');
    return generateFallbackAnalysis(input);
  } catch (error) {
    console.warn('Network or server error during analyze call, using deterministic fallback:', error);
    return generateFallbackAnalysis(input);
  }
}

export async function checkServerStatus(): Promise<{
  status: string;
  hasOpenAI: boolean;
  hasGemini: boolean;
  hasAnthropic: boolean;
  hasGroq: boolean;
  mode: 'live' | 'demo';
}> {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    // server unreachable or standalone client
  }
  return {
    status: 'standalone-client',
    hasOpenAI: false,
    hasGemini: false,
    hasAnthropic: false,
    hasGroq: false,
    mode: 'demo',
  };
}

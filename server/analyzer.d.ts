import { BlindSpotAnalysis, DecisionInput } from '../src/types/decision';

export declare function processDecisionAnalysis(
  input: DecisionInput,
  options?: {
    apiKey?: string;
    provider?: string;
    model?: string;
  }
): Promise<{
  analysis: BlindSpotAnalysis;
  isDemo: boolean;
  provider: string;
}>;

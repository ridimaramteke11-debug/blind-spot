export interface DecisionInput {
  decision: string;
  context?: string;
  leaning?: string;
  priorities?: string;
  constraints?: string;
  alternatives?: string;
}

export type SeverityLevel = 'Potentially important' | 'Needs investigation' | 'Worth questioning';

export type FactorDistinction = 'User Stated' | 'Reasonable Question' | 'Uncertain Possibility';

export interface VisiblePriority {
  id: string;
  title: string;
  description: string;
  category?: string;
  impliedTradeoff?: string;
}

export interface HiddenAssumption {
  id: string;
  assumption: string;
  whyItMatters: string;
  testingQuestion: string;
  severity: SeverityLevel;
}

export interface BlindSpotItem {
  id: string;
  category: string; // e.g., 'Opportunity Cost', 'Reversibility', 'Mentorship & Learning', 'Financial & Hidden Costs', 'Long-term Trajectory', 'Emotional & Social'
  factor: string;
  distinction: FactorDistinction;
  explanation: string;
  diagnosticQuestion: string;
  severity: SeverityLevel;
}

export interface PriorityConflict {
  id: string;
  sideA: string;
  sideB: string;
  tensionAnalysis: string;
  neutralObservation: string;
}

export interface MissingInformation {
  id: string;
  missingDataPoint: string;
  whyCrucial: string;
  howToAcquire: string;
}

export interface PerspectiveShift {
  id: string;
  lensName: string; // e.g. '10/10/10 Rule', 'Inversion (Failure Pre-Mortem)', 'Reversible vs Irreversible Door', 'Future-Self Regret Minimization'
  tagline: string;
  alternativeViewpoint: string;
  reframingQuestion: string;
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  category: string;
  reflectionPrompt: string;
}

export interface ReasoningCoverageDimension {
  dimension: string; // e.g. 'Downside Risk', 'Opportunity Cost', 'Reversibility', 'Learning & Mentorship', 'Social/Family Impact', 'Long-term Compounding'
  score: number; // 0 to 100
  status: 'Thoroughly Explored' | 'Moderately Mapped' | 'Significant Gaps Identified';
  summary: string;
}

export interface ReasoningCoverage {
  overallScore: number; // 0 to 100 (exploratory breadth index)
  label: string; // e.g. 'Multi-Angle Reasoning'
  dimensions: ReasoningCoverageDimension[];
  disclaimer: string;
}

export interface DecisionMapNode {
  id: string;
  stage: 'What You Know' | 'What You Are Assuming' | 'What May Be Missing' | 'What To Investigate' | 'Questions To Reflect On';
  title: string;
  summary: string;
  type: 'known' | 'assumption' | 'blindspot' | 'investigation' | 'reflection';
  tags?: string[];
}

export interface BlindSpotAnalysis {
  id: string;
  timestamp: string;
  decisionTitle: string;
  originalInput: DecisionInput;
  isDemo: boolean;
  provider: string;
  visiblePriorities: VisiblePriority[];
  assumptions: HiddenAssumption[];
  blindSpots: BlindSpotItem[];
  conflicts: PriorityConflict[];
  missingInformation: MissingInformation[];
  perspectives: PerspectiveShift[];
  questions: ReflectionQuestion[];
  reflectionSummary: string;
  reflectionClosingPrompt: string;
  coverage: ReasoningCoverage;
  decisionMap: DecisionMapNode[];
}

export interface ExamplePreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  input: DecisionInput;
}

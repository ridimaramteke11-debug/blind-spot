import { DecisionInput } from '../types/decision';

export const SYSTEM_PROMPT = `You are BLIND SPOT, an expert analytical cognitive engine designed to reveal hidden assumptions, underexplored trade-offs, overlooked risks, and blind spots in human decision-making.

CRITICAL OPERATIONAL RULES:
1. NEVER make the decision for the user. Do NOT say "you should choose X", "you must do Y", or "we recommend Z".
2. NEVER rate the decision as "good" or "bad".
3. Your sole purpose is to stimulate rigorous, multi-dimensional critical reflection and intellectual honesty.
4. Distinguish clearly between:
   - What the user explicitly stated (Facts / Stated Preferences)
   - Reasonable analytical questions to test premises
   - Uncertain possibilities and second-order dynamics
5. Avoid generic boilerplate (e.g., "Think about your future" or "Consider your budget"). Ground every insight specifically in the user's situation and trade-offs.
6. Tone: Highly perceptive, calm, respectful, intellectually stimulating, and laser-focused on reasoning architecture.
7. Return ONLY valid, parseable JSON strictly adhering to the requested schema. No markdown formatting outside the JSON, no commentary before or after.`;

export function buildAnalysisPrompt(input: DecisionInput): string {
  return `Analyze the following decision and uncover all implicit assumptions, conflicting priorities, blind spots, missing information, and cognitive perspectives.

### USER DECISION CONTEXT:
- **Decision Under Consideration**: ${input.decision}
- **Context & Background**: ${input.context || 'Not explicitly provided by user.'}
- **Current Leaning / Intuition**: ${input.leaning || 'Not explicitly stated.'}
- **Stated Visible Priorities**: ${input.priorities || 'Not explicitly enumerated.'}
- **Stated Constraints / Non-negotiables**: ${input.constraints || 'Not explicitly provided.'}
- **Alternatives Considered**: ${input.alternatives || 'None mentioned.'}

### REQUIRED OUTPUT FORMAT:
You must output a single JSON object with EXACTLY this structure:
{
  "visiblePriorities": [
    {
      "id": "p1",
      "title": "Short title (e.g. Immediate Cash Flow & Cost Minimization)",
      "description": "Specific summary of what the user is optimizing for based on their input.",
      "category": "Financial / Career / Lifestyle / Speed / Autonomy",
      "impliedTradeoff": "What this priority quietly de-emphasizes."
    }
  ],
  "assumptions": [
    {
      "id": "a1",
      "assumption": "Clear statement of the unverified premise (e.g. Proximity equals low stress).",
      "whyItMatters": "Why relying on this unproven assumption could alter the outcome.",
      "testingQuestion": "A precise, testable question the user can ask to verify this assumption.",
      "severity": "Worth questioning" | "Needs investigation" | "Potentially important"
    }
  ],
  "blindSpots": [
    {
      "id": "b1",
      "category": "Opportunity Cost" | "Reversibility" | "Mentorship & Quality" | "Downside Risk" | "Long-term Compounding" | "Social & Family Dynamics" | "Hidden Friction",
      "factor": "Specific overlooked factor",
      "distinction": "User Stated" | "Reasonable Question" | "Uncertain Possibility",
      "explanation": "Detailed, specific analysis of why this factor is overlooked and its 2nd-order ripple effects.",
      "diagnosticQuestion": "A sharp question to evaluate this blind spot.",
      "severity": "Potentially important" | "Needs investigation" | "Worth questioning"
    }
  ],
  "conflicts": [
    {
      "id": "c1",
      "sideA": "First stated desire / goal",
      "sideB": "Second competing desire / constraint",
      "tensionAnalysis": "Neutral explanation of why these two forces pull in opposing directions in this specific scenario.",
      "neutralObservation": "A balanced framing of the underlying trade-off without declaring a winner."
    }
  ],
  "missingInformation": [
    {
      "id": "m1",
      "missingDataPoint": "Exact information or unknown variable",
      "whyCrucial": "Why having this data changes the calculus before committing",
      "howToAcquire": "Concrete, low-friction action to obtain or test this information (e.g., reach out to alumni, review syllabus, simulate calendar)"
    }
  ],
  "perspectives": [
    {
      "id": "lens1",
      "lensName": "Name of mental model (e.g. Inversion / Pre-Mortem, 10/10/10 Rule, One-Way vs Two-Way Door, Regret Minimization)",
      "tagline": "Brief cognitive hook",
      "alternativeViewpoint": "How this specific decision looks when seen through this mental model.",
      "reframingQuestion": "A thought-provoking reframe query."
    }
  ],
  "questions": [
    {
      "id": "q1",
      "question": "Deep, high-leverage question specifically tailored to this decision",
      "category": "Execution Reality / Alignment / Reversibility / Opportunity Cost / Values",
      "reflectionPrompt": "Guiding prompt to help the user unpack their answer."
    }
  ],
  "reflectionSummary": "A concise, intellectually grounded synthesis of the reasoning landscape uncovered above.",
  "reflectionClosingPrompt": "You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate before moving forward?",
  "coverage": {
    "overallScore": 84,
    "label": "Broad Multi-Angle Reasoning",
    "dimensions": [
      {
        "dimension": "Financial & Direct Costs",
        "score": 90,
        "status": "Thoroughly Explored",
        "summary": "Direct compensation and savings are well understood; hidden indirect costs require check."
      },
      {
        "dimension": "Opportunity Cost & Alternatives",
        "score": 65,
        "status": "Significant Gaps Identified",
        "summary": "Foreground option is dominant; alternative high-leverage paths were minimally explored."
      },
      {
        "dimension": "Reversibility & Exit Velocity",
        "score": 75,
        "status": "Moderately Mapped",
        "summary": "Ease of reversing or pivoting if assumptions fail needs concrete validation."
      },
      {
        "dimension": "Long-term Compounding vs Short-term Gain",
        "score": 70,
        "status": "Moderately Mapped",
        "summary": "Short-term incentives are clear; long-term skill compounding is less defined."
      },
      {
        "dimension": "Social, Emotional & Energy Toll",
        "score": 80,
        "status": "Moderately Mapped",
        "summary": "Impact on relationships and cognitive bandwidth requires calendar stress-testing."
      }
    ],
    "disclaimer": "This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable."
  },
  "decisionMap": [
    {
      "id": "dm1",
      "stage": "What You Know",
      "title": "Stated Baseline Facts",
      "summary": "Concrete known parameters provided in the submission.",
      "type": "known",
      "tags": ["Facts", "Stated Baseline"]
    },
    {
      "id": "dm2",
      "stage": "What You Are Assuming",
      "title": "Unverified Premises",
      "summary": "Core assumptions about workload, outcome stability, and support systems.",
      "type": "assumption",
      "tags": ["Hypothesis", "Assumptions"]
    },
    {
      "id": "dm3",
      "stage": "What May Be Missing",
      "title": "Overlooked Trade-offs",
      "summary": "Opportunity costs, mentorship caliber, and second-order dependencies.",
      "type": "blindspot",
      "tags": ["Blind Spots", "2nd-Order"]
    },
    {
      "id": "dm4",
      "stage": "What To Investigate",
      "title": "Concrete Diligence Steps",
      "summary": "Specific inquiries to verify unknowns before final commitment.",
      "type": "investigation",
      "tags": ["Action Items", "Diligence"]
    },
    {
      "id": "dm5",
      "stage": "Questions To Reflect On",
      "title": "Personal Values & Priorities",
      "summary": "Core internal inquiries regarding alignment and long-term trajectory.",
      "type": "reflection",
      "tags": ["Reflection", "Mindset"]
    }
  ]
}`;
}

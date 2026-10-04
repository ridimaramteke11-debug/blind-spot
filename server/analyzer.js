import { generateFallbackAnalysis } from '../src/services/fallbackAnalyzer.js';
import { SYSTEM_PROMPT, buildAnalysisPrompt } from '../src/services/promptBuilder.js';

export async function processDecisionAnalysis(input, options = {}) {
  const customKey = options.apiKey;
  const preferredProvider = options.provider || 'auto';
  
  const openaiKey = customKey && (preferredProvider === 'openai' || preferredProvider === 'auto') ? customKey : process.env.OPENAI_API_KEY;
  const geminiKey = customKey && (preferredProvider === 'gemini' || preferredProvider === 'auto') ? customKey : process.env.GEMINI_API_KEY;
  const anthropicKey = customKey && (preferredProvider === 'anthropic' || preferredProvider === 'auto') ? customKey : process.env.ANTHROPIC_API_KEY;
  const groqKey = customKey && (preferredProvider === 'groq' || preferredProvider === 'auto') ? customKey : process.env.GROQ_API_KEY;

  const prompt = buildAnalysisPrompt(input);

  // 1. Try OpenAI if key is present
  if (openaiKey && (preferredProvider === 'openai' || preferredProvider === 'auto')) {
    try {
      const model = options.model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = parseAndSanitizeAnalysis(content, input, `OpenAI (${model})`);
          if (parsed) return { analysis: parsed, isDemo: false, provider: `OpenAI (${model})` };
        }
      } else {
        const errText = await response.text();
        console.warn('OpenAI API call failed:', response.status, errText);
      }
    } catch (e) {
      console.warn('OpenAI request exception:', e.message);
    }
  }

  // 2. Try Google Gemini if key is present
  if (geminiKey && (preferredProvider === 'gemini' || preferredProvider === 'auto')) {
    try {
      const model = options.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          const parsed = parseAndSanitizeAnalysis(content, input, `Google Gemini (${model})`);
          if (parsed) return { analysis: parsed, isDemo: false, provider: `Google Gemini (${model})` };
        }
      } else {
        const errText = await response.text();
        console.warn('Gemini API call failed:', response.status, errText);
      }
    } catch (e) {
      console.warn('Gemini request exception:', e.message);
    }
  }

  // 3. Try Groq if key is present
  if (groqKey && (preferredProvider === 'groq' || preferredProvider === 'auto')) {
    try {
      const model = options.model || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.6,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = parseAndSanitizeAnalysis(content, input, `Groq (${model})`);
          if (parsed) return { analysis: parsed, isDemo: false, provider: `Groq (${model})` };
        }
      }
    } catch (e) {
      console.warn('Groq request exception:', e.message);
    }
  }

  // 4. Default to deterministic fallback engine
  const fallback = generateFallbackAnalysis(input);
  return {
    analysis: fallback,
    isDemo: true,
    provider: 'Deterministic Reflection Engine (Demo Fallback)',
  };
}

function parseAndSanitizeAnalysis(rawContent, input, providerName) {
  try {
    let clean = rawContent.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const data = JSON.parse(clean);

    return {
      id: 'analysis-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      decisionTitle: input.decision,
      originalInput: input,
      isDemo: false,
      provider: providerName,
      visiblePriorities: Array.isArray(data.visiblePriorities) ? data.visiblePriorities : [],
      assumptions: Array.isArray(data.assumptions) ? data.assumptions : [],
      blindSpots: Array.isArray(data.blindSpots) ? data.blindSpots : [],
      conflicts: Array.isArray(data.conflicts) ? data.conflicts : [],
      missingInformation: Array.isArray(data.missingInformation) ? data.missingInformation : [],
      perspectives: Array.isArray(data.perspectives) ? data.perspectives : [],
      questions: Array.isArray(data.questions) ? data.questions : [],
      reflectionSummary: data.reflectionSummary || 'You now have a multi-faceted breakdown of the reasoning architecture surrounding this choice.',
      reflectionClosingPrompt: data.reflectionClosingPrompt || 'You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate?',
      coverage: data.coverage || {
        overallScore: 85,
        label: 'Balanced Reasoning Exploration',
        dimensions: [],
        disclaimer: 'This Reasoning Coverage index reflects analytical breadth, not an assessment of whether your decision is favorable or unfavorable.',
      },
      decisionMap: Array.isArray(data.decisionMap) ? data.decisionMap : [],
    };
  } catch (err) {
    console.error('Failed to parse AI JSON response:', err, rawContent);
    return null;
  }
}

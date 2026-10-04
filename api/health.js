export default function handler(req, res) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Custom-API-Key, X-Provider, X-Model'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasGroq = Boolean(process.env.GROQ_API_KEY);

  res.status(200).json({
    status: 'healthy',
    hasOpenAI,
    hasGemini,
    hasAnthropic,
    hasGroq,
    mode: hasOpenAI || hasGemini || hasAnthropic || hasGroq ? 'live' : 'demo',
    timestamp: new Date().toISOString(),
  });
}

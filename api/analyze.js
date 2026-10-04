import { processDecisionAnalysis } from '../server/analyzer.js';

export default async function handler(req, res) {
  // Enable CORS headers
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

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const { input, options } = req.body || {};

    if (!input || !input.decision || typeof input.decision !== 'string' || !input.decision.trim()) {
      res.status(400).json({ error: 'A valid decision statement is required.' });
      return;
    }

    const customKey = req.headers['x-custom-api-key'] || options?.apiKey;
    const provider = req.headers['x-provider'] || options?.provider;
    const model = req.headers['x-model'] || options?.model;

    const result = await processDecisionAnalysis(input, {
      apiKey: customKey,
      provider,
      model,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Vercel serverless analyze error:', error);
    res.status(500).json({
      error: 'An internal error occurred while analyzing the decision.',
      message: error.message,
    });
  }
}

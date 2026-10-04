import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processDecisionAnalysis } from './analyzer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health & Status endpoint
app.get('/api/health', (req, res) => {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasGroq = Boolean(process.env.GROQ_API_KEY);

  res.json({
    status: 'healthy',
    hasOpenAI,
    hasGemini,
    hasAnthropic,
    hasGroq,
    mode: hasOpenAI || hasGemini || hasAnthropic || hasGroq ? 'live' : 'demo',
    timestamp: new Date().toISOString(),
  });
});

// Primary Decision Analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { input, options } = req.body;

    if (!input || !input.decision || typeof input.decision !== 'string' || !input.decision.trim()) {
      return res.status(400).json({ error: 'A valid decision statement is required.' });
    }

    const customKey = req.headers['x-custom-api-key'] || options?.apiKey;
    const provider = req.headers['x-provider'] || options?.provider;
    const model = req.headers['x-model'] || options?.model;

    const result = await processDecisionAnalysis(input, {
      apiKey: customKey,
      provider,
      model,
    });

    res.json(result);
  } catch (error) {
    console.error('Server error processing decision analysis:', error);
    res.status(500).json({
      error: 'An internal error occurred while analyzing the decision.',
      message: error.message,
    });
  }
});

// Serve frontend in production if dist exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Blind Spot backend is running. Run `npm run dev` for Vite frontend development.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`👁️  BLIND SPOT API Server listening on port ${PORT}`);
  console.log(`📡  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`✨  AI Providers: OpenAI (${Boolean(process.env.OPENAI_API_KEY)}), Gemini (${Boolean(process.env.GEMINI_API_KEY)}), Groq (${Boolean(process.env.GROQ_API_KEY)})`);
  console.log(`==================================================\n`);
});

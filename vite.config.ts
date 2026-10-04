import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { processDecisionAnalysis } from './server/analyzer.js';

dotenv.config();

// Vite dev server API middleware plugin so everything runs with one command
function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
          const hasGemini = Boolean(process.env.GEMINI_API_KEY);
          const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
          const hasGroq = Boolean(process.env.GROQ_API_KEY);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'healthy',
            hasOpenAI,
            hasGemini,
            hasAnthropic,
            hasGroq,
            mode: hasOpenAI || hasGemini || hasAnthropic || hasGroq ? 'live' : 'demo',
            timestamp: new Date().toISOString()
          }));
          return;
        }

        if (req.url === '/api/analyze' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const { input, options } = JSON.parse(body || '{}');
              if (!input || !input.decision) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'A valid decision statement is required.' }));
                return;
              }

              const customKey = (req.headers['x-custom-api-key'] as string) || options?.apiKey;
              const provider = (req.headers['x-provider'] as string) || options?.provider;
              const model = (req.headers['x-model'] as string) || options?.model;

              const result = await processDecisionAnalysis(input, {
                apiKey: customKey,
                provider,
                model,
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});

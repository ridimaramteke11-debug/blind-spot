# 👁️ BLIND SPOT — AI Decision Reflection Tool

> **"See beyond the obvious."**  
> *The decision isn't always the problem. Sometimes it's what you're not seeing.*

---

## 🎯 Problem Statement

When making high-stakes decisions (career transitions, startup strategies, academic crossroads, major life choices), people naturally anchor on the information that is most visible and immediate to them. In the process, they frequently:
- Rely on unstated assumptions treated as settled facts
- Overlook second-order ripple effects and opportunity costs
- Fail to recognize contradictions within their own reasoning
- Confuse immediate financial or cosmetic incentives with long-term compounding returns

---

## 💡 Solution: BLIND SPOT

**BLIND SPOT** is an AI-powered cognitive reflection engine that helps users identify potential blind spots, unexamined assumptions, and hidden trade-offs in their reasoning.

### 🛡️ Critical Design Philosophy
1. **The AI does NOT make the decision for you.** It never says *"you should choose X"* or *"you should not choose Y"*.
2. **It does NOT judge or score your decision.** The *Reasoning Coverage Index* measures how thoroughly different analytical dimensions were explored, NOT whether your decision is "good" or "bad".
3. **Epistemic Clarity:** Clearly separates what was explicitly stated by the user (`● User Provided`), from reasonable diagnostic inquiries (`◆ Reasonable Question`), and speculative second-order risks (`▲ Uncertain Possibility`).
4. **Actionable Reflection:** Converts vague anxieties into specific stress-test questions, due diligence checklists, and mental model reframes.

---

## ✨ Key Features

- **🎯 1. What You're Optimizing For (Visible Priorities):** Unpacks your explicit and implicit targets and reveals what is being quietly de-emphasized.
- **🧠 2. Hidden Assumptions Detector:** Pinpoints unverified premises you are treating as facts, explains why they matter, and provides precise stress-test questions.
- **👁️ 3. Potential Blind Spots:** Surfaces overlooked factors across opportunity costs, reversibility, downside risk, long-term compounding, mentorship quality, and social dynamics.
- **⚖️ 4. Conflicting Priorities (Neutral Contradiction Detector):** Highlights competing desires pulling in opposite directions without declaring a winner.
- **❓ 5. Missing Information Checklist:** Identifies crucial unknowns and provides concrete, low-friction steps to acquire the data before committing.
- **🔄 6. Alternative Cognitive Lenses:** Reframes the dilemma through proven mental models:
  - *10/10/10 Rule* (10 minutes, 10 months, 10 years)
  - *Inversion / Failure Pre-Mortem* (Designing against the worst failure mode)
  - *Two-Way vs One-Way Doors* (Reversibility analysis)
  - *Future-Self Regret Minimization*
- **💭 7. High-Leverage Questions Worth Asking:** 5–8 provocative reflection questions with interactive bookmarking and copy-to-clipboard.
- **🗺️ 8. Interactive 5-Stage Decision Map:** A visual cognitive pipeline tracing:
  `What You Know` ➔ `What You're Assuming` ➔ `What May Be Missing` ➔ `What To Investigate` ➔ `Questions To Reflect On`
- **📊 9. Reasoning Coverage Index:** Radial exploration gauge assessing the breadth of dimensions explored.
- **📝 10. Interactive Reflection Worksheet:** Prioritize top blind spots, add personal notes, and generate a concrete action plan with celebratory feedback.
- **⚡ 11. 100% Guaranteed Deterministic Fallback Mode:** Works seamlessly out-of-the-box with or without external API keys.
- **📄 12. Multi-Format Export:** Export to formatted Markdown, print to PDF, or copy to clipboard.
- **🗂️ 13. Local Reflection History:** Stores recent decision analyses in browser storage for quick review and comparison.

---

## 🏗️ Architecture & Tech Stack

```
blind-spot/
├── src/
│   ├── components/       # Reusable UI components (Dashboard, Cards, Map, Worksheet, Modals)
│   ├── data/             # Preset realistic demo scenarios
│   ├── services/         # AI Service, Prompt Builder, Deterministic Fallback Engine
│   ├── types/            # Strict TypeScript interfaces
│   ├── App.tsx           # App root & state orchestration
│   ├── index.css         # Tailwind + Glassmorphism design system
│   └── main.tsx          # Vite React entrypoint
├── server/
│   ├── analyzer.js       # Multi-provider LLM handler (OpenAI, Gemini, Groq, Fallback)
│   └── index.js          # Express API server for production & standalone deployments
├── .env.example          # Environment variable template
├── vite.config.ts        # Vite config with integrated dev API middleware
└── package.json          # Dependencies and npm scripts
```

### Technology Stack:
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend / Dev Proxy:** Express.js + Vite development middleware
- **AI Integrations:** OpenAI (GPT-4o / GPT-4o-mini), Google Gemini (1.5 Flash), Groq (Llama 3.3), or local custom models
- **Styling:** Custom Obsidian Dark Mode (`bg-slate-950`), glowing accents, accessible contrast ratios, and glassmorphism.

---

## 🚀 Quick Start (Run Locally in 60 Seconds)

### 1. Clone & Install
```bash
git clone <repo-url>
cd promptwar
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(If no API keys are provided, the app will run automatically in Demo Fallback Mode with rich tailored responses).*

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at: **`http://localhost:5173`**

---

## 🔑 Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Server port (for `npm start`) | `3001` |
| `OPENAI_API_KEY` | OpenAI API key for live analysis | `sk-...` (Optional) |
| `OPENAI_MODEL` | OpenAI Model | `gpt-4o-mini` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` (Optional) |
| `GEMINI_MODEL` | Gemini Model | `gemini-1.5-flash` |
| `GROQ_API_KEY` | Groq API key | `gsk_...` (Optional) |

---

## 🌐 Deployment Instructions

### Option A: Vercel (One-Click)
1. Push repository to GitHub.
2. Import project into Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variables (`OPENAI_API_KEY` or `GEMINI_API_KEY`) if desired.

### Option B: Render / Railway / Node Server
1. Set Build Command: `npm install && npm run build`
2. Set Start Command: `npm start`
3. Add environment variables in dashboard.

---

## 🧪 Example Walkthrough: The 6-Month Internship Dilemma

**User Decision:**  
*"I want to accept a 6-month corporate internship at a fintech company instead of attending my regular on-campus university semester."*

**Visible Priorities Identified:**
- Immediate financial benefit ($3,500/mo stipend)
- Resume prestige and industry foothold
- Geographic convenience (20 mins from home)

**Hidden Assumption Uncovered:**
- *"You appear to assume that physical proximity to home guarantees a 40-hour work week will be manageable alongside academic requirements."*
- **Stress-Test:** *"What does your actual hour-by-hour calendar look like on a Tuesday during midterm week with 8 hours of work plus coursework?"*

**Potential Blind Spot (Opportunity Cost):**
- *"Comparing intern pay to zero income feels like an immediate gain, but delaying graduation by 6 months delays your entry into full-time engineering compensation ($90k+ annualized), creating a net negative financial trade-off."*

**Mental Model Reframe (Inversion Pre-Mortem):**
- *"Imagine it is 6 months from now and you deeply regret taking the internship because mentorship was sparse and graduation was delayed. What preventative guardrails can you establish today?"*

---

## 📜 Disclaimer
*Blind Spot is a cognitive reflection and reasoning exploration tool. It does not provide professional financial, legal, medical, or academic advice, and does not make decisions on behalf of users.*

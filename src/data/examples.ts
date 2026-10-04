import { ExamplePreset } from '../types/decision';

export const EXAMPLE_PRESETS: ExamplePreset[] = [
  {
    id: 'internship-vs-college',
    title: '6-Month Corporate Internship vs Full-time College Semester',
    badge: 'Career & Academics',
    description: 'A university student weighing an attractive fintech stipend and local office against campus coursework and graduation timeline.',
    input: {
      decision: 'I want to accept a 6-month corporate internship at a fintech company instead of attending my regular on-campus university semester.',
      context: 'The internship pays a high stipend ($3,500/month) and the office is only 20 minutes from my family home. It is for a junior software engineer role on their payments team. If I take it, I will need to take an official semester leave of absence or overload on night courses.',
      leaning: 'I am strongly leaning toward taking the offer because the money is great, it looks prestigious on my resume, and living at home saves on rent.',
      priorities: 'Immediate financial savings, graduating with real-world industry experience, keeping life comfortable by staying close to family.',
      constraints: 'University requires all graduating seniors to finish capstone projects during the spring semester. Missing this semester might push graduation back by 6 months. Minimum working hours are 40 hours/week.',
      alternatives: 'Decline the internship and focus on GPA/capstone on campus; negotiate a 3-month summer internship or part-time 20-hour arrangement; take online credit equivalents if department approves.'
    }
  },
  {
    id: 'relocation-job-offer',
    title: 'Relocating to London for a Big Tech Offer',
    badge: 'Life & Relocation',
    description: 'A Senior Engineer deciding whether to leave their comfortable hometown support network for a high-compensation London role.',
    input: {
      decision: 'Should I accept an offer to relocate to London for a Senior Software Engineer position at a Tier-1 tech company?',
      context: 'Current role is stable, fully remote, paying €85k in a mid-sized European city with a strong circle of friends and low cost of living. The new London offer is £130k base + equity, but London rent and taxes are substantially higher.',
      leaning: 'Leaning toward accepting because working at a Tier-1 brand has been a career milestone, and London has an unmatched tech ecosystem.',
      priorities: 'Accelerating career trajectory, expanding global professional network, maximizing total compensation over a 5-year horizon.',
      constraints: 'Partner works locally in healthcare and cannot immediately transfer their license to the UK. Relocation package expires in 30 days. High upfront relocation and tenancy deposit friction.',
      alternatives: 'Stay at current remote job and push for internal promotion; negotiate a 6-month remote trial period from current country before physical relocation; search for local high-growth scaleups.'
    }
  },
  {
    id: 'startup-mvp-launch',
    title: 'Launching a Raw B2B SaaS MVP vs 3 Months Feature Polish',
    badge: 'Entrepreneurship & Strategy',
    description: 'A solo founder debating whether to launch a raw, incomplete AI workflow tool now to get paying feedback or polish core integrations.',
    input: {
      decision: 'Launch our unpolished B2B AI workflow SaaS MVP now with only 1 integration, or delay public launch by 3 months to build 4 more integrations and automated onboarding.',
      context: 'We have 8 beta testers using the single integration manually. 3 of them said they would pay $49/mo, but 5 others said it lacks the crucial Slack and Jira connectors they need daily. Runway is 7 months of personal savings.',
      leaning: "Leaning toward delaying 3 months so the product looks credible, polished, and doesn't churn initial visitors from Product Hunt and LinkedIn.",
      priorities: 'Brand reputation, high initial conversion rate, avoiding churn of hard-earned signups.',
      constraints: 'Burn rate is $3,000/month in living expenses. Competitors in the AI workflow space are launching new features weekly.',
      alternatives: 'Launch privately to a closed waitlist of 50 users while building integrations; charge an upfront annual pilot to the 3 interested beta users; launch on Product Hunt with a "Coming Soon" roadmap for the missing integrations.'
    }
  }
];

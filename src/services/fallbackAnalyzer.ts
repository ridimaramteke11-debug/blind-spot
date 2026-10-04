import { BlindSpotAnalysis, DecisionInput } from '../types/decision';

export function generateFallbackAnalysis(input: DecisionInput): BlindSpotAnalysis {
  const dLower = (input.decision + ' ' + (input.context || '') + ' ' + (input.leaning || '')).toLowerCase();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Check if it matches or closely resembles Example 1 (Internship vs College)
  if (dLower.includes('internship') || dLower.includes('semester') || dLower.includes('stipend') || dLower.includes('fintech') || dLower.includes('college')) {
    return {
      id: 'analysis-' + Date.now(),
      timestamp,
      decisionTitle: input.decision,
      originalInput: input,
      isDemo: true,
      provider: 'Deterministic Reflection Engine (Demo Mode)',
      visiblePriorities: [
        {
          id: 'p1',
          title: 'Immediate Financial Benefit & Savings',
          description: 'Maximizing short-term cash flow with the stated $3,500/month stipend while minimizing living expenses by staying at home.',
          category: 'Financial',
          impliedTradeoff: 'May overshadow long-term skill acquisition and graduation trajectory.'
        },
        {
          id: 'p2',
          title: 'Resume Credibility & Industry Foothold',
          description: 'Securing a recognized corporate brand name on your CV prior to full-time graduation.',
          category: 'Career Growth',
          impliedTradeoff: 'Focuses on brand pedigree rather than verifying the day-to-day quality of engineering mentorship.'
        },
        {
          id: 'p3',
          title: 'Comfort & Geographic Convenience',
          description: 'Valuing a 20-minute commute from home to maintain existing domestic routines and family proximity.',
          category: 'Lifestyle',
          impliedTradeoff: 'Assumes low physical commute directly translates to manageable cognitive load alongside coursework.'
        }
      ],
      assumptions: [
        {
          id: 'a1',
          assumption: 'Proximity to home and short commute guarantees that a 40-hour work week will be manageable alongside academic requirements.',
          whyItMatters: 'Physical proximity does not reduce cognitive fatigue. Overloading coursework or night classes after full workdays frequently leads to burnout during crunch/exam periods.',
          testingQuestion: 'What does your realistic hour-by-hour calendar look like on a Tuesday during midterm week with 8 hours of work plus assignments?',
          severity: 'Needs investigation'
        },
        {
          id: 'a2',
          assumption: 'Any industry internship role inherently provides superior learning and mentorship compared to finishing university capstone projects on schedule.',
          whyItMatters: 'Many large corporate internships assign repetitive maintenance tasks with limited senior engineering mentorship. If mentorship is sparse, the 6-month delay in graduation yields diminishing career returns.',
          testingQuestion: 'Who will be your designated direct technical mentor, how many hours per week will they pair with you, and what exact production codebase will you touch?',
          severity: 'Potentially important'
        },
        {
          id: 'a3',
          assumption: 'Delaying graduation by 6 months carries no meaningful market risk or hidden financial opportunity cost.',
          whyItMatters: 'Delaying graduation shifts your entry into full-time earning power. Six months of a full-time senior/entry salary ($90k+ annualized) vastly exceeds six months of an intern stipend ($21k total).',
          testingQuestion: 'Does earning $21k now cost you $45k+ in delayed full-time engineering earnings and promotional seniority down the road?',
          severity: 'Worth questioning'
        }
      ],
      blindSpots: [
        {
          id: 'b1',
          category: 'Opportunity Cost & Financial Math',
          factor: 'Delayed Full-time Earning Trajectory',
          distinction: 'Reasonable Question',
          explanation: 'Comparing an internship stipend to zero income feels like an immediate win, but comparing 6 months of intern pay to 6 months of delayed full-time engineer compensation reveals a net negative financial trade-off.',
          diagnosticQuestion: 'Are you evaluating this stipend against "doing nothing" rather than against entering the full-time job market 6 months earlier?',
          severity: 'Potentially important'
        },
        {
          id: 'b2',
          category: 'Mentorship & Learning Quality',
          factor: 'Day-to-Day Task Scope vs Marketing Pitch',
          distinction: 'Uncertain Possibility',
          explanation: 'Junior roles in corporate payments teams frequently have heavy compliance and legacy infrastructure gates, meaning interns may spend weeks on documentation rather than shipping core code.',
          diagnosticQuestion: 'Have you spoken directly to a previous intern on this exact team (not just the campus recruiter) about their actual ticket velocity?',
          severity: 'Needs investigation'
        },
        {
          id: 'b3',
          category: 'Reversibility & Academic Policy',
          factor: 'University Leave Policy & Capstone Re-enrollment Friction',
          distinction: 'User Stated',
          explanation: 'University departments often have strict prerequisite sequencing. If capstone cohorts only form once per academic year in spring, a 6-month leave could accidentally trigger a full 12-month graduation delay.',
          diagnosticQuestion: 'Is the capstone project offered every single semester, or only once per academic year in spring?',
          severity: 'Potentially important'
        },
        {
          id: 'b4',
          category: 'Emotional & Social Energy',
          factor: 'Social Disconnect from Graduating Cohort',
          distinction: 'Reasonable Question',
          explanation: 'Graduating out of sync with your college cohort changes the collaborative experience, alumni network cohesion, and participation in milestone campus events.',
          diagnosticQuestion: 'How much value do you place on graduating alongside your study group and collaborating on final senior showcase projects?',
          severity: 'Worth questioning'
        }
      ],
      conflicts: [
        {
          id: 'c1',
          sideA: 'Desire to maximize professional resume velocity and financial independence now',
          sideB: 'Desire to graduate cleanly on schedule without academic friction or administrative delays',
          tensionAnalysis: 'Accepting a 40-hour internship directly compromises full-time daytime class attendance and capstone group collaboration.',
          neutralObservation: 'This represents a classic acceleration vs sequencing trade-off: front-loading workplace experience requires sacrificing academic linearity.'
        },
        {
          id: 'c2',
          sideA: 'Belief that living at home will keep stress levels minimal',
          sideB: 'Reality of balancing full-time corporate sprint deliverables with evening college coursework',
          tensionAnalysis: 'Domestic comfort cannot substitute for finite daily mental stamina and focus blocks.',
          neutralObservation: 'Examine whether family expectations and corporate deadlines compete for the same evening hours.'
        }
      ],
      missingInformation: [
        {
          id: 'm1',
          missingDataPoint: 'Formal Academic Dean Confirmation on Leave vs Course Invalidation',
          whyCrucial: 'To guarantee that taking a semester off will not forfeit scholarships, housing priority, or capstone team allocations.',
          howToAcquire: 'Schedule a 20-minute meeting with your academic advisor with a written petition before signing the employment contract.'
        },
        {
          id: 'm2',
          missingDataPoint: 'Direct Feedback from the Exact Payments Team Lead',
          whyCrucial: 'Recruiters sell the brand vision; engineering managers define daily work tickets, on-call expectations, and tech stack.',
          howToAcquire: 'Request a brief 15-minute informal chat with the hiring engineering manager to ask about your specific onboarding project.'
        },
        {
          id: 'm3',
          missingDataPoint: 'Possibility of a Summer or Part-Time Modified Arrangement',
          whyCrucial: 'You may be treating this as a binary all-or-nothing choice without testing if the company allows 20h/week or a summer shift.',
          howToAcquire: 'Ask HR if the role can be shifted to a summer term or converted to a 20-hour hybrid coop alongside college credits.'
        }
      ],
      perspectives: [
        {
          id: 'lens1',
          lensName: '10/10/10 Rule',
          tagline: 'Short, Medium, and Long-Horizon Clarity',
          alternativeViewpoint: 'In 10 days: Thrilled by the offer and money. In 10 months: Potential stress if capstone is delayed and exams collide with work sprints. In 10 years: Both the $3,500 stipend and a 6-month graduation gap will be negligible blips; the defining factor will be the caliber of engineering habits and mentors you built.',
          reframingQuestion: 'Which option builds the stronger compounding engineering foundation for where you want to be in 5 years?'
        },
        {
          id: 'lens2',
          lensName: 'Inversion (Failure Pre-Mortem)',
          tagline: 'Designing Against the Worst Failure Mode',
          alternativeViewpoint: 'Imagine it is 6 months from now and you deeply regret taking the internship. What went wrong? The work turned out to be legacy glue scripts, the manager was too busy to mentor, your GPA dropped, and graduation was pushed back a full year.',
          reframingQuestion: 'What preventative guardrails can you establish today to make that failure scenario impossible?'
        },
        {
          id: 'lens3',
          lensName: 'Two-Way vs One-Way Door (Reversibility)',
          tagline: 'Understanding Commitment Lock-in',
          alternativeViewpoint: 'Dropping university classes mid-semester is often a one-way door with financial and grading penalties. Declining or renegotiating an internship is often a flexible dialogue with recruiters who want you back for new-grad roles.',
          reframingQuestion: 'If you start the internship and realize it is a poor fit after 4 weeks, what is your exact exit mechanism?'
        },
        {
          id: 'lens4',
          lensName: 'Future-Self Regret Minimization',
          tagline: 'Minimizing Long-term Counterfactual Pain',
          alternativeViewpoint: 'Will your 30-year-old self care more about earning $21k six months earlier, or about mastering your capstone, enjoying your final college semester, and entering a top-tier full-time role unencumbered?',
          reframingQuestion: 'Which memory or outcome will your future self look back on with greater pride and fewer "what ifs"?'
        }
      ],
      questions: [
        {
          id: 'q1',
          question: 'If this internship paid zero stipend but offered the exact same tasks and resume brand, would you still delay your college semester for it?',
          category: 'Incentive Isolation',
          reflectionPrompt: 'This isolates whether you are being swayed primarily by immediate cash versus core educational development.'
        },
        {
          id: 'q2',
          question: 'What specific technical skills or architectural systems will you touch that you cannot build yourself during a capstone project?',
          category: 'Skill Compounding',
          reflectionPrompt: 'Clarifies whether this represents unique institutional learning or standard task execution.'
        },
        {
          id: 'q3',
          question: 'Have you confirmed whether this company extends full-time return offers to interns, and what their conversion rate was last year?',
          category: 'Downstream Payoff',
          reflectionPrompt: 'Tests whether this is a direct bridge to post-grad employment or a one-off temporary contract.'
        },
        {
          id: 'q4',
          question: 'What is the absolute worst consequence if you push graduation back by 6 months, and what is the best possible upside?',
          category: 'Risk-Reward Asymmetry',
          reflectionPrompt: 'Forces explicit articulation of downside floor and upside ceiling.'
        },
        {
          id: 'q5',
          question: 'If you declined this offer today, what aggressive alternative steps would you take this semester to match that resume value?',
          category: 'Opportunity Generation',
          reflectionPrompt: 'Highlights that declining is not passive inaction—it can be an active choice to build something exceptional.'
        },
        {
          id: 'q6',
          question: 'How will you protect your physical health and sleep if work deadlines and academic assignment deadlines fall on the same Friday?',
          category: 'Execution Reality',
          reflectionPrompt: 'Pushes past theoretical optimism into practical energy management.'
        }
      ],
      reflectionSummary: 'Your decision balances immediate financial compensation, brand prestige, and convenience against academic sequencing, graduation linearity, and long-term opportunity cost. The primary hidden friction lies in assuming convenience equates to manageable workload, while overlooking the delayed full-time earning horizon.',
      reflectionClosingPrompt: 'You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate before confirming your path?',
      coverage: {
        overallScore: 88,
        label: 'High Multi-Dimensional Coverage',
        dimensions: [
          {
            dimension: 'Direct Financial Impact',
            score: 95,
            status: 'Thoroughly Explored',
            summary: 'Stipend and rent savings are explicitly stated and quantified.'
          },
          {
            dimension: 'Long-term Opportunity Cost',
            score: 60,
            status: 'Significant Gaps Identified',
            summary: 'The difference between intern compensation and delayed full-time career entry is underexplored.'
          },
          {
            dimension: 'Learning Quality & Mentorship',
            score: 68,
            status: 'Significant Gaps Identified',
            summary: 'Brand pedigree is established, but day-to-day engineering guidance remains unverified.'
          },
          {
            dimension: 'Academic & Reversibility Constraints',
            score: 74,
            status: 'Moderately Mapped',
            summary: 'Capstone requirements are noted, but department leave mechanics need formal validation.'
          },
          {
            dimension: 'Energy, Burnout & Schedule Friction',
            score: 70,
            status: 'Moderately Mapped',
            summary: 'Simultaneous 40h corporate work and college credits requires calendar stress-testing.'
          }
        ],
        disclaimer: 'This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable.'
      },
      decisionMap: [
        {
          id: 'dm1',
          stage: 'What You Know',
          title: 'Concrete Offer Facts',
          summary: '$3,500/mo stipend, 20-min commute, 6-month fintech engineering role, capstone requirement.',
          type: 'known',
          tags: ['Stated Facts', 'Finances', 'Location']
        },
        {
          id: 'dm2',
          stage: 'What You Are Assuming',
          title: 'Unverified Workload & Value Premises',
          summary: 'Assuming living at home prevents burnout and that brand name automatically equals high-quality learning.',
          type: 'assumption',
          tags: ['Cognitive Load', 'Mentorship']
        },
        {
          id: 'dm3',
          stage: 'What May Be Missing',
          title: 'Second-Order Trade-offs',
          summary: 'Delayed full-time entry salary math, capstone re-enrollment sequencing, return offer conversion rates.',
          type: 'blindspot',
          tags: ['Opportunity Cost', 'Academic Rules']
        },
        {
          id: 'dm4',
          stage: 'What To Investigate',
          title: 'Pre-Commitment Verification',
          summary: 'Meet with academic advisor, speak with former interns on the team, check part-time/summer flexibility.',
          type: 'investigation',
          tags: ['Action Steps', 'Dean Meeting']
        },
        {
          id: 'dm5',
          stage: 'Questions To Reflect On',
          title: 'Core Values & Trajectory',
          summary: 'Would you take this if stipend was zero? How does this serve your 5-year engineering compounding?',
          type: 'reflection',
          tags: ['Values', '5-Year Vision']
        }
      ]
    };
  }

  // 2. Check if it matches Example 2 (Relocation / London Job)
  if (dLower.includes('london') || dLower.includes('relocat') || dLower.includes('move to') || dLower.includes('city') || dLower.includes('tier-1') || dLower.includes('partner')) {
    return {
      id: 'analysis-' + Date.now(),
      timestamp,
      decisionTitle: input.decision,
      originalInput: input,
      isDemo: true,
      provider: 'Deterministic Reflection Engine (Demo Mode)',
      visiblePriorities: [
        {
          id: 'p1',
          title: 'Tier-1 Brand Prestige & Career Acceleration',
          description: 'Anchoring on a global brand name to unlock accelerated promotions and elite tech credibility.',
          category: 'Career Growth',
          impliedTradeoff: 'Trading established autonomy and remote flexibility for corporate hierarchy and physical presence.'
        },
        {
          id: 'p2',
          title: 'Nominal Compensation Increase (£130k vs €85k)',
          description: 'Targeting a substantial headline salary jump over current base pay.',
          category: 'Financial',
          impliedTradeoff: 'Focuses on gross salary without factoring London real estate, council tax, childcare, and dual-income disruption.'
        },
        {
          id: 'p3',
          title: 'Global Tech Hub Ecosystem Access',
          description: 'Immersing yourself in London tech meetups, investor circles, and talent density.',
          category: 'Network',
          impliedTradeoff: 'Assumes energy and time to network will remain abundant while navigating relocation friction.'
        }
      ],
      assumptions: [
        {
          id: 'a1',
          assumption: 'A 50%+ gross nominal salary increase in London will translate to higher real disposable savings.',
          whyItMatters: 'London rental inflation, 40-45% marginal tax brackets, transit costs, and loss of partner income can result in lower net monthly savings than an €85k remote salary in a low-cost region.',
          testingQuestion: 'What is the exact calculated net take-home pay after London rent (Zone 1-3), taxes, and utility bills compared to your current monthly surplus?',
          severity: 'Potentially important'
        },
        {
          id: 'a2',
          assumption: 'Partner relocation friction and career licensing delays will resolve smoothly without placing sustained strain on the relationship.',
          whyItMatters: 'Healthcare credential transfers between EU/overseas and the UK NHS can take 6-18 months. Having a partner unexpectedly unemployed or professionally isolated is a major contributor to failed international relocations.',
          testingQuestion: 'What is the realistic timeline and qualification requirement for your partner to practice in the UK, and how will single-earner dynamics feel during that period?',
          severity: 'Needs investigation'
        },
        {
          id: 'a3',
          assumption: 'Tier-1 brand employment is the only or fastest mechanism to achieve senior engineering mastery and market recognition.',
          whyItMatters: 'Many senior engineers find big tech roles slower and more political than high-growth scaleups. If ownership is low, career satisfaction can degrade.',
          testingQuestion: 'What specific engineering scope (e.g. system architecture, team leadership) will you own in the new team that you cannot negotiate in your current role?',
          severity: 'Worth questioning'
        }
      ],
      blindSpots: [
        {
          id: 'b1',
          category: 'Financial & Household Economics',
          factor: 'Dual-Income to Single-Income Transition Friction',
          distinction: 'User Stated',
          explanation: 'If your partner loses their salary for 12 months while credentialing, your combined household gross income may actually drop despite your higher individual salary.',
          diagnosticQuestion: 'Have you modeled your household cash flow under the assumption that your partner earns zero income for the first 12 months?',
          severity: 'Potentially important'
        },
        {
          id: 'b2',
          category: 'Social Capital & Support Systems',
          factor: 'Cost of Rebuilding Local Support Network',
          distinction: 'Reasonable Question',
          explanation: 'Leaving an established social circle requires high cognitive and emotional energy to rebuild community from scratch in a fast-paced metropolis.',
          diagnosticQuestion: 'How many close friends or family members currently reside within 1 hour of London, and what is your plan for community building?',
          severity: 'Worth questioning'
        },
        {
          id: 'b3',
          category: 'Reversibility & Repatriation Costs',
          factor: 'Exit Strategy if Company Undergoes Reorganization',
          distinction: 'Uncertain Possibility',
          explanation: 'International work visas tie legal residency to the employer. If team restructuring or layoffs occur in the first year, visa transfer windows are narrow and stressful.',
          diagnosticQuestion: 'What are the exact visa conditions (e.g. Skilled Worker 60-day grace period) if you decide to leave or if the company restructures?',
          severity: 'Needs investigation'
        }
      ],
      conflicts: [
        {
          id: 'c1',
          sideA: 'Desire to maximize personal career ambition and global pedigree',
          sideB: 'Desire to maintain shared partnership stability and equitable career growth for partner',
          tensionAnalysis: 'Relocating to London accelerates one career while placing an immediate barrier in front of the partner healthcare career.',
          neutralObservation: 'This represents an interdependent life transition where individual career optimization interacts with shared relationship resilience.'
        }
      ],
      missingInformation: [
        {
          id: 'm1',
          missingDataPoint: 'Net Household Cash Flow Simulation (UK Tax & Rent Calculator)',
          whyCrucial: 'To prevent financial shock from high London tenancy deposits, council tax bands, and NHS surcharges.',
          howToAcquire: 'Run detailed numbers on UK tax calculators (including 40% band and national insurance) and check actual Rightmove listings for 2-bed flats.'
        },
        {
          id: 'm2',
          missingDataPoint: 'UK Professional Regulatory Body (GMC/NMC/HCPC) Licensing Roadmap',
          whyCrucial: 'Knowing the exact exam, documentation, and fee requirements for partner licensing.',
          howToAcquire: 'Consult the official UK regulator website or contact an overseas healthcare credentialing specialist.'
        }
      ],
      perspectives: [
        {
          id: 'lens1',
          lensName: 'Reversible vs Irreversible Doors',
          tagline: 'Assessing Exit Agility',
          alternativeViewpoint: 'Moving to London for 2 years is largely a two-way door: you can return home with a Tier-1 brand on your CV. However, relationship strain or giving up an irreplaceable rental agreement at home can be a one-way door.',
          reframingQuestion: 'What parts of this move are easy to undo, and what parts are permanent commitments?'
        },
        {
          id: 'lens2',
          lensName: '10/10/10 Rule',
          tagline: 'Temporal Distance',
          alternativeViewpoint: '10 Weeks: High stress with flats and packing. 10 Months: Excitement of London life or frustration with partner credential delays. 10 Years: A foundational chapter of international adventure and brand credibility.',
          reframingQuestion: 'Will you regret the friction of moving more, or the lingering question of "what could have been" if you stayed?'
        }
      ],
      questions: [
        {
          id: 'q1',
          question: 'If this company permitted you to work remotely from your current city at €100k, would you still want to physically move to London?',
          category: 'Location vs Compensation Isolation',
          reflectionPrompt: 'Separates the appeal of the brand/salary from the reality of living in London.'
        },
        {
          id: 'q2',
          question: 'How aligned and enthusiastic is your partner about living in the UK, separate from your career excitement?',
          category: 'Shared Alignment',
          reflectionPrompt: 'Assesses whether both partners are actively choosing the adventure or if one is making a reluctant sacrifice.'
        },
        {
          id: 'q3',
          question: 'What is the minimum duration you would commit to staying in London for the relocation investment to feel fully worthwhile?',
          category: 'Time Horizon',
          reflectionPrompt: 'Sets realistic expectations for career ROI milestones.'
        }
      ],
      reflectionSummary: 'Your decision involves balancing Tier-1 career prestige, compensation upside, and global tech immersion against household economics, partner licensing friction, and relocating away from an established social foundation.',
      reflectionClosingPrompt: 'You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate before making your commitment?',
      coverage: {
        overallScore: 86,
        label: 'Comprehensive Life & Career Coverage',
        dimensions: [
          {
            dimension: 'Career Brand & Upside',
            score: 95,
            status: 'Thoroughly Explored',
            summary: 'Tier-1 brand value and network acceleration are clearly articulated.'
          },
          {
            dimension: 'Real Net Household Economics',
            score: 65,
            status: 'Significant Gaps Identified',
            summary: 'Gross vs net disposable income and single-earner transition needs math validation.'
          },
          {
            dimension: 'Interpersonal & Partner Equity',
            score: 60,
            status: 'Significant Gaps Identified',
            summary: 'Partner professional credentialing timeline and emotional impact are critical unknowns.'
          },
          {
            dimension: 'Reversibility & Visa Security',
            score: 75,
            status: 'Moderately Mapped',
            summary: 'Exit paths and visa transfer dynamics need clear pre-planning.'
          }
        ],
        disclaimer: 'This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable.'
      },
      decisionMap: [
        {
          id: 'dm1',
          stage: 'What You Know',
          title: 'Offer & Relocation Parameters',
          summary: '£130k base in London vs €85k remote, Tier-1 company, 30-day decision deadline.',
          type: 'known',
          tags: ['Offer Terms', 'Brand']
        },
        {
          id: 'dm2',
          stage: 'What You Are Assuming',
          title: 'Financial & Adaptation Assumptions',
          summary: 'Assuming higher gross salary guarantees higher net savings and that partner licensing will be swift.',
          type: 'assumption',
          tags: ['Taxes', 'Rent', 'Partner Career']
        },
        {
          id: 'dm3',
          stage: 'What May Be Missing',
          title: 'Unstated Frictions',
          summary: 'Single-earner cash flow during NHS transfer, visa dependency, loss of local support network.',
          type: 'blindspot',
          tags: ['Household Risk', 'Visa']
        },
        {
          id: 'dm4',
          stage: 'What To Investigate',
          title: 'Pre-Signing Due Diligence',
          summary: 'UK healthcare regulator transfer timeline, realistic London flat lease costs, 6-month trial negotiation.',
          type: 'investigation',
          tags: ['Actionable', 'Partner Research']
        },
        {
          id: 'dm5',
          stage: 'Questions To Reflect On',
          title: 'Values & Relationship Grounding',
          summary: 'Would you move if remote was an option? How will you support partner during transition?',
          type: 'reflection',
          tags: ['Partnership', 'Core Motivation']
        }
      ]
    };
  }

  // 3. Check if it matches Example 3 (Startup MVP Launch vs Polish)
  if (dLower.includes('launch') || dLower.includes('saas') || dLower.includes('product') || dLower.includes('mvp') || dLower.includes('feature') || dLower.includes('startup') || dLower.includes('founder')) {
    return {
      id: 'analysis-' + Date.now(),
      timestamp,
      decisionTitle: input.decision,
      originalInput: input,
      isDemo: true,
      provider: 'Deterministic Reflection Engine (Demo Mode)',
      visiblePriorities: [
        {
          id: 'p1',
          title: 'Brand Reputation & First-Impression Polish',
          description: 'Protecting market perception by ensuring initial public visitors encounter a mature, multi-featured tool.',
          category: 'Reputation',
          impliedTradeoff: 'Delaying real-world price elasticity tests and burning runway in isolation.'
        },
        {
          id: 'p2',
          title: 'Conversion Rate Optimization from Launch Traffic',
          description: 'Maximizing the signup yield from one-time launch spikes (Product Hunt / Hacker News).',
          category: 'Acquisition',
          impliedTradeoff: 'Assumes launch traffic is scarce and irrecoverable, rather than treating launch as an ongoing continuous process.'
        },
        {
          id: 'p3',
          title: 'Runway Preservation vs Feature Scope',
          description: 'Managing 7 months of personal savings against feature development time.',
          category: 'Runway',
          impliedTradeoff: 'Spending 40% of remaining runway (3 of 7 months) before receiving first paying dollar.'
        }
      ],
      assumptions: [
        {
          id: 'a1',
          assumption: 'The 5 non-paying beta users who requested Jira/Slack integrations will immediately convert to paying customers once those features are built.',
          whyItMatters: 'Feature requests from non-paying users are notoriously misleading. Users often cite missing integrations as a polite excuse for not having an urgent problem.',
          testingQuestion: 'Have you asked those 5 users for a pre-order, signed letter of intent, or refundable deposit conditioned on the integration release?',
          severity: 'Potentially important'
        },
        {
          id: 'a2',
          assumption: 'A public product launch is a single, high-stakes event that cannot be repeated if the initial MVP is unpolished.',
          whyItMatters: 'Products can be launched multiple times across distinct communities, niches, and iterations. Nobody remembers an unpolished version 1 of iconic software (e.g. early Stripe, Figma, Notion).',
          testingQuestion: 'What prevents you from launching to a specific niche community today and doing a broader launch in 3 months?',
          severity: 'Worth questioning'
        },
        {
          id: 'a3',
          assumption: 'Spending 3 months building 4 integrations will not be made obsolete by fast-moving competitors or API platform changes.',
          whyItMatters: 'In AI workflow tooling, third-party APIs and competitor capabilities shift in weeks. Building without live paid users risks building the wrong connectors.',
          testingQuestion: 'How confident are you that the integrations you plan to build are the exact ones that will drive repeat retention?',
          severity: 'Needs investigation'
        }
      ],
      blindSpots: [
        {
          id: 'b1',
          category: 'Runway & Survival Math',
          factor: 'Runway Depletion Percentage',
          distinction: 'User Stated',
          explanation: 'Spending 3 months of a 7-month runway on unvalidated feature development consumes ~43% of your entire survival buffer without proving monetization.',
          diagnosticQuestion: 'If you delay 3 months and the launch still fails to convert, will you have enough runway left to pivot?',
          severity: 'Potentially important'
        },
        {
          id: 'b2',
          category: 'Monetization Validation',
          factor: 'Validating Willingness-to-Pay on the Core Feature',
          distinction: 'Reasonable Question',
          explanation: '3 users stated they would pay $49/mo right now. Collecting money from 3 users immediately validates that the core value proposition works without extra integrations.',
          diagnosticQuestion: 'Why not charge the 3 ready users today to confirm revenue velocity and fund subsequent integration development?',
          severity: 'Needs investigation'
        },
        {
          id: 'b3',
          category: 'Opportunity Cost & Speed',
          factor: 'Competitor Velocity & Market Timing',
          distinction: 'Uncertain Possibility',
          explanation: 'While you spend 3 months coding in private, competitors are onboarding users, gathering error telemetry, and locking in search rankings.',
          diagnosticQuestion: 'What is the risk that a competitor captures your early adopters while you polish secondary integrations?',
          severity: 'Worth questioning'
        }
      ],
      conflicts: [
        {
          id: 'c1',
          sideA: 'Desire to present a flawless, high-credibility product to avoid early user churn',
          sideB: 'Urgency to protect limited runway (7 months) and validate paid market demand rapidly',
          tensionAnalysis: 'Perfecting features consumes the very runway needed to survive post-launch iterations.',
          neutralObservation: 'This represents the classic tension between craft perfectionism and iterative market discovery.'
        }
      ],
      missingInformation: [
        {
          id: 'm1',
          missingDataPoint: 'Confirmed Credit Card Swipes from the 3 Eager Beta Testers',
          whyCrucial: 'To prove that the existing single-integration tool solves a real, painful, monetizable problem.',
          howToAcquire: 'Send a Stripe checkout link or invoice today offering a lifetime discounted rate ($39/mo) to those 3 users.'
        },
        {
          id: 'm2',
          missingDataPoint: 'True Bottleneck of the 5 Non-Paying Testers',
          whyCrucial: 'Determine if Jira/Slack is truly their sole blocker or if the tool simply does not address their core workflow.',
          howToAcquire: 'Conduct a 15-minute screen-share onboarding session with 2 of them to watch them use the current integration.'
        }
      ],
      perspectives: [
        {
          id: 'lens1',
          lensName: 'Inversion (Pre-Mortem)',
          tagline: 'Diagnosing the Flawed Build',
          alternativeViewpoint: 'Imagine it is 3 months later. You built all 4 integrations, burned $9,000 of savings, launched on Product Hunt, and still nobody converted. The real issue was onboarding clarity, not missing integrations.',
          reframingQuestion: 'How can you test onboarding clarity and user friction before spending 3 months on code?'
        },
        {
          id: 'lens2',
          lensName: 'Reid Hoffman Razor (Embarrassment Test)',
          tagline: 'Speed of Feedback',
          alternativeViewpoint: 'If you are not embarrassed by the first version of your product, you launched too late. Early adopters care about solving their urgent pain, not about cosmetic perfection.',
          reframingQuestion: 'Who is the desperate customer who will forgive your lack of integrations because they need the core output immediately?'
        }
      ],
      questions: [
        {
          id: 'q1',
          question: 'What is the absolute smallest thing you could build or change to get your first $100 in Stripe revenue this week?',
          category: 'Minimum Viable Monetization',
          reflectionPrompt: 'Focuses energy strictly on revenue-generating signals rather than feature proliferation.'
        },
        {
          id: 'q2',
          question: 'Are you delaying launch because users truly cannot extract value, or because launching exposes your work to public judgment?',
          category: 'Psychological Friction',
          reflectionPrompt: 'Gently tests for fear of rejection disguised as feature perfection.'
        },
        {
          id: 'q3',
          question: 'Could you offer manual concierge onboarding for the missing integrations for the first 10 customers instead of coding automated pipelines?',
          category: 'Do Things That Don\'t Scale',
          reflectionPrompt: 'Explores operational workarounds that save 3 months of engineering.'
        }
      ],
      reflectionSummary: 'Your decision pits the desire for brand credibility and feature completeness against runway preservation and rapid revenue validation. The critical risk is spending nearly half your remaining financial lifeline on unverified feature requests from non-paying users.',
      reflectionClosingPrompt: 'You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate before committing your next 3 months?',
      coverage: {
        overallScore: 90,
        label: 'High Strategic & Financial Coverage',
        dimensions: [
          {
            dimension: 'Runway & Survival Math',
            score: 95,
            status: 'Thoroughly Explored',
            summary: 'The 7-month runway and monthly burn are explicitly bounded.'
          },
          {
            dimension: 'Customer Demand Validation',
            score: 62,
            status: 'Significant Gaps Identified',
            summary: 'Distinction between polite user feedback and real willingness-to-pay needs empirical proof.'
          },
          {
            dimension: 'Speed to Market & Competitive Risk',
            score: 70,
            status: 'Moderately Mapped',
            summary: 'Opportunity cost of 3 months in isolation vs live iteration needs evaluation.'
          },
          {
            dimension: 'Reversibility of Decision',
            score: 85,
            status: 'Thoroughly Explored',
            summary: 'Staged private beta releases offer high flexibility compared to all-or-nothing delays.'
          }
        ],
        disclaimer: 'This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable.'
      },
      decisionMap: [
        {
          id: 'dm1',
          stage: 'What You Know',
          title: 'Current Baseline Metrics',
          summary: '8 beta users, 3 willing to pay $49/mo, 5 requesting integrations, 7 months runway.',
          type: 'known',
          tags: ['Runway', 'Beta Users']
        },
        {
          id: 'dm2',
          stage: 'What You Are Assuming',
          title: 'Conversion & Launch Assumptions',
          summary: 'Assuming feature completeness guarantees conversion and that public launch is a one-time unrepeatable shot.',
          type: 'assumption',
          tags: ['Perfectionism', 'Launch Fear']
        },
        {
          id: 'dm3',
          stage: 'What May Be Missing',
          title: 'Strategic Blind Spots',
          summary: 'Burning 43% of runway before first dollar, concierging integrations manually, live feedback velocity.',
          type: 'blindspot',
          tags: ['Runway Math', 'Concierge MVP']
        },
        {
          id: 'dm4',
          stage: 'What To Investigate',
          title: 'Immediate Validation Actions',
          summary: 'Charge the 3 eager beta users today, test willingness-to-pay with pre-orders for Jira/Slack.',
          type: 'investigation',
          tags: ['Charge Users', 'Stripe Link']
        },
        {
          id: 'dm5',
          stage: 'Questions To Reflect On',
          title: 'Founder Values & Courage',
          summary: 'What is the fastest path to first revenue? Is perfection hiding fear of public launch?',
          type: 'reflection',
          tags: ['Founder Mindset', 'Focus']
        }
      ]
    };
  }

  // 4. Generic dynamic heuristic generator for ANY custom user input
  const decisionPreview = input.decision.length > 60 ? input.decision.slice(0, 57) + '...' : input.decision;
  const statedPriorities = input.priorities || 'Achieving the best immediate outcome with manageable trade-offs';
  const statedConstraints = input.constraints || 'Time, energy, and commitment limits';
  const statedLeaning = input.leaning || 'Leaning toward the current leading option';

  return {
    id: 'analysis-' + Date.now(),
    timestamp,
    decisionTitle: input.decision,
    originalInput: input,
    isDemo: true,
    provider: 'Deterministic Reflection Engine (Demo Mode)',
    visiblePriorities: [
      {
        id: 'p1',
        title: 'Immediate Primary Objective',
        description: `Maximizing results around: "${statedPriorities.slice(0, 100)}".`,
        category: 'Core Objective',
        impliedTradeoff: 'May prioritize foreground benefits over second-order consequences.'
      },
      {
        id: 'p2',
        title: 'Constraint Management & Friction Minimization',
        description: `Operating within stated boundaries: "${statedConstraints.slice(0, 100)}".`,
        category: 'Constraints',
        impliedTradeoff: 'May treat some flexible constraints as absolute blockers.'
      },
      {
        id: 'p3',
        title: 'Intuitive Preference Alignment',
        description: `Navigating toward: "${statedLeaning.slice(0, 100)}".`,
        category: 'Orientation',
        impliedTradeoff: 'May seek confirmatory evidence for the preferred path while filtering out contrary signals.'
      }
    ],
    assumptions: [
      {
        id: 'a1',
        assumption: 'The current conditions, support systems, and energy levels you experience today will remain constant throughout the execution of this decision.',
        whyItMatters: 'Decisions made during calm periods often underestimate friction, fatigue, or unexpected disruptions during high-pressure phases.',
        testingQuestion: 'What does execution look like when your available energy and time are cut by 30% for two consecutive weeks?',
        severity: 'Needs investigation'
      },
      {
        id: 'a2',
        assumption: 'The benefits of the favored option will materialize on the expected timeline without substantial hidden dependencies.',
        whyItMatters: 'Unstated prerequisites (e.g. approvals, onboarding curves, coordination delays) often push expected payoffs further into the future.',
        testingQuestion: 'What specific external dependency must go right for this decision to deliver its intended payoff on time?',
        severity: 'Potentially important'
      },
      {
        id: 'a3',
        assumption: 'Choosing this path leaves your future optionality and pivot agility relatively intact.',
        whyItMatters: 'Some decisions carry irreversible switching costs (reputational, financial, relational) that limit future flexibility.',
        testingQuestion: 'If this choice produces disappointing results after 90 days, how difficult and costly is it to unwind?',
        severity: 'Worth questioning'
      }
    ],
    blindSpots: [
      {
        id: 'b1',
        category: 'Opportunity Cost',
        factor: 'The Invisible "What Else Could You Do" Calculus',
        distinction: 'Reasonable Question',
        explanation: 'Focusing intensely on this single decision can blind you to alternative high-leverage opportunities that require identical time and cognitive focus.',
        diagnosticQuestion: 'If you were forbidden from choosing your current favorite option, what creative alternative would you pursue instead?',
        severity: 'Potentially important'
      },
      {
        id: 'b2',
        category: 'Reversibility & Downside Risk',
        factor: 'Asymmetry Between Downside Floor and Upside Ceiling',
        distinction: 'Uncertain Possibility',
        explanation: 'Often the potential upside is bounded (e.g. moderate gain), while the downside floor carries compounding friction if unexpected risks materialize.',
        diagnosticQuestion: 'Is the worst-case scenario survivable, reversible, and clearly bounded, or does it trigger compounding stress?',
        severity: 'Needs investigation'
      },
      {
        id: 'b3',
        category: 'Emotional & Social Ripple Effects',
        factor: 'Impact on Key Relationships & Support Bandwidth',
        distinction: 'Reasonable Question',
        explanation: 'Major decisions rarely affect only the decision-maker; they subtly alter expectations, communication cadence, and relationship dynamics.',
        diagnosticQuestion: 'Who among your close colleagues, family, or collaborators will feel the secondary effects of this choice most directly?',
        severity: 'Worth questioning'
      }
    ],
    conflicts: [
      {
        id: 'c1',
        sideA: 'Desire for rapid progress and decisive resolution',
        sideB: 'Need for thorough diligence and risk mitigation before commitment',
        tensionAnalysis: 'Moving fast reduces mental anxiety about being in limbo, but increases exposure to unexamined blind spots.',
        neutralObservation: 'Recognize the difference between productive speed and the psychological urge to simply "get it over with."'
      }
    ],
    missingInformation: [
      {
        id: 'm1',
        missingDataPoint: 'Empirical Precedent or Objective Outside Perspective',
        whyCrucial: 'To counter base-rate neglect and avoid assuming your situation is completely unique.',
        howToAcquire: 'Reach out to 1-2 people who faced a comparable decision 1-3 years ago and ask what they wish they had known.'
      },
      {
        id: 'm2',
        missingDataPoint: 'Clear Pre-commitment Decision Trigger Criteria',
        whyCrucial: 'Having explicit criteria for success or pivot prevents rationalizing poor results later.',
        howToAcquire: 'Write down 3 concrete signals that would tell you this path is succeeding or failing after 60 days.'
      }
    ],
    perspectives: [
      {
        id: 'lens1',
        lensName: '10/10/10 Rule',
        tagline: 'Temporal Distance & Regret Calibration',
        alternativeViewpoint: 'How will you view this decision in 10 minutes (immediate relief/fear), 10 months (practical reality of execution), and 10 years (long-term trajectory impact)?',
        reframingQuestion: 'Which time horizon is dominating your current emotional state?'
      },
      {
        id: 'lens2',
        lensName: 'Inversion (Pre-Mortem Analysis)',
        tagline: 'Diagnosing Failure Before It Occurs',
        alternativeViewpoint: 'Assume it is 12 months in the future and this decision turned out to be an exhausting mistake. Write down the top 3 specific reasons why it failed.',
        reframingQuestion: 'What steps can you take right now to inoculate against those 3 failure points?'
      },
      {
        id: 'lens3',
        lensName: 'Reversible vs Irreversible Door',
        tagline: 'Speed vs Deliberation Matching',
        alternativeViewpoint: 'If this is a two-way door, optimize for speed of experimentation and fast learning. If it is a one-way door, slow down and conduct exhaustive diligence.',
        reframingQuestion: 'Is this decision truly a one-way door, or are you treating a reversible choice with excessive hesitation?'
      }
    ],
    questions: [
      {
        id: 'q1',
        question: 'What is the most uncomfortable truth or trade-off about your preferred option that you are currently minimizing?',
        category: 'Intellectual Honesty',
        reflectionPrompt: 'Uncovers subconscious rationalization and brings suppressed doubts to light.'
      },
      {
        id: 'q2',
        question: 'If a close, trusted friend came to you with this exact dilemma and context, what perceptive question would you ask them?',
        category: 'Outside-View Distance',
        reflectionPrompt: 'Leverages the outside-view bias to strip away personal emotional attachment.'
      },
      {
        id: 'q3',
        question: 'What would need to happen in the next 14 days for you to comfortably and decisively change your mind?',
        category: 'Falsifiability Criteria',
        reflectionPrompt: 'Establishes what evidence could actually alter your current trajectory.'
      },
      {
        id: 'q4',
        question: 'What is the cost of doing nothing or delaying this decision by another 30 days?',
        category: 'Status Quo Evaluation',
        reflectionPrompt: 'Tests whether staying the course is an active choice or passive default.'
      },
      {
        id: 'q5',
        question: 'Are you choosing this option to run toward an inspiring goal, or to run away from an uncomfortable friction point?',
        category: 'Motivation Polarity',
        reflectionPrompt: 'Clarifies whether your motivation is generative (growth) or evasive (avoidance).'
      }
    ],
    reflectionSummary: `Your decision regarding "${decisionPreview}" highlights stated priorities around immediate progress, balanced against constraints on bandwidth and execution risk. The key to clarity is stress-testing unstated assumptions regarding workload constancy, reversibility, and alternative opportunity costs.`,
    reflectionClosingPrompt: 'You now have a wider picture of the decision. Which of these assumptions or missing factors would you most want to investigate before moving forward?',
    coverage: {
      overallScore: 82,
      label: 'Broad Exploratory Coverage',
      dimensions: [
        {
          dimension: 'Stated Objectives & Priorities',
          score: 90,
          status: 'Thoroughly Explored',
          summary: 'Primary motivations and goals have been structured clearly.'
        },
        {
          dimension: 'Hidden Assumptions & Dependencies',
          score: 65,
          status: 'Significant Gaps Identified',
          summary: 'Underlying premises regarding bandwidth and execution stability need verification.'
        },
        {
          dimension: 'Opportunity Cost & Alternative Lenses',
          score: 70,
          status: 'Moderately Mapped',
          summary: 'Examining non-obvious alternatives will strengthen conviction.'
        },
        {
          dimension: 'Reversibility & Downside Containment',
          score: 75,
          status: 'Moderately Mapped',
          summary: 'Understanding exit mechanisms and pivot costs is recommended.'
        }
      ],
      disclaimer: 'This Reasoning Coverage index reflects analytical breadth across standard decision dimensions, not an assessment of whether your decision is favorable or unfavorable.'
    },
    decisionMap: [
      {
        id: 'dm1',
        stage: 'What You Know',
        title: 'Stated Decision Parameters',
        summary: input.decision,
        type: 'known',
        tags: ['Stated Input', 'Baseline']
      },
      {
        id: 'dm2',
        stage: 'What You Are Assuming',
        title: 'Execution & Payoff Hypotheses',
        summary: 'Assuming bandwidth stays constant and anticipated upside arrives on schedule.',
        type: 'assumption',
        tags: ['Assumptions', 'Energy']
      },
      {
        id: 'dm3',
        stage: 'What May Be Missing',
        title: 'Overlooked Dimensions',
        summary: 'Opportunity costs, second-order relationship impact, and pivot agility.',
        type: 'blindspot',
        tags: ['Blind Spots', '2nd-Order']
      },
      {
        id: 'dm4',
        stage: 'What To Investigate',
        title: 'Pre-Commitment Diligence',
        summary: 'Seek outside precedent, verify critical dependencies, define 60-day review metrics.',
        type: 'investigation',
        tags: ['Diligence', 'Precedents']
      },
      {
        id: 'dm5',
        stage: 'Questions To Reflect On',
        title: 'Values & Honest Reflection',
        summary: 'What uncomfortable trade-off are you minimizing? What would you advise a friend?',
        type: 'reflection',
        tags: ['Values', 'Self-Honesty']
      }
    ]
  };
}

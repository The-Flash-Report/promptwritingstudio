export const AI_WORKFORCE_META = {
  lastUpdated: '2026-05-25',
  sourceNote: 'Impact estimates drawn from published ranges: McKinsey Global Institute (2023-2025), OECD Employment Outlook (2023), Goldman Sachs Global Economics (2023). Ranges cited, not point estimates.',
}

export const AI_WORKFORCE_MODULES = [
  {
    slug: 'ai-capability-boundaries',
    title: 'What AI Can and Cannot Do',
    shortTitle: 'Capability Boundaries',
    description: 'A plain-language map of where current AI systems perform reliably, where they struggle, and why those lines move over time.',
    lastUpdated: '2026-05-25',
    readingTime: '12 min',
    content: [
      {
        type: 'lead',
        text: 'Published ranges from major labour research suggest that between 25% and 40% of current work tasks could be automated using AI at present capability levels (McKinsey, 2023; Goldman Sachs, 2023). That range matters more than the headline: the difference between the low and high end is a different plan of action for your career. This module explains what drives the uncertainty, where the lines actually sit today, and how to read capability claims usefully without panic or hype.',
      },
      {
        type: 'h2',
        text: 'Reading the headline numbers honestly',
      },
      {
        type: 'p',
        text: 'When you see "40% of jobs will be impacted by AI" in a headline, it is almost certainly a translation of a more careful underlying claim. McKinsey Global Institute estimated in 2023 that generative AI could automate work activities that absorb 60-70% of employee time -- but the same report distinguished between automating tasks and replacing jobs. Goldman Sachs separately estimated that 18% of global work could be automated by AI, with major variation by occupation and country. Stanford HAI tracks year-on-year shifts in what AI systems can actually do on benchmarks; the 2024 AI Index Report noted that AI surpassed humans on several reading and image classification benchmarks while still trailing badly on planning and multi-step reasoning.',
      },
      {
        type: 'p',
        text: 'None of these is a prediction that a specific role disappears. They are estimates of task-level exposure aggregated upward. Your job is a bundle of tasks, and the exposure of each task is what matters for your planning.',
      },
      {
        type: 'h2',
        text: 'Where AI performs reliably today',
      },
      {
        type: 'p',
        text: 'Current AI systems -- large language models, vision models, speech-to-text -- are reliable for a specific class of task: pattern completion across language, image, and structured data. In practice this covers summarising documents, drafting structured text from a brief, classifying inputs into predefined categories, extracting structured data from unstructured text, translating between languages, transcribing audio, and generating code from a specification.',
      },
      {
        type: 'p',
        text: 'The common thread across reliable tasks is two-fold: there is a large body of prior examples the model can learn from, and the output can be verified by a human quickly. When both conditions hold, AI performance is high and the cost of any individual error is small because the human catches it in the verification step.',
      },
      {
        type: 'example',
        label: 'Worked example: financial analyst',
        text: 'A financial analyst receives 80 earnings call transcripts per quarter and needs key metrics from each. Extracting numbers and categorising management commentary into bullish/bearish/neutral signals is pattern completion. An AI tool cuts that from 3 hours to 20 minutes, and the analyst spot-checks 8 outputs against the source transcript. The freed time goes to the judgment layer: what do these metrics mean for the portfolio, what to flag to the PM, which calls deserve a deeper second read.',
      },
      {
        type: 'example',
        label: 'Worked example: HR coordinator',
        text: 'An HR coordinator screens 200 applications per role. Extracting structured fields (years of experience, named tools, location, education) into a comparable table is pattern completion. Whether a candidate would be a good cultural fit, whether the cover letter shows real interest, whether the gap year explanation is credible -- those are judgment calls. The augmented coordinator uses AI for the table and keeps every judgment call human, both for accuracy and because using AI for hiring decisions in the EU now sits under the EU AI Act as high-risk and demands a human-in-the-loop.',
      },
      {
        type: 'h2',
        text: 'Where AI struggles',
      },
      {
        type: 'p',
        text: 'AI systems fail in predictable ways. They struggle with tasks that require maintaining a coherent plan over many steps without explicit tracking, genuine novelty (problems outside their training distribution), sensorimotor work that requires physical feedback, ethical judgment in unfamiliar situations, real-time information not present in training data, and interpersonal dynamics -- reading a room, negotiating under pressure, building long-term trust through repeated small interactions.',
      },
      {
        type: 'p',
        text: 'These are not temporary gaps that close next quarter. Some reflect hard constraints in current architectures (the model has no body, no continuous memory, no stake in your meeting). Others may close, but on a multi-year timeline. The right move is to plan around the capabilities that exist now and the failure modes that will still exist 18 months from now, not around the forecasts.',
      },
      {
        type: 'example',
        label: 'Worked example: sales account recovery',
        text: 'A sales manager asks an AI tool to generate a strategy for recovering a key account after a service failure. The tool produces a plausible-looking plan with bullet points about "active listening" and "transparent communication". It does not know the client contact\'s personality, the political dynamics inside the client organisation, the informal history of the relationship, or what the client actually said in the last call. The plan sounds reasonable and is missing the most important context. The manager has to supply all of that and substantially rewrite the output. The plan is faster than starting from a blank page, and useless as a final artefact.',
      },
      {
        type: 'example',
        label: 'Worked example: cross-functional project planning',
        text: 'A project manager asks an AI tool to plan a six-month product launch involving marketing, engineering, legal, and three external vendors. The model produces a sensible-looking Gantt chart. But it cannot know that engineering is already over capacity, that legal has a backlog on a different launch, that the agency relationship is strained, or that the CFO has signalled a budget review in month three. Project planning at this level is a coordination problem under real organisational constraints, not a template task. The model can produce a useful first draft of the visible schedule, and a junior PM with a phone could produce the same. The senior PM\'s actual value is the constraint-juggling underneath.',
      },
      {
        type: 'h2',
        text: 'Why capability boundaries move -- and what to watch',
      },
      {
        type: 'p',
        text: 'AI capability is not static. Model releases between 2023 and 2025 expanded reliable performance on coding, multimodal tasks, and long-document reasoning. But progress is uneven. Some tasks that looked close to automation (complex legal analysis, medical diagnosis, contract negotiation) remain heavily human-dependent because error cost is high and edge cases are structurally important. Others jumped faster than most forecasts expected, particularly anything involving code, translation, and structured extraction.',
      },
      {
        type: 'p',
        text: 'The most useful signal to watch is not "AI is getting smarter" in general but specific task-level claims from published evaluations: the system cards published with each model release from Anthropic, OpenAI, and Google; the Stanford HAI AI Index Report (annual); and OECD occupation-level analysis. These cite what changed, with evidence and benchmarks. Industry forecasts without specific task grounding -- "30% of work will be automated by 2030" without saying which tasks -- are less useful for planning your week, your year, or your next role.',
      },
      {
        type: 'p',
        text: 'A reliable filter: when a capability claim is made, ask "on what specific evaluation, scored how, against what baseline?" If the answer is "it impressed people in a demo", treat it as a leading indicator and nothing more. If the answer is "GPQA Diamond, scored 84%, human PhD baseline is 65%", you can plan around it.',
      },
      {
        type: 'h2',
        text: 'How to use this in your role',
      },
      {
        type: 'p',
        text: 'The practical question is not "will AI replace my job" but "which of my tasks fit the pattern-completion profile, and which require judgment, novelty, or interpersonal context?" The next module walks through a structured way to answer that for your specific role. Before you get there, the practice block below will get you started on a working map of your own week.',
      },
      {
        type: 'action',
        label: 'What to do this week',
        text: [
          'For three working days, keep a simple log of every distinct task you do (10 minutes per task or longer). Aim for 15-25 unique task types by end of the third day.',
          'Against each task, write a one-word verdict: "pattern" (well-defined inputs and outputs), "judgment" (you weigh options), or "interpersonal" (a specific person\'s context matters).',
          'Bookmark the Stanford HAI AI Index Report and the OECD Employment Outlook. Both are free and tracked annually -- they are your honest signal for capability changes.',
          'Do not act on the log yet. Module 2 turns it into a role audit.',
        ],
      },
      {
        type: 'links',
        label: 'Next in this track',
        items: [
          { text: 'Audit Your Role: Task-Level AI Exposure', url: '/ai-workforce/audit-your-role', note: 'turn your task log into a structured role audit' },
          { text: 'AI-Augmented Versions of Common Roles', url: '/ai-workforce/augmented-roles', note: 'see what your role looks like after the augmentation' },
          { text: 'AI tools in Ireland', url: 'https://vendors.ie/ai-tools-ireland', note: 'practical tool comparisons for working professionals' },
        ],
      },
      {
        type: 'sources',
        items: [
          { text: 'McKinsey Global Institute: The economic potential of generative AI (2023)', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier' },
          { text: 'Goldman Sachs Global Economics: The Potentially Large Effects of Artificial Intelligence on Economic Growth (2023)', url: 'https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent' },
          { text: 'Stanford HAI: AI Index Report 2024', url: 'https://aiindex.stanford.edu/report/' },
          { text: 'OECD Employment Outlook 2023: AI and the labour market', url: 'https://www.oecd.org/employment-outlook/' },
          { text: 'Anthropic model cards (system cards published with each release)', url: 'https://www.anthropic.com/news' },
          { text: 'EU AI Act overview (relevant to high-risk task categories such as hiring)', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
        ],
      },
    ],
    next: 'audit-your-role',
    prev: null,
  },

  {
    slug: 'audit-your-role',
    title: 'Audit Your Role: Task-Level AI Exposure',
    shortTitle: 'Role Audit',
    description: 'A structured method for mapping your daily tasks against AI capability -- so you can see what is genuinely at risk and where your value compounds.',
    lastUpdated: '2026-05-25',
    readingTime: '13 min',
    content: [
      {
        type: 'lead',
        text: 'Job-level automation risk figures are less useful than task-level analysis. The same job title can have very different exposure depending on which tasks dominate your week. A senior marketer running brand strategy has a different exposure profile to a coordinator producing campaign assets, even though both sit under "marketing". This module walks through a four-step method for doing that analysis on your own role, with two long worked examples that show how to apply it.',
      },
      {
        type: 'h2',
        text: 'Why task-level matters more than job-level',
      },
      {
        type: 'p',
        text: 'The OECD Employment Outlook 2023 chapter on AI and the labour market found that aggregate occupation-level risk scores hide enormous within-occupation variation. The OECD specifically warned that pre-LLM exposure indexes underestimate the exposure of cognitive and white-collar tasks, and overestimate exposure for manual work that requires physical adaptation. The practical implication: the index that says your job is "low exposure" may be wrong about your specific week, and vice versa. The only honest answer comes from auditing your own tasks.',
      },
      {
        type: 'h2',
        text: 'Step 1: List your actual tasks (not your job description)',
      },
      {
        type: 'p',
        text: 'Most job descriptions describe outcomes, not tasks. Start with a log of what you actually do in a typical week. Aim for 15-25 discrete task types. "Prepare monthly report" is too coarse -- break it into "pull data from system", "format into tables", "write narrative commentary", "answer follow-up questions from the FD", "present to stakeholders". Each of those has a different AI exposure score. If you started the task log in module 1, you already have most of this.',
      },
      {
        type: 'p',
        text: 'A good test: if a colleague could read your task list and predict roughly how you spend a week, the granularity is right. If it reads like a CV bullet list ("manage team", "deliver projects"), it is too coarse to audit.',
      },
      {
        type: 'h2',
        text: 'Step 2: Apply four filters to each task',
      },
      {
        type: 'p',
        text: 'For each task, answer four questions. (1) Pattern: is there a large body of similar prior examples that an AI could have learned from? (2) Verification: can the output be checked for correctness quickly by a non-expert, or by you in less time than producing it? (3) Currency: does the task require information that did not exist before the model\'s training cutoff -- this week\'s prices, today\'s call notes, last hour\'s ticket queue? (4) Interpersonal: does performance depend on the specific person you are working with -- their mood, history with you, internal politics, trust?',
      },
      {
        type: 'p',
        text: 'Tasks that score yes on pattern and verification, and no on currency and interpersonal, are highest exposure. Tasks with yes on currency or interpersonal are substantially protected at current capability levels. The diagonal cases -- yes on pattern but no on verification -- are the dangerous middle: AI can produce something plausible-looking that nobody can quickly check, which is where the most expensive errors live.',
      },
      {
        type: 'h2',
        text: 'Step 3: Estimate time share and value share',
      },
      {
        type: 'p',
        text: 'Two columns matter. Time share: what percentage of your working week each task type takes. Value share: how much of your perceived contribution each task represents in the eyes of your manager and skip-level. These are often misaligned, and the audit forces you to see it. High-exposure tasks that are also high time-share warrant the most attention -- they are both automatable and currently consuming significant effort. High-value tasks that are low exposure are your current structural advantage and deserve more time, not less.',
      },
      {
        type: 'h2',
        text: 'Step 4: Separate exposure from risk',
      },
      {
        type: 'p',
        text: 'High exposure does not automatically mean job risk. It may mean the task will be augmented (you do it faster with AI help), delegated to a junior role, batched and pushed off-shore, or genuinely automated away. The path depends on whether your employer can redeploy the time savings productively, whether your role can shift toward higher-judgment work, and whether the savings are big enough to justify reorganising. The module on augmented roles covers this in more detail; the module on conversations with your employer covers how to influence which path your role takes.',
      },
      {
        type: 'example',
        label: 'Worked example: Marketing Manager',
        text: 'Task list excerpt with verdicts: writing campaign briefs (high exposure -- pattern + verifiable), drafting email subject lines (very high exposure), reviewing agency creative (medium -- needs brand judgement, but AI can suggest), presenting results to the board (low -- interpersonal, high-stakes, context-dependent), managing the agency relationship (low -- relationship history, trust, negotiation), competitive intelligence on new entrants (high exposure with currency caveat -- only useful if AI has access to current data via search), final sign-off on campaign launch (low -- you are accountable, the AI is not). Time share: 35% in the high-exposure tasks, 20% in low-exposure, the rest mixed. Verdict: the role is augmentable rather than replaceable, but the manager needs to redirect the freed time visibly toward the strategic and relationship layer.',
      },
      {
        type: 'example',
        label: 'Worked example: Customer Support Specialist',
        text: 'A support specialist finds that 60% of tickets are L1 issues with well-known resolutions (password resets, billing queries, known product behaviours). That 60% is high AI exposure -- pattern and verifiable. The remaining 40% involves escalations, unhappy customers, product edge cases, and internal coordination with engineering -- all low exposure (interpersonal, novel, requires current context). If the employer deploys AI on L1 tickets, the specialist role may shift to almost entirely the 40%. That is a different job, not necessarily a lost job. But it does mean the specialist needs to be visibly competent at the harder 40% before the 60% goes away. Practical move: start working a small share of escalations now, before that becomes the only work.',
      },
      {
        type: 'example',
        label: 'Worked example: Project Coordinator in a consultancy',
        text: 'Task audit: updating project plans (medium -- AI drafts, you adjust), formatting client status decks (high), drafting meeting minutes from transcripts (very high), chasing teams for status updates (low -- interpersonal, specific people), running weekly stand-ups (low -- live conversation), managing the change-request log (medium -- structured but currency-sensitive), preparing handover docs at project end (medium -- pattern-heavy). The role is heavily exposed at the document and formatting layer and lightly exposed at the coordination layer. The augmented version of this role spends much less time formatting and much more time spotting risks across projects, coaching less experienced PMs, and managing client relationships. Without that shift, the role is at structural risk; with it, the role becomes more senior.',
      },
      {
        type: 'h2',
        text: 'What to do with your results',
      },
      {
        type: 'p',
        text: 'Your audit gives you three outputs. First, a list of tasks to start automating yourself -- capture the productivity gain before someone else does, and use the freed time visibly. Second, a list of high-exposure tasks to actively skill away from as a primary value driver -- not by refusing to do them but by ensuring they are not the only thing you are known for. Third, a clear picture of where your irreplaceable value currently sits, which is the input to the module on conversations with your employer.',
      },
      {
        type: 'p',
        text: 'A common mistake at this point is to read the audit and panic. The audit is not a verdict; it is a map. The same map that shows where the risk is also shows where to invest your next twelve months of skill development. Use it that way.',
      },
      {
        type: 'action',
        label: 'What to do this week',
        text: [
          'Open a single document with two columns: Task | Verdict. Aim for 15-25 rows from your week.',
          'For each row, apply the four filters (pattern / verification / currency / interpersonal) and assign a verdict: high / medium / low exposure.',
          'Add two more columns: time share (rough percentage) and value share (perceived).',
          'Mark three tasks you will automate yourself this month. Mark one task category you will move time toward.',
          'Do not share this with your manager yet -- the conversations module covers framing. Sit with the audit for at least a week first.',
        ],
      },
      {
        type: 'links',
        label: 'Next in this track',
        items: [
          { text: 'AI-Augmented Versions of Common Roles', url: '/ai-workforce/augmented-roles', note: 'see your role after the augmentation' },
          { text: 'The Defensive Skill Stack', url: '/ai-workforce/defensive-skill-stack', note: 'the skills that compound when audit shows what to protect' },
          { text: 'AI tools in Ireland', url: 'https://vendors.ie/ai-tools-ireland', note: 'tools mentioned in the worked examples, compared honestly' },
        ],
      },
      {
        type: 'sources',
        items: [
          { text: 'OECD Employment Outlook 2023: Artificial Intelligence and the Labour Market', url: 'https://www.oecd.org/employment-outlook/' },
          { text: 'World Economic Forum: Future of Jobs Report 2023 -- task-level skill mix data', url: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023/' },
          { text: 'Harvard Business Review: How to Protect Your Job in the Age of AI (2023)', url: 'https://hbr.org/' },
          { text: 'Accenture: A New Era of Generative AI for Everyone (2023) -- task decomposition methodology', url: 'https://www.accenture.com/us-en/insights/technology' },
        ],
      },
    ],
    next: 'augmented-roles',
    prev: 'ai-capability-boundaries',
  },

  {
    slug: 'augmented-roles',
    title: 'AI-Augmented Versions of Common Roles',
    shortTitle: 'Augmented Roles',
    description: 'What the accountant, marketer, writer, customer support specialist, and designer role looks like when AI handles the pattern work -- and where human judgment becomes the bottleneck.',
    lastUpdated: '2026-05-25',
    readingTime: '10 min',
    content: [
      {
        type: 'lead',
        text: 'The augmented version of a role is not a reduced version. It typically involves less volume work and more judgment, communication, and taste -- the things AI cannot reliably do. This module maps five common roles through that transition.',
      },
      {
        type: 'h2',
        text: 'Accountant / Finance Analyst',
      },
      {
        type: 'p',
        text: 'Routine data extraction, reconciliation, and standard report formatting are high AI-exposure tasks. The augmented version shifts time toward: interpreting anomalies, advising on tax strategy for novel situations, communicating financial risk to non-finance stakeholders, and managing relationships with auditors and regulators. Technical accounting knowledge stays essential -- the AI produces outputs that still need a qualified professional to validate.',
      },
      {
        type: 'example',
        label: 'What changes',
        text: 'Pulling quarterly numbers from the ERP and formatting them into board templates: mostly automated. Explaining why margin compressed despite revenue growth, and recommending a specific response: still human. The ratio of "format and assemble" to "interpret and advise" shifts dramatically.',
      },
      {
        type: 'h2',
        text: 'Marketing Manager',
      },
      {
        type: 'p',
        text: 'First-draft copy, A/B test variants, audience segmentation from structured data, and campaign performance summaries are high exposure. The augmented role concentrates on: brand judgment (what is on-brand when an AI can only produce plausible-sounding copy), strategy (which channels and messages for which audience at which stage), and relationships with agencies, media partners, and sales teams.',
      },
      {
        type: 'example',
        label: 'What changes',
        text: 'Writing ten variations of an email subject line: AI does this in seconds. Deciding which one reflects the brand accurately and will land with the specific audience segment at this moment in the campaign: human judgment. The marketer role moves toward creative direction and strategic orchestration.',
      },
      {
        type: 'h2',
        text: 'Writer / Content Strategist',
      },
      {
        type: 'p',
        text: 'Formulaic content (product descriptions, FAQs, templated articles on known topics) has high AI exposure. The augmented writer concentrates on: original research and reporting, distinctive voice and point of view, editorial judgment about what to cover and how, and structured persuasion that requires understanding a specific reader\'s situation.',
      },
      {
        type: 'example',
        label: 'What changes',
        text: 'A first draft of a blog post from a detailed brief: AI can produce this faster than any human. Whether the post says something true and interesting that the reader will act on: that depends on research, editorial judgment, and voice that the AI cannot supply from a brief alone. The writer role shifts toward the judgment and editorial layer.',
      },
      {
        type: 'h2',
        text: 'Customer Support Specialist',
      },
      {
        type: 'p',
        text: 'L1 ticket resolution, FAQ responses, and status updates on known issues are high exposure. The augmented support specialist handles: escalations that require empathy and de-escalation, complex product issues with no prior resolution path, internal escalation and coordination, and identifying systemic issues from patterns in customer feedback.',
      },
      {
        type: 'example',
        label: 'What changes',
        text: 'A customer whose subscription renewal failed due to a payment processor error: AI can identify the issue and trigger the fix. A customer who has been having problems for three months, is angry, and is about to cancel: AI can draft a response, but the specialist\'s judgment about what to say and offer is what saves the account.',
      },
      {
        type: 'h2',
        text: 'Designer',
      },
      {
        type: 'p',
        text: 'Generating visual variations, resizing assets for multiple formats, and producing stock-style imagery are high exposure. The augmented designer focuses on: concept development and creative direction, understanding a brief well enough to evaluate AI output against it, brand consistency judgment, and communication with stakeholders who cannot evaluate AI output themselves.',
      },
      {
        type: 'example',
        label: 'What changes',
        text: 'Producing 20 logo variations from a brief: AI tools can do this. Deciding which one captures what the client actually meant -- and presenting that choice with a clear rationale -- is design judgment. The designer becomes more of a director of AI-generated options and less a producer of individual assets.',
      },
      {
        type: 'h2',
        text: 'The common pattern',
      },
      {
        type: 'p',
        text: 'Across all five roles, the shift is similar: volume work and pattern work moves toward AI; judgment, communication, and taste become the primary value. That does not make roles easier -- those skills are harder to develop and less commoditised. It does mean the skills worth investing in are different from the ones that got most of the professional development attention in the pre-AI era.',
      },
      {
        type: 'sources',
        items: [
          'McKinsey Global Institute: "A new future of work: The race to deploy AI and raise skills" (2023)',
          'World Economic Forum: "Future of Jobs Report 2023"',
          'HBR: "In the Age of AI, You Need Both Artificial Intelligence and Human Intelligence" (2023)',
        ],
      },
    ],
    next: 'defensive-skill-stack',
    prev: 'audit-your-role',
  },

  {
    slug: 'defensive-skill-stack',
    title: 'The Defensive Skill Stack',
    shortTitle: 'Defensive Skills',
    description: 'The skills that compound in an AI-augmented workplace -- judgment, communication, taste, and context -- and why they are durable compared to technical skills.',
    lastUpdated: '2026-05-25',
    readingTime: '8 min',
    content: [
      {
        type: 'lead',
        text: 'If you have read the previous modules, a pattern is visible: the skills most protected from AI substitution are judgment, communication, taste, and real-world context. This module explains what those mean in practice and how to develop them deliberately.',
      },
      {
        type: 'h2',
        text: 'Why these skills compound',
      },
      {
        type: 'p',
        text: 'Technical skills have a predictable decay curve: a skill tied to a specific tool or format loses value when the tool is superseded. Judgment, communication, and taste compound differently. They improve with experience, transfer across contexts, and become more valuable as the volume and quality of AI output rises -- because someone has to evaluate and direct that output.',
      },
      {
        type: 'p',
        text: 'As AI produces more first drafts, more summaries, more options, the bottleneck shifts from production to evaluation. The person who can reliably tell a good output from a plausible-but-wrong one becomes more valuable, not less.',
      },
      {
        type: 'h2',
        text: 'Judgment: making decisions with incomplete information',
      },
      {
        type: 'p',
        text: 'Judgment is the ability to reach a good decision when the information is ambiguous, incomplete, or contested. AI systems optimise for plausibility; they do not have a stake in the outcome and cannot hold the full context of a specific situation. Developing judgment means deliberately taking on decisions, tracking what happened, and updating your model of how similar situations play out.',
      },
      {
        type: 'example',
        label: 'How to develop it',
        text: 'Ask to own decisions rather than execute on them. After each significant decision, note what you expected and what happened. Over time this builds a calibrated sense of where your intuitions are reliable and where they need more information. That is a skill an AI cannot acquire for you.',
      },
      {
        type: 'h2',
        text: 'Communication: being understood by specific people',
      },
      {
        type: 'p',
        text: 'AI can produce grammatically correct, reasonably well-structured text. It cannot know your audience -- their priorities, their blind spots, what they said in last week\'s meeting, what framing will land and what will trigger defensiveness. Communication as a skill is not about grammar; it is about understanding a specific person or group and choosing the words, sequence, and emphasis that work for them.',
      },
      {
        type: 'example',
        label: 'How to develop it',
        text: 'After each important communication (presentation, negotiation, difficult conversation), assess what landed and what did not. Explicitly build a mental model of the people you communicate with regularly: what they care about, what they react poorly to, how they process information. AI can help you draft; it cannot build that model.',
      },
      {
        type: 'h2',
        text: 'Taste: knowing good from plausible',
      },
      {
        type: 'p',
        text: 'Taste is the ability to distinguish between an output that is technically adequate and one that is genuinely good. As AI makes technically adequate output cheap, taste becomes the scarce resource. It applies to writing, design, product decisions, customer interactions, and strategy.',
      },
      {
        type: 'p',
        text: 'Taste is developed by exposure to high-quality examples across a domain and by the discipline of asking "why is this better than that" rather than just noting a preference. It is slow to develop and difficult to transfer -- which is exactly what makes it durable.',
      },
      {
        type: 'h2',
        text: 'Context: knowing what the numbers mean in this specific situation',
      },
      {
        type: 'p',
        text: 'AI systems can process data but they do not have the lived context of a specific organisation, client, or market. Context means knowing that the margin drop in Q3 is because of a contract renegotiation you were in the room for; that the client\'s apparent resistance is because of a failed implementation three years ago; that this market reacts differently to price changes than the category average suggests.',
      },
      {
        type: 'p',
        text: 'Context is accumulated through sustained attention to one domain or relationship over time. It cannot be transferred to an AI in a prompt.',
      },
      {
        type: 'h2',
        text: 'How to invest in this stack',
      },
      {
        type: 'p',
        text: 'Deliberate practice looks different for each skill. For judgment: own more decisions and track outcomes. For communication: study the specific people you need to influence, not communication in general. For taste: read and study excellent examples in your domain, not just your own outputs. For context: stay in one domain long enough to accumulate the situational knowledge that is invisible to outsiders.',
      },
      {
        type: 'sources',
        items: [
          'HBR: "The Skills That Will Help You Thrive in the Age of AI" (2023)',
          'MIT Sloan Management Review: "Rethinking the Human-Machine Collaboration" (2024)',
          'OECD: "AI and the Future of Skills" (2023)',
        ],
      },
    ],
    next: 'conversations-with-your-employer',
    prev: 'augmented-roles',
  },

  {
    slug: 'conversations-with-your-employer',
    title: 'Conversations With Your Employer',
    shortTitle: 'Positioning at Work',
    description: 'How to position your AI skills usefully without inadvertently making yourself redundant -- what to say, what to avoid, and how to frame AI use as organisational value.',
    lastUpdated: '2026-05-25',
    readingTime: '7 min',
    content: [
      {
        type: 'lead',
        text: 'Demonstrating AI competence at work has a trap: if you show that AI can handle your tasks without making clear what you do with the freed time, you may accelerate the conversation about whether your role is still needed. This module covers how to frame AI use productively.',
      },
      {
        type: 'h2',
        text: 'The framing that works',
      },
      {
        type: 'p',
        text: 'The useful frame is not "I used AI to do X faster" but "I used AI to handle X, which freed me to do Y -- and here is the business result of Y." Y should be a higher-judgment activity: a decision you made, a relationship you developed, a problem you identified, an insight you surfaced. The argument is not speed, it is reallocation toward value.',
      },
      {
        type: 'example',
        label: 'Example conversation',
        text: 'Weak: "I can produce the weekly report in half the time now that I\'m using AI." Stronger: "I have automated the data assembly on the weekly report, which means I have had time to build a more detailed model of our churn drivers. I found a segment pattern that the standard report was masking. Here is what it means and what I recommend."',
      },
      {
        type: 'h2',
        text: 'What to avoid',
      },
      {
        type: 'p',
        text: 'Avoid making productivity claims that invite the question "so we could have one person doing two jobs now?" Do not show that AI can replicate your entire role without describing what you contribute on top. Do not use AI output in client or stakeholder communications without reviewing it carefully -- if an error reaches a client, it came from you, not the tool.',
      },
      {
        type: 'h2',
        text: 'Proposing the augmented version of your role',
      },
      {
        type: 'p',
        text: 'The most direct approach is to use your role audit (module 2) to propose a revised role definition to your manager. Identify the tasks you can automate, describe what you will redirect that time toward, and show the business logic. This is more compelling than waiting for your employer to redesign roles and hoping the result works in your favour.',
      },
      {
        type: 'example',
        label: 'How to structure the proposal',
        text: 'Three parts: (1) Here are the tasks I have identified where AI tools materially reduce time required. (2) Here is what I propose to do with that time -- specific higher-value activities tied to business outcomes. (3) Here is what I need to make this work -- tool access, a short upskilling period, a revised set of priorities.',
      },
      {
        type: 'h2',
        text: 'If your employer is moving faster than you',
      },
      {
        type: 'p',
        text: 'If your organisation is already deploying AI on your tasks without a clear conversation about what your role becomes, that is a signal. Ask directly: "As we deploy AI on [task category], what does this role look like in 12 months?" Getting a concrete answer -- even an uncertain one -- is more useful than avoiding the question.',
      },
      {
        type: 'h2',
        text: 'When to retrain, when to switch, when to stay',
      },
      {
        type: 'p',
        text: 'That question is covered in the next and final module. The short version: staying is viable when your role can credibly shift toward the defensive skill stack and your employer is aligned with that shift. Switching is worth considering when your current role is structurally high-exposure with no clear path to the augmented version. Retraining is worth the cost when it moves you to a role with lower structural exposure or higher skill-stack relevance.',
      },
      {
        type: 'sources',
        items: [
          'HBR: "How to Have an Honest Conversation About AI With Your Boss" (2024)',
          'MIT Sloan Management Review: "Navigating the AI Transition in Your Career" (2023)',
          'World Economic Forum: "Human-Centred AI: A Framework for Action" (2023)',
        ],
      },
    ],
    next: null,
    prev: 'defensive-skill-stack',
  },
]

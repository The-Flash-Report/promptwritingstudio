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
    readingTime: '15 min',
    content: [
      {
        type: 'lead',
        text: 'The augmented version of a role is not a reduced version. It typically involves less volume work and more judgment, communication, and taste -- the things AI cannot reliably do. This module maps five common roles through that transition. McKinsey\'s 2023 work on AI and the future of work estimated that 60-70% of employee time across all occupations is currently spent on activities that could be partially automated; the World Economic Forum Future of Jobs Report 2023 estimated that 44% of worker skills will be disrupted over five years. Both ranges are aggregate. What follows is what those numbers actually mean at the desk level, role by role.',
      },
      {
        type: 'h2',
        text: 'Accountant / Finance Analyst',
      },
      {
        type: 'p',
        text: 'Routine data extraction, reconciliation, transaction categorisation, variance commentary, and standard report formatting are high AI-exposure tasks. Tools like Excel\'s Copilot, Microsoft 365 Copilot, and finance-specific platforms now produce useable first drafts of monthly management accounts from structured ledger data. The augmented version of the role shifts time toward interpreting anomalies, advising on tax strategy for novel situations, communicating financial risk to non-finance stakeholders, and managing relationships with auditors and regulators. Technical accounting knowledge stays essential -- the AI produces outputs that a qualified professional still has to validate, and in regulated contexts the human review is non-negotiable.',
      },
      {
        type: 'p',
        text: 'The augmented accountant is increasingly an internal advisor, not a producer of reports. The reports get produced anyway; the value is what gets said about them in the room. That requires presenting financial information in plain language to non-finance colleagues and helping them make better operational decisions.',
      },
      {
        type: 'example',
        label: 'What changes -- monthly close',
        text: 'Pulling quarterly numbers from the ERP and formatting them into board templates: mostly automated. Explaining why margin compressed despite revenue growth, and recommending a specific response: still human. The ratio of "format and assemble" to "interpret and advise" shifts dramatically. A finance analyst who spent 70% of the week on assembly and 30% on interpretation may move toward 25% assembly and 75% interpretation -- but only if they actively claim the interpretation work.',
      },
      {
        type: 'example',
        label: 'What changes -- audit preparation',
        text: 'Pulling supporting documentation, sampling transactions for testing, generating audit trail summaries: these are AI-augmentable. Negotiating audit scope with the auditor, deciding which judgmental areas (revenue recognition, asset impairment, going-concern assessment) to defend with what evidence: human. The augmented audit prep team is leaner on documentation labour and heavier on partner-level conversations earlier in the cycle.',
      },
      {
        type: 'h2',
        text: 'Marketing Manager',
      },
      {
        type: 'p',
        text: 'First-draft copy, A/B test variants, audience segmentation from structured data, campaign performance summaries, social-post variations, and ad-creative iterations are high exposure. Almost every modern marketing stack now has AI features generating exactly these outputs. The augmented role concentrates on brand judgement -- what is on-brand when an AI can produce plausible-sounding copy in any voice -- strategy (which channels and messages for which audience at which stage), and relationships with agencies, media partners, and sales teams.',
      },
      {
        type: 'p',
        text: 'The harder shift is in measurement. AI tools make it easy to run more experiments, generate more variants, and produce more reports. That increases the volume of data but not necessarily the volume of insight. The augmented marketer becomes better at choosing what not to measure, what experiments not to run, and which channel results to ignore as noise. Strategic restraint becomes more valuable as production becomes cheaper.',
      },
      {
        type: 'example',
        label: 'What changes -- a campaign launch',
        text: 'Writing ten variations of an email subject line: AI does this in seconds. Deciding which one reflects the brand accurately, will land with the specific audience segment at this moment in the campaign, and will not erode trust with the long-term list: human judgement. The marketer role moves toward creative direction and strategic orchestration, with the team running smaller and the agency relationships getting more strategic.',
      },
      {
        type: 'example',
        label: 'What changes -- B2B account-based marketing',
        text: 'AI tools can identify look-alike companies, surface intent signals from web data, and draft initial outreach at scale. They cannot judge whether the named contact at the prospect company is the right entry point given the political map of that organisation, or whether the timing is right relative to their fiscal year and recent leadership changes. The marketer\'s value is the political read on a specific account, supported by AI that handles the volume layer underneath.',
      },
      {
        type: 'h2',
        text: 'Writer / Content Strategist',
      },
      {
        type: 'p',
        text: 'Formulaic content -- product descriptions, FAQs, templated articles on known topics, transcript-based summaries -- has high AI exposure. The augmented writer concentrates on original research and reporting (going to the source, not paraphrasing existing content), distinctive voice and point of view, editorial judgement about what to cover and how, and structured persuasion that requires understanding a specific reader\'s situation. SEO-driven content that exists only to capture queries is increasingly produced and ranked by AI on both sides; that whole layer is collapsing toward zero margin.',
      },
      {
        type: 'p',
        text: 'A different shift in publishing: AI Overviews on Google and answer engines on ChatGPT, Perplexity, and Claude are reducing the click-through rate on commodity informational content. The writer who survives the next two years is one whose work is being cited as the source by those engines, not paraphrased into them. That requires either original reporting, named expertise, or a position the engine cannot derive from scraping existing content.',
      },
      {
        type: 'example',
        label: 'What changes -- a how-to article',
        text: 'A first draft of a how-to article from a detailed brief: AI produces this faster than any human. Whether the article says something true and useful that the reader will act on, includes specific worked examples from real practice, and reflects a point of view the reader respects: this depends on research, editorial judgement, and voice that the AI cannot supply from a brief alone. The writer role shifts toward the judgement, sourcing, and editorial layer -- closer to the work of an editor with reporting skill than a producer of templated text.',
      },
      {
        type: 'example',
        label: 'What changes -- thought leadership for an executive',
        text: 'AI can ghost-write a plausible LinkedIn post in any executive\'s past voice given enough samples. It cannot know what the executive actually thinks about a specific market event that happened this morning, what they want to be associated with strategically, or which of three positions they should take given what their CEO said last week. The ghost-writer role moves from producer to interviewer-strategist -- much more time in conversation with the executive, much less time at the keyboard.',
      },
      {
        type: 'h2',
        text: 'Customer Support Specialist',
      },
      {
        type: 'p',
        text: 'L1 ticket resolution, FAQ responses, status updates on known issues, and standard refund processing are high exposure. Modern customer-support AI now resolves measurable shares of L1 volume without escalation -- Klarna publicly reported in 2024 that its AI assistant handled work equivalent to roughly 700 full-time agents on volume that was previously L1. The augmented support specialist handles escalations that require empathy and de-escalation, complex product issues with no prior resolution path, internal coordination with engineering, and identifying systemic issues from patterns in customer feedback that no individual ticket would surface.',
      },
      {
        type: 'p',
        text: 'A second shift: the augmented support function becomes a primary product-feedback loop. Specialists who can synthesise hundreds of conversations into a clear "here is what customers are actually struggling with this month" become more valuable, because that synthesis is a judgement task that AI assists but does not replace. Routing that signal to product and engineering with credibility is the new value layer.',
      },
      {
        type: 'example',
        label: 'What changes -- a churning account',
        text: 'A customer whose subscription renewal failed due to a payment processor error: AI identifies the issue and triggers the fix in seconds. A customer who has had problems for three months, is angry, and is about to cancel: AI drafts a response, but the specialist\'s judgement about what to say and offer is what saves the account. The compensation level, the tone of the apology, the choice between a one-off concession and a multi-month account-management commitment -- these are decisions where the AI is wrong as often as right and the cost of being wrong is the account.',
      },
      {
        type: 'example',
        label: 'What changes -- a complex multi-product issue',
        text: 'A B2B customer reporting an issue that spans authentication, billing, and the API: AI can quickly diagnose which subsystem is failing if the issue matches known patterns. When it does not, the specialist has to coordinate engineers across three teams, manage the customer\'s expectations through a multi-day investigation, and decide when to escalate to engineering leadership. Coordination under uncertainty across internal teams is high-trust work that the AI does not do.',
      },
      {
        type: 'h2',
        text: 'Designer',
      },
      {
        type: 'p',
        text: 'Generating visual variations, resizing assets for multiple formats, producing stock-style imagery, drafting wireframes from a brief, and producing variations of a known layout are high exposure. The augmented designer focuses on concept development and creative direction, understanding a brief well enough to evaluate AI output against it, brand consistency judgement, and communication with stakeholders who cannot evaluate AI output themselves. Senior designers are spending more time on prompt-and-curate workflows and less time on production.',
      },
      {
        type: 'p',
        text: 'A second shift specific to product designers: as AI lowers the cost of producing UI variations, the bottleneck moves to deciding which variation to ship based on user research, accessibility constraints, business logic, and engineering cost. Designers who pair tightly with PM and engineering on that decision become more central; designers whose value was production speed lose ground.',
      },
      {
        type: 'example',
        label: 'What changes -- brand identity work',
        text: 'Producing 20 logo variations from a brief: AI tools do this. Deciding which one captures what the client actually meant, presenting that choice with a clear rationale, and defending it through three rounds of stakeholder feedback: design judgement. The designer becomes more of a director of AI-generated options and a defender of strategic choices, and less of a producer of individual assets.',
      },
      {
        type: 'example',
        label: 'What changes -- a product feature design',
        text: 'AI can suggest layout patterns and produce variations against a design system. It cannot weigh the accessibility implications for screen-reader users against the business stakeholder\'s preference for a denser layout, or know that the engineering team is constrained on this sprint and the simpler pattern is the only realistically shippable one. The designer who can hold all three constraints in mind and make a defensible call is the one whose role survives.',
      },
      {
        type: 'h2',
        text: 'The common pattern across all five roles',
      },
      {
        type: 'p',
        text: 'Volume work and pattern work moves toward AI. Judgement, communication, and taste become the primary value. That does not make roles easier -- those skills are harder to develop, take longer to acquire, and are less commoditised. The skills worth investing in are different from the ones that got most of the professional development attention in the pre-AI era. The next module unpacks that skill stack in detail; the practice block below gets you started on the version specific to your role.',
      },
      {
        type: 'action',
        label: 'What to do this week',
        text: [
          'Identify the role on this list closest to yours (or the nearest analogue if yours is not here -- legal, engineering, operations, HR all follow similar patterns).',
          'List three tasks you do that match the "high exposure" descriptions above. Pick one and try doing it with AI assistance this week -- log time saved and quality.',
          'List three tasks that match the "augmented" descriptions (judgement, communication, coordination) and that you currently spend less than 20% of your time on. Pick one and book a 90-minute block to do it deliberately.',
          'After two weeks of this, your task mix should already look more like the augmented version.',
        ],
      },
      {
        type: 'links',
        label: 'Next in this track',
        items: [
          { text: 'The Defensive Skill Stack', url: '/ai-workforce/defensive-skill-stack', note: 'the skills that compound when production becomes cheap' },
          { text: 'Conversations With Your Employer', url: '/ai-workforce/conversations-with-your-employer', note: 'how to make the augmented version of your role visible' },
          { text: 'AI tools in Ireland', url: 'https://vendors.ie/ai-tools-ireland', note: 'compared by use case -- meetings, drafting, research, support' },
        ],
      },
      {
        type: 'sources',
        items: [
          { text: 'McKinsey Global Institute: A new future of work -- the race to deploy AI and raise skills (2023)', url: 'https://www.mckinsey.com/mgi/our-research/a-new-future-of-work-the-race-to-deploy-ai-and-raise-skills-in-an-unequal-world' },
          { text: 'World Economic Forum: Future of Jobs Report 2023', url: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023/' },
          { text: 'HBR: In the Age of AI, You Need Both Artificial Intelligence and Human Intelligence (2023)', url: 'https://hbr.org/' },
          { text: 'Stanford HAI AI Index Report 2024 -- occupational impact section', url: 'https://aiindex.stanford.edu/report/' },
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
    readingTime: '13 min',
    content: [
      {
        type: 'lead',
        text: 'If you have read the previous modules, a pattern is visible: the skills most protected from AI substitution are judgement, communication, taste, and real-world context. This module explains what each of those means in practice, why they compound over time rather than depreciate, and how to develop them deliberately. The World Economic Forum Future of Jobs Report 2023 ranks analytical thinking, creative thinking, and resilience as the top three skills employers are prioritising; the LinkedIn Workforce Report and McKinsey skills research consistently surface a similar list. These are not abstract qualities -- they are practiceable.',
      },
      {
        type: 'h2',
        text: 'Why these skills compound',
      },
      {
        type: 'p',
        text: 'Technical skills have a predictable decay curve: a skill tied to a specific tool, framework, or format loses value when the tool is superseded. The half-life of named technical skills in the Stanford HAI 2024 data appears to be shortening across multiple categories, particularly anything tied to a particular software product. Judgement, communication, taste, and context compound differently. They improve with experience, transfer across contexts, and become more valuable as the volume and quality of AI output rises -- because someone still has to evaluate and direct that output. The person who can reliably tell a good output from a plausible-but-wrong one is more valuable when AI produces ten outputs an hour than when a colleague produces one.',
      },
      {
        type: 'p',
        text: 'A second reason these skills compound: they are difficult to transfer in a prompt. A new hire takes months or years to acquire judgement about your industry; an AI tool takes zero. If you have judgement and the AI does not, that gap holds while the AI gets cheaper and your value rises with it.',
      },
      {
        type: 'h2',
        text: 'Judgement: making decisions with incomplete information',
      },
      {
        type: 'p',
        text: 'Judgement is the ability to reach a good decision when the information is ambiguous, incomplete, or contested. AI systems optimise for plausibility; they do not have a stake in the outcome and cannot hold the full context of a specific situation. They are also calibrated on what most people would say rather than what is true in this case, which is a structurally different objective. Developing judgement means deliberately taking on decisions, tracking what happened, and updating your model of how similar situations play out.',
      },
      {
        type: 'example',
        label: 'How to develop judgement -- decision journal',
        text: 'Keep a one-page decision journal. For each significant decision (every two weeks is a reasonable cadence), write: what I am deciding, what I expect to happen, what would change my mind, and what I will treat as evidence either way in 30/90/180 days. Review entries at those intervals. Over a year this builds a calibrated sense of where your intuitions are reliable and where they need more information. That is a skill an AI cannot acquire for you, and it is the input to almost every other defensive skill on this list.',
      },
      {
        type: 'example',
        label: 'How to develop judgement -- own the call',
        text: 'In meetings, distinguish between contributing analysis and owning a decision. Ask explicitly to own one decision per quarter that you would normally only inform. Track what happened. The most common career trap is being technically excellent at analysis without ever taking the on-the-record positions that build judgement. AI is fine at analysis; it cannot make a call you are accountable for.',
      },
      {
        type: 'h2',
        text: 'Communication: being understood by specific people',
      },
      {
        type: 'p',
        text: 'AI can produce grammatically correct, reasonably well-structured text in almost any register. It cannot know your audience -- their priorities, blind spots, what they said in last week\'s meeting, what framing will land and what will trigger defensiveness, what they actually care about versus what they say they care about. Communication as a skill is not about grammar; it is about understanding a specific person or group and choosing the words, sequence, and emphasis that work for them.',
      },
      {
        type: 'p',
        text: 'The shift worth noting: as AI makes the average quality of written output rise, the differentiating skill becomes the strategic shape of communication, not the prose. What you choose to say, what you leave out, what order you put it in, what you put in the subject line and what you bury -- these matter more than sentence-level craft. The augmented communicator spends less time on drafting and more time on the architecture of the message.',
      },
      {
        type: 'example',
        label: 'How to develop communication -- the audience map',
        text: 'For the five to ten people you most need to influence at work, write a one-paragraph profile of each: what they prioritise, what they react badly to, how they process information (slides? prose? numbers? stories?), what their boss measures them on. Update quarterly. Before any important communication, read the relevant profile. This explicit modelling is what good communicators do unconsciously; building it deliberately accelerates the skill by years.',
      },
      {
        type: 'example',
        label: 'How to develop communication -- the after-action review',
        text: 'After each important communication (presentation, negotiation, difficult conversation, important email), assess what landed, what did not, and why. The two-minute reflection in your notebook compounds. AI can help you draft; it cannot tell you why your CFO went quiet after slide four.',
      },
      {
        type: 'h2',
        text: 'Taste: knowing good from plausible',
      },
      {
        type: 'p',
        text: 'Taste is the ability to distinguish between an output that is technically adequate and one that is genuinely good. As AI makes technically adequate output cheap, taste becomes the scarce resource. It applies to writing, design, product decisions, code, customer interactions, hiring, and strategy. Taste is hardest to define precisely -- which is part of why it is durable. Anything you can write down as a checklist, AI can be trained on; anything you can only demonstrate through choices is yours.',
      },
      {
        type: 'p',
        text: 'Taste is developed by sustained exposure to high-quality examples across a domain and by the discipline of asking "why is this better than that" rather than just noting a preference. It is slow to develop and difficult to transfer between domains, which is exactly what makes it durable. The designer with twenty years of taste in B2B SaaS interfaces does not have transferable taste in consumer fashion; the editor with sharp taste in long-form journalism may have blunt taste in technical documentation.',
      },
      {
        type: 'example',
        label: 'How to develop taste -- the comparison practice',
        text: 'Pick two examples in your domain, one excellent and one mediocre, every week. Write 100-200 words on why one is better than the other. The act of articulating preference forces the implicit model to become explicit, which is what accelerates calibration. After a year you will see things in your domain that newer colleagues cannot, and you will be able to direct AI output more precisely because you have a clearer target.',
      },
      {
        type: 'example',
        label: 'How to develop taste -- learn from people whose taste you trust',
        text: 'Identify the two or three people in your field whose judgement you most respect. Read what they read, watch what they choose to share, ask them why they liked a particular thing. Taste accretes through proximity to people who already have it. AI does not yet replace that mechanism; if anything, it makes the gap between people with calibrated taste and people without it more visible.',
      },
      {
        type: 'h2',
        text: 'Context: knowing what the numbers mean in this specific situation',
      },
      {
        type: 'p',
        text: 'AI systems can process data but they do not have the lived context of a specific organisation, client, or market. Context means knowing that the margin drop in Q3 was driven by a contract renegotiation you were in the room for; that the client\'s apparent resistance is because of a failed implementation three years ago that nobody mentions out loud; that this market reacts differently to price changes than the category average suggests because of a 2019 regulatory change that still distorts behaviour.',
      },
      {
        type: 'p',
        text: 'Context is accumulated through sustained attention to one domain or relationship over time. It cannot be transferred to an AI in a prompt, and it usually cannot be transferred to a new hire either. That is why long tenure in one domain, which used to be considered low-status in fast-moving industries, is now visibly more valuable -- the institutional memory that lives in your head is structurally hard for the AI to replicate.',
      },
      {
        type: 'p',
        text: 'A practical warning: context only compounds if you stay engaged with it. Long tenure where you have stopped paying attention does not generate context; it generates rigidity. The defensive value is in active institutional knowledge, not seat-time.',
      },
      {
        type: 'h2',
        text: 'How to invest in this stack',
      },
      {
        type: 'p',
        text: 'Deliberate practice looks different for each skill. For judgement: own more decisions, keep a decision journal, review at fixed intervals. For communication: build the audience map, do after-action reviews, focus on the architecture of messages rather than sentence craft. For taste: do weekly comparison writing, stay close to people with calibrated taste in your domain. For context: stay in one domain long enough to accumulate the situational knowledge that is invisible to outsiders, and stay actively engaged with it. Across all four: write things down. The unwritten version of these skills is harder to develop deliberately because the feedback loop is too slow.',
      },
      {
        type: 'action',
        label: 'What to do this week',
        text: [
          'Start a decision journal. One A4 page is enough. Write your first entry today on a decision you currently face.',
          'Pick three people on your audience map (most-need-to-influence list). Write a one-paragraph profile of each.',
          'Choose two examples in your domain -- one excellent, one mediocre -- and write 100-200 words on why one is better than the other.',
          'Identify one place in the next month where you can ask to own a decision rather than just inform it. Put it in the calendar.',
        ],
      },
      {
        type: 'links',
        label: 'Next in this track',
        items: [
          { text: 'Conversations With Your Employer', url: '/ai-workforce/conversations-with-your-employer', note: 'positioning the skill stack visibly without making yourself redundant' },
          { text: 'When to Retrain, When to Switch, When to Stay', url: '/ai-workforce/retrain-switch-stay', note: 'using the skill audit to choose a path' },
          { text: 'AI tools in Ireland', url: 'https://vendors.ie/ai-tools-ireland', note: 'tools that pair well with each skill -- not replacements' },
        ],
      },
      {
        type: 'sources',
        items: [
          { text: 'World Economic Forum: Future of Jobs Report 2023 -- core skills ranking', url: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023/' },
          { text: 'HBR: The Skills That Will Help You Thrive in the Age of AI (2023)', url: 'https://hbr.org/' },
          { text: 'MIT Sloan Management Review: Rethinking the Human-Machine Collaboration (2024)', url: 'https://sloanreview.mit.edu/' },
          { text: 'OECD: AI and the Future of Skills (2023)', url: 'https://www.oecd.org/employment-outlook/' },
          { text: 'Stanford HAI AI Index Report 2024 -- skills and labour market section', url: 'https://aiindex.stanford.edu/report/' },
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

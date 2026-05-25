// Module content for /learn — interactive prompt-engineering resource.
// Each module: concept explainer (business-language, 200-400 words),
// worked example (before/after), and a starter prompt for the try-it panel.
// Keep tone non-technical. No founder voice. No course CTAs inside the modules.

export const LEARN_MODULES = [
  {
    slug: 'clear-instructions',
    order: 1,
    title: 'Clear instructions',
    summary:
      'The single biggest lever in prompt quality. Tell the model what you want, in what format, for whom, and what to leave out.',
    learningGoals: [
      'Spot ambiguous prompts that produce hedged or generic output',
      'Rewrite a vague prompt as a specific instruction',
      'Add format, audience, and exclusion constraints',
    ],
    concept: `Most poor AI output is not a model failure. It is an instruction failure. The model is doing its best with a prompt that did not actually specify the answer you wanted.

A clear instruction does four things at once. It states the task in one sentence. It names the audience or context. It specifies the output format (length, structure, tone). And it lists what to avoid.

Consider the difference between "write something about email marketing" and "write three subject lines for a sales onboarding email aimed at small-business owners; keep each under fifty characters and avoid the word free." The second prompt removes most of the room for misinterpretation. The model still has creative latitude inside those constraints, but the constraints are doing the heavy lifting.

A useful test: read your prompt back as if you were a new contractor seeing the task for the first time. Could you complete it without asking questions? If not, you are leaving the model to guess, and it will guess toward the safest, blandest answer in its training data.

Three traps to avoid. First, stacking too many instructions in one prompt without ordering them, which causes the model to weight them equally when you meant some to dominate. Second, using soft words like "good" or "engaging" without defining what good means in your context. Third, asking for output and then immediately constraining it ("write a long article but keep it short"), which forces the model to pick a side and rarely picks the one you wanted.

The rest of this resource builds on this foundation. Role prompting, structured output, few-shot examples — all of them are specialised forms of being clearer about what you want.`,
    workedExample: {
      before:
        'Write a follow-up email to a client who has gone quiet.',
      after:
        'Write a follow-up email to a B2B client who has not replied in 10 days after we sent a proposal. Tone: warm but direct, no apologetic language. Length: 90 words or less. Include one specific question that makes it easy to reply with a single sentence. Do not include subject line, signature, or any "just checking in" phrases.',
      whyItWorks:
        'The second prompt names the relationship, the time elapsed, the tone, the length, the desired response shape, and an explicit list of clichés to avoid. The model now has almost no room to default to bland output.',
    },
    starterPrompt:
      'Write a follow-up email to a B2B client who has not replied in 10 days after we sent a proposal. Tone: warm but direct, no apologetic language. Length: 90 words or less. Include one specific question that makes it easy to reply with a single sentence. Do not include subject line, signature, or any "just checking in" phrases.',
    tryItHint:
      'Try removing one constraint (length, tone, or the cliché ban) and run it again. Notice how the output drifts.',
  },
  {
    slug: 'role-and-persona',
    order: 2,
    title: 'Role and persona',
    summary:
      'Telling the model who it is, and who it is talking to, narrows the universe of possible responses to the one you actually want.',
    learningGoals: [
      'Distinguish a useful role prompt from decorative role-play',
      'Layer audience with role for sharper output',
      'Avoid role prompts that contradict the task',
    ],
    concept: `Role prompting is the second lever after clear instructions. Done well, it shifts the model into a specific voice, vocabulary, and set of priors. Done badly, it adds words without changing anything.

A role prompt works when it carries information the model would otherwise have to guess. "You are a senior procurement officer reviewing a tender response" tells the model what to scrutinise, what jargon is acceptable, and what counts as a red flag. "You are a helpful assistant" tells it nothing it did not already assume.

The most useful role prompts pair a role with an audience. "You are a tax accountant explaining VAT registration to a first-time freelancer" works because it sets both the expertise and the level of pitch. The model now knows to avoid technical shorthand without dumbing the content down.

Three things to watch for. First, do not stack roles. A prompt that says "you are a CEO, a copywriter, and a developer" forces the model to average across three voices and produces something none of them would write. Pick one. Second, make sure the role matches the task. Asking "you are a poet" to write tax advice will produce flowery tax advice, which is not what anyone wanted. Third, role prompts decay. After a few turns of conversation the role drifts; if it matters, restate it.

When role prompting fails, the fix is almost always to add what the role should be doing, not to add another role. "You are a marketing strategist" plus "your job in this conversation is to challenge weak positioning claims with one direct question per claim" is far more useful than a longer character sketch.`,
    workedExample: {
      before:
        'Critique this landing page headline: "We help businesses grow with AI."',
      after:
        'You are a senior B2B copy director reviewing landing page headlines for a SaaS startup. Your job is to flag vague claims and ask one sharp question that would force the founder to make the headline more specific. Critique this headline: "We help businesses grow with AI." Output: one sentence on what is vague, then one direct question. No reassurance, no praise.',
      whyItWorks:
        'The role narrows vocabulary and standards. The audience (the founder) sets the pitch. The output format prevents the model from softening the critique with hedging language.',
    },
    starterPrompt:
      'You are a senior B2B copy director reviewing landing page headlines for a SaaS startup. Your job is to flag vague claims and ask one sharp question that would force the founder to make the headline more specific. Critique this headline: "We help businesses grow with AI." Output: one sentence on what is vague, then one direct question. No reassurance, no praise.',
    tryItHint:
      'Swap the role to "supportive marketing coach" and run it again. Same task, very different output — that is the role doing work.',
  },
  {
    slug: 'structured-output',
    order: 3,
    title: 'Structured output',
    summary:
      'When you need to use AI output downstream — in a spreadsheet, a form, another prompt — ask for it in a structure, not prose.',
    learningGoals: [
      'Pick a structure (JSON, markdown table, bulleted fields) that matches the downstream use',
      'Lock the shape so the model cannot improvise extra fields',
      'Recover from malformed output without re-running the whole prompt',
    ],
    concept: `If you are pasting AI output back into a tool — a CRM, a spreadsheet, another prompt — prose is the wrong format. You are forcing yourself to do parsing work that the model could have done for you. Structured output solves this.

The first decision is the shape. JSON works when the consumer is another script or AI step. A markdown table works when the consumer is you, scanning a page. Numbered bullets with labelled fields work when the structure is shallow and you want the model to keep its reasoning visible. Pick the lightest structure that survives the use case.

The second decision is the schema. State every field name, every type, and what to do when a field is unknown. "Return a JSON object with keys title (string), audience (string), priority (one of: high, medium, low), and rationale (string, max 30 words). If priority cannot be determined, return medium." That last sentence prevents the model from inventing a fourth priority value or leaving the field blank.

The third decision is what happens at the boundaries. Models love to wrap structured output in conversational scaffolding ("Sure, here is the JSON you asked for!"). Tell them not to. "Return only the JSON object. No preamble, no markdown code fences, no closing remarks." When you are going to parse the output, every extra character is a parsing bug waiting to happen.

When structured output goes wrong, it is almost always because the schema was implicit. The fix is to make it explicit: list the fields, list the allowed values, list the formatting rule for the response wrapper. If you find yourself writing a regex to clean the output, the prompt is doing too little work.`,
    workedExample: {
      before:
        'Summarise this customer support ticket and tell me how urgent it is.',
      after:
        'Summarise the customer support ticket below. Return only a JSON object with these keys: summary (string, max 25 words), category (one of: billing, bug, feature_request, account_access, other), urgency (one of: low, medium, high), suggested_owner (one of: support, engineering, sales). No preamble, no markdown fences.\n\nTicket: [paste ticket text here]',
      whyItWorks:
        'Every consumer of this output — a triage script, a dashboard — can rely on the same shape. The enum values prevent the model from inventing a new category. The "no preamble" rule prevents the response from breaking a JSON parser.',
    },
    starterPrompt:
      'Summarise the customer support ticket below. Return only a JSON object with these keys: summary (string, max 25 words), category (one of: billing, bug, feature_request, account_access, other), urgency (one of: low, medium, high), suggested_owner (one of: support, engineering, sales). No preamble, no markdown fences.\n\nTicket: Customer reports that the export button on the reporting dashboard has been failing for two days. They have a board meeting tomorrow and need the data tonight. They have already tried two browsers.',
    tryItHint:
      'Remove the "no preamble" rule and run it again. See how the model adds conversational wrapper text that would break a parser.',
  },
]

export const DEFERRED_MODULES = [
  { slug: 'few-shot-examples', title: 'Few-shot examples' },
  { slug: 'chain-of-thought', title: 'Chain of thought' },
  { slug: 'system-and-user-composition', title: 'System and user composition' },
]

export function getModuleBySlug(slug) {
  return LEARN_MODULES.find(m => m.slug === slug) || null
}

export function getAllModuleSlugs() {
  return LEARN_MODULES.map(m => m.slug)
}

// Anthropic-direct backend — used for studio-funded models (the grader judge)
// and BYOK callers holding an Anthropic key.
//
// Same shape and safety contract as openrouter.js: the `apiKey` is used
// in-memory for this single call and is NEVER logged, returned, or persisted
// (see SECURITY notes in lib/gateway/index.js). We use `fetch` directly rather
// than the SDK so `fetchImpl` stays injectable for tests, matching the
// OpenRouter backend.

import { AuthProviderError, RateLimitError, UpstreamError } from './errors'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const DEFAULT_MAX_TOKENS = 1024
const DEFAULT_TEMPERATURE = 0.7

export async function callAnthropic({
  slug, // Anthropic model id, e.g. 'claude-sonnet-4-6'
  prompt,
  params = {},
  apiKey,
  fetchImpl = fetch,
  signal,
}) {
  const body = {
    model: slug,
    max_tokens: params.maxTokens ?? DEFAULT_MAX_TOKENS,
    temperature: params.temperature ?? DEFAULT_TEMPERATURE,
    messages: [{ role: 'user', content: prompt }],
  }

  let res
  try {
    res = await fetchImpl(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify(body),
      signal,
    })
  } catch (e) {
    // Network/transport failure — deliberately do NOT echo `e` to avoid any
    // chance of including request details. The key is never in the message.
    throw new UpstreamError('Could not reach the model provider.')
  }

  if (res.status === 401 || res.status === 403) {
    throw new AuthProviderError()
  }
  if (res.status === 429) {
    throw new RateLimitError('The provider rate-limited this request.')
  }
  if (!res.ok) {
    throw new UpstreamError(`Provider returned HTTP ${res.status}.`)
  }

  const data = await res.json()
  const text = (data.content || [])
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('\n')
  const usage = data.usage || {}

  return {
    text,
    tokensIn: usage.input_tokens ?? 0,
    tokensOut: usage.output_tokens ?? 0,
    providerResponseId: data.id ?? null,
  }
}

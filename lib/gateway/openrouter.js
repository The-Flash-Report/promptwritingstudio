// OpenRouter backend — one key, 300+ models, OpenAI-compatible API.
//
// We talk to OpenRouter's chat-completions endpoint directly with `fetch`
// rather than pulling in the OpenAI SDK: it keeps the dependency surface small
// and the request shape is identical. The `apiKey` is used in-memory for this
// single call and is NEVER logged, returned, or persisted (see SECURITY notes
// in lib/gateway/index.js).

import { AuthProviderError, RateLimitError, UpstreamError } from './errors'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MAX_TOKENS = 1024
const DEFAULT_TEMPERATURE = 0.7

// Sent so OpenRouter can attribute traffic; safe to be public.
const REFERER = 'https://promptwritingstudio.com'
const TITLE = 'PromptWritingStudio'

export async function callOpenRouter({
  slug,
  prompt,
  params = {},
  apiKey,
  fetchImpl = fetch,
  signal,
}) {
  const body = {
    model: slug,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: params.maxTokens ?? DEFAULT_MAX_TOKENS,
    temperature: params.temperature ?? DEFAULT_TEMPERATURE,
  }

  let res
  try {
    res = await fetchImpl(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': REFERER,
        'X-Title': TITLE,
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
  const choice = data.choices?.[0]
  const text = choice?.message?.content ?? ''
  const usage = data.usage || {}

  return {
    text,
    tokensIn: usage.prompt_tokens ?? 0,
    tokensOut: usage.completion_tokens ?? 0,
    providerResponseId: data.id ?? null,
  }
}

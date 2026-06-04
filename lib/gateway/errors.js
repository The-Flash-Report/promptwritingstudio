// Typed gateway errors. Each carries an HTTP `status` so API routes can map a
// failure to a response without leaking provider internals or — critically —
// any part of a user's key. Messages here are safe to surface to the client.

export class GatewayError extends Error {
  constructor(message, { status = 500, code = 'gateway_error' } = {}) {
    super(message)
    this.name = 'GatewayError'
    this.status = status
    this.code = code
  }
}

export class BadRequestError extends GatewayError {
  constructor(message) {
    super(message, { status: 400, code: 'bad_request' })
    this.name = 'BadRequestError'
  }
}

export class MissingKeyError extends GatewayError {
  constructor(message = 'No API key provided and this model is not on the free tier.') {
    super(message, { status: 401, code: 'missing_key' })
    this.name = 'MissingKeyError'
  }
}

export class AuthProviderError extends GatewayError {
  constructor(message = 'The provider rejected the API key.') {
    super(message, { status: 401, code: 'auth_failed' })
    this.name = 'AuthProviderError'
  }
}

export class RateLimitError extends GatewayError {
  constructor(message = 'Rate limit exceeded. Try again shortly or use your own API key.') {
    super(message, { status: 429, code: 'rate_limited' })
    this.name = 'RateLimitError'
  }
}

export class UpstreamError extends GatewayError {
  constructor(message = 'The model provider returned an error.') {
    super(message, { status: 502, code: 'upstream_error' })
    this.name = 'UpstreamError'
  }
}

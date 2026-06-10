// Critique errors. Like the gateway's, each carries a safe HTTP status + code.

export class CritiqueError extends Error {
  constructor(message, { status = 500, code = 'critique_error' } = {}) {
    super(message)
    this.name = 'CritiqueError'
    this.status = status
    this.code = code
  }
}

export class UnknownRubricError extends CritiqueError {
  constructor(id) {
    super(`Unknown rubric: ${id}`, { status: 404, code: 'unknown_rubric' })
    this.name = 'UnknownRubricError'
  }
}

// The judge returned something we can't trust: bad JSON, wrong shape, an
// out-of-range score, or — critically — an ungrounded score (no justification).
export class MalformedCritiqueError extends CritiqueError {
  constructor(message) {
    super(message, { status: 502, code: 'malformed_critique' })
    this.name = 'MalformedCritiqueError'
  }
}

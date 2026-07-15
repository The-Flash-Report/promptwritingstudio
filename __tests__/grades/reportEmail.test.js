import { renderGradeReportEmail, reportEmailSource, isEditsRecord } from '../../lib/grades/reportEmail'

// A chat-grade record with one GROUNDED criterion (quote should surface) and
// one UNGROUNDED criterion whose evidenceSpan is non-empty (quote must be
// suppressed purely by the grounded:false flag, not by an empty span).
function chatRecord(overrides = {}) {
  return {
    id: 'abc123',
    public: false,
    flagged: false,
    grade: {
      flagged: false,
      rubricId: 'prompt-quality',
      rubricVersion: 3,
      scale: { min: 0, max: 4 },
      target: 'claude',
      overall: { score: 2.5, max: 4, percentage: 62, pass: false },
      summary: 'Usable, with gaps in structure.',
      failureModes: ['The model must guess the audience.'],
      criteria: [
        {
          id: 'clarity',
          name: 'Clarity',
          score: 3,
          justification: 'The ask is specific.',
          evidenceSpan: 'friendly tone',
          grounded: true,
        },
        {
          id: 'context',
          name: 'Context',
          score: 2,
          justification: 'Some context is present.',
          evidenceSpan: 'ghost quote that was dropped',
          grounded: false,
        },
      ],
      rewrite: 'You are a coach. Write about [TOPIC] for [AUDIENCE].',
    },
    ...overrides,
  }
}

function agentRecord() {
  return {
    id: 'def456',
    public: false,
    flagged: false,
    grade: {
      flagged: false,
      rubricId: 'agent-prompt',
      rubricVersion: 1,
      scale: { min: 0, max: 4 },
      overall: { score: 3, max: 4, percentage: 75, pass: true },
      summary: 'Strong agent prompt.',
      failureModes: [],
      criteria: [
        { id: 'scope', name: 'Scope', score: 3, justification: 'Bounded.', evidenceSpan: 'Never add App Router', grounded: true },
      ],
      revisions: [
        { issue: 'No failure handling.', before_excerpt: 'Help the user', after_excerpt: 'Help the user, and stop on destructive ops' },
      ],
    },
  }
}

describe('grades/reportEmail', () => {
  describe('renderGradeReportEmail', () => {
    it('surfaces the grounded evidence quote and suppresses the ungrounded one', () => {
      const { html } = renderGradeReportEmail(chatRecord())
      expect(html).toContain('friendly tone')
      expect(html).not.toContain('ghost quote')
    })

    it('puts the overall score in the subject line', () => {
      const { subject } = renderGradeReportEmail(chatRecord())
      expect(subject).toContain('62')
    })

    it('renders the rewrite for a chat grade', () => {
      const { html } = renderGradeReportEmail(chatRecord())
      expect(html).toContain('Rewritten prompt')
      expect(html).toContain('[TOPIC]')
    })

    it('renders suggested edits (not a rewrite) for an agent grade', () => {
      const { html } = renderGradeReportEmail(agentRecord())
      expect(html).toContain('Suggested edits')
      expect(html).not.toContain('Rewritten prompt')
    })

    it('contains no em dashes and no course CTA', () => {
      const { subject, html } = renderGradeReportEmail(chatRecord())
      expect(subject).not.toContain('—')
      expect(html).not.toContain('—')
      expect(html.toLowerCase()).not.toContain('course')
    })

    it('includes the public share link only when a shareUrl is passed', () => {
      const withShare = renderGradeReportEmail(chatRecord({ public: true }), {
        shareUrl: 'https://promptwritingstudio.com/g/abc123',
      })
      expect(withShare.html).toContain('/g/abc123')
      const withoutShare = renderGradeReportEmail(chatRecord())
      expect(withoutShare.html).not.toContain('/g/abc123')
    })

    it('throws when the record has no grade', () => {
      expect(() => renderGradeReportEmail({ id: 'x' })).toThrow()
    })
  })

  describe('reportEmailSource / isEditsRecord', () => {
    it('labels chat and agent surfaces distinctly', () => {
      expect(reportEmailSource(chatRecord())).toBe('prompt-grader-report')
      expect(reportEmailSource(agentRecord())).toBe('agent-prompt-grader-report')
      expect(isEditsRecord(chatRecord())).toBe(false)
      expect(isEditsRecord(agentRecord())).toBe(true)
    })
  })
})

import {
  extractSlots,
  listTemplates,
  getTemplate,
  fillTemplate,
  TemplateError,
} from '../../lib/templates'

describe('templates — Phase 2', () => {
  describe('extractSlots', () => {
    it('pulls unique slot names in declaration order', () => {
      expect(extractSlots('Hi {{name}}, meet {{ name }} and {{role}}')).toEqual(['name', 'role'])
    })
    it('returns [] when there are no slots', () => {
      expect(extractSlots('A static prompt with [bracket] guidance')).toEqual([])
    })
  })

  describe('registry', () => {
    it('exposes the slot-based studio templates', () => {
      const ids = listTemplates().map(t => t.id)
      expect(ids).toContain('tpl-cold-outreach-email')
      expect(ids).toContain('tpl-blog-outline')
    })

    it('also exposes the broader prompt library', () => {
      expect(listTemplates().length).toBeGreaterThan(3)
    })

    it('summaries omit the body but include slots + version', () => {
      const t = listTemplates().find(t => t.id === 'tpl-cold-outreach-email')
      expect(t).not.toHaveProperty('body')
      expect(t.slots).toContain('company')
      expect(t.version).toMatch(/^v1-[0-9a-f]{8}$/)
    })

    it('filters by category', () => {
      const seo = listTemplates({ category: 'seo' })
      expect(seo.length).toBeGreaterThan(0)
      expect(seo.every(t => t.category === 'seo')).toBe(true)
    })

    it('getTemplate returns the full template with body + extracted slots', () => {
      const t = getTemplate('tpl-cold-outreach-email')
      expect(t.body).toContain('{{company}}')
      expect(t.slots).toEqual(
        expect.arrayContaining(['recipient_role', 'company', 'goal', 'offer', 'cta'])
      )
    })
  })

  describe('versioning', () => {
    it('is deterministic and content-addressed', () => {
      const a = getTemplate('tpl-blog-outline').version
      const b = getTemplate('tpl-blog-outline').version
      expect(a).toBe(b)
      // Different bodies → different versions.
      expect(getTemplate('tpl-blog-outline').version).not.toBe(
        getTemplate('tpl-cold-outreach-email').version
      )
    })
  })

  describe('fillTemplate', () => {
    it('renders every slot from inputs', () => {
      const { prompt, missing } = fillTemplate('tpl-cold-outreach-email', {
        recipient_role: 'Head of Growth',
        company: 'Acme',
        goal: 'book a demo',
        offer: 'our analytics tool',
        cta: 'a 15-min call',
      })
      expect(missing).toEqual([])
      expect(prompt).toContain('Head of Growth')
      expect(prompt).toContain('Acme')
      expect(prompt).not.toContain('{{')
    })

    it('throws with the missing slot names when inputs are incomplete', () => {
      expect.assertions(2)
      try {
        fillTemplate('tpl-cold-outreach-email', { company: 'Acme' })
      } catch (err) {
        expect(err).toBeInstanceOf(TemplateError)
        expect(err.message).toMatch(/recipient_role/)
      }
    })

    it('returns the resolved id + version for traceability', () => {
      const out = fillTemplate('tpl-product-description', {
        product: 'Widget', features: 'fast, cheap', audience: 'makers', voice: 'playful',
      })
      expect(out.templateId).toBe('tpl-product-description')
      expect(out.version).toMatch(/^v1-/)
    })

    it('throws a 404 TemplateError for an unknown id', () => {
      try {
        fillTemplate('does-not-exist', {})
      } catch (err) {
        expect(err).toBeInstanceOf(TemplateError)
        expect(err.status).toBe(404)
      }
    })

    it('non-strict mode renders despite missing slots (leaving them listed)', () => {
      const out = fillTemplate('tpl-blog-outline', { topic: 'AI' }, { strict: false })
      expect(out.missing).toContain('keyword')
      expect(out.prompt).toContain('AI')
    })
  })
})

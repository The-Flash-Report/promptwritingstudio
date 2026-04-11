import { seoUseCases } from '../../data/seo-use-cases'

export default function handler(req, res) {
  const { slug, q } = req.query

  // Return specific use case
  if (slug) {
    const useCase = seoUseCases.find(uc => uc.slug === slug)
    if (!useCase) {
      return res.status(404).json({ error: 'Use case not found' })
    }
    return res.status(200).json({
      slug: useCase.slug,
      title: useCase.h1,
      description: useCase.description,
      url: `https://promptwritingstudio.com/ai-prompt-generator/${useCase.slug}`,
      answerBlock: useCase.answerBlock || null,
      parentKeyword: useCase.parentKeyword,
      relatedKeywords: useCase.relatedKeywords || [],
      examplePrompts: (useCase.examplePrompts || []).map(p => ({
        title: p.title,
        description: p.description,
        prompt: p.prompt
      })),
      faqs: useCase.faqs || []
    })
  }

  // Search use cases
  if (q) {
    const query = q.toLowerCase()
    const results = seoUseCases
      .filter(uc =>
        uc.h1.toLowerCase().includes(query) ||
        uc.description.toLowerCase().includes(query) ||
        (uc.parentKeyword && uc.parentKeyword.toLowerCase().includes(query))
      )
      .slice(0, 20)
      .map(uc => ({
        slug: uc.slug,
        title: uc.h1,
        description: uc.description,
        url: `https://promptwritingstudio.com/ai-prompt-generator/${uc.slug}`
      }))

    return res.status(200).json({ query: q, resultCount: results.length, results })
  }

  // Return full index
  res.status(200).json({
    totalUseCases: seoUseCases.length,
    useCases: seoUseCases.map(uc => ({
      slug: uc.slug,
      title: uc.h1,
      description: uc.description,
      url: `https://promptwritingstudio.com/ai-prompt-generator/${uc.slug}`,
      parentKeyword: uc.parentKeyword
    }))
  })
}

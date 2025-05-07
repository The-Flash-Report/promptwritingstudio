import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

// This would be replaced with actual data from a CMS or API
const seoPages = [
  {
    slug: 'chatgpt-prompt-templates',
    title: 'ChatGPT Prompt Templates - PromptWritingStudio',
    description: 'Discover effective ChatGPT prompt templates for content creation, coding, marketing, and more. Get better results with our expert-crafted prompts.',
    content: {
      heading: 'ChatGPT Prompt Templates',
      subheading: 'Unlock the full potential of ChatGPT with our expert-crafted prompt templates',
      intro: 'ChatGPT is one of the most versatile AI assistants available today, but getting the best results requires well-crafted prompts. Our templates are designed to help you get consistent, high-quality outputs for various use cases.',
      sections: [
        {
          title: 'Content Creation Templates',
          description: 'Templates for blog posts, social media content, email newsletters, and more.',
          examples: ['Blog Outline Generator', 'Social Media Caption Creator', 'Email Subject Line Generator']
        },
        {
          title: 'Business & Marketing Templates',
          description: 'Templates for marketing copy, business plans, customer service responses, and more.',
          examples: ['Product Description Writer', 'Customer Service Response Generator', 'Marketing Campaign Planner']
        },
        {
          title: 'Technical & Development Templates',
          description: 'Templates for code explanation, debugging, documentation, and more.',
          examples: ['Code Explainer', 'Bug Fixing Assistant', 'Technical Documentation Generator']
        }
      ]
    }
  },
  {
    slug: 'claude-prompt-templates',
    title: 'Claude Prompt Templates - PromptWritingStudio',
    description: 'Discover effective Claude prompt templates for content creation, research, analysis, and more. Get better results with our expert-crafted prompts.',
    content: {
      heading: 'Claude Prompt Templates',
      subheading: 'Maximize your results with Anthropic\'s Claude using our specialized prompt templates',
      intro: 'Claude excels at nuanced reasoning, content generation, and following complex instructions. Our templates are designed to leverage Claude\'s strengths for various professional and creative tasks.',
      sections: [
        {
          title: 'Research & Analysis Templates',
          description: 'Templates for literature reviews, data analysis, trend research, and more.',
          examples: ['Literature Review Assistant', 'Data Analysis Helper', 'Trend Research Framework']
        },
        {
          title: 'Creative Writing Templates',
          description: 'Templates for stories, scripts, poems, and other creative content.',
          examples: ['Story Structure Developer', 'Dialogue Generator', 'Character Profile Creator']
        },
        {
          title: 'Professional Document Templates',
          description: 'Templates for reports, proposals, presentations, and more.',
          examples: ['Executive Summary Generator', 'Proposal Framework', 'Presentation Outline Creator']
        }
      ]
    }
  },
  {
    slug: 'gemini-prompt-templates',
    title: 'Gemini Prompt Templates - PromptWritingStudio',
    description: 'Discover effective Gemini prompt templates for multimodal tasks, creative projects, and technical work. Get better results with our expert-crafted prompts.',
    content: {
      heading: 'Gemini Prompt Templates',
      subheading: 'Harness the power of Google\'s Gemini with our specialized prompt templates',
      intro: 'Gemini excels at multimodal tasks, combining text, image, and code understanding. Our templates are designed to help you leverage Gemini\'s unique capabilities for various professional and creative tasks.',
      sections: [
        {
          title: 'Multimodal Analysis Templates',
          description: 'Templates for image analysis, chart interpretation, and visual content creation.',
          examples: ['Image Analysis Framework', 'Chart Interpretation Guide', 'Visual Content Creator']
        },
        {
          title: 'Technical & Scientific Templates',
          description: 'Templates for technical documentation, scientific analysis, and problem-solving.',
          examples: ['Technical Documentation Helper', 'Scientific Paper Summarizer', 'Problem-Solving Framework']
        },
        {
          title: 'Educational Content Templates',
          description: 'Templates for lesson plans, educational materials, and learning resources.',
          examples: ['Lesson Plan Creator', 'Educational Quiz Generator', 'Concept Explanation Framework']
        }
      ]
    }
  }
];

export default function SEOPage({ pageData }) {
  const router = useRouter()
  
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return (
    <Layout title={pageData.title} description={pageData.description}>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.content.heading}</h1>
            <p className="text-xl mb-8">{pageData.content.subheading}</p>
          </div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 mb-8">{pageData.content.intro}</p>
            
            <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Why These Templates Work</h3>
              <p className="text-gray-700">
                Our templates are based on extensive testing and real-world usage. They incorporate best practices for prompt engineering, including clear instructions, context setting, and output formatting guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Template Categories</h2>
            
            <div className="space-y-16">
              {pageData.content.sections.map((section, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-2xl font-bold mb-4 text-indigo-700">{section.title}</h3>
                  <p className="text-gray-700 mb-6">{section.description}</p>
                  
                  <h4 className="font-bold mb-2">Popular Templates:</h4>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {section.examples.map((example, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check-circle text-indigo-600 mr-2"></i>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-bg text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Better Results?</h2>
            <p className="text-xl mb-8">
              Access our full library of templates and start creating better prompts today.
            </p>
            <Link 
              href="/#pricing" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
      
      {/* Related Pages */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore More Templates</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {seoPages
                .filter(page => page.slug !== pageData.slug)
                .map((page, index) => (
                  <Link 
                    key={index} 
                    href={`/${page.slug}`}
                    className="block bg-gray-50 p-6 rounded-xl hover:shadow-md transition"
                  >
                    <h3 className="text-xl font-bold mb-2 text-indigo-700">{page.content.heading}</h3>
                    <p className="text-gray-700">{page.content.subheading}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Filter out the chatgpt-prompt-templates slug to avoid conflict with the static page
  const filteredPages = seoPages.filter(page => page.slug !== 'chatgpt-prompt-templates')
  
  // Get the paths we want to pre-render based on filtered seoPages
  const paths = filteredPages.map((page) => ({
    params: { slug: page.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // Find the page data based on the slug
  const pageData = seoPages.find((page) => page.slug === params.slug)
  
  // If no page data is found, return 404
  if (!pageData) {
    return {
      notFound: true,
    }
  }

  // Pass page data to the page via props
  return {
    props: { pageData },
    // Re-generate the page at most once per day
    // This could be adjusted based on how frequently your content changes
    revalidate: 86400,
  }
}

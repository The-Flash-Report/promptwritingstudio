import Link from 'next/link'
import Script from 'next/script'
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              Prompt Writing Studio
            </Link>
            <p className="mt-2 text-gray-400">Practical guides for building with Claude — Claude Code, MCP, sub-agents, and hooks.</p>
          </div>

          {/* Claude Code Hub */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">⌨️ Claude Code Hub</h4>
            <ul className="space-y-2">
              <li><Link href="/claude-code-guide" className="text-gray-400 hover:text-white transition">Claude Code Guide</Link></li>
              <li><Link href="/claude-code-skills" className="text-gray-400 hover:text-white transition">Skills Catalogue</Link></li>
              <li><Link href="/claude-code-mcp-stack" className="text-gray-400 hover:text-white transition">Minimum Viable MCP Stack</Link></li>
              <li><Link href="/claude-pro-vs-max-vs-api" className="text-gray-400 hover:text-white transition">Pro vs Max vs API</Link></li>
              <li><Link href="/calculators/claude-plan-picker" className="text-gray-400 hover:text-white transition">Claude Plan Picker</Link></li>
              <li><Link href="/claude-md-playbook" className="text-gray-400 hover:text-white transition">CLAUDE.md Playbook</Link></li>
              <li><Link href="/claude-code-hooks-recipes" className="text-gray-400 hover:text-white transition">Claude Code Hooks</Link></li>
              <li><Link href="/skills-vs-mcp-vs-hooks" className="text-gray-400 hover:text-white transition">Skills vs MCP vs Hooks</Link></li>
              <li><Link href="/claude-code-vs-cursor" className="text-gray-400 hover:text-white transition">Claude Code vs Cursor</Link></li>
            </ul>
          </div>

          {/* AI Resources & Learning */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">AI Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/ai-models" className="text-gray-400 hover:text-white transition">AI Models Compared</Link></li>
              <li><Link href="/claude-vs-chatgpt" className="text-gray-400 hover:text-white transition">Claude vs ChatGPT</Link></li>
              <li><Link href="/calculators" className="text-gray-400 hover:text-white transition">AI Calculators</Link></li>
              <li><Link href="/ai-prompt-generator" className="text-gray-400 hover:text-white transition">AI Prompt Generator</Link></li>
              <li><Link href="/ai-prompt-examples" className="text-gray-400 hover:text-white transition">Prompt Examples</Link></li>
              <li><Link href="/best-ai-tools" className="text-gray-400 hover:text-white transition">Best AI Tools</Link></li>
              <li><Link href="/ai-glossary" className="text-gray-400 hover:text-white transition">AI Glossary</Link></li>
              <li><Link href="/ai-history" className="text-gray-400 hover:text-white transition">History of AI</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/sitemap" className="text-gray-400 hover:text-white transition">Sitemap</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/legal-disclaimer" className="text-gray-400 hover:text-white transition">Legal Disclaimer</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="/disclosure" className="text-gray-400 hover:text-white transition">Affiliate Disclosure</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Connect With Us - Full Width Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center">
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://twitter.com/bryanjcollins" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
              <a href="https://www.linkedin.com/in/bryancollinswriter/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
              <a href="https://www.instagram.com/bryancollinswriter/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href="https://www.youtube.com/c/BryanCollins" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><FaYoutube size={24} /></a>
              <a href="https://www.facebook.com/becomeawritertoday/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
            </div>
            <p className="text-gray-400">Stay updated with our latest AI tools and prompt techniques</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Prompt Writing Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

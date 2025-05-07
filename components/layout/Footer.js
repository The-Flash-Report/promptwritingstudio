import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PromptWritingStudio</h3>
            <p className="text-gray-400">Master the art of AI prompt engineering and get better results from any AI platform.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link href="/#features" className="text-gray-400 hover:text-white transition">Features</Link></li>
              <li><Link href="/#pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
              <li><Link href="/#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</Link></li>
              <li><Link href="/#faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com/bryanjcollins" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/bryancollinswriter/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.instagram.com/bryancollinswriter/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/c/BryanCollins" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              <a href="https://www.facebook.com/becomeawritertoday/" className="text-gray-400 hover:text-white transition" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} PromptWritingStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

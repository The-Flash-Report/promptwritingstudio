import Link from 'next/link'

export default function CalculatorBreadcrumbs({ currentTitle }) {
  return (
    <nav className="bg-gray-50 py-4 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">
              Calculators
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600 font-medium">{currentTitle}</li>
        </ol>
      </div>
    </nav>
  )
} 
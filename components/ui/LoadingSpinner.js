export default function LoadingSpinner({ 
  size = 'medium', 
  message = 'Calculating...', 
  showMessage = true 
}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} animate-spin relative`}>
        <div className="w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {showMessage && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          {message}
        </p>
      )}
      
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export function InlineSpinner({ size = 'small' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6'
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin inline-block`}>
      <div className="w-full h-full border-2 border-blue-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
  )
}

export function CalculatorSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Input skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="h-12 bg-gray-200 rounded w-full"></div>
      
      {/* Results skeleton */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { useInView } from '@/app/hooks/useInView'
import { cn } from '@/lib/utils/cn'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const shouldLoad = priority || isInView

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    onError?.()
  }

  return (
    <div
      ref={ref as any}
      className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800', className)}
      style={{ width, height }}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}
      
      {shouldLoad && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
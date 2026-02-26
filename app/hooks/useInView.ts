import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
}

/**
 * Hook that detects if an element is in the viewport
 * @param options - IntersectionObserver options
 * @returns Ref to attach to element and boolean indicating if in view
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) {
  const { triggerOnce = false, threshold = 0.1, root = null, rootMargin = '0px' } = options
  
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        
        if (triggerOnce) {
          if (inView && !hasTriggered) {
            setIsInView(true)
            setHasTriggered(true)
          }
        } else {
          setIsInView(inView)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered])

  return { ref, isInView }
}
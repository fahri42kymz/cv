import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref that is true when the target element is intersecting
 * the viewport. Used to pause physics + rendering when hero is off-screen.
 */
export function useIntersectionPause(threshold = 0.05) {
  const elementRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { elementRef, isVisibleRef, isVisible }
}

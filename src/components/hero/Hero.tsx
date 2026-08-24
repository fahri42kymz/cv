import { Suspense, lazy } from 'react'
import { useIntersectionPause } from '@/hooks/useIntersectionPause'
import { HeroOverlay } from './HeroOverlay'
import styles from './Hero.module.css'

// Lazy-load the heavy 3D canvas
const HeroCanvas = lazy(() =>
  import('./HeroCanvas').then(m => ({ default: m.HeroCanvas }))
)

/**
 * Hero section: full-viewport height.
 * Composes:
 *   1. WebGL canvas (absolute, fills section)
 *   2. HTML overlay (typography, CTAs)
 *   3. Static fallback (if WebGL unavailable)
 *
 * IntersectionObserver pauses rendering when scrolled out of view.
 */
export function Hero() {
  const { elementRef, isVisibleRef, isVisible } = useIntersectionPause(0.05)

  return (
    <section
      ref={elementRef}
      className={styles.hero}
      id="home"
      aria-label="Fahri Kaymaz — Hero"
    >
      {/* 3D Canvas — lazy loaded, wrapped in Suspense */}
      <Suspense fallback={<HeroFallback />}>
        <WebGLWrapper isVisibleRef={isVisibleRef} isVisible={isVisible} />
      </Suspense>

      {/* HTML typography overlay — always visible */}
      <HeroOverlay />

      {/* Scroll indicator */}
      <div className={styles.scrollNote} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

/** WebGL layer with error boundary fallback */
function WebGLWrapper({ isVisibleRef, isVisible }: { isVisibleRef: React.MutableRefObject<boolean>, isVisible: boolean }) {
  return (
    <ErrorBoundary fallback={<HeroFallback />}>
      <HeroCanvas isVisibleRef={isVisibleRef} isVisible={isVisible} />
    </ErrorBoundary>
  )
}

/** Static fallback when WebGL is unavailable */
function HeroFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <img
        src="/ben.png"
        alt=""
        className={styles.fallbackPortrait}
        loading="eager"
      />
    </div>
  )
}

/** Simple error boundary for WebGL failures */
import { Component, type ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

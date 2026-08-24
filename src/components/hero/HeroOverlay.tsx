import { useRef, useEffect, useState } from 'react'
import styles from './HeroOverlay.module.css'

const ROLES = [
  ['WEB UYGULAMA', 'GELİŞTİRME'],
  ['MOBİL UYGULAMA', 'GELİŞTİRME'],
  ['ERP & KURUMSAL', 'YAZILIM ÇÖZÜMLERİ'],
  ['SQL & VERİTABANI', 'ÇÖZÜMLERİ'],
  ['ARAYÜZ & KULLANICI', 'DENEYİMİ GELİŞTİRME'],
]

const DISPLAY_DURATION = 3200 // ms each role is shown
const TRANSITION_DURATION = 520 // ms for the flip animation

/**
 * Kinetic typography overlay.
 * Left: FAHRİ / KAYMAZ + description + CTAs
 * Right: Rotating role pair with masked vertical clip transition
 */
export function HeroOverlay() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [nextRoleIndex, setNextRoleIndex] = useState(1)
  const [phase, setPhase] = useState<'still' | 'out' | 'in'>('still')

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('out')
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setNextRoleIndex(i => (i + 2) % ROLES.length)
        setPhase('in')
        setTimeout(() => setPhase('still'), TRANSITION_DURATION)
      }, TRANSITION_DURATION)
    }, DISPLAY_DURATION)

    return () => clearInterval(timer)
  }, [])

  const currentRole = ROLES[roleIndex]

  return (
    <div className={styles.overlay} aria-label="Hero content">
      {/* ── LEFT COLUMN ──────────────────────────────── */}
      <div className={styles.left}>
        <h1 className={styles.name} aria-label="Fahri Kaymaz">
          <span className={styles.nameLine}>FAHRİ</span>
          <span className={styles.nameLine}>KAYMAZ</span>
        </h1>

        <p className={styles.desc}>
          Web, masaüstü ve veritabanı sistemlerinde<br />hızlı, rafine ve güvenilir dijital ürünler<br />geliştiren yazılım geliştiricisi.
        </p>

        <div className={styles.actions}>
          <a
            className={`${styles.btn} ${styles.btnPrimary}`}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            İletişime geç
          </a>
        </div>
      </div>

      {/* ── RIGHT COLUMN — kinetic role rotator ─────── */}
      <div className={styles.right} aria-live="polite" aria-atomic="true">
        <div className={styles.roleLabel}>ŞU ANDA</div>
        <div className={styles.roleContainer}>
          {currentRole.map((word, i) => (
            <div key={`${roleIndex}-${i}`} className={styles.roleClip}>
              <span
                className={[
                  styles.roleWord,
                  phase === 'out' ? styles.roleWordOut : '',
                  phase === 'in' ? styles.roleWordIn : '',
                  phase === 'still' ? styles.roleWordStill : '',
                ].join(' ')}
                style={{
                  transitionDelay:
                    phase !== 'still' ? `${i * 40}ms` : '0ms',
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

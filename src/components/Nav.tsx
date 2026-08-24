import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.topbar} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a className={styles.brand} href="#home">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className={styles.brandMark} aria-hidden="true" />
          <span>Fahri Kaymaz</span>
        </a>

        <div className={styles.navLinks}>
          <a href="#home">Ana Sayfa</a>
          <a href="#about">Hakkımda</a>
          <a href="#work">Projeler</a>
          <a href="#contact">İletişim</a>
        </div>

        <a className={styles.navCta} href="#contact">
          Konuşalım
        </a>
      </nav>
    </header>
  )
}

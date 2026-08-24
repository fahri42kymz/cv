import { useProgress } from '@react-three/drei'
import styles from './Loader.module.css'
import { useEffect, useState } from 'react'

export function Loader() {
  const { progress, active } = useProgress()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // When R3F finishes loading (active goes false and progress is 100)
    // we want to wait a tiny bit and then fade out.
    if (!active && progress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 800) // soft delay before fade starts
      return () => clearTimeout(timeout)
    }
  }, [active, progress])

  if (!isVisible) return null

  return (
    <div className={`${styles.loader} ${!active && progress === 100 ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Deneyim Yükleniyor...</div>
        <div className={styles.barContainer}>
          <div 
            className={styles.bar} 
            style={{ transform: `scaleX(${progress / 100})` }} 
          />
        </div>
      </div>
    </div>
  )
}

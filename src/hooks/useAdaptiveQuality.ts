import { useEffect, useRef, useState } from 'react'
import { type QualityTier, getBaselineTier } from '@/utils/qualityTier'

const SAMPLE_WINDOW = 60       // frames to measure
const UPGRADE_THRESHOLD = 55   // fps → try higher
const DOWNGRADE_THRESHOLD = 42 // fps → drop lower

/**
 * Starts at mid (or low on mobile), measures real frame-time over a
 * sample window, then upgrades to high or downgrades to low.
 * Returns the current tier and a callback to feed frame deltas.
 */
export function useAdaptiveQuality() {
  const [tier, setTier] = useState<QualityTier>(getBaselineTier)
  const frameTimesRef = useRef<number[]>([])
  const lockedRef = useRef(false) // don't keep oscillating

  const recordFrame = (deltaMs: number) => {
    if (lockedRef.current) return
    const fps = 1000 / deltaMs
    frameTimesRef.current.push(fps)
    if (frameTimesRef.current.length < SAMPLE_WINDOW) return

    const avg =
      frameTimesRef.current.reduce((a, b) => a + b, 0) /
      frameTimesRef.current.length
    frameTimesRef.current = []

    setTier(prev => {
      if (prev === 'mid' && avg >= UPGRADE_THRESHOLD) {
        lockedRef.current = true
        return 'high'
      }
      if (prev === 'mid' && avg < DOWNGRADE_THRESHOLD) {
        lockedRef.current = true
        return 'low'
      }
      if (prev === 'high' && avg < DOWNGRADE_THRESHOLD) {
        return 'mid'
      }
      return prev
    })
  }

  return { tier, recordFrame }
}

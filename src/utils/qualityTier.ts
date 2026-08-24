/* ============================================================
   PERFORMANCE TIER HOOK
   Starts at 'mid', measures real frame-time, adjusts up/down
   ============================================================ */
export type QualityTier = 'high' | 'mid' | 'low'

export interface TierConfig {
  dpr: number
  sphereSegments: number
  sphereCount: number
  useTransmission: boolean
  useShadows: boolean
  envIntensity: number
  dragEnabled: boolean
}

export const TIER_CONFIGS: Record<QualityTier, TierConfig> = {
  high: {
    dpr: window.devicePixelRatio,
    sphereSegments: 64,
    sphereCount: 12,
    useTransmission: true,
    useShadows: false,
    envIntensity: 1.2,
    dragEnabled: true,
  },
  mid: {
    dpr: window.devicePixelRatio,
    sphereSegments: 48,
    sphereCount: 12,
    useTransmission: true,
    useShadows: false,
    envIntensity: 1.0,
    dragEnabled: true,
  },
  low: {
    dpr: window.devicePixelRatio,
    sphereSegments: 24,
    sphereCount: 6,
    useTransmission: false,
    useShadows: false,
    envIntensity: 0.7,
    dragEnabled: false,
  },
}

/** Detect a baseline tier from device hints (mobile → low, else mid) */
export function getBaselineTier(): QualityTier {
  const isMobile =
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  if (isMobile) return 'low'
  return 'mid'
}

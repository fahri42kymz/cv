/* ============================================================
   SPHERE DATA — expanded composition for full background fill
   ~25 spheres, mostly behind portrait (z < 0)
   ============================================================ */

export type MaterialFamily = 'glass' | 'pearl' | 'chrome'

export interface SphereData {
  id: number
  radius: number
  position: [number, number, number]
  material: MaterialFamily
  parallaxFactor: number
  isForeground: boolean
}

/**
 * 25 curated spheres:
 *   ~50% pearl/ceramic  (12-13)
 *   ~35% optical glass  (8-9)
 *   ~15% chrome         (3-4)
 *
 * Mostly negative Z (behind portrait) to fill the background.
 * A few at positive Z on the sides (never over face).
 */
export const SPHERE_DATA: SphereData[] = [
// ── DEEP BACKGROUND (z -2.5 to -3.5) ────────────────────
  { id: 0,  radius: 0.55, position: [-2.8,  1.0, -3.2], material: 'pearl',  parallaxFactor: 0.004, isForeground: false },
  { id: 1,  radius: 0.48, position: [ 2.4,  1.4, -3.0], material: 'glass',  parallaxFactor: 0.004, isForeground: false },
  { id: 2,  radius: 0.42, position: [-1.2,  2.2, -3.5], material: 'pearl',  parallaxFactor: 0.003, isForeground: false },
  { id: 3,  radius: 0.38, position: [ 3.0, -0.5, -3.0], material: 'glass',  parallaxFactor: 0.004, isForeground: false },
  { id: 4,  radius: 0.30, position: [-3.2, -0.8, -2.8], material: 'pearl',  parallaxFactor: 0.005, isForeground: false },
  { id: 5,  radius: 0.28, position: [ 1.0,  2.8, -3.2], material: 'glass',  parallaxFactor: 0.004, isForeground: false },
  { id: 6,  radius: 0.24, position: [-0.5, -2.5, -3.0], material: 'pearl',  parallaxFactor: 0.005, isForeground: false },
  { id: 25, radius: 0.35, position: [ 0.2,  3.2, -3.4], material: 'pearl',  parallaxFactor: 0.004, isForeground: false },
  { id: 26, radius: 0.45, position: [-2.5, -2.2, -3.1], material: 'glass',  parallaxFactor: 0.004, isForeground: false },
  { id: 27, radius: 0.32, position: [ 2.0, -2.5, -3.3], material: 'pearl',  parallaxFactor: 0.003, isForeground: false },
  // ── MID BACKGROUND (z -1.5 to -2.4) ─────────────────────
  { id: 7,  radius: 0.52, position: [-2.2,  0.2, -2.0], material: 'pearl',  parallaxFactor: 0.007, isForeground: false },
  { id: 8,  radius: 0.44, position: [ 2.8,  0.8, -1.8], material: 'glass',  parallaxFactor: 0.007, isForeground: false },
  { id: 9,  radius: 0.35, position: [-1.5, -1.8, -2.2], material: 'chrome', parallaxFactor: 0.007, isForeground: false },
  { id: 10, radius: 0.30, position: [ 1.8,  2.0, -2.0], material: 'pearl',  parallaxFactor: 0.008, isForeground: false },
  { id: 11, radius: 0.26, position: [-3.0,  1.5, -1.8], material: 'glass',  parallaxFactor: 0.008, isForeground: false },
  { id: 12, radius: 0.22, position: [ 3.2, -1.2, -2.0], material: 'pearl',  parallaxFactor: 0.007, isForeground: false },
  { id: 13, radius: 0.20, position: [ 0.6, -2.8, -1.8], material: 'glass',  parallaxFactor: 0.009, isForeground: false },
  { id: 14, radius: 0.18, position: [-2.0,  2.5, -1.6], material: 'pearl',  parallaxFactor: 0.010, isForeground: false },
  { id: 28, radius: 0.38, position: [ 1.5, -1.5, -2.4], material: 'glass',  parallaxFactor: 0.008, isForeground: false },
  { id: 29, radius: 0.25, position: [-1.0,  3.0, -2.1], material: 'pearl',  parallaxFactor: 0.009, isForeground: false },
  { id: 30, radius: 0.33, position: [-3.5, -1.0, -1.9], material: 'chrome', parallaxFactor: 0.008, isForeground: false },
  { id: 31, radius: 0.28, position: [ 0.0, -3.2, -2.3], material: 'pearl',  parallaxFactor: 0.007, isForeground: false },
  // ── NEAR BACKGROUND (z -0.5 to -1.4) ────────────────────
  { id: 15, radius: 0.40, position: [-2.8, -0.5, -1.2], material: 'pearl',  parallaxFactor: 0.012, isForeground: false },
  { id: 16, radius: 0.32, position: [ 2.5,  1.8, -1.0], material: 'chrome', parallaxFactor: 0.012, isForeground: false },
  { id: 17, radius: 0.28, position: [-1.8,  1.0, -0.8], material: 'glass',  parallaxFactor: 0.014, isForeground: false },
  { id: 18, radius: 0.22, position: [ 1.4, -2.2, -1.0], material: 'pearl',  parallaxFactor: 0.013, isForeground: false },
  { id: 19, radius: 0.18, position: [-3.2,  0.8, -0.6], material: 'chrome', parallaxFactor: 0.015, isForeground: false },
  { id: 32, radius: 0.35, position: [ 2.2, -0.2, -1.4], material: 'glass',  parallaxFactor: 0.012, isForeground: false },
  { id: 33, radius: 0.26, position: [-1.2, -2.5, -1.1], material: 'pearl',  parallaxFactor: 0.014, isForeground: false },
  { id: 34, radius: 0.30, position: [ 3.5,  2.5, -1.3], material: 'pearl',  parallaxFactor: 0.011, isForeground: false },
  { id: 35, radius: 0.24, position: [-2.5,  2.8, -0.9], material: 'glass',  parallaxFactor: 0.013, isForeground: false },
  // ── FOREGROUND — sides only, never covering face ──────────
  { id: 20, radius: 0.34, position: [-3.0, -1.5,  0.6], material: 'pearl',  parallaxFactor: 0.020, isForeground: true  },
  { id: 21, radius: 0.26, position: [ 3.2,  0.5,  0.8], material: 'glass',  parallaxFactor: 0.022, isForeground: true  },
  { id: 22, radius: 0.20, position: [-2.6,  1.8,  0.5], material: 'pearl',  parallaxFactor: 0.020, isForeground: true  },
  { id: 23, radius: 0.15, position: [ 2.8, -1.0,  0.7], material: 'pearl',  parallaxFactor: 0.022, isForeground: true  },
  { id: 24, radius: 0.12, position: [ 3.4,  2.0,  0.4], material: 'glass',  parallaxFactor: 0.018, isForeground: true  },
  { id: 36, radius: 0.28, position: [-3.8,  0.0,  0.9], material: 'pearl',  parallaxFactor: 0.025, isForeground: true  },
  { id: 37, radius: 0.18, position: [ 3.8, -2.0,  0.6], material: 'chrome', parallaxFactor: 0.020, isForeground: true  },
  { id: 38, radius: 0.22, position: [-2.0, -3.2,  0.4], material: 'glass',  parallaxFactor: 0.021, isForeground: true  },
  { id: 39, radius: 0.16, position: [ 2.0,  3.5,  0.8], material: 'pearl',  parallaxFactor: 0.023, isForeground: true  },
]

/** Reduced set for mobile / low tier */
export const SPHERE_DATA_LOW: SphereData[] = [
  { id: 0,  radius: 0.55, position: [-2.8,  1.0, -3.2], material: 'pearl',  parallaxFactor: 0.004, isForeground: false },
  { id: 1,  radius: 0.48, position: [ 2.4,  1.4, -3.0], material: 'pearl',  parallaxFactor: 0.004, isForeground: false },
  { id: 2,  radius: 0.42, position: [-1.2,  2.2, -2.5], material: 'glass',  parallaxFactor: 0.005, isForeground: false },
  { id: 3,  radius: 0.35, position: [ 3.0, -0.5, -2.0], material: 'pearl',  parallaxFactor: 0.007, isForeground: false },
  { id: 4,  radius: 0.52, position: [-2.2,  0.2, -2.0], material: 'pearl',  parallaxFactor: 0.007, isForeground: false },
  { id: 5,  radius: 0.26, position: [ 2.8,  0.8, -1.2], material: 'chrome', parallaxFactor: 0.012, isForeground: false },
  { id: 6,  radius: 0.30, position: [-2.8, -0.5, -1.0], material: 'pearl',  parallaxFactor: 0.014, isForeground: false },
  { id: 7,  radius: 0.20, position: [ 3.2,  0.5,  0.7], material: 'glass',  parallaxFactor: 0.022, isForeground: true  },
]

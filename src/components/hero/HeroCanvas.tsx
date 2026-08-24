import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAdaptiveQuality } from '@/hooks/useAdaptiveQuality'
import { TIER_CONFIGS } from '@/utils/qualityTier'
import { StudioLighting } from './StudioLighting'
import { EnvironmentSetup } from './EnvironmentSetup'
import { PortraitPlane } from './PortraitPlane'
import { SphereSystem } from './SphereSystem'
import * as THREE from 'three'

interface HeroCanvasProps {
  isVisibleRef: React.MutableRefObject<boolean>
  isVisible: boolean
}

/**
 * The R3F Canvas for the hero.
 * ACESFilmic tonemapping, sRGB output, adaptive DPR.
 * Uses frameloop="demand" when off-screen to save battery.
 */
export function HeroCanvas({ isVisibleRef, isVisible }: HeroCanvasProps) {
  const { tier, recordFrame } = useAdaptiveQuality()
  const config = TIER_CONFIGS[tier]
  const parallaxRef = useRef({ x: 0, y: 0 })

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      dpr={config.dpr}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 42,
        near: 0.1,
        far: 30,
        position: [0, 0, 6],
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0xf6f5f1, 1)
      }}
      frameloop={isVisible ? 'always' : 'demand'}
    >
      <FrameTimeSampler onFrame={recordFrame} isVisibleRef={isVisibleRef} />

      <StudioLighting envIntensity={config.envIntensity} />
      <EnvironmentSetup intensity={config.envIntensity} />

      <Suspense fallback={null}>
        <PortraitPlane parallaxRef={parallaxRef} />
        <SphereSystem
          tierConfig={config}
          parallaxRef={parallaxRef}
          isVisibleRef={isVisibleRef}
          isVisible={isVisible}
        />
      </Suspense>
    </Canvas>
  )
}

/** Inner component that samples frame delta — must be inside Canvas */
function FrameTimeSampler({
  onFrame,
  isVisibleRef,
}: {
  onFrame: (deltaMs: number) => void
  isVisibleRef: React.MutableRefObject<boolean>
}) {
  useFrame((_state, delta) => {
    if (isVisibleRef.current) {
      onFrame(delta * 1000)
    }
  })
  return null
}

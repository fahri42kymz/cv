import { useRef, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import {
  TextureLoader,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  type Mesh,
} from 'three'

interface PortraitPlaneProps {
  parallaxRef: React.MutableRefObject<{ x: number; y: number }>
}

// Portrait is 1024×1536 — keep 2:3 ratio
const PORTRAIT_WIDTH = 3.4
const PORTRAIT_HEIGHT = PORTRAIT_WIDTH * (1536 / 1024)
const PORTRAIT_Z = 0.0
const PARALLAX_FACTOR = 0.003

/**
 * The user's transparent portrait as a Three.js plane at the center depth layer.
 *
 * Key: texture.colorSpace MUST be SRGBColorSpace so Three.js applies correct
 * gamma conversion. Without this, colors appear washed-out / desaturated
 * because the renderer treats the data as linear light.
 */
export function PortraitPlane({ parallaxRef }: PortraitPlaneProps) {
  const meshRef = useRef<Mesh>(null!)

  // Load with explicit SRGB color space — preserves natural photo colors
  const texture = useLoader(TextureLoader, `${import.meta.env.BASE_URL}ben.png`)
  texture.colorSpace = SRGBColorSpace

  const baseY = -0.4

  const geometry = useMemo(
    () => new PlaneGeometry(PORTRAIT_WIDTH, PORTRAIT_HEIGHT),
    []
  )

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.01,
        depthWrite: false,
        // toneMapped: false prevents ACES from touching the portrait pixels —
        // keeps skin tones and suit color exactly as they appear in the photo
        toneMapped: false,
      }),
    [texture]
  )

  useFrame(() => {
    if (!meshRef.current) return
    const { x, y } = parallaxRef.current
    meshRef.current.position.x = x * PARALLAX_FACTOR
    meshRef.current.position.y = baseY + y * PARALLAX_FACTOR
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, baseY, PORTRAIT_Z]}
      renderOrder={1}
    />
  )
}

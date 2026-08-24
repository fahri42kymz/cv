import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { RectAreaLight, Vector3 } from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

RectAreaLightUniformsLib.init()

interface StudioLightingProps {
  envIntensity?: number
}

/**
 * Studio lighting rig:
 *   - Large RectAreaLight key (soft warm, upper-left)
 *   - RectAreaLight fill (cool-white, upper-right, lower intensity)
 *   - DirectionalLight rim (from behind-right)
 *   - HemisphereLight (sky/ground ambient)
 */
export function StudioLighting({ envIntensity = 1.0 }: StudioLightingProps) {
  const keyRef = useRef<RectAreaLight>(null!)
  const fillRef = useRef<RectAreaLight>(null!)

  useEffect(() => {
    const origin = new Vector3(0, 0, 0)
    if (keyRef.current) keyRef.current.lookAt(origin)
    if (fillRef.current) fillRef.current.lookAt(origin)
  }, [])

  return (
    <>
      {/* Key — large soft softbox, warm white, upper-left */}
      <rectAreaLight
        ref={keyRef}
        width={4}
        height={3}
        color="#fff8f0"
        intensity={envIntensity * 18}
        position={[-3.5, 3.5, 3]}
      />

      {/* Fill — cooler, right side */}
      <rectAreaLight
        ref={fillRef}
        width={3}
        height={2.5}
        color="#eef4ff"
        intensity={envIntensity * 8}
        position={[3.5, 2.5, 2.5]}
      />

      {/* Rim — creates edge separation from background */}
      <directionalLight
        color="#c8d8ff"
        intensity={envIntensity * 1.2}
        position={[1.5, 2, -4]}
      />

      {/* Hemisphere ambient — sky cool, ground warm-grey */}
      <hemisphereLight
        color="#dde8ff"
        groundColor="#f5f0e8"
        intensity={envIntensity * 0.6}
      />
    </>
  )
}

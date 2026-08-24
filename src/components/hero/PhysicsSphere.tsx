import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { SphereGeometry, type Mesh, type Material } from 'three'
import { type SphereData } from '@/utils/sphereData'
import {
  createGlassMaterial,
  createPearlMaterial,
  createChromeMaterial,
} from './materials'
import { type TierConfig } from '@/utils/qualityTier'

interface PhysicsSphereProps {
  data: SphereData
  tierConfig: TierConfig
  // Repulsion cursor world-space position, shared from SphereSystem
  cursorWorldRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>
}

const REPULSE_RADIUS = 2.5    // world-space units
const REPULSE_STRENGTH = 25   // slightly stronger to overcome damping
const MAX_VELOCITY = 3.5      // increased to allow faster bouncing/escaping

/**
 * A single physics-driven sphere.
 */
export function PhysicsSphere({
  data,
  tierConfig,
  cursorWorldRef,
}: PhysicsSphereProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null!)
  const meshRef = useRef<Mesh>(null!)

  const geometry = useMemo(
    () => new SphereGeometry(data.radius, tierConfig.sphereSegments, tierConfig.sphereSegments),
    [data.radius, tierConfig.sphereSegments]
  )

  const material = useMemo<Material>(() => {
    const intensity = tierConfig.envIntensity
    switch (data.material) {
      case 'glass':  return createGlassMaterial(intensity, tierConfig.useTransmission)
      case 'pearl':  return createPearlMaterial(intensity)
      case 'chrome': return createChromeMaterial(intensity)
    }
  }, [data.material, tierConfig.envIntensity, tierConfig.useTransmission])

  useFrame((_state, delta) => {
    const body = rigidBodyRef.current
    if (!body) return

    // Limit maximum velocity to prevent glitchy fast movement
    const vel = body.linvel()
    const speedSq = vel.x * vel.x + vel.y * vel.y + vel.z * vel.z
    if (speedSq > MAX_VELOCITY * MAX_VELOCITY) {
      const speed = Math.sqrt(speedSq)
      body.setLinvel({
        x: (vel.x / speed) * MAX_VELOCITY,
        y: (vel.y / speed) * MAX_VELOCITY,
        z: (vel.z / speed) * MAX_VELOCITY,
      }, true)
    }

    const pos = body.translation()

    const cursor = cursorWorldRef.current
    if (!cursor.active) return

    // Distance from cursor in XY plane only
    const dx = pos.x - cursor.x
    const dy = pos.y - cursor.y
    const distSq = dx * dx + dy * dy
    const dist = Math.sqrt(distSq)

    // Increase min distance to prevent infinite force when cursor is exactly on center
    if (dist < REPULSE_RADIUS && dist > 0.1) {
      // Smoother falloff
      const falloff = Math.pow(1 - dist / REPULSE_RADIUS, 2)
      
      // If the sphere is trapped in a corner (high |x| or |y|), we reverse the mouse force 
      // so it shoots back inwards instead of pinning it against the wall.
      const isTrapped = (Math.abs(pos.x) > 3.5 || Math.abs(pos.y) > 2.5)
      const directionMult = isTrapped ? -1.5 : 1 // Reverse and boost force if trapped
      
      const force = REPULSE_STRENGTH * falloff * delta * directionMult

      body.wakeUp()
      body.applyImpulse(
        {
          x: (dx / dist) * force,
          y: (dy / dist) * force,
          z: 0,
        },
        true
      )
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="ball"
      position={data.position}
      linearDamping={0.3}
      angularDamping={0.3}
      restitution={1.4}
      friction={0.1}
      mass={Math.max(0.4, data.radius * data.radius * 6)}
      gravityScale={0}
      canSleep={true}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        castShadow={false}
        receiveShadow={false}
      />
    </RigidBody>
  )
}

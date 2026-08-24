import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { Vector3, Raycaster, Plane, Vector2 } from 'three'
import { SPHERE_DATA, SPHERE_DATA_LOW } from '@/utils/sphereData'
import { PhysicsSphere } from './PhysicsSphere'
import { type TierConfig } from '@/utils/qualityTier'

interface SphereSystemProps {
  tierConfig: TierConfig
  parallaxRef: React.MutableRefObject<{ x: number; y: number }>
  isVisibleRef: React.MutableRefObject<boolean>
  isVisible: boolean
}

/**
 * Full sphere system: Physics world + all spheres.
 *
 * Interaction: particles.js-style global repulsion.
 *   - pointermove → unproject cursor to world XY
 *   - each sphere reads cursorWorldRef every frame
 *   - spheres within radius get outward impulse — no click, no grab
 */
export function SphereSystem({ tierConfig, parallaxRef, isVisibleRef, isVisible }: SphereSystemProps) {
  const { camera, gl } = useThree()

  // Shared cursor world position — written here, read by every PhysicsSphere
  const cursorWorldRef = useRef({ x: 0, y: 0, active: false })
  const pointerNDC = useRef(new Vector2())
  const dragPlane = useMemo(() => new Plane(new Vector3(0, 0, 0), 0), [])
  const worldPos = useMemo(() => new Vector3(), [])

  const sphereData = tierConfig.sphereCount <= 8 ? SPHERE_DATA_LOW : SPHERE_DATA

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )

      // Update parallax for portrait + text
      parallaxRef.current = {
        x: pointerNDC.current.x,
        y: pointerNDC.current.y,
      }

      // Unproject NDC cursor to world-space XY at z=0 (portrait plane)
      // Use camera unproject at portrait Z depth
      worldPos.set(pointerNDC.current.x, pointerNDC.current.y, 0.5)
      worldPos.unproject(camera)
      const dir = worldPos.sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      const cursorWorld = camera.position.clone().add(dir.multiplyScalar(dist))

      cursorWorldRef.current = {
        x: cursorWorld.x,
        y: cursorWorld.y,
        active: true,
      }
    },
    [camera, gl.domElement, parallaxRef, worldPos]
  )

  const onPointerLeave = useCallback(() => {
    cursorWorldRef.current = { x: 0, y: 0, active: false }
  }, [])

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    return () => {
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [gl.domElement, onPointerMove, onPointerLeave])

  return (
    <Physics
      gravity={[0, 0, 0]}
      timeStep={1 / 60}
      paused={!isVisible}
    >
      {/* Invisible boundary walls - thick to prevent tunneling, full box to trap spheres */}
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -3.5, 0]} restitution={1}>
        <mesh><boxGeometry args={[20, 2, 20]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Ceiling */}
      <RigidBody type="fixed" position={[0, 3.5, 0]} restitution={1}>
        <mesh><boxGeometry args={[20, 2, 20]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Left Wall */}
      <RigidBody type="fixed" position={[-5, 0, 0]} restitution={1}>
        <mesh><boxGeometry args={[2, 20, 20]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Right Wall */}
      <RigidBody type="fixed" position={[5, 0, 0]} restitution={1}>
        <mesh><boxGeometry args={[2, 20, 20]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Back Wall */}
      <RigidBody type="fixed" position={[0, 0, -4.5]} restitution={1}>
        <mesh><boxGeometry args={[20, 20, 2]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      {/* Front Wall */}
      <RigidBody type="fixed" position={[0, 0, 2.5]} restitution={1}>
        <mesh><boxGeometry args={[20, 20, 2]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>

      {sphereData.map(data => (
        <PhysicsSphere
          key={data.id}
          data={data}
          tierConfig={tierConfig}
          cursorWorldRef={cursorWorldRef}
        />
      ))}
    </Physics>
  )
}


import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

interface EnvironmentSetupProps {
  intensity?: number
}

/**
 * Procedural studio environment using Three.js RoomEnvironment.
 * Provides realistic reflections for PBR materials without an HDRI file.
 */
export function EnvironmentSetup({ intensity = 1.0 }: EnvironmentSetupProps) {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    pmrem.compileEquirectangularShader()
    const envMap = pmrem.fromScene(new RoomEnvironment()).texture
    scene.environment = envMap
    scene.backgroundIntensity = intensity
    return () => {
      pmrem.dispose()
      envMap.dispose()
    }
  }, [gl, scene, intensity])

  return null
}

import { useMemo } from 'react'
import { MeshPhysicalMaterial, MeshStandardMaterial, Color } from 'three'

/**
 * Material factory functions.
 * Each returns a new material instance (share geometry, not materials —
 * because each sphere may need its own envMapIntensity for depth cues).
 */

export function createGlassMaterial(envIntensity: number, useTransmission: boolean) {
  if (useTransmission) {
    return new MeshPhysicalMaterial({
      transmission: 0.96,
      thickness: 0.55,
      roughness: 0.05,
      ior: 1.46,
      envMapIntensity: envIntensity * 1.1,
      color: new Color('#d4e4f8'),
      transparent: true,
      attenuationDistance: 4,
      attenuationColor: new Color('#e8f0ff'),
    })
  }
  // Fallback for low tier — fake glass with opacity
  return new MeshStandardMaterial({
    color: new Color('#d4e4f8'),
    roughness: 0.08,
    metalness: 0.1,
    opacity: 0.72,
    transparent: true,
    envMapIntensity: envIntensity * 0.9,
  })
}

export function createPearlMaterial(envIntensity: number) {
  return new MeshPhysicalMaterial({
    color: new Color('#f7f6f3'),
    roughness: 0.22,
    metalness: 0.0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.12,
    sheen: 0.15,
    sheenColor: new Color('#e8ecf8'),
    envMapIntensity: envIntensity * 0.95,
  })
}

export function createChromeMaterial(envIntensity: number) {
  return new MeshStandardMaterial({
    color: new Color('#d0d5e0'),
    roughness: 0.08,
    metalness: 0.96,
    envMapIntensity: envIntensity * 1.35,
  })
}

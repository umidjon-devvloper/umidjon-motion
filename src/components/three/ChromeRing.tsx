import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

interface ChromeRingProps {
  scale?: number;
  spin?: number;
  reduced?: boolean;
}

/**
 * The signature centerpiece: a large metallic chrome torus with thin neon
 * orbital rings and small orbiting glass spheres. Reused in hero + final CTA.
 */
export function ChromeRing({
  scale = 1,
  spin = 0.12,
  reduced = false,
}: ChromeRingProps) {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (group.current) group.current.rotation.y += delta * spin;
    if (inner.current) {
      inner.current.rotation.z += delta * spin * 2.1;
      inner.current.rotation.x += delta * spin * 0.6;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Main chrome torus */}
      <mesh rotation={[Math.PI / 2.6, 0, 0]} castShadow>
        <torusGeometry args={[1.5, 0.42, 48, 160]} />
        <meshStandardMaterial
          color="#c7ccd6"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Thin neon orbital rings */}
      <group ref={inner}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.25, 0.012, 16, 200]} />
          <meshStandardMaterial
            color="#c8ff42"
            emissive="#c8ff42"
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.1, 0.5, 0.3]}>
          <torusGeometry args={[2.7, 0.009, 16, 200]} />
          <meshStandardMaterial
            color="#8b70ff"
            emissive="#8b70ff"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Orbiting glass + metal spheres */}
      <OrbitBead radius={2.25} speed={0.6} size={0.16} reduced={reduced} glass />
      <OrbitBead
        radius={2.7}
        speed={-0.42}
        size={0.12}
        phase={2.1}
        reduced={reduced}
      />
      <OrbitBead
        radius={2.0}
        speed={0.8}
        size={0.1}
        phase={4.0}
        reduced={reduced}
        glass
      />
    </group>
  );
}

function OrbitBead({
  radius,
  speed,
  size,
  phase = 0,
  reduced = false,
  glass = false,
}: {
  radius: number;
  speed: number;
  size: number;
  phase?: number;
  reduced?: boolean;
  glass?: boolean;
}) {
  const ref = useRef<Mesh>(null);
  const t = useRef(phase);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!reduced) t.current += delta * speed;
    const a = t.current;
    ref.current.position.set(
      Math.cos(a) * radius,
      Math.sin(a * 1.3) * 0.5,
      Math.sin(a) * radius,
    );
  });

  return (
    <Float speed={reduced ? 0 : 2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 32, 32]} />
        {glass ? (
          <meshPhysicalMaterial
            transmission={0.95}
            thickness={0.5}
            roughness={0.05}
            ior={1.4}
            color="#ffffff"
            metalness={0}
          />
        ) : (
          <meshStandardMaterial
            color="#eef0f4"
            metalness={1}
            roughness={0.08}
            envMapIntensity={1.4}
          />
        )}
      </mesh>
    </Float>
  );
}

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import { ChromeRing } from "./ChromeRing";
import { VideoScreen } from "./VideoScreen";

interface HeroSceneProps {
  active: boolean;
  reduced: boolean;
  dpr: [number, number];
  quality: "high" | "low";
  isMobile: boolean;
}

/** Camera rig: mouse parallax + subtle scroll-based positioning. */
function Rig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const group = useRef<Group>(null);
  const scroll = useRef(0);

  useFrame((state, delta) => {
    scroll.current = window.scrollY;
    const p = reduced ? 0 : 1;

    // Mouse parallax on the whole scene group.
    if (group.current) {
      const tx = state.pointer.x * 0.35 * p;
      const ty = state.pointer.y * 0.25 * p;
      group.current.rotation.y +=
        (tx - group.current.rotation.y) * Math.min(1, delta * 2.5);
      group.current.rotation.x +=
        (-ty - group.current.rotation.x) * Math.min(1, delta * 2.5);
    }

    // Camera drifts in as the hero scrolls out of view.
    const vh = window.innerHeight || 1;
    const prog = Math.min(1, scroll.current / vh);
    const targetZ = 7 - prog * 1.2;
    const targetY = 0.2 + prog * 0.8;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return <group ref={group} />;
}

export function HeroScene({
  active,
  reduced,
  dpr,
  quality,
  isMobile,
}: HeroSceneProps) {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0.2, isMobile ? 8.4 : 7], fov: isMobile ? 48 : 42 }}
      dpr={dpr}
      gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      {/* Transparent canvas lets the generated campaign art sit behind the live 3D accents. */}
      <fog attach="fog" args={["#07080c", 9, 18]} />

      <ambientLight intensity={0.35} />
      <spotLight
        position={[5, 6, 6]}
        angle={0.4}
        penumbra={1}
        intensity={120}
        color="#ffffff"
      />
      <pointLight position={[-6, -2, -4]} intensity={40} color="#8b70ff" />
      <pointLight position={[4, -3, 3]} intensity={30} color="#c8ff42" />

      <Suspense fallback={null}>
        <Rig reduced={reduced} />

        {/* Desktop: composition on the right half so it never covers copy.
            Mobile: centered + lower so it reads as a lightweight hero. */}
        <group
          position={isMobile ? [0, -0.6, 0] : [1.9, 0.1, 0]}
          scale={isMobile ? 0.82 : 1}
        >
          <ChromeRing scale={1} reduced={reduced} />
          {/* Floating video screen in front-left of the ring */}
          <group
            position={isMobile ? [-1.0, 0.1, 1.6] : [-1.25, 0.1, 1.5]}
            rotation={[0, 0.35, 0]}
            scale={isMobile ? 0.85 : 1}
          >
            <VideoScreen reduced={reduced} />
          </group>
        </group>

        {!reduced && (
          <Sparkles
            count={quality === "high" ? 80 : 36}
            scale={[12, 8, 6]}
            size={2}
            speed={0.3}
            opacity={0.5}
            color="#c8ff42"
          />
        )}

        <Environment resolution={quality === "high" ? 256 : 128}>
          <Lightformer
            intensity={2}
            position={[0, 4, 4]}
            scale={[8, 8, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={3}
            position={[-5, 1, 1]}
            scale={[3, 8, 1]}
            color="#8b70ff"
          />
          <Lightformer
            intensity={3}
            position={[5, -1, 1]}
            scale={[3, 8, 1]}
            color="#c8ff42"
          />
          <Lightformer
            intensity={1.5}
            position={[0, -4, 2]}
            scale={[8, 4, 1]}
            color="#3ad6c5"
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

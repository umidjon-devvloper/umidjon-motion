import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import { ChromeRing } from "../three/ChromeRing";

interface Props {
  active: boolean;
  reduced: boolean;
  dpr: [number, number];
  quality: "high" | "low";
  sectionRef: React.RefObject<HTMLElement>;
}

function CtaRig({
  reduced,
  sectionRef,
}: {
  reduced: boolean;
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const el = sectionRef.current;
    let prog = 0.5;
    if (el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as the section enters from below, 1 as it leaves the top
      prog = 1 - (r.top + r.height / 2) / (vh + r.height / 2);
      prog = Math.min(1, Math.max(0, prog));
    }
    const p = reduced ? 0 : 1;
    const targetZ = 9 - prog * 3.2; // dolly in as we reach the section
    const targetY = -1.2 + prog * 1.6;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 1.8);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 1.8);
    camera.position.x += (state.pointer.x * 1.2 * p - camera.position.x) * Math.min(1, delta * 2);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function CtaScene({ active, reduced, dpr, quality, sectionRef }: Props) {
  return (
    <Canvas
      className="cta-canvas"
      camera={{ position: [0, -1.2, 9], fov: 44 }}
      dpr={dpr}
      gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <color attach="background" args={["#07080c"]} />
      <fog attach="fog" args={["#07080c", 8, 20]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[6, 8, 6]} angle={0.4} penumbra={1} intensity={140} />
      <pointLight position={[-6, -2, -4]} intensity={50} color="#8b70ff" />
      <pointLight position={[5, -3, 4]} intensity={40} color="#c8ff42" />

      <Suspense fallback={null}>
        <CtaRig reduced={reduced} sectionRef={sectionRef} />
        <group scale={1.35}>
          <ChromeRing reduced={reduced} spin={0.08} />
        </group>
        {!reduced && (
          <Sparkles
            count={quality === "high" ? 70 : 30}
            scale={[14, 10, 8]}
            size={2.2}
            speed={0.25}
            opacity={0.5}
            color="#8b70ff"
          />
        )}
        <Environment resolution={quality === "high" ? 256 : 128}>
          <Lightformer intensity={2} position={[0, 4, 4]} scale={[9, 9, 1]} color="#ffffff" />
          <Lightformer intensity={3} position={[-5, 1, 1]} scale={[3, 9, 1]} color="#8b70ff" />
          <Lightformer intensity={3} position={[5, -1, 1]} scale={[3, 9, 1]} color="#c8ff42" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

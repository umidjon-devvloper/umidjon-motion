import { Float } from "@react-three/drei";
import { useMemo } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";

/**
 * A floating vertical "video preview" screen for the hero centerpiece.
 * Uses a generated gradient canvas texture (honest demo preview, no GPU
 * video-texture cost) with a glowing accent frame.
 */
export function VideoScreen({ reduced = false }: { reduced?: boolean }) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 896;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 512, 896);
    grad.addColorStop(0, "#1a2a12");
    grad.addColorStop(0.5, "#141826");
    grad.addColorStop(1, "#070810");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 896);

    // soft radial glow
    const rg = ctx.createRadialGradient(256, 360, 20, 256, 360, 360);
    rg.addColorStop(0, "rgba(200,255,66,0.35)");
    rg.addColorStop(1, "rgba(200,255,66,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, 512, 896);

    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= 512; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 896);
      ctx.stroke();
    }
    for (let y = 0; y <= 896; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // play triangle
    ctx.fillStyle = "#c8ff42";
    ctx.beginPath();
    ctx.arc(256, 430, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0b0f";
    ctx.beginPath();
    ctx.moveTo(238, 400);
    ctx.lineTo(238, 460);
    ctx.lineTo(288, 430);
    ctx.closePath();
    ctx.fill();

    // labels
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 26px Inter, sans-serif";
    ctx.fillText("MOTION PREVIEW", 60, 760);
    ctx.fillStyle = "rgba(200,255,66,0.9)";
    ctx.font = "700 20px Inter, sans-serif";
    ctx.fillText("● LIVE CONCEPT", 60, 720);

    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    return tex;
  }, []);

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={0.25}
      floatIntensity={0.9}
    >
      <group position={[0, 0, 0.1]}>
        {/* glowing frame */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[1.42, 2.42]} />
          <meshStandardMaterial
            color="#c8ff42"
            emissive="#c8ff42"
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
        {/* screen */}
        <mesh>
          <planeGeometry args={[1.32, 2.32]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

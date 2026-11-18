import { useEffect, useRef } from "react";
import { useCursor } from "../../lib/cursor";
import { useHasFinePointer, usePrefersReducedMotion } from "../../lib/hooks";
import "./cursor.css";

const LABELS: Record<string, string> = {
  drag: "DRAG",
  view: "VIEW",
  play: "PLAY",
};

export function CustomCursor() {
  const { variant } = useCursor();
  const fine = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const enabled = fine; // disabled on touch devices
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>();

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (reduced) {
        // Snap instantly when reduced motion is requested.
        pos.current = { ...target.current };
        apply();
      }
    };

    const apply = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot)
        dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      if (ring)
        ring.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };

    const loop = () => {
      // Inertia: ease ring toward the pointer, dot follows faster.
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      apply();
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduced) raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  const label = LABELS[variant];

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring cursor-ring--${variant}`}
        aria-hidden="true"
      >
        {label && <span className="cursor-ring__label">{label}</span>}
      </div>
    </>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

interface UseOrbitOptions {
  count: number;
  /** degrees per second of idle autorotation */
  autoSpeed?: number;
  /** whether external conditions allow autoplay (in view, tab visible) */
  canAutoplay: boolean;
  reduced: boolean;
}

export interface OrbitState {
  /** live rotation in degrees (negative = clockwise forward) */
  rotation: number;
  activeIndex: number;
  playing: boolean;
  dragging: boolean;
  step: number;
}

export interface OrbitControls {
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
  togglePlay: () => void;
  setPlaying: (v: boolean) => void;
  setHovered: (v: boolean) => void;
  onPointerDown: (e: React.PointerEvent) => void;
}

/**
 * Spring-ish orbit controller: drag to rotate with momentum + snap,
 * continuous autoplay, keyboard-free programmatic nav. Uses a single rAF.
 */
export function useOrbit({
  count,
  autoSpeed = 7,
  canAutoplay,
  reduced,
}: UseOrbitOptions): [OrbitState, OrbitControls] {
  const step = 360 / count;

  const rotation = useRef(0);
  const target = useRef(0);
  const velocity = useRef(0); // deg/sec from flicks
  const dragging = useRef(false);
  const hovered = useRef(false);
  const dragStart = useRef({ x: 0, rot: 0, t: 0, lastX: 0, lastT: 0 });

  const [playing, setPlaying] = useState(!reduced);
  const [activeIndex, setActiveIndex] = useState(0);
  const [, force] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const canAutoplayRef = useRef(canAutoplay);
  canAutoplayRef.current = canAutoplay;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  const normIndex = useCallback(
    (rot: number) => {
      const i = Math.round(-rot / step) % count;
      return (i + count) % count;
    },
    [count, step],
  );

  // rAF loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!dragging.current) {
        // momentum
        if (Math.abs(velocity.current) > 1) {
          target.current += velocity.current * delta;
          velocity.current *= 0.92;
        } else {
          velocity.current = 0;
          const autoActive =
            playingRef.current &&
            canAutoplayRef.current &&
            !hovered.current &&
            !reduced;
          if (autoActive) {
            target.current -= autoSpeed * delta;
          } else {
            // snap to nearest card
            const snapped = Math.round(target.current / step) * step;
            target.current += (snapped - target.current) * 0.12;
          }
        }
        // ease rotation toward target
        rotation.current += (target.current - rotation.current) * Math.min(1, delta * 8);
      } else {
        rotation.current += (target.current - rotation.current) * Math.min(1, delta * 18);
      }

      const idx = normIndex(rotation.current);
      setActiveIndex((prev) => (prev === idx ? prev : idx));
      force((n) => (n + 1) % 1_000_000);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoSpeed, normIndex, reduced, step]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    target.current = dragStart.current.rot + dx * 0.35;
    const now = performance.now();
    const dt = now - dragStart.current.lastT;
    if (dt > 0) {
      const vx = (e.clientX - dragStart.current.lastX) / dt; // px per ms
      velocity.current = vx * 0.35 * 1000; // -> deg/sec
    }
    dragStart.current.lastX = e.clientX;
    dragStart.current.lastT = now;
  }, []);

  const endDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
  }, [onPointerMove]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      setIsDragging(true);
      velocity.current = 0;
      const now = performance.now();
      dragStart.current = {
        x: e.clientX,
        rot: rotation.current,
        t: now,
        lastX: e.clientX,
        lastT: now,
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", endDrag);
    },
    [onPointerMove, endDrag],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
    };
  }, [onPointerMove, endDrag]);

  const next = useCallback(() => {
    velocity.current = 0;
    target.current -= step;
  }, [step]);

  const prev = useCallback(() => {
    velocity.current = 0;
    target.current += step;
  }, [step]);

  const goTo = useCallback(
    (i: number) => {
      velocity.current = 0;
      const current = normIndex(target.current);
      let diff = ((i - current + count) % count);
      if (diff > count / 2) diff -= count;
      target.current -= diff * step;
    },
    [count, normIndex, step],
  );

  const togglePlay = useCallback(() => setPlaying((v) => !v), []);
  const setHovered = useCallback((v: boolean) => {
    hovered.current = v;
  }, []);

  return [
    { rotation: rotation.current, activeIndex, playing, dragging: isDragging, step },
    { next, prev, goTo, togglePlay, setPlaying, setHovered, onPointerDown },
  ];
}

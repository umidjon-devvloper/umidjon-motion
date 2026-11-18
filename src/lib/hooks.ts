import { useEffect, useMemo, useRef, useState } from "react";

/** Generic matchMedia hook (SSR-safe-ish, guards for older browsers). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on devices with a precise pointer (mouse/trackpad) — gate custom cursor. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

/** Detects WebGL availability once. Returns null while unknown. */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

/** Document visibility (pause rendering / autoplay when tab hidden). */
export function useDocumentVisible(): boolean {
  const [visible, setVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return visible;
}

/**
 * IntersectionObserver hook — returns [ref, inView]. Used to pause
 * offscreen 3D scenes / videos and lazy-mount heavy canvases.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: "0px", threshold: 0.1 },
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  // Keep options stable across renders.
  const opts = useMemo(
    () => options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.root, options.rootMargin, JSON.stringify(options.threshold)],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, opts);
    observer.observe(el);
    return () => observer.disconnect();
  }, [opts]);

  return [ref, inView];
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CursorVariant = "default" | "drag" | "view" | "play";

interface CursorContextValue {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
  /** Convenience handlers to spread on an element: {...cursor("view")} */
  bind: (v: CursorVariant) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");

  const bind = useCallback(
    (v: CursorVariant) => ({
      onMouseEnter: () => setVariant(v),
      onMouseLeave: () => setVariant("default"),
    }),
    [],
  );

  const value = useMemo(
    () => ({ variant, setVariant, bind }),
    [variant, bind],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    // Fallback no-op so components never crash outside the provider.
    return {
      variant: "default",
      setVariant: () => {},
      bind: () => ({ onMouseEnter: () => {}, onMouseLeave: () => {} }),
    };
  }
  return ctx;
}

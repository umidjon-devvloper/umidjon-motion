import { motion, type Variant } from "framer-motion";
import { type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
}

/** Scroll-triggered entrance. Collapses to a no-op when reduced motion is on. */
export function Reveal({
  children,
  delay = 0,
  y = 38,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const hidden: Variant = { opacity: 0, y };
  const visible: Variant = {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -5% 0px", amount: 0.08 }}
      variants={{ hidden, visible }}
    >
      {children}
    </MotionTag>
  );
}

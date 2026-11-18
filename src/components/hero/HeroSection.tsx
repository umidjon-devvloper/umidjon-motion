import { motion } from "framer-motion";
import { links, site } from "../../config/site";
import { useCursor } from "../../lib/cursor";
import {
  usePrefersReducedMotion,
} from "../../lib/hooks";
import "./hero.css";

export function HeroSection() {
  const reduced = usePrefersReducedMotion();
  const { bind } = useCursor();

  const line = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="hero" id="top">
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__generated-art"><img src="/hero-generated.png" alt="" /></div>
        {/* The generated campaign visual is the hero centerpiece; the previous
            foreground 3D ring/screen is intentionally removed for a cleaner layout. */}
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__content">
        <motion.span
          className="eyebrow hero__eyebrow"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {site.brand.tagline}
        </motion.span>

        <h1 className="hero__title display">
          {["Motion Videos", "That Grow", "Your Business."].map((t, i) => (
            <motion.span
              key={t}
              className="hero__line"
              custom={i}
              initial={reduced ? false : "hidden"}
              animate="visible"
              variants={line}
            >
              {i === 2 ? <em className="accent-text">{t}</em> : t}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero__support lead"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {site.copy.heroSupport}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.8 }}
        >
          <a className="btn btn-primary" href="#work" {...bind("view")}>
            View Portfolio <span aria-hidden="true">▶</span>
          </a>
          <a
            className="btn btn-ghost"
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            {...bind("view")}
          >
            Start a Project →
          </a>
        </motion.div>
      </div>

      <a className="hero__scroll" href="#work" aria-label="Scroll to explore">
        <span>SCROLL TO EXPLORE</span>
        <span className="hero__scroll-arrow">↓</span>
      </a>
    </section>
  );
}

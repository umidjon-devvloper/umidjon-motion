import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../lib/hooks";
import "./showcase.css";

export function CinematicShowcase() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const feature = portfolio.find((p) => p.featured) ?? portfolio[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Expand from a smaller frame into a full cinematic stage.
  const width = useTransform(scrollYProgress, [0.1, 0.5], ["58%", "100%"]);
  const radius = useTransform(scrollYProgress, [0.1, 0.5], [26, 6]);
  const metaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const barScale = useTransform(scrollYProgress, [0.12, 0.6], [0, 1]);

  return (
    <section className="section showcase" ref={sectionRef}>
      <div className="container showcase__head">
        <h2 className="showcase__title section-title">
          NOT JUST A VIDEO.
          <br />
          IT&apos;S AN <span className="accent-text">EXPERIENCE.</span>
        </h2>
      </div>

      <div className="showcase__sticky">
        <motion.div
          className="showcase__frame"
          style={
            reduced
              ? { width: "100%", borderRadius: 10 }
              : { width, borderRadius: radius }
          }
        >
          <img className="showcase__art" src="/hero-generated.png" alt="Neon yoritilgan motion dizayn konsepsiyasi" loading="lazy" />
          <span className="showcase__concept">STUDIO VISUAL / CONCEPT</span>

          <motion.div
            className="showcase__meta"
            style={reduced ? { opacity: 1 } : { opacity: metaOpacity }}
          >
            <span className="showcase__cat">{feature.category}</span>
            <span className="showcase__name">{feature.title}</span>
          </motion.div>

          <div className="showcase__progress" aria-hidden="true">
            <motion.span
              className="showcase__progress-bar"
              style={reduced ? { scaleX: 1 } : { scaleX: barScale }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

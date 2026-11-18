import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "../../data/process";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { Reveal } from "../common/Reveal";
import "./process.css";

function ProcessIcon({ index }: { index: number }) {
  return <span className="process__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {index === 0 && <><circle cx="28" cy="28" r="17"/><path d="m41 41 14 14M28 18v20m-10-10h20"/></>}
    {index === 1 && <><rect x="12" y="30" width="40" height="16" rx="3"/><rect x="18" y="18" width="28" height="12" rx="3"/><rect x="25" y="8" width="14" height="10" rx="2"/><path d="m32 4 0-3"/></>}
    {index === 2 && <><path d="M10 20h44v30H10zM10 20 7 12h50l-3 8M18 12l6 8m7-8 6 8m7-8 6 8"/><path d="m27 28 12 7-12 7z" fill="currentColor" stroke="none"/></>}
    {index === 3 && <><path d="m9 35 28-28 14 14-28 28z"/><path d="m22 22 20 20M13 44l7 7M32 29l9-9"/></>}
  </svg></span>;
}

export function ProcessTimeline() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section process process--illustrated" id="process">
      <div className="process__bg" aria-hidden="true" />
      <div className="container">
        <div className="process__head">
          <Reveal>
            <span className="eyebrow">Production Process</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              FROM IDEA TO <span className="accent-text">MOTION.</span>
            </h2>
          </Reveal>
          <p className="lead">G‘oyadan tayyor motion videoga qadar — to‘liq va professional jarayon.</p>
        </div>

        <div className="process__timeline" ref={ref}>
          <div className="process__track" aria-hidden="true">
            <motion.span
              className="process__progress"
              style={reduced ? { scaleX: 1 } : { scaleX: lineScale }}
            />
          </div>

          <ol className="process__steps">
            {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.1} className="process__step">
                <ProcessIcon index={i} />
                <span className="process__marker">
                  <span className="process__marker-core" />
                </span>
                <span className="process__step-num">{step.number}</span>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

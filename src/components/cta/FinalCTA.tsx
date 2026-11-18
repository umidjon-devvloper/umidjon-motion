import { links } from "../../config/site";
import { useCursor } from "../../lib/cursor";
import { Reveal } from "../common/Reveal";
import "./cta.css";

export function FinalCTA() {
  const { bind } = useCursor();


  return (
    <section className="final-cta final-cta--cinematic" id="start-project">
      <div className="final-cta__art" aria-hidden="true"><img src="/cta-studio.jpg" alt="" width="1536" height="864" loading="lazy" /></div>

      <div className="final-cta__scrim" aria-hidden="true" />

      <div className="container final-cta__content">
        <Reveal><span className="eyebrow final-cta__eyebrow">Let’s create together</span></Reveal>
        <Reveal>
          <h2 className="final-cta__title">
            YOUR IDEA.
            <br />
            OUR MOTION.
            <br />
            <span className="accent-text">ONE IMPACT.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="final-cta__support lead">
            Biznesingiz uchun unutilmas vizual kontent yaratishni boshlaymiz.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            className="btn btn-primary final-cta__btn"
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            {...bind("view")}
          >
            <span aria-hidden="true">▶</span> START YOUR PROJECT <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

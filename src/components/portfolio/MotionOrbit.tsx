import { type CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { portfolio } from "../../data/portfolio";
import { useCursor } from "../../lib/cursor";
import {
  useDocumentVisible,
  useInView,
  useIsMobile,
  useIsTablet,
  usePrefersReducedMotion,
} from "../../lib/hooks";
import { Reveal } from "../common/Reveal";
import { OrbitCard } from "./OrbitCard";
import { VideoLightbox } from "./VideoLightbox";
import { useOrbit } from "./useOrbit";
import "./orbit.css";

export function MotionOrbit() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const visible = useDocumentVisible();
  const [stageRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { bind, setVariant } = useCursor();

  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerStart = useRef({ x: 0, y: 0, moved: false });

  const count = portfolio.length;
  const [state, controls] = useOrbit({
    count,
    canAutoplay: inView && visible && lightbox === null,
    reduced,
  });

  const radiusX = isMobile ? 150 : isTablet ? 300 : 440;
  const radiusZ = isMobile ? 150 : isTablet ? 240 : 360;
  const maxBlur = isMobile ? 2 : 5;

  const cards = useMemo(() => {
    return portfolio.map((project, i) => {
      let angle = state.rotation + i * state.step;
      angle = (((angle % 360) + 540) % 360) - 180; // normalize to [-180,180]
      const rad = (angle * Math.PI) / 180;
      const z = Math.cos(rad); // -1 (back) .. 1 (front)
      const x = Math.sin(rad) * radiusX;
      const depth = (z + 1) / 2; // 0 back .. 1 front
      const scale = 0.6 + depth * 0.4;
      const opacity = 0.18 + depth * 0.82;
      const blur = (1 - depth) * maxBlur;
      const rotateY = -Math.sin(rad) * 24;
      const isActive = i === state.activeIndex;

      const style: CSSProperties = {
        transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${
          z * radiusZ
        }px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        filter: blur > 0.15 ? `blur(${blur}px)` : "none",
        zIndex: Math.round((z + 1) * 500),
      };
      return { project, i, style, isActive, interactive: z > -0.2 };
    });
  }, [state.rotation, state.activeIndex, state.step, radiusX, radiusZ, maxBlur]);

  const handleCardClick = (i: number) => {
    if (!pointerStart.current.moved) {
      setLightbox(i);
      setVariant("default");
      controls.goTo(i);
    }
  };

  return (
    <section className="section orbit-section" id="work">
      <div className="container orbit-head">
        <Reveal>
          <span className="eyebrow">Signature Experience</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            OUR CREATIVE <span className="accent-text">UNIVERSE.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lead orbit-sub">
            Har bir loyiha — alohida kreativ g‘oya va vizual tajriba.
          </p>
        </Reveal>
      </div>

      <div
        className="orbit-stage"
        ref={stageRef}
        onPointerDown={(event) => {
          pointerStart.current = { x: event.clientX, y: event.clientY, moved: false };
          if (!reduced) controls.onPointerDown(event);
        }}
        onPointerMove={(event) => {
          if (event.buttons && Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 8) pointerStart.current.moved = true;
        }}
        onKeyDown={() => { pointerStart.current.moved = false; }}
        onMouseEnter={() => {
          controls.setHovered(true);
          if (!reduced) setVariant("drag");
        }}
        onMouseLeave={() => {
          controls.setHovered(false);
          setVariant("default");
        }}
      >
        <div className="orbit-ring-floor" aria-hidden="true" />
        <div
          className={`orbit-3d ${state.dragging ? "is-dragging" : ""}`}
        >
          {cards.map(({ project, i, style, isActive, interactive }) => (
            <OrbitCard
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              project={project}
              style={style}
              isActive={isActive}
              interactive={interactive}
              onClick={() => handleCardClick(i)}
              onMouseEnter={
                isActive && !reduced ? () => setVariant("play") : undefined
              }
              onMouseLeave={
                isActive && !reduced ? () => setVariant("drag") : undefined
              }
            />
          ))}
        </div>
      </div>

      <div className="container orbit-controls">
        <div className="orbit-controls__nav">
          <button
            className="orbit-btn"
            onClick={controls.prev}
            aria-label="Previous project"
            {...bind("view")}
          >
            ←
          </button>
          <button
            className="orbit-btn orbit-btn--play"
            onClick={controls.togglePlay}
            aria-label={state.playing ? "Pause rotation" : "Play rotation"}
            {...bind("view")}
          >
            {state.playing ? "❚❚" : "►"}
          </button>
          <button
            className="orbit-btn"
            onClick={controls.next}
            aria-label="Next project"
            {...bind("view")}
          >
            →
          </button>
        </div>

        <div className="orbit-indicators" role="tablist" aria-label="Projects">
          {portfolio.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === state.activeIndex}
              aria-label={p.title}
              className={`orbit-dot ${i === state.activeIndex ? "is-active" : ""}`}
              onClick={() => controls.goTo(i)}
            />
          ))}
        </div>

        <div className="orbit-active-meta" aria-live="polite">
          <span className="orbit-active-meta__num">
            {portfolio[state.activeIndex].number} / {String(count).padStart(2, "0")}
          </span>
          <span className="orbit-active-meta__title">
            {portfolio[state.activeIndex].title}
          </span>
        </div>
      </div>

      {lightbox !== null && (
        <VideoLightbox
          project={portfolio[lightbox]}
          originEl={cardRefs.current[lightbox]}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

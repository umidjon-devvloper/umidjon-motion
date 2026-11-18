import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PortfolioProject } from "../../data/portfolio";
import { links } from "../../config/site";
import { usePrefersReducedMotion } from "../../lib/hooks";
import "./lightbox.css";

interface Props {
  project: PortfolioProject;
  originEl: HTMLElement | null;
  onClose: () => void;
}

export function VideoLightbox({ project, originEl, onClose }: Props) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();
  const [closing, setClosing] = useState(false);

  const orderMessage = `Assalomu alaykum! Men "${project.title}" (${project.category}) uslubidagi motion video buyurtma qilmoqchiman.`;

  // FLIP animation from the origin card to the large viewer.
  const runFlip = useCallback(
    (reverse: boolean) => {
      const frame = frameRef.current;
      if (!frame || !originEl || reduced) return;
      const last = frame.getBoundingClientRect();
      const first = originEl.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / last.width;
      const sy = first.height / last.height;

      frame.style.transformOrigin = "top left";
      frame.style.transition = "none";
      frame.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      frame.style.opacity = "0.6";
      // force reflow
      void frame.offsetWidth;
      frame.style.transition =
        "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease";

      if (reverse) {
        // already at identity -> go back to origin
        frame.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
        frame.style.opacity = "0";
      } else {
        frame.style.transform = "translate(0,0) scale(1,1)";
        frame.style.opacity = "1";
      }
    },
    [originEl, reduced],
  );

  useLayoutEffect(() => {
    runFlip(false);
  }, [runFlip]);

  const handleClose = useCallback(() => {
    if (closeTimer.current) return;
    if (reduced || !originEl) {
      onClose();
      return;
    }
    setClosing(true);
    const frame = frameRef.current;
    if (!frame) {
      onClose();
      return;
    }
    const last = frame.getBoundingClientRect();
    const first = originEl.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    frame.style.transformOrigin = "top left";
    frame.style.transition =
      "transform 0.5s cubic-bezier(0.7,0,0.84,0), opacity 0.4s ease";
    frame.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    frame.style.opacity = "0";
    closeTimer.current = window.setTimeout(onClose, 460);
  }, [onClose, originEl, reduced]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const background = document.getElementById("root");
    const previousInert = background?.inert ?? false;
    if (background) background.inert = true;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); handleClose(); }
      if (e.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (background) background.inert = previousInert;
      window.clearTimeout(closeTimer.current);
      (originEl || previousFocus)?.focus({ preventScroll: true });
    };
  }, [handleClose]);

  const hasVideo = Boolean(project.videoUrl);

  return createPortal(
    <div
      ref={dialogRef}
      className={`lightbox ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <button
        ref={closeRef}
        className="lightbox__close"
        onClick={handleClose}
        aria-label="Close preview"
      >
        ✕
      </button>

      <div className="lightbox__frame" ref={frameRef}>
        <div className="lightbox__media">
          <div className="lightbox__studio-label"><img src="/um-logo.png" alt="" /> UMIDJON MOTION <span>{hasVideo ? "VIDEO PREVIEW" : "CONCEPT PREVIEW"}</span></div>
          {hasVideo ? (
            <video
              className="lightbox__video"
              src={project.videoUrl}
              poster={project.posterUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              {project.videoWebmUrl && (
                <source src={project.videoWebmUrl} type="video/webm" />
              )}
            </video>
          ) : (
            <div className="lightbox__poster">
              <img className="lightbox__concept-art" src={project.posterUrl || "/hero-generated.png"} alt={`${project.title} — konsept tasviri`} />
              <div className="lightbox__concept-caption"><span>CREATIVE DIRECTION / {project.number}</span><strong>{project.title}</strong></div>
              <span className="lightbox__demo-note">
                Konsept taqdimoti · Video hali qo‘shilmagan
              </span>
            </div>
          )}
        </div>

        <div className="lightbox__info">
          <div className="lightbox__info-head">
            <span className="lightbox__cat" style={{ color: project.accent }}>
              {project.category} · {project.number}
            </span>
            <h3 className="lightbox__title">{project.title}</h3>
            <p className="lightbox__desc">{project.description}</p>
          </div>

          <div className="lightbox__cta">
            <p className="lightbox__cta-q">Shunga o‘xshash video kerakmi?</p>
            <a
              className="btn btn-primary"
              href={links.telegramWithMessage(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              ORDER THIS STYLE →
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

import { type CSSProperties, forwardRef } from "react";
import type { PortfolioProject } from "../../data/portfolio";
import { PosterComposition } from "../common/PosterComposition";

interface OrbitCardProps {
  project: PortfolioProject;
  style: CSSProperties;
  isActive: boolean;
  interactive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const OrbitCard = forwardRef<HTMLButtonElement, OrbitCardProps>(
  function OrbitCard(
    { project, style, isActive, interactive, onClick, onMouseEnter, onMouseLeave },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={`orbit-card ${isActive ? "is-active" : ""}`}
        style={{ ...style, pointerEvents: interactive ? "auto" : "none" }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={`${project.title} — ${project.category}${
          isActive ? " (open preview)" : ""
        }`}
        tabIndex={isActive ? 0 : -1}
      >
        <div
          className="orbit-card__inner"
          style={{ "--card-accent": project.accent } as CSSProperties}
        >
          {project.posterUrl ? (
            <div className="orbit-card__poster">
              <img
                className="orbit-card__poster-img"
                src={project.posterUrl}
                alt={project.title}
                loading="lazy"
                draggable={false}
              />
              <span className="orbit-card__poster-shade" aria-hidden="true" />
              <span className="orbit-card__poster-top">
                <span className="orbit-card__poster-num">{project.number}</span>
                {project.videoUrl && (
                  <span className="orbit-card__poster-badge">● VIDEO</span>
                )}
              </span>
              {isActive && (
                <span className="orbit-card__poster-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              )}
              <span className="orbit-card__poster-meta">
                <span className="orbit-card__poster-cat">{project.category}</span>
                <span className="orbit-card__poster-title">{project.title}</span>
              </span>
            </div>
          ) : (
            <PosterComposition project={project} showPlay={isActive} />
          )}
          {isActive && <span className="orbit-card__ring" aria-hidden="true" />}
        </div>
      </button>
    );
  },
);

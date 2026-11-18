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
          <PosterComposition project={project} showPlay={isActive} />
          {isActive && <span className="orbit-card__ring" aria-hidden="true" />}
        </div>
      </button>
    );
  },
);

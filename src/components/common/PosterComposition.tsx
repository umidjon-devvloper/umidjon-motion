import type { PortfolioProject } from "../../data/portfolio";
import "./poster.css";

interface PosterProps {
  project: Pick<
    PortfolioProject,
    "title" | "category" | "number" | "gradient" | "accent" | "status"
  >;
  showPlay?: boolean;
}

/**
 * Polished generated poster composition used when a project has no real
 * video/poster asset. Clearly reads as a demo "concept" via the badge.
 */
export function PosterComposition({ project, showPlay = true }: PosterProps) {
  const [g1, g2] = project.gradient;
  return (
    <div
      className="poster"
      style={{
        // @ts-expect-error custom props
        "--g1": g1,
        "--g2": g2,
        "--pa": project.accent,
      }}
    >
      <div className="poster__grad" />
      <div className="poster__grid" />
      <div className="poster__glow" />
      <div className="poster__scanline" />

      <div className="poster__top">
        <span className="poster__num">{project.number}</span>
        {project.status === "concept" && (
          <span className="poster__badge">CONCEPT</span>
        )}
      </div>

      {showPlay && (
        <div className="poster__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      )}

      <div className="poster__meta">
        <span className="poster__cat">{project.category}</span>
        <span className="poster__title">{project.title}</span>
      </div>
    </div>
  );
}

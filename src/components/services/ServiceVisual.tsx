import type { ServiceVisual as VisualType } from "../../data/services";

/** Unique CSS/SVG 3D-style visual per service. No extra WebGL contexts. */
export function ServiceVisual({ type }: { type: VisualType }) {
  switch (type) {
    case "play":
      return (
        <div className="sv sv--play">
          <span className="sv-ring" />
          <span className="sv-ring sv-ring--2" />
          <span className="sv-play">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </div>
      );
    case "product":
      return (
        <div className="sv sv--product">
          <span className="sv-cube" />
          <span className="sv-stage" />
          <span className="sv-reflect" />
        </div>
      );
    case "reel":
      return (
        <div className="sv sv--reel">
          <span className="sv-phone">
            <span className="sv-bar" />
            <span className="sv-bar sv-bar--2" />
            <span className="sv-bar sv-bar--3" />
          </span>
        </div>
      );
    case "logo":
      return (
        <div className="sv sv--logo">
          <svg viewBox="0 0 120 120" width="100%" height="100%">
            <defs>
              <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#9aa0ac" />
                <stop offset="1" stopColor="#3a3e48" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#chrome)" strokeWidth="6">
              <path d="M30 86 L30 40 L60 64 L90 40 L90 86" />
            </g>
            <circle cx="60" cy="30" r="7" fill="url(#chrome)" />
          </svg>
        </div>
      );
    case "beam":
      return (
        <div className="sv sv--beam">
          <span className="sv-screen">
            <span className="sv-beam-sweep" />
          </span>
        </div>
      );
    case "geo":
    default:
      return (
        <div className="sv sv--geo">
          <span className="sv-geo-shape" />
          <span className="sv-geo-shape sv-geo-shape--2" />
        </div>
      );
  }
}

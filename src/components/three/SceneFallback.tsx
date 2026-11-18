import "./fallback.css";

/** Pure-CSS stand-in used when WebGL is unavailable. */
function CssRing({ label }: { label?: string }) {
  return (
    <div className="css-stage" aria-hidden="true">
      <div className="css-ring css-ring--1" />
      <div className="css-ring css-ring--2" />
      <div className="css-ring css-ring--3" />
      <div className="css-core" />
      <div className="css-glow css-glow--lime" />
      <div className="css-glow css-glow--purple" />
      {label && <span className="css-label">{label}</span>}
    </div>
  );
}

export function HeroFallback() {
  return <CssRing />;
}

export function CtaFallback() {
  return <CssRing />;
}

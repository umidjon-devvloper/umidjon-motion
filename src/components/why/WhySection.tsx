import { values } from "../../data/process";
import { Reveal } from "../common/Reveal";
import "./why.css";

function ValueIcon({ index }: { index: number }) {
  return <span className="why__icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {index === 0 && <><path d="M23 42c0-7-8-9-8-20a17 17 0 0 1 34 0c0 11-8 13-8 20ZM24 48h16M27 54h10M29 41V28l-5-5m11 18V28l5-5M32 1v-1M8 9 4 5m52 4 4-4M6 25H1m57 0h5" /></>}
    {index === 1 && <><rect x="14" y="14" width="36" height="36" rx="5"/><path d="M22 2v10m10-10v10M42 2v10M22 52v10m10-10v10m10-10v10M2 22h10M2 32h10M2 42h10m40-20h10M52 32h10M52 42h10M21 40l6-16 6 16m-10-5h8m9-11v16"/></>}
    {index === 2 && <><path d="M9 24h46v31H9zM9 24 5 13 49 3l4 12ZM15 11l6 9m7-12 6 9m7-12 6 9"/><path d="m27 32 12 8-12 8Z" fill="currentColor" stroke="none"/></>}
    {index === 3 && <><path d="m8 34 15-14 11 7L53 7m-14 0h14v14"/><path d="M9 45h7v12H9zm15-9h7v21h-7zm15 2h7v19h-7zm15-11h7v30h-7z" fill="currentColor" stroke="none"/></>}
  </svg></span>;
}

export function WhySection() {
  return (
    <section className="section why why--illustrated" id="about">
      <div className="why__ambient" aria-hidden="true" />
      <div className="container why__grid">
        <div className="why__intro">
          <Reveal>
            <span className="eyebrow">Why Umidjon Motion</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="why__title">
              CREATIVITY
              <br />
              MEETS<br /><span className="accent-text">TECHNOLOGY.</span>
            </h2>
          </Reveal>
          <div className="why__art" aria-hidden="true"><img src="/why-studio.jpg" alt="" width="1024" height="1024" loading="lazy" /></div>
        </div>

        <ul className="why__list">
          {values.map((v, i) => (
            <Reveal as="li" key={v.number} delay={i * 0.08} className="why__item">
              <ValueIcon index={i} />
              <span className="why__num">{v.number}</span>
              <div className="why__item-body">
                <h3 className="why__item-title">{v.title}</h3>
                <p className="why__item-desc">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { pricing } from "../../data/pricing";
import { links } from "../../config/site";
import { Reveal } from "../common/Reveal";
import "./pricing.css";

export function PricingSection() {
  return (
    <section className="section pricing pricing--illustrated" id="pricing">
      <div className="pricing__bg" aria-hidden="true" />
      <div className="container">
        <div className="pricing__head">
          <Reveal>
            <span className="eyebrow">Pricing & Ordering</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              YOUR NEXT <span className="accent-text">BIG MOVE.</span>
            </h2>
          </Reveal>
          <p className="lead">Sizning maqsadingizga mos, moslashuvchan paketlar.</p>
        </div>

        <div className="pricing__grid">
          {pricing.map((tier, i) => {
            const msg = `Assalomu alaykum! Men "${tier.name}" paket bo‘yicha narx va ma'lumot olmoqchiman.`;
            return (
              <Reveal
                key={tier.id}
                delay={i * 0.08}
                className={`pricing-stage ${tier.featured ? "pricing-stage--featured" : ""}`}
              >
                <article className={`pricing-card ${tier.featured ? "is-featured" : ""}`}>
                {tier.featured && (
                  <span className="pricing-card__flag">Most Popular</span>
                )}
                <span className={`pricing-card__icon pricing-card__icon--${i}`} aria-hidden="true">
                  {i === 0 ? "ϟ" : i === 1 ? "▣" : "♛"}
                </span>
                <div className="pricing-card__top">
                  <h3 className="pricing-card__name">{tier.name}</h3>
                  <p className="pricing-card__summary">{tier.summary}</p>
                </div>

                <div className="pricing-card__price">
                  <span className="pricing-card__price-label">CUSTOM PRICE</span>
                </div>

                <ul className="pricing-card__features">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <span className="pricing-card__tick" aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  className={`btn ${tier.featured ? "btn-primary" : "btn-ghost"} pricing-card__cta`}
                  href={links.telegramWithMessage(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GET A QUOTE
                </a>
                </article>
                <div className="pricing-stage__podium" aria-hidden="true" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

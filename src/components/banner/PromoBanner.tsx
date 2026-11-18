import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { links } from "../../config/site";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { Reveal } from "../common/Reveal";
import "./promo-banner.css";

interface PromoItem {
  id: string;
  poster: string;
  video: string;
  duration: string;
  tag: string;
  title: string;
}

/** Real studio promos (motion versions of the poster creatives). */
const PROMOS: PromoItem[] = [
  {
    id: "noldan",
    poster: "/videos/2chi.jpg",
    video: "/videos/2chi.mp4",
    duration: "0:28",
    tag: "Showreel · Motion",
    title: "Har bir video — noldan yasalgan",
  },
  {
    id: "motion-video",
    poster: "/videos/3chi.jpg",
    video: "/videos/3chi.mp4",
    duration: "0:28",
    tag: "Promo · Reklama",
    title: "Siz uchun Motion Video",
  },
  {
    id: "bir-xil",
    poster: "/videos/birxil.jpg",
    video: "/videos/birxil.mp4",
    duration: "0:30",
    tag: "Creative · Reklama",
    title: "Bir xil mahsulot — 4 xil uslub",
  },
];

export function PromoBanner() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<PromoItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="section promo-banner" id="showreel">
      <div className="promo-banner__ambient" aria-hidden="true" />
      <div className="container">
        <div className="promo-banner__head">
          <Reveal>
            <span className="eyebrow">Jonli ishlarimiz</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              HARAKATDAGI <span className="accent-text">ISHLAR.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead promo-banner__sub">
              Quyidagi videolar — bizning real motion ishlarimiz. Ko‘rish uchun
              bosing.
            </p>
          </Reveal>
        </div>

        <div className="promo-banner__row">
          {PROMOS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="promo-stage">
              <button
                type="button"
                className="promo-card"
                onClick={() => setActive(p)}
                aria-label={`${p.title} — videoni ochish`}
              >
                <img
                  className="promo-card__img"
                  src={p.poster}
                  alt={p.title}
                  loading="lazy"
                  width="720"
                  height="1280"
                />
                <span className="promo-card__shade" aria-hidden="true" />
                <span className="promo-card__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
                <span className="promo-card__dur">{p.duration}</span>
                <span className="promo-card__meta">
                  <span className="promo-card__tag">{p.tag}</span>
                  <span className="promo-card__title">{p.title}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active &&
        createPortal(
          <PromoLightbox item={active} reduced={reduced} onClose={close} />,
          document.body,
        )}
    </section>
  );
}

interface LightboxProps {
  item: PromoItem;
  reduced: boolean;
  onClose: () => void;
}

function PromoLightbox({ item, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const orderMessage = `Assalomu alaykum! Men "${item.title}" uslubidagi motion video buyurtma qilmoqchiman.`;

  return (
    <div
      className="promo-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} video`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        className="promo-lb__close"
        onClick={onClose}
        aria-label="Yopish"
      >
        ✕
      </button>
      <div className="promo-lb__frame">
        <video
          className="promo-lb__video"
          src={item.video}
          poster={item.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
        <div className="promo-lb__bar">
          <div className="promo-lb__info">
            <span className="promo-lb__tag">{item.tag}</span>
            <span className="promo-lb__title">{item.title}</span>
          </div>
          <a
            className="btn btn-primary promo-lb__cta"
            href={links.telegramWithMessage(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Shunday video kerakmi? →
          </a>
        </div>
      </div>
    </div>
  );
}

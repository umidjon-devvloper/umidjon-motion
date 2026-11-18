import { type CSSProperties, useRef, useState } from "react";
import type { Service } from "../../data/services";
import { links } from "../../config/site";
import { usePrefersReducedMotion } from "../../lib/hooks";

export function ServiceCard3D({ service }: { service: Service }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 0, my: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 12, mx: px * 18, my: py * 18 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, mx: 0, my: 0 });

  const orderMessage = `Assalomu alaykum! Menga "${service.title}" xizmati bo‘yicha video kerak.`;

  return (
    <a
      className="service-card"
      href={links.telegramWithMessage(orderMessage)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--sc-accent": service.accent } as CSSProperties}
    >
      <div
        ref={ref}
        className="service-card__tilt"
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <span className="service-card__edge" aria-hidden="true" />
        <div
          className="service-card__visual"
          style={{
            transform: `translate(${tilt.mx * 0.35}px, ${tilt.my * 0.35}px)`,
          }}
        >
          <img src={`/services/${service.id}.jpg`} alt="" loading="lazy" decoding="async" width="1200" height="800" />
        </div>

        <div className="service-card__body">
          <span className="service-card__num">{service.number}</span>
          <h3 className="service-card__title">{service.title.split(" ")[0]}<br />{service.title.split(" ").slice(1).join(" ")}</h3>
          <p className="service-card__desc">{service.description}</p>
          <span className="service-card__cta">
            Order <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

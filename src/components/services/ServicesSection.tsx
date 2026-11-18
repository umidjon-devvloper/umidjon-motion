import { services } from "../../data/services";
import { Reveal } from "../common/Reveal";
import { ServiceCard3D } from "./ServiceCard3D";
import "./services.css";

export function ServicesSection() {
  return (
    <section className="section services services--illustrated" id="services">
      <div className="services__atmosphere" aria-hidden="true" />
      <div className="container">
        <div className="services__head">
          <Reveal>
            <span className="eyebrow">Services</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              WHAT WE <span className="accent-text">CREATE.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">Biznesingiz uchun kreativ vizual yechimlar.</p>
          </Reveal>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <ServiceCard3D service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

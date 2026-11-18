import { links, site } from "../../config/site";
import { StudioIcon } from "../common/StudioIcon";
import "./footer.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer--neon">
      <div className="container"><a className="footer__signature" href="#top" aria-label="Umidjon Motion — bosh sahifa"><img src="/um-logo.png" alt="UM logo" width="140" height="140" loading="lazy" /><span><strong>UMIDJON <em>MOTION</em></strong><small>AI MOTION STUDIO</small></span></a></div>
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">{site.brand.name}</span>
          <p className="footer__tag">{site.brand.tagline}</p>
          <div className="footer__socials"><a href={links.telegram} aria-label="Telegram" target="_blank" rel="noopener noreferrer"><StudioIcon name="telegram" /></a><a href={links.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><StudioIcon name="instagram" /></a></div>
        </div>

        <nav className="footer__column" aria-label="Quick links"><h3>Quick Links</h3><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Contact</a></nav>
        <nav className="footer__column" aria-label="Services"><h3>Services</h3><a href="#services">AI Advertising</a><a href="#services">Product Motion</a><a href="#services">Brand Animation</a></nav>
        <nav className="footer__column" aria-label="Studio"><h3>Studio</h3><a href="#about">About us</a><a href="#pricing">Pricing</a><a href="#contact">Start a project</a></nav>
        <div className="footer__links">
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__invitation"
          >
            <StudioIcon name="video" /><span><strong>Yangi g‘oya bormi?</strong><small>Hoziroq bizga yozing!</small></span><b>→</b>
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} {site.brand.shortName}. All rights reserved.
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

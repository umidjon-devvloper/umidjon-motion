import { useEffect, useState } from "react";
import { links, site } from "../../config/site";
import { useCursor } from "../../lib/cursor";
import "./navbar.css";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { bind } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" {...bind("view")}>
          <img className="nav__brand-image" src="/um-logo.png" alt="" width="64" height="64" />
          <span className="nav__brand-copy"><strong>{site.brand.name}</strong><small>AI MOTION STUDIO</small></span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn-primary nav__cta"
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          {...bind("view")}
        >
          Start a Project
        </a>

        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav__mobile-link"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className="btn btn-primary"
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Start a Project
        </a>
      </div>
    </header>
  );
}

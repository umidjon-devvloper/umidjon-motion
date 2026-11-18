import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";
import "./scroll-experience.css";

/** Passive, frame-batched scroll effects; native scrolling stays untouched. */
export function ScrollExperience() {
  const reduced = usePrefersReducedMotion();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const art = Array.from(document.querySelectorAll<HTMLElement>(
      ".why__art, .contact__art, .final-cta__art img",
    ));
    const entrances = Array.from(document.querySelectorAll<HTMLElement>(
      ".contact__form, .footer__signature, .footer__inner > *, .footer__bottom",
    ));
    const animations: Animation[] = [];
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const index = element.parentElement?.classList.contains("footer__inner")
          ? Array.from(element.parentElement.children).indexOf(element) : 0;
        animations.push(element.animate([
          { opacity: 0, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 800, delay: index * 70, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }));
        observer.unobserve(element);
      });
    }, { threshold: 0.08 });
    entrances.forEach((element) => observer.observe(element));

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const total = document.documentElement.scrollHeight - height;
      const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      const distance = window.innerWidth < 768 ? 12 : 32;
      // Read geometry together before applying style updates.
      const positions = art.map((element) => element.getBoundingClientRect());
      art.forEach((element, i) => {
        const rect = positions[i];
        if (rect.bottom < -80 || rect.top > height + 80) return;
        const offset = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - height / 2) / height));
        element.style.setProperty("--scroll-shift", `${offset * -distance}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    update();
    return () => {
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      art.forEach((element) => element.style.removeProperty("--scroll-shift"));
    };
  }, [reduced]);

  return reduced ? null : <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once. Safe to call from any component. */
export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };

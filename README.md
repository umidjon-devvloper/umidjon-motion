# UMIDJON MOTION — Immersive 3D Creative Studio Website

A premium, cinematic single-page experience for an AI motion & creative video
studio. Built with **Vite + React + TypeScript**, **Three.js / React Three
Fiber / drei**, **GSAP** and **Framer Motion**.

## Run it

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build -> dist/
npm run preview  # preview the production build
```

## Where to edit things (no code digging needed)

| What | File |
| --- | --- |
| **Telegram handle, Instagram, brand name** | `src/config/site.ts` |
| Portfolio projects (orbit + showcase) | `src/data/portfolio.ts` |
| Services (the 6 cards) | `src/data/services.ts` |
| Process steps + "why" values | `src/data/process.ts` |
| Pricing tiers | `src/data/pricing.ts` |

### ⚠️ Set your Telegram handle

Open `src/config/site.ts` and set `telegramUsername` to your real handle
(without the `@`). Every CTA, the contact form, and the pricing buttons use it.
It currently ships with the placeholder `umidjon_motion`.

### Adding real videos

In `src/data/portfolio.ts`, give a project a `videoUrl` (MP4) and optional
`videoWebmUrl` / `posterUrl`, then set `status: "live"`. Until then, projects
render polished **demo concept** posters and are clearly labelled as concepts —
nothing is presented as completed client work.

## Sections

Hero (3D chrome ring + floating preview) → Motion Orbit portfolio (drag /
autoplay / lightbox) → Cinematic showcase → Services (3D tilt cards) → Why →
Production process timeline → Pricing → Final CTA (3D) → Contact (Telegram).

## Built-in quality handling

- **Custom cursor** (DRAG / VIEW / PLAY) on fine-pointer desktops only.
- **`prefers-reduced-motion`** disables autoplay, parallax and heavy motion.
- **WebGL fallback**: a pure-CSS chrome-ring scene renders if WebGL is missing.
- 3D canvases **pause** when offscreen or when the tab is hidden.
- Dedicated **mobile** layout (swipe carousel, lightweight 3D, no custom cursor).
- No horizontal overflow; responsive render quality + DPR clamping.

## Architecture

```
src/
  config/site.ts          # single source of truth for contact/brand
  data/                   # portfolio, services, process, pricing
  lib/                    # hooks, cursor context, gsap setup
  components/
    layout/ hero/ portfolio/ showcase/ services/
    why/ process/ pricing/ cta/ contact/ three/ cursor/ common/
```

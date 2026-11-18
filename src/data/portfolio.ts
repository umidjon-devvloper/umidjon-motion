/**
 * Portfolio data — edit everything here.
 *
 * IMPORTANT: These are DEMONSTRATION CONCEPTS, not completed client work.
 * `status: "concept"` marks them as such in the UI. When you have real work,
 * add `videoUrl` / `posterUrl` (MP4 + optional WebM) and set `status: "live"`.
 */

export type ProjectStatus = "concept" | "live";

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  /** Primary video source (MP4). Leave empty to show the poster-only fallback. */
  videoUrl?: string;
  /** Optional WebM source for better compression. */
  videoWebmUrl?: string;
  /** Poster image shown before playback. Leave empty to use the generated gradient poster. */
  posterUrl?: string;
  thumbnailUrl?: string;
  featured?: boolean;
  status: ProjectStatus;
  /** Two-stop gradient used for the generated poster composition. */
  gradient: [string, string];
  /** Accent used for the card glow + category label. */
  accent: string;
}

export const portfolio: PortfolioProject[] = [
  {
    id: "product-universe",
    number: "01",
    title: "Product Universe",
    category: "Product Motion",
    description:
      "Mahsulotni kosmik muhitda aylantirib ko‘rsatuvchi, reflektiv materiallar bilan ishlangan kinematik taqdimot konsepsiyasi.",
    status: "concept",
    featured: true,
    gradient: ["#1b2a12", "#0a0b0f"],
    accent: "#C8FF42",
  },
  {
    id: "future-of-beauty",
    number: "02",
    title: "The Future of Beauty",
    category: "Brand Animation",
    description:
      "Go‘zallik brendi uchun yumshoq nur va suyuq metall effektlariga asoslangan vizual identifikatsiya konsepsiyasi.",
    status: "concept",
    gradient: ["#241640", "#0a0b0f"],
    accent: "#8B70FF",
  },
  {
    id: "cinematic-product",
    number: "03",
    title: "Cinematic Product",
    category: "Commercial",
    description:
      "Mahsulotni sahnaviy yorug‘lik va chuqurlik bilan ochib beruvchi keng ekranli reklama videosi konsepsiyasi.",
    status: "concept",
    featured: true,
    gradient: ["#0f2e2a", "#0a0b0f"],
    accent: "#3ad6c5",
  },
  {
    id: "brand-in-motion",
    number: "04",
    title: "Brand in Motion",
    category: "Brand Animation",
    description:
      "Logotip va brend elementlari harakatga kelib, yaxlit hikoyaga aylanadigan animatsion konsepsiya.",
    status: "concept",
    gradient: ["#2a1016", "#0a0b0f"],
    accent: "#ff6b6b",
  },
  {
    id: "digital-dreams",
    number: "05",
    title: "Digital Dreams",
    category: "AI Motion",
    description:
      "AI yordamida yaratilgan syurreal vizual dunyolar va oqimli kameralar harakatiga asoslangan tajriba.",
    status: "concept",
    featured: true,
    gradient: ["#102033", "#0a0b0f"],
    accent: "#4aa8ff",
  },
  {
    id: "creative-advertising",
    number: "06",
    title: "Creative Advertising",
    category: "Promo",
    description:
      "Diqqatni bir zumda tortadigan, dinamik montaj va kuchli tipografiyaga qurilgan promo videosi konsepsiyasi.",
    status: "concept",
    gradient: ["#2c2410", "#0a0b0f"],
    accent: "#ffcf4a",
  },
  {
    id: "liquid-identity",
    number: "07",
    title: "Liquid Identity",
    category: "AI Motion",
    description:
      "Suyuq xrom va shisha materiallaridan tashkil topgan, uzluksiz oqadigan abstrakt brend konsepsiyasi.",
    status: "concept",
    gradient: ["#201640", "#0a0b0f"],
    accent: "#8B70FF",
  },
];

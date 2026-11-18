/** Services shown in the "WHAT WE CREATE" 3D section. Edit here. */

export type ServiceVisual =
  | "play"
  | "product"
  | "reel"
  | "logo"
  | "beam"
  | "geo";

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  visual: ServiceVisual;
  accent: string;
}

export const services: Service[] = [
  {
    id: "ai-advertising",
    number: "01",
    title: "AI Advertising",
    description:
      "Biznes va kompaniyalar uchun kreativ reklama videolari.",
    visual: "play",
    accent: "#C8FF42",
  },
  {
    id: "product-motion",
    number: "02",
    title: "Product Motion",
    description:
      "Mahsulotlaringiz uchun professional va jozibador vizual taqdimotlar.",
    visual: "product",
    accent: "#b462ff",
  },
  {
    id: "instagram-reels",
    number: "03",
    title: "Instagram Reels",
    description:
      "Instagram va ijtimoiy tarmoqlar uchun qisqa videolar.",
    visual: "reel",
    accent: "#4aa8ff",
  },
  {
    id: "brand-animation",
    number: "04",
    title: "Brand Animation",
    description: "Brend identifikatsiyasi va logo animation.",
    visual: "logo",
    accent: "#3ad6c5",
  },
  {
    id: "promo-videos",
    number: "05",
    title: "Promo Videos",
    description:
      "Xizmat va loyihalarni tanishtiruvchi promo videolar.",
    visual: "beam",
    accent: "#ffcf4a",
  },
  {
    id: "custom-creative",
    number: "06",
    title: "Custom Creative",
    description: "Sizning g‘oyangiz asosida maxsus kreativ video.",
    visual: "geo",
    accent: "#ff60a0",
  },
];

/** Pricing tiers — no invented prices, all "CUSTOM PRICE". Edit here. */

export interface PricingTier {
  id: string;
  name: string;
  summary: string;
  features: string[];
  featured?: boolean;
}

export const pricing: PricingTier[] = [
  {
    id: "starter",
    name: "STARTER",
    summary: "Kichik, lekin ta'sirchan motion video.",
    features: [
      "Short motion video",
      "Basic creative direction",
      "Social media format",
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    summary: "Brendingiz uchun professional reklama videosi.",
    features: [
      "Professional advertising video",
      "Individual concept",
      "Advanced visual effects",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "PREMIUM",
    summary: "To‘liq maxsus kreativ ishlab chiqarish.",
    features: [
      "Custom creative project",
      "More complex motion scenes",
      "Individual production approach",
    ],
  },
];

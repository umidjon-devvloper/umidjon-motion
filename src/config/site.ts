/**
 * SINGLE SOURCE OF TRUTH for all contact + brand configuration.
 * Edit values here only — nothing is hard-coded elsewhere.
 *
 * TELEGRAM: replace `telegramUsername` with the real handle (without the @).
 * The contact form opens a prefilled Telegram chat using this value.
 */

export const site = {
  brand: {
    name: "UMIDJON MOTION",
    shortName: "Umidjon Motion",
    tagline: "AI Motion & Creative Video Studio",
  },

  contact: {
    /** Telegram username WITHOUT the leading @. Used for CTAs + contact form. */
    telegramUsername: "umidjon_motion", // TODO: replace with your real Telegram handle
    /** Instagram username WITHOUT the leading @. */
    instagramUsername: "umidjon_motion",
  },

  /**
   * Contact-form delivery runs through the serverless function at /api/lead.
   * The Telegram bot token + chat ID live there as PRIVATE env vars
   * (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID), never in the client bundle.
   * See api/lead.js and .env.example.
   */
  leadEndpoint: "/api/lead",

  /** Short Uzbek/English copy reused across sections. */
  copy: {
    heroSupport:
      "Biznesingiz uchun e'tiborni tortadigan, zamonaviy AI motion va kreativ reklama videolari.",
  },
} as const;

/** Full https links derived from the config above. */
export const links = {
  get telegram() {
    return `https://t.me/${site.contact.telegramUsername}`;
  },
  get instagram() {
    return `https://instagram.com/${site.contact.instagramUsername}`;
  },
  /** Opens Telegram with a prefilled message (project brief). */
  telegramWithMessage(message: string) {
    return `https://t.me/${site.contact.telegramUsername}?text=${encodeURIComponent(
      message,
    )}`;
  },
} as const;

/**
 * Sends a contact-form brief through the serverless lead endpoint, which
 * forwards it to Telegram using the private bot token. Resolves true on
 * success, false on any failure so the UI can fall back to opening a manual
 * Telegram chat. Never throws.
 */
export async function sendTelegramLead(message: string): Promise<boolean> {
  try {
    const res = await fetch(site.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return Boolean(res.ok && data?.ok);
  } catch {
    return false;
  }
}

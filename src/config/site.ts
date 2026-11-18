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
   * Telegram BOT delivery for the contact form.
   * The form submits straight to this bot, which messages the chat below.
   *
   * ⚠️ SECURITY: because this is a static site, the bot token ships inside the
   * public JavaScript bundle — anyone can read it in the browser. Treat it as
   * public. If it leaks / gets abused, regenerate it in @BotFather and paste the
   * new one here. For a fully private token, move the send() call behind a tiny
   * serverless endpoint later (see README).
   */
  telegramBot: {
    token: "8908287961:AAEFz90S5MnHLXimwhWddMdGuxAH6qeUzq8",
    /** Chat ID that receives every new project request. */
    chatId: "6052648076",
  },

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
 * Sends a contact-form brief to the Telegram bot, which delivers it to the
 * configured chat. Resolves true on success, false on any failure so the UI
 * can fall back to opening a manual Telegram chat. Never throws.
 */
export async function sendTelegramLead(message: string): Promise<boolean> {
  const { token, chatId } = site.telegramBot;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return Boolean(res.ok && data?.ok);
  } catch {
    return false;
  }
}

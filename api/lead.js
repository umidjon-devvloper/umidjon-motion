/**
 * Vercel Serverless Function — contact-form lead delivery.
 *
 * The Telegram bot token lives ONLY here, as a private environment variable,
 * never in the client bundle. Set these in your Vercel project settings
 * (Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN   e.g. 123456:ABC...   (from @BotFather)
 *   TELEGRAM_CHAT_ID     e.g. 6052648076       (chat that receives leads)
 *
 * The browser POSTs { message } to /api/lead; this function forwards it to
 * Telegram so the token is never exposed publicly.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res
      .status(500)
      .json({ ok: false, error: "server_not_configured" });
  }

  // Body may arrive parsed (Vercel) or as a raw string.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const message = body && typeof body.message === "string" ? body.message : "";
  if (!message.trim()) {
    return res.status(400).json({ ok: false, error: "empty_message" });
  }
  // Guard against oversized payloads (Telegram caps at 4096 chars).
  const text = message.slice(0, 4000);

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    );
    const data = await tgRes.json().catch(() => null);
    if (tgRes.ok && data && data.ok) {
      return res.status(200).json({ ok: true });
    }
    return res.status(502).json({ ok: false, error: "telegram_failed" });
  } catch {
    return res.status(502).json({ ok: false, error: "network_error" });
  }
}

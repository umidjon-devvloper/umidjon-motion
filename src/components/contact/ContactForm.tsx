import { useState } from "react";
import { links, site, sendTelegramLead } from "../../config/site";
import { Reveal } from "../common/Reveal";
import { StudioIcon } from "../common/StudioIcon";
import "./contact.css";

interface FormState {
  name: string;
  business: string;
  videoType: string;
  budget: string;
  contact: string;
  description: string;
}

const EMPTY: FormState = {
  name: "",
  business: "",
  videoType: "",
  budget: "",
  contact: "",
  description: "",
};

const VIDEO_TYPES = [
  "AI Motion Video",
  "Reklama / Commercial",
  "Product Motion",
  "Instagram Reels",
  "Brand Animation",
  "Promo Video",
  "Custom Creative",
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, boolean>> = {};
    if (!form.name.trim()) next.name = true;
    if (!form.videoType) next.videoType = true;
    if (!form.contact.trim()) next.contact = true;
    if (!form.description.trim()) next.description = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildBrief = (f: FormState) =>
    [
      "🎬 YANGI LOYIHA SO‘ROVI — UMIDJON MOTION",
      "",
      `👤 Ism: ${f.name}`,
      f.business ? `🏢 Biznes/Brend: ${f.business}` : null,
      `🎞 Video turi: ${f.videoType}`,
      f.budget ? `💰 Taxminiy byudjet: ${f.budget}` : null,
      `📞 Aloqa: ${f.contact}`,
      "",
      "📝 Loyiha tavsifi:",
      f.description,
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    const text = buildBrief(form);
    setBrief(text);
    setStatus("sending");
    const ok = await sendTelegramLead(text);
    if (ok) {
      setStatus("sent");
      setForm(EMPTY);
    } else {
      // Delivery failed (network/token). Fall back to a manual Telegram chat so
      // the lead is never lost — we never claim it was delivered automatically.
      setStatus("error");
      window.open(
        links.telegramWithMessage(text),
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <section className="section contact contact--neon" id="contact">
      <div className="contact__ambient" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal>
            <span className="eyebrow">Contact Experience</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-title">
              TELL US<br />YOUR <span className="accent-text">IDEA.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead contact__lead">
              Loyihangiz haqida qisqacha yozing — biz siz bilan Telegram orqali
              bog‘lanamiz.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="contact__channels">
              <a
                className="contact__channel"
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StudioIcon name="telegram" />
                <span className="contact__channel-label">Telegram</span>
                <span className="contact__channel-value">
                  @{site.contact.telegramUsername} ↗
                </span>
              </a>
              <a
                className="contact__channel"
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StudioIcon name="instagram" />
                <span className="contact__channel-label">Instagram</span>
                <span className="contact__channel-value">
                  @{site.contact.instagramUsername} ↗
                </span>
              </a>
            </div>
          </Reveal>
          <div className="contact__art" aria-hidden="true"><img src="/contact-clapper.png" alt="" width="1024" height="1024" loading="lazy" /></div>
        </div>

        <form className="contact__form surface" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="c-name">Your name *</label>
            <span className="field__icon"><StudioIcon name="user" /></span>
            <input
              id="c-name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={errors.name ? "is-error" : ""}
              placeholder="Ismingiz"
            />
          </div>

          <div className="field">
            <label htmlFor="c-business">Business or brand</label>
            <span className="field__icon"><StudioIcon name="business" /></span>
            <input
              id="c-business"
              value={form.business}
              onChange={(e) => update("business", e.target.value)}
              placeholder="Brend nomi (ixtiyoriy)"
            />
          </div>

          <div className="field">
            <label htmlFor="c-type">What kind of video do you need? *</label>
            <span className="field__icon"><StudioIcon name="video" /></span>
            <select
              id="c-type"
              value={form.videoType}
              onChange={(e) => update("videoType", e.target.value)}
              className={errors.videoType ? "is-error" : ""}
            >
              <option value="">Tanlang…</option>
              {VIDEO_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="c-budget">Approximate budget</label>
            <span className="field__icon"><StudioIcon name="budget" /></span>
            <input
              id="c-budget"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              placeholder="Masalan: $300–$500 (ixtiyoriy)"
            />
          </div>

          <div className="field">
            <label htmlFor="c-contact">Telegram username or phone *</label>
            <span className="field__icon"><StudioIcon name="telegram" /></span>
            <input
              id="c-contact"
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              className={errors.contact ? "is-error" : ""}
              placeholder="@username yoki +998 .."
            />
          </div>

          <div className="field">
            <label htmlFor="c-desc">Project description *</label>
            <span className="field__icon"><StudioIcon name="pencil" /></span>
            <textarea
              id="c-desc"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={errors.description ? "is-error" : ""}
              placeholder="G‘oyangiz, mahsulotingiz va maqsadingiz haqida qisqacha…"
            />
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="contact__error">
              Iltimos, * belgilangan maydonlarni to‘ldiring.
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={status === "sending"}
          >
            <StudioIcon name="telegram" />
            {status === "sending" ? "YUBORILMOQDA…" : "SEND PROJECT REQUEST →"}
          </button>

          {status === "sent" && (
            <div className="contact__result contact__result--ok" role="status">
              <p>
                ✅ Rahmat! So‘rovingiz <strong>yuborildi</strong>. Jamoamiz tez
                orada siz bilan Telegram orqali bog‘lanadi.
              </p>
            </div>
          )}

          {status === "error" && brief && (
            <div className="contact__result" role="status">
              <p>
                Avtomatik yuborishda xatolik bo‘ldi — Telegram yangi oynada
                ochildi. Xabarni <strong>yuborish uchun “Send” tugmasini bosing</strong>.
                Agar oyna ochilmagan bo‘lsa:
              </p>
              <a
                className="contact__result-link"
                href={links.telegramWithMessage(brief)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegramni qo‘lda ochish ↗
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

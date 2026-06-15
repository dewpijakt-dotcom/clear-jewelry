'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT, useLocale } from '@/components/LanguageProvider';
import { BRAND } from '@/lib/brand';

/**
 * Booking form — collects name / phone / LINE / date / time / message,
 * formats them as a single clipboard-friendly block, copies to the
 * clipboard on submit (or via the "Copy" button), then opens LINE so
 * the visitor can paste straight into the chat with @clearjewelry.
 *
 * Submission policy: we don't run our own backend. LINE IS the booking
 * channel. The form's job is to (a) gather the right details and (b)
 * make pasting into LINE one tap on mobile, two clicks on desktop.
 */

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '15:00'] as const;
type TimeSlot = (typeof TIME_SLOTS)[number];

// QR generated client-side via api.qrserver.com — no extra dependency.
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(
  BRAND.lineUrl,
)}`;

export default function BookingForm() {
  const t = useT();
  const { locale } = useLocale();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [line, setLine] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState<TimeSlot>('11:00');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<null | { kind: 'ok' | 'err'; text: string }>(null);
  const [qrOpen, setQrOpen] = useState(false);

  // Earliest selectable date = today (YYYY-MM-DD in the user's locale)
  const todayISO = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // Auto-clear toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 5500);
    return () => clearTimeout(id);
  }, [toast]);

  function buildSummary(): string {
    const lines = [
      t('book.summary.heading'),
      '———————————————',
      `${t('book.name.label')}: ${name || '—'}`,
      `${t('book.phone.label')}: ${phone || '—'}`,
      `${t('book.line.label')}: ${line || '—'}`,
      email ? `${t('book.email.label')}: ${email}` : null,
      `${t('book.date.label')}: ${date || '—'}`,
      `${t('book.time.label')}: ${time}`,
      '',
      `${t('book.message.label')}:`,
      message || '—',
    ].filter(Boolean);
    return lines.join('\n');
  }

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch { /* fall through */ }
    // Legacy fallback (Safari iOS < 13 + non-secure contexts)
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  async function handleCopy(): Promise<void> {
    const ok = await copyToClipboard(buildSummary());
    setToast(ok
      ? { kind: 'ok',  text: t('book.copy.confirm') }
      : { kind: 'err', text: t('book.copy.error') });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = await copyToClipboard(buildSummary());
    setToast(ok
      ? { kind: 'ok',  text: t('book.copy.confirm') }
      : { kind: 'err', text: t('book.copy.error') });
    // Auto-open LINE on mobile after a brief delay so the toast is visible.
    setTimeout(() => {
      window.open(BRAND.lineUrl, '_blank', 'noopener,noreferrer');
    }, 1200);
  }

  return (
    <section className="bg-ivory pt-40 lg:pt-48 pb-32 lg:pb-40" lang={locale}>
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        {/* Header */}
        <header className="text-center">
          <p className="eyebrow text-gold-deep">{t('book.eyebrow')}</p>
          <h1 className="display mt-5 text-charcoal" style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.04 }}>
            {t('book.title.l1')}
            <span className="display-italic text-gold"> {t('book.title.l2')}</span>
          </h1>
          <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-2xl mx-auto mt-7 leading-relaxed">
            {t('book.intro')}
          </p>
          <hr className="gold-rule mx-auto mt-10" />
        </header>

        {/* LINE-add panel — sits above the form so users add the official
            account before they even start typing. */}
        <aside
          className="mt-12 lg:mt-16 bg-charcoal text-ivory p-8 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center"
          style={{ boxShadow: '0 24px 60px -40px rgba(0,0,0,0.4)' }}
        >
          <div>
            <p className="eyebrow text-gold-light">{t('book.line.required.title')}</p>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/90 mt-3 leading-relaxed max-w-2xl">
              {t('book.line.required.body')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href={BRAND.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-charcoal px-7 py-3.5 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-ivory transition-colors duration-500"
              >
                {t('book.add.line')} <span>→</span>
              </a>
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-gold-light hover:text-ivory transition-colors duration-500 underline underline-offset-[6px] decoration-gold/60"
              >
                {t('book.qr.caption')}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            aria-label={t('book.qr.caption')}
            className="justify-self-start lg:justify-self-end shrink-0 bg-ivory p-3 hover:scale-[1.02] transition-transform duration-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={QR_SRC} alt="LINE @clearjewelry QR code" width={140} height={140} />
            <p className="text-charcoal mt-2 text-center font-sans text-[10px] uppercase tracking-[0.32em]">
              {BRAND.lineHandle}
            </p>
          </button>
        </aside>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-14 lg:mt-20 grid lg:grid-cols-2 gap-x-12 gap-y-10"
        >
          <Field id="bk-name" label={t('book.name.label')} required>
            <input
              id="bk-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('book.name.ph')}
              className="field"
              autoComplete="name"
            />
          </Field>
          <Field id="bk-phone" label={t('book.phone.label')} required>
            <input
              id="bk-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('book.phone.ph')}
              className="field"
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>
          <Field id="bk-line" label={t('book.line.label')} required>
            <input
              id="bk-line"
              type="text"
              required
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder={t('book.line.ph')}
              className="field"
            />
          </Field>
          <Field id="bk-email" label={t('book.email.label')}>
            <input
              id="bk-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('book.email.ph')}
              className="field"
              autoComplete="email"
            />
          </Field>
          <Field id="bk-date" label={t('book.date.label')} required>
            <input
              id="bk-date"
              type="date"
              required
              min={todayISO}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="field"
            />
          </Field>
          <div className="lg:col-span-1">
            <span className="block font-sans text-[10.5px] uppercase tracking-[0.32em] text-gold-deep mb-3">
              {t('book.time.label')} *
            </span>
            <div role="radiogroup" aria-label={t('book.time.label')} className="flex flex-wrap gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const active = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTime(slot)}
                    className={
                      'px-5 py-3 font-sans text-[13px] tracking-[0.14em] tabular-nums border transition-all duration-500 ease-elegant ' +
                      (active
                        ? 'bg-charcoal text-ivory border-charcoal'
                        : 'bg-transparent text-charcoal border-[var(--rule)] hover:border-gold hover:text-gold')
                    }
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-sans italic text-[12.5px] text-charcoal/70">{t('book.time.note')}</p>
          </div>

          <div className="lg:col-span-2">
            <Field id="bk-message" label={t('book.message.label')}>
              <textarea
                id="bk-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('book.message.ph')}
                className="field min-h-[140px] py-4 resize-y"
                rows={5}
              />
            </Field>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <p className="font-sans italic text-[12.5px] text-charcoal/65 text-center max-w-xl mx-auto">
              {t('book.consent')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center">
              <button
                type="submit"
                className="cta-book-primary inline-flex items-center justify-center gap-3 bg-charcoal text-ivory px-10 py-[18px] font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-all duration-500 ease-elegant"
                style={{ boxShadow: '0 18px 38px -22px rgba(0,0,0,0.55), 0 0 0 1px rgba(216,190,126,0.55)' }}
              >
                {t('book.submit')} <span>→</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-3 bg-transparent text-charcoal border border-charcoal px-9 py-[17px] font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-charcoal hover:text-ivory transition-all duration-500 ease-elegant"
              >
                {t('book.copy.btn')}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Toast (confirmation / error) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className={
              'fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] max-w-md px-6 py-4 font-sans text-[13px] leading-snug text-center ' +
              (toast.kind === 'ok'
                ? 'bg-charcoal text-ivory border border-gold'
                : 'bg-ivory text-charcoal border border-red-700')
            }
            style={{ boxShadow: '0 24px 48px -20px rgba(0,0,0,0.4)' }}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enlarged QR modal */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setQrOpen(false)}
            className="fixed inset-0 z-[95] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory p-6 lg:p-8 text-center max-w-md w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={QR_SRC} alt="LINE @clearjewelry QR code" width={320} height={320} className="mx-auto w-full max-w-[320px] aspect-square" />
              <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep">
                {t('book.qr.caption')}
              </p>
              <a
                href={BRAND.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-3 bg-charcoal text-ivory px-8 py-3.5 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-colors duration-500"
              >
                {t('book.add.line')} →
              </a>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close"
                className="absolute top-5 right-5 text-ivory text-[11px] uppercase tracking-[0.28em] p-2 hover:text-gold-light"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block font-sans text-[10.5px] uppercase tracking-[0.32em] text-gold-deep mb-3">
        {label}{required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}

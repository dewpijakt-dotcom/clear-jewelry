'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT, useLocale } from '@/components/LanguageProvider';
import { BRAND } from '@/lib/brand';

/**
 * Booking form — collects name / phone / email / LINE / date / time / message.
 *
 * On submit:
 *  - POSTs to /api/book (validates + dispatches to LINE + Sheets)
 *  - On 200 ok: replaces the form with an editorial confirmation block
 *    (Cormorant italic display, gold rule, brief receipt). No toasts, no
 *    confetti — the page itself becomes the confirmation.
 *  - On failure: keeps the form, shows a quiet error line, and auto-copies
 *    the details to the clipboard so the visitor can paste to LINE.
 *
 * Also keeps "Copy my details" as an independent affordance + the LINE QR
 * panel above the form, so a visitor in a hurry can chat now without
 * filling the form.
 */

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '15:00'] as const;
type TimeSlot = (typeof TIME_SLOTS)[number];

const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(
  BRAND.lineUrl,
)}`;

type Submission = {
  name: string;
  phone: string;
  email: string;
  line: string;
  date: string;
  time: TimeSlot;
  message: string;
};

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
  const honeyRef = useRef<HTMLInputElement | null>(null);

  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState<Submission | null>(null);
  const [toast, setToast] = useState<null | { kind: 'ok' | 'err'; text: string }>(null);
  const [qrOpen, setQrOpen] = useState(false);

  const todayISO = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 5500);
    return () => clearTimeout(id);
  }, [toast]);

  function buildSummary(d: Submission): string {
    return [
      t('book.summary.heading'),
      '———————————————',
      `${t('book.name.label')}: ${d.name || '—'}`,
      `${t('book.phone.label')}: ${d.phone || '—'}`,
      `${t('book.line.label')}: ${d.line || '—'}`,
      d.email ? `${t('book.email.label')}: ${d.email}` : null,
      `${t('book.date.label')}: ${d.date || '—'}`,
      `${t('book.time.label')}: ${d.time}`,
      '',
      `${t('book.message.label')}:`,
      d.message || '—',
    ].filter(Boolean).join('\n');
  }

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch { /* fall through */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch { return false; }
  }

  async function handleCopy(): Promise<void> {
    const d: Submission = { name, phone, email, line, date, time, message };
    const ok = await copyToClipboard(buildSummary(d));
    setToast(ok
      ? { kind: 'ok',  text: t('book.copy.confirm') }
      : { kind: 'err', text: t('book.copy.error') });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const d: Submission = { name, phone, email, line, date, time, message };
    setSending(true);
    // Always copy to clipboard as a safety net — works even if the API
    // call fails, so the visitor can paste straight into LINE.
    await copyToClipboard(buildSummary(d));
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...d,
          locale,
          honeypot: honeyRef.current?.value || '',
        }),
      });
      if (res.status === 429) {
        setToast({ kind: 'err', text: t('book.error.rate') });
        setSending(false);
        return;
      }
      const json = await res.json().catch(() => ({ ok: false }));
      if (!json.ok) {
        setToast({ kind: 'err', text: t('book.error.generic') });
        setSending(false);
        return;
      }
      // Success — switch the page to the confirmation block.
      setConfirmed(d);
      setSending(false);
      // Scroll to top of the section for the confirmation reveal.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setToast({ kind: 'err', text: t('book.error.generic') });
      setSending(false);
    }
  }

  /* ─── Confirmation view ────────────────────────────────────────── */
  if (confirmed) {
    const formattedDate = (() => {
      try {
        return new Date(confirmed.date + 'T00:00:00').toLocaleDateString(
          locale === 'th' ? 'th-TH' : 'en-GB',
          { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        );
      } catch {
        return confirmed.date;
      }
    })();

    const contactLine = [
      confirmed.line && `LINE ${confirmed.line}`,
      confirmed.phone,
      confirmed.email,
    ].filter(Boolean).join(' · ');

    const thanks = t('book.success.thanks').replace('{name}', confirmed.name);
    const body = t('book.success.body')
      .replace('{date}', formattedDate)
      .replace('{time}', confirmed.time);

    return (
      <section className="bg-ivory pt-40 lg:pt-48 pb-32 lg:pb-40" lang={locale}>
        <div className="mx-auto max-w-[760px] px-6 lg:px-10 text-center">
          <p className="eyebrow text-gold-deep">{t('book.eyebrow')}</p>

          <h1
            className="display-italic text-charcoal mt-8 leading-[1.18]"
            style={{ fontSize: 'clamp(34px, 5.2vw, 64px)' }}
          >
            {thanks}
          </h1>

          <p
            className="display text-charcoal/80 mt-7 lg:mt-9 leading-[1.55] max-w-[640px] mx-auto"
            style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
          >
            {body}
          </p>

          <hr className="gold-rule mx-auto mt-10" />

          {/* Quiet receipt */}
          <dl className="mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-left max-w-[520px] mx-auto">
            <ReceiptRow label={t('book.success.detail.name')} value={confirmed.name} />
            <ReceiptRow label={t('book.success.detail.date')} value={formattedDate} />
            {contactLine && (
              <ReceiptRow label={t('book.success.detail.contact')} value={contactLine} />
            )}
            <ReceiptRow label={t('book.success.detail.time')} value={confirmed.time} />
            {confirmed.message && (
              <div className="sm:col-span-2">
                <dt className="font-sans text-[10.5px] uppercase tracking-[0.32em] text-gold-deep mb-2">
                  {t('book.success.detail.message')}
                </dt>
                <dd className="font-sans italic text-[14.5px] tracking-[0.02em] text-charcoal/80 leading-relaxed">
                  {confirmed.message}
                </dd>
              </div>
            )}
          </dl>

          <hr className="gold-rule mx-auto mt-12" />

          {/* Quiet secondary affordance */}
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.32em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5"
          >
            {t('book.success.lineCta')} <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    );
  }

  /* ─── Form view ────────────────────────────────────────────────── */
  return (
    <section className="bg-ivory pt-40 lg:pt-48 pb-32 lg:pb-40" lang={locale}>
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
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

        <aside
          className="mt-12 lg:mt-16 bg-charcoal text-ivory p-6 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center text-center lg:text-left"
          style={{ boxShadow: '0 24px 60px -40px rgba(0,0,0,0.4)' }}
        >
          <div>
            <p className="eyebrow text-gold-light">{t('book.line.required.title')}</p>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/90 mt-3 leading-relaxed max-w-2xl">
              {t('book.line.required.body')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start">
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
            className="justify-self-center lg:justify-self-end shrink-0 bg-ivory p-3 hover:scale-[1.02] transition-transform duration-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={QR_SRC} alt="LINE @clearjewelry QR code" width={140} height={140} />
            <p className="text-charcoal mt-2 text-center font-sans text-[10px] uppercase tracking-[0.32em]">
              {BRAND.lineHandle}
            </p>
          </button>
        </aside>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-14 lg:mt-20 grid lg:grid-cols-2 gap-x-12 gap-y-10"
        >
          {/* Honeypot — invisible to humans, bots fill it */}
          <input
            ref={honeyRef}
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden
            className="absolute opacity-0 pointer-events-none -left-[9999px] h-0 w-0"
          />

          <Field id="bk-name" label={t('book.name.label')} required>
            <input id="bk-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t('book.name.ph')} className="field" autoComplete="name" />
          </Field>
          <Field id="bk-phone" label={t('book.phone.label')} required>
            <input id="bk-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('book.phone.ph')} className="field" autoComplete="tel" inputMode="tel" />
          </Field>
          <Field id="bk-line" label={t('book.line.label')} required>
            <input id="bk-line" type="text" required value={line} onChange={(e) => setLine(e.target.value)} placeholder={t('book.line.ph')} className="field" />
          </Field>
          <Field id="bk-email" label={t('book.email.label')}>
            <input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('book.email.ph')} className="field" autoComplete="email" />
          </Field>
          <Field id="bk-date" label={t('book.date.label')} required>
            <input id="bk-date" type="date" required min={todayISO} value={date} onChange={(e) => setDate(e.target.value)} className="field" />
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
              <textarea id="bk-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('book.message.ph')} className="field min-h-[140px] py-4 resize-y" rows={5} />
            </Field>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <p className="font-sans italic text-[12.5px] text-charcoal/65 text-center max-w-xl mx-auto">
              {t('book.consent')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center">
              <button
                type="submit"
                disabled={sending}
                className="cta-book-primary inline-flex items-center justify-center gap-3 bg-charcoal text-ivory w-full sm:w-auto px-8 sm:px-10 py-[18px] font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-all duration-500 ease-elegant disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 18px 38px -22px rgba(0,0,0,0.55), 0 0 0 1px rgba(216,190,126,0.55)' }}
              >
                {sending ? t('book.submit.sending') : t('book.submit')} {!sending && <span>→</span>}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-3 bg-transparent text-charcoal border border-charcoal w-full sm:w-auto px-8 sm:px-9 py-[17px] font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-charcoal hover:text-ivory transition-all duration-500 ease-elegant"
              >
                {t('book.copy.btn')}
              </button>
            </div>
          </div>
        </form>
      </div>

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

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[10.5px] uppercase tracking-[0.32em] text-gold-deep mb-2">{label}</dt>
      <dd className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/90 leading-relaxed">{value}</dd>
    </div>
  );
}

function Field({
  id, label, required, children,
}: {
  id: string; label: string; required?: boolean; children: React.ReactNode;
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

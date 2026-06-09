'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';

interface FormState {
  name: string;
  phone: string;
  line: string;
  date: string;
  time: string;
  interest: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  line: '',
  date: '',
  time: '',
  interest: 'Rings',
  message: '',
};

const INTEREST_OPTIONS = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Rubies',
  'Sapphires',
  'Diamonds',
  'Bespoke commission',
  'Other',
];

const TIME_SLOTS = [
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

/**
 * BookForm — the appointment request form.
 *
 * Submission strategy:
 *   1. Validate every field in React.
 *   2. Log the payload to the console for inspection during demo.
 *   3. Build a pre-filled LINE-friendly message and forward the user to the
 *      client's LINE Official account (@clearjewelry) with the message ready
 *      to send. LINE is the primary contact channel.
 *   4. Show an elegant in-page success state.
 */
export default function BookForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.phone.trim() && !form.line.trim())
      next.phone = 'Please share a phone or LINE so we can confirm.';
    if (!form.date) next.date = 'Please choose a preferred date.';
    if (!form.time) next.time = 'Please choose a preferred time.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    // 1) Log payload for the dev to inspect.
    // eslint-disable-next-line no-console
    console.log('[CLEAR Jewelry · appointment request]', form);

    // 2) Build a LINE-friendly summary the visitor can paste.
    const summary = [
      'CLEAR JEWELRY — Appointment request',
      `Name: ${form.name}`,
      `Phone: ${form.phone || '—'}`,
      `LINE ID: ${form.line || '—'}`,
      `Preferred date: ${form.date}`,
      `Preferred time: ${form.time}`,
      `Area of interest: ${form.interest}`,
      form.message ? `\nMessage:\n${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    // 3) Copy to clipboard so the visitor can paste in LINE after the redirect.
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary).catch(() => undefined);
    }

    // 4) Open the LINE Official account in a new tab — they can paste + send.
    if (typeof window !== 'undefined') {
      window.open(BRAND.lineUrl, '_blank', 'noreferrer');
    }

    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center py-16"
        >
          <p className="eyebrow text-gold-deep mb-6">Thank you</p>
          <h3 className="display text-[clamp(36px,5vw,60px)] leading-tight max-w-xl mx-auto">
            Your details are ready to
            <span className="display-italic text-gold"> send on LINE.</span>
          </h3>
          <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-md mx-auto mt-8 leading-relaxed">
            We have copied your appointment details to your clipboard and opened
            our LINE Official account in a new tab. Just paste &amp; send —
            we&apos;ll reply within one business day to confirm.
          </p>
          <hr className="gold-rule mx-auto mt-10" />
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={BRAND.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid"
            >
              Open LINE again <span className="btn-arrow">→</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setStatus('idle');
              }}
              className="font-sans text-[11px] uppercase tracking-[0.28em] text-charcoal/70 hover:text-charcoal pt-4 sm:pt-0"
            >
              Send another request
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={submit}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7"
        >
          <Field label="Full name" error={errors.name}>
            <input
              className="field"
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="name"
              required
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input
              className="field"
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field label="LINE ID" className="md:col-span-2">
            <input
              className="field"
              type="text"
              value={form.line}
              onChange={(e) => update('line', e.target.value)}
              placeholder="@yourlineid"
            />
          </Field>
          <Field label="Preferred date" error={errors.date}>
            <input
              className="field"
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              required
            />
          </Field>
          <Field label="Preferred time" error={errors.time}>
            <select
              className="field appearance-none cursor-pointer"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
              required
            >
              <option value="">Select a time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Area of interest" className="md:col-span-2">
            <select
              className="field appearance-none cursor-pointer"
              value={form.interest}
              onChange={(e) => update('interest', e.target.value)}
            >
              {INTEREST_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Anything else?" className="md:col-span-2">
            <textarea
              className="field min-h-[120px] resize-y"
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="A stone, a budget, an inspiration photo — anything that helps us prepare."
            />
          </Field>

          <div className="md:col-span-2 pt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
              {status === 'sending' ? (
                'Opening LINE…'
              ) : (
                <>
                  Send via LINE <span className="btn-arrow">→</span>
                </>
              )}
            </button>
            <p className="font-sans text-[11.5px] tracking-[0.14em] uppercase text-charcoal/55">
              We confirm appointments on LINE within one business day.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label">{label}</label>
      {children}
      {error && (
        <p className="font-sans text-[11px] tracking-[0.04em] text-red-700 mt-2">{error}</p>
      )}
    </div>
  );
}

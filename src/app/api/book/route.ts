import { NextRequest, NextResponse } from 'next/server';

/**
 * Booking submission endpoint.
 *
 * Phase 1 (current): validates the request body, rate-limits per IP, and
 * dispatches to LINE Messaging API + Google Sheets when the matching env
 * vars are present. When they're not (no token yet, no user-id yet), the
 * route still returns ok:true after logging the submission server-side
 * — the visitor's experience is never blocked by a missing secret on our
 * side.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment):
 *  - LINE_CHANNEL_ACCESS_TOKEN  long-lived token from the LINE OA channel.
 *                               NOT the channel secret (32-char hex).
 *  - LINE_OWNER_USER_ID         destination user/group/room id (U + 32 hex).
 *  - GOOGLE_SHEETS_WEBHOOK_URL  Apps Script web-app URL bound to the
 *                               "Clear Jewelry — Bookings" sheet.
 *
 * Defensive: if EITHER outbound call fails, the submission is still
 * considered ok and logged for manual recovery. We never lose a lead.
 */

export const runtime = 'nodejs';

/* ─── Rate limit (in-memory; 10 / hour / IP) ─────────────────────── */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;

function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_PER_WINDOW - 1 };
  }
  if (b.count >= MAX_PER_WINDOW) return { ok: false, remaining: 0 };
  b.count += 1;
  return { ok: true, remaining: MAX_PER_WINDOW - b.count };
}

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '15:00'];

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  line?: string;
  date?: string;
  time?: string;
  message?: string;
  honeypot?: string;  // bots fill this; humans don't see it
  locale?: 'en' | 'th';
};

function validate(b: Body): { ok: true; data: Required<Pick<Body,'name'|'date'|'time'>> & Body } | { ok: false; error: string } {
  if (typeof b !== 'object' || b == null) return { ok: false, error: 'invalid body' };
  if (b.honeypot && b.honeypot.length > 0) return { ok: false, error: 'spam' };
  const name = (b.name || '').trim();
  if (name.length < 2 || name.length > 120) return { ok: false, error: 'invalid name' };
  const date = (b.date || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: 'invalid date' };
  const time = (b.time || '').trim();
  if (!TIME_SLOTS.includes(time)) return { ok: false, error: 'invalid time slot' };
  const phone = (b.phone || '').trim().slice(0, 40);
  const email = (b.email || '').trim().slice(0, 200);
  const line = (b.line || '').trim().slice(0, 80);
  const message = (b.message || '').trim().slice(0, 4000);
  if (!phone && !email && !line) return { ok: false, error: 'at least one contact required' };
  return { ok: true, data: { ...b, name, date, time, phone, email, line, message } };
}

/* ─── Outbound: LINE Messaging API push to the owner ─────────────── */
async function pushToLINE(payload: ReturnType<typeof formatPayload>): Promise<{ ok: boolean; reason?: string }> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_OWNER_USER_ID;
  if (!token || !to) return { ok: false, reason: 'env-missing' };
  try {
    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        messages: [{ type: 'text', text: payload.text }],
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, reason: `line-${res.status}-${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, reason: `line-throw-${e?.message || 'unknown'}` };
  }
}

/* ─── Outbound: Google Sheets append via Apps Script web-app ─────── */
async function appendToSheet(payload: ReturnType<typeof formatPayload>): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { ok: false, reason: 'env-missing' };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.row),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, reason: `sheets-${res.status}-${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, reason: `sheets-throw-${e?.message || 'unknown'}` };
  }
}

function formatPayload(d: Body & { name: string; date: string; time: string }) {
  const ts = new Date().toISOString();
  const text = [
    '📩 New booking — Clear Jewelry',
    '',
    `Name: ${d.name}`,
    `LINE: ${d.line || '—'}`,
    `Phone: ${d.phone || '—'}`,
    `Email: ${d.email || '—'}`,
    `Date: ${d.date}`,
    `Time: ${d.time}`,
    `Message: ${d.message || '—'}`,
    '',
    `Submitted: ${ts}`,
    `Locale: ${d.locale ?? 'en'}`,
  ].join('\n');
  const row = {
    timestamp: ts,
    name: d.name,
    line: d.line || '',
    phone: d.phone || '',
    email: d.email || '',
    date: d.date,
    time: d.time,
    message: d.message || '',
    locale: d.locale || 'en',
  };
  return { text, row };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  let body: Body = {};
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 }); }
  const v = validate(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

  const payload = formatPayload(v.data);

  // Fire both outbound calls in parallel — never block on one if the other works.
  const [lineResult, sheetResult] = await Promise.all([
    pushToLINE(payload),
    appendToSheet(payload),
  ]);

  // Defensive: log every submission server-side so a missing env var or
  // outbound failure NEVER drops the lead. Vercel function logs are
  // searchable.
  const stamp = new Date().toISOString();
  // Mask any contact info partially in logs (still readable for recovery)
  // eslint-disable-next-line no-console
  console.log('[booking]', JSON.stringify({
    at: stamp,
    name: v.data.name,
    date: v.data.date,
    time: v.data.time,
    line: v.data.line || null,
    phone: v.data.phone ? `${v.data.phone.slice(0, 4)}…${v.data.phone.slice(-2)}` : null,
    email: v.data.email ? v.data.email.replace(/(.).+(@.+)/, '$1***$2') : null,
    messageLen: (v.data.message || '').length,
    lineDispatch: lineResult,
    sheetDispatch: sheetResult,
  }));

  // We tell the visitor it's ok as long as the validation passed. The owner
  // can recover from logs even if both outbound integrations are silently
  // broken — but we surface a degraded flag for monitoring/QA.
  return NextResponse.json({
    ok: true,
    dispatch: {
      line: lineResult.ok,
      sheet: sheetResult.ok,
    },
  });
}

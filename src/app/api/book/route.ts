import { NextRequest, NextResponse } from 'next/server';

/**
 * Booking submission endpoint.
 *
 * On every valid POST:
 *  1. Append the row to the owner's "Clear Jewelry — Bookings" Google
 *     Sheet via the Apps Script Web App.
 *  2. Push a text notification to the admin LINE Group via the
 *     Messaging API.
 *
 * Both fire in parallel. Either failure is non-fatal — Sheets is the
 * canonical record, LINE is the notification. The visitor's submission
 * always succeeds at the UI as long as validation passed.
 *
 * Env (set in Vercel → Settings → Environment Variables):
 *   GOOGLE_SHEETS_WEBHOOK_URL  Apps Script web-app URL (Sheets append)
 *   LINE_CHANNEL_ACCESS_TOKEN  long-lived Messaging API token
 *   LINE_GROUP_ID              C-prefixed admin group id (captured via
 *                              /api/line-webhook one-time setup)
 *
 * If any env is missing the corresponding dispatch is skipped silently
 * and the submission still succeeds. /api/book/health reports which
 * are set.
 */

export const runtime = 'nodejs';

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '15:00'] as const;

const ALLOWED_ORIGINS = new Set([
  'https://clear-jewelry.vercel.app',
  'https://clear-jewelry-git-main-kirbykung168-arts-projects.vercel.app',
]);

/* ─── Rate limit (in-memory; 10 / hour / IP) ─────────────────────── */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;

function rateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= MAX_PER_WINDOW) return { ok: false };
  b.count += 1;
  return { ok: true };
}

type Body = {
  name?: string; phone?: string; email?: string; line?: string;
  date?: string; time?: string; message?: string;
  honeypot?: string; locale?: 'en' | 'th';
};
type Validated = {
  name: string; phone: string; email: string; line: string;
  date: string; time: (typeof TIME_SLOTS)[number];
  message: string; locale: 'en' | 'th';
};

function validate(b: Body): { ok: true; data: Validated } | { ok: false; error: string } {
  if (typeof b !== 'object' || b == null) return { ok: false, error: 'invalid body' };
  const name = (b.name || '').trim();
  if (name.length < 2 || name.length > 120) return { ok: false, error: 'invalid name' };
  const date = (b.date || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: 'invalid date' };
  const time = (b.time || '').trim();
  if (!(TIME_SLOTS as readonly string[]).includes(time)) return { ok: false, error: 'invalid time slot' };
  const phone = (b.phone || '').trim().slice(0, 40);
  const email = (b.email || '').trim().slice(0, 200);
  const line  = (b.line  || '').trim().slice(0, 80);
  const message = (b.message || '').trim().slice(0, 4000);
  if (!phone && !email && !line) return { ok: false, error: 'at least one contact required' };
  const locale: 'en' | 'th' = b.locale === 'th' ? 'th' : 'en';
  return { ok: true, data: { name, phone, email, line, date, time: time as Validated['time'], message, locale } };
}

/* ─── Outbound: Google Sheets via Apps Script web-app ────────────── */
async function appendToSheet(row: ReturnType<typeof buildRow>):
  Promise<{ ok: boolean; status?: number; reason?: string }>
{
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { ok: false, reason: 'no_url' };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      redirect: 'follow',
    });
    if (res.ok) return { ok: true, status: res.status };
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, reason: `sheets_${res.status}: ${body.slice(0, 200)}` };
  } catch (e: any) {
    return { ok: false, reason: `throw: ${e?.message || 'unknown'}` };
  }
}

/* ─── Outbound: LINE Messaging API — push to admin group ─────────── */
async function pushToLINEGroup(text: string):
  Promise<{ ok: boolean; status?: number; reason?: string }>
{
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_GROUP_ID;
  if (!token) return { ok: false, reason: 'no_token' };
  if (!to)    return { ok: false, reason: 'no_group_id' };
  try {
    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        messages: [{ type: 'text', text }],
      }),
    });
    if (res.ok) return { ok: true, status: res.status };
    const body = await res.text().catch(() => '');
    const tag =
      res.status === 401 ? 'auth_failed' :
      res.status === 400 ? 'bad_request' :
      res.status === 429 ? 'rate_limited' :
      res.status >= 500 ? 'line_server_error' : 'unknown';
    return { ok: false, status: res.status, reason: `${tag}: ${body.slice(0, 200)}` };
  } catch (e: any) {
    return { ok: false, reason: `throw: ${e?.message || 'unknown'}` };
  }
}

function buildRow(d: Validated) {
  return {
    timestamp: new Date().toISOString(),
    name: d.name,
    line: d.line || '',
    phone: d.phone || '',
    email: d.email || '',
    date: d.date,
    time: d.time,
    message: d.message || '',
    locale: d.locale,
  };
}

function buildLineText(d: Validated, ts: string): string {
  const contactSummary = [
    d.line  ? `LINE ${d.line}` : null,
    d.phone || null,
    d.email || null,
  ].filter(Boolean).join(' · ');
  return [
    '📩 New booking — Clear Jewelry',
    '',
    `Name: ${d.name}`,
    `Contact: ${contactSummary || '—'}`,
    `Date: ${d.date}`,
    `Time: ${d.time}`,
    `Message: ${d.message || '—'}`,
    `Locale: ${d.locale}`,
    '',
    `Submitted: ${ts}`,
  ].join('\n');
}

export async function POST(req: NextRequest) {
  // Same-origin gate
  const origin = req.headers.get('origin');
  const okOrigin = !origin || ALLOWED_ORIGINS.has(origin) ||
    (origin.endsWith('.vercel.app') && /clear-jewelry|kirbykung168/.test(origin));
  if (!okOrigin) {
    return NextResponse.json({ ok: false, error: 'origin_not_allowed' }, { status: 403 });
  }

  // Rate limit
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (!rateLimit(ip).ok) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Body = {};
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }

  // Honeypot — silent ok, no dispatch.
  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true, dispatch: { sheet: false, line: false, honeypot: true } });
  }

  const v = validate(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

  const row = buildRow(v.data);
  const text = buildLineText(v.data, row.timestamp);

  const [sheetResult, lineResult] = await Promise.all([
    appendToSheet(row),
    pushToLINEGroup(text),
  ]);

  // eslint-disable-next-line no-console
  console.log('[booking]', JSON.stringify({
    at: row.timestamp,
    name: v.data.name,
    date: v.data.date,
    time: v.data.time,
    line: v.data.line || null,
    phone: v.data.phone ? `${v.data.phone.slice(0, 4)}…${v.data.phone.slice(-2)}` : null,
    email: v.data.email ? v.data.email.replace(/(.).+(@.+)/, '$1***$2') : null,
    messageLen: (v.data.message || '').length,
    locale: v.data.locale,
    ip,
    sheetDispatch: sheetResult,
    lineDispatch: lineResult,
  }));

  return NextResponse.json({
    ok: true,
    dispatch: { sheet: sheetResult.ok, line: lineResult.ok },
  });
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'method_not_allowed' }, { status: 405 });
}

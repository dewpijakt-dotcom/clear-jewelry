import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * One-time LINE webhook capture.
 *
 * Setup (Kirby does this once):
 *   1. LINE Developers Console → channel 2010419323 → Messaging API
 *   2. Webhook URL: https://clear-jewelry.vercel.app/api/line-webhook
 *   3. Toggle "Use webhook" ON, click Verify
 *   4. Create a LINE Group "Clear Jewelry Bookings"; invite admins + the OA
 *   5. Send any message in the group (or wait for the OA-joined event)
 *   6. Open Vercel → Functions → /api/line-webhook → look for a log line
 *      starting `[LINE-WEBHOOK] captured groupId=…`
 *   7. Copy that groupId, paste into Vercel env var LINE_GROUP_ID, redeploy
 *
 * Signature is validated against LINE_CHANNEL_SECRET (the 32-char hex
 * from Basic settings). If the secret isn't set, the endpoint logs a
 * warning and accepts the event so initial verification still works,
 * but it's expected to be set in production.
 */

export const runtime = 'nodejs';

function timingSafeEqual(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

export async function POST(req: NextRequest) {
  // Read raw body — signature is HMAC-SHA256 of the request body bytes.
  const raw = await req.text();
  const signatureHeader = req.headers.get('x-line-signature') || '';
  const secret = process.env.LINE_CHANNEL_SECRET;

  if (secret) {
    const expected = crypto
      .createHmac('sha256', secret)
      .update(raw)
      .digest('base64');
    if (!timingSafeEqual(signatureHeader, expected)) {
      // eslint-disable-next-line no-console
      console.warn('[LINE-WEBHOOK] signature mismatch — rejecting');
      return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 401 });
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('[LINE-WEBHOOK] LINE_CHANNEL_SECRET not set — accepting without verification (setup mode)');
  }

  let body: any = {};
  try { body = JSON.parse(raw || '{}'); } catch { body = {}; }
  const events = Array.isArray(body.events) ? body.events : [];

  // Log every captured source identifier. The owner copies whichever they need.
  for (const ev of events) {
    const src = ev?.source || {};
    if (src.type === 'group' && src.groupId) {
      // eslint-disable-next-line no-console
      console.log(`[LINE-WEBHOOK] captured groupId=${src.groupId} (event ${ev.type})`);
    } else if (src.type === 'room' && src.roomId) {
      // eslint-disable-next-line no-console
      console.log(`[LINE-WEBHOOK] captured roomId=${src.roomId} (event ${ev.type})`);
    } else if (src.type === 'user' && src.userId) {
      // eslint-disable-next-line no-console
      console.log(`[LINE-WEBHOOK] captured userId=${src.userId} (event ${ev.type})`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[LINE-WEBHOOK] event with unknown source: ${JSON.stringify(src).slice(0, 200)}`);
    }
  }

  // Always 200 — LINE retries on non-2xx and we don't want it spamming.
  return NextResponse.json({ ok: true, events: events.length });
}

// LINE's Verify button issues a POST; GET is just for human curl-checks.
export function GET() {
  return NextResponse.json({
    service: 'clear-jewelry LINE webhook',
    note: 'POST endpoint for LINE Messaging API webhook events. See OWNER_GUIDE.md for setup.',
  });
}

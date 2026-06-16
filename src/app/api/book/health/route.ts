import { NextResponse } from 'next/server';

/**
 * Health check for the booking pipeline.
 *
 * GET /api/book/health → returns which env vars are wired without ever
 * leaking the actual values. Use it after setting Vercel env vars and
 * redeploying:
 *
 *   curl https://clear-jewelry.vercel.app/api/book/health
 *   → { env: { lineToken: 'set', lineUserId: 'set', sheetsUrl: 'set' }, ... }
 *
 * All-three set + a recent Vercel deploy = production ready for the next
 * /api/book submission to fire end-to-end.
 */
export const runtime = 'nodejs';

export function GET() {
  const env = {
    lineToken:  process.env.LINE_CHANNEL_ACCESS_TOKEN ? 'set' : 'missing',
    lineUserId: process.env.LINE_OWNER_USER_ID        ? 'set' : 'missing',
    sheetsUrl:  process.env.GOOGLE_SHEETS_WEBHOOK_URL ? 'set' : 'missing',
  } as const;
  const allReady =
    env.lineToken === 'set' &&
    env.lineUserId === 'set' &&
    env.sheetsUrl === 'set';
  return NextResponse.json({
    service: 'clear-jewelry booking pipeline',
    env,
    ready: allReady,
    note: allReady
      ? 'All env vars present; submissions will dispatch to LINE + Sheets.'
      : 'Some env vars missing; submissions will succeed at the UI but skip the missing dispatch.',
    timestamp: new Date().toISOString(),
  });
}

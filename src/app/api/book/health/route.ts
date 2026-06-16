import { NextResponse } from 'next/server';

/**
 * Health check for the booking pipeline.
 *
 *   curl https://clear-jewelry.vercel.app/api/book/health
 *   → { env: { lineToken, lineGroupId, sheetsUrl }, ready, ... }
 *
 * `set` means the env var has a value on this deployment; `missing` means
 * it isn't configured (the corresponding dispatch will be skipped at
 * /api/book POST time without breaking the visitor's submission).
 */
export const runtime = 'nodejs';

export function GET() {
  const env = {
    lineToken:    process.env.LINE_CHANNEL_ACCESS_TOKEN ? 'set' : 'missing',
    lineGroupId:  process.env.LINE_GROUP_ID             ? 'set' : 'missing',
    sheetsUrl:    process.env.GOOGLE_SHEETS_WEBHOOK_URL ? 'set' : 'missing',
  } as const;
  const allReady =
    env.lineToken === 'set' && env.lineGroupId === 'set' && env.sheetsUrl === 'set';
  return NextResponse.json({
    service: 'clear-jewelry booking pipeline',
    env,
    ready: allReady,
    note: allReady
      ? 'All env vars present; submissions will append to the Sheet AND notify the LINE Group.'
      : 'Some env vars missing; submissions still succeed at the UI but the missing dispatch is skipped.',
    timestamp: new Date().toISOString(),
  });
}

import { NextResponse, type NextRequest } from 'next/server';

/**
 * Honour ?lang=en|th|zh URL params for SSR locale resolution.
 *
 * The site renders its initial HTML on the server, picking the locale
 * from the `clear.locale` cookie. That works for returning visitors. But
 * search engines, social cards and our own hreflang alternates point at
 * `/?lang=th` / `/?lang=zh` URLs — and without this middleware those
 * arrive with no cookie and render the EN default.
 *
 * We set the incoming-request cookie (so the SAME request's RSC pipeline
 * sees it via cookies().get('clear.locale')) AND mirror it on the
 * response so it sticks across navigations.
 */
export function middleware(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang');
  if (lang !== 'en' && lang !== 'th' && lang !== 'zh') {
    return NextResponse.next();
  }
  // Patch the incoming request so this same render sees the cookie.
  const requestHeaders = new Headers(req.headers);
  const existing = req.cookies.get('clear.locale')?.value;
  if (existing !== lang) {
    const cookieHeader = requestHeaders.get('cookie') || '';
    const cleaned = cookieHeader
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith('clear.locale='))
      .concat(`clear.locale=${lang}`)
      .join('; ');
    requestHeaders.set('cookie', cleaned);
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.cookies.set('clear.locale', lang, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  // Run on every page except API, _next, and static asset routes; skip
  // /studio so Sanity's own bundle isn't intercepted.
  matcher: ['/((?!api|_next|.*\\..*|studio).*)'],
};

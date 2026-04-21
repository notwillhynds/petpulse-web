import { NextRequest, NextResponse } from 'next/server';

const HOST_SUFFIXES = ['.thedogapi.com', '.thecatapi.com'] as const;

function isAllowedRemoteUrl(url: URL): boolean {
  if (url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase();
  for (const suffix of HOST_SUFFIXES) {
    if (host.endsWith(suffix)) return true;
  }
  return (
    host === 'storage.googleapis.com' &&
    url.pathname.startsWith('/dog-api-uploads-prod/')
  );
}

/**
 * Serves breed images from our origin so the browser does not load third-party
 * CDN URLs directly (avoids ERR_BLOCKED_BY_CLIENT from privacy tools / DNS lists).
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('u');
  if (!raw) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  let remote: URL;
  try {
    remote = new URL(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!isAllowedRemoteUrl(remote)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  const upstream = await fetch(remote.toString(), {
    next: { revalidate: 3600 },
    headers: { Accept: 'image/*,*/*;q=0.8' },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 });
  }

  const contentType = upstream.headers.get('content-type') ?? 'application/octet-stream';
  if (!contentType.startsWith('image/')) {
    return NextResponse.json({ error: 'Not an image' }, { status: 502 });
  }

  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

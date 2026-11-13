const DJANGO = (process.env.DJANGO_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '');

// Kept as a route handler rather than an /api rewrite: with trailingSlash the
// rewrite normalises the URL and loops on Django's APPEND_SLASH redirect.
export async function POST(request: Request) {
  const body = await request.text();

  try {
    const response = await fetch(`${DJANGO}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
    });
    const data = await response.json().catch(() => ({}));
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { errors: { __all__: ['Could not send your message. Please try again.'] } },
      { status: 502 },
    );
  }
}

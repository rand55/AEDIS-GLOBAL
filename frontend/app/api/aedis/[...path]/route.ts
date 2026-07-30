import { NextRequest } from "next/server";

type Context = { params: Promise<{ path: string[] }> };

async function forward(request: NextRequest, context: Context): Promise<Response> {
  const backendBase = process.env.AEDIS_BACKEND_URL;
  const bffSecret = process.env.BFF_SHARED_SECRET;
  if (!backendBase || !bffSecret) return Response.json({ error: "AEDIS backend is not configured" }, { status: 503 });
  const { path } = await context.params;
  const safePath = path.map((segment) => encodeURIComponent(segment)).join("/");
  const target = new URL(`/api/${safePath}${request.nextUrl.search}`, backendBase);
  const headers = new Headers();
  headers.set("X-AEDIS-BFF", bffSecret);
  for (const name of ["content-type", "cookie", "x-csrftoken", "idempotency-key", "x-request-id"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers.set("x-forwarded-for", forwardedFor);

  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
      cache: "no-store",
    });
  } catch (error) {
    console.error("AEDIS private API request failed", error);
    return Response.json(
      { error: "The AEDIS private service is temporarily unavailable" },
      { status: 502 },
    );
  }

  const responseHeaders = new Headers();
  for (const name of ["content-type", "x-request-id", "cache-control"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) responseHeaders.set("set-cookie", setCookie);

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
export const PUT = forward;
export const DELETE = forward;

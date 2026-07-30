export class ApiError extends Error {
  constructor(public status: number, message: string, public requestId?: string) {
    super(message);
  }
}

let csrfToken: string | null = null;

async function getCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;
  const response = await fetch("/api/aedis/v1/auth/csrf", { credentials: "same-origin", cache: "no-store" });
  const data = (await response.json()) as { csrfToken?: unknown; error?: string };
  const token = typeof data.csrfToken === "string" ? data.csrfToken : null;
  if (!response.ok || !token) {
    throw new ApiError(
      response.status,
      data.error ?? "Unable to establish a secure session",
    );
  }
  csrfToken = token;
  return token;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  const unsafe = !["GET", "HEAD", "OPTIONS"].includes(method);
  if (unsafe) {
    headers.set("X-CSRFToken", await getCsrfToken());
    if (!headers.has("Idempotency-Key") && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      headers.set("Idempotency-Key", crypto.randomUUID());
    }
  }
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`/api/aedis/v1${path}`, {
    ...init,
    method,
    headers,
    credentials: "same-origin",
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 400 && String(data.error ?? "").includes("CSRF")) csrfToken = null;
    throw new ApiError(response.status, data.error ?? "Request failed", data.requestId);
  }
  return data as T;
}

export function resetCsrfToken() {
  csrfToken = null;
}

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetch, resetCsrfToken } from "@/lib/api";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const body: Record<string, string> = { email: String(form.get("email")), password: String(form.get("password")) };
    if (mode === "signup") body.fullName = String(form.get("fullName"));
    try {
      const result = await apiFetch<{ account: { role: "registrant" | "reviewer" | "admin" } }>(mode === "login" ? "/auth/login" : "/auth/register", { method: "POST", body: JSON.stringify(body) });
      resetCsrfToken();
      router.push(result.account.role === "registrant" ? "/dashboard" : "/admin");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Unable to complete the request");
    } finally { setBusy(false); }
  }

  return (
    <form className="form" onSubmit={submit}>
      {mode === "signup" && <div className="field"><label htmlFor="fullName">Full name</label><input id="fullName" name="fullName" required maxLength={160} autoComplete="name" /></div>}
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" required type="email" autoComplete="email" /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" required type="password" minLength={14} autoComplete={mode === "login" ? "current-password" : "new-password"} /></div>
      {mode === "signup" && <p className="muted">Use at least 14 characters with upper-case, lower-case, and numeric characters.</p>}
      {error && <div className="notice error">{error}</div>}
      <button className="button primary" disabled={busy} type="submit">{busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}</button>
    </form>
  );
}

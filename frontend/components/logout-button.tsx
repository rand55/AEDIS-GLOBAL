"use client";

import { useRouter } from "next/navigation";
import { apiFetch, resetCsrfToken } from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    try { await apiFetch<{ ok: boolean }>("/auth/logout", { method: "POST", body: "{}" }); } catch {}
    resetCsrfToken();
    router.push("/");
    router.refresh();
  }
  return <button className="button secondary" type="button" onClick={logout}>Sign out</button>;
}

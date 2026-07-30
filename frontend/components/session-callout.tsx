"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Account } from "@/lib/types";

export function SessionCallout() {
  const [account, setAccount] = useState<Account | null | undefined>(undefined);
  useEffect(() => { apiFetch<{ account: Account }>("/auth/me").then((data) => setAccount(data.account)).catch(() => setAccount(null)); }, []);
  if (account === undefined) return <div className="session-callout loading-inline">Checking your local session…</div>;
  if (!account) return <div className="session-callout"><div><strong>Ready to test the connected workflow?</strong><p>Sign in with one of the local demonstration accounts created by the installer.</p></div><Link className="button primary" href="/login">Open secure sign-in</Link></div>;
  return <div className="session-callout"><div><strong>Signed in as {account.fullName}</strong><p>Your role is <span className="mono">{account.role}</span>. Public pages and your private workspace are connected.</p></div><Link className="button primary" href={account.role === "registrant" ? "/dashboard" : "/admin"}>Open your workspace</Link></div>;
}

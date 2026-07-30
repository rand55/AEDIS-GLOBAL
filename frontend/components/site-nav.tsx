"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { Account } from "@/lib/types";
import { LogoutButton } from "@/components/logout-button";

const publicLinks = [
  ["/portal", "Transparency"],
  ["/world", "Global view"],
  ["/opportunities", "Find work"],
  ["/reserve", "Reserve"],
  ["/training", "Training"],
  ["/directory", "Directory"],
  ["/ledger", "Ledger"],
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [account, setAccount] = useState<Account | null>(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiFetch<{ account: Account }>("/auth/me")
      .then((data) => setAccount(data.account))
      .catch(() => setAccount(null))
      .finally(() => setChecked(true));
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="AEDIS Global home">
          <img className="brand-logo" src="/aedis-global-logo.png" alt="AEDIS Global" />
        </Link>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">Menu</button>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary navigation">
          {publicLinks.map(([href, label]) => (
            <Link key={href} className={pathname === href ? "active" : ""} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          {checked && account ? (
            <>
              {account.role === "registrant" && <Link className={pathname.startsWith("/dashboard") || pathname.startsWith("/applications") ? "active" : ""} href="/dashboard">Workspace</Link>}
              {(account.role === "reviewer" || account.role === "admin") && <Link className={pathname.startsWith("/admin") ? "active" : ""} href="/admin">Review workspace</Link>}
              <span className="account-chip" title={account.email}>{account.fullName}</span>
              <LogoutButton />
            </>
          ) : (
            <Link className="nav-signin" href="/login">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

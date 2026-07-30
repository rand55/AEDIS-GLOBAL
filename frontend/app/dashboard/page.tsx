"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import type { Account, Registration } from "@/lib/types";
import { StatusPill } from "@/components/status-pill";

export default function DashboardPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiFetch<{ account: Account }>("/auth/me"),
      apiFetch<{ registrations: Registration[] }>("/registrations"),
    ]).then(([me, records]) => { setAccount(me.account); setRegistrations(records.registrations); })
      .catch((caught) => {
        if (caught instanceof ApiError && caught.status === 401) router.replace("/login");
        else setError(caught instanceof Error ? caught.message : "Unable to load dashboard");
      });
  }, [router]);

  if (error) return <div className="notice error">{error}</div>;
  if (!account) return <div className="loading">Loading your secure workspace…</div>;

  return <>
    <div className="row"><div><div className="eyebrow">Registrant workspace</div><h2>Welcome, {account.fullName}</h2><p>{account.email} · {account.role}</p></div><Link className="button primary" href="/applications/new">New registration</Link></div>
    <section className="section grid three">
      <div className="card"><div className="muted">Applications</div><div className="metric">{registrations.length}</div></div>
      <div className="card"><div className="muted">Approved</div><div className="metric">{registrations.filter((r) => r.status === "approved").length}</div></div>
      <div className="card"><div className="muted">Needs attention</div><div className="metric">{registrations.filter((r) => ["draft", "changes_requested"].includes(r.status)).length}</div></div>
    </section>
    <section className="section card">
      <div className="row"><h2>Your registrations</h2></div>
      {registrations.length === 0 ? <div className="notice">No applications yet. Create one to test the secure workflow.</div> :
      <div className="table-wrap"><table><thead><tr><th>Organization</th><th>Sector</th><th>Location</th><th>Status</th><th>Updated</th></tr></thead><tbody>
        {registrations.map((record) => <tr key={record.id}><td><Link href={`/applications/${record.id}`}><strong>{record.legalName}</strong></Link><br/><span className="code muted">{record.publicId ?? record.id}</span></td><td>{record.sector}</td><td>{record.city}, {record.region}</td><td><StatusPill status={record.status} /></td><td>{new Date(record.updatedAt).toLocaleString()}</td></tr>)}
      </tbody></table></div>}
    </section>
  </>;
}

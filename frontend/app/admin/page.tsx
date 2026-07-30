"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import type { Account, Registration } from "@/lib/types";
import { StatusPill } from "@/components/status-pill";

export default function AdminPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [records, setRecords] = useState<Registration[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    try {
      const me = await apiFetch<{ account: Account }>("/auth/me");
      setAccount(me.account);
      if (!["reviewer", "admin"].includes(me.account.role)) throw new ApiError(403, "A reviewer or administrator account is required");
      const queue = await apiFetch<{ registrations: Registration[] }>("/admin/registrations");
      setRecords(queue.registrations);
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) router.replace("/login");
      else setError(caught instanceof Error ? caught.message : "Unable to load review queue");
    }
  }
  useEffect(() => { load(); }, []);

  async function act(record: Registration, action: string) {
    const note = window.prompt("Add a concise review note:", "Local evaluation decision") ?? "";
    setError(""); setMessage("");
    try {
      if (account?.role === "reviewer") {
        await apiFetch(`/admin/registrations/${record.id}/recommend`, { method: "POST", body: JSON.stringify({ recommendation: action, note }) });
      } else {
        await apiFetch(`/admin/registrations/${record.id}/decide`, { method: "POST", body: JSON.stringify({ decision: action, note }) });
      }
      setMessage("Decision recorded in the tamper-evident audit chain."); await load();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Decision failed"); }
  }

  if (error && !account) return <div className="notice error">{error}</div>;
  if (!account) return <div className="loading">Loading the independent review workspace…</div>;
  return <>
    <div className="row"><div><div className="eyebrow">Separated duties</div><h2>{account.role === "reviewer" ? "Reviewer recommendation queue" : "Administrator decision queue"}</h2><p>Signed in as {account.fullName}. Reviewers recommend; administrators make final decisions.</p></div><span className="status">{account.role}</span></div>
    {message && <div className="notice section">{message}</div>}{error && <div className="notice error section">{error}</div>}
    <section className="section stack">{records.map((record) => <article className="card" key={record.id}><div className="row"><div><div className="eyebrow">{record.sector} · {record.organizationType}</div><h2>{record.legalName}</h2><p>{record.ownerEmail} · {record.city}, {record.region}, {record.country}</p></div><StatusPill status={record.status} /></div><p>{record.summary}</p>{account.role === "admin" && <p><strong>Reviewer recommendation:</strong> {record.reviewerRecommendation ?? "not recorded"}</p>}<div className="actions">{account.role === "reviewer" ? <><button className="button primary" onClick={() => act(record, "approve")}>Recommend approval</button><button className="button secondary" onClick={() => act(record, "changes_requested")}>Request changes</button><button className="button danger" onClick={() => act(record, "reject")}>Recommend rejection</button></> : <><button className="button primary" disabled={record.reviewerRecommendation !== "approve"} onClick={() => act(record, "approve")}>Approve</button><button className="button danger" disabled={record.reviewerRecommendation !== "reject"} onClick={() => act(record, "reject")}>Reject</button></>}</div></article>)}</section>
    {records.length === 0 && <div className="notice section">The review queue is empty.</div>}
  </>;
}

"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Posting = { accountCode: string; debit: string; credit: string; memo: string };
type Transaction = { id: string; reference: string; description: string; currency: string; status: string; createdAt: string; postings: Posting[] };
type LedgerData = { integrity: { balanced: boolean; transactionCount: number; invalidReferences: string[] }; transactions: Transaction[] };

export default function LedgerPage() {
  const [data, setData] = useState<LedgerData | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { apiFetch<LedgerData>("/ledger").then(setData).catch((caught) => setError(caught instanceof Error ? caught.message : "Unable to load ledger")); }, []);
  if (error) return <div className="notice error">{error}</div>;
  if (!data) return <div className="loading">Verifying the public ledger…</div>;
  return <>
    <div className="row"><div><div className="eyebrow">Immutable accounting</div><h2>Public double-entry ledger</h2><p>Amounts are fixed-precision USD postings. Posted records are protected from updates and deletion at the database layer.</p></div><div className={`notice ${data.integrity.balanced ? "" : "error"}`}><strong>{data.integrity.balanced ? "Ledger balanced" : "Integrity failure"}</strong><br/>{data.integrity.transactionCount} posted transactions</div></div>
    <section className="section stack">{data.transactions.map((transaction) => <article className="card" key={transaction.id}><div className="row"><div><div className="eyebrow">{transaction.reference}</div><h3>{transaction.description}</h3></div><span className="status">{transaction.status}</span></div><div className="table-wrap section"><table><thead><tr><th>Account</th><th>Debit ({transaction.currency})</th><th>Credit ({transaction.currency})</th><th>Memo</th></tr></thead><tbody>{transaction.postings.map((posting, index) => <tr key={`${posting.accountCode}-${index}`}><td className="code">{posting.accountCode}</td><td>{posting.debit}</td><td>{posting.credit}</td><td>{posting.memo}</td></tr>)}</tbody></table></div></article>)}</section>
  </>;
}

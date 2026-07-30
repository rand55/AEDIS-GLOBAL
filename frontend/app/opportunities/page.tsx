import type { Metadata } from "next";
import Link from "next/link";
import { publicDemoData } from "@/lib/public-data";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Find Work" };
export default function OpportunitiesPage() {
  const open = publicDemoData.jobs.filter((job) => job.status === "active");
  return <div className="shell page-shell"><header className="page-hero"><div><div className="eyebrow">Business opportunity portal</div><h1>Find work with the requirements visible up front.</h1><p>AEDIS should show scope, evidence expectations, eligibility, budget, and verification rules before a contractor invests in a bid.</p></div><div className="page-side-note"><strong>For local testing</strong><p>These opportunities are illustrative and do not accept real bids.</p><Link href="/signup">Register an organization →</Link></div></header><div className="opportunity-grid">{open.map((job) => <article className="opportunity-card" key={job.id}><div className="row"><span className="status active">Open demonstration</span><span className="mono">{job.id}</span></div><span className="project-kicker">{job.category} · {job.city}, {job.state}</span><h2>{job.title}</h2><p>{job.summary}</p><div className="opportunity-foot"><strong>{formatMoney(job.budget)}</strong><span>Evidence-backed milestones</span></div></article>)}</div><section className="section process-strip"><div><span>1</span><strong>Register</strong><p>Establish organization identity and credentials.</p></div><div><span>2</span><strong>Qualify</strong><p>Match licensing, location, and evidence requirements.</p></div><div><span>3</span><strong>Deliver</strong><p>Publish milestones and independent verification.</p></div><div><span>4</span><strong>Settle</strong><p>Release balanced ledger postings against verified work.</p></div></section></div>;
}

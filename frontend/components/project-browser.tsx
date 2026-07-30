"use client";

import { type ChangeEvent, type MouseEvent, useMemo, useState } from "react";
import { publicDemoData, type DemoJob } from "@/lib/public-data";
import { formatMoney } from "@/lib/format";

const views = ["all", "active", "completed", "flagged"] as const;

function EvidenceMeter({ claimed, verified }: { claimed: number; verified: number }) {
  return <div className="evidence-meter" aria-label={`Claimed ${claimed} percent, verified ${verified} percent`}>
    <div className="meter-labels"><span>Verified {verified}%</span><span>Claimed {claimed}%</span></div>
    <div className="meter-track"><span className="meter-verified" style={{ width: `${verified}%` }} /><span className="meter-claimed" style={{ left: `${claimed}%` }} /></div>
  </div>;
}

export function ProjectBrowser({ initialStatus = "all" }: { initialStatus?: (typeof views)[number] }) {
  const [status, setStatus] = useState<(typeof views)[number]>(initialStatus);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DemoJob | null>(null);
  const projects = useMemo(() => (publicDemoData.jobs as unknown as DemoJob[]).filter((job) => {
    const statusMatch = status === "all" || job.status === status;
    const search = query.toLowerCase().trim();
    const searchMatch = !search || `${job.title} ${job.company} ${job.city} ${job.state} ${job.category}`.toLowerCase().includes(search);
    return statusMatch && searchMatch;
  }), [query, status]);

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  return <>
    <div className="portal-controls">
      <div className="tier-tabs" role="tablist" aria-label="Project status">
        {views.map((view) => <button key={view} className={`tier-tab ${status === view ? "active" : ""}`} type="button" onClick={() => setStatus(view)}>{view === "all" ? "All projects" : view}</button>)}
      </div>
      <label className="search-box"><span className="sr-only">Search projects</span><input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search project, company, city…" /></label>
    </div>
    <div className="stats five">
      <div className="stat"><span>Visible projects</span><strong>{projects.length}</strong></div>
      <div className="stat"><span>Combined budget</span><strong>{formatMoney(totalBudget, true)}</strong></div>
      <div className="stat"><span>Flagged</span><strong className="danger-text">{projects.filter((job) => job.status === "flagged").length}</strong></div>
      <div className="stat"><span>Completed</span><strong>{projects.filter((job) => job.status === "completed").length}</strong></div>
      <div className="stat"><span>Evidence records</span><strong>{projects.reduce((sum, job) => sum + job.payments.length + job.materials.length, 0)}</strong></div>
    </div>
    <div className="project-feed">
      {projects.map((job) => <button type="button" className="project-row" key={job.id} onClick={() => setSelected(job)}>
        <div className="project-main"><span className="project-kicker">{job.category} · {job.city}, {job.state}</span><strong>{job.title}</strong><small>{job.company} · {job.aedis_id}</small></div>
        <EvidenceMeter claimed={job.claimed_pct} verified={job.verified_pct} />
        <div className="project-budget"><strong>{formatMoney(job.budget, true)}</strong><span className={`status ${job.status}`}>{job.status}</span></div>
      </button>)}
      {projects.length === 0 && <div className="empty-state">No demonstration projects match that filter.</div>}
    </div>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
      <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event: MouseEvent<HTMLElement>) => event.stopPropagation()}>
        <div className="modal-head"><div><span className="project-kicker">{selected.id} · {selected.category}</span><h2 id="project-title">{selected.title}</h2><p>{selected.company} · {selected.city}, {selected.state}</p></div><button className="icon-button" type="button" onClick={() => setSelected(null)} aria-label="Close project detail">×</button></div>
        <div className="modal-body">
          <div className="detail-summary"><div><span>Budget</span><strong>{formatMoney(selected.budget)}</strong></div><div><span>Status</span><strong className={`status ${selected.status}`}>{selected.status}</strong></div><div><span>AEDIS ID</span><strong className="mono">{selected.aedis_id}</strong></div></div>
          <EvidenceMeter claimed={selected.claimed_pct} verified={selected.verified_pct} />
          {selected.flag_reason && <div className={`flag-callout ${selected.flag_severity ?? "minor"}`}><strong>Flag reason</strong><p>{selected.flag_reason}</p></div>}
          <p className="lead-small">{selected.summary}</p>
          <div className="detail-grid">
            <section><h3>Payment evidence</h3>{selected.payments.map((payment) => <div className="evidence-item" key={`${selected.id}-${payment.label}`}><div><strong>{payment.label}</strong><span>{formatMoney(payment.amount)}</span></div><p>{payment.note}</p></div>)}</section>
            <section><h3>Material verification</h3>{selected.materials.map((material) => <div className="evidence-item" key={`${selected.id}-${material.item}`}><strong>{material.item}</strong><p>Claimed: {material.spec_claimed}</p><p>Delivered: {material.spec_delivered}</p><small>{material.note}</small></div>)}</section>
          </div>
          <section className="timeline"><h3>Project timeline</h3>{selected.timeline.map((item, index) => <div className="timeline-item" key={`${selected.id}-${index}`}><span>{index + 1}</span><div><strong>{item.label}</strong><p>{item.note || "No exception recorded."}</p></div></div>)}</section>
          <p className="demo-disclaimer">Demonstration record only. Names, projects, and figures in this local portal are illustrative.</p>
        </div>
      </article>
    </div>}
  </>;
}

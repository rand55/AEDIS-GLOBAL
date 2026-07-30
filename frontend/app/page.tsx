import Link from "next/link";
import { publicDemoData } from "@/lib/public-data";
import { formatMoney, formatNumber } from "@/lib/format";
import { SessionCallout } from "@/components/session-callout";

export default function HomePage() {
  const flagged = publicDemoData.jobs.filter((job) => job.status === "flagged").length;
  return <>
    <section className="hero-wrap">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Public infrastructure, visible by design</div>
          <h1>See the promise.<br/><span>Verify the delivery.</span></h1>
          <p className="hero-lead">AEDIS Global connects public project evidence, organization registration, independent review, workforce transition, and balanced accounting in one navigable system.</p>
          <div className="actions"><Link className="button primary" href="/portal">Explore public projects</Link><Link className="button ghost" href="/login">Sign in to AEDIS</Link></div>
          <div className="hero-proof"><span><strong>{formatNumber(publicDemoData.countryTotals.projects, true)}</strong> visible demo projects</span><span><strong>{formatMoney(publicDemoData.countryTotals.funds, true)}</strong> tracked activity</span><span><strong>{publicDemoData.countryTotals.countries}</strong> countries represented</span></div>
        </div>
        <aside className="hero-console">
          <div className="console-head"><span className="live-dot" /> Transparency feed <small>LOCAL DEMO</small></div>
          {publicDemoData.jobs.slice(0, 4).map((project) => <Link className="console-row" href="/portal" key={project.id}><div><span>{project.id}</span><strong>{project.title}</strong><small>{project.city}, {project.state}</small></div><div><b>{project.verified_pct}%</b><span className={`status ${project.status}`}>{project.status}</span></div></Link>)}
          <div className="console-foot"><span>{flagged} flagged records in the detailed sample</span><Link href="/cases">Review cases →</Link></div>
        </aside>
      </div>
    </section>

    <section className="shell overview-strip">
      <article><span>01</span><div><h2>Public evidence</h2><p>Budgets, milestones, materials, claims, and independent verification shown together.</p></div></article>
      <article><span>02</span><div><h2>Controlled registration</h2><p>Organization records remain private until reviewer recommendation and administrator approval.</p></div></article>
      <article><span>03</span><div><h2>Accountable money</h2><p>Fixed-precision, balanced postings provide a durable accounting foundation.</p></div></article>
    </section>

    <section className="shell section-split">
      <div><div className="eyebrow">One connected platform</div><h2 className="display-heading">Public portal outside.<br/>Secure workspace inside.</h2><p className="lead-small">Visitors can explore AEDIS without an account. Signing in adds a private workspace for applications, document intake, review recommendations, and final decisions without sending users to a separate backend interface.</p><div className="feature-list"><span>Public transparency portal</span><span>Global and regional rollups</span><span>Organization registration</span><span>Reviewer and administrator separation</span><span>Public directory projection</span><span>Immutable local ledger</span></div></div>
      <div className="system-map"><div className="system-node public"><strong>PUBLIC SITE</strong><span>Projects · World · Work · Reserve</span></div><div className="system-line"/><div className="system-node bff"><strong>NEXT.JS APPLICATION</strong><span>Same-origin experience and API boundary</span></div><div className="system-line split"/><div className="system-pair"><div className="system-node"><strong>PRIVATE API</strong><span>Identity · registration · review</span></div><div className="system-node"><strong>DATA SERVICES</strong><span>PostgreSQL · Redis · quarantine</span></div></div></div>
    </section>

    <section className="wide-band"><div className="shell"><div className="band-copy"><div className="eyebrow">Explore the system</div><h2>Information should be easy to find before it is easy to trust.</h2></div><div className="explore-grid">
      <Link href="/portal"><span>Transparency</span><strong>Inspect project evidence</strong><p>Compare claimed progress with verified delivery.</p></Link>
      <Link href="/world"><span>Global view</span><strong>Browse country rollups</strong><p>See the scale and distribution of demonstration activity.</p></Link>
      <Link href="/opportunities"><span>Find work</span><strong>Explore open infrastructure needs</strong><p>Understand licensing and evidence expectations.</p></Link>
      <Link href="/reserve"><span>Reserve</span><strong>Study needs-based allocation</strong><p>Explore the illustrative central-bank credit model.</p></Link>
      <Link href="/training"><span>Workforce</span><strong>Review transition programs</strong><p>See training tracks for an automated economy.</p></Link>
      <Link href="/directory"><span>Directory</span><strong>Find approved organizations</strong><p>Only allowlisted public fields are published.</p></Link>
    </div></div></section>

    <section className="shell"><SessionCallout /></section>
  </>;
}

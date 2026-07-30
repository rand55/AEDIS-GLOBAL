import type { Metadata } from "next";
import Link from "next/link";
import { ProjectBrowser } from "@/components/project-browser";

export const metadata: Metadata = { title: "Transparency Portal" };
export default function PortalPage() {
  return <div className="shell page-shell">
    <header className="page-hero"><div><div className="eyebrow">Public transparency portal</div><h1>Every project tells an evidence story.</h1><p>Open a record to compare claimed completion, verified delivery, payment evidence, materials, and timeline events.</p></div><div className="page-side-note"><strong>How to read the portal</strong><p>A mismatch is a signal for review, not automatic proof of wrongdoing. Evidence and context matter.</p><Link href="/cases">See flagged cases →</Link></div></header>
    <ProjectBrowser />
  </div>;
}

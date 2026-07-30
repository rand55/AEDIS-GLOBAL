import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/project-browser";

export const metadata: Metadata = { title: "Flagged Cases" };
export default function CasesPage() {
  return <div className="shell page-shell"><header className="page-hero"><div><div className="eyebrow danger-text">Flagged cases</div><h1>Exceptions become visible before they become normalized.</h1><p>These demonstration records show how claim gaps, material substitutions, or incomplete evidence can trigger review.</p></div><div className="page-side-note danger-panel"><strong>Important</strong><p>AEDIS should surface evidence and preserve due process. Automated flags should never become final punishment by themselves.</p></div></header><ProjectBrowser initialStatus="flagged" /></div>;
}

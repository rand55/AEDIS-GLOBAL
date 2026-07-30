import type { Metadata } from "next";
import { WorldExplorer } from "@/components/world-explorer";
import { publicDemoData } from "@/lib/public-data";
import { formatMoney, formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Global View" };
export default function WorldPage() {
  const totals = publicDemoData.countryTotals;
  return <div className="shell page-shell"><header className="page-hero"><div><div className="eyebrow">Global AEDIS view</div><h1>A shared structure, adapted by region.</h1><p>This local demonstration shows how country rollups could make infrastructure activity visible without forcing every jurisdiction into one operational database.</p></div></header><div className="stats four large"><div className="stat"><span>Countries</span><strong>{totals.countries}</strong></div><div className="stat"><span>Projects</span><strong>{formatNumber(totals.projects, true)}</strong></div><div className="stat"><span>Visible funds</span><strong>{formatMoney(totals.funds, true)}</strong></div><div className="stat"><span>Flagged</span><strong className="danger-text">{formatNumber(totals.flagged)}</strong></div></div><WorldExplorer /><div className="notice subtle section">The global figures are synthetic demonstration data. A production AEDIS design should route regulated records into jurisdiction-specific data cells rather than one universal database.</div></div>;
}

import type { Metadata } from "next";
import { ReserveExplorer } from "@/components/reserve-explorer";

export const metadata: Metadata = { title: "Reserve Model" };
export default function ReservePage() { return <div className="shell page-shell"><header className="page-hero"><div><div className="eyebrow">Needs-based reserve model</div><h1>Credit capacity tied to measurable infrastructure need.</h1><p>Explore a demonstration allocation model combining population, service deficits, absorption capacity, utilization, and inflation risk.</p></div><div className="page-side-note"><strong>Illustrative only</strong><p>This page is a policy simulation, not banking software and not an offer of credit.</p></div></header><ReserveExplorer /></div>; }

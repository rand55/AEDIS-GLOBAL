"use client";

import { useState } from "react";
import { publicDemoData } from "@/lib/public-data";
import { formatMoney, formatNumber } from "@/lib/format";

export function ReserveExplorer() {
  const [code, setCode] = useState("US");
  const country = publicDemoData.reserves.find((item) => item.code === code) ?? publicDemoData.reserves[0];
  return <>
    <div className="reserve-picker">{publicDemoData.reserves.map((item) => <button className={item.code === country.code ? "active" : ""} type="button" key={item.code} onClick={() => setCode(item.code)}>{item.code}<span>{item.name}</span></button>)}</div>
    <section className="reserve-panel">
      <div className="reserve-title"><div><span className="eyebrow">{country.central_bank}</span><h2>{country.name}</h2><p>Population basis: {formatNumber(country.population)}</p></div><div className="needs-index"><span>Needs index</span><strong>{country.allocation.needs_index}</strong></div></div>
      <div className="stats four"><div className="stat"><span>Credit line</span><strong>{formatMoney(country.allocation.credit_line, true)}</strong></div><div className="stat"><span>Drawn</span><strong>{formatMoney(country.allocation.drawn, true)}</strong></div><div className="stat"><span>Remaining</span><strong>{formatMoney(country.allocation.remaining, true)}</strong></div><div className="stat"><span>Utilization</span><strong>{country.allocation.utilization_pct}%</strong></div></div>
      <div className="utilization"><div style={{ width: `${country.allocation.utilization_pct}%` }} /></div>
      <div className="indicator-grid">{country.indicators.map((indicator) => <article key={indicator.key}><div><strong>{indicator.label}</strong><span>{indicator.deficit} deficit score</span></div><div className="indicator-bar"><span style={{ width: `${indicator.deficit}%` }} /></div><p>{indicator.metric}</p><small>{indicator.source}</small></article>)}</div>
      <div className="notice subtle">This is an illustrative needs-allocation model, not a real central-bank facility or financial offer.</div>
    </section>
  </>;
}

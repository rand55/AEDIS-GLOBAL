"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { publicDemoData } from "@/lib/public-data";
import { formatMoney, formatNumber } from "@/lib/format";

export function WorldExplorer() {
  const [query, setQuery] = useState("");
  const [showBuilt, setShowBuilt] = useState(false);
  const countries = useMemo(() => publicDemoData.countries.filter((country) => {
    const matches = !query.trim() || `${country.name} ${country.code}`.toLowerCase().includes(query.toLowerCase());
    return matches && (!showBuilt || country.built);
  }), [query, showBuilt]);
  return <>
    <div className="world-toolbar"><input value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder="Search country or code…" /><label className="check"><input type="checkbox" checked={showBuilt} onChange={(event: ChangeEvent<HTMLInputElement>) => setShowBuilt(event.target.checked)} /> Show detailed demo regions only</label></div>
    <div className="country-grid">{countries.map((country) => <article className={`country-card ${country.built ? "built" : ""}`} key={country.code}>
      <div className="country-head"><span className="country-code">{country.code}</span>{country.built && <span className="detail-badge">Detailed demo</span>}</div>
      <h3>{country.name}</h3>
      <div className="country-metrics"><div><strong>{formatNumber(country.projects, true)}</strong><span>projects</span></div><div><strong className={country.flagged ? "danger-text" : ""}>{country.flagged}</strong><span>flagged</span></div></div>
      <p>{formatMoney(country.funds, true)} in visible demonstration activity.</p>
    </article>)}</div>
  </>;
}

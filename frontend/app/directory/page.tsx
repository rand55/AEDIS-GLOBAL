"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Organization = { publicId: string; legalName: string; sector: string; organizationType: string; country: string; region: string; city: string; summary: string };

export default function DirectoryPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState("");
  async function load(query = "") {
    try { const data = await apiFetch<{ organizations: Organization[] }>(`/directory${query}`); setOrganizations(data.organizations); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to load directory"); }
  }
  useEffect(() => { load(); }, []);
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const params = new URLSearchParams();
    for (const name of ["sector", "country", "region"]) { const value = String(form.get(name) ?? "").trim(); if (value) params.set(name, value); }
    const query = params.toString(); load(query ? `?${query}` : "");
  }
  return <>
    <div className="eyebrow">Public projection</div><h2>AEDIS organization directory</h2><p>Only explicitly approved fields are exposed. Contact information, documents, review notes, and internal identifiers remain private.</p>
    <form className="card form-grid" onSubmit={search}>
      <div className="field"><label htmlFor="sector">Sector</label><input id="sector" name="sector" placeholder="water" /></div>
      <div className="field"><label htmlFor="country">Country</label><input id="country" name="country" maxLength={2} placeholder="US" /></div>
      <div className="field"><label htmlFor="region">Region</label><input id="region" name="region" placeholder="Washington" /></div>
      <div className="field"><label>&nbsp;</label><button className="button primary" type="submit">Filter directory</button></div>
    </form>
    {error && <div className="notice error section">{error}</div>}
    <section className="section grid two">{organizations.map((org) => <article className="card" key={org.publicId}><div className="eyebrow">{org.sector}</div><h2>{org.legalName}</h2><p>{org.summary}</p><div className="kv"><strong>AEDIS ID</strong><span className="code">{org.publicId}</span></div><div className="kv"><strong>Type</strong><span>{org.organizationType.replaceAll("_", " ")}</span></div><div className="kv"><strong>Location</strong><span>{org.city}, {org.region}, {org.country}</span></div></article>)}</section>
    {!error && organizations.length === 0 && <div className="notice section">No approved organizations match this filter.</div>}
  </>;
}

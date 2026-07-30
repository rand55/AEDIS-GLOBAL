"use client";

import { FormEvent, useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import type { Registration } from "@/lib/types";

const fallbackSectors = ["agriculture", "construction", "energy", "engineering", "healthcare", "logistics", "mining", "research", "telecommunications", "water"];
const fallbackTypes = ["company", "facility", "nonprofit", "public_agency", "professional"];

export function RegistrationForm({ registration, onSaved }: { registration?: Registration; onSaved: (record: Registration) => void }) {
  const [sectors, setSectors] = useState(fallbackSectors);
  const [types, setTypes] = useState(fallbackTypes);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ sectors: string[]; organizationTypes: string[] }>("/registrations/schema")
      .then((data) => { setSectors(data.sectors); setTypes(data.organizationTypes); }).catch(() => {});
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, string | number> = {
      legalName: String(form.get("legalName")), sector: String(form.get("sector")),
      organizationType: String(form.get("organizationType")), country: String(form.get("country")),
      region: String(form.get("region")), city: String(form.get("city")),
      contactEmail: String(form.get("contactEmail")), summary: String(form.get("summary")),
    };
    if (registration) payload.version = registration.version;
    try {
      const data = await apiFetch<{ registration: Registration }>(registration ? `/registrations/${registration.id}` : "/registrations", {
        method: registration ? "PATCH" : "POST", body: JSON.stringify(payload),
      });
      onSaved(data.registration);
    } catch (caught) { setError(caught instanceof ApiError ? caught.message : "Unable to save registration"); }
    finally { setBusy(false); }
  }

  return <form className="form" onSubmit={submit}>
    <div className="form-grid">
      <div className="field full"><label htmlFor="legalName">Legal organization name</label><input id="legalName" name="legalName" required maxLength={240} defaultValue={registration?.legalName} /></div>
      <div className="field"><label htmlFor="sector">Sector</label><select id="sector" name="sector" required defaultValue={registration?.sector ?? "engineering"}>{sectors.map((value) => <option key={value} value={value}>{value}</option>)}</select></div>
      <div className="field"><label htmlFor="organizationType">Organization type</label><select id="organizationType" name="organizationType" required defaultValue={registration?.organizationType ?? "company"}>{types.map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></div>
      <div className="field"><label htmlFor="country">Country code</label><input id="country" name="country" required minLength={2} maxLength={2} defaultValue={registration?.country ?? "US"} /></div>
      <div className="field"><label htmlFor="region">State / region</label><input id="region" name="region" required maxLength={120} defaultValue={registration?.region} /></div>
      <div className="field"><label htmlFor="city">City</label><input id="city" name="city" required maxLength={120} defaultValue={registration?.city} /></div>
      <div className="field"><label htmlFor="contactEmail">Contact email</label><input id="contactEmail" name="contactEmail" type="email" required maxLength={320} defaultValue={registration?.contactEmail} /></div>
      <div className="field full"><label htmlFor="summary">Public summary</label><textarea id="summary" name="summary" maxLength={2000} defaultValue={registration?.summary} /></div>
    </div>
    {error && <div className="notice error">{error}</div>}
    <button className="button primary" type="submit" disabled={busy}>{busy ? "Saving…" : registration ? "Save changes" : "Create draft"}</button>
  </form>;
}

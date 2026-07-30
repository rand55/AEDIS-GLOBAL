"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import type { Registration } from "@/lib/types";
import { RegistrationForm } from "@/components/registration-form";
import { StatusPill } from "@/components/status-pill";

export default function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [record, setRecord] = useState<Registration | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function reload() {
    apiFetch<{ registration: Registration }>(`/registrations/${id}`).then((data) => setRecord(data.registration)).catch((caught) => {
      if (caught instanceof ApiError && caught.status === 401) router.replace("/login");
      else setError(caught instanceof Error ? caught.message : "Unable to load application");
    });
  }
  useEffect(reload, [id]);

  async function submitApplication() {
    setError(""); setMessage("");
    try {
      const data = await apiFetch<{ registration: Registration }>(`/registrations/${id}/submit`, { method: "POST", body: JSON.stringify({ note: "Submitted through the AEDIS local portal" }) });
      setRecord(data.registration); setMessage("Application submitted for independent review.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to submit"); }
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      await apiFetch(`/registrations/${id}/documents`, { method: "POST", body: form });
      setMessage("Document accepted into local quarantine. It is not considered verified.");
      reload(); formElement.reset();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Upload failed"); }
  }

  if (error && !record) return <div className="notice error">{error}</div>;
  if (!record) return <div className="loading">Loading application…</div>;
  const editable = ["draft", "changes_requested"].includes(record.status);

  return <div className="stack">
    <section className="card"><div className="row"><div><div className="eyebrow">Registration record</div><h2>{record.legalName}</h2><div className="code muted">{record.publicId ?? record.id}</div></div><StatusPill status={record.status} /></div>{message && <div className="notice section">{message}</div>}{error && <div className="notice error section">{error}</div>}</section>
    {editable ? <section className="card"><h2>Application details</h2><RegistrationForm registration={record} onSaved={(updated) => { setRecord(updated); setMessage("Changes saved."); }} /></section> :
      <section className="card"><h2>Submitted details</h2>{[["Sector",record.sector],["Organization type",record.organizationType],["Location",`${record.city}, ${record.region}, ${record.country}`],["Contact",record.contactEmail],["Summary",record.summary]].map(([k,v]) => <div className="kv" key={k}><strong>{k}</strong><span>{v}</span></div>)}</section>}
    {editable && <section className="grid two">
      <form className="card form" onSubmit={upload}><h2>Quarantine a document</h2><p>Local testing accepts signature-verified PDF, PNG, JPEG, or DOCX files up to 5 MB. Files remain quarantined.</p><div className="field"><label htmlFor="category">Category</label><select id="category" name="category"><option value="license">License</option><option value="insurance">Insurance</option><option value="identity">Identity</option><option value="incorporation">Incorporation</option><option value="other">Other</option></select></div><div className="field"><label htmlFor="file">File</label><input id="file" name="file" type="file" required accept=".pdf,.png,.jpg,.jpeg,.docx" /></div><button className="button secondary" type="submit">Upload to quarantine</button></form>
      <div className="card"><h2>Submit for review</h2><p>Submission locks editing until a reviewer requests changes. Approval requires a reviewer recommendation followed by a distinct administrator.</p><button className="button primary" type="button" onClick={submitApplication}>Submit application</button></div>
    </section>}
    <section className="card"><h2>Documents</h2>{record.documents.length === 0 ? <p>No documents attached.</p> : <div className="table-wrap"><table><thead><tr><th>Name</th><th>Category</th><th>Status</th><th>SHA-256</th></tr></thead><tbody>{record.documents.map((doc) => <tr key={doc.id}><td>{doc.originalName}</td><td>{doc.category}</td><td><StatusPill status={doc.scanStatus} /></td><td className="code">{doc.sha256}</td></tr>)}</tbody></table></div>}</section>
  </div>;
}

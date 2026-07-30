"use client";

import { useRouter } from "next/navigation";
import { RegistrationForm } from "@/components/registration-form";

export default function NewApplicationPage() {
  const router = useRouter();
  return <section className="card"><div className="eyebrow">Secure intake</div><h2>Create a registration draft</h2><p>Your account becomes the authoritative owner. Anonymous claim tokens are intentionally not used.</p><RegistrationForm onSaved={(record) => router.push(`/applications/${record.id}`)} /></section>;
}

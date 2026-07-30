import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Create Account" };
export default function SignupPage() {
  return <div className="shell auth-layout"><section className="auth-intro"><div className="eyebrow">Organization registration</div><h1>Create a private workspace before publishing anything.</h1><p>New records remain private drafts. Only an approved public projection appears in the AEDIS directory after independent review.</p><div className="auth-points"><span>Private-by-default applications</span><span>Optimistic concurrency</span><span>Quarantined local documents</span><span>Audited state transitions</span></div><Link href="/directory">Browse the public directory →</Link></section><section className="card auth-card"><div className="eyebrow">New registrant</div><h2>Create your local account</h2><AuthForm mode="signup" /><p>Already registered? <Link href="/login"><strong>Sign in</strong></Link>.</p></section></div>;
}

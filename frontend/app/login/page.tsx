import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign In" };
export default function LoginPage() {
  return <div className="shell auth-layout">
    <section className="auth-intro"><div className="eyebrow">Connected AEDIS access</div><h1>Sign in without leaving the public site.</h1><p>Your session unlocks the role-specific workspace while the public transparency portal remains available in the same navigation.</p><div className="auth-points"><span>Server-side Redis sessions</span><span>Same-origin CSRF protection</span><span>Registration ownership checks</span><span>Separate reviewer and administrator duties</span></div><Link href="/">← Return to the public home page</Link></section>
    <section className="card auth-card"><div className="eyebrow">Local demonstration account</div><h2>Sign in to AEDIS</h2><AuthForm mode="login" /><div className="demo-accounts"><strong>Available local roles</strong><div><span>Registrant</span><code>user@aedis.local</code></div><div><span>Reviewer</span><code>reviewer@aedis.local</code></div><div><span>Administrator</span><code>admin@aedis.local</code></div><p>Passwords are stored in <code>LOCAL_TEST_ACCOUNTS.txt</code> inside the extracted AEDIS folder. You can also double-click <code>show_AEDIS_accounts.bat</code>.</p></div><p>Need a new registrant account? <Link href="/signup"><strong>Create one</strong></Link>.</p></section>
  </div>;
}

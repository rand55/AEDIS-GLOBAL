import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: { default: "AEDIS Global", template: "%s · AEDIS Global" },
  description: "A connected local demonstration of transparent infrastructure, secure registration, independent review, and public accountability.",
  icons: { icon: "/aedis-icon.png", apple: "/aedis-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/aedis-global-logo.png" alt="AEDIS Global" /></Link><p>Advanced Economic Development and Infrastructure System — local integrated demonstration.</p></div>
            <div><strong>Explore</strong><Link href="/portal">Transparency portal</Link><Link href="/world">Global view</Link><Link href="/opportunities">Find work</Link></div>
            <div><strong>Accountability</strong><Link href="/directory">Public directory</Link><Link href="/ledger">Public ledger</Link><Link href="/about">Architecture and scope</Link></div>
          </div>
          <div className="shell footer-note">All projects, organizations, countries, indicators, and amounts shown in this local build are illustrative unless explicitly identified otherwise. Do not enter real regulated data.</div>
        </footer>
      </body>
    </html>
  );
}

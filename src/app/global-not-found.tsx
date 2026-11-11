import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Page not found — UPM Digital Campus (prototype)", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#fff4e5] px-4 py-2 text-sm text-[#5c3200]"><strong>Independent Concept Prototype — Not an Official UPM Website.</strong></div>
        <main className="container-page py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">404</p>
          <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
          <p className="mt-3 text-ink-muted">This address does not exist in the prototype.</p>
          <p className="mt-6"><Link href="/en" className="rounded-lg bg-brand-700 px-5 py-2.5 font-semibold text-white">Go to the homepage</Link></p>
        </main>
      </body>
    </html>
  );
}

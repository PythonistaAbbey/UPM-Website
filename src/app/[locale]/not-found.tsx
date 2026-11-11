import Link from "next/link";

// Rendered inside the locale layout when a page calls notFound().
export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-muted">The page you asked for does not exist in this prototype. <span lang="ms">Halaman tidak ditemui.</span></p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/en" className="rounded-lg bg-brand-700 px-5 py-2.5 font-semibold text-white">Go to the homepage</Link>
        <Link href="/en/search" className="rounded-lg border border-brand-700 px-5 py-2.5 font-semibold text-brand-700">Search the prototype</Link>
      </div>
    </div>
  );
}

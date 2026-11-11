import Link from "next/link";

// Rendered inside the locale layout when a page calls notFound().
export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-muted">The page you asked for does not exist in this prototype. <span lang="ms">Halaman tidak ditemui.</span></p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/en" className="inline-flex min-h-11 items-center rounded-full bg-brand-600 px-6 font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700">Go to the homepage</Link>
        <Link href="/en/search" className="inline-flex min-h-11 items-center rounded-full border border-brand-700 bg-white/80 px-6 font-semibold text-brand-700 transition hover:bg-brand-50">Search the prototype</Link>
      </div>
    </div>
  );
}

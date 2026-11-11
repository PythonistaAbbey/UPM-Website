"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-20 text-center" role="alert">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-ink-muted">This page could not be displayed. <span lang="ms">Berlaku ralat.</span></p>
      <button type="button" onClick={reset} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand-600 px-6 font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700">Try again</button>
    </div>
  );
}

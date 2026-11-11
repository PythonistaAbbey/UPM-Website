"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-20 text-center" role="alert">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-ink-muted">This page could not be displayed. <span lang="ms">Berlaku ralat.</span></p>
      <button type="button" onClick={reset} className="mt-6 rounded-lg bg-brand-700 px-5 py-2.5 font-semibold text-white">Try again</button>
    </div>
  );
}

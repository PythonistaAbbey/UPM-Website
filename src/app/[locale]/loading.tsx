export default function Loading() {
  return (
    <div className="container-page py-16" role="status" aria-live="polite">
      <div className="h-8 w-1/2 animate-pulse rounded bg-surface-alt" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-surface-alt" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

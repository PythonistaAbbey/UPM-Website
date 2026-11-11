import type { Provenance } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";

export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#e9c58f] bg-demo-bg px-2.5 py-0.5 text-xs font-semibold text-demo">
      <span aria-hidden="true">◆</span> {label}
    </span>
  );
}

/** Shows whether a record is demonstration content or verified, with source IDs. */
export function ProvenanceNote({ p, d, compact = false }: { p: Provenance; d: Dictionary; compact?: boolean }) {
  if (p.status === "demo") {
    return (
      <span className="inline-flex flex-wrap items-center gap-2">
        <DemoBadge label={d.demo} />
        {!compact && p.note && <span className="text-xs text-ink-muted">{p.note}</span>}
      </span>
    );
  }
  return (
    <span className="text-xs text-ink-muted">
      {d.verified} · {d.source} {p.sources.join(", ")} · {d.checked} {p.checked}
    </span>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { locations, locationCategories } from "@/data/locations";
import { normalise } from "@/lib/programmes";

const colour: Record<string, string> = {
  academic: "#9a1124", library: "#1d4ed8", residential: "#6d28d9", services: "#374151", culture: "#a16207", health: "#0f766e", sport: "#2f6b3f",
};
const label = (c: string) => c.charAt(0).toUpperCase() + c.slice(1);

export function CampusMap() {
  const sp = useSearchParams();
  const initial = sp.get("place");
  const [selected, setSelected] = useState<string | null>(locations.some((l) => l.id === initial) ? initial : null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const visible = useMemo(() => {
    const words = normalise(q).split(" ").filter(Boolean);
    return locations.filter((l) => (!cat || l.category === cat) && words.every((w) => normalise(`${l.name} ${l.description} ${l.category}`).includes(w)));
  }, [q, cat]);
  const current = locations.find((l) => l.id === selected);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-[#eef3ea]" data-testid="campus-map">
          <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
            <rect x="5" y="8" width="20" height="18" rx="3" fill="#d6e6d0" /><rect x="66" y="10" width="28" height="16" rx="3" fill="#d6e6d0" />
            <ellipse cx="50" cy="66" rx="16" ry="5" fill="#cfe0ef" />
            <path d="M0 37 H100 M45 0 V75 M10 60 Q 45 50 90 62" stroke="#ffffff" strokeWidth="2.2" fill="none" />
            <path d="M0 37 H100 M45 0 V75 M10 60 Q 45 50 90 62" stroke="#c9ccd1" strokeWidth="0.4" fill="none" strokeDasharray="1.5 1.5" />
          </svg>
          {visible.map((l) => (
            <button key={l.id} type="button" onClick={() => setSelected(l.id)} aria-pressed={selected === l.id}
              style={{ left: `${l.x}%`, top: `${l.y}%`, backgroundColor: colour[l.category] }}
              className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md transition-transform hover:scale-110 ${selected === l.id ? "scale-125 ring-4 ring-black/30" : ""}`}>
              <span aria-hidden="true">{l.name.charAt(0)}</span><span className="sr-only">{l.name}</span>
            </button>
          ))}
          <p className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-ink">Schematic map, not to scale. Positions are illustrative.</p>
        </div>
        <ul className="mt-3 flex flex-wrap gap-3 text-xs" aria-label="Map legend">
          {locationCategories.map((c) => <li key={c} className="flex items-center gap-1.5"><span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ backgroundColor: colour[c] }} />{label(c)}</li>)}
        </ul>
      </div>

      <div className="space-y-4">
        <form role="search" aria-label="Find a place" onSubmit={(e) => e.preventDefault()} className="space-y-3 rounded-card border border-line bg-surface-alt p-4">
          <div><label htmlFor="map-q" className="mb-1 block font-semibold">Find a place</label>
            <input id="map-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. library" className="min-h-11 w-full rounded-lg border border-line px-3" /></div>
          <div><label htmlFor="map-cat" className="mb-1 block font-semibold">Category</label>
            <select id="map-cat" value={cat} onChange={(e) => setCat(e.target.value)} className="min-h-11 w-full rounded-lg border border-line bg-white px-3">
              <option value="">All categories</option>{locationCategories.map((c) => <option key={c} value={c}>{label(c)}</option>)}</select></div>
        </form>

        <div aria-live="polite" className="rounded-card border border-line p-4" data-testid="place-details">
          {current ? (
            <>
              <h2 className="text-lg font-bold">{current.name}</h2>
              <p className="text-sm text-ink-muted">{label(current.category)}</p>
              <p className="mt-2 text-sm">{current.description}</p>
              <p className="mt-2 text-sm"><span className="font-semibold">Accessibility:</span> {current.accessibility}</p>
              <p className="mt-2 text-xs text-ink-muted">Name from public UPM sources ({current.provenance.status === "verified" ? current.provenance.sources.join(", ") : "demo"}). Position on map is illustrative.</p>
            </>
          ) : <p className="text-sm text-ink-muted">Select a place on the map or in the list to see details.</p>}
        </div>

        <p className="font-semibold" role="status">{visible.length} {visible.length === 1 ? "place" : "places"}</p>
        {visible.length === 0 ? <p className="text-sm text-ink-muted">No places match. Clear the search or choose another category.</p> : (
          <ul className="max-h-80 space-y-1 overflow-y-auto">
            {visible.map((l) => (
              <li key={l.id}><button type="button" onClick={() => setSelected(l.id)} aria-pressed={selected === l.id}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-alt ${selected === l.id ? "bg-brand-50 font-semibold" : ""}`}>{l.name}</button></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

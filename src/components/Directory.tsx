"use client";

import { useMemo, useState } from "react";
import { contacts } from "@/data/contacts";
import { normalise } from "@/lib/programmes";

export function Directory() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const words = normalise(q).split(" ").filter(Boolean);
    return contacts.filter((c) => words.every((w) => normalise(`${c.unit} ${c.topic} ${c.email ?? ""}`).includes(w)));
  }, [q]);
  return (
    <div>
      <label htmlFor="dir-q" className="mb-1 block font-semibold">Search the directory</label>
      <input id="dir-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. admission, library, ICT" className="min-h-11 w-full max-w-md rounded-xl border border-line bg-white px-3 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100" />
      <p role="status" aria-live="polite" className="my-3 text-sm font-semibold">{list.length} {list.length === 1 ? "contact" : "contacts"}</p>
      {list.length === 0 ? <p className="text-ink-muted">No contacts match. Try another word, or use the enquiry form.</p> : (
        <ul className="grid gap-4 md:grid-cols-2" data-testid="directory-results">
          {list.map((c) => (
            <li key={c.id} className="glass rounded-3xl p-4">
              <p className="font-semibold">{c.unit}</p>
              <p className="text-sm text-ink-muted">{c.topic}</p>
              <dl className="mt-2 space-y-1 text-sm">
                {c.email && <div className="flex gap-2"><dt className="font-semibold">Email</dt><dd><a className="text-brand-700 underline" href={`mailto:${c.email}`}>{c.email}</a></dd></div>}
                {c.phone && <div className="flex gap-2"><dt className="font-semibold">Phone</dt><dd>{c.phone}</dd></div>}
                {c.url && <div className="flex gap-2"><dt className="font-semibold">Web</dt><dd><a className="text-brand-700 underline" href={c.url} target="_blank" rel="noopener noreferrer">{new URL(c.url).hostname}<span className="sr-only"> (opens in a new tab)</span></a></dd></div>}
              </dl>
              <p className="mt-2 text-xs text-ink-muted">Source {c.provenance.status === "verified" ? c.provenance.sources.join(", ") : "demo"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

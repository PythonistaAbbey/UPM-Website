"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { researchers, researchThemes } from "@/data/researchers";
import { faculties, getFaculty } from "@/data/faculties";
import { normalise } from "@/lib/programmes";

export function ResearchDiscovery() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [theme, setTheme] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");
  const withPeople = faculties.filter((f) => researchers.some((r) => r.facultySlug === f.slug));

  const words = normalise(q).split(" ").filter(Boolean);
  const results = researchers.filter((r) => {
      if (theme && !r.themes.includes(theme)) return false;
      if (faculty && r.facultySlug !== faculty) return false;
      if (status && !r.projects.some((p) => p.status === status)) return false;
      const hay = normalise(`${r.name} ${r.themes.join(" ")} ${r.projects.map((p) => p.title).join(" ")}`);
      return words.every((w) => hay.includes(w));
  });

  const cls = "min-h-11 w-full rounded-xl border border-line bg-white px-3 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100 text-base";
  return (
    <div>
      <form role="search" aria-label="Filter researchers and projects" onSubmit={(e) => e.preventDefault()} className="glass grid gap-4 rounded-3xl p-5 md:grid-cols-4">
        <div><label htmlFor="rd-q" className="mb-1 block font-semibold">Keyword</label><input id="rd-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} className={cls} /></div>
        <div><label htmlFor="rd-theme" className="mb-1 block font-semibold">Theme</label>
          <select id="rd-theme" value={theme} onChange={(e) => setTheme(e.target.value)} className={cls}><option value="">All themes</option>{researchThemes.map((x) => <option key={x}>{x}</option>)}</select></div>
        <div><label htmlFor="rd-fac" className="mb-1 block font-semibold">Faculty</label>
          <select id="rd-fac" value={faculty} onChange={(e) => setFaculty(e.target.value)} className={cls}><option value="">All faculties</option>{withPeople.map((f) => <option key={f.slug} value={f.slug}>{f.name}</option>)}</select></div>
        <div><label htmlFor="rd-status" className="mb-1 block font-semibold">Project status</label>
          <select id="rd-status" value={status} onChange={(e) => setStatus(e.target.value)} className={cls}><option value="">Any</option><option value="active">Active</option><option value="completed">Completed</option></select></div>
      </form>
      <p role="status" aria-live="polite" className="my-4 font-semibold">{results.length} {results.length === 1 ? "researcher" : "researchers"} found</p>
      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-upm-grey/60 bg-white/70 p-8 text-center backdrop-blur"><p className="font-semibold">No researchers match.</p><p className="text-ink-muted">Remove a filter or try another keyword.</p></div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <li key={r.slug} className="glass rounded-3xl p-5">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-sm text-ink-muted">{getFaculty(r.facultySlug)?.name}</p>
              <p className="mt-2 text-sm"><span className="font-semibold">Themes:</span> {r.themes.join(", ")}</p>
              <ul className="mt-2 list-disc pl-5 text-sm">{r.projects.map((p) => <li key={p.title}>{p.title} <span className="text-ink-muted">({p.status}, {p.year})</span></li>)}</ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Campus, Level, Locale, StudyMode } from "@/lib/types";
import { programmes } from "@/data/programmes";
import { faculties, getFaculty } from "@/data/faculties";
import { campusLabel, filterProgrammes, levelLabel, modeLabel, type ProgrammeFilters } from "@/lib/programmes";
import { href } from "@/lib/i18n";

const fields = Array.from(new Set(programmes.map((p) => p.field))).sort();
const keys = ["q", "level", "faculty", "field", "campus", "mode"] as const;

export function ProgrammeFinder({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const filters: ProgrammeFilters = {
    q,
    level: (sp.get("level") ?? "") as Level | "",
    faculty: sp.get("faculty") ?? "",
    field: sp.get("field") ?? "",
    campus: (sp.get("campus") ?? "") as Campus | "",
    mode: (sp.get("mode") ?? "") as StudyMode | "",
  };

  const results = filterProgrammes(programmes, filters, (s) => getFaculty(s)?.name ?? "");

  const update = (key: (typeof keys)[number], value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value); else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const clear = () => { setQ(""); router.replace(pathname, { scroll: false }); };
  const active = Boolean(q) || keys.some((k) => sp.get(k));

  const select = "min-h-11 w-full rounded-lg border border-line bg-white px-3 text-base";
  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <form role="search" aria-label="Filter programmes" onSubmit={(e) => e.preventDefault()} className="space-y-4 self-start rounded-card border border-line bg-surface-alt p-5 lg:sticky lg:top-4">
        <div>
          <label htmlFor="pf-q" className="mb-1 block font-semibold">Keyword</label>
          <input id="pf-q" type="search" value={q} onChange={(e) => { setQ(e.target.value); update("q", e.target.value); }} placeholder="e.g. computer" className={select} />
        </div>
        <div>
          <label htmlFor="pf-level" className="mb-1 block font-semibold">Level</label>
          <select id="pf-level" value={filters.level} onChange={(e) => update("level", e.target.value)} className={select}>
            <option value="">All levels</option>
            {Object.entries(levelLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pf-faculty" className="mb-1 block font-semibold">Faculty or school</label>
          <select id="pf-faculty" value={filters.faculty} onChange={(e) => update("faculty", e.target.value)} className={select}>
            <option value="">All faculties</option>
            {faculties.map((f) => <option key={f.slug} value={f.slug}>{f.name}{f.campus === "bintulu" ? " (Bintulu)" : ""}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pf-field" className="mb-1 block font-semibold">Field <span className="font-normal text-ink-muted">(prototype grouping)</span></label>
          <select id="pf-field" value={filters.field} onChange={(e) => update("field", e.target.value)} className={select}>
            <option value="">All fields</option>
            {fields.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="mb-1 font-semibold">Campus</legend>
          {([["", "Any campus"], ...Object.entries(campusLabel)] as [string, string][]).map(([v, l]) => (
            <label key={v} className="flex min-h-9 items-center gap-2">
              <input type="radio" name="campus" value={v} checked={filters.campus === v} onChange={() => update("campus", v)} className="h-4 w-4 accent-brand-700" /> {l}
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="pf-mode" className="mb-1 block font-semibold">Study mode</label>
          <select id="pf-mode" value={filters.mode} onChange={(e) => update("mode", e.target.value)} className={select}>
            <option value="">All modes</option>
            {Object.entries(modeLabel).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <button type="button" onClick={clear} disabled={!active} className="min-h-11 w-full rounded-lg border border-brand-700 font-semibold text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:border-line disabled:text-ink-muted">
          Clear all filters
        </button>
      </form>

      <div>
        <p role="status" aria-live="polite" className="mb-4 font-semibold" data-testid="result-count">
          {results.length} {results.length === 1 ? "programme" : "programmes"} found
        </p>
        {results.length === 0 ? (
          <div className="rounded-card border border-dashed border-line p-8 text-center">
            <p className="text-lg font-semibold">No programmes match these filters</p>
            <p className="mt-2 text-ink-muted">Try a shorter keyword or remove a filter.</p>
            <button type="button" onClick={clear} className="mt-4 rounded-lg bg-brand-700 px-5 py-2.5 font-semibold text-white">Clear all filters</button>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2" data-testid="programme-results">
            {results.map((p) => (
              <li key={p.slug} className="relative rounded-card border border-line bg-white p-5 hover:shadow-md">
                <h3 className="font-semibold"><Link href={href(locale, `/study/programmes/${p.slug}`)} className="after:absolute after:inset-0 hover:underline" lang="en">{p.name}</Link></h3>
                <p className="mt-1 text-sm text-ink-muted">{getFaculty(p.facultySlug)?.name ?? "School of Graduate Studies / central"}</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                  <li className="rounded-full bg-brand-50 px-2.5 py-0.5 font-semibold text-brand-800">{levelLabel[p.level]}</li>
                  <li className="rounded-full bg-campus-50 px-2.5 py-0.5 font-semibold text-campus-700">{campusLabel[p.campus]}</li>
                  <li className="rounded-full bg-surface-alt px-2.5 py-0.5 font-semibold text-ink">{modeLabel[p.mode]}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

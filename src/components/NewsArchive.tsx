"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/types";
import { newsItems } from "@/data/news";
import { NewsCard } from "./NewsCard";

const categories = Array.from(new Set(newsItems.map((n) => n.category))).sort();
const years = Array.from(new Set(newsItems.map((n) => n.date.slice(0, 4)))).sort().reverse();

export function NewsArchive({ locale }: { locale: Locale }) {
  const [kind, setKind] = useState<"" | "news" | "event">("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const list = useMemo(() => newsItems
    .filter((n) => (!kind || n.kind === kind) && (!category || n.category === category) && (!year || n.date.startsWith(year)) && (!onlyVerified || n.provenance.status === "verified"))
    .sort((a, b) => b.date.localeCompare(a.date)), [kind, category, year, onlyVerified]);

  const cls = "min-h-11 w-full rounded-lg border border-line bg-white px-3";
  return (
    <div>
      <form aria-label="Filter news and events" onSubmit={(e) => e.preventDefault()} className="grid gap-4 rounded-card border border-line bg-surface-alt p-5 md:grid-cols-4">
        <fieldset><legend className="mb-1 font-semibold">Show</legend>
          <div className="flex flex-wrap gap-3">{([["", "All"], ["news", "News"], ["event", "Events"]] as const).map(([v, l]) => (
            <label key={v} className="flex min-h-9 items-center gap-1.5"><input type="radio" name="kind" checked={kind === v} onChange={() => setKind(v)} className="h-4 w-4 accent-brand-700" />{l}</label>))}</div>
        </fieldset>
        <div><label htmlFor="na-cat" className="mb-1 block font-semibold">Category</label>
          <select id="na-cat" value={category} onChange={(e) => setCategory(e.target.value)} className={cls}><option value="">All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label htmlFor="na-year" className="mb-1 block font-semibold">Year</label>
          <select id="na-year" value={year} onChange={(e) => setYear(e.target.value)} className={cls}><option value="">All years</option>{years.map((y) => <option key={y}>{y}</option>)}</select></div>
        <label className="flex items-center gap-2 self-end pb-2 font-semibold"><input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="h-5 w-5 accent-brand-700" />Only items from UPM sources</label>
      </form>
      <p role="status" aria-live="polite" className="my-4 font-semibold" data-testid="news-count">{list.length} {list.length === 1 ? "item" : "items"}</p>
      {list.length === 0 ? (
        <div className="rounded-card border border-dashed border-line p-8 text-center"><p className="font-semibold">Nothing matches these filters.</p></div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((n) => <li key={n.slug}><NewsCard item={n} locale={locale} /></li>)}</ul>
      )}
    </div>
  );
}

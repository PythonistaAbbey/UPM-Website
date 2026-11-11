"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/types";
import { search, type ResultType } from "@/lib/search";
import { href } from "@/lib/i18n";
import { DemoBadge } from "./Provenance";

const types: ResultType[] = ["Programme", "Faculty", "Service", "Contact", "News", "Event", "Researcher", "Place", "Page"];
const suggestions = ["engineering", "library", "postgraduate", "accommodation", "ICT support"];

export function SearchClient({ locale }: { locale: Locale }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [type, setType] = useState<ResultType | "">((sp.get("type") as ResultType) ?? "");
  const results = useMemo(() => search(q, undefined, type), [q, type]);
  const counts = useMemo(() => Object.fromEntries(types.map((tp) => [tp, search(q, undefined, tp).length])), [q]);

  const sync = (nq: string, nt: string) => {
    const p = new URLSearchParams();
    if (nq) p.set("q", nq);
    if (nt) p.set("type", nt);
    router.replace(p.size ? `${pathname}?${p}` : pathname, { scroll: false });
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex max-w-2xl flex-col gap-2 sm:flex-row">
        <label htmlFor="s-q" className="sr-only">Search everything</label>
        <input id="s-q" type="search" autoFocus value={q} onChange={(e) => { setQ(e.target.value); sync(e.target.value, type); }}
          placeholder="Search programmes, faculties, services, people, places…" className="min-h-12 flex-1 rounded-lg border border-line px-4 text-base" />
      </form>
      {q.trim() === "" ? (
        <div className="mt-8">
          <p className="font-semibold">Try searching for:</p>
          <ul className="mt-2 flex flex-wrap gap-2">{suggestions.map((s) => <li key={s}><button type="button" onClick={() => { setQ(s); sync(s, type); }} className="rounded-full border border-line px-3 py-1 hover:border-brand-700">{s}</button></li>)}</ul>
        </div>
      ) : (
        <>
          <fieldset className="mt-6">
            <legend className="sr-only">Filter by type</legend>
            <div className="flex flex-wrap gap-2">
              {(["", ...types] as const).map((tp) => (
                <label key={tp || "all"} className={`cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand-700 ${type === tp ? "border-brand-700 bg-brand-700 text-white" : "border-line"}`}>
                  <input type="radio" name="type" className="sr-only" checked={type === tp} onChange={() => { setType(tp); sync(q, tp); }} />
                  {tp || "All"} ({tp ? counts[tp] : search(q).length})
                </label>
              ))}
            </div>
          </fieldset>
          <p role="status" aria-live="polite" className="my-4 font-semibold" data-testid="search-count">{results.length} {results.length === 1 ? "result" : "results"} for “{q}”</p>
          {results.length === 0 ? (
            <div className="rounded-card border border-dashed border-line p-8 text-center">
              <p className="text-lg font-semibold">No results</p>
              <p className="mt-2 text-ink-muted">Check the spelling, use fewer words, or <Link className="underline" href={href(locale, "/contact")}>ask us directly</Link>.</p>
            </div>
          ) : (
            <ol className="space-y-3" data-testid="search-results">
              {results.slice(0, 50).map((r) => (
                <li key={r.id} className="relative rounded-card border border-line p-4 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{r.type}</p>
                  <Link href={href(locale, r.href)} className="font-semibold after:absolute after:inset-0 hover:underline">{r.title}</Link>
                  {r.demo && <span className="relative ml-2"><DemoBadge label="Demonstration content" /></span>}
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
}

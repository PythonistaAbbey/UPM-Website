"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";

const copy = {
  en: { legend: "Search in", prog: "Programmes", all: "Everything", label: "What would you like to find?", ph: { prog: "e.g. engineering, nursing, agriculture", all: "e.g. library, student portal, ICT support" }, go: "Search", popular: "Popular" },
  ms: { legend: "Cari dalam", prog: "Program", all: "Semua", label: "Apakah yang ingin anda cari?", ph: { prog: "cth. kejuruteraan, kejururawatan, pertanian", all: "cth. perpustakaan, portal pelajar, sokongan ICT" }, go: "Cari", popular: "Popular" },
};
const chips = [
  { q: "engineering", scope: "prog" }, { q: "computer science", scope: "prog" }, { q: "library", scope: "all" }, { q: "postgraduate", scope: "all" },
] as const;

export function HeroSearch({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const router = useRouter();
  const id = useId();
  const [scope, setScope] = useState<"prog" | "all">("prog");
  const [q, setQ] = useState("");
  const go = (query: string, sc: "prog" | "all") => {
    const qs = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(href(locale, sc === "prog" ? `/study/programmes${qs}` : `/search${qs}`));
  };
  const onSubmit = (e: FormEvent) => { e.preventDefault(); go(q, scope); };

  return (
    <form role="search" aria-label={c.label} onSubmit={onSubmit} className="glass rounded-[1.75rem] p-4 sm:p-5" data-testid="hero-search">
      <fieldset className="flex gap-1 rounded-full bg-black/5 p-1">
        <legend className="sr-only">{c.legend}</legend>
        {(["prog", "all"] as const).map((s) => (
          <label key={s} className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-center text-sm font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand-600 ${scope === s ? "bg-white text-brand-700 shadow" : "text-ink-muted hover:text-ink"}`}>
            <input type="radio" name={`${id}-scope`} value={s} checked={scope === s} onChange={() => setScope(s)} className="sr-only" />
            {s === "prog" ? c.prog : c.all}
          </label>
        ))}
      </fieldset>
      <label htmlFor={`${id}-q`} className="mt-4 block text-sm font-semibold text-ink">{c.label}</label>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 pl-4 transition focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" /></svg>
        <input id={`${id}-q`} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={c.ph[scope]} className="min-h-11 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted" />
        <button type="submit" className="min-h-11 shrink-0 rounded-xl bg-brand-600 px-5 font-semibold text-white shadow-md shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98]">{c.go}</button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-ink-muted">{c.popular}:</span>
        {chips.map((ch) => (
          <button key={ch.q} type="button" onClick={() => go(ch.q, ch.scope)} className="min-h-8 rounded-full border border-line bg-white/80 px-3 font-medium text-ink transition hover:border-brand-600 hover:text-brand-700">{ch.q}</button>
        ))}
      </div>
    </form>
  );
}

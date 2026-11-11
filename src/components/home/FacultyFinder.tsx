"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/types";
import { faculties } from "@/data/faculties";
import { programmes } from "@/data/programmes";
import { href } from "@/lib/i18n";
import { normalise } from "@/lib/programmes";
import { MediaImage } from "@/components/MediaImage";
import { mediaForField } from "@/lib/visuals";

export function FacultyFinder({ locale }: { locale: Locale }) {
  const ms = locale === "ms";
  const [q, setQ] = useState("");
  const [campus, setCampus] = useState<"" | "serdang" | "bintulu">("");
  const words = normalise(q).split(" ").filter(Boolean);
  const list = faculties.filter((f) => (!campus || f.campus === campus) && words.every((w) => normalise(`${f.name} ${f.field}`).includes(w)));

  return (
    <div>
      <div className="glass flex flex-col gap-3 rounded-3xl p-3 sm:flex-row sm:items-center">
        <label htmlFor="ff-q" className="sr-only">{ms ? "Cari fakulti" : "Search faculties"}</label>
        <input id="ff-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ms ? "Cari fakulti atau bidang…" : "Search faculties or fields…"} className="min-h-12 flex-1 rounded-2xl border border-line bg-white px-4 text-base outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100" />
        <fieldset className="flex gap-1 rounded-full bg-black/5 p-1">
          <legend className="sr-only">{ms ? "Kampus" : "Campus"}</legend>
          {([["", ms ? "Semua" : "All"], ["serdang", "Serdang"], ["bintulu", "Bintulu"]] as const).map(([v, l]) => (
            <label key={v} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand-600 ${campus === v ? "bg-white text-brand-700 shadow" : "text-ink-muted"}`}>
              <input type="radio" name="ff-campus" className="sr-only" checked={campus === v} onChange={() => setCampus(v)} />{l}
            </label>
          ))}
        </fieldset>
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-sm font-semibold text-ink-muted" data-testid="faculty-count">{list.length} {ms ? "fakulti dan sekolah" : list.length === 1 ? "faculty or school" : "faculties and schools"}</p>
      {list.length === 0 ? (
        <p className="glass mt-4 rounded-3xl p-8 text-center text-ink-muted">{ms ? "Tiada padanan. Cuba perkataan lain." : "No matches. Try another word."}</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {list.map((f) => {
            const n = programmes.filter((p) => p.facultySlug === f.slug).length;
            return (
              <li key={f.slug} className="group glass lift relative flex overflow-hidden rounded-3xl sm:block">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden sm:aspect-[16/10] sm:w-auto">
                  <MediaImage asset={mediaForField(f.field)} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" decorative imgClassName="transition-transform duration-700 group-hover:scale-110" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-xs font-semibold text-ink">{f.campus === "bintulu" ? "Bintulu" : "Serdang"}</span>
                </div>
                <div className="self-center p-4 sm:p-5">
                  <h3 className="font-semibold leading-snug text-ink"><Link href={href(locale, `/faculties/${f.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none">{f.name}</Link></h3>
                  <p className="mt-1 text-sm text-ink-muted">{f.field} · {n} {ms ? "program" : n === 1 ? "programme" : "programmes"}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

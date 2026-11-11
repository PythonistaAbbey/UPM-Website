import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, isLocale, locales, t } from "@/lib/i18n";
import { programmes, getProgramme } from "@/data/programmes";
import { getFaculty } from "@/data/faculties";
import { campusLabel, levelLabel, modeLabel } from "@/lib/programmes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, Notice, PageHeader } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";

type P = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => programmes.map((p) => ({ locale, slug: p.slug })));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProgramme(slug)?.name ?? "Programme" };
}

export default async function ProgrammeDetail({ params }: P) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const p = getProgramme(slug);
  if (!p) notFound();
  const d = t(locale);
  const fac = getFaculty(p.facultySlug);
  const related = programmes.filter((x) => x.facultySlug && x.facultySlug === p.facultySlug && x.slug !== p.slug).slice(0, 6);
  const apply = p.level === "postgraduate" ? "/study#pg-research" : p.mode === "distance" ? "/study#distance" : p.level === "foundation" ? "/study#foundation" : "/study#malaysian-ug";

  const rows: [string, string][] = [
    ["Level", levelLabel[p.level]], ["Faculty or school", fac?.name ?? "School of Graduate Studies / central"],
    ["Campus", campusLabel[p.campus]], ["Study mode", modeLabel[p.mode]], ["Field (prototype grouping)", p.field],
  ];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.study, path: "/study" }, { label: "Find a programme", path: "/study/programmes" }, { label: p.name }]} />
      <PageHeader eyebrow={levelLabel[p.level]} title={p.name} intro={<ProvenanceNote p={p.provenance} d={d} />} />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          {p.note && <Notice title="About this listing">{p.note}</Notice>}
          <section aria-labelledby="desc"><h2 id="desc" className="text-2xl font-bold">Programme overview</h2>
            <Notice tone="warning" title="Verified description not yet available">The description, learning outcomes and career paths must come from the faculty through the CMS approval workflow. They are left empty rather than invented.</Notice></section>
          <section aria-labelledby="entry"><h2 id="entry" className="text-2xl font-bold">Entry requirements</h2>
            <p className="mt-2 text-ink-muted">Entry requirements were not verified for this prototype. See the special requirements books linked from UPM&apos;s How to Apply page.</p>
            <p className="mt-2"><ExternalLink href="https://spel.upm.edu.my/admission/how_to_apply-14945">How to Apply (official)</ExternalLink></p></section>
          <section aria-labelledby="structure"><h2 id="structure" className="text-2xl font-bold">Programme structure</h2>
            <p className="mt-2 text-ink-muted">Course structure will appear here when the authoritative course data is connected.</p></section>
          <section aria-labelledby="fees"><h2 id="fees" className="text-2xl font-bold">Fees</h2>
            <p className="mt-2 text-ink-muted">No fee figures are shown. Fees must come from the Bursar or the Division of Admission.</p></section>
        </div>
        <aside className="space-y-6">
          <div className="rounded-card border border-line p-5">
            <h2 className="text-lg font-bold">Key facts</h2>
            <dl className="mt-3 space-y-3 text-sm">{rows.map(([k, val]) => <div key={k}><dt className="text-ink-muted">{k}</dt><dd className="font-semibold">{val}</dd></div>)}</dl>
          </div>
          <div className="rounded-card bg-brand-700 p-5 text-white on-dark">
            <h2 className="text-lg font-bold">How to apply</h2>
            <p className="mt-2 text-sm">See the route that matches you, then apply on the official system.</p>
            <Link href={href(locale, apply)} className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-white px-4 font-semibold text-brand-800">See application routes</Link>
          </div>
          {fac && <p className="text-sm"><Link className="font-semibold text-brand-700 underline" href={href(locale, `/faculties/${fac.slug}`)}>More about the {fac.name}</Link></p>}
        </aside>
      </div>
      {related.length > 0 && (
        <section aria-labelledby="related" className="container-page pb-10">
          <h2 id="related" className="text-2xl font-bold">Other programmes in this faculty</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{related.map((r) => <li key={r.slug}><Link className="underline" href={href(locale, `/study/programmes/${r.slug}`)}>{r.name}</Link></li>)}</ul>
        </section>
      )}
    </>
  );
}

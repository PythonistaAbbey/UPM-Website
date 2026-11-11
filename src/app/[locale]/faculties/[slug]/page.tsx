import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, isLocale, locales, t } from "@/lib/i18n";
import { faculties, getFaculty } from "@/data/faculties";
import { programmes } from "@/data/programmes";
import { researchers } from "@/data/researchers";
import { newsItems } from "@/data/news";
import { mediaForField } from "@/lib/visuals";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, EmptyState, ExternalLink, Notice, PageHeader, Section } from "@/components/ui";
import { DemoBadge, ProvenanceNote } from "@/components/Provenance";
import { NewsCard } from "@/components/NewsCard";

type P = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => faculties.map((f) => ({ locale, slug: f.slug })));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  return { title: getFaculty(slug)?.name ?? "Faculty" };
}

export default async function FacultyPage({ params }: P) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const f = getFaculty(slug);
  if (!f) notFound();
  const d = t(locale);
  const progs = programmes.filter((p) => p.facultySlug === f.slug);
  const people = researchers.filter((r) => r.facultySlug === f.slug);
  const news = newsItems.filter((n) => n.provenance.status === "demo").slice(0, 2);
  const sections = [["programmes", "Programmes"], ["research", "Research"], ["news", "News and events"], ["contact", "Contact"]];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: "Faculties and schools", path: "/faculties" }, { label: f.name }]} />
      <PageHeader image={mediaForField(f.field)} eyebrow={f.campus === "bintulu" ? "UPM Bintulu Sarawak Campus" : "UPM Serdang"} title={f.name} intro={<ProvenanceNote p={f.provenance} d={d} />}>
        <nav aria-label="On this page" className="mt-6">
          <ul className="flex flex-wrap gap-2">{sections.map(([id, l]) => <li key={id}><a href={`#${id}`} className="inline-flex min-h-9 items-center rounded-full border border-white/40 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-brand-700">{l}</a></li>)}</ul>
        </nav>
      </PageHeader>

      <Section title="Introduction" id="intro">
        <Notice tone="warning" title="Faculty introduction, leadership and facilities to be supplied by the faculty">
          In the proposed CMS, the faculty content administrator writes these sections and a central reviewer approves them. They are left empty here rather than invented.
        </Notice>
        <p className="mt-4"><ExternalLink href={f.officialUrl}>Current official faculty website</ExternalLink></p>
      </Section>

      <Section title="Programmes" id="programmes">
        {progs.length ? (
          <ul className="grid gap-3 md:grid-cols-2">{progs.map((p) => <li key={p.slug}><Link className="font-medium text-brand-700 underline" href={href(locale, `/study/programmes/${p.slug}`)}>{p.name}</Link></li>)}</ul>
        ) : <EmptyState title="No programmes listed for this unit yet" />}
        <div className="mt-6"><ButtonLink variant="secondary" href={href(locale, `/study/programmes?faculty=${f.slug}`)}>Filter the catalogue by this faculty</ButtonLink></div>
      </Section>

      <Section title="Research" id="research">
        {people.length ? (
          <>
            <p className="mb-4"><DemoBadge label={d.demo} /></p>
            <ul className="grid gap-4 md:grid-cols-2">{people.map((r) => <li key={r.slug} className="glass rounded-3xl p-4"><p className="font-semibold">{r.name}</p><p className="text-sm text-ink-muted">{r.themes.join(" · ")}</p></li>)}</ul>
          </>
        ) : <EmptyState title="No research profiles for this faculty yet">Profiles will come from UPM&apos;s authorised research systems.</EmptyState>}
      </Section>

      <Section title="News and events" id="news">
        <ul className="grid gap-5 md:grid-cols-2">{news.map((n) => <li key={n.slug}><NewsCard item={n} locale={locale} /></li>)}</ul>
      </Section>

      <Section title="Contact" id="contact">
        <p className="text-ink-muted">Faculty contact details will be maintained by the faculty. Until then, use the official site or the central directory.</p>
        <div className="mt-4 flex flex-wrap gap-3"><ButtonLink href={href(locale, "/contact")} variant="secondary">University directory</ButtonLink></div>
      </Section>
    </>
  );
}

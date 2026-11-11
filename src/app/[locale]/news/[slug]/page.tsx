import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, isLocale, locales, t } from "@/lib/i18n";
import { getNewsItem, newsItems } from "@/data/news";
import { mediaForNews } from "@/lib/visuals";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/ui";
import { ProvenanceNote } from "@/components/Provenance";
import { formatDate } from "@/components/NewsCard";

type P = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => newsItems.map((n) => ({ locale, slug: n.slug })));
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  return { title: getNewsItem(slug)?.title ?? "News" };
}

export default async function NewsDetail({ params }: P) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const n = getNewsItem(slug);
  if (!n) notFound();
  const d = t(locale);
  const related = newsItems.filter((x) => x.slug !== n.slug && x.tags.some((tag) => n.tags.includes(tag))).slice(0, 3);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.news, path: "/news" }, { label: n.title }]} />
      <PageHeader image={mediaForNews(n.category)} eyebrow={`${n.kind === "event" ? "Event" : "News"} · ${n.category}`} title={n.title} intro={<ProvenanceNote p={n.provenance} d={d} />} />
      <article className="container-page max-w-3xl py-10" lang="en">
        <dl className="mb-6 grid gap-2 text-sm sm:grid-cols-3">
          <div><dt className="text-ink-muted">Date</dt><dd className="font-semibold"><time dateTime={n.date}>{formatDate(n.date, locale)}</time>{n.endDate && <> – <time dateTime={n.endDate}>{formatDate(n.endDate, locale)}</time></>}</dd></div>
          {n.location && <div><dt className="text-ink-muted">Location</dt><dd className="font-semibold">{n.location}</dd></div>}
          <div><dt className="text-ink-muted">Published by</dt><dd className="font-semibold">{n.unit}</dd></div>
        </dl>
        <p className="text-lg font-medium">{n.summary}</p>
        {n.body.map((para, i) => <p key={i} className="mt-4">{para}</p>)}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">{n.tags.map((tag) => <li key={tag} className="rounded-full bg-black/5 px-3 py-1 text-sm">{tag}</li>)}</ul>
      </article>
      {related.length > 0 && (
        <section aria-labelledby="rel" className="container-page max-w-3xl pb-10">
          <h2 id="rel" className="text-xl font-bold">Related</h2>
          <ul className="mt-3 space-y-2">{related.map((r) => <li key={r.slug}><Link className="text-brand-700 underline" href={href(locale, `/news/${r.slug}`)}>{r.title}</Link></li>)}</ul>
        </section>
      )}
    </>
  );
}

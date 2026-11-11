import type { Locale, NewsItem } from "@/lib/types";
import { href, t } from "@/lib/i18n";
import { Card } from "./ui";
import { ProvenanceNote } from "./Provenance";

export const formatDate = (iso: string, locale: Locale) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString(locale === "ms" ? "ms-MY" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function NewsCard({ item, locale }: { item: NewsItem; locale: Locale }) {
  const d = t(locale);
  return (
    <Card title={item.title} href={href(locale, `/news/${item.slug}`)} meta={<ProvenanceNote p={item.provenance} d={d} compact />}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
        {item.kind === "event" ? "Event" : "News"} · {item.category}
      </p>
      <p>
        <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        {item.endDate && <> – <time dateTime={item.endDate}>{formatDate(item.endDate, locale)}</time></>}
      </p>
      <p className="mt-2">{item.summary}</p>
    </Card>
  );
}

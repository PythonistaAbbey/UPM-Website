import type { Metadata } from "next";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/ui";
import { NewsArchive } from "@/components/NewsArchive";

export const metadata: Metadata = { title: "News and events" };

export default async function News({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.news }]} />
      <PageHeader eyebrow={d.nav.news} title="News and events" intro="One archive for the whole university, filterable by type, category and year. Most items here are demonstration content and are labelled." />
      <div className="container-page py-10"><NewsArchive locale={locale} /></div>
    </>
  );
}

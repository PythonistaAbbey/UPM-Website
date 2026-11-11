import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/ui";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.quick.search }]} />
      <PageHeader title={d.quick.search} intro="Searches programmes, faculties, services, contacts, news, events, researchers and campus places in this prototype." />
      <div className="container-page py-10"><Suspense fallback={<p role="status">{d.loading}</p>}><SearchClient locale={locale} /></Suspense></div>
    </>
  );
}

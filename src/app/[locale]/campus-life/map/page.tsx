import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice, PageHeader } from "@/components/ui";
import { CampusMap } from "@/components/CampusMap";

export const metadata: Metadata = { title: "Campus map" };

export default async function MapPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.campus, path: "/campus-life" }, { label: "Campus map" }]} />
      <PageHeader title="Campus map" intro="Search for a place, filter by category, and select it to see details. Everything on the map can also be reached from the list." />
      <div className="container-page space-y-6 py-10">
        <Notice tone="warning" title={`${d.demo}: schematic layout`}>Place names come from public UPM pages, but their positions are illustrative. A production map needs survey data and accessibility audits from the Development and Asset Management Office. Do not use this map for directions.</Notice>
        <Suspense fallback={<p role="status">{d.loading}</p>}><CampusMap /></Suspense>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Notice, PageHeader } from "@/components/ui";
import { ResearchDiscovery } from "@/components/ResearchDiscovery";

export const metadata: Metadata = { title: "Find researchers and projects" };

export default async function Discover({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.research, path: "/research" }, { label: "Find researchers and projects" }]} />
      <PageHeader title="Find researchers and projects" />
      <div className="container-page space-y-6 py-10">
        <Notice tone="warning" title={`${d.demo}: every researcher and project on this page is fictional`}>
          This page demonstrates search and filtering only. Real profiles, projects and publications must come from UPM&apos;s research management system and repository, with permission.
        </Notice>
        <Suspense fallback={<p role="status">{d.loading}</p>}><ResearchDiscovery /></Suspense>
      </div>
    </>
  );
}

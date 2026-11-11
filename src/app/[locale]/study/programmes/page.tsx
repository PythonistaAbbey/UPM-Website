import type { Metadata } from "next";
import { Suspense } from "react";
import { resolveLocale, t, type LocaleParams } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/ui";
import { ProgrammeFinder } from "@/components/ProgrammeFinder";
import { ProvenanceNote } from "@/components/Provenance";

export const metadata: Metadata = { title: "Find a programme" };

export default async function Programmes({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const d = t(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: d.nav.study, path: "/study" }, { label: "Find a programme" }]} />
      <PageHeader title="Find a programme" intro={<>Programme names come from UPM&apos;s public programme list. Filters update the address, so you can share a search. <ProvenanceNote p={{ status: "verified", sources: ["S06", "S07", "S08"], checked: "2026-11-11" }} d={d} /></>} />
      <div className="container-page py-10">
        <Suspense fallback={<p role="status">{d.loading}</p>}>
          <ProgrammeFinder locale={locale} />
        </Suspense>
      </div>
    </>
  );
}
